import React, { useEffect, useState } from "react";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import axios from "axios";

const CallbackCheck = () => {
  // Hydration error fix, More line 30
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { query } = useRouter();

  // Obtain Square Token using a POST request
  const obtainToken = async (code) => {
    const headers = {
      "Square-Version": "2022-06-16",
      "Content-Type": "application/json",
    };

    const params = {
      client_id: process.env.NEXT_PUBLIC_SQ_APPLICATION_ID,
      client_secret: process.env.NEXT_PUBLIC_SQ_APPLICATION_SECRET,
      grant_type: "authorization_code",
      code: code,
    };

    axios
      .post("https://connect.squareupsandbox.com/oauth2/token", null, {
        headers: headers,
        params: params,
      })
      .then((response) => console.log(response))
      .catch((err) => console.warn(err));
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
      return (
        <button onClick={() => obtainToken(query.code)}>obtainToken</button>
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
