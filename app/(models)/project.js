import mongoose, { Schema } from 'mongoose'

mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI)
mongoose.Promise = global.Promise

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    dueDate: {
      type: Date,
      required: false, // Optional since it can be unknown
    },
    status: {
      type: String,
      enum: ['Not Started', 'In Progress', 'On Hold', 'Completed', 'Cancelled'],
      default: 'Not Started',
    },
    priority: {
      type: Number,
      min: 1,
      max: 5,
      default: 3,
    },
    owner: {
      type: String, // Could be changed to ObjectId if you implement user authentication
      required: true,
    },
    team: [
      {
        type: String, // Could be changed to ObjectId if you implement user authentication
      },
    ],
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    budget: {
      type: Number,
      min: 0,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

// Add indexes for frequently queried fields
projectSchema.index({ name: 1 })
projectSchema.index({ status: 1 })
projectSchema.index({ owner: 1 })

const Project =
  mongoose.models.Project || mongoose.model('Project', projectSchema)

export default Project
