import { useEffect, useState } from "react";
import { postData } from "./helpers/httpRequest";

type testFormData = {
  email: string;
  password: string;
};

function App() {
  const [responseText, setResponseText] = useState<testFormData>({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (responseText.email && responseText.password) {
      console.log("Form submitted successfully ", responseText);
    }
  }, [responseText]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = Object.fromEntries(
      new FormData(e.currentTarget)
    ) as testFormData;

    try {
      const response = await postData<testFormData>(formData, "auth");
      const data = (await response.json()) as testFormData;
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
      {responseText.email && <p>{responseText.email}</p>}
    </>
  );
}

export default App;
