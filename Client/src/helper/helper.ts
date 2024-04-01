const SERVER_URL = "http://localhost:3000" as const;

export const fetchData = async <T>() => {
  try {
    const response = await fetch(SERVER_URL);
    return response.json() as Promise<T>;
  } catch (error) {
    throw new Error();
  }
};
