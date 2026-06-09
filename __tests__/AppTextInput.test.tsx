import {fireEvent, render} from "@testing-library/react-native";
import AppTextInput from "@/components/appComponents/AppTextInput";
import React from "react";

// Mocking contexts as they are used in AppTextInput
jest.mock('@/contexts/form-context', () => ({
    useFormContext: () => ({
        submitting: false,
        setSubmitting: jest.fn(),
        addValue: jest.fn(),
    }),
}));

jest.mock('@/contexts/location-context', () => ({
    useLocationContext: () => ({
        isoCountry: 'JO',
    }),
}));

describe('AppTextInput', () => {

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("should call onChange when text is typed", () => {
        const onChangeMock = jest.fn();
        const {getByPlaceholderText} = render(
            <AppTextInput
                value=""
                onChange={onChangeMock}
                name="test-input"
                placeholder="Type here"
            />
        );

        const input = getByPlaceholderText("Type here");
        fireEvent.changeText(input, "new text");

        expect(onChangeMock).toHaveBeenCalledWith("new text");
    });

    it("should display the correct value", () => {
        const {getByDisplayValue} = render(
            <AppTextInput
                value="initial value"
                onChange={jest.fn()}
                name="test-input"
            />
        );

        expect(getByDisplayValue("initial value")).toBeTruthy();
    });

    it("should display visibility icon if input is password", () => {
        const {getByTestId} = render(
            <AppTextInput
                value=""
                onChange={jest.fn()}
                name="test-input"
                secureTextEntry={true}
            />
        );
        expect(getByTestId("visibility-icon")).toBeTruthy();
    })

    it("should display the clear button if value is not empty", () => {
        const onChangeMock = jest.fn()
        const {getByTestId, getByDisplayValue} = render(
            <AppTextInput name="test" onChange={onChangeMock} value="sample test"/>
        )
        const input = getByDisplayValue("sample test")

        //those are what actually needed to show the clear icon
        fireEvent(input, "focus")
        fireEvent.changeText(input, "new Text")

        const clearBtn = getByTestId("clear-icon")
        expect(clearBtn).toBeTruthy()

        fireEvent.press(clearBtn)
        expect(onChangeMock).toHaveBeenCalledWith(undefined)
    })


});