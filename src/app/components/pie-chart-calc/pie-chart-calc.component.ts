import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-pie-chart-calc',
  templateUrl: './pie-chart-calc.component.html',
  styleUrls: ['./pie-chart-calc.component.scss']
})
export class PieChartCalcComponent {

  public chart: any;

  @Input()
  public data: any;

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

ngOnChanges(changes: SimpleChanges): void {
  if (changes['data'] && !changes['data'].firstChange) {
    // If the 'data' input changes and it's not the initial change, re-draw the chart.
    this.createChart(this.data);
  }
}

createChart(inputData: any){

  if (this.chart) {
    // If a chart instance exists, destroy it before creating a new one.
    this.chart.destroy();
  }

  this.chart = new Chart("MyChart", {
    type: 'pie', //this denotes tha type of chart

    data: {// values on X-Axis
      labels: ['Loan amount', 'Interest','Bank fee'],
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
