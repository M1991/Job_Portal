import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { 
    createJobsController,
    getAllJobsController,
    updateJobsController,
    deleteAllJobsController,
    JobsStatsController } from "../controller/jobsController.js";

const router = express.Router();


// routes
// CREATE  JOB
router.post('/create-job', userAuth, createJobsController);

// CREATE  JOB
router.get('/get-job', userAuth, getAllJobsController);

// UPDATE JOB || PATCH
router.patch('/update-job/:id', userAuth, updateJobsController);

// DELETE  JOB || delete
router.delete('/delete-job/:id', userAuth, deleteAllJobsController);

// JOBS STATS FILTER
router.get('/job-stats', userAuth, JobsStatsController);


export default router;