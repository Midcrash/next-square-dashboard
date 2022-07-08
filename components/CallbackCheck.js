import React, { useEffect, useState } from "react";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, storeSquareInfo } from "../firebase/clientApp";

const CallbackCheck = () => {
  const [user, loading, error] = useAuthState(auth);
  // Hydration error fix, More line 30
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (user !== null) setMounted(true);
  }, [user]);

  const { query } = useRouter();

  // Obtain Square Token using a POST request
  const obtainToken = async (code) => {
    // Send Code and UID to callback
    const response = await fetch("/api/callback", {
      method: "POST",
      body: JSON.stringify({ code, user: user.uid }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response
      .json()
      .then((result) => {
        storeSquareInfo(
          result.accessToken,
          result.expiresAt,
          result.merchantId,
          result.refreshToken,
          user.uid
        );
      })
      .catch((err) => console.log(err));
  };

  // Hydration Error fix
  if (!mounted) return null;

  // Catches any errors that might occur.
  // Also, prints outs on the page
  const handleRender = () => {
    if (query.state !== cookie.get("Auth_State")) {
      return (
        <div className="container h-screen p-4 mx-auto">
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col justify-center items-center bg-gray-500 h-[50%] w-[75%]">
              <p>Authorization Failure</p>
              <p>States not equal</p>
              <p>{query.state}</p>
              <p>{cookie.get("Auth_State")}</p>
            </div>
          </div>
        </div>
      );
    } else if (query.error) {
      if (
        "access_denied" === query.error &&
        "user_denied" === query.error_description
      ) {
        return (
          <div className="container h-screen p-4 mx-auto">
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col justify-center items-center bg-red-500 h-[50%] w-[75%]">
                <p>Authorization Denied</p>
                <p>You chose to deny access to the app.</p>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="container h-screen p-4 mx-auto">
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col justify-center items-center bg-red-500 h-[50%] w-[75%]">
                <p>Authorization Denied</p>
                <p>{query.error}</p>
                <p>{query.error_description}</p>
              </div>
            </div>
          </div>
        );
      }
    } else if ("code" === query.response_type) {
      // Obtain token when authorization is successful
      return (
        <div
          className="container h-screen p-4 mx-auto"
          onLoad={obtainToken(query.code)}
        >
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col justify-center items-center bg-green-500 h-[50%] w-[75%]">
              <p>Authorization Successful</p>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container h-screen p-4 mx-auto">
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col justify-center items-center bg-gray-500 h-[50%] w-[75%]">
              <p>Authorization Failure</p>
            </div>
          </div>
        </div>
      );
    }
  };

  return <div>{handleRender()}</div>;
};

export default CallbackCheck;
