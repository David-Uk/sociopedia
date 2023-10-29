import Post from "../models/post.js";
import User from "../models/user.js";

export const createPost = async (req, res) => {
  try {
    const { userId, description } = req.body;
    const picturePath = req.file.path;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      userPicturePath: user.picturePath,
      description,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    //   const post = await Post.find();
    return res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};
