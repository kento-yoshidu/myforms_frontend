import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

import { SearchForm } from "../pages/components/SearchForm"

describe("rendering", () => {
  it("Should render SearchForm", () => {
    render(<SearchForm />);
    expect(screen.getByRole("textbox")).toBeTruthy()
    expect(screen.getByRole("button")).toBeTruthy()
  })
})
