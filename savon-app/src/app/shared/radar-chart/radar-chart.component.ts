import { Component, AfterViewInit, Input, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Chart, RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

// Enregistrement des composants Chart.js nécessaires
Chart.register(RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrl: './radar-chart.component.css'
})
export class RadarChartComponent implements AfterViewInit {
  @Input() title: string = 'Diagramme Radar';
  @Input() scores: number[] = [];
  
  @ViewChild('radarCanvas') radarCanvas!: ElementRef;
  
  readonly labels = [
    'Douceur',
    'Lavant',
    'Vol. mousse',
    'Tenue mousse',
    'Dureté',
    'Solubilité',
    'Séchage'
  ];
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  
  ngAfterViewInit(): void {
    // Vérifier si l'exécution est dans un navigateur
    if (isPlatformBrowser(this.platformId)) {
      // Utiliser un setTimeout pour permettre au DOM de se stabiliser
      setTimeout(() => {
        this.createChart();
      }, 0);
    }
  }
  
  private createChart(): void {
    if (this.radarCanvas && this.radarCanvas.nativeElement) {
      new Chart(this.radarCanvas.nativeElement, {
        type: 'radar',
        data: {
          labels: this.labels,
          datasets: [
            {
              label: this.title,
              data: this.scores,
              fill: true,
              backgroundColor: 'rgba(106, 27, 154, 0.2)',  // Violet clair transparent
              borderColor: 'rgb(106, 27, 154)',            // Violet foncé
              pointBackgroundColor: 'rgb(0, 230, 118)',    // Vert
              pointBorderColor: 'rgb(0, 230, 118)',        // Vert
              pointHoverBackgroundColor: 'rgb(255, 255, 255)',
              pointHoverBorderColor: 'rgb(0, 230, 118)',
              borderWidth: 2,
              pointRadius: 3,
              pointHoverRadius: 5
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { 
              display: false  // Masquer la légende
            },
            tooltip: {
              backgroundColor: 'rgba(106, 27, 154, 0.7)',
              titleFont: {
                size: 14
              },
              bodyFont: {
                size: 12
              },
              padding: 10,
              displayColors: false,
              position: 'nearest',
              yAlign: 'bottom',
              xAlign: 'center',
              caretPadding: 10,
              caretSize: 8
            }
          },
          scales: {
            r: {
              suggestedMin: 0,
              suggestedMax: 10,
              ticks: { 
                stepSize: 2,
                display: false,  // Masquer les graduations chiffrées
                color: '#666'
              },
              angleLines: {
                color: 'rgba(180, 180, 180, 0.4)',
              },
              grid: {
                color: 'rgba(180, 180, 180, 0.2)',
              },
              pointLabels: {
                font: {
                  size: 12,
                  weight: 'bold'
                },
                color: '#333',
                padding: 15,
                centerPointLabels: false
              }
            }
          }
        }
      });
    }
  }
}