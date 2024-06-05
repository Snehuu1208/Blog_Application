/* eslint-disable react/prop-types */
import { useState } from "react";
import { FiEdit, FiTrash, FiHeart } from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";

const MyBlogCard = ({
  title,
  description,
  imageURL,
  createdAt,
  likes,
  username,
  blogId,
  handleEdit,
  handleDelete,
  userId,
  handleLike,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedTitle, setEditedTitle] = useState(title);

  const saveLikes = () => {
    handleLike(blogId);
  };

  const saveEdit = () => {
    handleEdit(blogId, editedDescription, editedTitle);
    setIsEditing(false);
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
            alt={title}
          />
          <div className="p-6">
            {isEditing ? (
              <textarea
                className="text-gray-800 w-full border rounded p-2 mb-4 "
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
            ) : (
              <p className="text-4xl font-bold text-gray-800 cursor-pointer ">
                {title}
              </p>
            )}

            {isEditing ? (
              <textarea
                className="w-full border rounded p-2 mb-4"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
            ) : (
              <p className="text-2xl font-thin cursor-pointer h-32">{description}</p>
            )}
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

          <div className="flex justify-between space-x-2 px-6 pt-4 pb-4">
            {isEditing ? (
              <>
                <button
                  className="btn bg-green-500 text-white px-4 py-2 rounded mr-2"
                  onClick={saveEdit}
                >
                  Save
                </button>
                <button
                  className="btn bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn bg-blue-500 text-white px-4 py-2 rounded flex items-center"
                  onClick={() => setIsEditing(true)}
                >
                  <FiEdit className="mr-1" />
                  Edit
                </button>
                <button
                  className="btn bg-red-500 text-white px-4 py-2 rounded flex items-center"
                  onClick={() => handleDelete(blogId)}
                >
                  <FiTrash className="mr-1" />
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyBlogCard;
