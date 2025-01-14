// app/(models)/ticket.js
import mongoose, { Schema } from 'mongoose'

mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI)
mongoose.Promise = global.Promise

const ticketSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    priority: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    status: {
      type: String,
      enum: ['Open', 'In Progress', 'Resolved', 'Closed'],
      default: 'Open',
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: false,
      default: null,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
      default: null,
    },
  },
  {
    timestamps: true,
  },
)

const Ticket = mongoose.models.Ticket || mongoose.model('Ticket', ticketSchema)

export default Ticket
