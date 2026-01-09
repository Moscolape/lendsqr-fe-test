import "../tabs.scss";

const Documents = () => {
  return (
    <div className="tab-card">
      <section className="info-group">
        <h4>Documents</h4>

        <div className="document-list">
          <div className="document-item">
            <span className="label">Proof of Identity</span>
            <button className="doc-action">View</button>
          </div>

          <div className="document-item">
            <span className="label">Utility Bill</span>
            <button className="doc-action">View</button>
          </div>

          <div className="document-item">
            <span className="label">Employment Letter</span>
            <button className="doc-action">View</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Documents;
