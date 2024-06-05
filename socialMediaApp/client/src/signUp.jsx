import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfmPassword, setCnfmPassword] = useState("");
  const navigate = useNavigate();

  const signUp = async (e) => {
    e.preventDefault();
    if (password !== cnfmPassword) {
      console.log("Password does not match");
      alert("Password does not match");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%*#?&])[A-Za-z\d@$#*].{8,}$/;
    if (!passwordRegex.test(password)) {
      console.log("Password does not meet the requirements");
      alert(
        "Password must be at least 8 characters long, contain one capital letter, one special character, and one numeric character"
      );
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/user/signup", {
        username,
        email,
        password,
      });
      console.log(response.data.user);

      if (response.data.user) {
        navigate("/");
        alert("Registered successfully");
      }
    } catch (err) {
      console.log("There was an error in sign up", err);
      alert("There was an error in sign up");
    }
  };

  return (
    <>
      <div className="bg-purple-100 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-lg bg-white shadow-md rounded-md p-6">
          <img
            className="mx-auto h-15 w-auto"
            src="signup.png"
            alt="User Icon"
          />
          <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign up for an account
          </h2>
          <form className="space-y-6" method="POST" onSubmit={signUp}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  type="text"
                  required
                  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                  autoComplete="email"
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
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="confirm_password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirm_password"
                  name="confirm_password"
                  value={cnfmPassword}
                  onChange={(e) => {
                    setCnfmPassword(e.target.value);
                  }}
                  type="password"
                  autoComplete="new-password"
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
                Register Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default SignUp;
