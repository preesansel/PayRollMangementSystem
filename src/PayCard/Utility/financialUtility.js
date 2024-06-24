// Utility function to get the current financial year
export const getCurrentFinancialYear = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    return month >= 4 ? `${year}-${year + 1}` : `${year - 1}-${year}`;
};

// Utility function to generate financial years from the joining date to the current year + 1
export const generateFinancialYears = (joiningDate) => {
    const currentYear = new Date().getFullYear();
    const startYear = new Date(joiningDate).getFullYear();
    const startMonth = new Date(joiningDate).getMonth() + 1;

    const years = [];
    for (let year = startYear; year <= currentYear + 1; year++) {
        if (year === startYear && startMonth >= 4) {
            years.push(`${year}-${year + 1}`);
        } else if (year !== startYear || (year === startYear && startMonth < 4)) {
            years.push(`${year - 1}-${year}`);
        }
    }
    return [...new Set(years)]; // Ensure there are no duplicate years
};

// Utility function to map to month and year
export const mapToMonthYear = (start, year) => (_, i) => ({ month: i + start, year });

// Utility function to generate months
export const generateMonths = (start, end, year) =>
    Array.from({ length: end - start + 1 }, mapToMonthYear(start, year));

// Function to generate months for the current financial year
export const generateForCurrentFinancialYear = (startYear, endYear, currentMonth, joiningYear, joiningMonth) => {
    const limitMonth = currentMonth - 1;
    if (joiningYear === startYear && joiningMonth >= 4) {
        return generateMonths(joiningMonth, limitMonth, startYear);
    }
    if (joiningYear === endYear && joiningMonth < 4) {
        return generateMonths(1, limitMonth, endYear);
    }
    return [
        ...generateMonths(4, limitMonth >= 4 ? limitMonth : 12, startYear),
        ...(limitMonth < 4 ? generateMonths(1, limitMonth, endYear) : [])
    ].filter(({ month, year }) => year !== joiningYear || month >= joiningMonth);
};

// Function to generate months for other financial years
export const generateForOtherFinancialYears = (startYear, endYear, joiningYear, joiningMonth) => {
    if (joiningYear === startYear && joiningMonth >= 4) {
        return generateMonths(joiningMonth, 12, startYear);
    }
    if (joiningYear === endYear && joiningMonth < 4) {
        return generateMonths(joiningMonth, 3, endYear);
    }
    return [
        ...generateMonths(4, 12, startYear),
        ...generateMonths(1, 3, endYear)
    ].filter(({ month, year }) => year !== joiningYear || month >= joiningMonth);
};

// Main function to get months in a financial year based on the joining date
export const getMonthsInFinancialYear = (financialYear, joiningDate) => {
    const [startYear, endYear] = financialYear.split('-').map(Number);
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const joiningDateObj = new Date(joiningDate);
    const joiningYear = joiningDateObj.getFullYear();
    const joiningMonth = joiningDateObj.getMonth() + 1;

    const isCurrentFinancialYear = financialYear === getCurrentFinancialYear();
    let months = [];

    months = isCurrentFinancialYear 
        ? generateForCurrentFinancialYear(startYear, endYear, currentMonth, joiningYear, joiningMonth) 
        : generateForOtherFinancialYears(startYear, endYear, joiningYear, joiningMonth);

    return months;
};
