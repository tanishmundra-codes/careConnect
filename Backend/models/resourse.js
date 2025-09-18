// models/Resource.js
import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["video", "audio", "article", "exercise"],
      required: true,
    },
    category: {
      type: String,
      enum: ["videos", "audio", "articles", "exercises"],
      required: true,
    },
    duration: {
      type: String, // e.g., "12:30" or "8 min read"
      required: true,
    },
    language: {
      type: String,
      enum: ["english", "hindi", "tamil", "bengali", "marathi"],
      default: "english",
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Resource = mongoose.model("Resource", resourceSchema);

export default Resource;
