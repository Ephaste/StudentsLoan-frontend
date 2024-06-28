import { BrowserRouter, Route, Routes } from 'react-router-dom';
// Pages
import { Home, Contact, Login, Register, Reset, Contribute, Apply } from './pages';
import DashboardAdmin from './pages/dashboard/DashboardAdmin';
import DashboardMember from './pages/dashboard/DashboardMember';
import LoansPage from './pages/loans/LoansPage';
import SavingsPage from './pages/funds/SavingsPage';
import SeeAllMembers from './pages/members/SeeAllMembers';
import PrivateRoutes from './pages/utils/PrivateRoutes';
import LoanPay from './pages/loans/LoanPayingForm';
import LoansUpdate from './pages/loans/LoansUpdate.jsx';
import SeeClientLoans from './pages/loans/SeeClientLoans.jsx'
// Components
import PagesLayout from './components/shared/PagesLayout';
import AdminLayout from './components/shared/AdminLayout';
import MemberLayout from './components/shared/MemberLayout';
import SeeMemberSavings from './pages/funds/SeeMemberSavings';
import LoansPaid from './pages/loans/LoansPaid.jsx';
import GettingContacts from './pages/contact/GettingContacts.js';
import UserUpdate from './pages/members/MemberUpdate.jsx';
import UpdateSaving from './pages/funds/SavingsUpdate.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PagesLayout />}>
          <Route index element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
        </Route>

        <Route path="" element={<AdminLayout />}>
          <Route path="/dashboardadmin" element={<DashboardAdmin />} />
          <Route path="/loanspage" element={<LoansPage />} />
          <Route path="/savingspage" element={<SavingsPage />} />
          <Route path="/seeallmembers" element={<SeeAllMembers />} />
          <Route path="/updateuser" element={<UserUpdate />} />
          <Route path='/loansupdate' element ={<LoansUpdate />}/>
          <Route path='/updatesaving' element ={<UpdateSaving />}/>
          <Route path='/loanspaid' element ={<LoansPaid />}/>
          <Route path='/gettingcontacts' element ={<GettingContacts/>}/>
        </Route>

        <Route path="" element={<MemberLayout />}>
          <Route path="/dashboardmember" element={<DashboardMember />} />
          <Route path="/loansmemberpage" element={<SeeClientLoans />} />
          <Route path="/savingsmemberpage" element={<SeeMemberSavings />} /> 
          <Route element={<PrivateRoutes />}>
            <Route path="/applyloan" element={<Apply />} />
            <Route path="/contribute" element={<Contribute />} />
          </Route>
          <Route path='/loanpaying' element ={<LoanPay />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
