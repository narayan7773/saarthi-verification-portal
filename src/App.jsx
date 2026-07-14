import saarthiLogo from "./assets/saarthi.png";
import shikshakLogo from "./assets/shikshak.png";
import { useState, useEffect } from "react";
import "./App.css";

import {
  submitForm,
  getCourses,
  getBatches,
  trackTicket,
} from "./service/api";

function App() {
  const initialForm = {
    fullName: "",
    mobile: "",
    gmail: "",
    course: "",
    batch: "",
    requestType: "",
    userCategory: "",
    screenshot: null,
    remark: "",
  };

  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [page, setPage] = useState("home");
  const [ticketId, setTicketId] = useState("");
  const [ticketResult, setTicketResult] = useState(null);
const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setCourses(await getCourses());
      setBatches(await getBatches());
    } catch (err) {
      console.error(err);
    }
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const validate = () => {
    if (!formData.fullName.trim()) return "Enter Full Name";
    if (!/^[0-9]{10}$/.test(formData.mobile))
      return "Enter Valid Mobile Number";
    if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.gmail)
    )
      return "Enter Valid Gmail";
    if (!formData.course) return "Select Course";
    if (!formData.batch) return "Select Batch";
    if (!formData.requestType) return "Select Request Type";
    if (!formData.userCategory) return "Select User Category";
    if (!formData.remark.trim()) return "Enter Remark";
    return "";
  };
  async function handleTrackTicket() {

    if (!ticketId.trim()) {
      alert("Enter Ticket ID");
      return;
    }
  
    try {
      setSearchLoading(true);
  
      const result = await trackTicket(ticketId);
  
      setTicketResult(result);
  
    } catch (err) {
      console.error(err);
      alert("Unable to fetch ticket.");
    } finally {
      setSearchLoading(false);
    }
  
  }

  const handleSubmit = async (e) => {
    async function handleTrackTicket() {

      if (!ticketId.trim()) {
        alert("Enter Ticket ID");
        return;
      }
    
      try {
        setSearchLoading(true);
    
        const result = await trackTicket(ticketId);
    
        setTicketResult(result);
    
      } catch (err) {
        console.error(err);
        alert("Unable to fetch ticket.");
      } finally {
        setSearchLoading(false);
      }
    }
    
    const handleSubmit = async (e) => {
    
      e.preventDefault();
    
      const error = validate();
    
      if (error) {
        alert(error);
        return;
      }
    
      try {
    
        setSearchLoading(true);
    
        const result = await trackTicket(ticketId);
    
        setTicketResult(result);
    
      } catch (err) {
    
        console.error(err);
    
        alert("Unable to fetch ticket.");
    
      } finally {
    
        setSearchLoading(false);
    
      }
    
    }
    e.preventDefault();

    const error = validate();

    if (error) {
      alert(error);
      return;
    }

    try {
      setLoading(true);

      await submitForm(formData);

      alert("Request Submitted Successfully");

      setFormData(initialForm);
    } catch (err) {
      console.error(err);
      alert("Submission Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">

      <div className="topbar">

        <div className="brand-name">
          Saarthi & Shikshak ERP
        </div>

        <div className="menu">
        <button
  type="button"
  className="menu-btn"
  onClick={() => setPage("home")}
>
  🏠 Home
</button>

<button
  type="button"
  className="menu-btn"
  onClick={() => setPage("track")}
>
  🎫 Track Ticket
</button>

<button
  type="button"
  className="menu-btn"
  onClick={() =>
    window.open("https://wa.me/919680035009", "_blank")
  }
>
  💬 WhatsApp
</button>
        </div>

      </div>

      <div className="card">

        <div className="header">

          <div className="brand-logos">
            <img
              className="saarthi-logo"
              src={saarthiLogo}
              alt="Saarthi Academy"
            />

            <img
              className="shikshak-logo"
              src={shikshakLogo}
              alt="Shikshak"
            />
          </div>

          <h1>Saarthi & Shikshak</h1>

          <p className="subtitle">
            Student Management Portal
          </p>

          <p className="tagline">
            Access Verification • Student Support • Ticket Management
          </p>

        </div>

{page === "home" && (
        <form onSubmit={handleSubmit} className="form-grid">
        <div>
  <label>Full Name *</label>
  <input
    type="text"
    name="fullName"
    value={formData.fullName}
    onChange={handleChange}
    placeholder="Enter Full Name"
  />
</div>

<div>
  <label>Mobile Number *</label>
  <input
    type="text"
    name="mobile"
    value={formData.mobile}
    onChange={handleChange}
    placeholder="Enter Mobile Number"
  />
</div>

<div>
  <label>Gmail ID *</label>
  <input
    type="email"
    name="gmail"
    value={formData.gmail}
    onChange={handleChange}
    placeholder="Enter Gmail ID"
  />
</div>

<div>
  <label>Course *</label>
  <select
    name="course"
    value={formData.course}
    onChange={handleChange}
  >
    <option value="">Select Course</option>
    {courses.map((course) => (
      <option key={course} value={course}>
        {course}
      </option>
    ))}
  </select>
</div>

<div>
  <label>Batch *</label>
  <select
    name="batch"
    value={formData.batch}
    onChange={handleChange}
  >
    <option value="">Select Batch</option>
    {batches.map((batch) => (
      <option key={batch} value={batch}>
        {batch}
      </option>
    ))}
  </select>
</div>

<div>
  <label>Request Type *</label>
  <select
    name="requestType"
    value={formData.requestType}
    onChange={handleChange}
  >
    <option value="">Select Request Type</option>
    <option>🆕 New Access</option>
    <option>🔄 Validity Extend</option>
    <option>🔁 Batch Transfer</option>
    <option>❓ Other</option>
  </select>
</div>

<div>
  <label>User Category *</label>
  <select
    name="userCategory"
    value={formData.userCategory}
    onChange={handleChange}
  >
    <option value="">Select User Category</option>
    <option>👨‍💻 Online Student</option>
    <option>🏫 Offline Enrolled Student</option>
    <option>❓ Other</option>
  </select>
</div>

<div>
  <label>Upload Screenshot (Optional)</label>
  <input
    type="file"
    name="screenshot"
    onChange={handleChange}
  />
</div>

<div className="full-width">
  <label>Remark *</label>
  <textarea
    rows="5"
    name="remark"
    value={formData.remark}
    onChange={handleChange}
    placeholder="Describe your request..."
  />
</div>

<div className="full-width">
  <button type="submit" disabled={loading}>
    {loading ? "Submitting..." : "Submit Request"}
  </button>
</div>

</form>
)}
{page === "track" && (

<div className="track-card">

<h2>🎫 Track Your Ticket</h2>

<input
  type="text"
  placeholder="Enter Ticket ID"
  value={ticketId}
  onChange={(e) => setTicketId(e.target.value)}
/>

<button
  type="button"
  onClick={handleTrackTicket}
>
  {searchLoading ? "Searching..." : "Search Ticket"}
</button>

{ticketResult && (

<div className="ticket-result">

<h3>🎫 Ticket Status</h3>

<p><strong>Ticket :</strong> {ticketResult.ticket}</p>

<p><strong>Name :</strong> {ticketResult.name}</p>

<p><strong>Course :</strong> {ticketResult.course}</p>

<p><strong>Batch :</strong> {ticketResult.batch}</p>

<p><strong>Status :</strong> {ticketResult.status}</p>

</div>

)}

</div>

)}

</div>
</div>
);
}

export default App;