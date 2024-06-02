
'use client';

import { createContext, useContext, Dispatch, SetStateAction, useState, ReactNode, useEffect } from "react";
import randomString from "randomstring"

interface ContextProps {
    privateInput: string,
    setPrivateInput: Dispatch<SetStateAction<string>>,
    params : string,
    setParams : Dispatch<SetStateAction<string>>,
    url : () => string,
}

const GlobalContext = createContext<ContextProps>({
    privateInput: '',
    setPrivateInput: (): string => '',
    params: '',
    setParams: (): string => '',
    url : (): string => '',
})

export const GlobalContextProvider = ({ children }: {children : ReactNode}) => {
    const [privateInput, setPrivateInput] = useState<string>("")
    const [params, setParams] = useState<string>("")

    function url(){
        return randomString.generate({
         length: 80,
         charset: 'alphabetic'
     });
     }
    
    return (
        <GlobalContext.Provider value={{ privateInput, setPrivateInput , params , setParams ,url}}>
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext)