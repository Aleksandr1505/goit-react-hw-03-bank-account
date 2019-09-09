import React from 'react';
import PropTypes from 'prop-types';
import s from './Controls.module.css';

const Controls = ({ changeAmount, number, buttonDeposit, buttonWithdraw }) => (
  <section className={s.controls}>
    <div className={s.buttons}>
      <input
        className={s.input}
        type="number"
        name="number"
        value={number}
        onChange={changeAmount}
      />
      <button className={s.button} onClick={buttonDeposit} type="button">
        Deposit
      </button>
      <button className={s.button} onClick={buttonWithdraw} type="button">
        Withdraw
      </button>
    </div>
  </section>
);

Controls.propTypes = {
  number: PropTypes.string.isRequired,
  buttonDeposit: PropTypes.func.isRequired,
  buttonWithdraw: PropTypes.func.isRequired,
  changeAmount: PropTypes.func.isRequired,
};

export default Controls;
