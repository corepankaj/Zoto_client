import { useState } from 'react'
import Header from './Component/Header';
import DashboardCards from './Component/DashboardCards';
import CampaignForm from './Component/CampaignForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Router } from 'react-bootstrap-icons';
import AllCampaigns from './Component/AllCampaigns';

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
