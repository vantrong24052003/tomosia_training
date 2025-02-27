import express from 'express';
import User from '../models/User.js';
import Post from '../models/Post.js';

const routerPosts = express.Router();

routerPosts.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// create post
routerPosts.post('/', async (req, res) => {
  const { authorId, title, content } = req.body;
  
  try {
    const author = await User.findById(authorId);
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }
    const post = new Post({
      author: authorId,
      title,
      content,
      status : true
    });
    const newPost = await post.save();
    return res.json(newPost);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

// update post
routerPosts.put('/:id', async (req, res) => {
  const { authorId, title, content, status } = req.body;
  const postId = req.params.id
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (authorId) {
      const author = await User.findById(authorId);
      if (!author) {
        return res.status(404).json({ message: 'Author not found' });
      }
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.status = status || post.status;
    post.updatedAt = Date.now();

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// delete posts
routerPosts.delete('/:id', async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findById(postId);
    if (post) {
      await post.deleteOne();
      res.json({ message: 'Post deleted' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default routerPosts