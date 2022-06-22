import React, { useEffect, useState } from "react";
import cookie from "js-cookie";
import { useRouter } from "next/router";

const CallbackCheck = () => {
  // Hydration error fix, More line 30
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { query } = useRouter();

  // Obtain Square Token using a POST request
  const obtainToken = async () => {
    const response = await fetch(
      "https://connect.squareupsandbox.com/oauth2/token",
      {
        method: "POST",
        headers: {
          "Square-Version": "2022-06-16",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
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
      var { code } = query.code;
      return <button onClick={obtainToken}>obtainToken</button>;
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
