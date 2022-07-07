import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import img from "../assets/imgs/bill.jpg";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, fetchUserName } from "../firebase/clientApp";

function Navbar(props) {
  const [user, loading, error] = useAuthState(auth);
  const [username, setUsername] = useState("");
  const initializeUsername = async () => {
    setUsername(await fetchUserName(user?.uid));
  };

  useEffect(() => {
    // if (user) console.log(user);
    if (!username && !loading) {
      initializeUsername();
    }

    if (username && !loading) {
      console.log(username);
    }
    // console.log(fetchUserName(user?.uid));
  }, [username, user]);
  const data = [
    {
      id: 1,
      name: "Dashboard",
      d: "M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
      link: "/dashboard",
    },
    {
      id: 2,
      name: "Product",
      d: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
      link: "/product",
    },
    {
      id: 3,
      name: "Connect",
      d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
      link: "/connect",
    },
    {
      id: 4,
      name: "Income",
      d: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z",
      link: "/income",
    },
    {
      id: 5,
      name: "Promote",
      d: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z",
      link: "/promote",
    },
    {
      id: 6,
      name: "Help",
      d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      link: "/help",
    },
  ];

  const router = useRouter();

  return (
    <nav className="w-3/12">
      <div className="flex flex-col justify-between h-screen px-4">
        <div>
          <div className="h-24">
            <span className="flex justify-center w-full h-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="self-center w-10 h-10 mx-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <h1 className="flex self-center text-2xl font-bold">
                Dashboard
                <p className="self-end text-xs font-normal text-slate-500">
                  v.01
                </p>
              </h1>
            </span>
          </div>
          <div>
            {data.map((datas) => (
              <div
                key={datas.id}
                className={
                  router.asPath == datas.link
                    ? "text-white bg-blue-700 rounded-xl m-2"
                    : "m-2 text-stone-500 hover:bg-sky-200 rounded-xl"
                }
              >
                <Link href={datas.link}>
                  <a>
                    <div className="flex justify-start w-full px-4 py-2">
                      <div className="flex justify-start w-1/6">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-8 h-8"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d={datas.d}
                          />
                        </svg>
                      </div>
                      <p className="px-2 text-xl">{datas.name}</p>
                      <div
                        className={
                          router.asPath == datas.link
                            ? "hidden"
                            : "flex justify-end w-full"
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="self-center w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* <div className="flex flex-col justify-center px-4 mb-12">
          <div className="self-end w-full px-4 py-4 bg-gradient-to-r from-fuchsia-300 to-violet-600 rounded-2xl">
            <div className="flex flex-col text-center">
              <p className="text-lg font-semibold text-white">
                Upgrade to PRO to access all Features!
              </p>
              <a className="self-center w-3/4 py-2 mt-4 text-lg font-bold bg-white text-violet-900 rounded-2xl">
                Get Pro Now!
              </a>
            </div>
          </div> */}
        <div className="mt-12 mb-14">
          <div className="flex justify-between">
            <div className="flex ">
              <span className="self-center w-10 h-10 mx-2">
                <img src={img} alt="pfp" className="rounded-full" />
              </span>
              <span className="flex flex-col">
                <p className="font-semibold">{username}</p>
                <p className="font-light text-gray-500">Project Manager</p>
              </span>
            </div>
            <span className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="self-center w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
