import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { rest } from "msw"
import { setupServer } from "msw/node"

import "@testing-library/jest-dom/extend-expect"
import 'cross-fetch/polyfill'

import Form2 from "../pages/form2"

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

describe("Form2", () => {
  it("Form1がレンダリングされること", () => {
    render(<Form2 />)
    expect(screen.getByTestId("form-title")).toHaveTextContent(/^Form2$/)
  })

  it("初回レンダリング時, 変換結果が表示されるエリアに何も表示されていないこと", () => {
    render(<Form2 />)
    expect(screen.queryByTestId("result-area")).toBeNull()
  })

  it("初回レンダリング時, ボタンがdisabledになっていること", () => {
    render(<Form2 />)
    expect(screen.getByTestId("submit")).toBeDisabled()
  })

  it("フォームに値が入力された時、ボタンのdisabledが解除されること", async () => {
    render(<Form2 />)
    await userEvent.type(screen.getByTestId("name"), "kento")
    expect(screen.getByTestId("submit")).not.toBeDisabled()
  })

  it("送信ボタンをクリックした時, 変換結果が表示されること", async () => {
    render(<Form2 />)
    const nameForm = screen.getByTestId("name") as HTMLInputElement
    await userEvent.type(nameForm, "kento")
    await userEvent.click(screen.getByTestId("submit"))
    expect(screen.getByTestId("result-area")).toHaveTextContent("KENTO")
  })
})
