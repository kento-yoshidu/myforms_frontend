import styles from "../pages/styles/footer.module.css"

import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Footer = () => (
  <footer className={styles.footer}>
    <a href="#" className={styles.link}>
      <FontAwesomeIcon icon={faGithub} />
    </a>
  </footer>
)

export default Footer
