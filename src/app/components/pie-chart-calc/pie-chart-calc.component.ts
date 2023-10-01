import { Component, Input } from '@angular/core';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-pie-chart-calc',
  templateUrl: './pie-chart-calc.component.html',
  styleUrls: ['./pie-chart-calc.component.scss']
})
export class PieChartCalcComponent {

  public chart: any;

  @Input()
  public data: any = [300, 240, 100];

  options = {
    aspectRatio: 1,
    responsive: true, // Enable responsiveness
    maintainAspectRatio: false, // Maintain aspect ratio    
    plugins: {
      legend: {
        labels: {
          color: 'white', // Change the font color for Pie Chart labels
          font: {
            size: 16,
          },
          padding: 20
        },
      },
    },
  }

ngOnInit():void{

this.createChart(this.data);

}

createChart(inputData: any){

  this.chart = new Chart("MyChart", {
    type: 'pie', //this denotes tha type of chart

    data: {// values on X-Axis
      labels: ['Kwota kredytu', 'Odsetki','Prowizja banku'],
       datasets: [{
  label: 'My First Dataset',
  data: inputData,
  backgroundColor: [
    'blue',
    'orange',	
    'rgba(255, 99, 132, 0.6)'		
  ],
  hoverOffset: 4
}],
    },
    options: this.options

  });
}




}
