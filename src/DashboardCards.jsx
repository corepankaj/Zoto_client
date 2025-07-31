import { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { BsBullseye, BsGraphUpArrow, BsEye, BsPeople } from 'react-icons/bs';

function DashboardCards() {

   const [data,setData]=useState([]);
   const [totalcampaigan,setTotalcampaigan]=useState([]);
   

   useEffect(()=>{

    getData();

   },[])

   async function getData() {

    const URL = "https://zoto-backend-h34w.vercel.app/api/campaigns";
    try {

      let response = await fetch(URL);
      response = await response.json();
      setData(response);
      setTotalcampaigan(response.length);
      
      
    } catch (error) {
      
      console.log("Message:", error);
    }
    
   }
    
  return (
    <Row className="g-3" style={{ paddingLeft: '2%', marginTop: '60px' }}>
      <Col md={3}>
        <Card className="shadow-sm border-0 rounded-4">
          <Card.Body className="d-flex justify-content-between align-items-center">
            <div>
              <small className="text-muted">Total Campaigns</small>
              <h4 style={{ color: 'black', margin: 0 }}>{totalcampaigan}</h4>
            </div>
            <BsBullseye size={20} color="#5b3ee5" />
          </Card.Body>
        </Card>
      </Col>

      <Col md={3}>
        <Card className="shadow-sm border-0 rounded-4">
          <Card.Body className="d-flex justify-content-between align-items-center">
            <div>
              <small className="text-muted">Active</small>
              {(() => {
                const activeData = data.filter(item => item.status === "Running").length;
                return <h4 style={{ color: 'green', margin: 0 }}>{activeData}</h4>;
              })()}
            </div>

            <BsGraphUpArrow size={20} color="green" />
          </Card.Body>
        </Card>
      </Col>

      <Col md={3}>
        <Card className="shadow-sm border-0 rounded-4">
          <Card.Body className="d-flex justify-content-between align-items-center">
            <div>
              <small className="text-muted">Scheduled</small>
              {(() => {
                const ScheduledData = data.filter(item => item.status === "Scheduled").length;
                return <h4 style={{ color: '#3b6eea', margin: 0 }}>{ScheduledData}</h4>;
              })()}
            </div>
            <BsEye size={20} color="#3b6eea" />
          </Card.Body>
        </Card>
      </Col>

      <Col md={3}>
        <Card className="shadow-sm border-0 rounded-4">
          <Card.Body className="d-flex justify-content-between align-items-center">
            <div>
              <small className="text-muted">Completed</small>
               {(() => {
                const CompleteddData = data.filter(item => item.status === "Completed").length;
                return <h4 style={{ color: '#6c757d', margin: 0 }}>{CompleteddData}</h4>;
              })()}
            </div>
            <BsPeople size={20} color="#6c757d" />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default DashboardCards;
