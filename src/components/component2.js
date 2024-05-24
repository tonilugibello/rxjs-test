import React, { useEffect, useState } from "react";
import { useRxjs } from "../context/RxjsContext";
import Component3 from "./component3";

const Component2 = () => {
  const [variable, setVariable] = useState("");
  const [variable2, setVariable2] = useState("");
  const [switchV, setSwitchV] = useState(true);

  const { getSubject } = useRxjs();
  const key = "send-data";
  const key2 = "send-data2";
  const key3 = "disable-component";

  useEffect(() => {
    const subject = getSubject(key);
    const subject2 = getSubject(key2);
    const subject3 = getSubject(key3);
    const subscription1 = subject.subscribe((data) => {
      setVariable(data);
    });
    const subscription2 = subject2.subscribe((data) => {
      setVariable2(data);
    });
    const subscription3 = subject3.subscribe((data) => {
      setSwitchV(data);
      console.log("Switched", data);
    });

    return () => {
      subscription2.unsubscribe();
      subscription1.unsubscribe();
      subscription3.unsubscribe();
    };
  }, []);
  return (
    <div style={{ border: "2px solid yellow", padding: "10px" }}>
      <h1>Component2</h1>
      <p>{variable}</p>
      <p>{variable2}</p>
      {switchV && <Component3></Component3>}
    </div>
  );
};

export default Component2;
