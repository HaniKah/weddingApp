import React, {createContext, useState} from "react";

type CollapsibleContextType<T> = {
    selectedCollapsible: T | null,
    setSelectedCollapsible: (value: T | null) => void
}
const CollapsibleContext = createContext<CollapsibleContextType<any>>({
    selectedCollapsible: null,
    setSelectedCollapsible: () => {
    }
})

export function CollapsibleManager({children}: { children: React.ReactNode }) {
    const [selectedCollapsible, setSelectedCollapsible] = useState<string | null>(null)

    return (
        <CollapsibleContext.Provider value={{selectedCollapsible, setSelectedCollapsible}}>
            {children}
        </CollapsibleContext.Provider>
    )
}

export function useCollapsibleContext() {
    return React.useContext(CollapsibleContext)
}