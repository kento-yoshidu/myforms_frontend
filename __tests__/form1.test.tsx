import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import Form1 from "../pages/form1"

describe("Form1", () => {
  it("Should render Form1", () => {
    render(<Form1 />)
    expect(screen.getByText("Form 1")).toBeTruthy()
  })
})