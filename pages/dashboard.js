import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import Navbar from "../components/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, fetchUserName } from "../firebase/clientApp";
import { useRouter } from "next/router";
import { logOut } from "../firebase/clientApp";

const dashboard = () => {
  const [user, loading, error] = useAuthState(auth);
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push("/login");
    }
    setUsername(fetchUserName(user));
  }, [user, loading]);

  return (
    <div className="flex">
      <Navbar user={user} username={username} />
      <Dashboard user={user} username={username} />
    </div>
  );
};

export default dashboard;
