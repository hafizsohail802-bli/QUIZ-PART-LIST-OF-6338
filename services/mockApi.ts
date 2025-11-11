import {
  ComponentData,
  ComponentImportData,
  User,
  QuizCategory,
  QuizQuestion,
  QuizImportData,
  StudyMaterial,
  QuizResult,
  QuizResultData,
  QuizOption,
} from '../types';

// --- SEED DATA ---

const SEED_USERS: User[] = [
  // Admins
  { id: 1, name: 'Admin User', email: 'gdusty@advancedmechanix.com', password: '12345678', role: 'admin' },
  { id: 2, name: 'Junaid Admin', email: 'junaid@advancedmechanix.com', password: '87654321', role: 'admin' },
  // Regular Users
  { id: 3, name: 'dusty', email: 'dusty@test.com', password: '1234', role: 'user' },
  { id: 4, name: 'saul', email: 'saul@test.com', password: '1233', role: 'user' },
  { id: 5, name: 'addy', email: 'addy@test.com', password: '1244', role: 'user' },
  { id: 6, name: 'shaz', email: 'shaz@test.com', password: '1212', role: 'user' },
  { id: 7, name: 'Shahid', email: 'shahid@test.com', password: '1231', role: 'user' },
  { id: 8, name: 'mir max', email: 'mirmax@test.com', password: '1243', role: 'user' },
  { id: 9, name: 'Fahad', email: 'fahad@test.com', password: '8989', role: 'user' },
  { id: 10, name: 'haris', email: 'haris@test.com', password: '7894', role: 'user' },
  { id: 11, name: 'Rashid', email: 'rashid@test.com', password: '5656', role: 'user' },
  { id: 12, name: 'hazz', email: 'hazz@test.com', password: '8975', role: 'user' },
  { id: 13, name: 'sherry', email: 'sherry@test.com', password: '5623', role: 'user' },
];

