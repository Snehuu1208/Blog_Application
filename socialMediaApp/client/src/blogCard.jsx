/* eslint-disable react/prop-types */
import { FiHeart } from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";

const BlogCard = ({
  title,
  description,
  imageURL,
  createdAt,
  likes,
  username,
  blogId,
  userId,
  handleLike,
}) => {
  const saveLikes = () => {
    handleLike(blogId);
  };

  return (
    <>
      <div className="min-h-screen bg-purple-100 flex items-center py-20 rounded-xl">
        <div className="container overflow-hidden mx-auto max-w-md bg-white rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transform transition-all duration-500 hover:rounded-xl">
          <div className="flex items-center justify-between px-4">
            <div className="flex justify-between items-center py-4">
              <div className="ml-3">
                <h1 className="text-2xl font-bold text-gray-800 cursor-pointer">
                  {username}
                </h1>
              </div>
            </div>
          </div>
          <img
            src={imageURL}
            className="w-full h-96 object-cover transform transition-all duration-500"
            alt=""
          />
          <div className="p-6">
            <h1 className="text-4xl font-bold text-gray-800 cursor-pointer ">
              {title}
            </h1>
            <p className="text-2xl font font-thin cursor-pointer h-32">
              {description}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center pl-4">
              {likes.includes(userId) ? (
                <AiFillHeart
                  className="text-red-500 cursor-pointer"
                  onClick={() => {
                    saveLikes();
                  }}
                />
              ) : (
                <FiHeart
                  className="text-gray-500 cursor-pointer"
                  onClick={() => {
                    saveLikes();
                  }}
                />
              )}
              <span className="ml-2">{likes.length} Likes</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">
                Created at {new Date(createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
