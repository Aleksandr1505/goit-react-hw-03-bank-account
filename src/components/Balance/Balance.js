import React from 'react';
import PropTypes from 'prop-types';
import s from './Balance.module.css';

const Balance = ({ balance, deposit, withdraw }) => (
  <section className={s.balance}>
    <span className={s.span}>&#8593; {deposit} $</span>
    <span className={s.span}>&#8595; {withdraw} $</span>
    <span className={s.span}>Balance: {balance} $</span>
  </section>
);

Balance.propTypes = {
  balance: PropTypes.number.isRequired,
  deposit: PropTypes.number.isRequired,
  withdraw: PropTypes.number.isRequired,
};

export default Balance;
