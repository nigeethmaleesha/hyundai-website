const actions = [
  { image: '/images/quick-actions/test-drive.png', label: 'Book a Test Drive', lines: ['BOOK A', 'TEST DRIVE'], key: 'testdrive' },
  { image: '/images/quick-actions/brochure.png', label: 'Download Brochure', lines: ['DOWNLOAD', 'BROCHURE'], key: 'brochure' },
  { image: '/images/quick-actions/finance.png', label: 'Finance Calculator', lines: ['FINANCE', 'CALCULATOR'], key: 'finance' },
  { image: '/images/quick-actions/dealer.png', label: 'Find a Dealer', lines: ['FIND A', 'DEALER'], key: 'dealer' },
  { image: '/images/quick-actions/whatsapp.png', label: 'DM us WhatsApp', lines: ['DM US', 'WHATSAPP'], key: 'whatsapp' },
  { image: '/images/quick-actions/service.png', label: 'Book a Service', lines: ['BOOK A', 'SERVICE'], key: 'service' },
]

export default function QuickActions({ onAction }) {
  return (
    <aside className="quick-actions" aria-label="Quick actions">
      {actions.map(({ image, label, lines, key }) => (
        <button key={key} type="button" onClick={() => onAction(key)} title={label}>
          <img className="quick-action-icon" src={image} alt="" aria-hidden="true" />
          <span className="quick-action-label">{lines[0]}<br />{lines[1]}</span>
        </button>
      ))}
    </aside>
  )
}
