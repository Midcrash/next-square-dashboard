import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/clientApp";
import { logInWithEmailAndPassword } from "../firebase/clientApp";

const Login = () => {
  const [user, loading, error] = useAuthState(auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (user) {
      router.push("/dashboard");
    }
  }, [user, loading]);

  return (
    <div className="w-full h-screen bg-slate-100">
      <div className="flex items-center justify-center w-full h-full">
        <div className="bg-white rounded-xl h-[35%] flex flex-col justify-evenly w-[20%] items-center">
          <span className="flex flex-col items-center w-full">
            <h1 className="text-2xl font-bold w-[80%]">Sign in</h1>
            <p className="text-lg text-gray-500 w-[80%]">
              New to Dashboard?{" "}
              <a
                onClick={() => router.push("/register")}
                className="text-blue-600"
              >
                Sign Up
              </a>
            </p>
          </span>
          <span className="flex flex-col items-center w-full text-xl">
            <label className="flex flex-col w-[80%]">
              Email address
              <input
                type="email"
                placeholder="Email"
                className="text-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="flex flex-col w-[80%]">
              Password
              <input
                type="password"
                placeholder="Password"
                className="text-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </span>
          <button
            className="text-white bg-gradient-to-r from-fuchsia-300 to-violet-600 rounded-2xl w-[80%] h-[10%]"
            onClick={() => logInWithEmailAndPassword(email, password)}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