const ALL_COMPONENTS_TO_SEED: Omit<ComponentData, 'id' | 'created_at' | 'updated_at'>[] = [
  // MCBs
  {
    item_code: "F1",
    name: "MCB 25A, 2 POLE, 6kA, C",
    part_number: "5SY62257CC + 5ST3010",
    rating: "25A, 2P, 6kA",
    category: "MCB",
    panel: "H01",
    specifications: "25A, 2 Pole, 6kA breaking capacity, C-Curve tripping characteristic",
    technical_specs: "Rated Current: 25A\nPoles: 2\nBreaking Capacity: 6kA\nVoltage: 230/400V AC\nTrip Curve: C (5-10x In)\nOperating Temperature: -25°C to +55°C\nStandards: IEC 60898-1, IS 8828\nMounting: 35mm DIN rail\nTerminal Capacity: Up to 25mm²",
    pin_in_details: "Pin 1: Line Input (L) - 230V AC\nPin 2: Neutral Input (N) - 0V",
    pin_out_details: "Pin 3: Line Output to Load\nPin 4: Neutral Output to Load",
    usage_details: "Primary use: Overcurrent protection for lighting and socket circuits in Panel H01\nApplications: Distribution boards, Control panels, Industrial switchgear\nSuitable for: Resistive and inductive loads up to 25A\nProtection: Short circuit and overload protection",
    installation_notes: "1. Mount on 35mm DIN rail in Panel H01\n2. Connect incoming supply to top terminals (L, N)\n3. Connect load to bottom terminals\n4. Ensure proper wire sizing (max 25mm² Cu)\n5. Tightening torque: 2.0 Nm\n6. Label circuit number clearly\n7. Test trip mechanism before commissioning",
    safety_warnings: "⚠️ De-energize circuit before installation or maintenance\n⚠️ Installation by qualified personnel only\n⚠️ Follow NEC/IEC guidelines\n⚠️ Verify voltage rating matches supply\n⚠️ Do not exceed rated current\n⚠️ Check wire terminations are tight",
    manufacturer: "Siemens"
  },
  {
    item_code: "F5",
    name: "MCB 3A, 3 POLE, 10kA, C",
    part_number: "5SY43037CC",
    rating: "3A, 3P, 10kA",
    category: "MCB",
    panel: "H02",
    specifications: "3A, 3 Pole, 10kA breaking capacity, C-Curve tripping",
    technical_specs: "Rated Current: 3A\nPoles: 3\nBreaking Capacity: 10kA\nVoltage: 230/400V AC (3-phase)\nTrip Curve: C (5-10x In)\nOperating Temperature: -25°C to +55°C\nStandards: IEC 60898-1",
    pin_in_details: "Pin 1: Line Input Phase L1 (230V AC)\nPin 2: Line Input Phase L2 (230V AC)\nPin 3: Line Input Phase L3 (230V AC)",
    pin_out_details: "Pin 4: Line Output L1 to Load\nPin 5: Line Output L2 to Load\nPin 6: Line Output L3 to Load",
    usage_details: "Primary use: Three-phase overcurrent protection for control circuits and small motors\nApplications: Motor control circuits, 3-phase distribution, Industrial control panels\nSuitable for: Three-phase loads up to 3A",
    installation_notes: "1. Mount on 35mm DIN rail in Panel H02\n2. Connect three-phase incoming supply to top terminals (L1, L2, L3)\n3. Connect load to bottom terminals\n4. Tightening torque: 2.0 Nm\n5. Ensure proper phase sequence (L1-L2-L3)\n6. Label phase identification",
    safety_warnings: "⚠️ De-energize all three phases before installation\n⚠️ Verify correct phase rotation\n⚠️ Installation by qualified personnel only\n⚠️ Follow local electrical codes\n⚠️ Do not exceed 3A per phase",
    manufacturer: "Siemens"
  },
  {
    item_code: "F6",
    name: "MCB 1A, 3 POLE, 10kA, C",
    part_number: "5SY43017CC",
    rating: "1A, 3P, 10kA",
    category: "MCB",
    panel: "H02",
    specifications: "1A, 3 Pole, 10kA breaking capacity, C-Curve",
    technical_specs: "Rated Current: 1A\nPoles: 3\nBreaking Capacity: 10kA\nVoltage: 230/400V AC\nTrip Curve: C",
    pin_in_details: "Pin 1-3: Line Inputs L1, L2, L3 (3-phase)",
    pin_out_details: "Pin 4-6: Line Outputs to Load (3-phase)",
    usage_details: "Very low current three-phase protection\nApplications: Control circuits, instrumentation power, low-power 3-phase equipment\nSuitable for: Sensitive control loads up to 1A",
    installation_notes: "1. Mount on DIN rail in Panel H02\n2. Connect 3-phase supply\n3. Do not overload - max 1A per phase\n4. Torque: 2.0 Nm",
    safety_warnings: "⚠️ De-energize before installation\n⚠️ Not suitable for high-current applications\n⚠️ Check load current does not exceed 1A",
    manufacturer: "Siemens"
  },
  {
    item_code: "F9",
    name: "MCB 6A, 1 POLE, 6kA, C",
    part_number: "5SY61067CC",
    rating: "6A, 1P, 6kA",
    category: "MCB",
    panel: "H03",
    specifications: "6A, 1 Pole, 6kA breaking capacity, C-Curve",
    technical_specs: "Rated Current: 6A\nPoles: 1\nBreaking Capacity: 6kA\nVoltage: 230V AC\nTrip Curve: C",
    pin_in_details: "Pin 1: Line Input (L) - 230V AC",
    pin_out_details: "Pin 2: Line Output to Load",
    usage_details: "Single phase protection for small loads\nApplications: Panel lighting, small control circuits, auxiliary supplies\nSuitable for: Single-phase loads up to 6A",
    installation_notes: "1. Mount on DIN rail in Panel H03\n2. Connect line input to top terminal\n3. Connect load to bottom terminal\n4. Ensure proper neutral connection separately",
    safety_warnings: "⚠️ Single phase only - not for 3-phase circuits\n⚠️ De-energize before installation\n⚠️ Verify load current",
    manufacturer: "Siemens"
  },
  {
    item_code: "F10",
    name: "MCB 10A, 2 POLE, 6kA, C",
    part_number: "5SY62107CC + 5ST3010",
    rating: "10A, 2P, 6kA",
    category: "MCB",
    panel: "H03",
    specifications: "10A, 2 Pole, 6kA breaking capacity, C-Curve",
    technical_specs: "Rated Current: 10A\nPoles: 2\nBreaking Capacity: 6kA\nVoltage: 230/400V AC",
    pin_in_details: "Pin 1: Line Input (L)\nPin 2: Neutral Input (N)",
    pin_out_details: "Pin 3: Line Output to Load\nPin 4: Neutral Output to Load",
    usage_details: "Medium current 2-pole protection\nApplications: Socket outlets, lighting circuits, control power\nSuitable for: General purpose loads up to 10A",
    installation_notes: "1. Mount on DIN rail in Panel H03\n2. Connect L and N to top terminals\n3. Connect load to bottom terminals\n4. Standard DIN rail mounting",
    safety_warnings: "⚠️ Check load current before installation\n⚠️ Proper wire sizing required\n⚠️ De-energize first",
    manufacturer: "Siemens"
  },
  {
    item_code: "F11",
    name: "MCB 6A, 2 POLE, 6kA, C",
    part_number: "5SY62067CC + 5ST3010",
    rating: "6A, 2P, 6kA",
    category: "MCB",
    panel: "H03",
    specifications: "6A, 2 Pole, 6kA breaking capacity, C-Curve",
    technical_specs: "Rated Current: 6A\nPoles: 2\nBreaking Capacity: 6kA\nVoltage: 230/400V AC",
    pin_in_details: "Pin 1-2: Line and Neutral Inputs",
    pin_out_details: "Pin 3-4: Line and Neutral Outputs",
    usage_details: "Low current 2-pole protection for control circuits\nApplications: Control power, small loads, instrumentation\nSuitable for: Loads up to 6A",
    installation_notes: "1. Mount on DIN rail\n2. Connect supply and load properly\n3. Proper sizing essential",
    safety_warnings: "⚠️ Do not exceed 6A rating\n⚠️ Proper wire termination\n⚠️ Follow standards",
    manufacturer: "Siemens"
  },
  {
    item_code: "F22",
    name: "MCB 6A, 2 POLE, 6kA, C",
    part_number: "5SY62067CC + 5ST3010",
    rating: "6A, 2P, 6kA",
    category: "MCB",
    panel: "H02",
    specifications: "6A, 2 Pole, 6kA breaking capacity, C-Curve",
    technical_specs: "Rated Current: 6A\nPoles: 2\nBreaking Capacity: 6kA\nVoltage: 230/400V AC",
    pin_in_details: "Pin 1-2: Line and Neutral Inputs",
    pin_out_details: "Pin 3-4: Line and Neutral Outputs",
    usage_details: "Control circuit protection in Panel H02",
    installation_notes: "Standard DIN rail mount",
    safety_warnings: "⚠️ De-energize before work",
    manufacturer: "Siemens"
  },
  {
    item_code: "F23",
    name: "MCB 6A, 2 POLE, 6kA, C",
    part_number: "5SY62067CC",
    rating: "6A, 2P, 6kA",
    category: "MCB",
    panel: "H02",
    specifications: "6A, 2 Pole, 6kA breaking capacity",
    technical_specs: "Rated Current: 6A\nPoles: 2\nBreaking Capacity: 6kA",
    pin_in_details: "Pin 1-2: Inputs",
    pin_out_details: "Pin 3-4: Outputs",
    usage_details: "Protection for auxiliary circuits",
    installation_notes: "DIN rail mounting",
    safety_warnings: "⚠️ Follow safety procedures",
    manufacturer: "Siemens"
  },
  {
    item_code: "F20",
    name: "MCB 16A, 2 POLE, 6kA, C",
    part_number: "5SY62167CC + 5ST3010",
    rating: "16A, 2P, 6kA",
    category: "MCB",
    panel: "H01",
    specifications: "16A, 2 Pole, 6kA breaking capacity, C-Curve",
    technical_specs: "Rated Current: 16A\nPoles: 2\nBreaking Capacity: 6kA\nVoltage: 230/400V AC\nTrip Curve: C",
    pin_in_details: "Pin 1-2: Line and Neutral Inputs",
    pin_out_details: "Pin 3-4: Line and Neutral Outputs",
    usage_details: "General purpose protection for medium loads\nApplications: Socket circuits, mixed loads\nSuitable for: Loads up to 16A",
    installation_notes: "1. Mount on DIN rail in Panel H01\n2. Standard installation procedure\n3. Proper wire sizing for 16A",
    safety_warnings: "⚠️ Follow electrical standards\n⚠️ De-energize before installation\n⚠️ Check load compatibility",
    manufacturer: "Siemens"
  },
  {
    item_code: "F90",
    name: "MCB 2A, 1 POLE, 6kA, C",
    part_number: "5SY61027CC",
    rating: "2A, 1P, 6kA",
    category: "MCB",
    panel: "All",
    specifications: "2A, 1 Pole, 6kA breaking capacity, C-Curve",
    technical_specs: "Rated Current: 2A\nPoles: 1\nBreaking Capacity: 6kA\nVoltage: 230V AC",
    pin_in_details: "Pin 1: Line Input (L)",
    pin_out_details: "Pin 2: Line Output",
    usage_details: "Very low current single-phase protection\nApplications: Instrumentation, control circuits, indicator lamps\nSuitable for: Small loads up to 2A",
    installation_notes: "Mount on DIN rail, ensure proper sizing",
    safety_warnings: "⚠️ Not for high current applications",
    manufacturer: "Siemens"
  },

  // Relays
  {
    item_code: "K1",
    name: "Protection Fault Interposing Relay",
    part_number: "3RH2122-1BB40",
    rating: "24VDC, 4 Pole, 10A, 2NO+2NC",
    category: "Relay",
    panel: "H01",
    specifications: "24VDC coil voltage, 4 pole contact, 10A switching capability, 2NO+2NC configuration",
    technical_specs: "Coil Voltage: 24VDC\nCoil Power: 2W\nContact Configuration: 2 Normally Open (NO) + 2 Normally Closed (NC)\nContact Rating: 10A @ 250VAC / 10A @ 30VDC\nOperating Time: <10ms\nRelease Time: <10ms\nMechanical Life: 10 million operations\nElectrical Life: 100,000 operations @ rated load\nOperating Temperature: -25°C to +60°C\nMounting: DIN rail or screw mounting",
    pin_in_details: "A1: Coil positive terminal (+24VDC)\nA2: Coil negative terminal (0V / Ground)\nCoil polarity must be observed for DC operation",
    pin_out_details: "Contacts 11-12, 13-14: Normally Open (NO) contacts - Close when coil is energized\nContacts 21-22, 23-24: Normally Closed (NC) contacts - Open when coil is energized\nCOM terminals: Common connection points for each contact pair",
    usage_details: "Protection interlocking and fault signaling\nApplications: Protection relay trip circuits, fault indication, alarm systems\nInterlock function: Ensures safe equipment operation sequences\nTypical use: Connects protection relay (EPR01) trip outputs to circuit breaker trip coil",
    installation_notes: "1. Wire coil terminals (A1, A2) to 24VDC control supply\n2. Observe coil polarity (+ to A1, - to A2)\n3. Connect NO/NC contacts as per control logic\n4. Use suppression diode across coil for DC circuits\n5. Label all terminals clearly\n6. Mount in Panel H01 control section\n7. Test operation before commissioning",
    safety_warnings: "⚠️ Verify coil voltage is 24VDC before connection\n⚠️ Check contact rating matches load current\n⚠️ Use proper wire gauge for 10A contacts\n⚠️ Install coil suppression for inductive loads\n⚠️ Do not exceed contact voltage/current ratings\n⚠️ Regular inspection and maintenance required",
    manufacturer: "Siemens"
  },
  {
    item_code: "K5A",
    name: "Fortress Solenoid Interlock",
    part_number: "-",
    rating: "Interposing Relay",
    category: "Interlock",
    panel: "H01",
    specifications: "Fortress electromechanical safety interlock, solenoid-operated",
    technical_specs: "Type: Solenoid Safety Interlock\nFunction: Electromechanical door interlock\nSafety Category: Up to SIL 3 / PLe\nOperating Voltage: 24VDC (typical)\nMechanical Lock Force: High security\nKey Exchange System: Trapped key interlock",
    pin_in_details: "Solenoid coil terminals: 24VDC supply\nPosition sensing switch inputs",
    pin_out_details: "Safety contacts: Forced-guided contacts for door position\nStatus indication outputs: Door open/closed signals",
    usage_details: "Safety interlocking for panel access doors\nApplications: Door position monitoring, trapped key systems, personnel safety\nPrevents: Access to energized equipment, simultaneous door opening\nSafety function: Ensures equipment is de-energized before door access",
    installation_notes: "1. Follow manufacturer's safety installation guidelines\n2. Mount mechanically secure\n3. Wire to safety PLC or relay\n4. Test lock/unlock operation\n5. Follow AS/NZS 60204.1 safety standards",
    safety_warnings: "⚠️ SAFETY CRITICAL COMPONENT - No bypassing allowed\n⚠️ Must be installed by competent person\n⚠️ Regular inspection mandatory\n⚠️ Part of safety system - do not modify\n⚠️ Follow lockout/tagout procedures",
    manufacturer: "Fortress"
  },
  {
    item_code: "K7",
    name: "Contactor Relay",
    part_number: "3RT2916-1DG00 / 3RH2140-1BB40",
    rating: "24VDC, 4NO+4NC",
    category: "Relay",
    panel: "H02",
    specifications: "24VDC coil, 8 pole configuration (4NO+4NC), 10A switching",
    technical_specs: "Coil Voltage: 24VDC\nContact Configuration: 4 NO + 4 NC (8 poles total)\nContact Rating: 10A @ 250VAC\nCoil Power: ~2.5W",
    pin_in_details: "A1: Coil positive (+24VDC)\nA2: Coil negative (0V)",
    pin_out_details: "Multiple NO (Normally Open) contacts: 11-14 series\nMultiple NC (Normally Closed) contacts: 21-24 series\n8 independent contact pairs available",
    usage_details: "Motor control and load switching\nApplications: Control of multiple circuits, complex interlocking\nSuitable for: Multi-point switching requirements",
    installation_notes: "1. Wire coil to 24VDC supply with proper polarity\n2. Connect contacts according to control logic\n3. Use appropriate wire gauge\n4. Mount in Panel H02",
    safety_warnings: "⚠️ Check contact capacity for each load\n⚠️ Coil voltage is critical - verify 24VDC\n⚠️ Proper terminal tightening",
    manufacturer: "Siemens"
  },
  {
    item_code: "K9",
    name: "Contactor Relay",
    part_number: "3RH2140-1BB40",
    rating: "24VDC, 4NO+4NC",
    category: "Relay",
    panel: "H02",
    specifications: "24VDC coil, 8 pole auxiliary relay",
    technical_specs: "Coil: 24VDC\nPoles: 8 (4NO + 4NC)\nContact Rating: 10A @ 250VAC",
    pin_in_details: "Coil: A1 (+24V), A2 (0V)",
    pin_out_details: "Contacts: Various NO and NC configurations",
    usage_details: "General purpose control relay\nApplications: Control circuits, interlocking, signaling",
    installation_notes: "Standard relay wiring\nMount in appropriate location in H02",
    safety_warnings: "⚠️ Verify coil voltage\n⚠️ Check contact ratings",
    manufacturer: "Siemens"
  },
  {
    item_code: "K10",
    name: "SF6 Gas Pressure Low Relay",
    part_number: "3RH2140-1BB40",
    rating: "24VDC, 4NO+4NC",
    category: "Relay",
    panel: "H01",
    specifications: "24VDC coil for SF6 gas pressure monitoring function",
    technical_specs: "Coil Voltage: 24VDC\nFunction: SF6 gas pressure low alarm\nContact Configuration: 4NO + 4NC\nPressure Monitoring: Triggered by external pressure sensor",
    pin_in_details: "A1-A2: Coil terminals (24VDC)\nPressure sensor input: Connects to SF6 pressure monitoring circuit",
    pin_out_details: "Alarm contacts: NO/NC contacts for alarm annunciation\nTrip contacts: For circuit breaker lockout if pressure too low",
    usage_details: "SF6 gas pressure monitoring in circuit breaker\nApplications: Circuit breaker gas monitoring, preventive maintenance alarm\nCritical safety function: Prevents breaker operation if gas pressure insufficient\nMonitors: SF6 gas density/pressure in sealed circuit breaker",
    installation_notes: "1. Connect to SF6 pressure sensor output\n2. Wire alarm contacts to SCADA/annunciation\n3. Set pressure thresholds per breaker specifications\n4. Test alarm function during commissioning",
    safety_warnings: "⚠️ Critical safety function - regular monitoring required\n⚠️ Low SF6 pressure indicates potential failure\n⚠️ Do not bypass alarm function\n⚠️ Maintain SF6 pressure per manufacturer specs",
    manufacturer: "Siemens"
  },
  {
    item_code: "K101",
    name: "SF6 Gas Pressure Low Relay",
    part_number: "3RH2140-1BB40",
    rating: "24VDC, 4NO+4NC",
    category: "Relay",
    panel: "H02",
    specifications: "24VDC SF6 pressure monitoring relay",
    technical_specs: "Coil: 24VDC\nFunction: Gas pressure monitoring\nContacts: 4NO + 4NC",
    pin_in_details: "Coil inputs from pressure sensor circuit",
    pin_out_details: "Alarm outputs and trip contacts",
    usage_details: "Gas pressure monitoring for Panel H02 circuit breaker",
    installation_notes: "Connect to pressure sensor\nWire alarms appropriately",
    safety_warnings: "⚠️ Monitor SF6 pressure regularly\n⚠️ Critical for breaker operation",
    manufacturer: "Siemens"
  },
  {
    item_code: "K105",
    name: "Mode Selector Relay",
    part_number: "3RH2140-1BB40",
    rating: "24VDC, 4NO+4NC",
    category: "Relay",
    panel: "H03",
    specifications: "Mode selection control relay, 24VDC coil",
    technical_specs: "Coil: 24VDC\nContacts: 8 poles (4NO+4NC)\nFunction: Operating mode selection",
    pin_in_details: "Control inputs from mode selector switches",
    pin_out_details: "Mode-dependent contact outputs",
    usage_details: "Operating mode selection (Local/Remote/Auto)\nApplications: Mode switching, control mode selection\nSelects: Different operating modes for equipment",
    installation_notes: "Wire per control mode logic\nConnect to mode selector switches",
    safety_warnings: "⚠️ Verify mode selection states\n⚠️ Proper mode indication required",
    manufacturer: "Siemens"
  },
  {
    item_code: "KBE",
    name: "No Voltage Present Relay (Cable Side)",
    part_number: "3RH2131-1BB40",
    rating: "24VDC, 3NO+1NC",
    category: "Relay",
    panel: "H03",
    specifications: "Voltage sensing relay, 24VDC coil, 3NO+1NC contacts",
    technical_specs: "Coil Voltage: 24VDC\nContact Configuration: 3 NO + 1 NC\nFunction: Voltage presence detection on cable side\nSensing: Monitors for absence of voltage",
    pin_in_details: "Voltage sensing input: Connects to monitored circuit through voltage transformer/sensor\nCoil: A1-A2 (24VDC)",
    pin_out_details: "Contact outputs: Indicate voltage present/absent condition\n3 NO contacts: Close when no voltage detected\n1 NC contact: Opens when no voltage detected",
    usage_details: "Voltage monitoring and detection on cable side\nApplications: Ensures circuit is de-energized before earthing, safety interlocking\nSafety function: Prevents earthing or access while voltage present\nMonitors: Cable side voltage to confirm de-energization",
    installation_notes: "1. Connect to monitored circuit via appropriate voltage sensing\n2. Set voltage threshold per requirements\n3. Wire contacts to safety interlock system\n4. Test detection function thoroughly",
    safety_warnings: "⚠️ Set proper voltage thresholds\n⚠️ Critical for safety - regular testing required\n⚠️ Do not bypass safety interlocks\n⚠️ Confirm proper sensing before earthing operations",
    manufacturer: "Siemens"
  },

  // Switches
  {
    item_code: "S1",
    name: "Circuit Breaker Open/Close Switch",
    part_number: "-",
    rating: "Spring Charged Switch",
    category: "Switch",
    panel: "H01",
    specifications: "Spring-operated circuit breaker control switch with open/close functions",
    technical_specs: "Type: Spring Return Switch\nOperating Mechanism: Manual spring charged\nPositions: Close / Open with spring return\nContact Rating: Control circuit (low voltage)\nMounting: Panel mounted",
    pin_in_details: "Operating handle input: Mechanical linkage to CB mechanism\nControl circuit inputs: Close coil and trip coil connections",
    pin_out_details: "Contact positions: Momentary close contact, Trip contact\nSpring return: Returns to neutral after operation",
    usage_details: "Manual control of circuit breaker open/close operations\nApplications: Local CB control, spring charging mechanism control\nFunctions: Close command (spring charged), Open command (trip)",
    installation_notes: "1. Mount securely on panel door with proper clearance\n2. Connect to CB control circuit (close coil, trip coil)\n3. Ensure spring mechanism operates smoothly\n4. Check mechanical alignment\n5. Label OPEN and CLOSE positions clearly",
    safety_warnings: "⚠️ Check spring tension before operation\n⚠️ Ensure proper mechanical linkage\n⚠️ Verify CB spring charged before close operation\n⚠️ Follow operating procedures",
    manufacturer: "Various"
  },
  {
    item_code: "S4",
    name: "Spring Charged Indicator",
    part_number: "-",
    rating: "Three Position",
    category: "Switch",
    panel: "H01",
    specifications: "Three-position spring charge status indicator",
    technical_specs: "Type: Three-position mechanical indicator\nPositions: Not Charged / Partially Charged / Fully Charged\nFunction: Visual indication of CB spring status\nOperation: Mechanical linkage to spring charging mechanism",
    pin_in_details: "Mechanical linkage from spring charging motor",
    pin_out_details: "Position indication: Visual/mechanical position indicators",
    usage_details: "Spring charge status indication for circuit breaker\nApplications: Visual feedback of CB spring charge state\nIndicates: Whether CB is ready to close (spring charged)",
    installation_notes: "1. Mechanical linkage to spring charging mechanism\n2. Proper alignment required\n3. Visual position indicators must be clear",
    safety_warnings: "⚠️ Ensure mechanical alignment\n⚠️ Do not attempt close operation if not charged\n⚠️ Regular inspection of mechanism",
    manufacturer: "Various"
  },
  {
    item_code: "S10",
    name: "Selector Switch",
    part_number: "-",
    rating: "Selector Switch",
    category: "Switch",
    panel: "H02",
    specifications: "Multi-position selector switch for mode or function selection",
    technical_specs: "Type: Rotary selector switch\nPositions: Multiple positions (2-3 typical)\nContact Type: Maintained position\nMounting: Panel cutout",
    pin_in_details: "Central shaft rotation input",
    pin_out_details: "Contact positions corresponding to selector positions",
    usage_details: "Mode selection and position switching\nApplications: Local/Remote selection, Auto/Manual mode\nFunctions: Selects different operating modes or control states",
    installation_notes: "1. Mount in panel with proper cutout\n2. Secure mounting to prevent rotation\n3. Wire contacts per control logic\n4. Label positions clearly",
    safety_warnings: "⚠️ Verify contact switching with position\n⚠️ Proper torque on mounting\n⚠️ Check contact ratings",
    manufacturer: "Various"
  },
  {
    item_code: "S80",
    name: "Door Limit Position Switch",
    part_number: "-",
    rating: "Position Switch",
    category: "Switch",
    panel: "H03",
    specifications: "Door position monitoring limit switch",
    technical_specs: "Type: Limit switch for door position\nContact Operation: Actuated by door mechanism\nFunction: Door open/closed detection\nContact Type: SPDT or DPDT",
    pin_in_details: "Actuator input: Mechanical actuator from door",
    pin_out_details: "Position contacts: NO/NC contacts for door status",
    usage_details: "Door status monitoring and safety interlocking\nApplications: Panel door position detection, safety interlock systems\nSafety function: Detects if panel door is open or closed\nInterlocks: Prevents energization when door open (if in safety circuit)",
    installation_notes: "1. Mount on door frame with proper alignment\n2. Adjust actuator for reliable detection\n3. Wire to safety interlock circuit\n4. Test open/closed detection thoroughly",
    safety_warnings: "⚠️ Proper mechanical alignment critical\n⚠️ Part of safety system - do not bypass\n⚠️ Regular inspection required\n⚠️ Ensure reliable actuation",
    manufacturer: "Various"
  },
  {
    item_code: "S101",
    name: "Selector Switch",
    part_number: "D7P-SB32",
    rating: "3 Position SR LR",
    category: "Switch",
    panel: "H01",
    specifications: "Plastic 3-position selector switch, SR (Spring Return) / LR (Latching), White, 22.5mm mounting",
    technical_specs: "Mounting Diameter: 22.5mm\nMaterial: Plastic construction\nPositions: 3 position (typically: 0-I-II or similar)\nOperation: Spring return or latching\nColor: White\nContact Configuration: DPDT typical\nVoltage Rating: 250VAC\nCurrent Rating: 6A",
    pin_in_details: "Rotary shaft input: Manual rotation to select position",
    pin_out_details: "Contact outputs: 3 position contacts (0, I, II)\nContact arrangement: Depends on specific configuration (e.g., 2NO+2NC)",
    usage_details: "Control mode selection for Panel H01\nApplications: Local/Off/Remote selection, Manual/Off/Auto modes\nTypical uses: Operating mode selection, control source selection",
    installation_notes: "1. Cut 22.5mm hole in panel\n2. Insert switch from front\n3. Secure with retaining nut from rear\n4. Wire contacts per control logic\n5. Proper torque on retaining nut\n6. Label position meanings clearly (e.g., Local-Off-Remote)",
    safety_warnings: "⚠️ Verify contact ratings match application\n⚠️ Proper panel cutout size (22.5mm)\n⚠️ Secure mounting to prevent loosening\n⚠️ Test position switching",
    manufacturer: "ABB (Sprecher+Schuh)"
  },
  {
    item_code: "S102",
    name: "Selector Switch",
    part_number: "D7P-SB32",
    rating: "3 Position SR LR",
    category: "Switch",
    panel: "H01",
    specifications: "3-position selector switch, 22.5mm, white plastic",
    technical_specs: "Mounting Diameter: 22.5mm\nMaterial: Plastic construction\nPositions: 3 position (typically: 0-I-II or similar)\nOperation: Spring return or latching\nColor: White\nContact Configuration: DPDT typical\nVoltage Rating: 250VAC\nCurrent Rating: 6A",
    pin_in_details: "Rotary input",
    pin_out_details: "3-position contacts",
    usage_details: "Mode control selection",
    installation_notes: "Standard 22.5mm panel mount",
    safety_warnings: "⚠️ Verify position function\n⚠️ Check contact ratings",
    manufacturer: "ABB"
  },
  {
    item_code: "S103",
    name: "Selector Switch",
    part_number: "D7P-SB32",
    rating: "3 Position SR LR",
    category: "Switch",
    panel: "H01",
    specifications: "3-position selector, 22.5mm mounting",
    technical_specs: "Mounting Diameter: 22.5mm\nMaterial: Plastic construction\nPositions: 3 position (typically: 0-I-II or similar)\nOperation: Spring return or latching\nColor: White\nContact Configuration: DPDT typical\nVoltage Rating: 250VAC\nCurrent Rating: 6A",
    pin_in_details: "Rotary position selection",
    pin_out_details: "Position-dependent contacts",
    usage_details: "Control selection",
    installation_notes: "Panel mount, proper hole sizing",
    safety_warnings: "⚠️ Secure mounting\n⚠️ Contact verification",
    manufacturer: "ABB"
  },
  {
    item_code: "S104",
    name: "Selector Switch",
    part_number: "D7P-SB32",
    rating: "3 Position SR LR",
    category: "Switch",
    panel: "H01",
    specifications: "3-position selector switch",
    technical_specs: "22.5mm panel mount, plastic, white",
    pin_in_details: "Manual rotation",
    pin_out_details: "3-position outputs",
    usage_details: "Selection control",
    installation_notes: "Standard installation",
    safety_warnings: "⚠️ Test operation",
    manufacturer: "ABB"
  },
  {
    item_code: "S201",
    name: "Selector Switch",
    part_number: "D7P-SB32",
    rating: "3 Position SR LR",
    category: "Switch",
    panel: "H02",
    specifications: "3-position selector, 22.5mm, white",
    technical_specs: "Mounting Diameter: 22.5mm\nMaterial: Plastic construction\nPositions: 3 position (typically: 0-I-II or similar)\nOperation: Spring return or latching\nColor: White\nContact Configuration: DPDT typical\nVoltage Rating: 250VAC\nCurrent Rating: 6A",
    pin_in_details: "Rotary input",
    pin_out_details: "3-position contacts",
    usage_details: "Panel H02 mode selection",
    installation_notes: "22.5mm panel cutout",
    safety_warnings: "⚠️ Verify function",
    manufacturer: "ABB"
  },
  {
    item_code: "S202",
    name: "Selector Switch",
    part_number: "D7P-SB32",
    rating: "3 Position SR LR",
    category: "Switch",
    panel: "H02",
    specifications: "3-position selector switch",
    technical_specs: "Standard 22.5mm mount",
    pin_in_details: "Position selection",
    pin_out_details: "Contact outputs",
    usage_details: "Control mode selection",
    installation_notes: "Panel mount",
    safety_warnings: "⚠️ Check operation",
    manufacturer: "ABB"
  },
  {
    item_code: "S203",
    name: "Selector Switch",
    part_number: "D7P-SB32",
    rating: "3 Position SR LR",
    category: "Switch",
    panel: "H02",
    specifications: "Selector switch, 3-position",
    technical_specs: "22.5mm mounting",
    pin_in_details: "Rotary",
    pin_out_details: "Contacts",
    usage_details: "Mode selection",
    installation_notes: "Standard mount",
    safety_warnings: "⚠️ Test positions",
    manufacturer: "ABB"
  },
  {
    item_code: "S204",
    name: "Selector Switch",
    part_number: "D7P-SB32",
    rating: "3 Position SR LR",
    category: "Switch",
    panel: "H02",
    specifications: "3-position switch",
    technical_specs: "Panel mount, 22.5mm",
    pin_in_details: "Manual rotation",
    pin_out_details: "Position outputs",
    usage_details: "Control selection",
    installation_notes: "Panel cutout 22.5mm",
    safety_warnings: "⚠️ Verify alignment",
    manufacturer: "ABB"
  },
  {
    item_code: "S301",
    name: "Selector Switch",
    part_number: "D7P-SB32",
    rating: "3 Position SR LR",
    category: "Switch",
    panel: "H03",
    specifications: "3-position selector, Panel H03",
    technical_specs: "22.5mm mount, plastic, white",
    pin_in_details: "Position input",
    pin_out_details: "3-way contacts",
    usage_details: "Mode selection H03",
    installation_notes: "Panel installation",
    safety_warnings: "⚠️ Function test",
    manufacturer: "ABB"
  },
  {
    item_code: "S302",
    name: "Selector Switch",
    part_number: "D7P-SB32",
    rating: "3 Position SR LR",
    category: "Switch",
    panel: "H03",
    specifications: "Standard 3-position selector",
    technical_specs: "22.5mm, white",
    pin_in_details: "Rotary",
    pin_out_details: "Contacts",
    usage_details: "Selection control",
    installation_notes: "Cut 22.5mm hole",
    safety_warnings: "⚠️ Secure mounting",
    manufacturer: "ABB"
  },
  {
    item_code: "S303",
    name: "Selector Switch",
    part_number: "D7P-SB32",
    rating: "3 Position SR LR",
    category: "Switch",
    panel: "H03",
    specifications: "Selector control switch",
    technical_specs: "Panel mount selector",
    pin_in_details: "Manual operation",
    pin_out_details: "Position outputs",
    usage_details: "Control mode selection",
    installation_notes: "Proper installation",
    safety_warnings: "⚠️ Verify ratings",
    manufacturer: "ABB"
  },
  {
    item_code: "S304",
    name: "Selector Switch",
    part_number: "D7P-SB32",
    rating: "3 Position SR LR",
    category: "Switch",
    panel: "H03",
    specifications: "3-position selector",
    technical_specs: "22.5mm panel mounting",
    pin_in_details: "Rotation input",
    pin_out_details: "Contact positions",
    usage_details: "Mode selection",
    installation_notes: "Panel mounting",
    safety_warnings: "⚠️ Test operation",
    manufacturer: "ABB"
  },

  // Indicator Lamps
  {
    item_code: "H101",
    name: "GCB Open Indicator",
    part_number: "D7P-LF3PN3GX10, D7-X10",
    rating: "Green LED",
    category: "Indicator Lamp",
    panel: "H01",
    specifications: "Green LED indication for GCB (Gas Circuit Breaker) open status",
    technical_specs: "LED Color: Green\nVoltage: 24VDC\nCurrent: ~20mA typical\nMounting: 22mm panel hole\nIP Rating: IP65 (front panel)\nLifespan: 50,000+ hours\nViewing Angle: Wide angle\nBrightness: High intensity LED",
    pin_in_details: "Positive terminal: +24VDC supply\nNegative terminal: 0V (Ground/Common)\nPolarity: Must be observed for DC LED",
    pin_out_details: "N/A (LED output is visual indication only)\nNo switched outputs - pure indicator function",
    usage_details: "GCB (Gas Circuit Breaker) open status indication\nApplications: Visual feedback that main circuit breaker is in open position\nGreen = Open/De-energized (safe condition)\nTypical logic: Illuminates when CB auxiliary contact indicates open",
    installation_notes: "1. Cut 22mm diameter hole in panel\n2. Insert indicator from front\n3. Secure with retaining ring from rear\n4. Connect to 24VDC supply with correct polarity (+/-)\n5. Wire through CB auxiliary contact (normally closed, opens when CB closes)\n6. Test illumination with CB in open position\n7. Label clearly as 'GCB OPEN'",
    safety_warnings: "⚠️ Observe polarity - reverse connection damages LED\n⚠️ Do not exceed 24VDC voltage rating\n⚠️ LED lifespan: ~50,000 hours typical\n⚠️ Indicator failure does not mean CB is closed - always verify\n⚠️ Not a safety device - use for indication only",
    manufacturer: "ABB (Sprecher+Schuh)"
  },
  {
    item_code: "H102",
    name: "GCB Closed Indicator",
    part_number: "D7P-P0PN3AXD7, D7-X10",
    rating: "Red LED",
    category: "Indicator Lamp",
    panel: "H01",
    specifications: "Red LED indication for GCB closed/energized status",
    technical_specs: "LED Color: Red\nVoltage: 24VDC\nMounting: 22mm\nIP Rating: IP65",
    pin_in_details: "Power supply: +24VDC, 0V",
    pin_out_details: "Visual LED output",
    usage_details: "GCB closed status indication\nRed = Closed/Energized (caution - live)\nIndicates main CB is closed and circuit energized",
    installation_notes: "1. 22mm panel hole\n2. Connect to 24VDC with polarity\n3. Wire through CB auxiliary contact (normally open, closes when CB closes)\n4. Label 'GCB CLOSED'",
    safety_warnings: "⚠️ Check polarity\n⚠️ Red indicates energized - exercise caution\n⚠️ Verify CB status independently",
    manufacturer: "ABB"
  },
  {
    item_code: "H103",
    name: "ISOL Open Indicator",
    part_number: "D7P-LF3PN3GX10, D7-X10",
    rating: "Green LED",
    category: "Indicator Lamp",
    panel: "H01",
    specifications: "Green LED for isolator (disconnector) open status",
    technical_specs: "LED: Green, 24VDC, 22mm panel mount",
    pin_in_details: "+24V, GND",
    pin_out_details: "Visual indication",
    usage_details: "Isolator open indication\nGreen = Isolator open (circuit isolated)\nShows disconnector is in open/isolated position",
    installation_notes: "22mm hole, wire to isolator auxiliary contact",
    safety_warnings: "⚠️ Polarity critical\n⚠️ Verify isolation status",
    manufacturer: "ABB"
  },
  {
    item_code: "H104",
    name: "ISOL Closed Indicator",
    part_number: "D7P-P0PN3AXD7, D7-X10",
    rating: "Red LED",
    category: "Indicator Lamp",
    panel: "H01",
    specifications: "Red LED for isolator closed status",
    technical_specs: "LED: Red, 24VDC",
    pin_in_details: "24VDC supply",
    pin_out_details: "LED indication",
    usage_details: "Isolator closed indication\nRed = Isolator closed\nIndicates disconnector is closed",
    installation_notes: "Wire to isolator auxiliary contact",
    safety_warnings: "⚠️ Verify connection",
    manufacturer: "ABB"
  },
  {
    item_code: "H105",
    name: "E/SW Open Indicator",
    part_number: "D7P-LF3PN3GX10, D7-X10",
    rating: "Green LED",
    category: "Indicator Lamp",
    panel: "H01",
    specifications: "Green LED for earth switch open status",
    technical_specs: "LED: Green, 24VDC, 22mm",
    pin_in_details: "24VDC power",
    pin_out_details: "Visual output",
    usage_details: "Earth switch open indication\nGreen = Earth switch open (not grounded)\nShows circuit is not earthed",
    installation_notes: "Connect to earth switch position contacts",
    safety_warnings: "⚠️ Critical for safety\n⚠️ Verify earth status",
    manufacturer: "ABB"
  },
  {
    item_code: "H106",
    name: "E/SW Closed Indicator",
    part_number: "D7P-P0PN3AXD7, D7-X10",
    rating: "Red LED",
    category: "Indicator Lamp",
    panel: "H01",
    specifications: "Red LED for earth switch closed status",
    technical_specs: "LED: Red, 24VDC",
    pin_in_details: "Power supply",
    pin_out_details: "LED output",
    usage_details: "Earth switch closed indication\nRed = Earthed (equipment grounded)\nShows circuit is connected to earth",
    installation_notes: "Wire to E/SW auxiliary contacts",
    safety_warnings: "⚠️ Safety critical\n⚠️ Never close with circuit energized",
    manufacturer: "ABB"
  },
  {
    item_code: "H107",
    name: "Protection Fault K1 Indicator",
    part_number: "D7PP4PN3RXD7, D7-X10",
    rating: "Amber LED",
    category: "Indicator Lamp",
    panel: "H01",
    specifications: "Amber LED for protection relay fault indication",
    technical_specs: "LED Color: Amber (Yellow/Orange)\nVoltage: 24VDC\nMounting: 22mm",
    pin_in_details: "24VDC supply",
    pin_out_details: "Visual amber LED",
    usage_details: "Protection fault K1 alarm indication\nAmber = Fault/Alarm condition\nIndicates protection relay has detected a fault\nConnected to protection relay K1 alarm output",
    installation_notes: "Wire to protection relay alarm contact\nLabel as 'PROTECTION FAULT'",
    safety_warnings: "⚠️ Amber indicates fault - investigate immediately\n⚠️ Critical alarm - do not ignore\n⚠️ May indicate system trip",
    manufacturer: "ABB"
  },
  {
    item_code: "H108",
    name: "Additional Indicator",
    part_number: "D7PP4PN3RXD7, D7-X10",
    rating: "Amber LED",
    category: "Indicator Lamp",
    panel: "H01",
    specifications: "Amber LED for additional alarm/warning indication",
    technical_specs: "LED: Amber, 24VDC, 22mm",
    pin_in_details: "24VDC power",
    pin_out_details: "Visual LED",
    usage_details: "Additional indicator for alarms/warnings\nGeneral purpose amber indication",
    installation_notes: "Connect as required for alarm function",
    safety_warnings: "⚠️ Define function clearly\n⚠️ Label appropriately",
    manufacturer: "ABB"
  },
  {
    item_code: "H301-H307",
    name: "Panel H03 Indicators",
    part_number: "Various (same models as above)",
    rating: "Various (Green/Red/Amber)",
    category: "Indicator Lamp",
    panel: "H03",
    specifications: "Set of 7 indicator lamps for Panel H03 - similar to H101-H108 models",
    technical_specs: "Same LED specifications as H101-H108 series\nVoltage: 24VDC\nMounting: 22mm\nColors: Green (Open), Red (Closed), Amber (Alarms)",
    pin_in_details: "24VDC power supply for each indicator",
    pin_out_details: "Visual LED outputs",
    usage_details: "Panel H03 status indications:\n- Circuit breaker position (open/closed)\n- Isolator position\n- Earth switch position\n- Protection alarms\n- Various status indicators",
    installation_notes: "Install per Panel H03 layout\nLabel each indicator clearly\nWire to appropriate status contacts",
    safety_warnings: "⚠️ Follow same safety guidelines as H101-H108\n⚠️ Polarity critical\n⚠️ Proper labeling essential",
    manufacturer: "ABB (Sprecher+Schuh)"
  },
  
  // CTs
  {
    item_code: "H01-CT1L1",
    name: "Current Transformer 250/1A Metering L1",
    part_number: "-",
    rating: "250/1A, CL 0.5S/FS5",
    category: "Current Transformer",
    panel: "H01",
    specifications: "Phase L1 metering current transformer, 250/1A ratio, Class 0.5S accuracy",
    technical_specs: "Primary Current: 250A\nSecondary Current: 1A\nAccuracy Class: 0.5S / FS5\nBurden: 10VA\nStandard: IEC 61869-2\nInsulation: 33kV class",
    pin_in_details: "P1-P2: Primary terminals (250A busbar passes through)\nInstallation: Busbar passes through CT window",
    pin_out_details: "S1-S2: Secondary terminals (1A output to meter)\nSecondary must NEVER be open-circuited when primary is energized",
    usage_details: "Phase L1 current measurement for energy metering\nApplications: Revenue metering, power monitoring\nConnects to: Power meter (PM01)",
    installation_notes: "1. Mount on primary busbar L1\n2. Observe P1-P2 polarity (current flow direction)\n3. Connect S1-S2 to metering circuits\n4. NEVER open secondary when primary energized\n5. Ground one point of secondary",
    safety_warnings: "⚠️ NEVER open secondary circuit when primary is energized - causes dangerous high voltage\n⚠️ Short S1-S2 before disconnecting from meter\n⚠️ Ground secondary circuit at one point only\n⚠️ High voltage on primary - maintain clearances",
    manufacturer: "Various"
  },
  {
    item_code: "H01-CT1L2",
    name: "Current Transformer 250/1A Metering L2",
    part_number: "-",
    rating: "250/1A, CL 0.5S",
    category: "Current Transformer",
    panel: "H01",
    specifications: "Phase L2 metering CT, 250/1A, Class 0.5S",
    technical_specs: "Primary: 250A, Secondary: 1A, Class 0.5S, 10VA",
    pin_in_details: "P1-P2: Primary busbar",
    pin_out_details: "S1-S2: Secondary to meter",
    usage_details: "Phase L2 metering",
    installation_notes: "Same as H01-CT1L1",
    safety_warnings: "⚠️ Never open secondary",
    manufacturer: "Various"
  },
  {
    item_code: "H01-CT1L3",
    name: "Current Transformer 250/1A Metering L3",
    part_number: "-",
    rating: "250/1A, CL 0.5S",
    category: "Current Transformer",
    panel: "H01",
    specifications: "Phase L3 metering CT",
    technical_specs: "250/1A, Class 0.5S, 10VA",
    pin_in_details: "P1-P2: Primary",
    pin_out_details: "S1-S2: Secondary",
    usage_details: "Phase L3 metering",
    installation_notes: "Standard CT installation",
    safety_warnings: "⚠️ Secondary circuit safety critical",
    manufacturer: "Various"
  },
  {
    item_code: "H01-CT2L1",
    name: "Current Transformer 250/1A Protection L1",
    part_number: "-",
    rating: "250/1A, CL 5P20",
    category: "Current Transformer",
    panel: "H01",
    specifications: "Phase L1 protection CT, 250/1A, Class 5P20",
    technical_specs: "Primary: 250A\nSecondary: 1A\nClass: 5P20 (protection class)\nBurden: 15VA\nAccuracy Limit Factor: 20",
    pin_in_details: "P1-P2: Primary busbar L1",
    pin_out_details: "S1-S2: Secondary to protection relay (EPR01)",
    usage_details: "Phase L1 protection current input\nConnects to: EPR01 protection relay\nFunction: Overcurrent and earth fault protection",
    installation_notes: "Wire to protection relay EPR01\nObserve CT polarity for directional protection",
    safety_warnings: "⚠️ Never open secondary\n⚠️ Short before disconnecting",
    manufacturer: "Various"
  },
  {
    item_code: "H01-CT2L2",
    name: "Current Transformer 250/1A Protection L2",
    part_number: "-",
    rating: "250/1A, CL 5P20",
    category: "Current Transformer",
    panel: "H01",
    specifications: "Phase L2 protection CT",
    technical_specs: "250/1A, Class 5P20, 15VA",
    pin_in_details: "P1-P2: Primary L2",
    pin_out_details: "S1-S2: To EPR01",
    usage_details: "Phase L2 protection",
    installation_notes: "Connect to protection relay",
    safety_warnings: "⚠️ Secondary safety",
    manufacturer: "Various"
  },
  {
    item_code: "H01-CT2L3",
    name: "Current Transformer 250/1A Protection L3",
    part_number: "-",
    rating: "250/1A, CL 5P20",
    category: "Current Transformer",
    panel: "H01",
    specifications: "Phase L3 protection CT",
    technical_specs: "250/1A, 5P20, 15VA",
    pin_in_details: "P1-P2: Primary L3",
    pin_out_details: "S1-S2: To EPR01",
    usage_details: "Phase L3 protection",
    installation_notes: "Protection relay connection",
    safety_warnings: "⚠️ Never open secondary",
    manufacturer: "Various"
  },
  {
    item_code: "H02-CT1L1",
    name: "Current Transformer 200/1A Protection L1",
    part_number: "-",
    rating: "200/1A, 5P20",
    category: "Current Transformer",
    panel: "H02",
    specifications: "Panel H02 protection CT, Phase L1, 200/1A",
    technical_specs: "Primary: 200A, Secondary: 1A, Class 5P20, 15VA",
    pin_in_details: "P1-P2: Primary busbar",
    pin_out_details: "S1-S2: To protection relay",
    usage_details: "Panel H02 feeder protection, Phase L1",
    installation_notes: "Install on H02 busbar, connect to EPR03",
    safety_warnings: "⚠️ Standard CT safety precautions",
    manufacturer: "Various"
  },
  {
    item_code: "H02-CT1L2",
    name: "Current Transformer 200/1A Protection L2",
    part_number: "-",
    rating: "200/1A, 5P20",
    category: "Current Transformer",
    panel: "H02",
    specifications: "H02 protection CT L2",
    technical_specs: "200/1A, 5P20, 15VA",
    pin_in_details: "P1-P2",
    pin_out_details: "S1-S2",
    usage_details: "H02 L2 protection",
    installation_notes: "Connect to EPR03",
    safety_warnings: "⚠️ Never open secondary",
    manufacturer: "Various"
  },
  {
    item_code: "H02-CT1L3",
    name: "Current Transformer 200/1A Protection L3",
    part_number: "-",
    rating: "200/1A, 5P20",
    category: "Current Transformer",
    panel: "H02",
    specifications: "H02 protection CT L3",
    technical_specs: "200/1A, 5P20, 15VA",
    pin_in_details: "P1-P2",
    pin_out_details: "S1-S2",
    usage_details: "H02 L3 protection",
    installation_notes: "Connect to EPR03",
    safety_warnings: "⚠️ Secondary safety",
    manufacturer: "Various"
  },
  {
    item_code: "TF01-CT1L1",
    name: "Current Transformer 4000/1A Transformer Primary L1",
    part_number: "-",
    rating: "4000/1A, 5P10",
    category: "Current Transformer",
    panel: "H02",
    specifications: "8.9MVA Transformer primary winding CT, L1, 4000/1A",
    technical_specs: "Primary: 4000A, Secondary: 1A, Class 5P10, 15VA",
    pin_in_details: "P1-P2: Primary winding L1 (4000A)",
    pin_out_details: "S1-S2: To differential protection relay (EPR02)",
    usage_details: "Transformer differential protection - Primary side L1\nConnects to: EPR02 (SEL-787) differential relay\nFunction: Detects internal transformer faults",
    installation_notes: "Install on transformer primary bushing\nCT polarity critical for differential protection\nWire to EPR02 differential relay",
    safety_warnings: "⚠️ High primary current - 4000A\n⚠️ Never open secondary\n⚠️ Differential protection - polarity essential",
    manufacturer: "Various"
  },
  {
    item_code: "H03-CT1L1",
    name: "Current Transformer 100/1A Protection L1",
    part_number: "-",
    rating: "100/1A, 5P20",
    category: "Current Transformer",
    panel: "H03",
    specifications: "Panel H03 feeder CT, 100/1A",
    technical_specs: "Primary: 100A, Secondary: 1A, 5P20, 7.5VA",
    pin_in_details: "P1-P2: Primary",
    pin_out_details: "S1-S2: To protection",
    usage_details: "H03 400kVA feeder protection L1",
    installation_notes: "Connect to feeder protection relay",
    safety_warnings: "⚠️ CT safety procedures",
    manufacturer: "Various"
  },
  {
    item_code: "H03-CT1L2",
    name: "Current Transformer 100/1A Protection L2",
    part_number: "-",
    rating: "100/1A, 5P20",
    category: "Current Transformer",
    panel: "H03",
    specifications: "H03 CT L2",
    technical_specs: "100/1A, 5P20, 7.5VA",
    pin_in_details: "P1-P2",
    pin_out_details: "S1-S2",
    usage_details: "H03 L2 protection",
    installation_notes: "Feeder protection",
    safety_warnings: "⚠️ Never open",
    manufacturer: "Various"
  },
  {
    item_code: "H03-CT1L3",
    name: "Current Transformer 100/1A Protection L3",
    part_number: "-",
    rating: "100/1A, 5P20",
    category: "Current Transformer",
    panel: "H03",
    specifications: "H03 CT L3",
    technical_specs: "100/1A, 5P20, 7.5VA",
    pin_in_details: "P1-P2",
    pin_out_details: "S1-S2",
    usage_details: "H03 L3 protection",
    installation_notes: "Feeder protection",
    safety_warnings: "⚠️ Safety critical",
    manufacturer: "Various"
  },

  // VT
  {
    item_code: "H01-VT01",
    name: "Voltage Transformer 33kV/110V",
    part_number: "-",
    rating: "33000V/√3:110V/√3, CL 0.5, 3P",
    category: "Voltage Transformer",
    panel: "H01",
    specifications: "3-phase voltage transformer, 33kV primary to 110V secondary, Class 0.5 accuracy",
    technical_specs: "Primary Voltage: 33,000V/√3 (19,052V phase-to-neutral)\nSecondary Voltage: 110V/√3 (63.5V phase-to-neutral)\nRatio: 300:1 approximately\nAccuracy Class: 0.5 (metering accuracy)\nBurden: 10VA per phase\nPhases: 3-phase (3P)\nConnection: Star-star (primary and secondary)\nInsulation Level: 36kV\nFrequency: 50Hz\nStandard: IEC 61869-3",
    pin_in_details: "Primary Terminals (HV side):\nU: Phase L1 primary (33kV/√3)\nV: Phase L2 primary\nW: Phase L3 primary\nN: Primary neutral (grounded)\n⚠️ HIGH VOLTAGE - 33kV line-to-line, 19kV line-to-neutral",
    pin_out_details: "Secondary Terminals (LV side):\nu: Phase L1 secondary (110V/√3 = 63.5V to neutral)\nv: Phase L2 secondary\nw: Phase L3 secondary\nn: Secondary neutral (must be grounded at one point only)\nTypical Output: 110V line-to-line, 63.5V line-to-neutral",
    usage_details: "Voltage measurement and supply for protection/metering\nApplications:\n- Voltage input to protection relays (EPR01, EPR02, EPR03)\n- Voltage input to power meter (PM01)\n- Synchronization circuits\n- Undervoltage/overvoltage detection\n- Phase sequence detection\nProvides: Scaled-down voltage replica of 33kV system for safe measurement",
    installation_notes: "1. HIGH VOLTAGE INSTALLATION - Qualified HV personnel only\n2. Maintain minimum clearances per AS/NZS 7000\n3. Primary connections: U-V-W to 33kV busbars\n4. Ground primary neutral (N) solidly\n5. Secondary connections: u-v-w to meters/relays\n6. Ground secondary neutral (n) at ONE POINT ONLY\n7. Install secondary fuses (typically 2A per phase)\n8. Phase rotation: Ensure U-u, V-v, W-w correspondence\n9. Test secondary voltage before connecting instruments\n10. Verify insulation resistance >1000MΩ @ 1kV",
    safety_warnings: "⚠️ EXTREME DANGER - 33kV PRIMARY VOLTAGE\n⚠️ Installation by authorized HV personnel only\n⚠️ De-energize 33kV system before maintenance\n⚠️ Secondary neutral MUST be grounded (one point only)\n⚠️ Use HV safety clearances and PPE\n⚠️ Do NOT short-circuit secondary (unlike CTs)\n⚠️ Maintain insulation integrity\n⚠️ Follow AS/NZS 7000 HV safety work practices\n⚠️ Arc flash hazard - use appropriate PPE and safety procedures",
    manufacturer: "Various (High Voltage Equipment Manufacturer)"
  },
  
  // Protection Relays
  {
    item_code: "EPR01",
    name: "SEL-751 Feeder Protection Relay - Incomer",
    part_number: "751002BCB4B7781AFF1",
    rating: "Incomer Protection",
    category: "Protection Relay",
    panel: "H01",
    specifications: "SEL-751 microprocessor-based feeder protection relay for incomer protection with functions: 50, 51, 51N, 86, AFD, 50BF",
    technical_specs: "Model: SEL-751 Feeder Protection Relay\nManufacturer: Schweitzer Engineering Laboratories (SEL)\nProtection Functions:\n- 50: Instantaneous Overcurrent\n- 51: Time Overcurrent (TOC)\n- 51N: Earth Fault (Ground Overcurrent)\n- 86: Lockout Relay Function\n- AFD: Arc Flash Detection\n- 50BF: Breaker Failure Protection\nInputs:\n- Current: 1A or 5A nominal (configured for 1A from CTs)\n- Voltage: 110V nominal (from VT)\nOutputs:\n- Trip contacts (to breaker trip coil)\n- Alarm contacts\n- SCADA communication\nCommunication:\n- Ethernet (Modbus TCP, IEC 61850)\n- Serial (Modbus RTU)\nPower Supply: 24-48VDC or 110-240VAC\nDisplay: Color touchscreen, 8 pushbuttons\nSlots: A-E + Z for expansion modules",
    pin_in_details: "Current Inputs:\n- IA, IB, IC: Phase currents from H01-CT2L1, CT2L2, CT2L3 (250/1A CTs)\n- IN: Residual/neutral current for earth fault (51N)\nVoltage Inputs:\n- VA, VB, VC: Phase voltages from H01-VT01 (110V secondary)\n- VN: Neutral voltage\nControl Power:\n- PWR1, PWR2: 24VDC control supply\nCommunication:\n- Ethernet: Port 1A, 1B (RJ45)\n- Serial: RS-485 for Modbus",
    pin_out_details: "Trip Outputs (Slot A - Power Module):\n- OUT101: Main trip output to CB trip coil Y1\n- OUT102: Backup trip / alarm\nAlarm Outputs:\n- Various configurable alarm contacts for SCADA\nStatus LEDs:\n- Enabled, Trip, Instantaneous OC, Phase OC, Ground/Neutral OC, etc.\nAuxiliary Buttons:\n- Target Reset, AUX1-4 (configurable), Lock (enable/trip)\nClose/Trip Indication:\n- Monitors CB status via auxiliary contacts",
    usage_details: "Incomer feeder protection for Panel H01 (main 33kV supply)\nProtection Coordination:\n- 50: Instantaneous trip for high-fault currents (short circuit)\n- 51: Time-delayed overcurrent (overload protection)\n- 51N: Sensitive earth fault detection\n- 86: Lockout function after trip (prevents re-close until reset)\n- AFD: Arc flash detection for personnel safety\n- 50BF: Breaker failure backup (trips upstream if breaker fails to open)\nSettings:\n- CT ratio: 250/1\n- VT ratio: 300:1 (33000/110)\n- Pickup settings, time delays per coordination study\nTrends & Metering:\n- Records current, voltage, power, energy\n- Event recording for fault analysis\n- SOE (Sequence of Events) recording",
    installation_notes: "1. Mount in Panel H01 control section\n2. Wire CT secondaries (H01-CT2L1/2/3) to IA, IB, IC inputs\n3. Wire VT secondary (H01-VT01) to VA, VB, VC inputs\n4. Connect trip output (OUT101) to CB trip coil Y1 through K1 interposing relay\n5. Connect 24VDC control power\n6. Configure settings per protection coordination study:\n   - CT/VT ratios\n   - 50/51/51N pickup and time settings\n   - Communication parameters (IP address, Modbus)\n7. Commission and test:\n   - Primary injection test\n   - Secondary injection test\n   - Trip circuit continuity\n   - Communication to SCADA\n8. Documentation:\n   - Record settings\n   - Event logs\n   - Fault records",
    safety_warnings: "⚠️ Configuration by qualified protection engineer only\n⚠️ Verify CT/VT ratios match actual installation\n⚠️ Test trip circuit thoroughly before energization\n⚠️ Backup settings to PC/USB regularly\n⚠️ Do not modify settings without coordination study\n⚠️ Incorrect settings can cause nuisance trips or failure to protect\n⚠️ Arc flash detection (AFD) is life safety - do not disable\n⚠️ Regular testing and maintenance per manufacturer recommendations",
    manufacturer: "Schweitzer Engineering Laboratories (SEL)"
  },
  {
    item_code: "EPR02",
    name: "SEL-787 Transformer Protection Relay",
    part_number: "07873EE2BCB4B7281A6F1",
    rating: "Transformer Protection",
    category: "Protection Relay",
    panel: "H02",
    specifications: "SEL-787 transformer differential and overall protection relay with functions: 50, 51, 51N, REF, 86, 87T, 50BF",
    technical_specs: "Model: SEL-787 Transformer Protection\nProtection Functions:\n- 87T: Transformer Differential Protection (primary protection)\n- 50/51: Overcurrent protection\n- 51N: Earth fault\n- REF: Restricted Earth Fault\n- 86: Lockout\n- 50BF: Breaker Failure\nTransformer: 8.9MVA, 33kV/415V\nCT Inputs: Primary side (4000/1A) + Secondary side (from TF01-CT1/CT2 series)",
    pin_in_details: "Current inputs from transformer CTs:\n- Primary: TF01-CT1L1/2/3 (4000/1A)\n- Secondary: TF01-CT2L1/2/3 (4000/1A)\nVoltage inputs if required\n24VDC control power",
    pin_out_details: "Trip outputs to transformer circuit breakers\nDifferential trip (instantaneous for internal faults)\nBackup overcurrent trips\nAlarm contacts",
    usage_details: "Transformer differential protection - detects internal transformer faults\nDifferential principle: Compares primary and secondary currents\n- Normal operation: Primary and secondary currents balanced (no trip)\n- Internal fault: Imbalance detected → instantaneous trip\nREF: Sensitive earth fault for transformer tank/winding faults\n87T: High-speed protection for turn-to-turn faults, phase faults inside transformer",
    installation_notes: "1. Wire CTs from both primary and secondary windings\n2. Verify CT polarity (critical for differential)\n3. Configure transformer parameters (MVA, voltage ratio, winding connection)\n4. Set differential slope, harmonic restraint\n5. Commission with transformer energization tests\n6. Document CT locations and polarity",
    safety_warnings: "⚠️ Differential protection - CT polarity is CRITICAL\n⚠️ Incorrect polarity causes false trips or failure to detect faults\n⚠️ Test thoroughly during commissioning\n⚠️ Specialized transformer protection - expert configuration required",
    manufacturer: "Schweitzer Engineering Laboratories (SEL)"
  },
  {
    item_code: "EPR03",
    name: "SEL-751 Feeder Protection Relay - Feeder",
    part_number: "751002BCB4B7781AFF1",
    rating: "Feeder Protection",
    category: "Protection Relay",
    panel: "H02/H03",
    specifications: "SEL-751 feeder protection for downstream feeders, functions: 50, 51, 51N, 86, 50BF",
    technical_specs: "Model: SEL-751 Feeder Protection Relay\nProtection: 50, 51, 51N, 86, 50BF\nCT inputs from feeder CTs (H02/H03)",
    pin_in_details: "Current inputs from H02/H03 CTs\n24VDC power",
    pin_out_details: "Trip outputs to feeder breakers\nAlarm contacts",
    usage_details: "Feeder protection for outgoing circuits\nCoordination with upstream protection (EPR01)\nSelective tripping",
    installation_notes: "Wire feeder CTs, configure coordination with EPR01",
    safety_warnings: "⚠️ Coordination with upstream relay essential\n⚠️ Settings per coordination study",
    manufacturer: "SEL"
  },
  {
    item_code: "PM01",
    name: "SEL-735 Power Meter",
    part_number: "0735LX20921CFXA1XX15302EX",
    rating: "Power Meter",
    category: "Protection Relay",
    panel: "H01",
    specifications: "SEL-735 power quality and revenue meter - measures I, V, PF, kW, kVAR, kWh, THD",
    technical_specs: "Model: SEL-735 Power Meter\nMeasurements:\n- Current (I): 3-phase + neutral\n- Voltage (V): 3-phase + neutral\n- Power Factor (PF)\n- Active Power (kW)\n- Reactive Power (kVAR)\n- Apparent Power (kVA)\n- Energy (kWh, kVARh)\n- Total Harmonic Distortion (THD)\n- Frequency\nAccuracy: Revenue-grade (Class 0.2S)\nCommunication: Ethernet, Modbus, IEC 61850\nData Logging: Trends, min/max, demand",
    pin_in_details: "Current inputs from metering CTs (H01-CT1L1/2/3)\nVoltage inputs from VT (H01-VT01)\n24VDC or 110VAC power supply",
    pin_out_details: "Communication outputs (Ethernet, RS-485)\nAlarm outputs (configurable)\nPulse outputs (kWh, kVARh)",
    usage_details: "Power metering and energy monitoring\nApplications:\n- Revenue metering (electricity billing)\n- Power quality monitoring\n- Load profiling\n- Energy management\nDisplays: Real-time values, trends, alarms",
    installation_notes: "1. Wire metering CTs (H01-CT1L1/2/3) - Class 0.5S accuracy\n2. Wire VT secondary\n3. Configure CT/VT ratios\n4. Set up communication (Modbus to SCADA/BMS)\n5. Calibrate if revenue metering",
    safety_warnings: "⚠️ Metering accuracy critical for billing\n⚠️ Use appropriate accuracy class CTs (0.5S)\n⚠️ Regular calibration per standards",
    manufacturer: "SEL"
  },

  // Switchgear
  {
    item_code: "GCB-01",
    name: "Main Gas Circuit Breaker",
    part_number: "Siemens 8DJH36",
    rating: "630A, 20kA/1sec, 33kV",
    category: "Circuit Breaker",
    panel: "H01",
    specifications: "33kV SF6 gas circuit breaker, 630A continuous, 20kA short-time, Siemens 8DJH36",
    technical_specs: "Type: SF6 Gas Circuit Breaker\nRated Voltage: 33kV (line-to-line)\nRated Current: 630A continuous\nShort-Time Current: 20kA for 1 second\nBreaking Capacity: 25kA (typical)\nInsulation Level: BIL 170kV\nMechanism: Spring-charged motor operated\nAuxiliary Voltage: 110VDC or 24VDC\nTrip Coil: 110VDC or 24VDC (shunt trip)\nClose Coil: 110VDC or 24VDC\nSF6 Gas Pressure: Monitored (K10 relay)\nOperating Mechanism: Stored energy (spring)\nAuxiliary Contacts: Multiple NO/NC for status indication\nInterlocks: Mechanical and electrical",
    pin_in_details: "Control Inputs:\n- Trip Coil (Y1): 110VDC or 24VDC shunt trip (energize to trip)\n- Close Coil (Y9): 110VDC or 24VDC (energize to close, spring must be charged)\n- Motor Control (MCU-MH): Spring charging motor 110VAC\nPosition Sensing:\n- Auxiliary contacts for open/closed status\n- Spring charged indicator (S4)\nInterlocks:\n- Earth switch interlock (cannot close if earth switch closed)\n- Disconnector interlock\n- SF6 gas pressure interlock (K10)",
    pin_out_details: "Status Contacts:\n- CB Open contact → H101 green indicator\n- CB Closed contact → H102 red indicator\n- Multiple auxiliary contacts (52a, 52b) for control and interlocking\nAlarm Contacts:\n- SF6 gas low pressure\n- Spring not charged\n- Trip circuit supervision",
    usage_details: "Main 33kV circuit breaker for Panel H01 incomer\nFunctions:\n- Normal switching (open/close operations)\n- Protection tripping (responds to EPR01 protection relay)\n- Isolation (after opening, disconnector provides visible isolation)\nOperating Modes:\n- Local: Manual control via S1 switch on panel\n- Remote: SCADA control via protection relay outputs\nSequence:\n1. Spring must be charged (motor MCU-MH)\n2. Close command → Spring releases, CB closes\n3. Spring recharges automatically\n4. Trip command or protection → CB opens instantly\nInterlocking:\n- Cannot close if earth switch (E/SW-01) is closed\n- Cannot close if disconnector (ISOL-01) is open\n- Cannot earth if CB is closed",
    installation_notes: "1. Install in 33kV metal-clad switchgear (Panel H01)\n2. Connect HV busbars (630A rated)\n3. Wire trip coil (Y1) to protection relay (EPR01) via K1\n4. Wire close coil (Y9) to control circuit\n5. Connect spring charging motor (MCU-MH) to 110VAC supply\n6. Wire auxiliary contacts to indicators (H101, H102) and interlocks\n7. Install SF6 gas monitoring (K10)\n8. Commission:\n   - Mechanical operation tests\n   - Trip coil supervision test\n   - Close-open timing tests\n   - SF6 gas pressure verification\n   - Interlock verification\n   - Primary injection test (high current)\n9. Set spring charging pressure\n10. Document as-built drawings and test results",
    safety_warnings: "⚠️ EXTREME DANGER - 33kV HIGH VOLTAGE\n⚠️ Installation by qualified HV personnel only\n⚠️ Arc flash hazard - use appropriate PPE (40+ cal/cm²)\n⚠️ De-energize and verify isolation before maintenance\n⚠️ SF6 gas handling - follow environmental regulations\n⚠️ Lockout/tagout procedures mandatory\n⚠️ Verify all interlocks operational\n⚠️ Do not bypass safety interlocks\n⚠️ Test trip circuit regularly (monthly recommended)\n⚠️ Follow AS/NZS 7000 HV safety work practices\n⚠️ Confined space hazards in switchgear rooms\n⚠️ Authorized personnel only - behind locked doors",
    manufacturer: "Siemens"
  },
  {
    item_code: "GCB-02",
    name: "Main Gas Circuit Breaker",
    part_number: "Siemens 8DJH36",
    rating: "630A, 20kA/1sec, 33kV",
    category: "Circuit Breaker",
    panel: "H02",
    specifications: "33kV SF6 gas CB, identical to GCB-01, for Panel H02",
    technical_specs: "Type: SF6 Gas Circuit Breaker\nRated Voltage: 33kV (line-to-line)\nRated Current: 630A continuous\nShort-Time Current: 20kA for 1 second\nBreaking Capacity: 25kA (typical)\nInsulation Level: BIL 170kV\nMechanism: Spring-charged motor operated\nAuxiliary Voltage: 110VDC or 24VDC\nTrip Coil: 110VDC or 24VDC (shunt trip)\nClose Coil: 110VDC or 24VDC\nSF6 Gas Pressure: Monitored (K10 relay)\nOperating Mechanism: Stored energy (spring)\nAuxiliary Contacts: Multiple NO/NC for status indication\nInterlocks: Mechanical and electrical",
    pin_in_details: "Control Inputs:\n- Trip Coil (Y1): 110VDC or 24VDC shunt trip (energize to trip)\n- Close Coil (Y9): 110VDC or 24VDC (energize to close, spring must be charged)\n- Motor Control (MCU-MH): Spring charging motor 110VAC\nPosition Sensing:\n- Auxiliary contacts for open/closed status\n- Spring charged indicator (S4)\nInterlocks:\n- Earth switch interlock (cannot close if earth switch closed)\n- Disconnector interlock\n- SF6 gas pressure interlock (K10)",
    pin_out_details: "Status Contacts:\n- CB Open contact → H101 green indicator\n- CB Closed contact → H102 red indicator\n- Multiple auxiliary contacts (52a, 52b) for control and interlocking\nAlarm Contacts:\n- SF6 gas low pressure\n- Spring not charged\n- Trip circuit supervision",
    usage_details: "Main breaker for Panel H02 (8.9MVA transformer feeder)",
    installation_notes: "Same installation procedures as GCB-01",
    safety_warnings: "Same safety warnings as GCB-01",
    manufacturer: "Siemens"
  },
  {
    item_code: "GCB-03",
    name: "Main Gas Circuit Breaker",
    part_number: "Siemens 8DJH36",
    rating: "630A, 20kA/1sec, 33kV",
    category: "Circuit Breaker",
    panel: "H03",
    specifications: "33kV SF6 gas CB for Panel H03",
    technical_specs: "Type: SF6 Gas Circuit Breaker\nRated Voltage: 33kV (line-to-line)\nRated Current: 630A continuous\nShort-Time Current: 20kA for 1 second\nBreaking Capacity: 25kA (typical)\nInsulation Level: BIL 170kV\nMechanism: Spring-charged motor operated\nAuxiliary Voltage: 110VDC or 24VDC\nTrip Coil: 110VDC or 24VDC (shunt trip)\nClose Coil: 110VDC or 24VDC\nSF6 Gas Pressure: Monitored (K10 relay)\nOperating Mechanism: Stored energy (spring)\nAuxiliary Contacts: Multiple NO/NC for status indication\nInterlocks: Mechanical and electrical",
    pin_in_details: "Control Inputs:\n- Trip Coil (Y1): 110VDC or 24VDC shunt trip (energize to trip)\n- Close Coil (Y9): 110VDC or 24VDC (energize to close, spring must be charged)\n- Motor Control (MCU-MH): Spring charging motor 110VAC\nPosition Sensing:\n- Auxiliary contacts for open/closed status\n- Spring charged indicator (S4)\nInterlocks:\n- Earth switch interlock (cannot close if earth switch closed)\n- Disconnector interlock\n- SF6 gas pressure interlock (K10)",
    pin_out_details: "Status Contacts:\n- CB Open contact → H101 green indicator\n- CB Closed contact → H102 red indicator\n- Multiple auxiliary contacts (52a, 52b) for control and interlocking\nAlarm Contacts:\n- SF6 gas low pressure\n- Spring not charged\n- Trip circuit supervision",
    usage_details: "Main breaker for Panel H03 (400kVA transformer feeder)",
    installation_notes: "Same as GCB-01",
    safety_warnings: "Same as GCB-01",
    manufacturer: "Siemens"
  },
  {
    item_code: "ISOL-01",
    name: "Three Position Disconnector Switch",
    part_number: "-",
    rating: "630A, 33kV",
    category: "Disconnector",
    panel: "H01",
    specifications: "33kV three-position air-break disconnector, 630A, manually operated",
    technical_specs: "Type: Air-break disconnector (isolator)\nRated Voltage: 33kV\nRated Current: 630A\nPositions: 3-position (Open - Earth - Closed)\nOperation: Manual (hand-operated) or motor-operated\nFunction: Isolation, not load breaking\nVisible Break: Yes (open blade visible)\nAuxiliary Contacts: Position indication (open/closed/earthed)\nInterlocks: Mechanical interlocks with CB and earth switch",
    pin_in_details: "Operating Handle: Manual operation (rotary or linear)\nMotor Operation (if equipped): 110VAC motor for remote operation\nInterlock Inputs: Cannot operate if CB is closed (Y11 interlock coil)",
    pin_out_details: "Position Contacts:\n- Open position contact → H103 green indicator\n- Closed position contact → H104 red indicator\n- Earth position contact (if 3-position type)\nInterlock Outputs: Prevents CB closing when disconnector is open",
    usage_details: "Isolation switch for visible disconnection\nPurpose:\n- Provides visible air-break isolation after CB opens\n- Allows safe maintenance on downstream equipment\n- NOT for load breaking - CB must open first\nSequence:\n1. Open CB first (GCB-01)\n2. Then open disconnector (ISOL-01) for isolation\n3. Visible blade gap confirms isolation\n4. Lock in open position for maintenance\n5. To energize: Close disconnector, then close CB\nThree-Position Type (if applicable):\n- Position 1: Open (blade separated, isolated)\n- Position 2: Earthed (blade grounded - for equipment earthing)\n- Position 3: Closed (blade connected, circuit complete)",
    installation_notes: "1. Install in 33kV switchgear with adequate clearances\n2. Mechanical interlocks:\n   - Cannot close if CB is closed (Y11 coil prevents)\n   - Cannot close if earth switch is closed\n3. Wire position indication contacts to H103 (open), H104 (closed)\n4. Manual operation handle must be accessible\n5. Ensure visible blade gap when open\n6. Lock-off provision for maintenance\n7. Test mechanical interlocks thoroughly\n8. Apply caution labels",
    safety_warnings: "⚠️ NEVER operate under load - open CB first\n⚠️ High voltage - 33kV present on blade\n⚠️ Wait for CB to open before operating disconnector\n⚠️ Verify visible blade gap before approaching\n⚠️ Use HV-rated operating stick if manual\n⚠️ Interlock failure can be fatal - test regularly\n⚠️ De-energize and verify before maintenance\n⚠️ Lock in open position during work\n⚠️ No-load switching only - arcing can occur if loaded",
    manufacturer: "Various"
  },
  {
    item_code: "ISOL-02",
    name: "Three Position Disconnector Switch",
    part_number: "-",
    rating: "630A, 33kV",
    category: "Disconnector",
    panel: "H02",
    specifications: "33kV disconnector for Panel H02",
    technical_specs: "Type: Air-break disconnector (isolator)\nRated Voltage: 33kV\nRated Current: 630A\nPositions: 3-position (Open - Earth - Closed)\nOperation: Manual (hand-operated) or motor-operated\nFunction: Isolation, not load breaking\nVisible Break: Yes (open blade visible)\nAuxiliary Contacts: Position indication (open/closed/earthed)\nInterlocks: Mechanical interlocks with CB and earth switch",
    pin_in_details: "Operating Handle: Manual operation (rotary or linear)\nMotor Operation (if equipped): 110VAC motor for remote operation\nInterlock Inputs: Cannot operate if CB is closed (Y11 interlock coil)",
    pin_out_details: "Position Contacts:\n- Open position contact → H103 green indicator\n- Closed position contact → H104 red indicator\n- Earth position contact (if 3-position type)\nInterlock Outputs: Prevents CB closing when disconnector is open",
    usage_details: "Isolation for Panel H02",
    installation_notes: "Same as ISOL-01",
    safety_warnings: "Same as ISOL-01",
    manufacturer: "Various"
  },
  {
    item_code: "ISOL-03",
    name: "Three Position Disconnector Switch",
    part_number: "-",
    rating: "630A, 33kV",
    category: "Disconnector",
    panel: "H03",
    specifications: "33kV disconnector for Panel H03",
    technical_specs: "Type: Air-break disconnector (isolator)\nRated Voltage: 33kV\nRated Current: 630A\nPositions: 3-position (Open - Earth - Closed)\nOperation: Manual (hand-operated) or motor-operated\nFunction: Isolation, not load breaking\nVisible Break: Yes (open blade visible)\nAuxiliary Contacts: Position indication (open/closed/earthed)\nInterlocks: Mechanical interlocks with CB and earth switch",
    pin_in_details: "Operating Handle: Manual operation (rotary or linear)\nMotor Operation (if equipped): 110VAC motor for remote operation\nInterlock Inputs: Cannot operate if CB is closed (Y11 interlock coil)",
    pin_out_details: "Position Contacts:\n- Open position contact → H103 green indicator\n- Closed position contact → H104 red indicator\n- Earth position contact (if 3-position type)\nInterlock Outputs: Prevents CB closing when disconnector is open",
    usage_details: "Isolation for Panel H03",
    installation_notes: "Same as ISOL-01",
    safety_warnings: "Same as ISOL-01",
    manufacturer: "Various"
  },
  {
    item_code: "E/SW-01",
    name: "Earth Switch with Motor Mechanism",
    part_number: "-",
    rating: "630A, 33kV",
    category: "Earth Switch",
    panel: "H01",
    specifications: "33kV motor-operated earth switch, 630A, for equipment grounding during maintenance",
    technical_specs: "Type: Earth Switch (Grounding Switch)\nRated Voltage: 33kV\nRated Current: 630A (short-time earthing current)\nOperation: Motor-operated (Y10 coil)\nFunction: Connect circuit to ground for safe maintenance\nVisible Indication: Blade position visible\nInterlocks: Cannot close if CB is closed or circuit is energized\nAuxiliary Contacts: Position indication (open/earthed)",
    pin_in_details: "Operating Coil (Y10): 110VDC or 24VDC motor control for earth switch operation\nInterlock Inputs:\n- Cannot operate if CB closed\n- Cannot operate if voltage present (KBE relay)\n- Fortress interlock (KF2) prevents energization while earthed",
    pin_out_details: "Position Contacts:\n- Earth switch open → H105 green indicator\n- Earth switch closed/earthed → H106 red indicator\nInterlock Contacts: Prevents CB closing when earth switch is closed (critical safety)",
    usage_details: "Grounding switch for safe maintenance\nPurpose:\n- Grounds equipment after isolation for safe work\n- Discharges residual voltage/capacitance\n- Protects workers from accidental energization\n- Provides low-impedance path to ground\nSafe Work Sequence:\n1. Open circuit breaker (GCB-01)\n2. Open disconnector (ISOL-01) - visible isolation\n3. Verify no voltage (KBE relay confirms)\n4. THEN close earth switch (E/SW-01) - grounds circuit\n5. Lock earth switch closed, install safety grounds\n6. Safe to work on equipment\nOpposite sequence to energize:\n1. Remove safety grounds\n2. Open earth switch\n3. Close disconnector\n4. Close circuit breaker\nInterlocks (CRITICAL):\n- Fortress interlock (KF2): Mechanically prevents CB closing while earth switch is closed\n- Electrical interlock: KBE relay prevents earthing if voltage present\n- These interlocks are life-safety devices",
    installation_notes: "1. Install with adequate clearances to ground blade\n2. Wire motor control (Y10) to control circuit\n3. Install critical interlocks:\n   - Fortress mechanical interlock (KF2)\n   - KBE voltage sensing relay\n   - Electrical interlock with CB\n4. Wire position indication (H105 open, H106 closed)\n5. Ensure motor operation is smooth\n6. Test interlocks exhaustively:\n   - Cannot close earth switch if voltage present\n   - Cannot close CB if earth switch closed\n   - Override must not be possible\n7. Label clearly: 'DANGER - EARTH SWITCH'\n8. Provide lock-off capability\n9. Document interlock logic in drawings",
    safety_warnings: "⚠️ LIFE-SAFETY CRITICAL DEVICE\n⚠️ Verify circuit is de-energized before closing earth switch\n⚠️ KBE relay must confirm no voltage before earthing\n⚠️ NEVER close earth switch on energized circuit - causes arc flash explosion\n⚠️ NEVER bypass interlocks - can be fatal\n⚠️ Test interlocks regularly (monthly recommended)\n⚠️ Lock earth switch closed during maintenance\n⚠️ Verify earth switch is open before energizing\n⚠️ Fortress interlock (KF2) prevents energization - do not tamper\n⚠️ Follow lockout/tagout procedures\n⚠️ Multiple workers: Each applies their own lock\n⚠️ Interlock failure investigation mandatory before re-energization",
    manufacturer: "Various"
  },
  {
    item_code: "E/SW-02",
    name: "Earth Switch with Motor Mechanism",
    part_number: "-",
    rating: "630A, 33kV",
    category: "Earth Switch",
    panel: "H02",
    specifications: "33kV earth switch for Panel H02",
    technical_specs: "Type: Earth Switch (Grounding Switch)\nRated Voltage: 33kV\nRated Current: 630A (short-time earthing current)\nOperation: Motor-operated (Y10 coil)\nFunction: Connect circuit to ground for safe maintenance\nVisible Indication: Blade position visible\nInterlocks: Cannot close if CB is closed or circuit is energized\nAuxiliary Contacts: Position indication (open/earthed)",
    pin_in_details: "Operating Coil (Y10): 110VDC or 24VDC motor control for earth switch operation\nInterlock Inputs:\n- Cannot operate if CB closed\n- Cannot operate if voltage present (KBE relay)\n- Fortress interlock (KF2) prevents energization while earthed",
    pin_out_details: "Position Contacts:\n- Earth switch open → H105 green indicator\n- Earth switch closed/earthed → H106 red indicator\nInterlock Contacts: Prevents CB closing when earth switch is closed (critical safety)",
    usage_details: "Grounding for Panel H02 maintenance",
    installation_notes: "Same as E/SW-01, with KF3 interlock",
    safety_warnings: "Same life-safety warnings as E/SW-01",
    manufacturer: "Various"
  },
  {
    item_code: "E/SW-03",
    name: "Earth Switch with Motor Mechanism",
    part_number: "-",
    rating: "630A, 33kV",
    category: "Earth Switch",
    panel: "H03",
    specifications: "33kV earth switch for Panel H03",
    technical_specs: "Type: Earth Switch (Grounding Switch)\nRated Voltage: 33kV\nRated Current: 630A (short-time earthing current)\nOperation: Motor-operated (Y10 coil)\nFunction: Connect circuit to ground for safe maintenance\nVisible Indication: Blade position visible\nInterlocks: Cannot close if CB is closed or circuit is energized\nAuxiliary Contacts: Position indication (open/earthed)",
    pin_in_details: "Operating Coil (Y10): 110VDC or 24VDC motor control for earth switch operation\nInterlock Inputs:\n- Cannot operate if CB closed\n- Cannot operate if voltage present (KBE relay)\n- Fortress interlock (KF2) prevents energization while earthed",
    pin_out_details: "Position Contacts:\n- Earth switch open → H105 green indicator\n- Earth switch closed/earthed → H106 red indicator\nInterlock Contacts: Prevents CB closing when earth switch is closed (critical safety)",
    usage_details: "Grounding for Panel H03 maintenance",
    installation_notes: "Same as E/SW-01, with KF3 interlock",
    safety_warnings: "Same life-safety warnings as E/SW-01",
    manufacturer: "Various"
  },

  // Interlocks
  {
    item_code: "KF2",
    name: "Fortress Electromechanical Interlock - H01",
    part_number: "Solenoid Type",
    rating: "Safety Interlock",
    category: "Interlock",
    panel: "H01",
    specifications: "Fortress electromechanical safety interlock for H01 earth switch, solenoid type",
    technical_specs: "Type: Electromechanical trapped-key interlock\nSafety Rating: SIL 3 / PLe\nFunction: Prevents energization while earth switch closed\nMechanism: Solenoid-released mechanical lock\nKey Exchange: Trapped key prevents simultaneous operations\nForce: High-security mechanical lock",
    pin_in_details: "Solenoid control: 24VDC release solenoid\nPosition sensing: Micro-switches for key position",
    pin_out_details: "Interlock status contacts: Key captured/released status\nSafety contacts: Forced-guided contacts prove interlock engaged",
    usage_details: "Prevents CB (GCB-01) from closing while earth switch (E/SW-01) is closed\nOperation:\n1. When earth switch closes, key is trapped (cannot be removed)\n2. CB cannot be closed because key is captured in earth switch\n3. To energize: Open earth switch → Key releases → Can now close CB\nMechanical + Electrical: Provides both mechanical prevention and electrical confirmation",
    installation_notes: "1. Follow Fortress installation manual precisely\n2. Mount interlock mechanism on earth switch and CB\n3. Adjust for positive mechanical engagement\n4. Wire solenoid to 24VDC\n5. Wire status contacts to control circuit\n6. Test interlock:\n   - Close earth switch → Verify key trapped\n   - Verify CB cannot close with earth switch closed\n   - Open earth switch → Verify key releases\n7. Document interlock logic\n8. Regular inspection per safety requirements",
    safety_warnings: "⚠️ SAFETY CRITICAL - SIL 3 DEVICE\n⚠️ Do not defeat, bypass, or override\n⚠️ Installation per manufacturer's manual only\n⚠️ Regular inspection mandatory (monthly)\n⚠️ Interlock failure → Stop work, investigate\n⚠️ Part of life-safety system\n⚠️ Tampering is a terminable offense\n⚠️ Test before every maintenance activity",
    manufacturer: "Fortress"
  },
  {
    item_code: "KF3",
    name: "Fortress Electromechanical Interlock - H02 & H03",
    part_number: "Solenoid Type",
    rating: "Safety Interlock",
    category: "Interlock",
    panel: "H02/H03",
    specifications: "Fortress electromechanical interlock for H02 and H03 earth switches",
    technical_specs: "Type: Electromechanical trapped-key interlock\nSafety Rating: SIL 3 / PLe\nFunction: Prevents energization while earth switch closed\nMechanism: Solenoid-released mechanical lock\nKey Exchange: Trapped key prevents simultaneous operations\nForce: High-security mechanical lock",
    pin_in_details: "Solenoid control: 24VDC release solenoid\nPosition sensing: Micro-switches for key position",
    pin_out_details: "Interlock status contacts: Key captured/released status\nSafety contacts: Forced-guided contacts prove interlock engaged",
    usage_details: "Interlocks for E/SW-02 (H02) and E/SW-03 (H03)\nSame functionality as KF2",
    installation_notes: "Same as KF2",
    safety_warnings: "Same safety-critical warnings as KF2",
    manufacturer: "Fortress"
  },

  // Misc
  {
    item_code: "A51",
    name: "Capacitor Voltage Indicator",
    part_number: "-",
    rating: "-",
    category: "Miscellaneous",
    panel: "All",
    specifications: "Capacitive voltage indicator/detector for presence of high voltage",
    technical_specs: "Type: Capacitive voltage indicator\nFunction: Non-contact voltage detection\nVoltage Range: 11kV-36kV\nIndication: LED or lamp\nPower: Capacitively coupled from HV",
    pin_in_details: "Capacitive coupling to HV busbar (no direct electrical connection)",
    pin_out_details: "Visual indication (LED/lamp) - illuminates when HV present",
    usage_details: "Indicates presence of high voltage\nSafety device: Visual confirmation that circuit is energized\nTypical location: Near HV busbars in switchgear",
    installation_notes: "Mount near HV busbars\nCapacitive plate couples to HV electric field\nNo direct connection required",
    safety_warnings: "⚠️ Indicator aid only - always verify with proper voltage detector\n⚠️ Failure of indicator does not mean circuit is safe",
    manufacturer: "Various"
  },
  {
    item_code: "Y1",
    name: "Shunt Trip Coil (GCB)",
    part_number: "-",
    rating: "110VDC or 24VDC",
    category: "Miscellaneous",
    panel: "All",
    specifications: "Circuit breaker trip coil (shunt coil)",
    technical_specs: "Type: Shunt trip coil\nVoltage: 110VDC or 24VDC\nFunction: Trips CB when energized\nDuty: Intermittent (pulse)\nResistance: ~500Ω (typical)",
    pin_in_details: "Coil terminals: Energize to trip CB\nSupply: 110VDC or 24VDC\nTypical circuit: Protection relay → K1 relay → Y1 trip coil",
    pin_out_details: "Mechanical output: Releases CB latch, opens CB instantly",
    usage_details: "Trips circuit breaker on protection signal\nEnergizing coil releases stored energy mechanism → CB opens\nUsed for:\n- Protection trips (fault conditions)\n- Emergency trips\n- Remote tripping",
    installation_notes: "Wire from protection relay output\nTypically through K1 interposing relay\nTest trip circuit supervision regularly",
    safety_warnings: "⚠️ Test trip circuit continuity regularly\n⚠️ Broken trip circuit = no protection\n⚠️ Coil failure investigation mandatory",
    manufacturer: "Various"
  },
  {
    item_code: "Y9",
    name: "Closing Coil (GCB)",
    part_number: "-",
    rating: "110VDC or 24VDC",
    category: "Miscellaneous",
    panel: "All",
    specifications: "Circuit breaker closing coil",
    technical_specs: "Type: Closing coil\nVoltage: 110VDC or 24VDC\nFunction: Closes CB when energized (if spring charged)\nDuty: Intermittent",
    pin_in_details: "Coil terminals: Energize to close CB\nCondition: Spring must be charged first",
    pin_out_details: "Mechanical: Releases stored spring energy, closes CB",
    usage_details: "Closes circuit breaker on command\nSequence:\n1. Spring must be charged (motor MCU-MH)\n2. Energize Y9 → Releases spring → CB closes\n3. Spring re-charges automatically",
    installation_notes: "Wire from close command circuit\nInterlock with spring charged indication\nAnti-pumping circuit recommended",
    safety_warnings: "⚠️ Cannot close if spring not charged\n⚠️ Anti-pumping prevents rapid open-close cycles",
    manufacturer: "Various"
  },
  {
    item_code: "Y10",
    name: "ES Interlocking Coil (Earth Switch Control)",
    part_number: "-",
    rating: "110VDC or 24VDC",
    category: "Miscellaneous",
    panel: "All",
    specifications: "Earth switch motor control coil",
    technical_specs: "Type: Motor control coil for earth switch\nVoltage: 110VDC or 24VDC\nFunction: Operates earth switch motor",
    pin_in_details: "Coil control: Energize to operate earth switch motor\nInterlocks: Must check voltage absent before energizing",
    pin_out_details: "Motor operation: Opens/closes earth switch blade",
    usage_details: "Controls earth switch motor operation\nInterlocked with voltage sensing (KBE) and CB status",
    installation_notes: "Wire through interlock circuits\nTest interlocks before commissioning",
    safety_warnings: "⚠️ Interlocks must function correctly\n⚠️ Do not bypass safety circuits",
    manufacturer: "Various"
  },
  {
    item_code: "Y11",
    name: "DS Interlocking Coil (Disconnector Control)",
    part_number: "-",
    rating: "110VDC or 24VDC",
    category: "Miscellaneous",
    panel: "All",
    specifications: "Disconnector interlock coil",
    technical_specs: "Type: Interlock coil for disconnector\nFunction: Prevents disconnector operation if CB closed",
    pin_in_details: "Coil control from CB status",
    pin_out_details: "Mechanical interlock: Blocks disconnector handle",
    usage_details: "Prevents disconnector operation under load\nEnergized when CB is closed → Blocks disconnector\nDe-energized when CB is open → Allows disconnector operation",
    installation_notes: "Wire to CB auxiliary contact (52b)\nTest interlock thoroughly",
    safety_warnings: "⚠️ Prevents load breaking on disconnector\n⚠️ Critical safety function",
    manufacturer: "Various"
  },
  {
    item_code: "MCU-MH",
    name: "Motor Control Unit - Spring Charging Motor",
    part_number: "-",
    rating: "110VAC",
    category: "Miscellaneous",
    panel: "All",
    specifications: "Spring charging motor for circuit breaker mechanism",
    technical_specs: "Type: Spring charging motor\nVoltage: 110VAC (typically)\nFunction: Charges CB closing spring\nDuty: Intermittent (auto-start when spring discharged)\nMotor: Small AC motor with gear reduction",
    pin_in_details: "Motor supply: 110VAC\nControl: Automatic (starts when spring discharged)\nLimit switch: Stops motor when fully charged",
    pin_out_details: "Mechanical: Charges spring mechanism\nStatus: Spring charged indication to S4 indicator",
    usage_details: "Automatically charges CB closing spring\nOperation:\n1. After CB closes, spring is discharged\n2. Motor starts automatically\n3. Spring charges (takes ~10-15 seconds)\n4. Limit switch stops motor when fully charged\n5. CB is ready to close again\nSpring Charged Status:\n- Indicated by S4 (three-position indicator)\n- Green LED / flag shows 'Spring Charged'\n- CB can only close when spring is charged",
    installation_notes: "1. Wire motor to 110VAC supply\n2. Connect limit switches\n3. Adjust spring tension per manufacturer specs\n4. Test charging cycle\n5. Verify spring charged indication (S4)",
    safety_warnings: "⚠️ Motor starts automatically - keep clear\n⚠️ Spring under high tension - do not disassemble\n⚠️ Limit switch failure → Motor overheats\n⚠️ Test spring charging cycle regularly",
    manufacturer: "Various"
  },
  {
    item_code: "LCS01",
    name: "Emergency Stop Push Button",
    part_number: "Schneider Harmony XB4 XB4BS8444",
    rating: "Emergency Stop",
    category: "Miscellaneous",
    panel: "All",
    specifications: "Red mushroom-head emergency stop push button, Schneider Harmony XB4 series",
    technical_specs: "Model: Schneider XB4BS8444\nType: Emergency stop button\nColor: Red mushroom head (40mm)\nOperation: Push to stop, twist to release\nContacts: 1NC + 1NO (safety-rated)\nSafety Rating: Category 0 stop\nMounting: 22mm panel hole\nIP Rating: IP65 (front)\nContact Rating: 10A @ 250VAC",
    pin_in_details: "Mounting: Panel cutout 22mm\nButton: Push-pull/twist-release operation",
    pin_out_details: "NC contact: Wired in series with control circuits (breaks on press)\nNO contact: Alarm/indication (makes on press)",
    usage_details: "Emergency shutdown of equipment\nFunctions:\n- Immediately de-energizes control circuits\n- Trips circuit breakers if wired in trip circuit\n- Stops motor-operated mechanisms\n- Latches in depressed position until manually reset (twist to release)\nTypical wiring:\n- NC contact in series with close coil (Y9) circuit\n- NC contact in series with motor control circuits\n- Pressing button → NC contacts open → Circuits de-energize\nCategory 0 stop: Uncontrolled stop (immediate power removal)",
    installation_notes: "1. Cut 22mm hole in accessible location on panel door\n2. Install from front, secure with retaining nut\n3. Wire NC contacts in series with critical control circuits:\n   - Close coil (Y9) circuit\n   - Spring charging motor (MCU-MH)\n   - Any motor-operated mechanisms\n4. Wire NO contact to alarm/SCADA (optional)\n5. Label clearly: 'EMERGENCY STOP'\n6. Test operation:\n   - Press button → Verify all motors/coils de-energize\n   - Twist to release → Verify circuits can re-energize\n7. Ensure twist-to-release requires deliberate action\n8. Located at accessible position near operator station",
    safety_warnings: "⚠️ Emergency use only - not for routine shutdown\n⚠️ Test regularly (weekly recommended)\n⚠️ Must be easily accessible at all times\n⚠️ Do not bypass or disable E-stop circuit\n⚠️ Category 0 stop - uncontrolled (no braking)\n⚠️ After E-stop, investigate cause before reset\n⚠️ Ensure personnel are clear before resetting\n⚠️ Multiple E-stops: All wired in series",
    manufacturer: "Schneider Electric"
  },
  
  // Heater & Lighting
  {
    item_code: "H80",
    name: "Panel Heater",
    part_number: "-",
    rating: "30W, 230VAC",
    category: "Heater",
    panel: "All",
    specifications: "Anti-condensation panel heater, 30W, 230VAC, thermostat-controlled",
    technical_specs: "Power: 30W\nVoltage: 230VAC\nType: Resistive heating element\nThermostat: Built-in (typically 0-60°C adjustable)\nMounting: Bottom of panel\nIP Rating: IP20 (internal use)\nSafety: Thermal cutout",
    pin_in_details: "Supply: 230VAC, 50Hz\nConnection: Screw terminals or plug",
    pin_out_details: "Heat output: Radiant/convection heat in panel enclosure",
    usage_details: "Prevents condensation inside switchgear panels\nFunctions:\n- Maintains internal temperature above dew point\n- Prevents moisture accumulation on electrical components\n- Reduces corrosion\nTypical setting: Thermostat set to maintain ~5-10°C above ambient minimum\nOperation: Continuous when panel is energized",
    installation_notes: "1. Mount at bottom of panel (heat rises)\n2. Maintain clearance from components (minimum 50mm)\n3. Wire to 230VAC auxiliary supply\n4. Set thermostat to appropriate temperature\n5. Ensure ventilation slots are not blocked\n6. Do not obstruct heater with cables or objects",
    safety_warnings: "⚠️ Clearance from combustible materials (minimum 100mm)\n⚠️ Do not cover or block heater\n⚠️ Fire safety - thermal cutout required\n⚠️ Hot surface - do not touch during operation\n⚠️ Adequate panel ventilation required\n⚠️ Inspect regularly for dust accumulation",
    manufacturer: "Stego or similar"
  },
  {
    item_code: "B90",
    name: "Panel Light",
    part_number: "-",
    rating: "LED, 24VDC",
    category: "Lighting",
    panel: "All",
    specifications: "Internal LED panel light for maintenance illumination",
    technical_specs: "Type: LED strip or fixture\nVoltage: 24VDC typical\nPower: 5-10W\nBrightness: 500-1000 lumens\nColor Temperature: Cool white (5000K)\nMounting: Ceiling or side of panel\nIP Rating: IP20 (internal)",
    pin_in_details: "Power: 24VDC supply\nSwitch: Manual on/off switch (optional)\nDoor interlock: Automatic on when door opens (optional)",
    pin_out_details: "Light output: Illuminates panel interior",
    usage_details: "Internal panel illumination for maintenance and inspection\nFunctions:\n- Provides light when panel door is open for work\n- Improves safety during maintenance\n- Optional: Auto-on when door opens (wired to door switch S80)\nTypical use: Energized only when needed for maintenance",
    installation_notes: "1. Mount on panel ceiling or side wall\n2. Position to illuminate all components\n3. Wire to 24VDC supply\n4. Optional: Wire through door switch (S80) for auto-on\n5. Provide manual override switch\n6. Use shielded or enclosed fixture to prevent glare",
    safety_warnings: "⚠️ Do not look directly at LEDs\n⚠️ Turn off when not needed (energy saving)\n⚠️ Check connections before closing panel",
    manufacturer: "Various"
  },
  {
    item_code: "R90",
    name: "Panel Light Indicator",
    part_number: "-",
    rating: "-",
    category: "Lighting",
    panel: "All",
    specifications: "Panel light status indicator (shows if internal light is on)",
    technical_specs: "Type: Small LED or pilot lamp\nFunction: Indicates if internal panel light (B90) is energized\nMounting: Front panel",
    pin_in_details: "Parallel to B90 light circuit",
    pin_out_details: "Visual indication on front panel",
    usage_details: "Indicates if internal panel light is on\nHelps identify if light was left on (reminder to turn off)",
    installation_notes: "Wire in parallel with B90\nMount on front panel door\nLabel: 'PANEL LIGHT ON'",
    safety_warnings: "⚠️ Reminder function only",
    manufacturer: "Various"
  },
  
  // Terminals
  {
    item_code: "X",
    name: "24VDC Terminal Blocks",
    part_number: "-",
    rating: "24VDC, Various",
    category: "Terminal Block",
    panel: "All",
    specifications: "24VDC power distribution terminal blocks for H01/H02/H03",
    technical_specs: "Type: Screw-type terminal blocks\nVoltage: 24VDC\nCurrent: Up to 20A per terminal\nWire Size: 0.5-6mm²\nColor: Typically blue (for DC) or red/black (polarity)\nRail: DIN rail mount",
    pin_in_details: "24VDC supply input\nMultiple output terminals for distribution",
    pin_out_details: "24VDC outputs to various control circuits, relays, indicators",
    usage_details: "Power distribution for 24VDC control circuits\nFeeds:\n- Relay coils (K1, K5A, K7, K9, K10, K101, K105, KBE)\n- Indicator lamps (H101-H108, H301-H307)\n- Control circuits\n- Protection relay auxiliary power",
    installation_notes: "1. DIN rail mount in control section\n2. Organize by function (power, control, signals)\n3. Use jumpers for common connections\n4. Maintain polarity (red +24V, black 0V)\n5. Adequate spacing for wire entry",
    safety_warnings: "⚠️ Check polarity before connecting\n⚠️ Proper wire sizing to prevent overheating\n⚠️ Torque terminals to specification",
    manufacturer: "Phoenix Contact, Weidmuller, or similar"
  },
  {
    item_code: "XA01",
    name: "Marshalling Terminal H01",
    part_number: "GCFxxx-RSP01",
    rating: "-",
    category: "Terminal Block",
    panel: "H01",
    specifications: "Marshalling terminal block for signal and control wiring",
    technical_specs: "Multi-level terminal blocks for signal marshalling",
    pin_in_details: "Field wiring inputs (from remote devices)",
    pin_out_details: "Outputs to control circuits and protection relays",
    usage_details: "Signal marshalling between field devices and control/protection circuits",
    installation_notes: "Organize by signal type, label comprehensively",
    safety_warnings: "⚠️ Proper isolation between voltage levels",
    manufacturer: "Various"
  },
  {
    item_code: "XA02",
    name: "Marshalling Terminal H02",
    part_number: "GCFxxx-RSP01",
    rating: "-",
    category: "Terminal Block",
    panel: "H02",
    specifications: "Marshalling terminal for H02",
    technical_specs: "Multi-level terminal blocks for signal marshalling",
    pin_in_details: "Field inputs",
    pin_out_details: "Control outputs",
    usage_details: "Signal marshalling H02",
    installation_notes: "Standard marshalling installation",
    safety_warnings: "⚠️ Voltage isolation",
    manufacturer: "Various"
  },
  {
    item_code: "XA03",
    name: "Marshalling Terminal H03",
    part_number: "GCFxxx-RSP01",
    rating: "-",
    category: "Terminal Block",
    panel: "H03",
    specifications: "Marshalling terminal for H03",
    technical_specs: "Multi-level terminal blocks for signal marshalling",
    pin_in_details: "Field inputs",
    pin_out_details: "Control outputs",
    usage_details: "Signal marshalling H03",
    installation_notes: "Standard installation",
    safety_warnings: "⚠️ Proper labeling essential",
    manufacturer: "Various"
  },
  {
    item_code: "XT5",
    name: "AVI Terminal Block",
    part_number: "-",
    rating: "-",
    category: "Terminal Block",
    panel: "All",
    specifications: "AVI (Audio-Visual Indicator) terminal block",
    technical_specs: "Terminals for alarm and indication circuits",
    pin_in_details: "Alarm inputs from relays and devices",
    pin_out_details: "Outputs to annunciator or SCADA",
    usage_details: "Alarm signal distribution",
    installation_notes: "Organize by alarm priority",
    safety_warnings: "⚠️ Critical alarms clearly identified",
    manufacturer: "Various"
  },
  {
    item_code: "XT21",
    name: "Terminal Block Wega 2",
    part_number: "Wega 2",
    rating: "-",
    category: "Terminal Block",
    panel: "All",
    specifications: "General purpose terminal block, Wega 2 series",
    technical_specs: "Screw terminals, DIN rail mount",
    pin_in_details: "Wiring inputs",
    pin_out_details: "Wiring outputs",
    usage_details: "General wiring termination and distribution",
    installation_notes: "DIN rail mount, label terminals",
    safety_warnings: "⚠️ Proper torque",
    manufacturer: "Weidmuller"
  },
  {
    item_code: "XPE",
    name: "PE/Ground Terminal Block",
    part_number: "-",
    rating: "Ground",
    category: "Terminal Block",
    panel: "All",
    specifications: "Protective earth (PE) grounding terminal block",
    technical_specs: "Type: Ground/earth terminal bar\nColor: Green/Yellow striped\nConnection: Multi-point ground bar\nMaterial: Copper or brass\nMounting: Insulated from DIN rail",
    pin_in_details: "Multiple ground wire inputs from equipment",
    pin_out_details: "Common ground bus, connected to main ground",
    usage_details: "Protective earth connections\nAll equipment grounds terminate here:\n- Equipment frames\n- Control circuit commons (single-point ground)\n- Cable shields\n- Functional earth\nMain ground: Connected to switchgear main ground bus",
    installation_notes: "1. Mount on insulated DIN rail or panel\n2. Use green/yellow terminals only\n3. Main ground connection to switchgear ground bus (large conductor)\n4. Separate protective earth (PE) from functional earth (FE) if required\n5. Label as 'PROTECTIVE EARTH' or 'PE'\n6. Use star-point grounding for sensitive circuits",
    safety_warnings: "⚠️ Grounding is life-safety critical\n⚠️ All exposed conductive parts must be grounded\n⚠️ Low impedance to main ground essential\n⚠️ Periodic resistance testing (< 0.1Ω to main ground)\n⚠️ Never disconnect ground during operation",
    manufacturer: "Phoenix Contact or similar"
  },
  {
    item_code: "XC10, XC30, XC40, XC90",
    name: "Control Terminal Blocks (Various Circuits)",
    part_number: "-",
    rating: "-",
    category: "Terminal Block",
    panel: "All",
    specifications: "Control circuit terminal blocks for various functions",
    technical_specs: "General purpose terminals for control wiring",
    pin_in_details: "Control circuit inputs",
    pin_out_details: "Control circuit outputs",
    usage_details: "Termination for:\n- XC10: Circuit 10 control wiring\n- XC30: Circuit 30 control wiring\n- XC40: Circuit 40 control wiring\n- XC90: Circuit 90 control wiring\nOrganized by circuit number per drawings",
    installation_notes: "Label with circuit numbers\nOrganize per schematic drawings",
    safety_warnings: "⚠️ Follow wiring diagrams",
    manufacturer: "Various"
  },
  {
    item_code: "XQ0, XQ1",
    name: "Control Terminal Blocks (Q-Circuits)",
    part_number: "-",
    rating: "-",
    category: "Terminal Block",
    panel: "All",
    specifications: "Q-circuit control terminals",
    technical_specs: "Control terminals for Q-designated circuits",
    pin_in_details: "Q-circuit inputs",
    pin_out_details: "Q-circuit outputs",
    usage_details: "Termination for Q-designated control circuits\nTypically: Close/trip circuits, interlocking circuits",
    installation_notes: "Label clearly with Q-circuit designations",
    safety_warnings: "⚠️ Critical control circuits",
    manufacturer: "Various"
  }
];

