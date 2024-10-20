  const Modal = () => {
    const handleSubmit = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      // Add logic to handle form submission
    };

    return (
      <>
        <style>
          {`

          `}
        </style>
        <button 
          className="btn rounded-pill btn-lg position-fixed d-flex align-items-center justify-content-center hover-effect" 
          style={{ 
            width: '150px', 
            height: '60px', 
            fontSize: '1rem', 
            fontWeight: 'bold', 
            textTransform: 'uppercase', 
            border: 'none', 
            left: '20px', 
            bottom: '20px', 
            zIndex: 1050,
            backgroundColor: '#9c9ce4',
          }} 
          data-bs-toggle="modal" 
          data-bs-target="#reportDisasterModal"
        >
          <i className="bi me-2"></i>
          Report Disaster
        </button>
        <div className="modal fade modern-modal" id="reportDisasterModal" tabIndex={-1} aria-labelledby="reportDisasterModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold" id="reportDisasterModalLabel">Report a Disaster</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="disasterType" className="form-label fw-semibold">Disaster Type</label>
                    <select className="form-select" id="disasterType" required>
                      <option value="" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Select disaster type</option>
                      <option value="earthquake">Earthquake</option>
                      <option value="flood">Flood</option>
                      <option value="hurricane">Hurricane</option>
                      <option value="wildfire">Wildfire</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="location" className="form-label fw-semibold">Location</label>
                    <input type="text" className="form-control" id="location" placeholder="Enter location" required />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="description" className="form-label fw-semibold">Description</label>
                    <textarea className="form-control" id="description" rows={3} placeholder="Describe the situation" required></textarea>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="severity" className="form-label fw-semibold">Severity</label>
                    <select className="form-select" id="severity" required>
                      <option value="" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Select severity level</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary w-100">Submit Report</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  export default Modal