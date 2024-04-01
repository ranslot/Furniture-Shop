const SERVER_URL = "http://localhost:3000/" as const;

export const getData = async <T>(route: string = "") => {
  try {
    const response = await fetch(SERVER_URL + route);
    return response.json() as Promise<T>;
  } catch (error) {
    throw new Error();
  }
};

export const postData = async <T>(route: string = "", data: T) => {
  try {
    const response = await fetch(SERVER_URL + route, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    throw new Error();
  }
};
