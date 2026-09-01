export function Icon({ name, size = 22, strokeWidth = 1.8, className = '' }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
    'aria-hidden': true,
  }

  const paths = {
    calendar: <><rect x="4" y="5" width="16" height="15" rx="1.5"/><path d="M8 3v4M16 3v4M4 9h16"/></>,
    document: <><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v5h4M10 12h5M10 16h5"/></>,
    calculator: <><rect x="5" y="2.5" width="14" height="19" rx="1.5"/><path d="M8 6h8M8.5 10h.01M12 10h.01M15.5 10h.01M8.5 14h.01M12 14h.01M15.5 14h.01M8.5 18h.01M12 18h.01M15.5 18h.01"/></>,
    download: <><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></>,
    car: <><path d="M3 13l2-5a2 2 0 0 1 1.9-1.3h10.2A2 2 0 0 1 19 8l2 5"/><path d="M5 13h14a2 2 0 0 1 2 2v3H3v-3a2 2 0 0 1 2-2Z"/><path d="M6 18v2M18 18v2M7 15h.01M17 15h.01"/></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    wrench: <><path d="M14.7 6.3a4 4 0 0 0-5-5L12 3.6 9.6 6 7.3 3.7a4 4 0 0 0 5 5l-7.6 7.6a2 2 0 1 0 2.8 2.8l7.2-7.2"/></>,

    engine: <><path d="M6 14V9.5L8 6h8l2 3.5V14"/><path d="M5 14h14v5H5zM8 19v2M16 19v2M8 11h8M7.5 16.5h.01M16.5 16.5h.01"/><path d="M9 3h6M10.5 1.5 9 3l1.5 1.5M13.5 1.5 15 3l-1.5 1.5"/></>,
    transmission: <><path d="M4 17a8 8 0 0 1 16 0"/><path d="M7 17h10M12 13l4-5"/><circle cx="12" cy="13" r="1"/></>,
    mode: <><path d="M4 6h10M18 6h2M4 12h3M11 12h9M4 18h8M16 18h4"/><path d="M14 4v4M7 10v4M12 16v4"/></>,

    screen: <><rect x="7" y="3" width="10" height="18" rx="1.5"/><path d="M9 6h6M10 18h4"/></>,
    connected: <><rect x="8" y="3" width="9" height="18" rx="1.5"/><path d="M10.5 18h4M5 9c-1.5 1.7-1.5 4.3 0 6M3 7c-2.6 3-2.6 7 0 10"/></>,
    wireless: <><circle cx="12" cy="13" r="2"/><path d="M8.5 16.5a5 5 0 0 1 0-7M15.5 9.5a5 5 0 0 1 0 7M5.5 19.5a9 9 0 0 1 0-13M18.5 6.5a9 9 0 0 1 0 13"/></>,
    fan: <><circle cx="12" cy="12" r="1.4"/><path d="M12 10.5C8 7 8 3.5 10.3 3c2.1-.5 3.1 2.8 2.2 7.4M13.3 11.3c4.7-1 7.5.9 6.6 3.2-.8 2.1-4.2 1.4-7.1-2M12.5 13.1c-.7 4.8-3.6 6.9-5.4 5.2-1.7-1.5.2-4.4 4.4-6.1"/></>,

    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="M12 8v8M8 12h8"/></>,
    checkCircle: <><circle cx="12" cy="12" r="8"/><path d="m9 12 2 2 4-4"/></>,
    eye: <><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/></>,
    tire: <><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 4v5M12 15v5M4 12h5M15 12h5"/></>,
    lock: <><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>,

    warranty: <><path d="M12 2 9.5 4.5 6 4l-.5 3.5L3 10l2 3-1 3.5 3.5 1L9 21l3-2 3 2 1.5-3.5 3.5-1-1-3.5 2-3-2.5-2.5L18 4l-3.5.5Z"/><path d="m9 12 2 2 4-4"/></>,
    service: <><path d="M14.7 6.3a4 4 0 0 0-5-5L12 3.6 9.6 6 7.3 3.7a4 4 0 0 0 5 5l-7.6 7.6a2 2 0 1 0 2.8 2.8l7.2-7.2"/></>,
    roadside: <><path d="M4 13v-2a8 8 0 0 1 16 0v2"/><path d="M4 13v5h3v-6H4M20 13v5h-3v-6h3M17 18c0 2-2 3-5 3"/><path d="M9 12h6l1 3H8zM9 15v2M15 15v2"/></>,

    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    chevronRight: <path d="m9 5 7 7-7 7"/>,
    rotate: <><path d="M20 11a8 8 0 0 0-14.9-4M4 4v5h5"/><path d="M4 13a8 8 0 0 0 14.9 4M20 20v-5h-5"/></>,
    chat: <><path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/></>,
    search: <><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></>,
    share: <><circle cx="18" cy="5" r="2.2"/><circle cx="6" cy="12" r="2.2"/><circle cx="18" cy="19" r="2.2"/><path d="m8 11 7.8-4.6M8 13l7.8 4.6"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/></>,
  }

  return <svg {...common}>{paths[name] || paths.arrow}</svg>
}
