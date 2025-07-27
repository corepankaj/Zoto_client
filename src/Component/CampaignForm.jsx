import React, { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
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

    channels.forEach((ch) => formData.append('channels[]', ch.value));
    segments.forEach((seg) => formData.append('segments[]', seg.value));
    creatives.forEach((file) => formData.append('creatives', file));

    try {
      await axios.post('http://localhost:5000/api/campaigns', formData, {
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
        {/* Campaign Name and Type */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Campaign Name</Form.Label>
              <Form.Control />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Campaign Type</Form.Label>
              <Form.Select>
                <option>Select campaign type</option>
                <option>Awareness</option>
                <option>Engagement</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Channels and Status */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Channel(s)</Form.Label>
              <Select
                isMulti
                options={channelOptions}
                value={channels}
                onChange={setChannels}
                placeholder="Select marketing channels"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select>
                <option>Draft</option>
                <option>Active</option>
                <option>Paused</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Campaign Goal */}
        <Form.Group className="mb-3">
          <Form.Label>Campaign Goal</Form.Label>
          <Form.Control as="textarea" rows={2} />
        </Form.Group>

        {/* Target Audience */}
        <hr />
        <h5>🎯 Target Audience</h5>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Audience Type</Form.Label>
              <Form.Select>
                <option>Sellers</option>
                <option>Customers</option>
                <option>Both</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Language Preference</Form.Label>
              <Form.Select>
                <option>English</option>
                <option>Hindi</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>📍 Location Targeting</Form.Label>
          <Form.Control />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>👥 User Segments</Form.Label>
          <Select
            isMulti
            options={segmentOptions}
            value={segments}
            onChange={setSegments}
            placeholder="Select user segments"
          />
        </Form.Group>

        {/* Content & Creative */}
        <hr />
        <h5>🎨 Content & Creative</h5>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>🔗 Landing Page URL</Form.Label>
              <Form.Control />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>🎯 CTA Button Label</Form.Label>
              <Form.Control />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-4">
          <Form.Label>📁 Upload Creatives</Form.Label>
          <Form.Control type="file" multiple />
        </Form.Group>

        {/* Scheduling */}
        <hr />
        <h5>📅 Campaign Scheduling</h5>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>⏰ Start Date & Time</Form.Label>
              <Form.Control type="datetime-local" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>⏰ End Date & Time</Form.Label>
              <Form.Control type="datetime-local" />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-4">
          <Form.Check type="switch" label="Enable Recurring Campaign" />
        </Form.Group>

        {/* Action Buttons */}
        <div className="d-flex gap-3">
          <Button type="submit" variant="primary">Create Campaign</Button>
          <Button variant="outline-secondary">Preview Campaign</Button>
          <Button variant="light">Cancel</Button>
        </div>
      </Form>
    </Card>
  );
}

export default CampaignForm;
