import "../tabs.scss";

/**
 * Documents
 *
 * Displays a list of user documents with
 * corresponding action buttons.
 */
const Documents = () => {
  return (
    // Wrapper card for the Documents tab
    <div className="tab-card">
      <section className="info-group">
        {/* Section title */}
        <h4>Documents</h4>

        {/* List of available documents */}
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
