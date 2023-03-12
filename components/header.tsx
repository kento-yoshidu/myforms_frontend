type Props = {
  pageTitle?: string
}

const Header = ({ pageTitle }: Props) => {
  return (
    <header>
      <h1>My Forms</h1>

      <h2>{pageTitle}</h2>
    </header>
  )
}

export default Header
