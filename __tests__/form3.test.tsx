import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { rest } from "msw"
import { setupServer } from "msw/node"

import "@testing-library/jest-dom/extend-expect"
import 'cross-fetch/polyfill'

import Form3 from "../pages/form3"

const server = setupServer(
  rest.post("/api/form2", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ password: "Hello World" }))
  })
)

beforeAll(() => server.listen())

afterEach(() => {
  server.resetHandlers()
  cleanup()
})

afterAll(() => server.close())

describe("Form3", () => {
  it("初回レンダリング時, 変換結果が表示されるエリアに何も表示されていないこと", () => {
    render(<Form3 />)
    expect(screen.queryByTestId("result-area")).toBeNull()
  })

  it("初回レンダリング時、エラーメッセージが表示されていないこと", () => {
    render(<Form3 />)
    expect(screen.queryByTestId("error-message")).toBeNull()
  })

  it("初回レンダリング時, ボタンがdisabledになっていること", () => {
    render(<Form3 />)
    expect(screen.getByTestId("submit")).toBeDisabled()
  })

  it("フォームに値を入力した時、ボタンのdisabledが解除されること", async () => {
    render(<Form3 />)
    await userEvent.type(screen.getByTestId("password"), "Hello World")
    expect(screen.getByTestId("submit")).not.toBeDisabled()
  })

  it("フォームに8文字未満の値を入力してからフォーカスを外した時、エラーメッセージが表示されること", async () => {
    render(<Form3 />)
    await userEvent.type(screen.getByTestId("password"), "1234567")
    await userEvent.tab()
    expect(screen.getByTestId("error-message")).toBeTruthy()
  })

  it("フォームに8文字未満の値を入力してからフォーカスを外し、再度フォーカスした時、エラーメッセージが表示されないこと", async () => {
    render(<Form3 />)
    const passwordForm = screen.getByTestId("password") as HTMLInputElement
    await userEvent.type(passwordForm, "1234567")
    await userEvent.tab()
    await userEvent.click(passwordForm)
    expect(screen.queryByTestId("error-message")).toBeNull()
  })

  it("フォームに8文字以上の値を入力してからフォーカスを外した時、エラーメッセージが表示されないこと", async () => {
    render(<Form3 />)
    await userEvent.type(screen.getByTestId("password"), "Hello World")
    await userEvent.tab()
    expect(screen.queryByTestId("error-message")).toBeNull()
  })

  it("送信ボタンをクリックした時, 変換結果が表示されること", async () => {
    render(<Form3 />)
    const passwordForm = screen.getByTestId("password") as HTMLInputElement
    await userEvent.type(passwordForm, "Hello World")
    await userEvent.click(screen.getByTestId("submit"))
    expect(screen.getByTestId("result-area")).toHaveTextContent("Hello World")
  })
})
