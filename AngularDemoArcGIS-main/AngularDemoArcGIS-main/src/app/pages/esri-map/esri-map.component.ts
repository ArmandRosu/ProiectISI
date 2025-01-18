import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Locate from '@arcgis/core/widgets/Locate';
import esriConfig from '@arcgis/core/config';
import Collection from '@arcgis/core/core/Collection';
import bookshops from 'src/bookshops.json'; // JSON cu librării
import RouteParameters from '@arcgis/core/rest/support/RouteParameters';
import FeatureSet from '@arcgis/core/rest/support/FeatureSet';
import * as route from '@arcgis/core/rest/route';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.scss']
})
export class EsriMapComponent implements OnInit {
  @ViewChild('mapViewNode', { static: true }) private mapViewEl!: ElementRef;

  // Variabile pentru căutare și filtre
  searchQuery: string = '';
  showSuggestions: boolean = false;
  suggestions: any[] = [];
  filteredBookshops = bookshops;

  selectedSector: string = '';
  selectedOpeningHours: string = '';
  availableSectors: string[] = [];
  availableOpeningHours: string[] = ["10:00-22:00", "10:00-21:00", "09:00-20:00", "10:00-20:00", "09:30-21:00"];

  private view: any;
  private graphicsLayer = new GraphicsLayer();
  private routeLayer: GraphicsLayer = new GraphicsLayer();


  constructor() {}

  ngOnInit() {
    esriConfig.apiKey = "AAPTxy8BH1VEsoebNVZXo8HurEIH6COp6zjJhpUjTD0oQmOEqtWjpyAFusDqwqx3HTl_LFn_pWy1M9OAOIuZsFWoToqJ6InJFgACJ33qb4cyDiqg7SmL5oPieQONwexb5Azkd8U_EYPmlc71bQ-1dfdxK8NaIbRMMDd5h-BtcLuvfbSGcv5eXbfv9qriMgtv2dKVSP5lrFgLlzqd7EpqiNNKw048djxUJNZ25OGFeTwrcgM.AT1_tJztzRCj";

    this.initializeSectors();
    this.initializeMap();
  }

  // Inițializare sectoare și intervale de lucru
  initializeSectors() {
    this.availableSectors = [...new Set(bookshops.map((shop) => shop.sector.toString()))].sort();
  }

initializeMap() {
  const map = new Map({
    basemap: 'streets-navigation-vector',
    layers: [this.graphicsLayer, this.routeLayer]
  });

  this.view = new MapView({
    container: this.mapViewEl.nativeElement,
    map: map,
    center: [26.1025, 44.4292],
    zoom: 13
  });

  const locateWidget = new Locate({
    view: this.view
  });
  this.view.ui.add(locateWidget, 'top-left');

  this.view.when(() => {
    console.log("MapView is ready.");
    this.addBookshopMarkers();

    this.view.on("click", async (event: any) => {
      const screenPoint = { x: event.x, y: event.y };
      const hitResponse = await this.view.hitTest(screenPoint);

      if (hitResponse.results.length > 0) {
        const graphic = hitResponse.results[0].graphic;
        console.log("Selected graphic:", graphic);

        if (graphic && graphic.popupTemplate?.actions) {
          graphic.popupTemplate.actions.forEach((action: any) => {
            if (action.id === "show-route") {
              console.log("Action 'show-route' detected.");
              if (graphic.geometry) {
                const latitude = graphic.geometry.latitude;
                const longitude = graphic.geometry.longitude;

                this.calculateRoute(latitude, longitude);
              } else {
                console.error("No geometry available for the selected feature.");
                alert("Cannot calculate route. No geometry available.");
              }
            }
          });
        }
      }
    });
  });
}



