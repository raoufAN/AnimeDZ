import { useContext } from "react";
import globalContext from "./GlobalContext";

const useGlobalContext = () => {
  return useContext(globalContext);
};

export default useGlobalContext;
