
'use client';

import { createContext, useContext, Dispatch, SetStateAction, useState, ReactNode } from "react";
import randomString from "randomstring"

interface ContextProps {
    privateInput: string,
    setPrivateInput: Dispatch<SetStateAction<string>>,
    params : string,
    setParams : Dispatch<SetStateAction<string>>,
    url : () => string,
    email:string,
    setEmail : Dispatch<SetStateAction<string>>,
    secretCode:number,
    setSecretCode : Dispatch<SetStateAction<number>>,
    otp:number,
    setOtp : Dispatch<SetStateAction<number>>,
}

const GlobalContext = createContext<ContextProps>({
    privateInput: '',
    setPrivateInput: (): string => '',
    params: '',
    setParams: (): string => '',
    url : (): string => '',
    email:'',
    setEmail : ():string => '',
    secretCode:0,
    setSecretCode : ():number => 0,
    otp:0,
    setOtp : ():string => '',
})

export const GlobalContextProvider = ({ children }: {children : ReactNode}) => {
    const [privateInput, setPrivateInput] = useState<string>("")
    const [params, setParams] = useState<string>("")

    // private auth state handler
    const [email, setEmail] = useState<string>("")
    const [secretCode, setSecretCode] = useState<number>(0);
    const [otp, setOtp] = useState<number>(0)


    function url(){
        return randomString.generate({
         length: 80,
         charset: 'alphabetic'
     });
     }
    
    return (
        <GlobalContext.Provider value={{ 
            privateInput, 
            setPrivateInput ,
             params, 
             setParams,
             url,
             email,
             setEmail,
             otp,
             secretCode,
             setOtp,
             setSecretCode
             }}>
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext)