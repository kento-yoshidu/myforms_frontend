import { render, screen } from "@testing-library/react"
import Home from "../pages"
import '@testing-library/jest-dom'

describe("Home", () => {
  it("Rendering Page Title", () => {
    render(<Home />)
    expect(screen.getByRole("heading")).toHaveTextContent("Welcome to Next.js!")
  })
})