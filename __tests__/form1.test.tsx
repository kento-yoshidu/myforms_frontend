import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { rest } from "msw"
import { setupServer } from "msw/node"

import "@testing-library/jest-dom/extend-expect"
import 'cross-fetch/polyfill'

import Form1 from "../pages/form1"

const server = setupServer(
  rest.post("/api/form1", (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ name: "KENTO" }))
  })
)

beforeAll(() => server.listen())

afterEach(() => {
  server.resetHandlers()
  cleanup()
})

afterAll(() => server.close())

const inputText = "お名前 ※必須"
const buttonText = "変換する"

describe("Form1", () => {
  describe("初回レンダリング時、各要素が正しく表示されていること", () => {
    it("Form1がレンダリングされること", () => {
      render(<Form1 />)
      expect(screen.getByRole("heading", { level: 3, name: /^名前変換フォーム/ })).toBeTruthy()
    })

    it("初回レンダリング時、変換結果が表示されるエリアに何も表示されていないこと", () => {
      render(<Form1 />)
      expect(screen.queryByTestId("result-area")).toBeNull()
    })

    it("初回レンダリング時、変換ボタンがdisabledになっていること", () => {
      render(<Form1 />)
      expect(screen.getByRole("button", { name: buttonText })).toBeDisabled()
    })
  })

  describe("フォームを送信した時、正しい結果が得られること", () => {
    it("フォームを送信した時、変換された名前が表示されること", async () => {
      render(<Form1 />)
      const nameForm = screen.getByRole("textbox", { name: inputText }) as HTMLInputElement
      await userEvent.type(nameForm, "kento")
      await userEvent.click(screen.getByRole("button", { name: buttonText }))
      expect(screen.getByTestId("result-area")).toHaveTextContent("KENTO")
    })
  })

  describe("フォームに名前を入力した時、各要素が正しい状態に変化すること", () => {
    it("名前を入力した時、変換ボタンのdisabledが解除されること", async () => {
      render(<Form1 />)
      await userEvent.type(screen.getByRole("textbox", { name: inputText }), "kento")
      expect(screen.getByRole("button", { name: buttonText })).not.toBeDisabled()
    })

    it("フォームに半角スペースのみを入力した時、変換ボタンがdisabledになっていること", async () => {
      render(<Form1 />)
      await userEvent.type(screen.getByRole("textbox", { name: inputText }), " ")
      expect(screen.getByRole("button", { name: buttonText })).toBeDisabled()
    })

    it("フォームに半角スペースのみを入力した時、変換ボタンがdisabledになっていること", async () => {
      render(<Form1 />)
      await userEvent.type(screen.getByRole("textbox", { name: /^お名前/ }), " ")
      expect(screen.getByRole("button", { name: "変換する" })).toBeDisabled()
    })
  })
})
