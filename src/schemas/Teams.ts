import { Document, Schema, model } from 'mongoose'
import { UserInterface } from '../Interfaces/UserInterface'

interface TeamsInterface extends Document {
    messageId: string
    users: Array<UserInterface>
    finished: boolean
}

const TeamsSchema = new Schema({
  messageId: {
    type: String,
    required: true,
    unique: true
  },
  users: [{ authorId: String, author: String, placing: String }],
  finished: Boolean
}, {
  timestamps: true
})

export default model<TeamsInterface>('Teams', TeamsSchema)
