import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
 import '@testing-library/jest-dom/extend-expect';
 import PayHistory from './payHistory';
import { useLocation } from 'react-router-dom';
import { getCurrentFinancialYear, generateFinancialYears, getMonthsInFinancialYear } from './Utility/financialUtility';

// Mock the utility functions
jest.mock('./Utility/financialUtility', () => ({
    getCurrentFinancialYear: jest.fn(),
    generateFinancialYears: jest.fn(),
    getMonthsInFinancialYear: jest.fn(),
}));

// Mock the useLocation hook
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn(),
}));

const mockEmployeeDetails = {
    employeeId: '123',
    doj: '2022-05-01',
};

describe('PayHistory Component', () => {
    beforeEach(() => {
        useLocation.mockReturnValue({
            state: { employeeDetails: mockEmployeeDetails },
        });

        getCurrentFinancialYear.mockReturnValue('2022-2023');
        generateFinancialYears.mockReturnValue(['2022-2023', '2023-2024']);
        getMonthsInFinancialYear.mockReturnValue([
            { month: 5, year: 2022 },
            { month: 6, year: 2022 },
        ]);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.clearAllMocks()
        jest.restoreAllMocks()
    })

    test('renders initial message when no month is selected', () => {
        render(
            <Router>
                <PayHistory />
            </Router>
        );

        // Check for the initial message
        expect(screen.getByText('Select a financial year and month to view the pay details.')).toBeInTheDocument();
    });

    test('renders financial years in the dropdown', () => {
        render(
            <Router>
                <PayHistory />
            </Router>
        );

        const financialYearDropdown = screen.getByLabelText('Financial Year');
        fireEvent.click(financialYearDropdown);
        expect(screen.getByText('2022-2023')).toBeInTheDocument();
        expect(screen.getByText('2023-2024')).toBeInTheDocument();
    });

    test('renders months in the dropdown after selecting a financial year', async () => {
        render(
            <Router>
                <PayHistory />
            </Router>
        );

        const financialYearDropdown = screen.getByLabelText('Financial Year');
        fireEvent.change(financialYearDropdown, { target: { value: '2022-2023' } });

        await waitFor(() => {
            const monthDropdown = screen.getByLabelText('Month');
            fireEvent.click(monthDropdown);
            expect(screen.getByText('May')).toBeInTheDocument();
            expect(screen.getByText('June')).toBeInTheDocument();
        });
    });

    test('renders PayComponent when a month is selected', async () => {
        render(
            <Router>
                <PayHistory />
            </Router>
        );

        const financialYearDropdown = screen.getByLabelText('Financial Year');
        fireEvent.change(financialYearDropdown, { target: { value: '2023-2024' } });

        const monthDropdown = screen.getByLabelText('Month');
        fireEvent.change(monthDropdown, { target: { value: '5' } });

        await waitFor(() => {
            // Check if PayComponent is rendered
            expect(screen.getByText('Pay Info')).toBeInTheDocument();
        });
    });

    test('updates months when changing financial year', async () => {
        getMonthsInFinancialYear.mockReturnValueOnce([
            { month: 7, year: 2022 },
            { month: 8, year: 2022 },
        ]);

        render(
            <Router>
                <PayHistory />
            </Router>
        );

        const financialYearDropdown = screen.getByLabelText('Financial Year');
        fireEvent.change(financialYearDropdown, { target: { value: '2022-2023' } });

        await waitFor(() => {
            const monthDropdown = screen.getByText('Month');
            fireEvent.click(monthDropdown);
            expect(screen.getByText('July')).toBeInTheDocument();
            expect(screen.getByText('August')).toBeInTheDocument();
        });
    });
     
    test('calls handleMonthChange and updates selectedMonth state when a month is selected', () => {
        render(
            <Router>
                <PayHistory />
            </Router>
        );

        const monthDropdown = screen.getByLabelText('Month');
        fireEvent.change(monthDropdown, { target: { value: '5' } });

        // Ensure the month has been selected and handleMonthChange was called
        expect(screen.getByText('May')).toBeInTheDocument()
        
    });
    test('handleFinancialYearChange sets selected financial year and resets selected month', () => {
        render(
            <Router>
                <PayHistory />
            </Router>
        );

        const financialYearDropdown = screen.getByLabelText('Financial Year');
        fireEvent.change(financialYearDropdown, { target: { value: '2023-2024' } });

        expect(screen.getByLabelText('Financial Year')).toHaveValue('2023-2024');
        expect(screen.getByLabelText('Month')).toHaveValue('');
    });

    test('changes the selected month correctly', async () => {
        render(
            <Router>
                <PayHistory />
            </Router>
        );

        const financialYearDropdown = screen.getByLabelText('Financial Year');
        fireEvent.change(financialYearDropdown, { target: { value: '2022-2023' } });

        const monthDropdown = screen.getByLabelText('Month');
        fireEvent.change(monthDropdown, { target: { value: '5' } });

        await waitFor(() => {
            expect(screen.getByText('Pay Info')).toBeInTheDocument();
        });

        fireEvent.change(monthDropdown, { target: { value: '6' } });

        await waitFor(() => {
            expect(screen.getByText('Pay Info')).toBeInTheDocument();
        });
    });
});
