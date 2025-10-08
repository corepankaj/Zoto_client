// CampaignForm.jsx
import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card, InputGroup, Modal } from 'react-bootstrap';
import { BsClock, BsCalendar3 } from 'react-icons/bs';
import Select from 'react-select';
import axios from 'axios';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

function CampaignForm() {
  const [campaignId, setcampaignId] = useState('campaign_xyz');
  const [campaignName, setCampaignName] = useState('');
  const [campaignType, setCampaignType] = useState('Awareness');
  const [channels, setChannels] = useState([]);
  const [status, setStatus] = useState('Draft');
  const [goal, setGoal] = useState('');
  const [audienceType, setAudienceType] = useState('Customers');
  const [language, setLanguage] = useState('English');
  const [location, setLocation] = useState('');
  const [segments, setSegments] = useState([]);
  const [landingPage, setLandingPage] = useState('');
  const [ctaLabel, setCtaLabel] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [creatives, setCreatives] = useState([]);
  const [additionalContent, setAdditionalContent] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const channelOptions = [
    { value: 'email', label: 'Email' },
    { value: 'whatsApp', label: 'WhatsApp' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'sms', label: 'SMS' },
  ];

  const segmentOptions = [
    { value: 'newUsers', label: 'New Users' },
    { value: 'inactiveUsers', label: 'Inactive Users' },
    { value: 'premiumUsers', label: 'Premium Users' },
  ];

  const handleFileChange = (e) => setCreatives([...e.target.files]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('campaignId', campaignId);
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
    formData.append('additionalContent', additionalContent);
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
    <div className="container my-4">
      <Card className="shadow-sm p-4 border-0">
        <h4 className="fw-bold mb-4">Create New Campaign</h4>
        <Form onSubmit={handleSubmit}>

          {/* Campaign Details */}
          <div className="pb-3 mb-4 border-bottom">
            <h5 className="fw-semibold mb-3">Campaign Details</h5>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Campaign Name</Form.Label>
                  <Form.Control
                    placeholder="e.g. Diwali Dhamaka 2025"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Campaign Type</Form.Label>
                  <Form.Select value={campaignType} onChange={(e) => setCampaignType(e.target.value)}>
                    <option>Awareness</option>
                    <option>Engagement</option>
                    <option>Retargeting</option>
                    <option>Referral</option>
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
                  <Form.Control value={status} readOnly />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group>
              <Form.Label>Campaign Goal</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="e.g. Seller signups, product orders, brand awareness..."
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              />
            </Form.Group>
          </div>

          {/* Target Audience */}
          <div className="pb-3 mb-4 border-bottom">
            <h5 className="fw-semibold mb-3">Target Audience</h5>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Audience Type</Form.Label>
                  <Form.Select value={audienceType} onChange={(e) => setAudienceType(e.target.value)}>
                    <option>Customers</option>
                    <option>Sellers</option>
                    <option>Both</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Language Preference</Form.Label>
                  <Form.Select value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Tamil</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Location Targeting</Form.Label>
              <Form.Control
                placeholder="e.g. Maharashtra, Mumbai, 400091, Tier-1..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>User Segments</Form.Label>
              <Select isMulti options={segmentOptions} value={segments} onChange={setSegments} />
            </Form.Group>
          </div>

          {/* Content & Creative */}
          <div className="pb-3 mb-4 border-bottom">
            <h5 className="fw-semibold mb-3">Content & Creative</h5>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Landing Page URL</Form.Label>
                  <Form.Control
                    placeholder="https://yoursite.com/campaign-page"
                    value={landingPage}
                    onChange={(e) => setLandingPage(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>CTA Button Label</Form.Label>
                  <Form.Control
                    placeholder="e.g. Start Selling Now, Buy Local, Shop Now"
                    value={ctaLabel}
                    onChange={(e) => setCtaLabel(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Upload Creatives</Form.Label>
              <div className="border rounded p-4 text-center bg-light">
                <Form.Control type="file" multiple onChange={handleFileChange} />
                <small className="text-muted d-block mt-2">Support: images, videos, PDFs (Max 5 files, up to 10MB each)</small>
              </div>
            </Form.Group>
          </div>

          {/* Scheduling */}
          <div className="pb-3 mb-4">
            <h5 className="fw-semibold mb-3">Campaign Scheduling</h5>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label><BsClock className="me-2" />Start Date & Time</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><BsCalendar3 /></InputGroup.Text>
                    <Form.Control
                      type="datetime-local"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label><BsClock className="me-2" />End Date & Time</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><BsCalendar3 /></InputGroup.Text>
                    <Form.Control
                      type="datetime-local"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      disabled={!startDate}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
          </div>

          {/* Buttons */}
          <div className="d-flex gap-3 justify-content-start mt-4">
            <Button type="submit" variant="primary">Create Campaign</Button>
            <Button variant="secondary" onClick={() => setShowPreview(true)}>Preview Campaign</Button>
            <Button variant="light">Cancel</Button>
          </div>
        </Form>
      </Card>

      {/* Preview Modal */}
      <Modal show={showPreview} onHide={() => setShowPreview(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Campaign Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>{campaignName}</h5>
          <p><b>Landing Page:</b> <a href={landingPage} target="_blank" rel="noreferrer">{landingPage}</a></p>
          <div dangerouslySetInnerHTML={{ __html: additionalContent }} />
          {creatives.length > 0 && (
            <div className="my-3">
              <p><b>Uploaded Creatives:</b></p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {Array.from(creatives).map((file, idx) => {
                  const fileUrl = URL.createObjectURL(file);
                  return (
                    <div key={idx} style={{ textAlign: 'center' }}>
                      {file.type.startsWith("image/") ? (
                        <img src={fileUrl} alt={file.name} style={{ maxWidth: '150px', borderRadius: '8px' }} />
                      ) : (
                        <a href={fileUrl} target="_blank" rel="noreferrer">{file.name}</a>
                      )}
                      <p className="small">{file.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {ctaLabel && (
            <Button variant="success" href={landingPage} target="_blank">
              {ctaLabel}
            </Button>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CampaignForm;
