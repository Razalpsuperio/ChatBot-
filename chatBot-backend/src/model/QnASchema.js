import mongoose from "mongoose";

const { Schema, model } = mongoose;

const QnASchema = new Schema({
  question: {
    type: String,
    required: true,
    unique: true 
  },
  answer: {
    type: String,
    required: true
  }
});

const QnA = model('QnA', QnASchema);

export default QnA;
