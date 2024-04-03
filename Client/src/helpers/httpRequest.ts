const SERVER_URL = "http://localhost:3000/" as const;

export const getData = async <T>(route: string = "") => {
  try {
    const response = await fetch(SERVER_URL + route);
    return response.json() as Promise<T>;
  } catch (error) {
    throw new Error();
  }
};

export async function postData<T>(data: T, route: string = "") {
  const response = await fetch(SERVER_URL + route, {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}
