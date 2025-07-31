import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons'; // Optional icon
import { Link } from 'react-router-dom';
import Logo from './assets/Logo.jpeg'; // Make sure path is correct

function Header() {
  return (
    
    <div className="py-3 bg-white shadow-sm" style={{position: 'fixed',top: 0, left: 0, right: 0,zIndex: 1030}}>
      <Container>
        <Row className="align-items-center">
          {/* Left Section - Title */}
          <Col md={4}>
            <h4 className="mb-0 fw-bold">Campaign Hub</h4>
            <p className="text-muted mb-0" style={{ fontSize: '14px' }}>
              Manage and optimize your marketing campaigns
            </p>
          </Col>

          {/* Center Section - Logo */}
          
          <Col md={4} className="text-center">
          <Link to={"/"}>
            <img src={Logo} alt="Logo" style={{ maxHeight: '50px' }} />
            </Link>
          </Col>
          
          {/* Right Section - Button */}
          <Col md={4} className="text-end">
           <Link to={"/campaignform"}>
            <Button variant="primary">
              <Plus className="me-2" />
              New Campaign
            </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Header;
