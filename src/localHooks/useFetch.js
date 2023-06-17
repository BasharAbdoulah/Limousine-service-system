import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";

// Fetch data
const useFetch = (url = "", method = "post", token = true) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const cookie = Cookies.get("authToken");
  const excuteFetch = async (isPageination, params, body = null) => {
    console.log(body);

    console.log("url", params);
    if (params !== undefined) url = url + params;

    // `${url}?skip=${skip}&take=${take}`

    setLoading(true);
    const { data: response } = await axios({
      method: method,
      url: url,
      data: {
        ...body,
      },
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });
    setLoading(false);
    if (response) {
      setData(response);
    } else {
      setError(response?.description);
    }
  };

  return { data, error, loading, excuteFetch };
};

export default useFetch;
