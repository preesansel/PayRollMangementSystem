import { 
    getCurrentFinancialYear, 
    generateFinancialYears, 
    generateMonths, 
    generateForCurrentFinancialYear, 
    generateForOtherFinancialYears, 
    getMonthsInFinancialYear 
} from './financialUtility';

// describe('Financial Utilities', () => {
//     beforeEach(() => {
//         jest.clearAllMocks();
//     });
// });
describe('getMonthsInFinancialYear', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers(); // Enable fake timers
    });

    afterEach(() => {
        jest.useRealTimers(); // Restore real timers
    });


    describe('getCurrentFinancialYear', () => {
        test('returns correct financial year when current month is April or later', () => {
            const date = new Date('2024-05-01');
            jest.setSystemTime(date);
            expect(getCurrentFinancialYear()).toBe('2024-2025');
        });

        test('returns correct financial year when current month is before April', () => {
            const date = new Date('2022-03-01');
            jest.setSystemTime(date);
            expect(getCurrentFinancialYear()).toBe('2021-2022');
        });
    });
    describe('getCurrentFinancialYear', () => {
        test('returns correct financial year when current month is April or later', () => {
            const date = new Date('2024-05-01');
            jest.spyOn(global, 'Date').mockImplementation(() => date);
            expect(getCurrentFinancialYear()).toBe('2024-2025');
            jest.restoreAllMocks();  // Reset Date to original implementation
        });

        test('returns correct financial year when current month is before April', () => {
            const date = new Date('2022-03-01');
            jest.spyOn(global, 'Date').mockImplementation(() => date);
            expect(getCurrentFinancialYear()).toBe('2021-2022');
            jest.restoreAllMocks();  // Reset Date to original implementation
        });
    });
  


    describe('generateFinancialYears', () => {
        test('returns correct financial years for joining date in April or later', () => {
            const joiningDate = '2022-05-01';
            const expectedYears = ['2022-2023', '2023-2024', '2024-2025'];
            expect(generateFinancialYears(joiningDate)).toEqual(expectedYears);
        });

        test('returns correct financial years for joining date before April', () => {
            const joiningDate = '2022-03-01';
            const expectedYears = ['2021-2022', '2022-2023', '2023-2024', '2024-2025'];
            expect(generateFinancialYears(joiningDate)).toEqual(expectedYears);
        });
    });

    describe('generateForCurrentFinancialYear', () => {
        test('generates months from joining month to current month for same financial year', () => {
            const startYear = 2022;
            const endYear = 2023;
            const currentMonth = 6; // June
            const joiningYear = 2022;
            const joiningMonth = 5; // May

            const result = generateForCurrentFinancialYear(startYear, endYear, currentMonth, joiningYear, joiningMonth);

            const expected = [
                { month: 5, year: 2022 },
              
            ];

            expect(result).toEqual(expected);
        });

        test('generates months from January to current month for the same financial year when joined in end year', () => {
            const startYear = 2022;
            const endYear = 2023;
            const currentMonth = 3; // June
            const joiningYear = 2023;
            const joiningMonth = 1; // March

            const result = generateForCurrentFinancialYear(startYear, endYear, currentMonth, joiningYear, joiningMonth);

            const expected = [
             
                { month: 1, year: 2023 },
                { month: 2, year: 2023 },
               
            ];

            expect(result).toEqual(expected);
        });

        // test('generates months from April to December and from January to current month for a new financial year', () => {
        //     const startYear = 2022;
        //     const endYear = 2023;
        //     const currentMonth = 2; // February
        //     const joiningYear = 2022;
        //     const joiningMonth = 5; // May

        //     const result = generateForCurrentFinancialYear(startYear, endYear, currentMonth, joiningYear, joiningMonth);

        //     const expected = [
        //         { month: 5, year: 2022 },
        //         { month: 6, year: 2022 },
        //         { month: 7, year: 2022 },
        //         { month: 8, year: 2022 },
        //         { month: 9, year: 2022 },
        //         { month: 10, year: 2022 },
        //         { month: 11, year: 2022 },
        //         { month: 12, year: 2022 },
        //         { month: 1, year: 2023 },
               
        //     ];

        //     expect(result).toEqual(expected);
        // });

        test('filters out months before joining month in the same financial year', () => {
            const startYear = 2022;
            const endYear = 2023;
            const currentMonth = 6; // June
            const joiningYear = 2022;
            const joiningMonth = 5; // May

            const result = generateForCurrentFinancialYear(startYear, endYear, currentMonth, joiningYear, joiningMonth);

            const expected = [
                { month: 5, year: 2022 },
                
            ];

            expect(result).toEqual(expected);
        });
    });

    describe('generateForOtherFinancialYears', () => {
        test('generates months from joining month to December for start year', () => {
            const startYear = 2022;
            const endYear = 2023;
            const joiningYear = 2022;
            const joiningMonth = 5; // May

            const result = generateForOtherFinancialYears(startYear, endYear, joiningYear, joiningMonth);

            const expected = [
                { month: 5, year: 2022 },
                { month: 6, year: 2022 },
                { month: 7, year: 2022 },
                { month: 8, year: 2022 },
                { month: 9, year: 2022 },
                { month: 10, year: 2022 },
                { month: 11, year: 2022 },
                { month: 12, year: 2022 }
            ];

            expect(result).toEqual(expected);
        });

        // test('generates months from January to March for end year when joined in end year', () => {
        //     const startYear = 2022;
        //     const endYear = 2023;
        //     const joiningYear = 2023;
        //     const joiningMonth = 3; // March

        //     const result = generateForOtherFinancialYears(startYear, endYear, joiningYear, joiningMonth);

        //     const expected = [
              
        //         { month: 1, year: 2023 },
        //         { month: 2, year: 2023 },
        //         { month: 3, year: 2023 },
        //     ];

        //     expect(result).toEqual(expected);
        // });

        test('generates months for the entire financial year when joined before start year', () => {
            const startYear = 2022;
            const endYear = 2023;
            const joiningYear = 2021;
            const joiningMonth = 1; // January

            const result = generateForOtherFinancialYears(startYear, endYear, joiningYear, joiningMonth);

            const expected = [
                { month: 4, year: 2022 },
                { month: 5, year: 2022 },
                { month: 6, year: 2022 },
                { month: 7, year: 2022 },
                { month: 8, year: 2022 },
                { month: 9, year: 2022 },
                { month: 10, year: 2022 },
                { month: 11, year: 2022 },
                { month: 12, year: 2022 },
                { month: 1, year: 2023 },
                { month: 2, year: 2023 },
                { month: 3, year: 2023 }
            ];

            expect(result).toEqual(expected);
        });
    });

    describe('getMonthsInFinancialYear', () => {
        test('returns correct months for current financial year starting from April with joining date in the same year', () => {
            const financialYear = '2022-2023';
            const joiningDate = '2022-05-01';
            const currentDate = new Date('2022-06-15');
            jest.setSystemTime(currentDate);

            const result = getMonthsInFinancialYear(financialYear, joiningDate);
            const expected = [
                { month: 5, year: 2022 },
            ];

            expect(result).toEqual(expected);
        });

        test('returns correct months for current financial year starting from January with joining date in the same year', () => {
            const financialYear = '2022-2023';
            const joiningDate = '2023-01-01';
            const currentDate = new Date('2023-06-15');
            jest.setSystemTime(currentDate);

            const result = getMonthsInFinancialYear(financialYear, joiningDate);
            const expected = [
                { month: 1, year: 2023 },
                { month: 2, year: 2023 },
                { month: 3, year: 2023 },
            ];

            expect(result).toEqual(expected);
        });

        // test('returns correct months for other financial year starting from joining month in April', () => {
        //     const financialYear = '2021-2022';
        //     const joiningDate = '2021-05-01';
        //     const currentDate = new Date('2022-06-15');
        //     jest.setSystemTime(currentDate);

        //     const result = getMonthsInFinancialYear(financialYear, joiningDate);
        //     const expected = [
        //         { month: 5, year: 2021 },
        //         { month: 6, year: 2021 },
        //         { month: 7, year: 2021 },
        //         { month: 8, year: 2021 },
        //         { month: 9, year: 2021 },
        //         { month: 10, year: 2021 },
        //         { month: 11, year: 2021 },
        //         { month: 12, year: 2021 },
        //         { month: 1, year: 2022 },
        //         { month: 2, year: 2022 },
        //         { month: 3, year: 2022 }
        //     ];

        //     expect(result).toEqual(expected);
        // });

        test('returns correct months for other financial year starting from joining month in January', () => {
            const financialYear = '2021-2022';
            const joiningDate = '2022-01-01';
            const currentDate = new Date('2022-06-15');
            jest.setSystemTime(currentDate);

            const result = getMonthsInFinancialYear(financialYear, joiningDate);
            const expected = [
                { month: 1, year: 2022 },
                { month: 2, year: 2022 },
                { month: 3, year: 2022 }
            ];

            expect(result).toEqual(expected);
        });

        test('returns correct months for a full financial year when joined before the start year', () => {
            const financialYear = '2021-2022';
            const joiningDate = '2020-01-01';
            const currentDate = new Date('2022-06-15');
            jest.setSystemTime(currentDate);

            const result = getMonthsInFinancialYear(financialYear, joiningDate);
            const expected = [
                { month: 4, year: 2021 },
                { month: 5, year: 2021 },
                { month: 6, year: 2021 },
                { month: 7, year: 2021 },
                { month: 8, year: 2021 },
                { month: 9, year: 2021 },
                { month: 10, year: 2021 },
                { month: 11, year: 2021 },
                { month: 12, year: 2021 },
                { month: 1, year: 2022 },
                { month: 2, year: 2022 },
                { month: 3, year: 2022 }
            ];

            expect(result).toEqual(expected);
        });
    });

});