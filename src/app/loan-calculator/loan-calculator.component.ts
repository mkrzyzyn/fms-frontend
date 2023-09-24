import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-loan-calculator',
  templateUrl: './loan-calculator.component.html',
  styleUrls: ['./loan-calculator.component.scss'],
})
export class LoanCalculatorComponent {
  calcData = {
    amount: 0,
    interest: 0,
    term: 0,
    type: 'personal',
    frequency: 'monthly',
    fee: 0,
  };

  PMT: number = 0;
  TAR: number = 0;

  onSubmit(form: NgForm) {
    let m: number;
    let r: number;
    let n: number;

    if (form.valid) {
      // Form is valid, handle form data here

      switch (this.calcData.frequency) {
        case 'monthly':
          m = 12;
          break;
        case 'weekly':
          m = 52;
          break;
        case 'biweekly':
          m = 26;
          break;
        case 'quaterly':
          m = 4;
          break;
        default:
          m = 12;
      }

      r = this.calcData.interest / 12 / 100; // Monthly interest as decimal
      n = this.calcData.term * m; // Total number of payments
      let feeAmount = (this.calcData.fee / 100) * this.calcData.amount;

      // Include the fee amount in the loan amount
      let loanAmountWithFee = this.calcData.amount + feeAmount;
      let totalInterest =
        ((this.calcData.amount * this.calcData.interest) / 100) *
        this.calcData.term;

      this.PMT =
        (loanAmountWithFee * (r * Math.pow(1 + r, n))) /
        (Math.pow(1 + r, n) - 1);
      let temp = this.PMT.toFixed(2);
      this.PMT = parseFloat(temp);

      this.TAR = this.calcData.amount + totalInterest + feeAmount;
      temp = this.TAR.toFixed(2);
      this.TAR = parseFloat(temp);
      console.log(this.PMT);
    }
  }
}
