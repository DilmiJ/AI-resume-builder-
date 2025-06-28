import mongoose, { Document, Schema } from 'mongoose';

export interface IJobMatch extends Document {
  userId: mongoose.Types.ObjectId;
  resumeId: mongoose.Types.ObjectId;
  jobTitle: string;
  company: string;
  jobDescription: string;
  requiredSkills: string[];
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  recommendations: string[];
  salaryRange?: {
    min: number;
    max: number;
    currency: string;
  };
  location: string;
  jobType: 'full-time' | 'part-time' | 'contract' | 'internship' | 'remote';
  experienceLevel: 'entry' | 'mid' | 'senior' | 'executive';
  applicationStatus: 'not-applied' | 'applied' | 'interviewing' | 'rejected' | 'offered';
  jobUrl?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const JobMatchSchema = new Schema<IJobMatch>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  resumeId: {
    type: Schema.Types.ObjectId,
    ref: 'Resume',
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
    trim: true,
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  requiredSkills: [{
    type: String,
    trim: true,
  }],
  matchScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  matchedSkills: [{
    type: String,
    trim: true,
  }],
  missingSkills: [{
    type: String,
    trim: true,
  }],
  recommendations: [{
    type: String,
  }],
  salaryRange: {
    min: { type: Number },
    max: { type: Number },
    currency: { type: String, default: 'USD' },
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  jobType: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship', 'remote'],
    required: true,
  },
  experienceLevel: {
    type: String,
    enum: ['entry', 'mid', 'senior', 'executive'],
    required: true,
  },
  applicationStatus: {
    type: String,
    enum: ['not-applied', 'applied', 'interviewing', 'rejected', 'offered'],
    default: 'not-applied',
  },
  jobUrl: {
    type: String,
    trim: true,
  },
  notes: {
    type: String,
  },
}, {
  timestamps: true,
});

// Index for efficient queries
JobMatchSchema.index({ userId: 1, matchScore: -1 });
JobMatchSchema.index({ userId: 1, applicationStatus: 1 });

export default mongoose.models.JobMatch || mongoose.model<IJobMatch>('JobMatch', JobMatchSchema);
