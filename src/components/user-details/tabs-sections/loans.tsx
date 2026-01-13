import "../tabs.scss";

/**
 * Loans
 *
 * Displays a summary table of the user's loan information,
 * including loan type, amount, status, and repayment details.
 */
const Loans = () => {
  return (
    // Wrapper card for the Loans tab
    <div className="tab-card">
      <section className="info-group">
        {/* Section heading */}
        <h4>Loans</h4>

        {/* Simple table displaying loan details */}
        <table className="simple-table">
          <thead>
            <tr>
              <th>Loan Type</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Repayment</th>
            </tr>
          </thead>

          <tbody>
            {/* Static loan record row */}
            <tr>
              <td>Personal Loan</td>
              <td>₦50,000</td>
              <td>Active</td>
              <td>₦10,000/month</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Loans;
