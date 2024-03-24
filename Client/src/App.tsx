import { useEffect, useState } from "react";
import { fetchData } from "./helper/helper";

interface Q {
  id: number;
  name: string;
}

interface Home {
  msg: string;
  q: Q;
}

function App() {
  const [msg, setMsg] = useState<string>("");
  const [q, setQ] = useState<Q>({ id: 0, name: "" });

  useEffect(() => {
    fetchData<Home>()
      .then((data) => {
        const res = data;
        setMsg(res.msg);
        setQ(res.q);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <h1 className="btn btn-primary">Hello world!</h1>
      <br />
      <button className="btn btn-secondary">{msg}</button>
      <br />
      <h1>
        {q.id} {q.name}
      </h1>
    </>
  );
}

export default App;
