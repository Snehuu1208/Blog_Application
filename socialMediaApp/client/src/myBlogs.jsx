import MyBlogCard from "./myBlogCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MyBlogs = () => {
  const [blogData, setBlogData] = useState([]);
  const [userId, setUserId] = useState("");

  const handleEdit = async (blogId, newDescription, newTitle) => {
    // console.log(blogId);
    // console.log(newDescription);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/blog/edit/${blogId}`,
        { description: newDescription, title: newTitle },
        {
          headers: { token },
        }
      );
      if (response.status === 200) {
        setBlogData((prevData) =>
          prevData.map((blog) =>
            blog._id === blogId
              ? { ...blog, description: newDescription }
              : blog
          )
        );
        setBlogData((prevData) =>
          prevData.map((blog) =>
            blog._id === blogId ? { ...blog, title: newTitle } : blog
          )
        );
      }
      console.log(blogData);
    } catch (err) {
      console.log("Error editing the blog", err);
    }
  };

  const handleDelete = async (blogId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:5000/blog/delete/${blogId}`,
        {
          headers: { token },
        }
      );
      if (response.status === 200) {
        setBlogData((prevData) =>
          prevData.filter((blog) => blog._id !== blogId)
        );
        alert("Blog deleted successfully");
        window.location.reload();
      }
    } catch (err) {
      console.log("Error deleting the blog", err);
    }
  };

  const verify = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:5000/blog/verify`, {
        headers: { token },
      });
      setUserId(response.data.id);
    } catch (err) {
      console.log("Error in liking the blog");
    }
  };

  const handleLike = async (blogId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/blog/like/${blogId}`,
        {},
        {
          headers: { token },
        }
      );
      // console.log("jhj", response.data);
      const updatedData = blogData.map((blog) =>
        blog._id === response.data._id ? response.data : blog
      );
      setBlogData(updatedData);
    } catch (err) {
      console.log("Error liking the blog");
    }
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/blog/profile", {
          headers: { token },
        });
        setBlogData(response.data);
      } catch (err) {
        console.log("Error in fetching the blog data");
      }
    };
    verify();
    fetchBlog();
  }, []);

  return (
    <>
      <header className=" dark:bg-gray-900 shadow-md">
        <div className="container mx-auto flex justify-between items-center p-4 ">
          <div className="text-white text-5xl font-semibold mx-auto pl-20">
            My Blogs
          </div>
          <nav className="space-x-4 ml-auto ">
            <Link to="/home" className="text-white hover:text-purple-500">
              Home
            </Link>
            <Link to="/logout" className="text-white hover:text-purple-500">
              Logout
            </Link>
          </nav>
        </div>
      </header>
      <div className="min-h-screen bg-purple-100 flex flex-wrap items-center overflow-hidden py-20">
        <div className="container mx-auto my-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogData.map((blog, index) => (
            <MyBlogCard
              key={index}
              title={blog.title}
              description={blog.description}
              imageURL={blog.imageURL}
              createdAt={blog.createdAt}
              likes={blog.likes}
              username={blog.userId.username}
              blogId={blog._id}
              handleEdit={handleEdit}
              handleDelete={() => handleDelete(blog._id)}
              userId={userId}
              handleLike={handleLike}
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default MyBlogs;
