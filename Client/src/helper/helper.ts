import axios from "axios";

const SERVER_URL = "http://localhost:3000" as const;

export const fetchData = async <T>() => {
  try {
    const response = await axios(SERVER_URL);
    return response.data as Promise<T>;
  } catch (error) {
    throw new Error();
  }
};
