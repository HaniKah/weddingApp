import {useEffect, useState} from "react";
import {useFormContext} from "@/contexts/form-context";
import {StyleSheet, Text} from "react-native";
import {Theme} from "@/styles/Theme";

export default function AppFieldSet({children, value, required = false, name}: {
    children: React.ReactNode,
    value: any,
    required?: boolean
    name: string
}) {

    const form = useFormContext()

    const [errors, setErrors] = useState<string>()

    useEffect(() => {
        if (form.submitting) {
            if (required) {
                if (value) {
                    form.addValue(value)
                } else {
                    setErrors("this field is required")
                    form.setSubmitting(false)
                }
            } else form.addValue({[name]: value})
        }
        if (value) {
            setErrors(undefined)
        }
    }, [form.submitting, value]);
    return (
        <>
            {children}
            {errors && <Text style={styles.error}>{errors}</Text>}
        </>
    )
}
const styles = StyleSheet.create({
    error: {
        fontSize: Theme.sizes.xs,
        color: Theme.colors.red["S500"],

    },
})