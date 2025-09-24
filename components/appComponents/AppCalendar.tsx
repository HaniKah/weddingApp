import {Calendar, DateData} from "react-native-calendars";
import {useEffect, useState} from "react";
import {Theme} from "@/styles/Theme";

const today = new Date().toLocaleDateString("en-CA");

export default function AppCalendar({markedDate, onDateUpdate}: {
    markedDate: string,
    onDateUpdate: (date: string) => void
}) {

    const [selectedDate, setSelectedDate] = useState<string>()

    useEffect(() => {
        if (markedDate) {
            setSelectedDate(markedDate)
        }
    }, [markedDate]);


    function handleDayPress(day: DateData) {

        setSelectedDate(day.dateString)
        onDateUpdate(day.dateString)

    }

    return (
        <>
            <Calendar
                enableSwipeMonths
                monthFormat={'MMMM yyyy'}
                onDayPress={handleDayPress}
                minDate={today}
                markedDates={{[selectedDate as string]: {selected: true, selectedColor: Theme.colors.primary}}}
                theme={{
                    arrowColor: Theme.colors.primary,
                    textMonthFontWeight: 'bold',
                    monthTextColor: Theme.colors.primary,
                    todayTextColor: Theme.colors.primary,
                }}
                style={styles.calendar}/>
        </>
    )
}

const styles = {
    calendar: {
        borderRadius: 10,
        marginVertical: 20,
        padding: 10,

    }
}
