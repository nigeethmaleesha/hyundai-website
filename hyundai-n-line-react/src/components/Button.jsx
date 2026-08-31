import { Icon } from '../icons.jsx'

export default function Button({ children, variant = 'primary', onClick, href, download, type = 'button', className = '' }) {
  const cls = `btn btn-${variant} ${className}`.trim()
  const content = <>{children}<Icon name="arrow" size={15}/></>
  if (href) return <a className={cls} href={href} download={download} onClick={onClick}>{content}</a>
  return <button className={cls} type={type} onClick={onClick}>{content}</button>
}
