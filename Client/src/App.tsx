import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [msg, setMsg] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios("http://localhost:3000");
        setMsg(response.data); // Update msg with actual data
      } catch (error) {
        console.error(error); // Handle errors gracefully
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <h1 className="btn btn-primary">Hello world!</h1>
      <br />
      <button className="btn btn-secondary">{msg ? msg : "failed"}</button>
    </>
  );
}

export default App;
