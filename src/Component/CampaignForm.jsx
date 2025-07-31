import React, { useState } from 'react';
import { Form, Button, Row, Col, Card,InputGroup } from 'react-bootstrap';
import { BsClock, BsCalendar3 } from 'react-icons/bs';
import Select from 'react-select';
import axios from 'axios';

function CampaignForm() {
  const [campaignName, setCampaignName] = useState('');
  const [campaignType, setCampaignType] = useState('');
  const [channels, setChannels] = useState([]);
  const [status, setStatus] = useState('Draft');
  const [goal, setGoal] = useState('');
  const [audienceType, setAudienceType] = useState('');
  const [language, setLanguage] = useState('');
  const [location, setLocation] = useState('');
  const [segments, setSegments] = useState([]);
  const [landingPage, setLandingPage] = useState('');
  const [ctaLabel, setCtaLabel] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [creatives, setCreatives] = useState([]);

  const channelOptions = [
    { value: 'email', label: 'Email' },
    { value: 'sms', label: 'SMS' },
    { value: 'metaAds', label: 'Meta Ads' },
    { value: 'googleAds', label: 'Google Ads' },
    { value: 'influencer', label: 'Influencer' },
    { value: 'blog', label: 'Blog' },
  ];

  const segmentOptions = [
    { value: 'newUsers', label: 'New Users' },
    { value: 'repeatBuyers', label: 'Repeat Buyers' },
    { value: 'inactiveUsers', label: 'Inactive Users' },
    { value: 'premiumUsers', label: 'Premium Users' },
    { value: 'highValue', label: 'High-Value Customers' },
    { value: 'recentSignups', label: 'Recent Signups' },
    { value: 'cartAbandoners', label: 'Cart Abandoners' },
  ];

  const handleFileChange = (e) => setCreatives([...e.target.files]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('campaignName', campaignName);
    formData.append('campaignType', campaignType);
    formData.append('status', status);
    formData.append('goal', goal);
    formData.append('audienceType', audienceType);
    formData.append('language', language);
    formData.append('location', location);
    formData.append('landingPage', landingPage);
    formData.append('ctaLabel', ctaLabel);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('channels', JSON.stringify(channels.map(ch => ch.value)));
    formData.append('segments', JSON.stringify(segments.map(seg => seg.value)));
    
    creatives.forEach((file) => formData.append('creatives', file));

    try {
      await axios.post('https://zoto-backend-h34w.vercel.app/api/campaigns', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Campaign saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Error saving campaign');
    }
  };

  return (
    <Card className="p-4 m-4 shadow-sm">
      <h3>Create New Campaign</h3>
      <p className="text-muted">Set up your marketing campaign with all the necessary details</p>

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Campaign Name</Form.Label>
              <Form.Control value={campaignName} onChange={(e) => setCampaignName(e.target.value)} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Campaign Type</Form.Label>
              <Form.Select value={campaignType} onChange={(e) => setCampaignType(e.target.value)}>
                <option value="">Select campaign type</option>
                <option value="Awareness">Awareness</option>
                <option value="Engagement">Engagement</option>
                <option value="Retargeting">Retargeting</option>
                <option value="Referral">Referral</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Channel(s)</Form.Label>
              <Select isMulti options={channelOptions} value={channels} onChange={setChannels} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Draft">Draft</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Running">Running</option>
                <option value="Paused">Paused</option>
                <option value="Completed">Completed</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Campaign Goal</Form.Label>
          <Form.Control as="textarea" rows={2} value={goal} onChange={(e) => setGoal(e.target.value)} />
        </Form.Group>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Audience Type</Form.Label>
              <Form.Select value={audienceType} onChange={(e) => setAudienceType(e.target.value)}>
                <option value="">Select</option>
                <option value="Sellers">Sellers</option>
                <option value="Customers">Customers</option>
                <option value="Both">Both</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Language Preference</Form.Label>
              <Form.Select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="">Select</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>📍 Location Targeting</Form.Label>
          <Form.Control value={location} onChange={(e) => setLocation(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>👥 User Segments</Form.Label>
          <Select isMulti options={segmentOptions} value={segments} onChange={setSegments} />
        </Form.Group>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>🔗 Landing Page URL</Form.Label>
              <Form.Control value={landingPage} onChange={(e) => setLandingPage(e.target.value)} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>🎯 CTA Button Label</Form.Label>
              <Form.Control value={ctaLabel} onChange={(e) => setCtaLabel(e.target.value)} />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-4">
          <Form.Label>📁 Upload Creatives</Form.Label>
          <Form.Control type="file" multiple onChange={handleFileChange} />
        </Form.Group>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label htmlFor="startDate">
                <BsClock className="me-2" /> Start Date & Time
              </Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <BsCalendar3 />
                </InputGroup.Text>
                <Form.Control
                  id="startDate"
                  type="datetime-local"
                  placeholder="Select start date and time"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  onFocus={(e) => e.target.showPicker && e.target.showPicker()}
                />
              </InputGroup>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label htmlFor="endDate">
                <BsClock className="me-2" /> End Date & Time
              </Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <BsCalendar3 />
                </InputGroup.Text>
                <Form.Control
                  id="endDate"
                  type="datetime-local"
                  placeholder="Select end date and time"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  onFocus={(e) => e.target.showPicker && e.target.showPicker()}
                  disabled={!startDate} // disables until start date is selected
                />
              </InputGroup>
              {!startDate && (
                <small className="text-muted">Please select a start date first</small>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit" variant="primary">Create Campaign</Button>
      </Form>
    </Card>
  );
}

export default CampaignForm;
