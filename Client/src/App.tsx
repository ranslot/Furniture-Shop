import { useEffect, useState } from "react";
import { postData } from "./helpers/httpRequest";

type testFormData = {
  email: string;
  password: string;
};

type AuthUser = {
  token: string | null;
  id: number;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  modifiedAt: Date;
};

type ResponseData = {
  msg?: string;
  error?: object;
  user?: AuthUser;
  accessToken?: string;
  role?: "Admin" | "Guest" | "User";
};

function App() {
  const [responseText, setResponseText] = useState<ResponseData>({
    msg: "",
    error: {},
  });

  useEffect(() => {
    console.log(responseText);
  }, [responseText]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = Object.fromEntries(
      new FormData(e.currentTarget)
    ) as testFormData;

    try {
      const response = await postData<testFormData>(formData, "auth");
      const data = (await response.json()) as ResponseData;
      setResponseText(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} method="post">
        <label htmlFor="email">Email : </label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">Password : </label>
        <input type="password" name="password" id="password" />
        <button type="submit">submit</button>
      </form>
    </>
  );
}

export default App;
