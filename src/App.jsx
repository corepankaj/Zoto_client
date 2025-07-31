import { useState } from 'react'
import Header from './Header';
import DashboardCards from './DashboardCards';
import CampaignForm from './CampaignForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Router } from 'react-bootstrap-icons';
import AllCampaigns from './AllCampaigns';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <div>
        <Header/>
        </div>
        <br></br>
        <div style={{width:'98%'}}>
          <DashboardCards/>
        </div>
        <Routes>
          <Route path="/" element={<AllCampaigns/>}/>
         <Route path="/campaignform" element={<CampaignForm />} />
        </Routes>
          
      </BrowserRouter>
    </>
  )
}

export default App
