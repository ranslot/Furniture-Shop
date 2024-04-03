const SERVER_URL = "http://localhost:3000/" as const;

export async function getData(route: string = "") {
  const response = await fetch(SERVER_URL + route);
  return response.json();
}
export async function getUserByToken(route: string = "") {
  const response = await fetch(SERVER_URL + route, {
    method: "get",
    credentials: "include",
  });
  return response.json();
}

export async function postData<T>(data: T, route: string = "") {
  const response = await fetch(SERVER_URL + route, {
    method: "post",
    credentials: "include",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}
