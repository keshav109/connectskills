import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a job title'],
      trim: true,
      maxlength: [100, 'Job title cannot exceed 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Please provide a job description'],
      maxlength: [2000, 'Description cannot exceed 2000 characters']
    },
    workType: {
      type: String,
      required: [true, 'Please select a work type'],
      enum: ['cooking', 'fixing tapes', 'babysitting', 'other'],
      lowercase: true
    },
    workerRating: {
      type: Number,
      required: [true, 'Please specify worker rating'],
      min: 3,
      max: 5
    },
    yearsOfExperience: {
      type: Number,
      required: [true, 'Please provide years of experience required'],
      min: 0
    },
    jobUrgency: {
      type: String,
      required: [true, 'Please specify job urgency'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Please select a category'],
      enum: ['Plumbing', 'Electrical', 'Carpentry', 'HVAC', 'Painting', 'Other', 'Services']
    },
    budget: {
      type: Number,
      required: false,
      min: [10, 'Budget must be at least $10']
    },
    location: {
      type: String,
      required: false,
      trim: true
    },
    deadline: {
      type: Date,
      required: false,
      validate: {
        validator: function(v) {
          return !v || v > new Date();
        },
        message: 'Deadline must be in the future'
      }
    },
    skills: {
      type: [String],
      required: false,
      default: []
    },
    status: {
      type: String,
      enum: ['open', 'in-progress', 'completed', 'cancelled'],
      default: 'open'
    },
    customerId: {
      type: String,
      required: [true, 'Customer ID is required']
    },
    customerName: {
      type: String,
      required: [true, 'Customer name is required']
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

jobSchema.index({ customerId: 1, createdAt: -1 });
jobSchema.index({ status: 1 });
jobSchema.index({ category: 1 });

const Job = mongoose.model('Job', jobSchema);

export default Job;
