import { cleanup, getByRole, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { rest } from "msw"
import { setupServer } from "msw/node"

import "@testing-library/jest-dom/extend-expect"
import 'cross-fetch/polyfill'

import Form5 from "../pages/form5"

const server = setupServer(
  rest.post("/api/form4", (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ username: "kento", email: "dummy@example.com" }))
  })
)

beforeAll(() => server.listen())

afterEach(() => {
  server.resetHandlers()
  cleanup()
})

afterAll(() => server.close())

const usernameText = "ユーザー名 (※必須)"
const emailText = "メールアドレス (※必須)"
const buttonText = "ユーザー登録する"

describe("Form4", () => {
  describe("初回レンダリング時、各要素が正しく表示されていること", () => {
    it("Form5がレンダリングされること", () => {
      render(<Form5 />)
      expect(screen.getByRole("heading", { level: 3, name: "ユーザー登録フォーム" })).toBeTruthy()
    })

    it("初回レンダリング時、変換結果が表示されるエリアが表示されていないこと", () => {
      render(<Form5 />)
      expect(screen.queryByTestId("result-area")).toBeNull()
    })

    it("初回レンダリング時、エラーメッセージが表示されていないこと", () => {
      render(<Form5 />)
      expect(screen.queryByTestId(/-error-message$/)).toBeNull()
    })

    it("初回レンダリング時、送信ボタンがdisabledになっていること", () => {
      render(<Form5 />)
      expect(screen.getByRole("button", { name: buttonText })).toBeDisabled()
    })
  })

  describe("フォームを送信した時に、正しい結果が得られること", () => {
    it("フォームを送信した時、入力したユーザー名とメールアドレスが表示されること", async () => {
      render(<Form5 />)
      await userEvent.type(screen.getByRole("textbox", { name: usernameText }), "kento")
      await userEvent.type(screen.getByRole("textbox", { name: emailText}), "dummy@example.com")
      await userEvent.click(screen.getByRole("button", { name: buttonText }))
      expect(screen.getByTestId("result-username")).toHaveTextContent("kento")
      expect(screen.getByTestId("result-email")).toHaveTextContent("dummy@example.com")
    })
  })

  describe("フォームにメールアドレスを入力した時、各要素が正しい状態になること", () => {
    it("ユーザー名のみを入力した時、登録ボタンがdisabledになっていること", async () => {
      render(<Form5 />)
      await userEvent.type(screen.getByRole("textbox", { name: usernameText }), "kento")
      expect(screen.getByRole("button", { name: buttonText })).toBeDisabled()
    })

    it("メールアドレスのみを入力した時、登録ボタンがdisabledになっていること", async () => {
      render(<Form5 />)
      await userEvent.type(screen.getByRole("textbox", { name: emailText}), "dummy@example.com")
      expect(screen.getByRole("button", { name: buttonText })).toBeDisabled()
    })

    it("ユーザー名とメールアドレスを入力した時、登録ボタンのdisabledが解除されること", async () => {
      render(<Form5 />)
      await userEvent.type(screen.getByRole("textbox", { name: usernameText}), "kento")
      await userEvent.type(screen.getByRole("textbox", { name: emailText}), "dummy@example.com")
      expect(screen.getByRole("button", { name: buttonText })).toBeEnabled()
    })

    it("ユーザー名フォームに何も入力せずフォーカスを外した時、エラーメッセージが表示されること", async () => {
      render(<Form5 />)
      await userEvent.click(screen.getByRole("textbox", { name: usernameText }))
      await userEvent.tab()
      expect(screen.getByTestId("username-error-message")).toBeTruthy()
    })

    it("メールアドレスフォームに何もせずフォーカスを外した時、エラーメッセージが表示されること", async () => {
      render(<Form5 />)
      await userEvent.click(screen.getByRole("textbox", { name: emailText }))
      await userEvent.tab()
      expect(screen.getByTestId("email-error-message")).toBeTruthy()
    })

    it("正しくないメールアドレスを入力しフォーカスを外した時、エラーメッセージが表示されること", async () => {
      render(<Form5 />)
      await userEvent.type(screen.getByRole("textbox", { name: emailText }), "dummy@example.")
      await userEvent.tab()
      expect(screen.getByTestId("email-error-message")).toBeTruthy()
    })

    it("ユーザー名を入力しフォーカスを外した時、エラーメッセージが表示されないこと", async () => {
      render(<Form5 />)
      await userEvent.type(screen.getByRole("textbox", { name: usernameText }), "kento")
      await userEvent.tab()
      expect(screen.queryByTestId("username-error-message")).toBeNull()
    })

    it("正しいメールアドレスを入力しフォーカスを外した時、エラーメッセージが表示されないこと", async () => {
      render(<Form5 />)
      await userEvent.type(screen.getByRole("textbox", { name: emailText }), "dummy@example.com")
      await userEvent.tab()
      expect(screen.queryByTestId("email-error-message")).toBeNull()
    })
  })
})
