import { ComponentData, ComponentImportData } from '../types';
import { CATEGORIES, PANELS, COMPONENT_COLUMNS } from '../constants';

declare var XLSX: any; // Assuming XLSX is loaded from CDN

export const generateExcelTemplate = (): void => {
  const wb = XLSX.utils.book_new();

  // Sheet 1: Instructions
  const instructions = [
    ['How to use this template'],
    ['1. Do not change the headers in the "Component Data" sheet.'],
    ['2. Fill in the component details starting from row 2.'],
    ['3. "item_code", "name", "category", and "panel" are required fields.'],
    ['4. For "category" and "panel", use the values from the respective sheets.'],
    ['5. Delete the example row before uploading.'],
    [],
    ['Field Descriptions'],
    ['item_code', 'Unique identifier for the component (e.g., F1, K1). REQUIRED.'],
    ['name', 'Full name of the component. REQUIRED.'],
    ['category', 'Component category from the "Category Options" sheet. REQUIRED.'],
    ['panel', 'Panel where the component is located from the "Panel Options" sheet. REQUIRED.'],
    ['technical_specs', 'Use newline characters (Alt+Enter in Excel) for multi-line specs.'],
  ];
  const wsInstructions = XLSX.utils.aoa_to_sheet(instructions);
  wsInstructions['!cols'] = [{ wch: 20 }, { wch: 80 }];
  XLSX.utils.book_append_sheet(wb, wsInstructions, 'Instructions');

  // Sheet 2: Component Data with an example row
  const exampleRow: { [key: string]: any } = {
    item_code: 'F1',
    name: 'MCB 25A, 2 POLE, 6kA, C',
    part_number: '5SY62257CC + 5ST3010',
    rating: '25A, 2P, 6kA',
    category: 'MCB',
    panel: 'H01',
    specifications: '25A, 2 Pole, 6kA breaking capacity',
    technical_specs: 'Rated Current: 25A\nPoles: 2\nBreaking Capacity: 6kA',
    pin_in_details: 'Pin 1: Line Input (L)\nPin 2: Neutral Input (N)',
    pin_out_details: 'Pin 3: Line Output\nPin 4: Neutral Output',
    usage_details: 'Overcurrent protection for lighting circuits.',
    installation_notes: 'Mount on 35mm DIN rail.',
    safety_warnings: '⚠️ De-energize before installation.',
    manufacturer: 'Siemens',
    schematic_image_url: 'https://example.com/f1-schematic.png',
    physical_image_url: 'https://example.com/f1-photo.jpg',
    pinout_image_url: 'https://example.com/f1-pinout.png',
    datasheet_url: 'https://example.com/f1-datasheet.pdf',
    wiring_diagram_url: 'https://example.com/f1-wiring.pdf',
  };
  const wsData = XLSX.utils.json_to_sheet([exampleRow], { header: COMPONENT_COLUMNS });
  XLSX.utils.book_append_sheet(wb, wsData, 'Component Data');

  // Sheet 3: Category Options
  const wsCategories = XLSX.utils.aoa_to_sheet(CATEGORIES.map(c => [c]));
  wsCategories['!cols'] = [{ wch: 30 }];
  XLSX.utils.book_append_sheet(wb, wsCategories, 'Category Options');

  // Sheet 4: Panel Options
  const wsPanels = XLSX.utils.aoa_to_sheet(PANELS.map(p => [p]));
  wsPanels['!cols'] = [{ wch: 20 }];
  XLSX.utils.book_append_sheet(wb, wsPanels, 'Panel Options');

  XLSX.writeFile(wb, 'Component_Import_Template.xlsx');
};

export const parseExcelFile = async (file: File): Promise<ComponentImportData[]> => {
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data, { type: 'array' });
  // Prioritize "Component Data" sheet, but fall back to the first sheet if not found
  const sheetName = workbook.SheetNames.includes('Component Data') ? 'Component Data' : workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  // FIX: Cast the result of the function call instead of using a type argument on an untyped function.
  const jsonData = XLSX.utils.sheet_to_json(worksheet) as ComponentImportData[];
  return jsonData;
};

export const exportComponentsToExcel = (components: ComponentData[]) => {
  const exportData = components.map(c => ({
    'item_code': c.item_code,
    'name': c.name,
    'part_number': c.part_number || '',
    'rating': c.rating || '',
    'category': c.category,
    'panel': c.panel,
    'specifications': c.specifications || '',
    'technical_specs': c.technical_specs || '',
    'pin_in_details': c.pin_in_details || '',
    'pin_out_details': c.pin_out_details || '',
    'usage_details': c.usage_details || '',
    'installation_notes': c.installation_notes || '',
    'safety_warnings': c.safety_warnings || '',
    'manufacturer': c.manufacturer || '',
    'schematic_image_url': c.schematic_image_url || '',
    'physical_image_url': c.physical_image_url || '',
    'pinout_image_url': c.pinout_image_url || '',
    'datasheet_url': c.datasheet_url || '',
    'wiring_diagram_url': c.wiring_diagram_url || ''
  }));

  const ws = XLSX.utils.json_to_sheet(exportData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Components');

  ws['!cols'] = [
    { wch: 15 }, // item_code
    { wch: 40 }, // name
    { wch: 25 }, // part_number
    { wch: 20 }, // rating
    { wch: 20 }, // category
    { wch: 10 }, // panel
    { wch: 50 }, // specifications
    { wch: 50 }, // technical_specs
    { wch: 40 }, // pin_in_details
    { wch: 40 }, // pin_out_details
    { wch: 50 }, // usage_details
    { wch: 40 }, // installation_notes
    { wch: 40 }, // safety_warnings
    { wch: 20 }, // manufacturer
    { wch: 40 }, // schematic_image_url
    { wch: 40 }, // physical_image_url
    { wch: 40 }, // pinout_image_url
    { wch: 40 }, // datasheet_url
    { wch: 40 }, // wiring_diagram_url
  ];

  XLSX.writeFile(wb, `Advance_Mechanix_Components_${new Date().toISOString().split('T')[0]}.xlsx`);
};