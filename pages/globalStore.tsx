import { useState } from "react";

let store: {[x: string]: any} = {};

const globalStore = {};

export const setGlobal = (key: any, value: any) => {
    store = { ...store, [key]: value };
}

export const getGlobal = (key: any) => {
    return store[key];
}

// export default ()=> {
//     const [showSettingsMenu, setShowSettingsMenu] = useState<boolean>(false)
//     return {showSettingsMenu, setShowSettingsMenu}
// }