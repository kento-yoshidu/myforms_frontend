import { ReactNode } from "react"

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div style={{ "border": "1px solid red ", "width": "50%", "margin": "100px auto" }}>
      {children}
    </div>
  )
}

export default Layout
