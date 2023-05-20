import styles from "../styles/footer.module.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"

const Footer = () => (
  <footer className={styles.footer}>
    <a
      href="https://github.com/kento-yoshidu/MyForms"
      className={styles.link}
      aria-label="GitHubリポジトリーへのリンク"
    >
      <FontAwesomeIcon icon={faGithub} />
    </a>
  </footer>
)

export default Footer
