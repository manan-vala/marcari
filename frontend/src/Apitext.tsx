import { useEffect, useState } from "react";
import axios from "axios";

export default function Apitext() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api")
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return <div>{message ? message : "Loading..."}</div>;
}
