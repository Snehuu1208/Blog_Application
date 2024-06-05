const express = require("express");
const { blogData } = require("../controllers/blogController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, blogData.createBlogs);
router.get("/showAll", authMiddleware, blogData.allBlogs);
router.get("/profile", authMiddleware, blogData.myBlogs);
router.put("/like/:id", authMiddleware, blogData.updateLikes);
router.put("/edit/:id", authMiddleware, blogData.editBlog);
router.delete("/delete/:id", authMiddleware, blogData.deleteBlog);
router.get("/verify", authMiddleware, blogData.verify);

module.exports = router;
