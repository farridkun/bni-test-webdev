import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'bni-pretest-web-dashboard-entry',
  template: `<bni-pretest-web-nx-welcome></bni-pretest-web-nx-welcome>`,
})
export class RemoteEntryComponent implements OnInit {
  chart: any;

  ngOnInit() {
    this.createChart();
  }

  createChart() {
    const data = {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    };

    const config: any = {
      type: 'bar',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };

    const canvas = document.getElementById('productChart') as HTMLCanvasElement;
    this.chart = new Chart(canvas, config);
  }
}
