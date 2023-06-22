import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'bni-pretest-web-nx-welcome',
  template: `
    <h2>Dashboard</h2>
    <div>
      <canvas id="productChart" width="400" height="400"></canvas>
    </div>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcomeComponent {}
