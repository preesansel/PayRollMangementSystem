import { formatCurrency, handleDownloadPdf, getFormattedMonthYear, convertToWords } from './payslipBrillio';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import numberToWords from 'number-to-words';




jest.mock('jspdf');
jest.mock('html2canvas');
jest.mock('number-to-words');

describe('PayslipBrillio utility functions', () => {
    describe('formatCurrency', () => {
        it('should format the number to Indian currency format', () => {
            expect(formatCurrency(1234567.89)).toBe('12,34,567.89');
        });
    });

    describe('getFormattedMonthYear', () => {
        it('should return the formatted month and year', () => {
            const month = 6;
            const year = 2024;
            expect(getFormattedMonthYear(month, year)).toBe('June 2024');
        });

        it('should handle single-digit months correctly', () => {
            const month = 1;
            const year = 2024;
            expect(getFormattedMonthYear(month, year)).toBe('January 2024');
        });

        it('should handle December correctly', () => {
            const month = 12;
            const year = 2024;
            expect(getFormattedMonthYear(month, year)).toBe('December 2024');
        });
    });

    describe('convertToWords', () => {
        it('should convert number to words and capitalize first letter of each word', () => {
            numberToWords.toWords.mockReturnValue('one thousand two hundred thirty-four');
            expect(convertToWords(1234)).toBe('One Thousand Two Hundred Thirty-Four Only');
        });
    });

    describe('handleDownloadPdf', () => {
        it('should generate a PDF from the payslip element', async () => {
            document.body.innerHTML = '<div id="payslip">Test Payslip Content</div>';
            const canvasMock = {
                toDataURL: jest.fn().mockReturnValue('data:image/png;base64,'),
                getContext: jest.fn(),
            };
            html2canvas.mockResolvedValue(canvasMock);
            jsPDF.mockImplementation(() => ({
                addImage: jest.fn(),
                save: jest.fn(),
                getImageProperties: jest.fn().mockReturnValue({ width: 100, height: 100 }),
                internal: { pageSize: { getWidth: jest.fn().mockReturnValue(210) } }
            }));

            await handleDownloadPdf();

            expect(html2canvas).toHaveBeenCalledWith(document.getElementById('payslip'));
            expect(jsPDF).toHaveBeenCalled();
            expect(canvasMock.toDataURL).toHaveBeenCalled();
        });
    });
});
