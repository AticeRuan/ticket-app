import mongoose, { Schema } from 'mongoose'

mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI)
mongoose.Promise = global.Promise

const ticketSchema = new Schema(
  {
    title: String,
    description: String,
    category: String,
    priority: Number,
    progress: Number,
    status: String,
    active: Boolean,
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: false,
    },
  },
  {
    timestamps: true,
  },
)

const Ticket = mongoose.models.Ticket || mongoose.model('Ticket', ticketSchema)

export default Ticket
