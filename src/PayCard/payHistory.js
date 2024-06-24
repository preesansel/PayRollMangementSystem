import React, { useState, useEffect } from 'react';
import PayComponent from './payComponent';
import { useLocation } from 'react-router-dom';
import { Card, Form, Row, Col } from 'react-bootstrap';

import { getCurrentFinancialYear, generateFinancialYears, getMonthsInFinancialYear } from './Utility/financialUtility';

const PayHistory = () => {
    const location = useLocation();
    const { employeeDetails } = location.state; 
    const joiningDate = employeeDetails.doj;
    const financialYears = generateFinancialYears(joiningDate);
    const [selectedFinancialYear, setSelectedFinancialYear] = useState(getCurrentFinancialYear());
    const [monthsInSelectedYear, setMonthsInSelectedYear] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');

    useEffect(() => {
        setMonthsInSelectedYear(getMonthsInFinancialYear(selectedFinancialYear, joiningDate));
    }, [selectedFinancialYear, joiningDate]);

    const handleFinancialYearChange = (event) => {
        setSelectedFinancialYear(event.target.value);
        setSelectedMonth('');
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    return (
        <div className="container mt-5">
            <h3>Pay Info</h3>
            <Row>
                <Col md={8}>
                    {selectedMonth ? (
                        monthsInSelectedYear
                            .filter(({ month }) => month === parseInt(selectedMonth))
                            .map(({ month, year }) => (
                                <Card key={`${year}-${month}`} className="shadow">
                                    <Card.Body>
                                        <PayComponent
                                            empId={employeeDetails.employeeId}
                                            month={month}
                                            year={year}
                                            employeeDetails={employeeDetails}
                                        />
                                    </Card.Body>
                                </Card>
                            ))
                    ) : (
                        <Card className="shadow mb-3">
                            <Card.Body>
                               <h5> <div>Select a financial year and month to view the pay details.</div> </h5>
                            </Card.Body>
                            <Card.Img variant="bottom" src={require('./payHistoryImg.png')}  alt="PayHistory"  className="mx-auto" style={{ width: '400px', height: 'auto' }} />
                        </Card>
                    )}
                </Col>
                <Col md={4}>
                    <Card className="shadow">
                        <Card.Body>
                            <Form.Group className="mb-3">
                                <Form.Label>Financial Year</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={selectedFinancialYear}
                                    onChange={handleFinancialYearChange}
                                    className="form-select"
                                    
                                >
                                    {financialYears.map(fy => (
                                        <option key={fy} value={fy}>{fy}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Month</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={selectedMonth}
                                    onChange={handleMonthChange}
                                    className="form-select"
                                >
                                    <option value="">Select month</option>
                                    {monthsInSelectedYear.map(({ month }) => (
                                        <option key={month} value={month}>
                                            {new Date(0, month - 1).toLocaleString('default', { month: 'long' })}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default PayHistory;
