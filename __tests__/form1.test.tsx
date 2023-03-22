import { cleanup, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import userEvent from "@testing-library/user-event"

import { rest } from "msw"
import { setupServer } from "msw/node"

import Form1 from "../pages/form1"

const server = setupServer(
  rest.get("/api/form1", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ name: "kento" }))
  })
)

beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
  cleanup()
})
afterAll(() => server.close())

describe("Form1", () => {
  it("Should render Form1", () => {
    render(<Form1 />)
    expect(screen.getByText("Form 1")).toBeTruthy()
  })

  it("Should render each parts of form", () => {
    render(<Form1 />)

    expect(screen.getByTestId("username")).toBeTruthy()
    expect(screen.getByTestId("email")).toBeTruthy()
    expect(screen.getByTestId("password")).toBeTruthy()
    expect(screen.getByTestId("confirmPassword")).toBeTruthy()

    screen.debug()
  })

  it("test input", async () => {
    render(<Form1 />)

    const nameForm = screen.getByTestId("username") as HTMLInputElement
    await userEvent.type(nameForm, "kento")
    expect(nameForm.value).toBe("kento")
  })

  it("登録完了後のメッセージが表示されていないこと", async () => {
    render(<Form1 />)
    expect(screen.queryByTestId("test")).toBeNull()
  })
})
