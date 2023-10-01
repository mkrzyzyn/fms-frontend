import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoanCalculatorComponent } from './components/loan-calculator/loan-calculator.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  {
   path: "dashboard",
   component: DashboardComponent,
  },
  {  
    path: "loancalculator",
    component: LoanCalculatorComponent
    }
  ,
  {
    path: "**",
    redirectTo: "dashboard",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
