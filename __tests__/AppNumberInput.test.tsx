import {fireEvent, render} from "@testing-library/react-native";
import AppNumberInput from "@/components/appComponents/AppNumberInput";

jest.mock("@/contexts/form-context", () => ({
    useFormContext: () => ({
        submitting: false,
        setSubmitting: jest.fn(),
        addValue: jest.fn(),
    }),
}))

jest.mock("@/contexts/location-context", () => ({
    useLocationContext: () => ({
        isoCountry: 'JO',
    }),
}))

describe("AppNumberInput", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("should return value of type number", () => {
        const onChangeMock = jest.fn();
        const {getByDisplayValue} = render(<AppNumberInput name="test" value={123} onTextChange={onChangeMock}/>);
        const input = getByDisplayValue("123")
        fireEvent.changeText(input, "456")
        expect(onChangeMock).toHaveBeenCalledWith(456);
    })
})