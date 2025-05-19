import mongoose, { Schema, Document, Model } from 'mongoose';

export interface CodeDocument extends Document {
  html: string;
  css: string;
  js: string;
  slug: string;
  name: string;
  userId: string;
  createdAt: Date;
}

const CodeSchema = new Schema<CodeDocument>({
  html: { type: String },
  css: { type: String },
  js: { type: String },
  slug: { type: String, unique: true },
  name: { type: String },
  userId: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const CodeModel: Model<CodeDocument> = mongoose.models.Code || mongoose.model('Code', CodeSchema);
export default CodeModel;
