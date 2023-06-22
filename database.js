import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export default async function main() {
  await mongoose.connect(`mongodb://${process.env.DB_HOST}/honeydew`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
