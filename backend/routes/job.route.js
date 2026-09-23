import express from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";

import {
    deleteJob,
    getAdminJobs,
    getAllJobs,
    getJobById,
    postJob,
    updateJob
} from "../controllers/job.controller.js";

const router = express.Router();


// ==========================================
// PUBLIC JOB ROUTES
// ==========================================

// Anyone can view available jobs.
router.route("/get").get(getAllJobs);

// Anyone can view the details of a job.
router.route("/get/:id").get(getJobById);


// ==========================================
// PROTECTED JOB ROUTES
// ==========================================

// Only authenticated users can post jobs.
router.route("/post").post(isAuthenticated, postJob);

// Only authenticated users can view admin jobs.
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);

// Only authenticated users can update jobs.
router.route("/update/:id").put(isAuthenticated, updateJob);

// Only authenticated users can delete jobs.
router.route("/delete/:id").delete(isAuthenticated, deleteJob);


export default router;