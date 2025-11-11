
import { ComponentImportData } from './types';

export const CATEGORIES = [
  'MCB',
  'Relay',
  'Switch',
  'Current Transformer',
  'Voltage Transformer',
  'Indicator Lamp',
  'Circuit Breaker',
  'Protection Relay',
  'Terminal Block',
  'Earth Switch',
  'Disconnector',
  'Heater',
  'Lighting',
  'Interlock',
  'Miscellaneous'
];

export const PANELS = ['H01', 'H02', 'H03', 'All'];

// FIX: Changed to static import to fix module resolution error.
export const COMPONENT_COLUMNS: (keyof ComponentImportData)[] = [
  'item_code',
  'name',
  'part_number',
  'rating',
  'category',
  'panel',
  'specifications',
  'technical_specs',
  'pin_in_details',
  'pin_out_details',
  'usage_details',
  'installation_notes',
  'safety_warnings',
  'manufacturer',
  'schematic_image_url',
  'physical_image_url',
  'pinout_image_url',
  'datasheet_url',
  'wiring_diagram_url',
];
