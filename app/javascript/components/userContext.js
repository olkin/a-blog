import {createContext} from "react";

const userContext = createContext({user: { name: 'Guest' }});

export default userContext;