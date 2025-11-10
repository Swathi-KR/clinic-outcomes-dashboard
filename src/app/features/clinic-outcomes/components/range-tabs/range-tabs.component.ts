import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-range-tabs',
  standalone: true,
  imports: [CommonModule, MatButtonToggleModule],
  templateUrl: './range-tabs.component.html',
  styleUrls: ['./range-tabs.component.scss']
})
export class RangeTabsComponent {
  @Input() selectedRange: number = 30;
  @Output() rangeChange = new EventEmitter<number>();

  selectRange(days: number) {
    this.rangeChange.emit(days);
  }
}