  // Adăugare marcaje pentru librării
  addBookshopMarkers() {
    this.graphicsLayer.removeAll();

    this.filteredBookshops.forEach((shop) => {
      const point = new Point({
        longitude: shop.longitude,
        latitude: shop.latitude
      });

      const markerSymbol = {
        type: 'simple-marker',
        color: [255, 0, 0],
        outline: { color: [255, 255, 255], width: 1 }
      };

      const popupTemplate = {
        title: shop.name,
        content: `
          <b>Address:</b> ${shop.address}<br>
          <b>Sector:</b> ${shop.sector}<br>
          <b>Opening Hours:</b> ${shop.opening_hours}
        `,
        actions: new Collection([
          {
            //title: 'Show Route',
            id: 'show-route',
            className: 'esri-icon-navigation'
          }
        ])
      };

      const graphic = new Graphic({
        geometry: point,
        symbol: markerSymbol,
        popupTemplate: popupTemplate
      });

      this.graphicsLayer.add(graphic);
    });

    // Gestionare acțiune popup pentru afișare rută
    this.view.on("popup-trigger-action", (event: any) => {
      console.log("Popup action triggered:", event);
    
      if (event.action.id === "show-route") {
        const selectedFeature = this.view.popup.selectedFeature;
        console.log("Selected feature:", selectedFeature);
    
        if (selectedFeature && selectedFeature.geometry) {
          const latitude = selectedFeature.geometry.latitude;
          const longitude = selectedFeature.geometry.longitude;
    
          // Apelează funcția de calculare a rutei
          console.log(`Calculating route`)
          this.calculateRoute(latitude, longitude);
        } else {
          console.error("No geometry available for the selected feature.");
          alert("Cannot calculate route. No geometry available.");
        }
      }
    });
    
    
  }

  // Calculare rută către librăria selectată
  async calculateRoute(latitude: number, longitude: number) {
    console.log(`Calculating route to: Latitude=${latitude}, Longitude=${longitude}`);
  
      // Ștergem traseul anterior
    this.routeLayer.removeAll();

    // Verificăm locația curentă a utilizatorului
    const userLocation = await this.getCurrentLocation();
  
    if (!userLocation) {
      console.error("Unable to retrieve user location.");
      alert("Unable to retrieve user location.");
      return;
    }
  
    // URL-ul pentru serviciul de rutare Esri
    const routeUrl = "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";
  
    // Configurarea parametrilor pentru rutare
    const routeParams = new RouteParameters({
      stops: new FeatureSet({
        features: [
          new Graphic({
            geometry: new Point({
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }),
          }),
          new Graphic({
            geometry: new Point({
              latitude: latitude,
              longitude: longitude,
            }),
          }),
        ],
      }),
      returnDirections: true,
    });
  
    try {
      // Calculăm ruta
      const data = await route.solve(routeUrl, routeParams);
  
      // Afișăm ruta pe hartă
      this.displayRoute(data);
    } catch (error) {
      console.error("Error calculating route:", error);
      alert("Error calculating route.");
    }
  }
  
  private async getCurrentLocation(): Promise<{ latitude: number; longitude: number } | null> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            console.error("Error retrieving location:", error);
            reject(null);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        reject(null);
      }
    });
  }
private displayRoute(data: any) {
  console.log("Displaying route data:", data);

  // Curățăm rutele existente
  this.routeLayer.removeAll();

  // Adăugăm rutele noi
  for (const result of data.routeResults) {
    const routeGraphic = new Graphic({
      geometry: result.route.geometry,
      symbol: new SimpleLineSymbol({
        color: [0, 0, 255],
        width: 4
      })
    });

    this.routeLayer.add(routeGraphic);
  }

  if (data.routeResults.length > 0) {
    //alert("Route calculated successfully!");
  } else {
    alert("No directions found.");
  }
}

  

  // Metode pentru căutare
  updateSuggestions() {
    this.showSuggestions = true;
    this.suggestions = bookshops.filter((shop) =>
      shop.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  findBookshops() {
    this.filteredBookshops = bookshops.filter((shop) =>
      shop.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.addBookshopMarkers();
  }

  resetSearch() {
    this.searchQuery = '';
    this.filteredBookshops = bookshops;
    this.addBookshopMarkers();
  }

  selectSuggestion(suggestion: any) {
    this.searchQuery = suggestion.name;
    this.filteredBookshops = [suggestion];
    this.showSuggestions = false;

    this.view.goTo({
      center: [suggestion.longitude, suggestion.latitude],
      zoom: 15
    });

    this.addBookshopMarkers();
  }

  // Metode pentru filtrare
  filterBookshops() {
    this.filteredBookshops = bookshops.filter((shop) => {
      const matchesSector = this.selectedSector
        ? shop.sector.toString() === this.selectedSector
        : true;

      const matchesHours = this.selectedOpeningHours
        ? shop.opening_hours === this.selectedOpeningHours
        : true;

      return matchesSector && matchesHours;
    });

    this.addBookshopMarkers();
  }

  resetFilters() {
    this.selectedSector = '';
    this.selectedOpeningHours = '';
    this.filteredBookshops = bookshops;
    this.addBookshopMarkers();
  }
}
