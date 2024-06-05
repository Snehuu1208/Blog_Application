const blogSchema = require("../models/blogSchema");
const userSchema = require("../models/userSchema");

class Blogs {
  async createBlogs(req, res) {
    try {
      const { _id } = req.user.user;
      const { title, description, imageURL } = req.body;

      const newPost = await blogSchema.create({
        title: title,
        description: description,
        imageURL: imageURL.imgUrl,
        userId: _id,
      });
      return res.send(newPost);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }

  async allBlogs(req, res) {
    try {
      const allPost = await blogSchema.find({}).populate("userId", "username");

      return res.send(allPost);
    } catch (err) {
      res.status(500).send("Internal server error");
    }
  }

  async myBlogs(req, res) {
    try {
      const { _id } = req.user.user;
      const myPosts = await blogSchema
        .find({ userId: _id })
        .populate("userId", "username");

      return res.send(myPosts);
    } catch (err) {
      res.status(500).send("Internal server error");
    }
  }

  async updateLikes(req, res) {
    try {
      const loginUserId = req.user.user._id;
      const blog = await blogSchema.findById(req.params.id);

      if (!blog) {
        return res.status(404).json({ message: "Blog post not found" });
      }

      const update = blog.likes.includes(loginUserId)
        ? { $pull: { likes: loginUserId } }
        : { $addToSet: { likes: loginUserId } };

      const updatedBlog = await blogSchema.findByIdAndUpdate(
        req.params.id,
        update,
        { new: true }
      );

      return res.status(200).json(updatedBlog);
    } catch (error) {
      console.error("Error updating likes:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async verify(req, res) {
    const loginUserId = req.user.user._id;
    res.status(200).json({ id: loginUserId });
  }

  async editBlog(req, res) {
    try {
      // console.log("id", req.params.id);
      const updatedBlog = await blogSchema.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: req.body }
      );
      return res.status(200).json(updatedBlog);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async deleteBlog(req, res) {
    try {
      await blogSchema.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
const blogData = new Blogs();
module.exports = { blogData };
