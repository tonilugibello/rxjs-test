import React, { createContext, useContext, useReducer } from "react";
import { Subject } from "rxjs";

const RxjsContext = createContext();

const initialState = {
  subjectList: new Map(),
  loading: false,
};

function RxjsReducer(state, action) {
  switch (action.type) {
    /*     case "SET_PLANT_LIST": {
      return { ...state, plantList: action.payload };
    }
    case "SET_SELECTED_PLANT": {
      return { ...state, selectedPlant: action.payload };
    } */
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

  //Creazione del subject (Contiene sia observer che observable)
  const createSubj = (key) => {
    console.log("Creating subject:", key);
    console.log(state.subjectList);
    if (!state.subjectList.has(key)) {
      console.log("Non esiste");
      state.subjectList.set(key, new Subject());
    }
  };

  //rimozione dalla lista dei subject
  const removeSubj = (key) => {
    console.log("RemoveSubj:", key);
    state.subjectList.delete(key);
  };

  //Emissione dei dati per un subject specifico
  const emitData = (key, data) => {
    console.log("Emitting data:", key, data);
    const subj = state.subjectList.get(key);
    subj.next(data);
  };

  //Get subject by key
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
