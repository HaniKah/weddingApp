export default function AppIf({value, children}: { value: any, children?: React.ReactNode }) {
    return (
        <>
            {value && children}
        </>
    )
}