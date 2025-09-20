// p2pController.js

import { Discussion, SupportGroup } from '../models/p2p.js';

// Get all discussions
export const getAllDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.find().sort({ createdAt: -1 });
    res.status(200).json(discussions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching discussions', error: error.message });
  }
};

// Create a new discussion
export const createDiscussion = async (req, res) => {
  try {
    const { title, content, category, author, tags } = req.body;
    if (!title || !content || !category) {
      return res.status(400).json({ message: 'Missing required fields: title, content, and category.' });
    }

    const newDiscussion = new Discussion({
      title,
      content,
      category,
      author: author || 'Anonymous Student',
      tags: tags || [],
    });

    await newDiscussion.save();
    res.status(201).json(newDiscussion);
  } catch (error) {
    res.status(500).json({ message: 'Error creating discussion', error: error.message });
  }
};

// Update discussion likes
export const likeDiscussion = async (req, res) => {
  try {
    const { id } = req.params;
    const discussion = await Discussion.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true });
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }
    res.status(200).json(discussion);
  } catch (error) {
    res.status(500).json({ message: 'Error liking discussion', error: error.message });
  }
};

// Add a reply to a discussion
export const addReply = async (req, res) => {
  try {
    const { content, author } = req.body;
    const { id } = req.params;

    if (!content || typeof content !== 'string' || content.trim() === '') {
      return res.status(400).json({ message: 'Reply content cannot be empty.' });
    }

    const discussion = await Discussion.findById(id);
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }

    // THIS IS THE FINAL, ROBUST FIX:
    // Ensure the replies field is an array. If it's a number or missing, overwrite it.
    if (!discussion.replies || typeof discussion.replies !== 'object' || !Array.isArray(discussion.replies)) {
      discussion.replies = [];
    }

    const newReply = { content, author, createdAt: new Date() };
    discussion.replies.push(newReply);

    await discussion.save();
    res.status(200).json(discussion);
  } catch (error) {
    console.error('Error in addReply:', error);
    res.status(500).json({
      message: 'Error adding reply',
      error: error.message,
    });
  }
};
// Get all support groups
export const getAllSupportGroups = async (req, res) => {
  try {
    const supportGroups = await SupportGroup.find();
    res.status(200).json(supportGroups);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching support groups', error: error.message });
  }
};

// You can add more controller functions here as needed