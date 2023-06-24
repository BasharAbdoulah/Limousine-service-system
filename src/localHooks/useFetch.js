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
    if (params !== undefined) url = url + params;

    // `${url}?skip=${skip}&take=${take}`

    setLoading(true);
    const axiosConfig = {
      method: method,
      url: url,
      data: {
        ...body,
      },
      headers: {},
    };

    if (token) {
      axiosConfig.headers.Authorization = `Bearer ${cookie}`;
    }

    const response = await axios(axiosConfig).catch((err) => {
      setError(err?.response.data);
      setLoading(false);
    });

    setLoading(false);
    if (response) {
      setData(response?.data);
    }
  };

  return { data, error, loading, excuteFetch };
};

export default useFetch;
