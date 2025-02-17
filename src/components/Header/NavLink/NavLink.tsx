import { NavLink } from 'react-router-dom'
import css from './index.module.scss'

interface NavigationLinkProps {
  text: string
  to: string
}

const NavigationLink: React.FC<NavigationLinkProps> = ({ text, to }) => (
  <NavLink
    className={({ isActive }) => (isActive ? `${css.pageLink} ${css.activeLink}` : css.pageLink)}
    to={to}
  >
    {text}
  </NavLink>
)

export default NavigationLink
