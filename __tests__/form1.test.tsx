import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import Form1 from "../pages/form1"

describe("Form1", () => {
  it("Rendering Form1", () => {
    render(<Form1 />)
    expect(screen.getByTestId("page-title")).toHaveTextContent(/^Form1$/)
  })
})
