import { cleanup, getByRole, getRoles, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { rest } from "msw"
import { setupServer } from "msw/node"

import "@testing-library/jest-dom/extend-expect"
import 'cross-fetch/polyfill'

import Form7 from "../pages/form7"

const server = setupServer(
  rest.post("/api/api5", (_req, res, ctx) => {
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

describe("Form6", () => {
  describe("初回レンダリング時、各要素が正しく表示されていること", () => {
    it("Form7がレンダリングされること", () => {
      render(<Form7 />)
      expect(screen.getByRole("heading", { level: 3, name: "ログインフォーム" })).toBeTruthy()
    })

    /*
    it("初回レンダリング時、変換結果が表示されるエリアが表示されていないこと", () => {
      render(<Form6 />)
      expect(screen.queryByTestId("result-area")).toBeNull()
    })

    it("初回レンダリング時、エラーメッセージが表示されていないこと", () => {
      render(<Form6 />)
      expect(screen.queryByTestId("error-message")).toBeNull()
    })

    it("初回レンダリング時、送信ボタンがdisabledになっていること", () => {
      render(<Form6 />)
      expect(screen.getByRole("button", { name: buttonText })).toBeDisabled()
    })
    */
  })

  /*
  describe("フォームを送信した時に、正しい結果が得られること", () => {
    it("フォームを送信した時、大文字に変換された名前が表示されること", async () => {
      render(<Form6 />)
      await userEvent.type(screen.getByRole("textbox", { name: inputText }), "kento")
      await userEvent.click(screen.getByRole("button", { name: buttonText }))
      expect(screen.getByTestId("result-area")).toHaveTextContent("KENTO")
    })
  })

  describe("フォームに名前を入力した時、各要素が正しい状態になること", () => {
    it("名前を正しく入力した時、登録ボタンのdisabledが解除されること", async () => {
      render(<Form6 />)
      await userEvent.type(screen.getByRole("textbox", { name: inputText }), "kento")
      expect(screen.getByRole("button", { name: buttonText })).toBeEnabled()
    })

    it("名前を正しく入力した時、エラーメッセージが表示されないこと", async () => {
      render(<Form6 />)
      await userEvent.type(screen.getByRole("textbox", { name: inputText }), "kento")
      expect(screen.queryByTestId("error-message")).toBeNull()
    })

    it("名前を正しく入力した時、aria-invalid属性がfalseであること", async () => {
      render(<Form6 />)
      const inputForm = screen.getByRole("textbox", { name: inputText })
      await userEvent.type(inputForm, "kento")
      expect(inputForm).toHaveAttribute("aria-invalid", "false")
    })

    it("名前を正しくない形式で入力した時、登録ボタンのdisabledが解除されないこと", async () => {
      render(<Form6 />)
      await userEvent.type(screen.getByRole("textbox", { name: inputText }), "kento111")
      expect(screen.getByRole("button", { name: buttonText })).toBeDisabled()
    })

    it("名前を正しくない形式で入力した時、エラーメッセージが表示されること", async () => {
      render(<Form6 />)
      await userEvent.type(screen.getByRole("textbox", { name: inputText }), "kento111")
      expect(screen.getByTestId("error-message")).toBeTruthy()
    })

    it("名前を正しくない形式で入力した時、エラーメッセージが表示されること", async () => {
      render(<Form6 />)
      await userEvent.type(screen.getByRole("textbox", { name: inputText }), "kento111")
      expect(screen.getByTestId("error-message")).toBeTruthy()
    })

    it("名前を正しくない形式で入力した時、aria-invalid属性がtrueになること", async () => {
      render(<Form6 />)
      const inputForm = screen.getByRole("textbox", { name: inputText })
      await userEvent.type(inputForm, "kento111")
      expect(inputForm).toHaveAttribute("aria-invalid", "true")
    })
  })
  */
})
