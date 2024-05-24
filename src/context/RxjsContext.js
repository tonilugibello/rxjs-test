import React, { createContext, useContext, useReducer } from "react";
import { Subject } from "rxjs";

const RxjsContext = createContext();

/**
 * Dichiariamo nello stato inziale del context RxJS un Map che conterrà i vari subject che verranno creati
 */
const initialState = {
  subjectList: new Map(),
  loading: false,
};

function RxjsReducer(state, action) {
  switch (action.type) {
    case "LOADING_START": {
      return { ...state, loading: true };
    }
    case "LOADING_END": {
      return { ...state, loading: false };
    }
    default:
      break;
  }
}

function RxjsProvider({ children }) {
  const [state, dispatch] = useReducer(RxjsReducer, initialState);

  const loadingStart = () => dispatch({ type: "LOADING_START" });
  const loadingEnd = () => dispatch({ type: "LOADING_END" });

  /**
   *
   * @param {string} key stringa che identifica il Subject appena creato
   *
   * La funzione permette di creare un Subject passando come argomento una Key.
   * Questo verrà salvato all'interno dell'oggetto map subjectList
   */
  const createSubj = (key) => {
    console.log("Creating subject:", key);
    console.log(state.subjectList);
    if (!state.subjectList.has(key)) {
      console.log("Non esiste");
      state.subjectList.set(key, new Subject());
    }
  };

  /**
   *
   * @param {string} key stringa che identifica quale Subject eliminare dalla lista
   *
   * Rimuove dalla lista il subject creato in precedenza tramite la sua key.
   */
  const removeSubj = (key) => {
    console.log("RemoveSubj:", key);
    state.subjectList.delete(key);
  };

  /**
   *
   * @param {string} key Stringa che identifica quale Subject utilizzare per l'invio del dato.
   * @param {*} data  Payload che viene inviato
   *
   * Emette il dato a tutti gli observer che hanno effettuato un Subscribe al subject
   */
  const emitData = (key, data) => {
    console.log("Emitting data:", key, data);
    const subj = state.subjectList.get(key);
    subj.next(data);
  };

  /**
   *
   * @param {string} key La stringa che identifica quale Subject recuperare
   * @returns {Subject} Il subject di interesse
   *
   * Restituisce il Subject selezionato tramite Key.
   */
  const getSubject = (key) => {
    console.log("getting data:", key);
    return state.subjectList.get(key);
  };

  return (
    <RxjsContext.Provider
      value={{
        ...state,
        emitData,
        loadingEnd,
        loadingStart,
        getSubject,
        createSubj,
        removeSubj,
      }}
    >
      {children}
    </RxjsContext.Provider>
  );
}

function useRxjs() {
  const context = useContext(RxjsContext);
  if (context === undefined) {
    throw new Error("useRxjs must be used within a PlantProvider");
  }
  return context;
}

export { RxjsProvider, useRxjs };
