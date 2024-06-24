
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import PayslipBrillio from './PayCard/payslipBrillio';
import PayHistory from './PayCard/payHistory';
import PayComponent from './PayCard/payComponent';

function App() {

   
  return (
    <div className="App">

        <Router>
            <Routes>
                <Route path="/dashboard" element={<PayComponent empId="1" isDashboard={true} />} />
                <Route path="/payslip" element={<PayslipBrillio />} />
                <Route path="/payhistory" element={<PayHistory />} />
            </Routes>
        </Router>
 
</div>
  );
}

export default App;
