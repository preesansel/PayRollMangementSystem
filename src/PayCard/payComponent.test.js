import React, { act } from 'react';
import { waitFor, render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PayComponent from './payComponent';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import { getPreviousMonth, formatCurrency, getFormattedMonthYear } from './payComponent';


const mockAxios = new MockAdapter(axios);

const mockEmployeeDetails = {
    employeeId: '1',
    employeeName: 'Anu',
    designation: 'Developer',
    location: 'Chennai',
    uanNo: 'UAN123456',
    pfNo: 'PF123456',
    doj: '2020-01-01',
    panId: 'PAN123456',
    bankName: 'XYZ Bank',
    department: 'IT',
    accountNo: '1234567890'
};

const mockSalaryDetails = {
    basicPay: 50000,
    houseRentAllowance: 20000,
    specialAllowance: 10000,
    grossEarning: 80000,
    epf: 6000,
    incomeTax: 5000,
    professionalTax: 2000,
    grossDeduction: 13000,
    netPay: 67000,
    ytdBasicPay: 600000,
    ytdHouseRentAllowance: 240000,
    ytdSpecialAllowance: 120000,
    ytdEpf: 72000,
    ytdIncomeTax: 60000,
    ytdProfessionalTax: 24000,
    ytdGrossEarnings: 960000,
    ytdGrossDeductions: 130000,
};

jest.mock('react-chartjs-2', () => ({
    Doughnut: () => null,
  }))

const renderComponent = async () => {
    return render(
        <Router>
        <PayComponent empId="1" />
    </Router>
    )
}

describe('PayComponent', () => {
      
    beforeEach(() => {
        mockAxios.reset();
    });

    it('renders PayComponent correctly with initial state', async () => {

        mockAxios.onGet('http://localhost:8882/payroll/employeeDetails/1').reply(200, mockEmployeeDetails);
        mockAxios.onGet('http://localhost:8882/payroll/details').reply(200, mockSalaryDetails);

        const {container} = await renderComponent();
        await act (async () => {
            expect(container).toMatchSnapshot();
        })
        await act (async () => {
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            expect(container.getElementsByClassName("gross-pay").length).toBe(1);
        });
        await act (async () => {
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            expect(container.getElementsByClassName("salary-mask").length).toBe(3);
        })
    });
    
});
      describe('PayComponent utility functions', () => {
    describe('getPreviousMonth', () => {
        it('should return the previous month and year', () => {
            const date = new Date(2024, 5, 15); // June 15, 2024
            jest.spyOn(global, 'Date').mockImplementation(() => date);
            expect(getPreviousMonth()).toEqual({ month: 5, year: 2024 });
            jest.restoreAllMocks();
        });

        it('should handle year transition correctly', () => {
            const date = new Date(2024, 0, 15); // January 15, 2024
            jest.spyOn(global, 'Date').mockImplementation(() => date);
            expect(getPreviousMonth()).toEqual({ month: 12, year: 2023 });
            jest.restoreAllMocks();
        });
    });
});
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