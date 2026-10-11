// Page content. Section types are rendered by src/components/Sections.jsx.
//
// COPY STATUS
//  - "figma": headings/structure taken from the Figma screens (home, services).
//  - "draft": structure from the Figma hierarchy, copy written as a placeholder.
//    Replace with the real text from Figma (run `npm run figma:extract` and paste,
//    or ask Claude to map the extracted JSON into this file).
// Strings marked [placeholder] must be replaced before launch.

const ESTIMATE = { label: 'Request an Estimate', to: '/request-estimate' }
const PHONE = { label: '(800) 582-AERIS', href: 'tel:+18005822374', variant: 'ghost' }

const cta = (heading, text) => ({ type: 'cta', heading, text, ctas: [{ ...ESTIMATE }, PHONE] })

export const CONTENT = {
  '/': {
    copy: 'figma',
    seo: 'Architectural HVAC engineering for residential and commercial properties.',
    hero: {
      variant: 'home',
      title: 'Comfort, Elevated.',
      text: 'Heating, cooling, and air-quality engineering for properties where design comes first. Quiet systems, precise control, and installations that disappear into the architecture.',
      ctas: [
        { label: 'Schedule a Service', to: '/request-estimate' },
        { label: 'Explore Our Services', to: '/services', variant: 'glass' },
      ],
      card: {
        title: 'At a glance',
        rows: [
          ['Coverage', 'Residential & Commercial'],
          ['Operating sound', 'Under 42 dBA'],
          ['Efficiency', 'Up to 24.5 SEER2'],
          ['Response', '24/7 priority'],
        ],
      },
    },
    sections: [
      {
        type: 'cards',
        layout: 'feature',
        heading: 'Environmental infrastructure, rendered invisible.',
        link: { label: 'Explore all core competencies', to: '/services' },
        items: [
          { tag: 'Heat pumps and precision AC', title: 'Next-Gen Inverter Heat Pumps & Precision AC', text: 'Variable-speed inverter systems that hold temperature within half a degree while staying below the threshold of conversation.', to: '/services/residential-hvac', cta: 'Heat pump systems', media: { label: 'Inverter heat pump' } },
          { tag: 'Air quality', title: 'Whole-Home IAQ & Medical HEPA Purification', text: 'Filtration, humidity, and fresh-air control designed as one system, with sensors that report what the air is actually doing.', to: '/services', cta: 'Explore IAQ systems' },
          { tag: 'Large-scale systems', title: 'Variable Refrigerant Flow (VRF) & Hydronic Networks', text: 'Zoned VRF and hydronic networks for buildings that need independent control in every room.', to: '/services/commercial-hvac', cta: 'View commercial engineering' },
        ],
      },
      {
        type: 'paths',
        tone: 'soft',
        heading: 'Calibrated to your exact scope',
        items: [
          { tone: 'light', title: 'A More Comfortable Home Starts Here', text: 'Whole-home comfort planned around your floor plan, your finishes, and the way you live.', points: ['Concealed, low-noise equipment', 'Room-by-room temperature control', 'Air quality monitoring included'], cta: { label: 'Residential Systems', to: '/services/residential-hvac' } },
          { tone: 'dark', title: 'Engineered for Architectural Scale', text: 'Mechanical systems for lofts, towers, and institutions, coordinated with architects and engineers from the first drawing.', points: ['VRF and hydronic design', 'Commissioning and telemetry', 'Code and landmark-district compliance'], cta: { label: 'Commercial Engineering', to: '/services/commercial-hvac' } },
        ],
      },
      {
        type: 'cards',
        layout: 'portfolio',
        heading: 'Architectural Portfolio',
        link: { label: 'View all commissions', to: '/projects' },
        items: [
          { tag: 'Private residence', title: 'The Ridgeview Estate', text: 'A multi-zone inverter and hydronic system serving a hillside estate.', to: '/projects', media: { label: 'The Ridgeview Estate' } },
          { tag: 'Manhattan', title: 'TriBeCa Sky Penthouse', text: 'Ductless high-wall and concealed systems tuned for a glass-walled penthouse.', to: '/projects', media: { label: 'TriBeCa Sky Penthouse' } },
          { tag: 'Commercial', title: 'Horizon Tech Innovation Hub', text: 'A VRF network with live telemetry for a multi-tenant workplace.', to: '/projects', media: { label: 'Horizon Tech Innovation Hub' } },
        ],
      },
      {
        type: 'stats',
        tone: 'dark',
        heading: 'Engineered beyond the contractor baseline.',
        text: 'Every system is designed, commissioned, and monitored to a written performance target.',
        items: [
          { prefix: '\u00b1', value: 0.5, decimals: 1, suffix: '\u00b0F', label: 'Precision zoning' },
          { prefix: '<', value: 40, suffix: ' dBA', label: 'Acoustic silence' },
          { value: 24, suffix: '/7', label: 'Telemetry' },
          { value: 10, suffix: '-year', label: 'Lifestyle warranty' },
        ],
      },
      {
        type: 'quotes',
        heading: 'Words from our patrons',
        items: [
          { quote: '[placeholder] Replace with the first client testimonial from the Figma design.', name: 'Client name', role: 'Project type' },
          { quote: '[placeholder] Replace with the second client testimonial from the Figma design.', name: 'Client name', role: 'Project type' },
          { quote: '[placeholder] Replace with the third client testimonial from the Figma design.', name: 'Client name', role: 'Project type' },
        ],
      },
      { type: 'form', heading: 'Ready for Uncompromised Climate Control?', text: 'Tell us about the property. An AERIS engineer will review it and reply with a written scope and estimate.', formTitle: 'Request Bespoke Estimate' },
    ],
  },

  '/services': {
    copy: 'figma',
    seo: 'Professional HVAC installation, repair, replacement, and maintenance for residential and commercial properties.',
    hero: {
      title: 'Heating and Cooling, Thoughtfully Handled.',
      text: 'Professional HVAC installation, repair, replacement, and maintenance for residential and commercial properties.',
      ctas: [{ ...ESTIMATE }, PHONE],
    },
    sections: [
      {
        type: 'cards', layout: 'grid', heading: 'Precision Air Conditioning',
        items: [
          { title: 'AC Installation', text: 'Right-sized cooling designed around the building, not the catalog.', to: '/services/ac-installation', cta: 'Installation details' },
          { title: 'AC Repair', text: 'Fast diagnosis and repair with clear pricing before work begins.', to: '/request-estimate', cta: 'Request a repair' },
          { title: 'AC Replacement', text: 'Replace aging equipment with higher-efficiency inverter systems.', to: '/request-estimate', cta: 'Request a quote' },
        ],
      },
      {
        type: 'cards', layout: 'grid', tone: 'soft', heading: 'High-Efficiency Heating & Furnace Engineering',
        items: [
          { title: 'Furnace Repair & Maintenance', text: 'Diagnostics, safety checks, and tune-ups that keep heating reliable.', to: '/request-estimate', cta: 'Book service' },
          { title: 'Heating Installation', text: 'Furnaces and boilers selected for efficiency and quiet operation.', to: '/request-estimate', cta: 'Request an estimate' },
        ],
      },
      {
        type: 'split', heading: 'All-Electric Inverter Heat Pumps',
        text: 'Cold-climate heat pumps deliver heating and cooling from one system, with variable-speed compressors that keep working efficiently when temperatures drop.',
        points: ['High coefficient of performance', 'Rated heating output at low outdoor temperatures', 'Modulating compressors that avoid on-off cycling'],
        cta: { label: 'Explore inverter heat pump systems', to: '/services/residential-hvac' }, media: { label: 'Cold-climate heat pump' },
      },
      {
        type: 'cards', layout: 'grid', heading: 'Preventive Care & Microclimate Purity',
        items: [
          { title: 'HVAC Maintenance Agreements', text: 'Scheduled inspections, cleaning, and priority service for residential and commercial systems.', to: '/request-estimate', cta: 'Review maintenance plans' },
          { title: 'Indoor Air Quality (IAQ)', text: 'Filtration, humidification, and ventilation matched to the air you want inside.', to: '/request-estimate', cta: 'Explore air-quality options' },
        ],
      },
      {
        type: 'cards', layout: 'grid', tone: 'soft', heading: 'Commercial Mechanical & VRF Solutions',
        text: 'Installation, maintenance, and repair for offices, retail, and institutional buildings.',
        items: [
          { title: 'Commercial Installation', text: 'VRF and rooftop systems engineered with the design team.', to: '/services/commercial-hvac', cta: 'Engineering details' },
          { title: 'Commercial Maintenance', text: 'Planned service with documented reporting.', to: '/services/commercial-hvac', cta: 'Maintenance details' },
          { title: 'Commercial Repair', text: 'Priority response when a system goes down.', to: '/contact', cta: 'Request a repair' },
        ],
      },
      {
        type: 'steps', heading: 'A Deliberate Process. Zero Guesswork.',
        text: 'Every project follows the same four steps.',
        items: [
          { title: 'Assessment', text: 'We survey the property, measure loads, and listen to what you need.' },
          { title: 'Engineering & Recommendations', text: 'You receive a written design with options, performance targets, and a fixed scope.' },
          { title: 'Professional Execution', text: 'Licensed technicians install to the drawings and protect your finishes.' },
          { title: 'Commissioning & Telemetry', text: 'We verify performance on site and keep monitoring after handover.' },
        ],
      },
      {
        type: 'faq', heading: 'Client & Architect Inquiries', link: { label: 'Visit the knowledge base', to: '/resources/faq' },
        items: [
          { q: 'How do I choose between an inverter heat pump and traditional AC?', a: 'Inverter heat pumps heat and cool from one system and run more efficiently at partial load. Traditional AC with a furnace can still make sense where gas heating is required. We compare both for your property in the estimate.' },
          { q: 'What does commercial maintenance include?', a: 'Scheduled inspections, filter and coil cleaning, refrigerant and electrical checks, and a written report after every visit.' },
          { q: 'What are the lead times for custom system installations?', a: '[placeholder] Replace with the lead-time answer from the Figma design.' },
          { q: 'Can AERIS coordinate with existing architectural millwork?', a: '[placeholder] Replace with the answer from the Figma design.' },
        ],
      },
      cta('Ready to Discuss Your Mechanical Envelope?', 'Connect directly with an AERIS climate engineer for a detailed assessment, or call us for urgent service.'),
    ],
  },

  '/services/residential-hvac': {
    copy: 'draft',
    seo: 'Residential HVAC engineering: heat pumps, zoning, air quality, and maintenance.',
    hero: { title: 'Residential HVAC', text: 'Whole-home heating, cooling, and air quality planned around the way you live.', ctas: [{ ...ESTIMATE }, { label: 'All services', to: '/services', variant: 'ghost' }] },
    sections: [
      { type: 'cards', layout: 'grid', heading: 'What we design and install', items: [
        { title: 'Inverter heat pumps', text: 'Efficient year-round comfort from a single system.' },
        { title: 'Ductless and concealed systems', text: 'Minimal visual impact in finished interiors.' },
        { title: 'Air quality', text: 'Filtration, ventilation, and humidity control.' },
        { title: 'Maintenance', text: 'Scheduled service that protects your warranty.' },
      ] },
      { type: 'steps', heading: 'How a residential project runs', items: [
        { title: 'Home assessment', text: 'Load calculation and a walkthrough of the property.' },
        { title: 'Design', text: 'A written scope with equipment, placement, and noise targets.' },
        { title: 'Installation', text: 'Careful work with protected finishes.' },
        { title: 'Commissioning', text: 'Verified performance and a handover walkthrough.' },
      ] },
      { type: 'children', heading: 'Related services' },
      cta('Plan your residential system', 'Share a few details and we will reply with a written scope.'),
    ],
  },

  '/services/commercial-hvac': {
    copy: 'draft',
    seo: 'Commercial HVAC engineering: VRF, hydronic systems, commissioning, and maintenance.',
    hero: { title: 'Commercial HVAC', text: 'Mechanical systems for offices, retail, hospitality, and institutions, coordinated with your design team.', ctas: [{ ...ESTIMATE }, { label: 'All services', to: '/services', variant: 'ghost' }] },
    sections: [
      { type: 'cards', layout: 'grid', heading: 'Commercial capabilities', items: [
        { title: 'VRF systems', text: 'Independent zone control across floors and tenants.' },
        { title: 'Hydronic networks', text: 'Quiet, efficient heating and cooling distribution.' },
        { title: 'Commissioning & telemetry', text: 'Documented performance with live monitoring.' },
      ] },
      { type: 'stats', tone: 'dark', heading: 'Performance you can verify', items: [
        { value: 24, suffix: '/7', label: 'Priority response' },
        { prefix: '<', value: 40, suffix: ' dBA', label: 'Target sound level' },
        { value: 10, suffix: '-year', label: 'Warranty options' },
      ] },
      { type: 'children', heading: 'Related services' },
      cta('Discuss a commercial project', 'Send drawings or a brief and an engineer will respond.'),
    ],
  },

  '/services/ac-installation': {
    copy: 'draft',
    seo: 'Air conditioning installation designed around your building.',
    hero: { title: 'AC Installation', text: 'Right-sized cooling, installed cleanly and verified before we leave.', ctas: [{ label: 'Request Installation Estimate', to: '/request-estimate' }, { label: 'All services', to: '/services', variant: 'ghost' }] },
    sections: [
      { type: 'steps', heading: 'Installation, step by step', items: [
        { title: 'Load calculation', text: 'We size the system to the building, not to a rule of thumb.' },
        { title: 'Equipment selection', text: 'Efficiency, sound level, and placement are agreed in writing.' },
        { title: 'Installation', text: 'Licensed technicians, protected finishes, tidy work areas.' },
        { title: 'Startup & verification', text: 'Airflow, refrigerant charge, and controls are tested and recorded.' },
      ] },
      { type: 'faq', heading: 'Common questions', items: [
        { q: 'How long does an installation take?', a: '[placeholder] Replace with the timing answer from the Figma design.' },
        { q: 'Do you handle permits?', a: '[placeholder] Replace with the permit answer from the Figma design.' },
      ] },
      cta('Get an installation estimate', 'Tell us about the property and we will respond with a written scope.'),
    ],
  },

  '/service-areas': {
    copy: 'draft',
    seo: 'AERIS service areas and neighborhood coverage.',
    hero: { title: 'Service Areas Directory', text: 'Neighborhoods and regions where AERIS designs, installs, and services systems.', ctas: [{ ...ESTIMATE }] },
    sections: [
      { type: 'children', heading: 'Featured service areas' },
      { type: 'cards', layout: 'grid', heading: 'More areas', text: '[placeholder] Add the remaining neighborhood hubs from the Figma design. Each can become its own page under /service-areas.', items: [] },
      cta('Not sure if we cover your area?', 'Contact the engineering desk and we will confirm.'),
    ],
  },

  '/service-areas/tribeca-manhattan': {
    copy: 'draft',
    seo: 'HVAC engineering for Tribeca and SoHo lofts, brownstones, and penthouses.',
    hero: { title: 'Tribeca, Manhattan', text: 'Climate systems for cast-iron lofts, converted warehouses, and penthouses.', ctas: [{ label: 'Request Tribeca Project Scope', to: '/request-estimate' }] },
    sections: [
      { type: 'cards', layout: 'grid', heading: 'What Tribeca buildings need', items: [
        { title: 'Low-noise systems', text: 'Quiet operation in open-plan lofts with hard surfaces.' },
        { title: 'Landmark-district coordination', text: 'Equipment placement that respects facade and roof rules.' },
        { title: 'Concealed distribution', text: 'Slim-profile ducting and discreet terminals.' },
      ] },
      { type: 'split', heading: 'Read: the acoustic threshold', text: 'How we approach inaudible VRF in historic brownstones.', cta: { label: 'Read the dossier', to: '/resources/acoustic-threshold-inaudible-vrf' }, media: { label: 'Brownstone VRF' } },
      cta('Planning a Tribeca project?', 'Send a few details and we will scope it.'),
    ],
  },

  '/projects': {
    copy: 'draft',
    seo: 'Selected AERIS residential and commercial HVAC projects.',
    hero: { title: 'Projects & Portfolio', text: 'Selected residential and commercial commissions.', ctas: [{ ...ESTIMATE }] },
    sections: [
      { type: 'cards', layout: 'portfolio', heading: 'Selected commissions', items: [
        { tag: 'Private residence', title: 'The Ridgeview Estate', text: 'Multi-zone inverter and hydronic system.', media: { label: 'The Ridgeview Estate' } },
        { tag: 'Manhattan', title: 'TriBeCa Sky Penthouse', text: 'Ductless and concealed systems for a glass-walled penthouse.', media: { label: 'TriBeCa Sky Penthouse' }, to: '/service-areas/tribeca-manhattan', cta: 'Tribeca service area' },
        { tag: 'Commercial', title: 'Horizon Tech Innovation Hub', text: 'VRF network with live telemetry.', media: { label: 'Horizon Tech Innovation Hub' } },
      ] },
      { type: 'stats', tone: 'dark', heading: 'Across every project', items: [
        { prefix: '\u00b1', value: 0.5, decimals: 1, suffix: '\u00b0F', label: 'Precision zoning' },
        { prefix: '<', value: 40, suffix: ' dBA', label: 'Acoustic silence' },
        { value: 10, suffix: '-year', label: 'Warranty' },
      ] },
      cta('Have a project in mind?', 'Tell us about it and we will respond with a written scope.'),
    ],
  },

  '/about': {
    copy: 'draft',
    seo: 'About AERIS: engineers and technicians building quiet, precise climate systems.',
    hero: { title: 'About Us', text: 'AERIS engineers and installs climate systems for projects where design, sound, and air quality matter.', ctas: [{ label: 'Client reviews', to: '/about/client-reviews' }, { label: 'Contact us', to: '/contact', variant: 'ghost' }] },
    sections: [
      { type: 'prose', heading: 'How we work', paragraphs: ['[placeholder] Replace with the company story from the Figma design.', '[placeholder] Add the second paragraph from the Figma design.'] },
      { type: 'stats', tone: 'dark', heading: 'Standards we hold ourselves to', items: [
        { value: 24, suffix: '/7', label: 'Priority response' },
        { value: 10, suffix: '-year', label: 'Lifestyle warranty' },
        { prefix: '<', value: 40, suffix: ' dBA', label: 'Target sound level' },
      ] },
      { type: 'children', heading: 'More about AERIS' },
      cta('Work with AERIS', 'Tell us about the property.'),
    ],
  },

  '/about/client-reviews': {
    copy: 'draft',
    seo: 'Client reviews and endorsements for AERIS.',
    hero: { title: 'Client Reviews & Endorsements', text: 'What homeowners, architects, and property managers say about working with AERIS.', ctas: [{ ...ESTIMATE }] },
    sections: [
      { type: 'quotes', heading: 'In their words', items: [
        { quote: '[placeholder] Replace with a review from the Figma design.', name: 'Client name', role: 'Project type' },
        { quote: '[placeholder] Replace with a review from the Figma design.', name: 'Client name', role: 'Project type' },
        { quote: '[placeholder] Replace with a review from the Figma design.', name: 'Client name', role: 'Project type' },
      ] },
      cta('Become our next client', 'Request an estimate and an engineer will respond.'),
    ],
  },

  '/resources': {
    copy: 'draft',
    seo: 'AERIS knowledge center: engineering dossiers, guides, and FAQs.',
    hero: { title: 'Knowledge Center & Engineering Dossiers', text: 'Technical guides and long-form engineering notes from the AERIS team.', ctas: [{ label: 'Read the FAQ', to: '/resources/faq' }] },
    sections: [
      { type: 'children', heading: 'Featured reading' },
      cta('Have a technical question?', 'Our engineering desk answers architects and homeowners directly.'),
    ],
  },

  '/resources/faq': {
    copy: 'draft',
    seo: 'Architectural and technical HVAC FAQ.',
    hero: { title: 'Architectural & Technical FAQ', text: 'Answers to common questions from clients and design teams.', ctas: [{ ...ESTIMATE }] },
    sections: [
      { type: 'faq', heading: 'Frequently asked questions', items: [
        { q: 'How do I choose between an inverter heat pump and traditional AC?', a: 'Inverter heat pumps heat and cool from one system and run more efficiently at partial load. Traditional AC with a furnace can still make sense where gas heating is required.' },
        { q: 'What does commercial maintenance include?', a: 'Scheduled inspections, cleaning, refrigerant and electrical checks, and a written report after every visit.' },
        { q: 'How quiet can a system be?', a: '[placeholder] Replace with the answer from the Figma design.' },
        { q: 'Can you work with existing architectural features?', a: '[placeholder] Replace with the answer from the Figma design.' },
      ] },
      cta('Still have questions?', 'Reach the engineering desk directly.'),
    ],
  },

  '/resources/acoustic-threshold-inaudible-vrf': {
    copy: 'draft',
    seo: 'How to design inaudible VRF systems in historic brownstones.',
    hero: { title: 'The Acoustic Threshold: Inaudible VRF in Historic Brownstones', text: 'An engineering dossier on quiet system design in landmark buildings.', ctas: [{ label: 'Back to Knowledge Center', to: '/resources', variant: 'ghost' }] },
    sections: [
      { type: 'prose', heading: 'Overview', paragraphs: ['[placeholder] Replace with the dossier text from the Figma design.', '[placeholder] Add the remaining paragraphs and figures from the Figma design.'] },
      { type: 'children', heading: 'Continue reading', of: '/resources' },
      cta('Planning a historic building project?', 'Talk to an engineer about acoustic targets and equipment placement.'),
    ],
  },

  '/contact': {
    copy: 'draft',
    seo: 'Contact AERIS engineering desk.',
    hero: { title: 'Contact Us', text: 'Call, write, or request an estimate. An engineer responds to every inquiry.', ctas: [PHONE, { ...ESTIMATE, variant: 'ghost' }] },
    sections: [
      { type: 'form', heading: 'Send a message', text: 'Share a few details about the property and what you need.', formTitle: 'Contact the engineering desk' },
    ],
  },

  '/request-estimate': {
    copy: 'draft',
    seo: 'Request a written HVAC scope and estimate from AERIS.',
    hero: { title: 'Request an Estimate', text: 'Tell us about the property. We reply with a written scope and estimate.', ctas: [] },
    sections: [
      { type: 'form', heading: 'Project details', text: 'It takes about two minutes.', formTitle: 'Request Bespoke Estimate' },
    ],
  },

  '/privacy-policy': {
    copy: 'draft',
    seo: 'AERIS privacy policy.',
    hero: { title: 'Privacy Policy', text: 'How AERIS collects, uses, and protects your information.', ctas: [] },
    sections: [
      { type: 'prose', heading: 'Policy', paragraphs: ['[placeholder] Replace with the privacy policy text from the Figma design. Have it reviewed before launch.'] },
    ],
  },
}

export const NOT_FOUND = {
  seo: 'Page not found.',
  hero: { title: 'This page is off the map.', text: 'The page you asked for does not exist or has moved. Choose a destination below.', ctas: [{ label: 'Return to Homepage', to: '/' }, { label: 'Contact Engineering Liaison', to: '/contact', variant: 'ghost' }] },
  sections: [
    { type: 'cards', layout: 'grid', heading: 'Suggested destinations', items: [
      { title: 'Services Directory', text: 'Every system and service we offer.', to: '/services', cta: 'View infrastructure' },
      { title: 'Knowledge Center', text: 'Engineering notes and guides.', to: '/resources', cta: 'Read research' },
      { title: 'Client Reviews', text: 'What clients say about AERIS.', to: '/about/client-reviews', cta: 'Read reports' },
      { title: 'Request an Estimate', text: 'Start a project with a written scope.', to: '/request-estimate', cta: 'Initiate consultation' },
    ] },
  ],
}