const SEED_COMPONENTS: ComponentData[] = ALL_COMPONENTS_TO_SEED.map((component, index) => ({
    ...component,
    id: index + 1,
    created_at: new Date(Date.now() - (ALL_COMPONENTS_TO_SEED.length - index) * 1000 * 60).toISOString(), // Stagger creation times
    updated_at: new Date(Date.now() - (ALL_COMPONENTS_TO_SEED.length - index) * 1000 * 60).toISOString(),
}));


const SEED_QUIZ_CATEGORIES: QuizCategory[] = [
    { id: 1, name: 'MCB', description: 'Questions about Miniature Circuit Breakers.' },
    { id: 2, name: 'Relay', description: 'Questions about various types of relays.' },
    { id: 3, name: 'Current Transformer', description: 'Questions about Current Transformers (CTs).' },
    { id: 4, name: 'Switch', description: 'Questions about switches.' },
    { id: 5, name: 'Protection Relay', description: 'Questions about microprocessor-based protection relays like SEL-751 and SEL-787.' },
];

const SEED_QUESTIONS: QuizQuestion[] = [
    {
        id: 1,
        category_id: 1,
        question_text: 'What does MCB stand for?',
        type: 'multiple_choice',
        options: [{ text: 'Motor Control Board' }, { text: 'Miniature Circuit Breaker' }, { text: 'Main Control Bus' }, { text: 'Magnetic Coil Box' }],
        correct_answer: 'Miniature Circuit Breaker',
        difficulty: 'easy'
    },
    {
        id: 2,
        category_id: 2,
        question_text: 'A relay is used to switch a large current with a small current.',
        type: 'true_false',
        options: [{ text: 'True' }, { text: 'False' }],
        correct_answer: 'True',
        difficulty: 'easy'
    },
    {
        id: 3,
        category_id: 1,
        question_text: 'What is the primary function of an MCB?',
        type: 'multiple_choice',
        options: [{ text: 'Overcurrent protection' }, { text: 'Voltage regulation' }, { text: 'Signal amplification' }, { text: 'Power storage' }],
        correct_answer: 'Overcurrent protection',
        difficulty: 'medium'
    },
    {
        id: 4,
        category_id: 5,
        question_text: "Which slot on the SEL-751 relay typically houses the main processor and Ethernet communication ports (Port 1A and 1B)?",
        question_image_url: 'https://placehold.co/600x400.png?text=SEL-751+Rear+View',
        type: 'multiple_choice',
        options: [{ text: "Slot A - Power Module" }, { text: "Slot B - Processor & Communications" }, { text: "Slot C - Control Module" }, { text: "Slot Z - Additional I/O" }],
        correct_answer: "Slot B - Processor & Communications",
        difficulty: 'easy'
    },
    {
        id: 5,
        category_id: 5,
        question_text: "On the SEL-751 relay's Power Module (Slot A), which output is designated as the main trip output connected to the circuit breaker's trip coil?",
        type: 'multiple_choice',
        options: [{ text: "OUT102" }, { text: "IN102" }, { text: "OUT101" }, { text: "A3/A4" }],
        correct_answer: "OUT101",
        difficulty: 'medium'
    },
    {
        id: 6,
        category_id: 5,
        question_text: "What does the ANSI code '50BF' stand for in the context of an SEL-751 relay?",
        type: 'multiple_choice',
        options: [{ text: "Bus Fault" }, { text: "Breaker Failure" }, { text: "Backup Fuse" }, { text: "Bus Frequency" }],
        correct_answer: "Breaker Failure",
        difficulty: 'medium'
    },
    {
        id: 7,
        category_id: 5,
        question_text: "In the Project 6338 schematics, the SEL-751 trip output does not wire directly to the trip coil (Y1). It goes through an intermediate component for isolation and supervision. What is this component?",
        type: 'multiple_choice',
        options: [{ text: "A current transformer (CT)" }, { text: "An interposing relay (K1)" }, { text: "A selector switch (S1)" }, { text: "A Fortress interlock (KF2)" }],
        correct_answer: "An interposing relay (K1)",
        difficulty: 'hard'
    },
    {
        id: 8,
        category_id: 5,
        question_text: "Based on the provided schematics, which digital input on the SEL-751 (Slot D) is used to monitor if the Earth Switch (E/SW-01) is in the closed position?",
        question_image_url: 'https://placehold.co/600x400.png?text=Interlock+Logic+Diagram',
        type: 'multiple_choice',
        options: [{ text: "IN401 (D01)" }, { text: "IN404 (D04)" }, { text: "IN407 (D07)" }, { text: "IN414 (D14)" }],
        correct_answer: "IN407 (D07)",
        difficulty: 'hard'
    },
    {
        id: 9,
        category_id: 5,
        question_text: "What is the primary and most critical protection function of the SEL-787 relay (EPR02) as used in Project 6338?",
        type: 'multiple_choice',
        options: [{ text: "Feeder Overcurrent (50/51)" }, { text: "Transformer Differential (87T)" }, { text: "Arc Flash Detection (AFD)" }, { text: "Breaker Failure (50BF)" }],
        correct_answer: "Transformer Differential (87T)",
        difficulty: 'medium'
    },
    {
        id: 10,
        category_id: 5,
        question_text: "For the SEL-787 (EPR02) to perform differential protection correctly, it needs current inputs from both sides of the transformer. What is the CT ratio on the 33kV PRIMARY side of the 8.9MVA transformer?",
        type: 'multiple_choice',
        options: [{ text: "250/1A" }, { text: "200/1A" }, { text: "4000/1A" }, { text: "100/1A" }],
        correct_answer: "4000/1A",
        difficulty: 'hard'
    },
    {
        id: 11,
        category_id: 5,
        question_text: "An SEL-787 trips on differential (87T) immediately upon transformer energization with no load. What is the most probable cause of this maloperation?",
        type: 'multiple_choice',
        options: [{ text: "The transformer has an internal fault" }, { text: "VT fuse is blown" }, { text: "Incorrect CT polarity on one or both windings" }, { text: "Harmonic restraint setting is too high" }],
        correct_answer: "Incorrect CT polarity on one or both windings",
        difficulty: 'hard'
    },
    {
        id: 12,
        category_id: 5,
        question_text: "The SEL-735 Power Meter (PM01) is described as 'revenue-grade'. What does this primarily refer to?",
        type: 'multiple_choice',
        options: [{ text: "Its ability to generate revenue reports" }, { text: "Its high level of accuracy for billing purposes" }, { text: "Its compatibility with revenue collection software" }, { text: "Its low power consumption" }],
        correct_answer: "Its high level of accuracy for billing purposes",
        difficulty: 'medium'
    },
    {
        id: 13,
        category_id: 5,
        question_text: "What does THD, a measurement provided by the SEL-735, stand for?",
        type: 'multiple_choice',
        options: [{ text: "Total Harmonic Distortion" }, { text: "Thermal Heat Dissipation" }, { text: "Transformer High-side Disconnect" }, { text: "Time-based Hysteresis Damping" }],
        correct_answer: "Total Harmonic Distortion",
        difficulty: 'medium'
    },
    {
        id: 14,
        category_id: 5,
        question_text: "Arc Flash Detection (AFD) is a critical safety feature on the SEL-751 relay. Its main purpose is to protect personnel from injury.",
        type: 'true_false',
        options: [{ text: "True" }, { text: "False" }],
        correct_answer: "True",
        difficulty: 'medium'
    },
    {
        id: 15,
        category_id: 5,
        question_text: "Based on the image of the SEL-751's rear panel, the digital inputs for monitoring equipment status like breaker and switch positions are located on which slot?",
        question_image_url: 'https://placehold.co/600x400.png?text=SEL-751+Rear+Panel',
        type: 'multiple_choice',
        options: [{ text: "Slot A" }, { text: "Slot B" }, { text: "Slot C" }, { text: "Slot D" }],
        correct_answer: "Slot D",
        difficulty: 'easy'
    },
    {
        id: 16,
        category_id: 5,
        question_text: "According to the schematics, which input on the SEL-751's I/O Module (Slot D) is designated for monitoring the 'GCB Open' status?",
        type: 'multiple_choice',
        options: [
            { text: 'IN401 (D01)' },
            { text: 'IN402 (D02)' },
            { text: 'IN403 (D03)' },
            { text: 'IN404 (D04)' }
        ],
        correct_answer: 'IN401 (D01)',
        difficulty: 'medium'
    },
    {
        id: 17,
        category_id: 5,
        question_text: "To confirm that a disconnector is safely closed, which pin on the SEL-751's Slot D input module would you check?",
        type: 'multiple_choice',
        options: [
            { text: 'D04 (IN404)' },
            { text: 'D05 (IN405)' },
            { text: 'D06 (IN406)' },
            { text: 'D07 (IN407)' }
        ],
        correct_answer: 'D05 (IN405)',
        difficulty: 'medium'
    },
    {
        id: 18,
        category_id: 5,
        question_text: "Which output pin on the SEL-751's Control Module (Slot C) would a protection engineer typically configure to send a 'Close' command to the Gas Circuit Breaker (GCB)?",
        question_image_url: 'https://placehold.co/600x400.png?text=Slot+C+Control+Module',
        type: 'multiple_choice',
        options: [
            { text: 'OUT301 (C01)' },
            { text: 'IN301 (C09)' },
            { text: 'IN402 (D02)' },
            { text: 'OUT101 (A01)' }
        ],
        correct_answer: 'OUT301 (C01)',
        difficulty: 'hard'
    },
    {
        id: 19,
        category_id: 5,
        question_text: "What is the primary functional difference between the SEL-751's Slot C (Control Module) and Slot D (Input Module)?",
        type: 'multiple_choice',
        options: [
            { text: 'Slot C is for communications, while Slot D is for power.' },
            { text: 'Slot C has outputs for actions (e.g., close/trip), while Slot D is mainly for monitoring status inputs.' },
            { text: 'Slot D has outputs for actions, while Slot C is for monitoring status inputs.' },
            { text: 'Slot C is for CT/VT inputs, while Slot D is for digital inputs.' }
        ],
        correct_answer: 'Slot C has outputs for actions (e.g., close/trip), while Slot D is mainly for monitoring status inputs.',
        difficulty: 'easy'
    },
    {
        id: 20,
        category_id: 5,
        question_text: "A remote SCADA system needs to send a signal to the SEL-751 to initiate a trip. Which input on the Control Module (Slot C) is most suitable for receiving this type of external command?",
        type: 'multiple_choice',
        options: [
            { text: 'IN302 (C11)' },
            { text: 'OUT302 (C03)' },
            { text: 'IN408 (D08)' },
            { text: 'A dedicated communication port' }
        ],
        correct_answer: 'IN302 (C11)',
        difficulty: 'hard'
    }
];

