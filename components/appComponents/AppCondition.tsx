export default function AppCondition({condition, children}: { condition: any, children?: React.ReactNode }) {
    return (
        <>
            {condition && children}
        </>
    )
}