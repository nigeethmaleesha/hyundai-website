import { Icon } from '../icons.jsx'

const actions = [
  ['calculator', 'Finance Calculator', 'finance'],
  ['download', 'Download Brochure', 'brochure'],
  ['car', 'Book a Test Drive', 'testdrive'],
  ['pin', 'Find a Dealer', 'dealer'],
  ['wrench', 'Book a Service', 'service'],
]

export default function QuickActions({ onAction }) {
  return (
    <aside className="quick-actions" aria-label="Quick actions">
      {actions.map(([icon, label, key]) => (
        <button key={key} onClick={() => onAction(key)} title={label}>
          <Icon name={icon} size={17}/>
          <span>{label}</span>
        </button>
      ))}
    </aside>
  )
}