const SEED_QUIZ_RESULTS: QuizResult[] = [
    { id: 1, userId: 3, userName: 'dusty', quizDate: new Date(Date.now() - 86400000).toISOString(), score: 8, totalQuestions: 10, percentage: 80, categories: ['MCB', 'Relay'] },
    { id: 2, userId: 4, userName: 'saul', quizDate: new Date(Date.now() - 172800000).toISOString(), score: 4, totalQuestions: 5, percentage: 80, categories: ['Switch'] },
    { id: 3, userId: 3, userName: 'dusty', quizDate: new Date().toISOString(), score: 9, totalQuestions: 10, percentage: 90, categories: ['Current Transformer'] },
];


const SEED_STUDY_MATERIALS: StudyMaterial[] = []; // Start with none

// --- LOCALSTORAGE HELPERS ---

const getFromStorage = <T>(key: string, seedData: T[]): T[] => {
  try {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    } else {
      localStorage.setItem(key, JSON.stringify(seedData));
      return seedData;
    }
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error);
    return seedData;
  }
};

const saveToStorage = <T>(key: string, data: T[]): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Initialize data
const DB_KEYS = {
    USERS: 'db_users',
    COMPONENTS: 'db_components',
    QUIZ_CATEGORIES: 'db_quiz_categories',
    QUESTIONS: 'db_questions',
    STUDY_MATERIALS: 'db_study_materials',
    QUIZ_RESULTS: 'db_quiz_results',
};

