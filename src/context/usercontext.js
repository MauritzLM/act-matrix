import { createContext } from "react";

export const userContext = createContext({ userMatrices: [], user: {}, selectedMatrix: {}, changeMatrix: () => { return 1 } });