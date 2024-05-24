import { Button, Input, Switch } from "antd";
import React, { useEffect } from "react";
import { useRxjs } from "../context/RxjsContext";

const Component1 = () => {
  const { emitData, createSubj, removeSubj } = useRxjs();

  //Le key che permettono ti distinguere i vari eventi senza sovrapporli o affidarli allo stesso subject
  const key = "send-data";
  const key2 = "send-data2";
  const key3 = "disable-component";
  const key4 = "send-data3";
  useEffect(() => {
    createSubj(key);
    createSubj(key2);
    createSubj(key3);
    createSubj(key4);

    return () => {
      removeSubj(key);
      removeSubj(key2);
      removeSubj(key3);
      removeSubj(key4);
    };
  }, []);

  const onClick = () => {
    emitData(key, `Data sent! ${Math.random()}`);
  };
  const onClick2 = () => {
    emitData(key2, `Data sent! ${Math.random() * 1000}`);
  };
  const onSwitch = (v) => {
    console.log("v", v);
    emitData(key3, v);
  };

  const onChange = (v) => {
    console.log("Value changed", v.target.value);
    emitData(key4, v.target.value);
  };
  return (
    <>
      <div style={{ border: "2px solid red", padding: "10px" }}>
        <h1>Component1</h1>
        <div>
          <Input style={{ width: "20rem" }} onChange={onChange}></Input>
        </div>
        <Button onClick={onClick}>SendData</Button>
        <Button onClick={onClick2}>SendData2</Button>
        <Switch defaultValue={true} onChange={onSwitch}></Switch>
      </div>
    </>
  );
};

export default Component1;
