import React from 'react';
import PropTypes from 'prop-types';
import styles from './TransactionHistory.module.css';

const TransactionHistory = ({ items }) => (
  <table className={styles.transactionHist}>
    <thead>
      <tr className={styles.names}>
        <th className={styles.information}>Transaction</th>
        <th className={styles.information}>Amount</th>
        <th className={styles.information}>Date</th>
      </tr>
    </thead>
    <tbody>
      {items.map(item => (
        <tr key={item.id} className={styles.transactions}>
          <td className={styles.value}>{item.type}</td>
          <td className={styles.value}>{item.amount}$</td>
          <td className={styles.value}>{item.date}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

TransactionHistory.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default TransactionHistory;
