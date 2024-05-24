/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useRxjs } from "../context/RxjsContext";

const Component3 = () => {
  const key4 = "send-data3";
  const { getSubject } = useRxjs();
  const [text, setText] = useState("");

  /**
   * Viene recuperato e sottiscritto il subject con key4
   */
  useEffect(() => {
    console.log("Mounted component 3");
    const subject = getSubject(key4);
    console.log("Sub get:", subject);
    const subscribe = subject.subscribe((data) => {
      console.log("Data received", data);
      setText(data);
    });
    return () => {
      console.log("Unmounted");
      subscribe.unsubscribe();
    };
  }, []);
  return (
    <>
      <div style={{ border: "2px solid black", padding: "10px" }}>
        <h1>Component3</h1>
        <p>{text}</p>
      </div>
    </>
  );
};

export default Component3;
