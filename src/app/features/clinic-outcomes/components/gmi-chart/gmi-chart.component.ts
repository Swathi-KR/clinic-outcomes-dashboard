import {
  Component,
  Input,
  OnChanges,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';

type Gmi = { good: number; moderate: number; bad: number };

@Component({
  selector: 'app-gmi-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gmi-chart.component.html',
  styleUrls: ['./gmi-chart.component.scss'],
})
export class GmiChartComponent implements AfterViewInit, OnChanges {
  @Input() gmi!: Gmi;

  // IMPORTANT: use SVGSVGElement (root <svg/>), not generic SVGElement
  @ViewChild('svgChart', { static: false }) svgRef!: ElementRef<SVGSVGElement>;
  @ViewChild('container', { static: false }) containerRef!: ElementRef<HTMLDivElement>;

  averageGmi = 0;

  private width = 400;
  private height = 300;
  private radius = 100;

  private color = d3
    .scaleOrdinal<string>()
    .domain(['good', 'moderate', 'bad'])
    .range(['#81CF35', '#FFAF33', '#EC1830']);

  ngAfterViewInit(): void {
    if (this.gmi) this.draw();
  }

  ngOnChanges(): void {
    if (!this.gmi) return;

    this.averageGmi = +(
      (6.5 * this.gmi.good) / 100 +
      (7.5 * this.gmi.moderate) / 100 +
      (8.5 * this.gmi.bad) / 100
    ).toFixed(1);

    if (this.svgRef) this.draw();
  }

  private draw(): void {
    const svgRoot = this.svgRef.nativeElement; // SVGSVGElement
    const svg = d3.select(svgRoot);
    svg.selectAll('*').remove();

    const cx = this.width / 2;
    const cy = this.height / 2;

    const data = [
      { key: 'good', label: '≤7%', value: this.gmi.good },
      { key: 'moderate', label: '7–8%', value: this.gmi.moderate },
      { key: 'bad', label: '≥8%', value: this.gmi.bad },
    ];

    const root = svg
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(${cx},${cy})`);

    // SVG tooltip group

    // Tooltip group
const tipLayer = svg.append('g')
.style('pointer-events', 'none')
.style('opacity', 0);

// Background box
const tipBg = tipLayer.append('rect')
.attr('rx', 6)
.attr('ry', 6)
.attr('fill', 'rgba(31, 41, 55, 0.87)')   // darker + subtle transparency
.attr('stroke', 'rgba(255,255,255,0.1)')
.attr('stroke-width', 1);

// Text
const tipText = tipLayer.append('text')
.attr('fill', '#fff')
.attr('font-size', 14)
.attr('font-weight', 600)
.attr('text-anchor', 'middle')
.attr('dominant-baseline', 'middle');

// * New: Tooltip pointer tail triangle *
const tipPointer = tipLayer.append('path')
.attr('fill', 'rgba(31, 41, 55, 0.92)');
 
    const pie = d3
      .pie<{ key: string; label: string; value: number }>()
      .value((d) => d.value)
      .sort(null);

    const arcs = pie(data);
    const arc = d3.arc<any>().innerRadius(0).outerRadius(this.radius);

    // Draw slices
    const slices = root
      .selectAll('path.slice')
      .data(arcs)
      .join('path')
      .attr('class', 'slice')
      .attr('d', arc as any)
      .attr('fill', (d) => this.color(d.data.key)!)
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer');

    // Helper to move tooltip near cursor using SVG coords

    const moveTip = (evt: MouseEvent, text: string) => {
      tipText.text(text);
    
      // Measure text width & height
      const bbox = (tipText.node() as SVGGraphicsElement).getBBox();
      const padX = 12, padY = 8;
      const width = bbox.width + padX * 2;
      const height = bbox.height + padY * 2;
    
      // Background (center above pointer)
      tipBg
        .attr('width', width)
        .attr('height', height)
        .attr('x', -width / 2)
        .attr('y', -height - 10);
    
      // Text centered inside pill
      tipText
        .attr('x', 0)
        .attr('y', -height / 2 - 10);
    
      // Pointer triangle
      tipPointer.attr(
        'd',
        `M -8 ${-10} L 0 ${2} L 8 ${-10}`
      );
    
      // Convert screen → SVG coords
      const pt = svgRoot.createSVGPoint();
      pt.x = evt.clientX;
      pt.y = evt.clientY;
      const svgP = pt.matrixTransform(svgRoot.getScreenCTM()!.inverse());
    
      tipLayer.attr('transform', `translate(${svgP.x}, ${svgP.y})`);
    };
    slices
    .on('mousemove', (event, d) => {
      const clinicalLabels: Record<string, string> = {
        '≤7%': 'Good Control',
        '7–8%': 'Moderate Control',
        '≥8%': 'High Risk'
      };
    
      moveTip(event, `${clinicalLabels[d.data.label]} • ${d.data.value}%`);
      tipLayer.style('opacity', 1);
    })

      .on('mouseenter', function () {
        d3.select(this).attr('stroke-width', 3);
        tipLayer.style('opacity', 1);
      })
      .on('mouseleave', function () {
        d3.select(this).attr('stroke-width', 2);
        tipLayer.style('opacity', 0);
      });

    // Horizontal leader lines + labels
    arcs.forEach((d) => {
      const mid = (d.startAngle + d.endAngle) / 2 - Math.PI / 2;
      const xEdge = Math.cos(mid) * this.radius;
      const yEdge = Math.sin(mid) * this.radius;
      const side = xEdge > 0 ? 1 : -1;

      const lineLen = 56;
      const xEnd = side * (this.radius + lineLen);
      const yEnd = yEdge;

      root
        .append('line')
        .attr('x1', xEdge)
        .attr('y1', yEdge)
        .attr('x2', xEnd)
        .attr('y2', yEnd)
        .attr('stroke', '#6B7280')
        .attr('stroke-width', 1);

      root
        .append('text')
        .text(`${d.data.value}%`)
        .attr('x', xEnd + side * 8)
        .attr('y', yEnd)
        .attr('text-anchor', side > 0 ? 'start' : 'end')
        .attr('alignment-baseline', 'middle')
        .attr('font-size', '14px')
        .attr('font-weight', '600')
        .attr('fill', '#374151');
    });
  }
}



