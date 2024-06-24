import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import PayHistory from './payHistory';


const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
    useLocation: () => ({
        state: {
            employeeDetails :{
                "employeeId": 1,
                "employeeName": "John Doe",
                "designation": "Software Engineer",
                "doj": "2024-01-15",
                "panId": "ABCDE1234F",
                "department": "IT",
                "location": "New York",
                "uanNo": "UAN001",
                "pfNo": "PF001",
                "bankName": "Bank of America",
                "accountNo": "John Doe Account"
            }
        }
    }),
}));
describe('PayHistory', () => {
    test('renders PayHistory component', () => {
        render(
            <Router>
                <PayHistory />
            </Router>
        );
 
        // Check for the heading
        expect(screen.getByText('Pay Info')).toBeInTheDocument();
 
        // Check for the regime options
        expect(screen.getByText('Select a financial year and month to view the pay details.')).toBeInTheDocument();
    });
});

// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import { BrowserRouter as Router } from 'react-router-dom';
// import '@testing-library/jest-dom/extend-expect';
// import PayHistory from './payHistory';
// import { useLocation } from 'react-router-dom';
// import { getCurrentFinancialYear, generateFinancialYears, getMonthsInFinancialYear } from './Utility/financialUtility';

// // Mock the utility functions
// jest.mock('./Utility/financialUtility', () => ({
//     getCurrentFinancialYear: jest.fn(),
//     generateFinancialYears: jest.fn(),
//     getMonthsInFinancialYear: jest.fn(),
// }));

// // Mock the useLocation hook
// jest.mock('react-router-dom', () => ({
//     ...jest.requireActual('react-router-dom'),
//     useLocation: jest.fn(),
// }));

// const mockEmployeeDetails = {
//     employeeId: '123',
//     doj: '2022-05-01',
// };

// describe('PayHistory Component', () => {
//     beforeEach(() => {
//         useLocation.mockReturnValue({
//             state: { employeeDetails: mockEmployeeDetails },
//         });

//         getCurrentFinancialYear.mockReturnValue('2022-2023');
//         generateFinancialYears.mockReturnValue(['2022-2023', '2023-2024']);
//         getMonthsInFinancialYear.mockReturnValue([
//             { month: 5, year: 2022 },
//             { month: 6, year: 2022 },
//         ]);
//     });

//     afterEach(() => {
//         jest.clearAllMocks();
//     });

//     test('renders PayHistory component correctly', () => {
//         render(
//             <Router>
//                 <PayHistory />
//             </Router>
//         );

//         // Check for the heading
//         expect(screen.getByText('Pay Info')).toBeInTheDocument();

//         // Check for the initial message
//         expect(screen.getByText('Select a financial year and month to view the pay details.')).toBeInTheDocument();

//         // Check for the financial year dropdown
//         expect(screen.getByLabelText('Financial Year')).toBeInTheDocument();
//     });

//     test('displays financial years in the dropdown', () => {
//         render(
//             <Router>
//                 <PayHistory />
//             </Router>
//         );

//         const financialYearDropdown = screen.getByLabelText('Financial Year');
//         fireEvent.click(financialYearDropdown);
//         expect(screen.getByText('2022-2023')).toBeInTheDocument();
//         expect(screen.getByText('2023-2024')).toBeInTheDocument();
//     });

//     test('displays months in the dropdown after selecting a financial year', async () => {
//         render(
//             <Router>
//                 <PayHistory />
//             </Router>
//         );

//         const financialYearDropdown = screen.getByLabelText('Financial Year');
//         fireEvent.change(financialYearDropdown, { target: { value: '2022-2023' } });

//         await waitFor(() => {
//             const monthDropdown = screen.getByLabelText('Month');
//             fireEvent.click(monthDropdown);
//             expect(screen.getByText('May')).toBeInTheDocument();
//             expect(screen.getByText('June')).toBeInTheDocument();
//         });
//     });

//     test('displays PayComponent after selecting a month', async () => {
//         render(
//             <Router>
//                 <PayHistory />
//             </Router>
//         );

//         const financialYearDropdown = screen.getByLabelText('Financial Year');
//         fireEvent.change(financialYearDropdown, { target: { value: '2022-2023' } });

//         const monthDropdown = screen.getByLabelText('Month');
//         fireEvent.change(monthDropdown, { target: { value: '5' } });

//         await waitFor(() => {
//             expect(screen.getByText('Pay Info')).toBeInTheDocument();
//         });
//     });

//     test('updates months when changing financial year', async () => {
//         getMonthsInFinancialYear.mockReturnValueOnce([
//             { month: 7, year: 2022 },
//             { month: 8, year: 2022 },
//         ]);

//         render(
//             <Router>
//                 <PayHistory />
//             </Router>
//         );

//         const financialYearDropdown = screen.getByLabelText('Financial Year');
//         fireEvent.change(financialYearDropdown, { target: { value: '2023-2024' } });

//         await waitFor(() => {
//             const monthDropdown = screen.getByLabelText('Month');
//             fireEvent.click(monthDropdown);
//             expect(screen.getByText('July')).toBeInTheDocument();
//             expect(screen.getByText('August')).toBeInTheDocument();
//         });
//     });
// });
