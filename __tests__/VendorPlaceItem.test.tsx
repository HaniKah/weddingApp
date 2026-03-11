import VendorPlaceItem from "@/components/items/VendorPlaceItem"
import { VendorPlaceDto } from "@/types/open-api"
import { render, fireEvent } from "@testing-library/react-native"

describe("VendorPlaceItem", () => {
    const mockData: VendorPlaceDto = {
        id: 1,
        name: "Vendor Place",
        streetName: "123 Test St",
        minPrice: "100",
        maxPrice: "200",
        currency: "USD",
        isPromoted: true,
        // @ts-ignore - isPublished might not exist on VendorPlaceDto natively but is present in your mock
        isPublished: true,
        isCompleted: true,
        thumbnail: "https://example.com/photo.jpg" as any
    }

    const mockOnPress = jest.fn()
    const mockSetTrigger = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("renders vendor place item correctly ", () => {
        const { getByText } = render(<VendorPlaceItem data={mockData} setTrigger={mockSetTrigger} onPress={mockOnPress} />)
        expect(getByText("Vendor Place")).toBeTruthy()
        expect(getByText("123 Test St")).toBeTruthy()
        expect(getByText("100 - 200")).toBeTruthy()
        expect(getByText("USD")).toBeTruthy()
    })

    it("has blue promoted dot if its promoted", () => {
        const component = render(<VendorPlaceItem data={mockData} onPress={mockOnPress} setTrigger={mockSetTrigger} />)
        const dot = component.getByTestId("promotionDot")
        expect(dot).toBeVisible()
    })

    it("does not render promoted dot if not promoted", () => {
        const data = { ...mockData, isPromoted: false }
        const { queryByTestId } = render(<VendorPlaceItem data={data} onPress={mockOnPress} setTrigger={mockSetTrigger} />)
        expect(queryByTestId("promotionDot")).toBeNull()
    })

    it("calls onPress callback with correct data when pressed", () => {
        const { getByText } = render(<VendorPlaceItem data={mockData} onPress={mockOnPress} setTrigger={mockSetTrigger} />)
        fireEvent.press(getByText("Vendor Place"))
        expect(mockOnPress).toHaveBeenCalledTimes(1)
        expect(mockOnPress).toHaveBeenCalledWith(mockData)
    })

    it("renders single price when minPrice and maxPrice are identical", () => {
        const data = { ...mockData, minPrice: "150", maxPrice: "150" }
        const { getByText, queryByText } = render(<VendorPlaceItem data={data} onPress={mockOnPress} setTrigger={mockSetTrigger} />)
        expect(getByText("150")).toBeTruthy()
        expect(queryByText("150 - 150")).toBeNull()
    })

    it("renders fallback text if name and price are missing", () => {
        const data = { ...mockData, name: "", minPrice: null as any }
        const { getByText } = render(<VendorPlaceItem data={data} onPress={mockOnPress} setTrigger={mockSetTrigger} />)
        expect(getByText("add place name")).toBeTruthy()
        expect(getByText("add your price")).toBeTruthy()
    })
})