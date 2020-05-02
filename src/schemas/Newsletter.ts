import { Document, Schema, model } from 'mongoose'

interface NewsletterInterface extends Document {
    title: string
    img: string
    description: string
}

const NewsletterSchema = new Schema({
  title: String,
  img: String,
  description: String
}, {
  timestamps: true
})

export default model<NewsletterInterface>('Newsletter', NewsletterSchema)
