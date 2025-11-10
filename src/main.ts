import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  Chart,
  registerables,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  ArcElement,
  PieController,
  Tooltip,
  Legend
} from 'chart.js';

// ✅ Register ALL required chart types/controllers/scales
Chart.register(...registerables,
  ChartDataLabels,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  ArcElement,
  PieController,
  Tooltip,
  Legend
);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
