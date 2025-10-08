import { useEffect, useState } from "react";
import "./AllCampaigns.css";

function AllCampaigns() {
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    getAllData();
  }, []);

  async function getAllData() {
    const URL = "https://zoto-backend-h34w.vercel.app/api/campaigns";
    try {
      let response = await fetch(URL);
      response = await response.json();
      setAllData(response);
    } catch (error) {
      console.log("Message:", error);
    }
  }

  return (
    <div className="campaign-container">
      <h2 className="campaign-title">All Campaigns</h2>
      <p className="campaign-subtitle">
        Overview of all your marketing campaigns and their current status
      </p>

      <table className="campaign-table">
        <thead>
          <tr>
            <th>Campaign Name</th>
            <th>Type</th>
            <th>Channels</th>
            <th>Target Audience</th>
            <th>Schedule</th>
            <th>Status</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {allData.map((item) => (
            <tr key={item._id}>
              <td>{item.campaignName}</td>
              <td>
                <span className="chip">{item.campaignType}</span>
              </td>
              <td>
                {item.channels.map((ch, i) => (
                  <span key={i} className="chip">{ch}</span>
                ))}
              </td>
              <td>
                <span className="chip">{item.audienceType}</span>
                <span className="chip">{item.language}</span><br></br>
                <span className="chip" id="location_tab">{item.location}</span><br></br>
                <span className="chip">{item.segments[0]}</span>
                <span className="chip">{item.segments[1]}</span>
                <span className="chip">{item.segments[2]}</span>
              </td>
              <td>
               <span className="dateValue">{new Date(item.startDate).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
                })} </span>  

                - 
                
                <span className="dateValue">
                {new Date(item.endDate).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
                })}</span>
                </td>
                            <td>
                <span className={`status-badge ${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
              </td>
              <td>
                <span className="dateValue">{new Date(item.createdAt).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
                })} </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllCampaigns;
