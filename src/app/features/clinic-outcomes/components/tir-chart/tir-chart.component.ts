import { Component, Input, OnChanges, SimpleChanges, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-tir-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './tir-chart.component.html',
  styleUrls: ['./tir-chart.component.scss']
})
export class TirChartComponent implements OnChanges, AfterViewInit {
  @Input() tir!: { veryLow: number; low: number; target: number; high: number };
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  
  showTooltip = false;
  barChartPlugins = [ChartDataLabels];

  // Define exact colors from RGB values
  private readonly COLORS = {
    veryLow: 'rgb(236, 24, 48)',      // Red
    low: 'rgb(236, 24, 48)',          // Red (same as very low)
    target: 'rgb(129, 207, 53)',      // Green
    high: 'rgb(255, 175, 51)',        // Orange
    veryHigh: 'rgb(255, 175, 51)'     // Orange (same as high)
  };

  // Create consistent left-to-right diagonal striped pattern
  private createStripedPattern(color: string, ctx: CanvasRenderingContext2D): CanvasPattern | null {
    const canvas = document.createElement('canvas');
    const patternCtx = canvas.getContext('2d');
    
    if (!patternCtx) return null;
    
    canvas.width = 8;
    canvas.height = 8;
    
    // Fill background with the base color
    patternCtx.fillStyle = color;
    patternCtx.fillRect(0, 0, 8, 8);
    
    // Draw white diagonal stripes (45° left-to-right)
    patternCtx.strokeStyle = '#ffffff';
    patternCtx.lineWidth = 2;
    
    patternCtx.beginPath();
    patternCtx.moveTo(0, 8);
    patternCtx.lineTo(8, 0);
    patternCtx.stroke();
    
    patternCtx.beginPath();
    patternCtx.moveTo(-4, 4);
    patternCtx.lineTo(4, -4);
    patternCtx.stroke();
    
    patternCtx.beginPath();
    patternCtx.moveTo(4, 12);
    patternCtx.lineTo(12, 4);
    patternCtx.stroke();
    
    return ctx.createPattern(canvas, 'repeat');
  }

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [''],
    datasets: [
      {
        label: 'Very Low',
        data: [0],
        backgroundColor: this.COLORS.veryLow,
        borderWidth: 0,
        barThickness: 90
      },
      {
        label: 'Low',
        data: [0],
        backgroundColor: this.COLORS.low,
        borderWidth: 0,
        barThickness: 90
      },
      {
        label: 'In Range',
        data: [0],
        backgroundColor: this.COLORS.target,
        borderWidth: 0,
        barThickness: 90
      },
      {
        label: 'High',
        data: [0],
        backgroundColor: this.COLORS.high,
        borderWidth: 0,
        barThickness: 90
      }
    ]
  };

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 10,
        right: 80,
        bottom: 10,
        left: 10
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleColor: '#fff',
        bodyColor: '#fff',
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        },
        displayColors: true,
        callbacks: {
          title: (context) => {
            return context[0].dataset.label || '';
          },
          label: (context) => {
            const value = context.parsed.y;
            const ranges: { [key: string]: string } = {
              'Very Low': '<54 mg/dL',
              'Low': '54-70 mg/dL',
              'In Range': '70-180 mg/dL',
              'High': '180-240 mg/dL'
            };
            const range = ranges[context.dataset.label || ''] || '';
            return [
              `${value}% of time`,
              `Range: ${range}`
            ];
          }
        }
      },
      datalabels: {
        color: '#4B5563',
        anchor: 'center',
        align: 'right',
        offset: 60,
        font: {
          size: 16,
          weight: 500
        },
        formatter: (value: number) => {
          return value > 0 ? value + '%' : '';
        }
      }
    },
    scales: {
      x: {
        stacked: true,
        display: false,
        grid: {
          display: false
        }
      },
      y: {
        stacked: true,
        beginAtZero: true,
        max: 100,
        display: false,
        grid: {
          display: false
        }
      }
    }
  };

  ngAfterViewInit(): void {
    setTimeout(() => {
      const canvas = document.querySelector('canvas');
      if (canvas && this.barChartData.datasets) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Apply striped pattern only to Low (index 1) and High (index 3)
          const lowPattern = this.createStripedPattern(this.COLORS.low, ctx);
          const highPattern = this.createStripedPattern(this.COLORS.high, ctx);
          
          if (lowPattern) this.barChartData.datasets[1].backgroundColor = lowPattern as any;
          if (highPattern) this.barChartData.datasets[3].backgroundColor = highPattern as any;
          
          if (this.chart) {
            this.chart.update();
          }
        }
      }
    }, 100);
  }
  ngOnChanges(): void {
    if (!this.tir) return;
  
    // ✅ Reassign dataset objects so Angular + Chart.js detect the change
    this.barChartData = {
      labels: [''],
      datasets: [
        {
          label: 'Very Low',
          data: [this.tir.veryLow],
          backgroundColor: this.COLORS.veryLow,
          borderWidth: 0,
          barThickness: 90
        },
        {
          label: 'Low',
          data: [this.tir.low],
          backgroundColor: this.COLORS.low,
          borderWidth: 0,
          barThickness: 90
        },
        {
          label: 'In Range',
          data: [this.tir.target],
          backgroundColor: this.COLORS.target,
          borderWidth: 0,
          barThickness: 90
        },
        {
          label: 'High',
          data: [this.tir.high],
          backgroundColor: this.COLORS.high,
          borderWidth: 0,
          barThickness: 90
        }
      ]
    };
  
    // ✅ Force chart refresh
    if (this.chart) {
      this.chart.update();
    }
  }
  toggleTooltip(): void {
    this.showTooltip = !this.showTooltip;
  }
}
