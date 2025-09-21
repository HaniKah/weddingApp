import {Calendar, DateData} from "react-native-calendars";
import {useEffect, useState} from "react";
import {Text} from "react-native";
import {Theme} from "@/styles/Theme";

const today = new Date().toLocaleDateString("en-CA");

export default function AppCalendar({date, onDateUpdate}: { date: Date, onDateUpdate: (date: Date) => void }) {

    const [selectedDate, setSelectedDate] = useState<string>()

    useEffect(() => {
        if (date) {
            setSelectedDate(date.toLocaleDateString("en-CA"))
        }
    }, [date]);


    function handleDayPress(day: DateData) {
        setSelectedDate(day.dateString)
        onDateUpdate(new Date(day.timestamp))
    }

    return (
        <>
            <Calendar
                enableSwipeMonths monthFormat={'MMMM yyyy'} onDayPress={handleDayPress}
                minDate={today}
                markedDates={{
                    [selectedDate as string]: {selected: true, selectedColor: Theme.colors.primary},
                }}

                style={styles.calendar}/>
            <Text>{selectedDate}</Text>
        </>
    )
}

const styles = {
    calendar: {
        borderRadius: 10,
        marginVertical: 20,
        marginHorizontal: 10,
        padding: 10,

    }
}
