import { ReactNode } from "react"
import Header from "./header"

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
    </>
  )
}

export default Layout
