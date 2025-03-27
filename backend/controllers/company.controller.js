import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;

        // Validate company name
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            });
        }

        // Check if the company already exists
        let company = await Company.findOne({ name: companyName });
        // console.log(company)
        if (company) {
            return res.status(400).json({
                message: "You can't register the same company again.",
                success: false
            });
        }

        // Create the company
        company = await Company.create({
            name: companyName,
            userId: req.id
        });

        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
        });
    } catch (error) {
        console.error("Error during company registration:", error);
        return res.status(500).json({
            message: "An error occurred while registering the company.",
            success: false
        });
    }
};

export const getCompany = async (req, res) => {
    try {
        const userId = req.id; // logged in user id
        const companies = await Company.find({ userId });

        // Check if companies exist for the user
        if (!companies || companies.length === 0) {
            return res.status(404).json({
                message: "No companies found for the user.",
                success: false
            });
        }

        return res.status(200).json({
            companies,
            success: true
        });
    } catch (error) {
        console.error("Error fetching companies:", error);
        return res.status(500).json({
            message: "An error occurred while fetching companies.",
            success: false
        });
    }
};

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);

        // Check if company exists
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }

        return res.status(200).json({
            company,
            success: true
        });
    } catch (error) {
        console.error("Error fetching company by ID:", error);
        return res.status(500).json({
            message: "An error occurred while fetching the company.",
            success: false
        });
    }
};

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;

        const updateData = { name, description, website, location };

        // Check if a logo file is uploaded
        if (req.file) {
            const file = req.file;
            const fileUri = getDataUri(file);

            // Upload file to Cloudinary
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

            // Handle errors during file upload
            if (!cloudResponse || !cloudResponse.secure_url) {
                return res.status(500).json({
                    message: "An error occurred while uploading the logo to Cloudinary.",
                    success: false
                });
            }

            // Include the logo URL if the file was uploaded successfully
            updateData.logo = cloudResponse.secure_url;
        }

        // Update company details
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        // Check if company exists
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company information updated successfully.",
            success: true,
            company
        });
    } catch (error) {
        console.error("Error updating company:", error);
        return res.status(500).json({
            message: "An error occurred while updating the company.",
            success: false
        });
    }
};
export const deleteCompany = async (req, res) => {
    try {
        const companyId = req.params.id;
        const userId = req.id; // Admin or the user who created the company

        // Find the company and check if the user is authorized to delete it
        const company = await Company.findOneAndDelete({ _id: companyId, userId });

        if (!company) {
            return res.status(404).json({
                message: "Company not found or you are not authorized to delete this company.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company deleted successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred while deleting the company.",
            success: false
        });
    }
};

