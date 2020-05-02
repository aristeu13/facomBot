import { Document, Schema, model } from 'mongoose'

interface UserInterface extends Document {
    email?: string
    name?: string
    passwotd?: string
}

const UserSchema = new Schema({
  email: String,
  name: String,
  password: String
}, {
  timestamps: false
})

export default model<UserInterface>('User', UserSchema)
