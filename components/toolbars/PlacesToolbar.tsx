import Toolbar from "@/components/toolbars/Toolbar";
import {IconButton} from "@/components/symbols/IconButton";

export default function GuestsToolbar({onCreatePlace}: { onCreatePlace: () => void }) {
    return (
        <>
            <Toolbar style={{flexDirection: "row-reverse", padding: 20}}>
                <IconButton onPress={onCreatePlace} name="plus"/>
            </Toolbar>
        </>
    )
}