import { useState } from "react";
import "./App.css";
import { submitForm } from "./services/api";

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

    if (!formData.batch) return "Enter Batch";

    if (!formData.requestType) return "Select Request Type";

    if (!formData.userCategory) return "Select User Category";

    if (!formData.remark.trim()) return "Enter Remark";

    return "";
  };

  const handleSubmit = async (e) => {
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
      <div className="card">

        <div className="logo">🎓</div>

        <h1>Saarthi Academy</h1>

        <p className="subtitle">
          Course Access Verification Portal
        </p>

        <form onSubmit={handleSubmit}>
        <label>Full Name *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter Full Name"
          />

          <label>Mobile Number *</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter Mobile Number"
          />

          <label>Gmail ID *</label>
          <input
            type="email"
            name="gmail"
            value={formData.gmail}
            onChange={handleChange}
            placeholder="Enter Gmail ID"
          />

          <label>Course *</label>
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleChange}
            placeholder="Enter Course Name"
          />

          <label>Batch with Start Date *</label>
          <input
            type="text"
            name="batch"
            value={formData.batch}
            onChange={handleChange}
            placeholder="Example : CET Crash Course - 15 July 2026"
          />

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

          <label>Upload Screenshot (Optional)</label>

          <input
            type="file"
            name="screenshot"
            onChange={handleChange}
          />

          <label>Remark *</label>

          <textarea
            rows="5"
            name="remark"
            value={formData.remark}
            onChange={handleChange}
            placeholder="Describe your request..."
          ></textarea>

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Request"}
          </button>        </form>

</div>
</div>
);
}

export default App;