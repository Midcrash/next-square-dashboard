import { data } from "autoprefixer";
import React, { useEffect, useState } from "react";
import cookie from "js-cookie";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [link, setLink] = useState(null);
  const [state, setState] = useState(null);

  useEffect(() => {
    // Fetchs URL from API link.js
    const fetchURL = async () => {
      const response = await fetch("/api/link");
      const data = await response.json().then((result) => {
        setLink(result.url), setState(result.state);
      });
      setIsLoading(false);
    };
    if (isLoading) {
      fetchURL();
    }
  }, [link]);

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <div className="">
          <a
            className="bg-sky-500"
            href={link}
            onClick={() =>
              cookie.set("Auth_State", state, {
                expires: Date.now() + 300000,
              })
            }
          >
            Authorize
          </a>
        </div>
      </div>
    );
  }
};

export default Auth;
