import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log("try");
      const response = await axios.post("http://localhost:5000/user/login", {
        email,
        password,
      });
      if (response.data.user) {
        // console.log(response);
        localStorage.setItem("token", response.data.user);
        navigate("/home");
        alert("login successfully");
      } else if (response.data.message === "User not found") {
        alert("User not found, Please Register");
      } else if (response.data.message === "Invalid Password Try agin!") {
        alert("Invalid Credentials");
      }
    } catch (error) {
      console.log("There was an error logging in", error);
      alert("There was an error logging in");
    }
  };
  return (
    <div className="bg-purple-100 flex h-screen items-center justify-center ">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded-md p-8">
          <img className="mx-auto h-15 w-auto" src="login.png" alt="" />

          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Login to your account
          </h2>

          <form className="space-y-6 mt-4" onSubmit={(e)=>handleSubmit(e)}>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-purple-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
              >
                Login
              </button>
            </div>
            <p className="text-sm font-light text-black-500 dark:text-black-400">
              Don’t have an account yet?{" "}
              <Link to="/signup">
                <b>Sign up</b>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
