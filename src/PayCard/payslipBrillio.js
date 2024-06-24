import React from 'react';
import { useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import numberToWords from 'number-to-words';

export const formatCurrency = (num) => {
    return num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export const handleDownloadPdf = () => {
    const input = document.getElementById('payslip');
    html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('payslip.pdf');
    });
};

export const getFormattedMonthYear = (month, year) => {
    return `${new Date(year, month - 1).toLocaleString('default', { month: 'long' })} ${year}`;
};

export const convertToWords = (num) => {
    return numberToWords.toWords(num).replace(/\b\w/g, char => char.toUpperCase()) + ' Only';
};

const PayslipBrillio = () => {
    const location = useLocation();
    const { employeeDetails, salaryDetails, month, year } = location.state;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">Preview - {getFormattedMonthYear(month, year)} Payslip</h4>
                <div className="d-flex align-items-center">
                    <button className="btn btn-primary" onClick={handleDownloadPdf}>
                        <FontAwesomeIcon icon={faDownload} />
                        <span className="ms-2">Download</span>
                    </button>
                </div>
            </div>
            <div id="payslip" className="card p-4" style={{ borderWidth: '2px', borderColor: 'black', marginBottom: '20px' }}>
                <div className="card-body">
                    <hr style={{ border: '1px solid black' }} />
                    <h4 className="text-center my-4">BRILLIO TECHNOLOGIES PRIVATE LIMITED</h4>
                    <h5 className="text-center my-4">Pay Slip for the Month of {getFormattedMonthYear(month, year)}</h5>
                    <hr style={{ border: '1px solid black' }} />

                    <table className="table table-borderless">
                        <tbody>
                            <tr>
                                <td className="text-start"><strong>EMPCODE:</strong></td>
                                <td className="text-start">{employeeDetails.employeeId}</td>
                                <td className="text-start"><strong>LOCATION:</strong></td>
                                <td className="text-start">{employeeDetails.location}</td>
                            </tr>
                            <tr>
                                <td className="text-start"><strong>EMPNAME:</strong></td>
                                <td className="text-start">{employeeDetails.employeeName}</td>
                                <td className="text-start"><strong>UAN NO:</strong></td>
                                <td className="text-start">{employeeDetails.uanNo}</td>
                            </tr>
                            <tr>
                                <td className="text-start"><strong>DESIGNATION:</strong></td>
                                <td className="text-start">{employeeDetails.designation}</td>
                                <td className="text-start"><strong>PF NO:</strong></td>
                                <td className="text-start">{employeeDetails.pfNo}</td>
                            </tr>
                            <tr>
                                <td className="text-start"><strong>DOJ:</strong></td>
                                <td className="text-start">{employeeDetails.doj}</td>
                                <td className="text-start"><strong>LOP DAYS:</strong></td>
                                <td className="text-start">{salaryDetails.lop}</td>
                            </tr>
                            <tr>
                                <td className="text-start"><strong>PAN:</strong></td>
                                <td className="text-start">{employeeDetails.panId}</td>
                                <td className="text-start"><strong>BANK NAME:</strong></td>
                                <td className="text-start">{employeeDetails.bankName}</td>
                            </tr>
                            <tr>
                                <td className="text-start"><strong>DEPARTMENT:</strong></td>
                                <td className="text-start">{employeeDetails.department}</td>
                                <td className="text-start"><strong>ACCOUNT NO:</strong></td>
                                <td className="text-start">{employeeDetails.accountNo}</td>
                            </tr>
                        </tbody>
                    </table>

                    <hr style={{ border: '1px solid black' }} />

                    <div className="row mt-4">
                        <div className="col-md-6">
                            <h6 className="text-center"><strong>EARNINGS</strong></h6>
                            <hr style={{ border: '1px solid black' }} />
                            <table className="table table-borderless">
                                <thead>
                                    <tr>
                                        <th className="text-start">DESCRIPTION</th>
                                        <th className="text-center">AMOUNT</th>
                                        <th className="text-end">YTD</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="text-start">Basic Pay</td>
                                        <td className="text-center">{formatCurrency(salaryDetails.basicPay)}</td>
                                        <td className="text-end">{formatCurrency(salaryDetails.ytdBasicPay)}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-start">House Rent Allowance</td>
                                        <td className="text-center">{formatCurrency(salaryDetails.houseRentAllowance)}</td>
                                        <td className="text-end">{formatCurrency(salaryDetails.ytdHouseRentAllowance)}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-start">Special Allowance</td>
                                        <td className="text-center">{formatCurrency(salaryDetails.specialAllowance)}</td>
                                        <td className="text-end">{formatCurrency(salaryDetails.ytdSpecialAllowance)}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-start">GROSS EARNINGS</th>
                                        <th className="text-center">{formatCurrency(salaryDetails.grossEarning)}</th>
                                        <th className="text-end">{formatCurrency(salaryDetails.ytdGrossEarnings)}</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-6">
                            <h6 className="text-center"><strong>DEDUCTIONS</strong></h6>
                            <hr style={{ border: '1px solid black' }} />
                            <table className="table table-borderless">
                                <thead>
                                    <tr>
                                        <th className="text-start">DESCRIPTION</th>
                                        <th className="text-center">AMOUNT</th>
                                        <th className="text-end">YTD</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="text-start">Provident Fund</td>
                                        <td className="text-center">{formatCurrency(salaryDetails.epf)}</td>
                                        <td className="text-end">{formatCurrency(salaryDetails.ytdEpf)}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-start">Income Tax</td>
                                        <td className="text-center">{formatCurrency(salaryDetails.incomeTax)}</td>
                                        <td className="text-end">{formatCurrency(salaryDetails.ytdIncomeTax)}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-start">Professional Tax</td>
                                        <td className="text-center">{formatCurrency(salaryDetails.professionalTax)}</td>
                                        <td className="text-end">{formatCurrency(salaryDetails.ytdProfessionalTax)}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-start">GROSS DEDUCTION</th>
                                        <th className="text-center">{formatCurrency(salaryDetails.grossDeduction)}</th>
                                        <th className="text-end">{formatCurrency(salaryDetails.netPay)}</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <hr style={{ border: '1px solid black' }} />

                    <p className="text-start"><strong>NET PAY:</strong> {formatCurrency(salaryDetails.netPay)}</p>
                    <p className="text-start"><strong>IN WORDS:</strong> {convertToWords(salaryDetails.netPay)}</p>
                </div>
            </div>
        </div>
    );
};

export default PayslipBrillio;
