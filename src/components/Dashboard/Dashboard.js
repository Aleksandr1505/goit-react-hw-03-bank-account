import React, { Component } from 'react';
import shortid from 'shortid';
import { toast } from 'react-toastify';
import Controls from '../Controls/Controls';
import Balance from '../Balance/Balance';
import TransactionHistory from '../TransactionHistory/TransactionHistory';

export default class Dashboard extends Component {
  state = {
    transactions: [],
    number: ' ',
    balance: 0,
    deposit: 0,
    withdraw: 0,
  };

  componentDidMount() {
    const i = localStorage.getItem('transactions');
    const b = localStorage.getItem('balance');
    const d = localStorage.getItem('deposit');
    const w = localStorage.getItem('withdraw');
    if (i) {
      const transactions = JSON.parse(i);
      this.setState({ transactions });
    }
    if (b) {
      const balance = JSON.parse(b);
      this.setState({ balance });
    }
    if (d) {
      const deposit = JSON.parse(d);
      this.setState({ deposit });
    }
    if (w) {
      const withdraw = JSON.parse(w);
      this.setState({ withdraw });
    }
  }

  componentDidUpdate(prevState) {
    const { transactions, balance, deposit, withdraw } = this.state;
    if (prevState.state !== this.state) {
      localStorage.setItem('transactions', JSON.stringify(transactions));
      localStorage.setItem('balance', balance);
      localStorage.setItem('deposit', deposit);
      localStorage.setItem('withdraw', withdraw);
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  addDepositTransaction = () => {
    const { number } = this.state;
    const date = new Date(Date.now());
    const newDepositTransaction = {
      id: shortid.generate(),
      amount: Number(number),
      type: 'Deposit',
      date: date.toLocaleString('en-GB'),
    };
    if (Number(number) === 0) {
      toast.configure();
      const notify = () => toast('Введите сумму для проведения операции!');
      notify();
    } else {
      this.setState(prevState => ({
        transactions: [...prevState.transactions, newDepositTransaction],
        balance: prevState.balance + Number(number),
        deposit: Number(number),
      }));
    }
  };

  addWithdrawTransaction = () => {
    const { number, balance } = this.state;
    const date = new Date(Date.now());
    const newWithdrawTransaction = {
      id: shortid.generate(),
      amount: Number(number),
      type: 'Withdrawal',
      date: date.toLocaleString('en-GB'),
    };
    if (Number(number) > balance) {
      toast.configure();
      const notify = () =>
        toast('На счету недостаточно средств для проведения операции!');
      notify();
    } else if (Number(number) === 0) {
      toast.configure();
      const notify = () => toast('Введите сумму для проведения операции!');
      notify();
    } else {
      this.setState(prevState => ({
        transactions: [...prevState.transactions, newWithdrawTransaction],
        balance: prevState.balance - Number(number),
        withdraw: Number(number),
      }));
    }
  };

  render() {
    const { balance, transactions, number, deposit, withdraw } = this.state;
    return (
      <div className="dashboard">
        <Controls
          number={number}
          changeAmount={this.handleChange}
          buttonDeposit={this.addDepositTransaction}
          buttonWithdraw={this.addWithdrawTransaction}
        />
        <Balance balance={balance} deposit={deposit} withdraw={withdraw} />
        <TransactionHistory items={transactions} />
      </div>
    );
  }
}
