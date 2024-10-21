import { createContext } from "react";

export const userContext = createContext({
    userMatrices: [],
    updateUserMatrices: () => { return 1 },
    user: {},
    selectedMatrix: {},
    changeMatrix: () => { return 1 },
    userMatricesStatus: 'Loading',
    updateMatricesStatus: () => { return 1 }
});