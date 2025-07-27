import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { BsBullseye, BsGraphUpArrow, BsEye, BsPeople } from 'react-icons/bs';

const cards = [
  {
    title: 'Total Campaigns',
    value: 2,
    icon: <BsBullseye size={20} color="#5b3ee5" />,
    color: 'black',
  },
  {
    title: 'Active',
    value: 1,
    icon: <BsGraphUpArrow size={20} color="green" />,
    color: 'green',
  },
  {
    title: 'Scheduled',
    value: 1,
    icon: <BsEye size={20} color="#3b6eea" />,
    color: '#3b6eea',
  },
  {
    title: 'Completed',
    value: 0,
    icon: <BsPeople size={20} color="#6c757d" />,
    color: '#6c757d',
  },
];

function DashboardCards() {
  return (
    <Row className="g-3" style={{paddingLeft:'2%', marginTop:'60px'}}>
      {cards.map((card, index) => (
        <Col key={index} md={3}>
          <Card className="shadow-sm border-0 rounded-4">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <small className="text-muted">{card.title}</small>
                <h4 style={{ color: card.color, margin: 0 }}>{card.value}</h4>
              </div>
              {card.icon}
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default DashboardCards;
