export default function Button({ children, variant = 'primary', onClick, href, download, type = 'button', className = '' }) {
  const cls = `btn btn-${variant} ${className}`.trim()

  if (href) {
    return <a className={cls} href={href} download={download} onClick={onClick}>{children}</a>
  }

  return <button className={cls} type={type} onClick={onClick}>{children}</button>
}
