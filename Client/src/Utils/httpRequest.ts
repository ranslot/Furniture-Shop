const SERVER_URL = "http://localhost:3000/" as const;

export async function getData(route: string = "") {
  const res = await fetch(SERVER_URL + route);
  return res.json();
}
export async function getDataWithAuth(route: string = "") {
  const res = await fetch(SERVER_URL + route, {
    method: "get",
    credentials: "include",
  });
  return res.json();
}

export async function postData<T>(data: T, route: string = "") {
  const res = await fetch(SERVER_URL + route, {
    method: "post",
    credentials: "include",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
}

export async function postDataWithFiles(data: FormData, route: string = "") {
  const res = await fetch(SERVER_URL + route, {
    method: "post",
    credentials: "include",
    body: data,
  });

  return res.json();
}
