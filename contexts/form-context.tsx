// FormContext.js
//Todo consider using the swift elements from ios
import React, {createContext, useContext, useEffect, useImperativeHandle, useState} from 'react';


const FormContext = createContext<FormContextType>({
    submitting: false,
    setSubmitting: () => false,
    result: null,
    addValue: () => {
    }
});

interface FormContextType {
    submitting: boolean;
    setSubmitting: (checking: boolean) => void;
    result: any;
    addValue: (data: any) => void;
}

type OneField<M> = {
    [K in keyof M]: { [P in K]: M[P] }
}[keyof M];


export interface FormRef {
    submit: () => void;
}

export function AppForm<T>({ref, onSubmit, children}: {
    ref: any
    onSubmit: (data: T) => void,
    children: React.ReactNode
}) {
    // const formContext = useContext(FormContext);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [result, setResult] = useState<T | undefined>();


    function addValue(v: OneField<T>) {
        setResult(prev => ({...prev, ...v}))
    }

    useImperativeHandle(ref, () => ({
        submit: () => setSubmitting(true)
    }));

//todo : type validation should happen here with ZOD ( since ts doesnt work in runtime )
    useEffect(() => {
        if (result && submitting) {
            onSubmit(result)
            setSubmitting(false)
        }
        if (!submitting) {
            setResult(undefined)
        }

    }, [result, submitting]);


    return (
        <FormContext.Provider value={{submitting: submitting, setSubmitting: setSubmitting, result, addValue}}>
            {children}
        </FormContext.Provider>
    );
}

export function useFormContext() {
    return useContext(FormContext);
}
