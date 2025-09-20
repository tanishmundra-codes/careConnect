// model.js

import mongoose from 'mongoose';

const replySchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    default: 'Anonymous Student',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const discussionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['general', 'anxiety', 'depression', 'academic', 'relationships', 'lifestyle'],
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  tags: [String],
  isAnonymous: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  replies: [replySchema], // Correctly defined as an array
});

const Discussion = mongoose.model('Discussion', discussionSchema);
const SupportGroup = mongoose.model('SupportGroup', new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  members: { type: Number, default: 0 },
  category: { type: String, required: true },
  moderator: { type: String, required: true },
  meetingTime: { type: String, required: true },
  isActive: { type: Boolean, default: true },
}));

export { Discussion, SupportGroup };