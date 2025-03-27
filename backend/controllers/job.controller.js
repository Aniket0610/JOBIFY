import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";
// admin post krega job

import sendEmail from "../utils/emailService.js";

export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        // Validate required fields
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false
            });
        }

        // Create job in database
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });

        const users = await User.find({ role: 'student' }, "email fullname");

        users.forEach(user => {
            sendEmail(
                user.email,
                `🚀 Exciting Opportunity on JOBIFY: ${title}!`,
                `Hello ${user.fullname}, 
        
Great news! A **new job opportunity** has just been posted on **JOBIFY**.  

💼 **Position:** ${title}  
📍 **Location:** ${location}  
💰 **Salary:** Competitive  
🎯 **Experience Required:** ${experience}  

Don't miss out! Explore this role and **apply now** to take your career to the next level.  

👉 [Visit JOBIFY Now](https://your-jobify-platform.com)  

Best Regards,  
**The JOBIFY Team**  
🚀 Your Dream Job Awaits!`
            );
        });


        return res.status(201).json({
            message: "New job created successfully. Users notified!",
            job,
            success: true
        });
    } catch (error) {
        console.error("Error posting job:", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};
// student k liye
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const reset = req.query.reset === "true";  // Check if reset parameter is true
        let query = {};

        // If reset is true, clear the filters and return all jobs
        if (reset) {
            query = {}; // No filtering, fetch all jobs
        } else {
            query = {
                $or: [
                    { title: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } },
                ]
            };
            const rangeMatch = keyword.match(/^(\d+)-(\d+)$/);

            if (rangeMatch) {
                const minSalary = Number(rangeMatch[1]);
                const maxSalary = Number(rangeMatch[2]);

                // Add range condition to the query
                query.$or.push({
                    salary: { $gte: minSalary, $lte: maxSalary }
                });
            } else if (!isNaN(Number(keyword))) {
                // If it's a single number, filter for exact matches
                query.$or.push({ salary: Number(keyword) });
            }
        }

        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
// student
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications"
        });;


        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}
// admin kitne job create kra hai abhi tk
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path: 'company',
            createdAt: -1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
// admin job update karega
export const updateJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId = req.id; // Admin ID
        const updatedData = req.body;

        const job = await Job.findOneAndUpdate(
            { _id: jobId, created_by: userId },
            updatedData,
            { new: true }
        );

        if (!job) {
            return res.status(404).json({
                message: "Job not found or you are not authorized to update this job.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Job updated successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}
export const deleteJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId = req.id; // Admin ID

        const job = await Job.findOneAndDelete({ _id: jobId, created_by: userId });

        if (!job) {
            return res.status(404).json({
                message: "Job not found or you are not authorized to delete this job.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Job deleted successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};