// This function can be called once to ensure storage is seeded.
const initDB = () => {
    getFromStorage(DB_KEYS.USERS, SEED_USERS);
    getFromStorage(DB_KEYS.COMPONENTS, SEED_COMPONENTS);
    getFromStorage(DB_KEYS.QUIZ_CATEGORIES, SEED_QUIZ_CATEGORIES);
    getFromStorage(DB_KEYS.QUESTIONS, SEED_QUESTIONS);
    getFromStorage(DB_KEYS.STUDY_MATERIALS, SEED_STUDY_MATERIALS);
    getFromStorage(DB_KEYS.QUIZ_RESULTS, SEED_QUIZ_RESULTS);
};

initDB(); // Run on script load

// --- API IMPLEMENTATION ---

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const api = {
  // --- User Management ---
  async getUsers(): Promise<User[]> {
    await delay(200);
    return getFromStorage(DB_KEYS.USERS, SEED_USERS);
  },

  async getUserByEmail(email: string): Promise<User | undefined> {
    await delay(200);
    const users = getFromStorage<User>(DB_KEYS.USERS, SEED_USERS);
    return users.find(u => u.email === email);
  },
  
  async findUserByName(name: string): Promise<User | undefined> {
    await delay(200);
    const users = getFromStorage<User>(DB_KEYS.USERS, SEED_USERS);
    return users.find(u => u.name === name);
  },

  async addUser(user: Omit<User, 'id'>): Promise<User> {
    await delay(500);
    const users = getFromStorage<User>(DB_KEYS.USERS, SEED_USERS);
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const newUser: User = { ...user, id: newId };
    users.push(newUser);
    saveToStorage(DB_KEYS.USERS, users);
    return newUser;
  },

  async updateUserRole(id: number, role: 'admin' | 'user'): Promise<User | undefined> {
    await delay(300);
    const users = getFromStorage<User>(DB_KEYS.USERS, SEED_USERS);
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex > -1) {
      users[userIndex].role = role;
      saveToStorage(DB_KEYS.USERS, users);
      return users[userIndex];
    }
    return undefined;
  },
  
  // --- Component Management ---
  async getComponents(): Promise<ComponentData[]> {
    await delay(300);
    return getFromStorage(DB_KEYS.COMPONENTS, SEED_COMPONENTS);
  },

  async getComponent(id: number): Promise<ComponentData | undefined> {
    await delay(200);
    const components = getFromStorage<ComponentData>(DB_KEYS.COMPONENTS, SEED_COMPONENTS);
    return components.find(c => c.id === id);
  },
  
  async addComponent(component: Omit<ComponentData, 'id'>): Promise<ComponentData> {
      await delay(500);
      const components = getFromStorage<ComponentData>(DB_KEYS.COMPONENTS, SEED_COMPONENTS);
      const newId = components.length > 0 ? Math.max(...components.map(c => c.id)) + 1 : 1;
      const newComponent: ComponentData = { 
          ...component, 
          id: newId, 
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
      };
      components.push(newComponent);
      saveToStorage(DB_KEYS.COMPONENTS, components);
      return newComponent;
  },

  async updateComponent(id: number, data: Partial<ComponentData>): Promise<ComponentData | undefined> {
      await delay(500);
      const components = getFromStorage<ComponentData>(DB_KEYS.COMPONENTS, SEED_COMPONENTS);
      const componentIndex = components.findIndex(c => c.id === id);
      if (componentIndex > -1) {
          components[componentIndex] = { ...components[componentIndex], ...data, updated_at: new Date().toISOString() };
          saveToStorage(DB_KEYS.COMPONENTS, components);
          return components[componentIndex];
      }
      return undefined;
  },

  async deleteComponent(id: number): Promise<void> {
      await delay(400);
      let components = getFromStorage<ComponentData>(DB_KEYS.COMPONENTS, SEED_COMPONENTS);
      components = components.filter(c => c.id !== id);
      saveToStorage(DB_KEYS.COMPONENTS, components);
  },

  async importComponents(data: ComponentImportData[]): Promise<number> {
      await delay(1000);
      const components = getFromStorage<ComponentData>(DB_KEYS.COMPONENTS, SEED_COMPONENTS);
      const existingCodes = new Set(components.map(c => c.item_code));
      let newId = components.length > 0 ? Math.max(...components.map(c => c.id)) + 1 : 1;
      let count = 0;

      data.forEach(item => {
          if (!existingCodes.has(item.item_code)) {
              const newComponent: ComponentData = {
                  ...item,
                  id: newId++,
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
              };
              components.push(newComponent);
              existingCodes.add(item.item_code);
              count++;
          }
      });
      saveToStorage(DB_KEYS.COMPONENTS, components);
      return count;
  },
  
  // --- Quiz Management ---
  async getQuestions(): Promise<QuizQuestion[]> {
      await delay(300);
      return getFromStorage(DB_KEYS.QUESTIONS, SEED_QUESTIONS);
  },
  
  async getQuizCategories(): Promise<QuizCategory[]> {
      await delay(200);
      return getFromStorage(DB_KEYS.QUIZ_CATEGORIES, SEED_QUIZ_CATEGORIES);
  },

  async addQuizCategory(category: Omit<QuizCategory, 'id'>): Promise<QuizCategory> {
    await delay(300);
    const categories = getFromStorage<QuizCategory>(DB_KEYS.QUIZ_CATEGORIES, SEED_QUIZ_CATEGORIES);
    const newId = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;
    const newCategory = { ...category, id: newId };
    categories.push(newCategory);
    saveToStorage(DB_KEYS.QUIZ_CATEGORIES, categories);
    return newCategory;
  },
  
  async updateQuizCategory(id: number, data: Partial<QuizCategory>): Promise<QuizCategory | undefined> {
    await delay(300);
    const categories = getFromStorage<QuizCategory>(DB_KEYS.QUIZ_CATEGORIES, SEED_QUIZ_CATEGORIES);
    const catIndex = categories.findIndex(c => c.id === id);
    if(catIndex > -1) {
        categories[catIndex] = { ...categories[catIndex], ...data };
        saveToStorage(DB_KEYS.QUIZ_CATEGORIES, categories);
        return categories[catIndex];
    }
    return undefined;
  },
  
  async deleteQuizCategory(id: number): Promise<void> {
    await delay(400);
    let categories = getFromStorage<QuizCategory>(DB_KEYS.QUIZ_CATEGORIES, SEED_QUIZ_CATEGORIES);
    categories = categories.filter(c => c.id !== id);
    saveToStorage(DB_KEYS.QUIZ_CATEGORIES, categories);
    // Also delete questions associated with this category
    let questions = getFromStorage<QuizQuestion>(DB_KEYS.QUESTIONS, SEED_QUESTIONS);
    questions = questions.filter(q => q.category_id !== id);
    saveToStorage(DB_KEYS.QUESTIONS, questions);
  },
  
  async importQuestions(data: QuizImportData[]): Promise<number> {
    await delay(1000);
    const questions = getFromStorage<QuizQuestion>(DB_KEYS.QUESTIONS, SEED_QUESTIONS);
    const categories = getFromStorage<QuizCategory>(DB_KEYS.QUIZ_CATEGORIES, SEED_QUIZ_CATEGORIES);
    const categoryMap = new Map(categories.map(c => [c.name, c.id]));
    let newId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1;
    let count = 0;

    data.forEach(item => {
        const category_id = categoryMap.get(item.category);
        if (category_id) {
            const options: QuizOption[] = [{ text: item.option1 }];
            if(item.option2) options.push({ text: item.option2 });
            if(item.option3) options.push({ text: item.option3 });
            if(item.option4) options.push({ text: item.option4 });

            let correct_answer = item.correct_answer;
            if (item.correct_answer === 'option1') correct_answer = item.option1;
            else if (item.correct_answer === 'option2') correct_answer = item.option2;
            else if (item.correct_answer === 'option3') correct_answer = item.option3 || '';
            else if (item.correct_answer === 'option4') correct_answer = item.option4 || '';

            const newQuestion: QuizQuestion = {
                id: newId++,
                category_id,
                question_text: item.question_text,
                question_image_url: item.question_image_url,
                type: item.type,
                options,
                correct_answer,
                difficulty: item.difficulty || 'medium',
            };
            questions.push(newQuestion);
            count++;
        }
    });

    saveToStorage(DB_KEYS.QUESTIONS, questions);
    return count;
  },

  async addQuestionsBatch(newQuestions: Omit<QuizQuestion, 'id'>[]): Promise<void> {
    await delay(800);
    const questions = getFromStorage<QuizQuestion>(DB_KEYS.QUESTIONS, SEED_QUESTIONS);
    let newId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1;
    
    newQuestions.forEach(q => {
      questions.push({ ...q, id: newId++ });
    });

    saveToStorage(DB_KEYS.QUESTIONS, questions);
  },

  async addQuizQuestion(question: Omit<QuizQuestion, 'id'>): Promise<QuizQuestion> {
    await delay(500);
    const questions = getFromStorage<QuizQuestion>(DB_KEYS.QUESTIONS, SEED_QUESTIONS);
    const newId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1;
    const newQuestion: QuizQuestion = { ...question, id: newId };
    questions.push(newQuestion);
    saveToStorage(DB_KEYS.QUESTIONS, questions);
    return newQuestion;
  },
  
  async getQuizResults(): Promise<QuizResult[]> {
    await delay(400);
    return getFromStorage(DB_KEYS.QUIZ_RESULTS, SEED_QUIZ_RESULTS);
  },

  async addQuizResult(result: QuizResultData): Promise<QuizResult> {
    await delay(300);
    const results = getFromStorage<QuizResult>(DB_KEYS.QUIZ_RESULTS, SEED_QUIZ_RESULTS);
    const newId = results.length > 0 ? Math.max(...results.map(r => r.id)) + 1 : 1;
    const newResult = { ...result, id: newId };
    results.push(newResult);
    saveToStorage(DB_KEYS.QUIZ_RESULTS, results);
    return newResult;
  },


  // --- Study Materials ---
  async getStudyMaterials(): Promise<StudyMaterial[]> {
    await delay(200);
    return getFromStorage(DB_KEYS.STUDY_MATERIALS, SEED_STUDY_MATERIALS);
  },

  async addStudyMaterial(material: Omit<StudyMaterial, 'id'>): Promise<StudyMaterial> {
    await delay(600);
    const materials = getFromStorage<StudyMaterial>(DB_KEYS.STUDY_MATERIALS, SEED_STUDY_MATERIALS);
    const newId = materials.length > 0 ? Math.max(...materials.map(m => m.id)) + 1 : 1;
    const newMaterial = { ...material, id: newId };
    materials.push(newMaterial);
    saveToStorage(DB_KEYS.STUDY_MATERIALS, materials);
    return newMaterial;
  },

  async deleteStudyMaterial(id: number): Promise<void> {
    await delay(300);
    let materials = getFromStorage<StudyMaterial>(DB_KEYS.STUDY_MATERIALS, SEED_STUDY_MATERIALS);
    materials = materials.filter(m => m.id !== id);
    saveToStorage(DB_KEYS.STUDY_MATERIALS, materials);
  },
};

export { api };