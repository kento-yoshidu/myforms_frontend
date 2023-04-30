import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'

import Home from "../pages"

describe("Home", () => {
  it("Rendering Page Title", () => {
    render(<Home />)
    expect(screen.getByTestId("site-title")).toHaveTextContent("My Forms")
  })
})
