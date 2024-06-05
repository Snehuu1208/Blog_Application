import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FiCamera } from "react-icons/fi";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "./firebase";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState(null);
  const [imageURL, setImageURL] = useState({});
  const [progressPerct, setProgressPerct] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const uploadFile = (file, fileType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, "images/" + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgressPerct(progress);
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImageURL((prev) => {
            return {
              ...prev,
              [fileType]: downloadURL,
            };
          });
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      // console.log(token);
      console.log(imageURL);
      const response = await axios.post(
        "http://localhost:5000/blog/create",
        {
          title,
          description,
          imageURL,
        },
        { headers: { token } }
      );

      if (response) {
        navigate("/home");
        alert("Registered successfully");
      }
    } catch (error) {
      console.log("There was an error creating the post ", error);
      alert("There was an error creating the post ");
    }
  };

  return (
    <>
      <header className=" dark:bg-gray-900 shadow-md">
        <div className="container mx-auto flex justify-center items-center p-4">
          <div className="text-white text-5xl font-semibold mx-auto ">
            New Post
          </div>
          <Link to="/home" className="text-white hover:text-purple-500">
            Back
          </Link>
        </div>
      </header>

      <div className="min-h-screen bg-purple-100">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className=" bg-white editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl"
        >
          <img
            className="mx-auto h-auto w-auto pb-6"
            src="createblog.jpg"
            alt=""
          />
          <input
            className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
            spellCheck="false"
            placeholder="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
            spellCheck="false"
            maxLength={200}
            placeholder="Describe everything about this post here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="file-upload flex items-center mb-4 p-3">
            <label className="flex items-center cursor-pointer ">
              <FiCamera className="mr-2 text-indigo-500" size={24} />
              <span className="text-gray-700 font-semibold">Upload Image</span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  setImg(e.target.files[0]);
                  setIsUploading(true);
                }}
              />
            </label>
          </div>

          {isUploading && (
            <div className="w-full">
              <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-blue-700 dark:text-black">
                  Uploading...
                </span>
                <span className="text-sm font-medium text-blue-700 dark:text-black">
                  {progressPerct}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${progressPerct}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="buttons flex p-6">
            <button
              type="button"
              className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto"
              onClick={() => {
                setTitle("");
                setDescription("");
                setIsUploading(false);
                navigate("/newPost");
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewPost;
