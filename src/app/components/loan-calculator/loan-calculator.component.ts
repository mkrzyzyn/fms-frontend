import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-loan-calculator',
  templateUrl: './loan-calculator.component.html',
  styleUrls: ['./loan-calculator.component.scss'],
})
export class LoanCalculatorComponent {

  constructor(private backendService: BackendService){}

  calcData = {
    amount: 20000,
    interest: 8,
    term: 4,
    type: 'personal',
    frequency: 'monthly',
    fee: 4.55,
  };

  PMT: number = 0; // Monthly payment
  TAR: number = 0; // Total amount to return
  TIN: number = 0; // Total interest
  TCL: number = 0; // Total cost of the loan

  outputData: any; 

  onSubmit(form: NgForm) {
    let num_pay_year: number; // Number of payments pew year
    let mon_int_dec: number; // Monthly interest as decimal
    let num_pay_total: number; // Total number of payments

    if (form.valid) {
      // Form is valid, handle form data here

      // Numer of payments per year
      switch (this.calcData.frequency) {
        case 'monthly':
          num_pay_year = 12;
          break;
        case 'weekly':
          num_pay_year = 52;
          break;
        case 'biweekly':
          num_pay_year = 26;
          break;
        case 'quaterly':
          num_pay_year = 4;
          break;
        default:
          num_pay_year = 12;
      }

      mon_int_dec = this.calcData.interest / 12 / 100;
      num_pay_total = this.calcData.term * num_pay_year;
      let feeAmount = (this.calcData.fee / 100) * this.calcData.amount;

      // Include the fee amount in the loan amount
      let loanAmountWithFee = this.calcData.amount + feeAmount;

      this.PMT =
        (loanAmountWithFee *
          (mon_int_dec * Math.pow(1 + mon_int_dec, num_pay_total))) /
        (Math.pow(1 + mon_int_dec, num_pay_total) - 1);

      this.TIN =
        this.PMT * this.calcData.term * num_pay_year -
        this.calcData.amount -
        feeAmount;

      this.TAR = this.PMT * this.calcData.term * num_pay_year;

      this.TCL = this.TIN + feeAmount;

      this.PMT = this.roundNum(this.PMT);
      this.TAR = this.roundNum(this.TAR);
      this.TIN = this.roundNum(this.TIN);
      this.TCL = this.roundNum(this.TCL);

      this.outputData =  [this.calcData.amount, this.TIN, feeAmount];

    }
  }

  showOffers(){
    this.backendService.getLoanData().subscribe((data:any) => {
     // Handle the data received from the backend.
      console.log(data);
    });

    // this.backendService.fetchData()
    //   .then(data => {
    //     console.log(data);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching data:', error);
    //   });

  }

  roundNum(num: number): number {
    let temp = num.toFixed(2);
    return parseFloat(temp);
  }
}
