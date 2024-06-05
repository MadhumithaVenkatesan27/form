import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Transaction {
  type: string;
  amount: number;
  reason: string;
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {

  reactiveForm: FormGroup;

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      type: new FormControl(),
      amount: new FormControl(),
      reason: new FormControl()
    });
  }

  transactions: Transaction[] = [];

  get totalIncome(): number {
    return this.transactions
      .filter(transaction => transaction.type === 'Income')
      .reduce((account, transaction) => account + transaction.amount, 0);
  }

  get totalExpenses(): number {
    return this.transactions
      .filter(transaction => transaction.type === 'Expense')
      .reduce((account, transaction) => account + transaction.amount, 0);
  }

  get expensesPercentageOfIncome(): number {
    const totalIncome = this.totalIncome;
    if (totalIncome === 0) return 0;
    const percentage = (this.totalExpenses / totalIncome) * 100;
    return percentage;
  }

  get savingPercentage(): number {
    const totalIncome = this.totalIncome;
    if (totalIncome === 0) return 0;
    const percentage = ((totalIncome - this.totalExpenses) / totalIncome) * 100;
    return percentage >= 0 ? percentage : 0;
  }

  get savingsInRupees(): number {
    return this.totalIncome - this.totalExpenses;
  }


  addTransaction(transaction: Transaction): void {
    this.transactions.push(transaction);
  }

  onSubmit() {
    const transaction: Transaction = this.reactiveForm.value;
    transaction.amount = +transaction.amount; 
    this.addTransaction(transaction);
    console.log(this.reactiveForm.value);
  }
}
