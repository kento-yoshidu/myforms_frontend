import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { rest } from "msw"
import { setupServer } from "msw/node"
import "@testing-library/jest-dom/extend-expect"
import 'cross-fetch/polyfill'
import Form2 from "../pages/form2"

const server = setupServer(
  rest.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/form2`, (req, res, ctx) => {
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

describe("Form2", () => {
  describe("初回レンダリング時、各要素が正しく表示されていること", () => {
    it("Form2がレンダリングされること", () => {
      render(<Form2 />)
      expect(screen.getByRole("heading", { level: 3, name: /^名前変換フォーム/ })).toBeTruthy()
    })

    it("初回レンダリング時、変換結果が表示されるエリアに何も表示されていないこと", () => {
      render(<Form2 />)
      expect(screen.queryByTestId("result-area")).toBeNull()
    })

    it("初回レンダリング時、エラーメッセージが表示されていないこと", () => {
      render(<Form2 />)
      expect(screen.queryByTestId("error-message")).toBeNull()
    })

    it("初回レンダリング時、変換ボタンがdisabledになっていること", () => {
      render(<Form2 />)
      expect(screen.getByRole("button", { name: buttonText })).toBeDisabled()
    })
  })

  describe("フォームを送信した時、正しい結果が得られること", () => {
    it("フォームを送信した時、変換された名前が表示されること", async () => {
      render(<Form2 />)
      await userEvent.type(screen.getByRole("textbox", { name: inputText }), "kento")
      await userEvent.click(screen.getByRole("button", { name: buttonText }))
      expect(screen.getByTestId("result-area")).toHaveTextContent("KENTO")
    })
  })

  describe("フォームに名前を入力した時、各要素が正しい状態になること", () => {
    it("フォームに名前を入力した時、変換ボタンのdisabledが解除されること", async () => {
      render(<Form2 />)
      await userEvent.type(screen.getByRole("textbox", { name: inputText }), "kento")
      expect(screen.getByRole("button", { name: buttonText })).toBeEnabled()
    })

    it("フォームに半角スペースのみを入力した時、変換ボタンがdisabledになっていること", async () => {
      render(<Form2 />)
      await userEvent.type(screen.getByRole("textbox", { name: inputText }), " ")
      expect(screen.getByRole("button", { name: buttonText })).toBeDisabled()
    })

    it("フォームに半角スペースのみを入力した時、エラーメッセージが表示されること", async () => {
      render(<Form2 />)
      await userEvent.type(screen.getByRole("textbox", { name: inputText }), " ")
      expect(screen.getByTestId("error-message")).toBeTruthy()
    })

    it("フォームに名前を入力してから削除した時、エラーメッセージが表示されること", async () => {
      render(<Form2 />)
      const inputForm = screen.getByRole("textbox", { name: inputText })
      await userEvent.type(inputForm, "kento")
      await userEvent.clear(inputForm)
      expect(screen.getByTestId("error-message")).toBeTruthy()
    })
  })
})
