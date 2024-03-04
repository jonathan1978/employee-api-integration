import mongoose, { Schema, type Document } from 'mongoose'

interface ApiKey extends Document {
  key: string
}

const apiKeySchema: Schema = new Schema({
  key: { type: String, required: true, unique: true }
})

const ApiKeyModel = mongoose.model<ApiKey>('test', apiKeySchema, 'apiKeys')

export default ApiKeyModel
