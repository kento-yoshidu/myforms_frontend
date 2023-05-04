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
  describe("初回レンダリング時、各要素が正しく表示されていること", () => {
    it("初回レンダリング時, 変換結果が表示されるエリアに何も表示されていないこと", () => {
      render(<Form2 />)
      expect(screen.queryByTestId("result-area")).toBeNull()
    })

    it("初回レンダリング時、エラーメッセージが表示されていないこと", () => {
      render(<Form2 />)
      expect(screen.queryByTestId("error-message")).toBeNull()
    })

    it("初回レンダリング時, 送信ボタンがdisabledになっていること", () => {
      render(<Form2 />)
      expect(screen.getByTestId("submit")).toBeDisabled()
    })
  })

  describe("フォームを送信した時、正しい結果が得られること", () => {
    it("フォームを送信した時, 変換された名前が表示されること", async () => {
      render(<Form2 />)
      const nameForm = screen.getByTestId("name") as HTMLInputElement
      await userEvent.type(nameForm, "kento")
      await userEvent.click(screen.getByTestId("submit"))
      expect(screen.getByTestId("result-area")).toHaveTextContent("KENTO")
    })
  })

  describe("フォームに名前を入力した時、各要素が正しい状態になること", () => {
    it("名前を入力した時、変換ボタンのdisabledが解除されること", async () => {
      render(<Form2 />)
      await userEvent.type(screen.getByTestId("name"), "kento")
      expect(screen.getByTestId("submit")).not.toBeDisabled()
    })

    it("名前を入力してから削除した時、エラーメッセージが表示されること", async () => {
      render(<Form2 />)
      await userEvent.type(screen.getByTestId("name"), "kento")
      await userEvent.clear(screen.getByTestId("name"))
      expect(screen.getByTestId("error-message")).toBeTruthy()
    })
  })
})
