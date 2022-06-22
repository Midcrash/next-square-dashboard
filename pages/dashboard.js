import React, { useEffect, useState } from "react";
import Dashboards from "../components/Dashboard";
import Navbar from "../components/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, fetchUserName } from "../firebase/clientApp";
import { useRouter } from "next/router";
import { logOut } from "../firebase/clientApp";

const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);

  const router = useRouter();

  useEffect(() => {
    if (!(user || loading)) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const doSomething = async () => {
    setUsername(await fetchUserName(user?.uid));
  };

  return (
    <div className="flex">
      <a onClick={logOut}>LOGOUT</a>
      <Navbar />
      <Dashboards />
    </div>
  );
};

export default Dashboard;
