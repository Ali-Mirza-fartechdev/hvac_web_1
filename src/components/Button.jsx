import { Link } from 'react-router-dom'

// variant: solid (default) | glass (on dark/imagery) | ghost (quiet, on light)
export default function Button({ to, href, variant = 'solid', children, ...rest }) {
  const cls = `btn btn-${variant}`
  if (href) return <a className={cls} href={href} {...rest}>{children}</a>
  return <Link className={cls} to={to} {...rest}>{children}</Link>
}
