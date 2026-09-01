import { Icon } from '../icons.jsx'

const actions = [
  ['calendar', 'Book a Test Drive', 'testdrive'],
  ['document', 'Download Brochure', 'brochure'],
  ['calculator', 'Finance Calculator', 'finance'],
  ['pin', 'Find a Dealer', 'dealer'],
  ['wrench', 'Book a Service', 'service'],
]

export default function QuickActions({ onAction }) {
  return (
    <aside className="quick-actions" aria-label="Quick actions">
      {actions.map(([icon, label, key]) => (
        <button key={key} type="button" onClick={() => onAction(key)} title={label}>
          <Icon name={icon} size={22} strokeWidth={1.45} />
          <span>{label}</span>
        </button>
      ))}
    </aside>
  )
}
