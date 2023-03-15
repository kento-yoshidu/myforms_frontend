import React from "react";
import { render, screen, cleanup } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { rest } from "msw"
import { setupServer } from "msw/node"
import MockServer from "./mockServer";

const server = setupServer(
  rest.get("https://jsonplaceholder.typicode.com/users/1", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ username: "Bred dummy" }))
  })
)

beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
  cleanup()
})
afterAll(() => server.close())

describe("Mocking Test", () => {
  it("[Fetch]", async () => {
    render(<MockServer />)
    userEvent.click(screen.getByRole("button"))
    expect(await screen.findByRole("heading")).toHaveTextContent("Bred dummy")
  })
})
