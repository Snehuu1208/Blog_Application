import { Routes, Route } from "react-router-dom";
import Login from "./login";
import SignUp from "./signUp";
import BlogList from "./blogList";
import NewPost from "./createBlog";
import AuthProtected from "./authProtected";
import MyBlogs from "./myBlogs";
import Logout from "./logout";
import NotFoundPage from "./notFoundPage";

const Routing = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route exact path="/home" element={<AuthProtected Item={BlogList} />} />
      <Route exact path="/newPost" element={<AuthProtected Item={NewPost} />} />
      <Route exact path="/myBlogs" element={<AuthProtected Item={MyBlogs} />} />
      <Route exact path="/logout" element={<AuthProtected Item={Logout} />} />
    </Routes>
  );
};
export default Routing;
