import { NextResponse } from 'next/server';
import path from 'path';
import * as XLSX from 'xlsx';
import fs from 'fs';

export const revalidate = 60; // Revalidate every minute

// Default fallback rates
const DEFAULT_RATES = [
    { currency: 'USD', buy: 14600, sell: 14750, trend: 'stable' },
    { currency: 'EUR', buy: 15800, sell: 16000, trend: 'up' },
    { currency: 'SAR', buy: 3890, sell: 3930, trend: 'stable' },
    { currency: 'AED', buy: 3970, sell: 4010, trend: 'down' },
];

// Validate rate data structure
function validateRates(rates: unknown): boolean {
    if (!Array.isArray(rates)) return false;
    return rates.every((rate: unknown) => 
        typeof rate === 'object' &&
        rate !== null &&
        'currency' in rate &&
        'buy' in rate &&
        'sell' in rate
    );
}

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'public', 'rates.xlsx');

        // Check if file exists
        if (!fs.existsSync(filePath)) {
            return NextResponse.json({
                rates: DEFAULT_RATES,
                lastUpdate: new Date().toISOString()
            }, {
                headers: {
                    'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
                }
            });
        }

        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet);

        // Validate data before returning
        if (!validateRates(data)) {
            console.warn('Invalid rates data structure, using defaults');
            return NextResponse.json({
                rates: DEFAULT_RATES,
                lastUpdate: new Date().toISOString()
            });
        }

        return NextResponse.json({
            rates: data,
            lastUpdate: new Date().toISOString()
        }, {
            headers: {
                'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
            }
        });
    } catch (error) {
        console.error('Error reading rates file:', error);
        // Fallback to default data on ANY error
        return NextResponse.json({
            rates: DEFAULT_RATES,
            lastUpdate: new Date().toISOString()
        }, {
            status: 200, // Still return 200 with fallback data
            headers: {
                'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
            }
        });
    }
}
