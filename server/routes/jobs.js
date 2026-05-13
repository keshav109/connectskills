import express from 'express';
import Job from '../models/Job.js';

const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const { 
      title, 
      description, 
      category, 
      budget, 
      location, 
      deadline, 
      skills, 
      customerId, 
      customerName,
      workType,
      workerRating,
      yearsOfExperience,
      jobUrgency,
      status
    } = req.body;

    if (!title || !description || !customerId || !customerName) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, description, customerId, and customerName'
      });
    }

    const jobData = {
      title,
      description,
      customerId,
      customerName,
      category: category || 'Services',
      status: status || 'open'
    };

    // Add optional fields if provided
    if (budget) jobData.budget = parseFloat(budget);
    if (location) jobData.location = location;
    if (deadline) jobData.deadline = new Date(deadline);
    if (skills) jobData.skills = skills;
    if (workType) jobData.workType = workType;
    if (workerRating) jobData.workerRating = parseFloat(workerRating);
    if (yearsOfExperience !== undefined) jobData.yearsOfExperience = parseFloat(yearsOfExperience);
    if (jobUrgency) jobData.jobUrgency = jobUrgency;

    const job = new Job(jobData);
    await job.save();

    res.status(201).json({
      success: true,
      message: 'Job posted successfully',
      data: job
    });
  } catch (error) {
    console.error('Error creating job:', error);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Error creating job'
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: jobs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    res.status(200).json({
      success: true,
      data: job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.get('/customer/:customerId', async (req, res) => {
  try {
    const jobs = await Job.find({ customerId: req.params.customerId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: jobs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;
