import "../tabs.scss";

const Loans = () => {
  return (
    <div className="tab-card">
      <section className="info-group">
        <h4>Loans</h4>

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
