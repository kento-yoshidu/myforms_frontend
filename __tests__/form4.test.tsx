import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { rest } from "msw"
import { setupServer } from "msw/node"

import "@testing-library/jest-dom/extend-expect"
import 'cross-fetch/polyfill'

import Form4 from "../pages/form4"

const server = setupServer(
  rest.post("/api/form3", (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ email: "dummy@example.com" }))
  })
)

beforeAll(() => server.listen())

afterEach(() => {
  server.resetHandlers()
  cleanup()
})

afterAll(() => server.close())

describe("Form4", () => {
  describe("初回レンダリング時、各要素が正しく表示されていること", () => {
    it("Form4がレンダリングされること", () => {
      render(<Form4 />)
      expect(screen.getByTestId("form-title")).toBeTruthy()
    })

    it("初回レンダリング時、変換結果が表示されるエリアに何も表示されていないこと", () => {
      render(<Form4 />)
      expect(screen.queryByTestId("result-area")).toBeNull()
    })

    it("初回レンダリング時、エラーメッセージが表示されていないこと", () => {
      render(<Form4 />)
      expect(screen.queryByTestId("error-message")).toBeNull()
    })

    it("初回レンダリング時、ボタンがdisabledになっていること", () => {
      render(<Form4 />)
      expect(screen.getByTestId("submit")).toBeDisabled()
    })
  })

  describe("フォームを送信した時に、正しい結果が得られること", () => {
    it("送信ボタンをクリックした時、入力したパスワードが表示されること", async () => {
      render(<Form4 />)
      const passwordForm = screen.getByTestId("email")
      await userEvent.type(passwordForm, "dummy@example.com")
      await userEvent.click(screen.getByTestId("submit"))
      expect(screen.getByTestId("result-area")).toHaveTextContent("dummy@example.com")
    })
  })

  describe("フォームにメールアドレスを入力した時、各要素が正しい状態になること", () => {
    it("正しいメールアドレスを入力した時、ボタンのdisabledが解除されること", async () => {
      render(<Form4 />)
      await userEvent.type(screen.getByTestId("email"), "dummy@example.com")
      expect(screen.getByTestId("submit")).not.toBeDisabled()
    })

    it("正しいメールアドレスを入力しフォーカスを外した時、エラーメッセージが表示されないこと", async () => {
      render(<Form4 />)
      await userEvent.type(screen.getByTestId("email"), "dummy@example.com")
      expect(screen.queryByTestId("error-message")).toBeNull()
    })

    it("正しくないメールアドレスを入力した時、ボタンがdisabledになっていること", async () => {
      render(<Form4 />)
      await userEvent.type(screen.getByTestId("email"), "dummy")
      expect(screen.getByTestId("submit")).toBeDisabled()
    })

    it("正しくないメールアドレスを入力しフォーカスを外した時、エラーメッセージが表示されること", async () => {
      render(<Form4 />)
      await userEvent.type(screen.getByTestId("email"), "dummy")
      await userEvent.tab()
      expect(screen.getByTestId("error-message")).toBeTruthy()
    })

    it("正しくないメールアドレスを入力しフォーカスを外し、再度フォーカスした時、エラーメッセージが表示されないこと", async () => {
      render(<Form4 />)
      const emailForm = screen.getByTestId("email")
      await userEvent.type(emailForm, "dummy")
      await userEvent.tab()
      await userEvent.click(emailForm)
      expect(screen.queryByTestId("error-message")).toBeNull()
    })
  })
})
