import "./App.css";

function App() {
  return (
    <div className="container">
      <div className="card">

        <div className="logo">
          🎓
        </div>

        <h1>Saarthi Academy</h1>
        <p className="subtitle">
          Course Access Verification Portal
        </p>

        <form>

          <label>Full Name *</label>
          <input type="text" placeholder="Enter Full Name" />

          <label>Mobile Number *</label>
          <input type="text" placeholder="Enter Mobile Number" />

          <label>Gmail ID *</label>
          <input type="email" placeholder="Enter Gmail ID" />

          <label>Course *</label>
          <input type="text" placeholder="Select Course" />

          <label>Batch with Start Date *</label>
          <input type="text" placeholder="Example : CET Crash Course - 15 July 2026" />

          <label>Request Type *</label>
          <select>
            <option>Select Request Type</option>
            <option>🆕 New Access</option>
            <option>🔄 Validity Extend</option>
            <option>🔁 Batch Transfer</option>
            <option>❓ Other</option>
          </select>

          <label>User Category *</label>
          <select>
            <option>Select User Category</option>
            <option>👨‍💻 Online Student</option>
            <option>🏫 Offline Enrolled Student</option>
            <option>❓ Other</option>
          </select>

          <label>Upload Screenshot (Optional)</label>
          <input type="file" />

          <label>Remark *</label>
          <textarea
            rows="5"
            placeholder="Describe your request..."
          ></textarea>

          <button type="submit">
            Submit Request
          </button>

        </form>

      </div>
    </div>
  );
}

export default App;