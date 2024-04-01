import { useState } from "react";
import { postData } from "./helpers/httpRequest";

// import { postData } from "./helpers/httpRequest";
interface FormData {
  email: string;
  password: string;
}

function App() {
  const [responseText, setResponseText] = useState({});
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormData({
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    });
    postData<FormData>(formData, "auth").then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setResponseText(data);
          console.log("Form submitted successfully ", responseText);
        });
      } else {
        console.error("Failed to submit form:", response.statusText);
      }
    });
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
