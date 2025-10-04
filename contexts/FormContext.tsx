// FormContext.js
import React, {createContext, useContext, useEffect, useState} from 'react';

interface FormContextType {
    checking: boolean;
    setChecking: (checking: boolean) => void;
    result: any;
    addValue: (v: { [key: string]: string | null }) => void;
}

const FormContext = createContext<FormContextType>({
    checking: false,
    setChecking: () => false,
    result: null,
    addValue: () => {
    }

});


export function AppForm<T>({onSubmit, children}: { onSubmit: (data: T) => void, children: React.ReactNode }) {

    const [checking, setChecking] = useState<boolean>(false);
    const [result, setResult] = useState({});

    function addValue(v: { [key: string]: string | null }) {
        setResult(prev => ({...prev, ...v}))
    }

    useEffect(() => {
        console.log("checking:", checking)
    }, [checking]);


    useEffect(() => {
        if (result && checking) {
            console.log(result)
            onSubmit(result as T)
        }


    }, [result, checking]);


    return (
        <FormContext.Provider value={{checking, setChecking, result, addValue}}>
            {children}
        </FormContext.Provider>
    );
}

export function useFormContext() {
    return useContext(FormContext);
}
