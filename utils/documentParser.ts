import mammoth from 'mammoth';
import { StudyMaterial } from '../types';

declare var XLSX: any; // From CDN

const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
    const binaryString = window.atob(base64.split(',')[1]);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
};

export const parseDocument = async (material: StudyMaterial): Promise<string | null> => {
    try {
        const arrayBuffer = base64ToArrayBuffer(material.content);

        if (material.type === 'word') {
            const result = await mammoth.extractRawText({ arrayBuffer });
            return result.value;
        }
        
        if (material.type === 'excel') {
            const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });
            let fullText = '';
            workbook.SheetNames.forEach((sheetName: string) => {
                const worksheet = workbook.Sheets[sheetName];
                // FIX: Cast the result of the function call instead of using a type argument on an untyped function.
                const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
                data.forEach(row => {
                    fullText += row.join(' ') + '\n';
                });
            });
            return fullText;
        }

        return null;
    } catch (error) {
        console.error("Error parsing document:", error);
        return null;
    }
};