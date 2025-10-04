// FormContext.js
import React, {createContext, useContext, useEffect, useState} from 'react';


const FormContext = createContext<FormContextType>({
    checking: false,
    setChecking: () => false,
    result: null,
    addValue: () => {
    }

});

interface FormContextType {
    checking: boolean;
    setChecking: (checking: boolean) => void;
    result: any;
    addValue: (data: any) => void;
}

type OneField<M> = {
    [K in keyof M]: { [P in K]: M[P] }
}[keyof M];


export function AppForm<T>({onSubmit, children}: { onSubmit: (data: T) => void, children: React.ReactNode }) {

    const [checking, setChecking] = useState<boolean>(false);
    const [result, setResult] = useState<T | undefined>();

    function addValue(v: OneField<T>) {
        setResult(prev => ({...prev, ...v}))
    }

    useEffect(() => {
        console.log("checking:", checking)
    }, [checking]);


    useEffect(() => {
        if (result && checking) {
            console.log(result)
            onSubmit(result)
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
