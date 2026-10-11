// Page content. Section types are rendered by src/components/Sections.jsx.
// Use [link text](/path) inside copy for internal links.
//
// Facts taken from the Figma design: 24/7 priority response, 10-year lifestyle warranty,
// +/-0.5 F precision zoning, under 40 dBA acoustic target, up to 24.5 SEER2, under 42 dBA,
// and the phone number. Everything else is general, accurate HVAC guidance. Items worth a final
// check by the business are listed in README.md ("Claims to confirm").

const ESTIMATE = { label: "Request an Estimate", to: "/request-estimate" }
const PHONE = { label: "(800) 582-AERIS", href: "tel:+18005822374", variant: "ghost" }
const cta = (heading, text) => ({ type: "cta", heading, text, ctas: [{ ...ESTIMATE }, PHONE] })

export const CONTENT = {
  /* ------------------------------------------------------------------ HOME */
  "/": {
    seo: {
      title: "AERIS | Architectural HVAC Engineering in New York",
      description: "Quiet, precise heating, cooling and air-quality systems for New York homes and commercial buildings, designed, installed and monitored by AERIS.",
    },
    hero: {
      variant: "home",
      title: "Comfort, Elevated.",
      text: "Heating, cooling and air-quality engineering for New York properties where design comes first. Quiet systems, precise control and installations that disappear into the architecture.",
      ctas: [
        { label: "Schedule a Service", to: "/request-estimate" },
        { label: "Explore Our Services", to: "/services", variant: "glass" },
      ],
      card: {
        title: "At a glance",
        rows: [
          ["Coverage", "Residential & Commercial"],
          ["Operating sound", "Under 42 dBA"],
          ["Efficiency", "Up to 24.5 SEER2"],
          ["Response", "24/7 priority"],
        ],
      },
    },
    sections: [
      {
        type: "cards", layout: "feature",
        heading: "Environmental infrastructure, rendered invisible.",
        link: { label: "Explore all core competencies", to: "/services" },
        items: [
          { tag: "Heat pumps and precision AC", title: "Next-Gen Inverter Heat Pumps & Precision AC", text: "Variable-speed inverter heat pumps heat and cool from a single system and adjust their output continuously instead of switching on and off. The result is steadier temperatures, lower operating sound and better efficiency through New York's hot summers and cold winters.", to: "/services/residential-hvac", cta: "Heat pump systems", media: { label: "Inverter heat pump" } },
          { tag: "Air quality", title: "Whole-Home IAQ & Medical HEPA Purification", text: "Filtration, fresh-air ventilation and humidity control planned as one system, so the air in every room stays clean and comfortable all year. Where it matters, we specify HEPA-grade filtration and sensors that report what the air is doing.", to: "/services/residential-hvac", cta: "Explore IAQ systems" },
          { tag: "Large-scale systems", title: "Variable Refrigerant Flow (VRF) & Hydronic Networks", text: "VRF and hydronic systems give a building independent control of every zone, with concealed distribution that protects the architecture.", to: "/services/commercial-hvac", cta: "View commercial engineering" },
        ],
      },
      {
        type: "paths", tone: "soft", heading: "Calibrated to your exact scope",
        items: [
          { tone: "light", title: "A More Comfortable Home Starts Here", text: "Whole-home comfort planned around your floor plan, your finishes and your daily routine, from a single apartment to a multi-story townhouse.", points: ["Concealed, low-noise equipment", "Room-by-room temperature control", "Air-quality monitoring built in"], cta: { label: "Residential Systems", to: "/services/residential-hvac" } },
          { tone: "dark", title: "Engineered for Architectural Scale", text: "Mechanical systems for lofts, towers and institutions, coordinated with architects and engineers from the first drawing.", points: ["VRF and hydronic design", "Commissioning and live telemetry", "Landmark-district and code coordination"], cta: { label: "Commercial Engineering", to: "/services/commercial-hvac" } },
        ],
      },
      {
        type: "cards", layout: "portfolio", heading: "Architectural Portfolio",
        link: { label: "View all commissions", to: "/projects" },
        items: [
          { tag: "Private residence", title: "The Ridgeview Estate", text: "A multi-zone inverter and hydronic system designed for a large private residence.", to: "/projects", media: { label: "The Ridgeview Estate" } },
          { tag: "Manhattan", title: "TriBeCa Sky Penthouse", text: "Concealed and ductless systems tuned for a glass-walled penthouse.", to: "/projects", media: { label: "TriBeCa Sky Penthouse" } },
          { tag: "Commercial", title: "Horizon Tech Innovation Hub", text: "A VRF network with live telemetry for a multi-tenant workplace.", to: "/projects", media: { label: "Horizon Tech Innovation Hub" } },
        ],
      },
      {
        type: "stats", tone: "dark",
        heading: "Engineered beyond the contractor baseline.",
        text: "Every system is designed, commissioned and monitored against written performance targets.",
        items: [
          { prefix: "\u00b1", value: 0.5, decimals: 1, suffix: "\u00b0F", label: "Precision zoning" },
          { prefix: "<", value: 40, suffix: " dBA", label: "Acoustic silence" },
          { value: 24, suffix: "/7", label: "Telemetry" },
          { value: 10, suffix: "-year", label: "Lifestyle warranty" },
        ],
      },
      {
        type: "cards", layout: "grid", heading: "What our clients ask for, and how we deliver it",
        items: [
          { title: "Quiet", text: "Sound targets are set at the start and designed in through equipment selection, placement, duct sizing and vibration isolation, not corrected afterward." },
          { title: "Invisible", text: "Equipment, linesets and distribution are drawn into the architectural plans so registers, grilles and routes respect your finishes." },
          { title: "Verified", text: "Every system is commissioned on site. Airflow, refrigerant charge, controls and sound are tested and recorded before handover." },
          { title: "Supported", text: "24/7 priority response and a 10-year lifestyle warranty keep the system performing after the installation team has left." },
        ],
      },
      {
        type: "faq", heading: "Common questions",
        link: { label: "See all FAQs", to: "/resources/faq" },
        items: [
          { q: "What does AERIS do?", a: "AERIS designs, installs and services heating, cooling, ventilation and air-quality systems for homes and commercial buildings in New York City. We handle the full scope: [load calculations and design](/services), installation, commissioning and ongoing maintenance." },
          { q: "Do you work on historic brownstones and landmark buildings?", a: "Yes. Quiet, concealed systems are a core focus. Read [how we approach inaudible VRF in historic brownstones](/resources/acoustic-threshold-inaudible-vrf) or see our [Tribeca service area](/service-areas/tribeca-manhattan) page." },
          { q: "How do I get an estimate?", a: "Send a few details through the [estimate form](/request-estimate) or call (800) 582-AERIS. An AERIS engineer reviews the property and replies with a written scope and estimate, not a generic quote." },
          { q: "Is emergency service available?", a: "Yes. AERIS offers 24/7 priority response for urgent heating and cooling failures. Call (800) 582-AERIS and ask for priority service." },
        ],
      },
      { type: "form", heading: "Ready for Uncompromised Climate Control?", text: "Tell us about the property. An AERIS engineer will review it and reply with a written scope and estimate.", formTitle: "Request Bespoke Estimate" },
    ],
  },

  /* -------------------------------------------------------------- SERVICES */
  "/services": {
    schema: "service", serviceType: "HVAC installation, repair and maintenance",
    seo: {
      title: "HVAC Services: Installation, Repair & Maintenance | AERIS",
      description: "Heating, cooling, heat pump, VRF and indoor air quality services for New York homes and commercial buildings: installation, repair, replacement and maintenance.",
    },
    hero: {
      title: "Heating and Cooling, Thoughtfully Handled.",
      text: "Professional HVAC installation, repair, replacement and maintenance for residential and commercial properties in New York City.",
      ctas: [{ ...ESTIMATE }, PHONE],
    },
    sections: [
      {
        type: "cards", layout: "grid", heading: "Precision Air Conditioning",
        text: "Cooling that is sized to the building, installed cleanly and verified before we leave.",
        items: [
          { title: "AC Installation", text: "Central, ductless and concealed cooling systems sized from a load calculation, not a rule of thumb.", to: "/services/ac-installation", cta: "Installation details" },
          { title: "AC Repair", text: "Diagnosis and repair with clear pricing explained before work begins.", to: "/request-estimate", cta: "Request a repair" },
          { title: "AC Replacement", text: "Replace aging equipment with quieter, higher-efficiency inverter systems.", to: "/request-estimate", cta: "Request a quote" },
        ],
      },
      {
        type: "cards", layout: "grid", tone: "soft", heading: "High-Efficiency Heating & Furnace Engineering",
        items: [
          { title: "Furnace Repair & Maintenance", text: "Diagnostics, safety checks and tune-ups that keep heating safe and reliable through the winter.", to: "/request-estimate", cta: "Book service" },
          { title: "Heating Installation", text: "Furnaces, boilers and heat pumps selected for efficiency, sound level and the way the building is used.", to: "/request-estimate", cta: "Request an estimate" },
        ],
      },
      {
        type: "split", heading: "All-Electric Inverter Heat Pumps",
        text: "Cold-climate heat pumps deliver heating and cooling from one system. Variable-speed compressors keep working efficiently when outdoor temperatures drop, and they run quietly because they rarely need to run at full speed.",
        points: ["Heating and cooling from a single system", "Rated heating output at low outdoor temperatures", "Modulating compressors that avoid on-off cycling"],
        cta: { label: "Explore inverter heat pump systems", to: "/services/residential-hvac" }, media: { label: "Cold-climate heat pump" },
      },
      {
        type: "cards", layout: "grid", heading: "Preventive Care & Microclimate Purity",
        items: [
          { title: "HVAC Maintenance Agreements", text: "Scheduled inspection, cleaning and priority service for residential and commercial systems, with a written record after every visit.", to: "/request-estimate", cta: "Review maintenance plans" },
          { title: "Indoor Air Quality (IAQ)", text: "Filtration, fresh-air ventilation and humidity control matched to the air you want inside, with optional air-quality monitoring.", to: "/request-estimate", cta: "Explore air-quality options" },
        ],
      },
      {
        type: "cards", layout: "grid", tone: "soft", heading: "Commercial Mechanical & VRF Solutions",
        text: "Installation, maintenance and repair for offices, retail, hospitality and institutional buildings.",
        items: [
          { title: "Commercial Installation", text: "VRF, hydronic and rooftop systems engineered together with the design team.", to: "/services/commercial-hvac", cta: "Engineering details" },
          { title: "Commercial Maintenance", text: "Planned service with documented reporting for facility teams.", to: "/services/commercial-hvac", cta: "Maintenance details" },
          { title: "Commercial Repair", text: "24/7 priority response when a system goes down.", to: "/contact", cta: "Request a repair" },
        ],
      },
      {
        type: "steps", heading: "A Deliberate Process. Zero Guesswork.",
        text: "Every project follows the same four steps.",
        items: [
          { title: "Assessment", text: "We survey the property, calculate heating and cooling loads and listen to what you need from the space." },
          { title: "Engineering & Recommendations", text: "You receive a written design with options, performance targets and a defined scope." },
          { title: "Professional Execution", text: "Technicians install to the drawings and protect your finishes while they work." },
          { title: "Commissioning & Telemetry", text: "We verify performance on site and keep monitoring after handover." },
        ],
      },
      {
        type: "faq", heading: "Client & Architect Inquiries",
        link: { label: "Visit the knowledge base", to: "/resources/faq" },
        items: [
          { q: "How do I choose between an inverter heat pump and traditional AC?", a: "A modern inverter heat pump both heats and cools, so one system replaces a separate air conditioner and furnace. Variable-speed compressors adjust output continuously, which keeps temperatures steady, runs quietly and uses less energy at partial load. Traditional AC paired with a furnace can still make sense where gas heat is required or the building already has suitable ductwork. We compare both for your property in the written estimate." },
          { q: "What does commercial maintenance include?", a: "Scheduled visits cover inspection and cleaning of coils, filters and drains, electrical and refrigerant checks, control and sensor verification, and a written report after every visit so facility teams can track equipment condition over time." },
          { q: "What are the lead times for custom system installations?", a: "Lead time depends on three things: design and approvals, equipment availability and site access. As a guide, straightforward replacements are often scheduled within a few weeks of approval, while custom multi-zone or VRF systems with specified equipment and building approvals more commonly take several weeks to a few months. Your written scope states the expected schedule for your project." },
          { q: "Can AERIS coordinate with existing architectural millwork?", a: "Yes. Equipment and distribution are drawn into the architectural plans before installation, so registers, grilles, linesets and condensate routes are placed around millwork, ceilings and finishes instead of being forced through them. We coordinate with architects, interior designers and general contractors from the first drawing." },
        ],
      },
      cta("Ready to Discuss Your Mechanical Envelope?", "Connect with an AERIS climate engineer for a detailed assessment, or call us for urgent service."),
    ],
  },

  /* ----------------------------------------------------------- RESIDENTIAL */
  "/services/residential-hvac": {
    schema: "service", serviceType: "Residential HVAC and heat pump installation",
    seo: {
      title: "Residential HVAC & Heat Pump Installation NYC | AERIS",
      description: "Whole-home heating, cooling and air quality for New York apartments, townhouses and estates. Inverter heat pumps, zoning and filtration designed around your home.",
    },
    hero: {
      title: "Residential HVAC & Heat Pump Systems",
      text: "Whole-home heating, cooling and air quality for apartments, townhouses and estates, designed around the way you live.",
      ctas: [{ ...ESTIMATE }, { label: "All services", to: "/services", variant: "ghost" }],
    },
    sections: [
      {
        type: "cards", layout: "grid", heading: "What we design and install",
        items: [
          { title: "Inverter heat pumps", text: "Efficient heating and cooling from one system, with variable-speed compressors that hold temperature steady and stay quiet." },
          { title: "Ductless and concealed systems", text: "Slim-profile ducting, ceiling cassettes and discreet wall units for finished interiors where full ductwork is not practical." },
          { title: "Zoning and controls", text: "Room-by-room temperature control, so bedrooms, living areas and studios can each be set independently." },
          { title: "Air quality and ventilation", text: "Filtration, fresh-air ventilation and humidity control, including HEPA-grade options and air-quality sensors." },
          { title: "Maintenance and service", text: "Scheduled inspections and 24/7 priority response, backed by a 10-year lifestyle warranty.", to: "/request-estimate", cta: "Ask about maintenance" },
        ],
      },
      {
        type: "split", tone: "soft", heading: "Quiet by design",
        text: "The quietest system is the one planned around sound from the start. We set a noise target for each room, then choose equipment, locations, duct sizes and mounting to meet it.",
        points: ["Under 40 dBA acoustic target in living spaces", "Vibration isolation on equipment and linesets", "Outdoor units placed away from bedrooms and neighbors"],
        cta: { label: "Read how we design for sound", to: "/resources/acoustic-threshold-inaudible-vrf" }, media: { label: "Concealed residential system" },
      },
      {
        type: "steps", heading: "How a residential project runs",
        items: [
          { title: "Home assessment", text: "A walkthrough and load calculation for every room, including windows, insulation and how you use the space." },
          { title: "Design and written scope", text: "Equipment, placement, noise targets and controls are set out in writing before any work is scheduled." },
          { title: "Installation", text: "Careful, protected work that respects floors, walls and finishes, coordinated with your contractor or designer." },
          { title: "Commissioning and handover", text: "We test and record performance, then walk you through the controls." },
        ],
      },
      {
        type: "faq", heading: "Residential HVAC questions",
        items: [
          { q: "Can a heat pump heat my home through a New York winter?", a: "Yes, when it is a cold-climate model sized correctly. Cold-climate inverter heat pumps are rated to deliver heat at low outdoor temperatures. We confirm the heating capacity at your design temperature in the written scope, and can pair the system with backup heat where the building needs it." },
          { q: "How quiet can a residential system be?", a: "Quiet enough that you notice the comfort, not the equipment. We design to an under-40 dBA target in living spaces by selecting low-sound equipment, isolating vibration and placing units carefully. Actual results depend on the building, so we state the target for each room in your scope." },
          { q: "Do co-op and condo buildings need approval?", a: "Often, yes. Many buildings require board or management approval before equipment is installed or exterior work begins. We prepare the drawings and documentation boards typically ask for and coordinate with building management." },
          { q: "Are there incentives for heat pumps?", a: "Utility and state incentive programs may be available for heat pumps and efficiency upgrades. Programs and eligibility change, so we confirm current options when we prepare your estimate." },
        ],
      },
      { type: "children", heading: "Related services" },
      cta("Plan your residential system", "Share a few details about your home and we will reply with a written scope."),
    ],
  },

  /* ------------------------------------------------------------ COMMERCIAL */
  "/services/commercial-hvac": {
    schema: "service", serviceType: "Commercial HVAC and VRF installation",
    seo: {
      title: "Commercial HVAC & VRF Systems in New York | AERIS",
      description: "VRF, hydronic and rooftop HVAC design, installation, commissioning and maintenance for New York offices, retail, hospitality and institutional buildings.",
    },
    hero: {
      title: "Commercial HVAC & VRF Solutions",
      text: "Mechanical systems for offices, retail, hospitality and institutions, coordinated with your architects and engineers from the first drawing.",
      ctas: [{ ...ESTIMATE }, { label: "All services", to: "/services", variant: "ghost" }],
    },
    sections: [
      {
        type: "cards", layout: "grid", heading: "Commercial capabilities",
        items: [
          { title: "VRF systems", text: "Variable refrigerant flow gives each zone or tenant independent control, with heat recovery options for buildings that heat and cool at the same time." },
          { title: "Hydronic networks", text: "Quiet, efficient heating and cooling distribution using water, suited to buildings that value low noise and even comfort." },
          { title: "Rooftop and split systems", text: "Packaged and split equipment for retail, restaurants and light commercial spaces where it is the right fit." },
          { title: "Controls and telemetry", text: "Building controls and live monitoring so facility teams can see how every system is performing." },
          { title: "Commissioning", text: "Documented testing of airflow, refrigerant charge, controls and sound before handover." },
          { title: "Maintenance and repair", text: "Planned maintenance with written reports and 24/7 priority response when a system goes down." },
        ],
      },
      {
        type: "stats", tone: "dark", heading: "Performance you can verify",
        text: "Design targets we set and test against on commercial projects.",
        items: [
          { value: 24, suffix: "/7", label: "Priority response" },
          { prefix: "<", value: 40, suffix: " dBA", label: "Acoustic target" },
          { value: 10, suffix: "-year", label: "Lifestyle warranty" },
        ],
      },
      {
        type: "doc", heading: "How we work with design teams",
        blocks: [
          { h: "Coordinated from the first drawing", p: ["Early coordination with architects, engineers and general contractors avoids clashes between ductwork, structure and finishes. We provide equipment data, clearances and sound information in the formats design teams need."] },
          { h: "Built for tenants and facility teams", p: ["Systems are zoned so tenants control their own space, and maintenance access is planned so facility teams can service equipment without disrupting occupants."] },
          { h: "Handover with documentation", ul: ["Commissioning records for each system", "Controls sequences and settings", "Maintenance schedules and equipment data", "Warranty terms in writing"] },
        ],
      },
      {
        type: "faq", heading: "Commercial HVAC questions",
        items: [
          { q: "When is VRF a better choice than a rooftop system?", a: "VRF suits buildings that need independent zones, quiet operation and flexible layouts, such as offices, hospitality and mixed-use spaces. Rooftop or split systems can be more economical for simple, open floor plans. We compare options against your layout, schedule and budget." },
          { q: "What is commissioning and why does it matter?", a: "Commissioning is the documented testing that proves a system performs as designed: airflow, refrigerant charge, controls, safety devices and sound. It catches problems before handover and gives you a baseline for future maintenance." },
          { q: "Can you work on tenant improvements and occupied buildings?", a: "Yes. We schedule work around tenants, protect finished areas and coordinate access and shutdowns with building management." },
          { q: "What do your maintenance reports include?", a: "Each visit produces a written report covering the work performed, readings taken, issues found and recommended actions, so you can track equipment condition over time." },
        ],
      },
      { type: "children", heading: "Related services" },
      cta("Discuss a commercial project", "Send drawings or a brief and an AERIS engineer will respond with next steps."),
    ],
  },

  /* ----------------------------------------------------------- AC INSTALL */
  "/services/ac-installation": {
    schema: "service", serviceType: "Air conditioning installation",
    seo: {
      title: "AC Installation in New York: Quiet, Right-Sized | AERIS",
      description: "Central, ductless and high-velocity air conditioning installation in New York. Load-calculated sizing, clean installation and verified performance.",
    },
    hero: {
      title: "AC Installation, Sized to the Building",
      text: "Quiet, right-sized cooling for apartments, townhouses and commercial spaces, installed cleanly and verified before we leave.",
      ctas: [{ label: "Request Installation Estimate", to: "/request-estimate" }, { label: "All services", to: "/services", variant: "ghost" }],
    },
    sections: [
      {
        type: "cards", layout: "grid", heading: "Air conditioning systems we install",
        items: [
          { title: "Ductless mini-split", text: "Individual wall or ceiling units connected to an outdoor unit. A good fit where there is no space for ductwork." },
          { title: "Concealed ducted systems", text: "Slim ducts above ceilings or in soffits with small, discreet grilles that keep the room uncluttered." },
          { title: "High-velocity small-duct", text: "Compact flexible ducts that travel through tight spaces in older buildings where standard ducts will not fit." },
          { title: "Inverter heat pump cooling", text: "Variable-speed systems that cool efficiently and can also heat, replacing a separate furnace.", to: "/services/residential-hvac", cta: "Residential heat pumps" },
        ],
      },
      {
        type: "split", tone: "soft", heading: "Why sizing matters",
        text: "An oversized air conditioner cools quickly, shuts off before it has removed humidity and cycles on and off, which wastes energy and feels clammy. An undersized one runs constantly and never catches up. We size every system from a room-by-room load calculation.",
        points: ["Load calculation for every room", "Equipment matched to the load, not the nearest size", "Humidity control as well as temperature"],
        media: { label: "Air conditioning installation" },
      },
      {
        type: "steps", heading: "Installation, step by step",
        items: [
          { title: "Load calculation", text: "We measure the building and calculate the cooling load room by room." },
          { title: "Equipment selection", text: "Efficiency, sound level and placement are agreed in writing." },
          { title: "Installation", text: "Technicians install the system, protect your finishes and keep work areas tidy." },
          { title: "Startup and verification", text: "Airflow, refrigerant charge and controls are tested and recorded." },
        ],
      },
      {
        type: "faq", heading: "AC installation questions",
        items: [
          { q: "How long does an AC installation take?", a: "A single-zone ductless installation is often completed in a day or two on site. Multi-zone and ducted systems take longer because of ductwork and finishing. Your written scope states the installation schedule." },
          { q: "Do you handle permits and building approvals?", a: "Where permits or building approvals are required, we prepare the documentation and coordinate filings and inspections. Co-op and condo boards often have their own requirements, which we build into the plan." },
          { q: "Should I repair or replace an older air conditioner?", a: "Repair usually makes sense for a newer system with a single failed component. Replacement is worth considering when equipment is old, uses an outdated refrigerant, needs frequent repairs or is noisy and inefficient. We give you both options with costs." },
          { q: "Can the outdoor unit be hidden?", a: "Often, yes. Outdoor units can be placed on roofs, terraces or in screened areas, subject to building rules. We plan placement for appearance and sound, and for landmark-district rules where they apply." },
        ],
      },
      cta("Get an installation estimate", "Tell us about the property and we will respond with a written scope."),
    ],
  },

  /* --------------------------------------------------------- SERVICE AREAS */
  "/service-areas": {
    seo: {
      title: "HVAC Service Areas in New York City | AERIS",
      description: "AERIS designs, installs and services HVAC systems across New York City, with deep experience in Manhattan lofts, brownstones and penthouses.",
    },
    hero: {
      title: "Service Areas Directory",
      text: "AERIS designs, installs and services HVAC systems in New York City, with a focus on Manhattan lofts, brownstones and penthouses.",
      ctas: [{ ...ESTIMATE }],
    },
    sections: [
      { type: "children", heading: "Featured service area" },
      {
        type: "chips", heading: "Manhattan neighborhoods",
        text: "Where we most often design and install quiet, concealed systems.",
        items: ["Tribeca", "SoHo", "Greenwich Village", "West Village", "Chelsea", "Flatiron", "Upper East Side", "Upper West Side"],
        note: "Not listed? [Contact the engineering desk](/contact) and we will confirm availability for your property.",
      },
      cta("Not sure if we cover your area?", "Send the address and a few details and we will confirm quickly."),
    ],
  },

  "/service-areas/tribeca-manhattan": {
    schema: "service", serviceType: "HVAC design and installation in Tribeca",
    seo: {
      title: "Tribeca HVAC: Lofts, Brownstones & Penthouses | AERIS",
      description: "HVAC design and installation for Tribeca lofts, converted warehouses and penthouses: quiet systems, concealed distribution and landmark-district coordination.",
    },
    hero: {
      title: "HVAC for Tribeca, Manhattan",
      text: "Climate systems for cast-iron lofts, converted warehouses and penthouses, designed to stay quiet and out of sight.",
      ctas: [{ label: "Request Tribeca Project Scope", to: "/request-estimate" }],
    },
    sections: [
      {
        type: "cards", layout: "grid", heading: "What Tribeca buildings need",
        items: [
          { title: "Low-noise systems", text: "Open-plan lofts with hard surfaces and tall ceilings amplify equipment sound, so quiet design matters more." },
          { title: "Landmark-district coordination", text: "Many Tribeca buildings sit in historic districts where visible exterior equipment is restricted. We plan placement with those rules in mind." },
          { title: "Concealed distribution", text: "Slim-profile ducting and discreet terminals protect exposed brick, beams and cast-iron details." },
        ],
      },
      {
        type: "doc", heading: "Planning HVAC in a Tribeca loft or penthouse",
        blocks: [
          { h: "Tall volumes and open plans", p: ["High ceilings and large open rooms stratify heat and make even cooling difficult. We use zoned systems, careful air distribution and sensors to keep temperatures even from floor to ceiling."] },
          { h: "Limited space for equipment", p: ["Older industrial buildings rarely have dedicated mechanical rooms. We plan compact equipment, rooftop or terrace locations and routes for linesets and condensate early, in coordination with building management."] },
          { h: "Quiet by design", p: ["Our approach to sound is set out in [The Acoustic Threshold: Inaudible VRF in Historic Brownstones](/resources/acoustic-threshold-inaudible-vrf), and the same principles apply to lofts and penthouses."] },
        ],
      },
      {
        type: "faq", heading: "Tribeca HVAC questions",
        items: [
          { q: "Can you install in a landmarked building?", a: "Yes. We design around landmark-district rules by favoring concealed interior equipment and carefully placed exterior components, and we coordinate documentation with building management." },
          { q: "What system works best for a loft?", a: "Often a zoned VRF or ducted inverter system with concealed distribution. The right choice depends on ceiling height, structure and where equipment can go. We recommend options after a site survey." },
        ],
      },
      cta("Planning a Tribeca project?", "Send a few details and an AERIS engineer will scope it."),
    ],
  },

  /* -------------------------------------------------------------- PROJECTS */
  "/projects": {
    seo: {
      title: "HVAC Projects & Portfolio | AERIS",
      description: "Selected AERIS residential and commercial HVAC commissions: estates, penthouses and workplaces engineered for quiet, precise comfort.",
    },
    hero: {
      title: "Projects & Portfolio",
      text: "Selected residential and commercial commissions, engineered for quiet, precise comfort.",
      ctas: [{ ...ESTIMATE }],
    },
    sections: [
      {
        type: "cards", layout: "portfolio", heading: "Selected commissions",
        items: [
          { tag: "Private residence", title: "The Ridgeview Estate", text: "A multi-zone inverter and hydronic system for a large private residence, designed for even temperatures and low sound throughout.", media: { label: "The Ridgeview Estate" } },
          { tag: "Manhattan", title: "TriBeCa Sky Penthouse", text: "Concealed and ductless systems for a glass-walled penthouse, planned around views, finishes and building rules.", media: { label: "TriBeCa Sky Penthouse" }, to: "/service-areas/tribeca-manhattan", cta: "Tribeca service area" },
          { tag: "Commercial", title: "Horizon Tech Innovation Hub", text: "A VRF network with live telemetry for a multi-tenant workplace, giving each tenant independent control.", media: { label: "Horizon Tech Innovation Hub" }, to: "/services/commercial-hvac", cta: "Commercial HVAC" },
        ],
      },
      {
        type: "stats", tone: "dark", heading: "The targets behind every project",
        items: [
          { prefix: "\u00b1", value: 0.5, decimals: 1, suffix: "\u00b0F", label: "Precision zoning" },
          { prefix: "<", value: 40, suffix: " dBA", label: "Acoustic silence" },
          { value: 10, suffix: "-year", label: "Lifestyle warranty" },
        ],
      },
      {
        type: "doc", heading: "How we approach every commission",
        blocks: [
          { h: "Design to written targets", p: ["Temperature, sound and air-quality targets are agreed in writing at the start, so everyone knows what success looks like."] },
          { h: "Coordinate with the design team", p: ["We work with architects, interior designers and contractors so equipment and distribution fit the building rather than fight it."] },
          { h: "Commission and monitor", p: ["Systems are tested on site and monitored after handover, backed by 24/7 priority response."] },
        ],
      },
      cta("Have a project in mind?", "Tell us about it and we will respond with a written scope."),
    ],
  },

  /* ----------------------------------------------------------------- ABOUT */
  "/about": {
    seo: {
      title: "About AERIS | HVAC Engineers & Installers in New York",
      description: "AERIS engineers and installs quiet, precise climate systems for New York projects where design, sound and air quality matter.",
    },
    hero: {
      title: "About Us",
      text: "AERIS engineers and installs climate systems for projects where design, sound and air quality matter.",
      ctas: [{ label: "Client reviews", to: "/about/client-reviews" }, { label: "Contact us", to: "/contact", variant: "ghost" }],
    },
    sections: [
      {
        type: "doc", heading: "How we work",
        intro: "AERIS is an HVAC engineering and installation company. We design, install, commission and maintain heating, cooling and air-quality systems for homes and commercial buildings in New York City.",
        blocks: [
          { h: "Engineering first", p: ["Every project starts with measurement and calculation. We size equipment from room-by-room loads and set sound, temperature and air-quality targets before choosing hardware."] },
          { h: "Architecture-aware installation", p: ["Systems are drawn into the architectural plans and installed to protect finishes. We work alongside architects, interior designers and general contractors."] },
          { h: "Accountable after handover", p: ["We commission each system, monitor performance and provide 24/7 priority response, backed by a 10-year lifestyle warranty."] },
        ],
      },
      {
        type: "cards", layout: "grid", tone: "soft", heading: "The standards we hold ourselves to",
        items: [
          { title: "Written scopes", text: "Equipment, placement, performance targets and schedule are set out in writing before work starts." },
          { title: "Clean, protected work", text: "Finished floors, walls and furniture are protected, and work areas are kept tidy." },
          { title: "Tested before handover", text: "Airflow, refrigerant charge, controls and sound are tested and recorded." },
          { title: "Straight answers", text: "We explain the options, including when a simpler solution is the better one." },
        ],
      },
      { type: "children", heading: "More about AERIS" },
      cta("Work with AERIS", "Tell us about the property and an engineer will reply with a written scope."),
    ],
  },

  "/about/client-reviews": {
    seo: {
      title: "Client Reviews & Endorsements | AERIS",
      description: "How AERIS earns endorsements from homeowners, architects and property managers, and how to share your experience of working with us.",
    },
    hero: {
      title: "Client Reviews & Endorsements",
      text: "What homeowners, architects and property managers hold us to, and how you can share your experience.",
      ctas: [{ label: "Share your experience", to: "/contact" }, { ...ESTIMATE, variant: "ghost" }],
    },
    sections: [
      {
        type: "cards", layout: "grid", heading: "What clients and design teams hold us to",
        items: [
          { title: "A quiet home or workplace", text: "Sound targets are set at the start and tested at handover." },
          { title: "Equipment that disappears", text: "Systems are planned around finishes, views and architectural details." },
          { title: "Clear communication", text: "Written scopes, honest schedules and one point of contact throughout." },
          { title: "Support that continues", text: "24/7 priority response and a 10-year lifestyle warranty." },
        ],
      },
      {
        type: "doc", tone: "soft", heading: "Share your experience",
        blocks: [
          { h: "Worked with AERIS?", p: ["We welcome feedback from homeowners, architects, designers and property managers. Reach the team through the [contact page](/contact) or by calling (800) 582-AERIS."] },
          { h: "How we publish endorsements", p: ["We publish reviews and endorsements only with the author's permission, and we do not edit them to change their meaning."] },
        ],
      },
      cta("Become our next client", "Request an estimate and an engineer will respond with a written scope."),
    ],
  },

  /* ------------------------------------------------------------- RESOURCES */
  "/resources": {
    seo: {
      title: "HVAC Knowledge Center & Engineering Guides | AERIS",
      description: "Technical guides and long-form engineering notes from AERIS on heat pumps, VRF, indoor air quality and quiet system design in historic buildings.",
    },
    hero: {
      title: "Knowledge Center & Engineering Dossiers",
      text: "Technical guides and long-form engineering notes from the AERIS team for homeowners, architects and facility managers.",
      ctas: [{ label: "Read the FAQ", to: "/resources/faq" }],
    },
    sections: [
      { type: "children", heading: "Featured reading" },
      {
        type: "cards", layout: "grid", tone: "soft", heading: "Start with the system you are considering",
        items: [
          { title: "Choosing a heat pump", text: "How inverter heat pumps work, what cold-climate means and when they are the right choice.", to: "/services/residential-hvac", cta: "Residential heat pumps" },
          { title: "VRF for buildings", text: "How variable refrigerant flow gives each zone independent control.", to: "/services/commercial-hvac", cta: "Commercial VRF" },
          { title: "Sizing air conditioning", text: "Why room-by-room load calculations matter for comfort and efficiency.", to: "/services/ac-installation", cta: "AC installation" },
        ],
      },
      cta("Have a technical question?", "The AERIS engineering desk answers architects, designers and homeowners directly."),
    ],
  },

  "/resources/faq": {
    seo: {
      title: "HVAC FAQ: Heat Pumps, VRF, Air Quality & More | AERIS",
      description: "Answers to common questions about heat pumps, VRF systems, air conditioning, indoor air quality, noise, permits and maintenance from AERIS engineers.",
    },
    hero: {
      title: "Architectural & Technical FAQ",
      text: "Answers to common questions from homeowners, architects and facility teams.",
      ctas: [{ ...ESTIMATE }],
    },
    sections: [
      {
        type: "faq", heading: "Frequently asked questions",
        items: [
          { q: "How do I choose between an inverter heat pump and traditional AC?", a: "A modern inverter heat pump heats and cools from one system and runs efficiently at partial load. Traditional AC with a furnace can make sense where gas heat is required or suitable ductwork already exists. See our [services overview](/services) for how we compare options." },
          { q: "Can a heat pump heat a home through a New York winter?", a: "Yes, when it is a cold-climate model sized correctly. We confirm heating capacity at your design temperature and can add backup heat where needed." },
          { q: "What is VRF and when is it used?", a: "VRF (variable refrigerant flow) connects one outdoor unit to multiple indoor units, each controlled independently. It suits offices, hospitality, mixed-use buildings and homes that need zoned control. See [commercial HVAC](/services/commercial-hvac)." },
          { q: "How quiet can an HVAC system be?", a: "Very quiet, when sound is designed in. We set a target for each room, then choose equipment, mounting and placement to meet it. Read [how we approach inaudible VRF](/resources/acoustic-threshold-inaudible-vrf)." },
          { q: "What is the difference between filtration and ventilation?", a: "Filtration removes particles from air that is already in the building. Ventilation brings in fresh air and removes stale air. Good indoor air quality usually needs both, plus humidity control." },
          { q: "What humidity level is best indoors?", a: "Most guidance suggests keeping indoor relative humidity roughly between 30 and 50 percent. Too dry feels uncomfortable and too humid encourages mold, so humidity control is part of our air-quality design." },
          { q: "How often should HVAC systems be serviced?", a: "At least once a year for most residential systems, and more often for commercial equipment. A [maintenance agreement](/request-estimate) schedules inspections, cleaning and priority service." },
          { q: "Do you handle permits and co-op or condo approvals?", a: "Where required, we prepare documentation, coordinate filings and inspections, and work with building management and boards." },
          { q: "How long does an installation take?", a: "It depends on the system. A single-zone ductless installation can be a day or two on site, while multi-zone and ducted systems take longer. Your written scope states the schedule." },
          { q: "Is emergency service available?", a: "Yes. AERIS offers 24/7 priority response. Call (800) 582-AERIS." },
        ],
      },
      cta("Still have questions?", "Reach the engineering desk directly and an engineer will respond."),
    ],
  },

  "/resources/acoustic-threshold-inaudible-vrf": {
    schema: "article", published: "2026-10-11",
    seo: {
      title: "Inaudible VRF in Historic Brownstones | AERIS",
      description: "How to design VRF systems that stay inaudible in historic brownstones: sound targets, equipment placement, distribution, vibration isolation and commissioning.",
    },
    hero: {
      title: "The Acoustic Threshold: Inaudible VRF in Historic Brownstones",
      text: "An engineering dossier on designing quiet, concealed VRF systems for landmark townhouses.",
      ctas: [{ label: "Back to Knowledge Center", to: "/resources", variant: "ghost" }],
    },
    sections: [
      {
        type: "doc", heading: "Overview",
        intro: "A brownstone is a hard place to hide a mechanical system. Rooms are compact, walls are shared, plaster carries sound, and exterior changes may be restricted. Variable refrigerant flow (VRF) suits these buildings because it needs small pipes instead of large ducts, but quiet operation still has to be designed on purpose.",
        blocks: [
          { h: "Why brownstones are acoustically difficult", p: ["Narrow floor plates put bedrooms close to equipment. Original plaster and timber floors transmit vibration. Party walls share sound with neighbors, and rear-yard equipment can reflect noise off surrounding buildings."] },
          { h: "Set the target before choosing equipment", p: ["Acoustic design starts with a number. Sound in occupied rooms is commonly described with dBA or NC (noise criteria) ratings, and targets for private residences are typically set low in bedrooms and slightly higher in living areas. We state the target for each room in the written scope, then design to it. Our general target for living spaces is under 40 dBA."] },
          { h: "Equipment selection and placement", ul: ["Choose indoor units with low sound ratings and run them at low fan speeds through correct sizing.", "Place outdoor units away from bedrooms and neighboring windows, on roofs, terraces or screened areas where building rules allow.", "Keep compressors and fans off party walls and away from sleeping areas."] },
          { h: "Distribution that stays out of sight", p: ["VRF refrigerant lines are small enough to run through existing chases, closets and soffits, which avoids cutting large openings in original plaster. Concealed ceiling units and slim ducts feed rooms through discreet grilles, keeping moldings and ceilings intact."] },
          { h: "Vibration isolation", p: ["Sound travels through structure as well as air. We isolate equipment from the building with vibration mounts and flexible connections, and support refrigerant lines so they do not rattle against framing."] },
          { h: "Commissioning and verification", p: ["After installation we test airflow, refrigerant charge and controls, and check sound in occupied rooms against the target. Results are recorded in the handover documentation."] },
          { h: "Working within landmark rules", p: ["Brownstones in historic districts may restrict visible exterior equipment. Early coordination with building owners and the relevant approving bodies keeps the design practical and the approval path clear."] },
        ],
      },
      { type: "children", heading: "Continue reading", of: "/resources" },
      cta("Planning a historic building project?", "Talk to an AERIS engineer about acoustic targets and equipment placement."),
    ],
  },

  /* --------------------------------------------------------------- CONTACT */
  "/contact": {
    schema: "contact",
    seo: {
      title: "Contact AERIS | HVAC Engineering Desk & 24/7 Service",
      description: "Call, write or request an estimate from the AERIS engineering desk. 24/7 priority response for urgent heating and cooling failures.",
    },
    hero: {
      title: "Contact Us",
      text: "Call, write or request an estimate. An AERIS engineer responds to every inquiry.",
      ctas: [PHONE, { ...ESTIMATE, variant: "ghost" }],
    },
    sections: [
      {
        type: "cards", layout: "grid", heading: "How to reach us",
        items: [
          { title: "Call the engineering desk", text: "Speak to the AERIS team about a project, a service need or a question.", href: "tel:+18005822374", cta: "Call (800) 582-AERIS" },
          { title: "Urgent service", text: "24/7 priority response for heating and cooling failures. Call and ask for priority service.", href: "tel:+18005822374", cta: "Call now" },
          { title: "Request an estimate", text: "Send property details and receive a written scope and estimate.", to: "/request-estimate", cta: "Start an estimate" },
        ],
      },
      {
        type: "steps", tone: "soft", heading: "What happens after you reach out",
        items: [
          { title: "We review your details", text: "An engineer reads your message and checks the property and scope." },
          { title: "We reply", text: "You hear back with questions or next steps, usually within one business day." },
          { title: "We scope the work", text: "If needed we visit the site, then send a written scope and estimate." },
        ],
      },
      { type: "form", heading: "Send a message", text: "Share a few details about the property and what you need.", formTitle: "Contact the engineering desk" },
    ],
  },

  "/request-estimate": {
    seo: {
      title: "Request an HVAC Estimate | AERIS",
      description: "Tell AERIS about your property and receive a written HVAC scope and estimate from an engineer, not a generic quote.",
    },
    hero: {
      title: "Request an Estimate",
      text: "Tell us about the property. An AERIS engineer will review it and reply with a written scope and estimate.",
      ctas: [],
    },
    sections: [
      {
        type: "steps", heading: "What to expect",
        items: [
          { title: "Send your details", text: "Share the property type, location and what you need. It takes about two minutes." },
          { title: "Engineer review", text: "An AERIS engineer reviews the project and may ask follow-up questions or arrange a site visit." },
          { title: "Written scope and estimate", text: "You receive equipment, placement, performance targets, schedule and pricing in writing." },
        ],
      },
      { type: "form", tone: "dark", heading: "Project details", text: "The more you tell us, the more precise the first reply can be.", formTitle: "Request Bespoke Estimate" },
      {
        type: "faq", heading: "Estimate questions",
        items: [
          { q: "How much will it cost?", a: "Cost depends on property size, system type, access and finishes. We do not quote prices from a form. We review your details first and then provide a written scope with pricing, so the number reflects your project." },
          { q: "What information should I include?", a: "The property type and location, whether it is a new system or replacement, any building restrictions you know about, and your timing. Photos and drawings help if you have them." },
          { q: "Do you charge for estimates?", a: "Please call (800) 582-AERIS or mention it in your request and we will confirm how estimates and site visits work for your project." },
        ],
      },
    ],
  },

  /* --------------------------------------------------------------- PRIVACY */
  "/privacy-policy": {
    seo: {
      title: "Privacy Policy | AERIS",
      description: "How AERIS collects, uses and protects the information you share through this website, including the estimate and contact forms.",
    },
    hero: {
      title: "Privacy Policy",
      text: "How AERIS collects, uses and protects your information. Last updated October 11, 2026.",
      ctas: [],
    },
    sections: [
      {
        type: "doc",
        blocks: [
          { h: "Information we collect", p: ["When you submit the estimate or contact form we collect the details you enter: ZIP code, property type, email address, phone number (optional) and the message you write. If you call us, we may keep a record of the call and the details you give."] },
          { h: "How we use it", p: ["We use your information to respond to your inquiry, prepare scopes and estimates, schedule service and keep records of our work. We do not use it for advertising profiles."] },
          { h: "Who we share it with", p: ["We share information only with service providers who help us operate the website and respond to you, such as our hosting provider and email delivery service, and only as needed for those purposes. We do not sell your personal information."] },
          { h: "Cookies and analytics", p: ["This website does not use advertising cookies. If we add analytics, we will update this policy to describe what is collected."] },
          { h: "How long we keep it", p: ["We keep inquiry and project records for as long as needed to respond, deliver services, meet legal and warranty obligations and resolve disputes, then delete or anonymize them."] },
          { h: "Your choices and rights", p: ["Depending on where you live, you may have the right to ask what information we hold about you, to correct it or to ask us to delete it. To make a request, contact us through the [contact page](/contact) or call (800) 582-AERIS."] },
          { h: "Security", p: ["We use reasonable technical and organizational measures to protect information. No method of transmission or storage is completely secure, so we cannot guarantee absolute security."] },
          { h: "Children", p: ["This website is not directed at children and we do not knowingly collect their personal information."] },
          { h: "Changes to this policy", p: ["We may update this policy from time to time. The date at the top shows when it was last changed."] },
          { h: "Contact", p: ["Questions about this policy can be sent through the [contact page](/contact)."] },
        ],
      },
    ],
  },
}

export const NOT_FOUND = {
  seo: {
    title: "Page not found | AERIS",
    description: "The page you requested could not be found. Browse AERIS services, resources or request an estimate.",
  },
  hero: {
    title: "This page is off the map.",
    text: "The page you asked for does not exist or has moved. Choose a destination below.",
    ctas: [{ label: "Return to Homepage", to: "/" }, { label: "Contact Engineering Liaison", to: "/contact", variant: "ghost" }],
  },
  sections: [
    {
      type: "cards", layout: "grid", heading: "Suggested destinations",
      items: [
        { title: "Services Directory", text: "Every system and service we offer.", to: "/services", cta: "View infrastructure" },
        { title: "Knowledge Center", text: "Engineering notes and guides.", to: "/resources", cta: "Read research" },
        { title: "Client Reviews", text: "How we earn endorsements.", to: "/about/client-reviews", cta: "Read reports" },
        { title: "Request an Estimate", text: "Start a project with a written scope.", to: "/request-estimate", cta: "Initiate consultation" },
      ],
    },
  ],
}
