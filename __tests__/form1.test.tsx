import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { rest } from "msw"
import { setupServer } from "msw/node"

import "@testing-library/jest-dom/extend-expect"
import 'cross-fetch/polyfill'

import Form1 from "../pages/form1"

const server = setupServer(
  rest.post("/api/form1", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ name: "KENTO" }))
  })
)

beforeAll(() => server.listen())

afterEach(() => {
  server.resetHandlers()
  cleanup()
})

afterAll(() => server.close())

describe("Form1", () => {
  it("Rendering Form1.", () => {
    render(<Form1 />)
    expect(screen.getByTestId("form-title")).toHaveTextContent(/^Form1$/)
  })

  it("First rendered, nothing is displayed in the result-area", () => {
    render(<Form1 />)
    expect(screen.queryByTestId("result-area")).toBeNull()
  })

  it("First rendered, button should be disabled.", () => {
    render(<Form1 />)
    expect(screen.getByRole("button")).toBeDisabled()
  })

  it("Input value, button should be not disabled.", async () => {
    render(<Form1 />)
    await userEvent.type(screen.getByTestId("name"), "kento")
    expect(screen.getByRole("button")).not.toBeDisabled()
  })

  /*
  it("First rendered, button should be disabled.", async () => {
    render(<Form1 />)
    const nameForm = screen.getByTestId("name") as HTMLInputElement
    await userEvent.type(nameForm, "kento")
    await userEvent.click(screen.getByTestId("submit"))
    screen.debug()
  })
  */
})
