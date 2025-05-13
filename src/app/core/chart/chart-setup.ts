import {
  Chart,
  LineElement,
  LineController,
  PointElement,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  CategoryScale
} from 'chart.js';

Chart.register(
  LineElement,
  LineController,
  PointElement,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  CategoryScale
);

console.log('[Chart Setup] Chart.js components registered.');
