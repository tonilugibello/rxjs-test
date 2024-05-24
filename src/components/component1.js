import { Button, Input, Switch } from "antd";
import React, { useEffect } from "react";
import { useRxjs } from "../context/RxjsContext";

const Component1 = () => {
  const { emitData, createSubj, removeSubj } = useRxjs();

  /**
   * Vengono dichiarate le Key che serviranno a creare e identificare i vari Subject
   */
  const key = "send-data";
  const key2 = "send-data2";
  const key3 = "disable-component";
  const key4 = "send-data3";

  /**Lo useEffect che viene lanciato al render del Component1 crea 4 subject che verrano poi riutilizzati all'interno del codice */
  useEffect(() => {
    createSubj(key);
    createSubj(key2);
    createSubj(key3);
    createSubj(key4);

    /**Quando il componente viene smontato, rimuoviamo i relativi subject creati, che non verranno più utilizzati */
    return () => {
      removeSubj(key);
      removeSubj(key2);
      removeSubj(key3);
      removeSubj(key4);
    };
  }, []);

  /**
   *
   */
  const onClick = () => {
    emitData(key, `Data sent! ${Math.random()}`);
  };

  /**
   * Viene inviato un numero casuale all'obserer iscritto al/ai subject con key2
   */
  const onClick2 = () => {
    emitData(key2, `Data sent! ${Math.random() * 1000}`);
  };

  /**
   *
   * @param {boolean} v Il valore fornito dallo switch
   *
   * Invia un booleano all'observer iscritto al/ai subject con key3
   */
  const onSwitch = (v) => {
    console.log("v", v);
    emitData(key3, v);
  };

  /**
   *
   * @param {*} e evento scaturito dall'input
   *
   * Al cambiare del contenuto dell'input aggiorna la stringa inviandola all'observer/agli observer con key4
   */
  const onChange = (e) => {
    console.log("Value changed", e.target.value);
    emitData(key4, e.target.value);
  };

  /**Vengono renderizzati per testare i bottoni, lo switch, e l'input che comunicano con gli altri componenti */
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
