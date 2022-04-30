import React, { useEffect, useState } from "react";
import { registerWithEmailAndPassword } from "../firebase/clientApp";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/clientApp";

const register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [user, loading, error] = useAuthState(auth);

  const router = useRouter();

  const register = () => {
    if (!name) alert("Enter name!");
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) {
      router.push("/dashboard");
    }
  }, [user, loading]);

  return (
    <div className="h-screen bg-slate-100">
      <div className="flex items-center justify-center h-full">
        <span className="flex flex-col bg-white rounded-xl h-[40%] w-[20%] items-center justify-evenly">
          <span className="flex flex-col  w-[80%]">
            <h1 className="text-2xl font-bold">Let's create your account</h1>
            <p className="text-gray-500 text-md">
              Sign up for Dashboard it's fast and free!
            </p>
            <p className="text-gray-500 text-md">
              Already have an account?{" "}
              <a
                className="text-blue-600"
                onClick={() => router.push("/login")}
              >
                Sign In
              </a>
            </p>
          </span>
          <span className="flex flex-col items-center w-full text-xl">
            <label className="flex flex-col w-[80%]">
              Username
              <input
                type="text"
                className="text-lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Username"
              />
            </label>
            <label className="flex flex-col w-[80%]">
              Email
              <input
                type="email"
                className="text-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </label>
            <label className="flex flex-col w-[80%]">
              Password
              <input
                type="password"
                className="text-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </label>
          </span>
          <button
            className="text-white bg-gradient-to-r from-fuchsia-300 to-violet-600 rounded-2xl w-[80%] h-[10%] text-xl justify-center items-center flex"
            onClick={register}
          >
            Register
          </button>
        </span>
      </div>
    </div>
  );
};

export default register;
