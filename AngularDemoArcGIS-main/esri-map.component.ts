

// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { loadModules } from 'esri-loader';
// import bookshops from 'src/bookshops.json'; // Importăm fișierul JSON cu librăriile

// @Component({
//   selector: 'app-esri-map',
//   templateUrl: './esri-map.component.html',
//   styleUrls: ['./esri-map.component.scss']
// })
// export class EsriMapComponent implements OnInit {
//   @ViewChild('mapViewNode', { static: true }) private mapViewEl!: ElementRef;
//   private view: any; // Esri MapView
//   private graphicsLayer: any;
//   searchQuery: string = ''; // Variabila pentru termenul de căutare
//   private Graphic: any;
//   private Point: any;

//   constructor() {}

//   ngOnInit(): void {
//     this.initializeMap();
//   }

//   async initializeMap() {
//     const [Map, MapView, Graphic, GraphicsLayer, Locate, Point] = await loadModules([
//       'esri/Map',
//       'esri/views/MapView',
//       'esri/Graphic',
//       'esri/layers/GraphicsLayer',
//       'esri/widgets/Locate',
//       'esri/geometry/Point'
//     ]);

//     this.Graphic = Graphic; // Stocăm Graphic pentru utilizare ulterioară
//     this.Point = Point; // Stocăm Point pentru utilizare ulterioară

//     const map = new Map({
//       basemap: 'streets-navigation-vector',
//     });

//     this.view = new MapView({
//       container: this.mapViewEl.nativeElement,
//       map: map,
//       center: [26.1025, 44.4292], // București
//       zoom: 13,
//     });

//     this.graphicsLayer = new GraphicsLayer();
//     map.add(this.graphicsLayer);

//     const locateWidget = new Locate({
//       view: this.view
//     });

//     // Adăugăm widget-ul Locate pe hartă
//     this.view.ui.add(locateWidget, "top-left");

//     locateWidget.on("error", (error: any) => {
//       console.error("Eroare la localizare:", error);
//     });

//     // Adăugăm librăriile din JSON pe hartă
//     this.addBookshopsToMap();
//   }

//   addBookshopsToMap() {
//     bookshops.forEach((bookshop: any) => {
//       const point = new this.Point({
//         longitude: bookshop.longitude,
//         latitude: bookshop.latitude
//       });
  
//       const markerSymbol = {
//         type: 'simple-marker',
//         color: [255, 0, 0], // Roșu
//         size: 10,
//         outline: {
//           color: [255, 255, 255],
//           width: 1
//         }
//       };
  
//       const popupTemplate = {
//         title: `<h3 style="margin: 0; font-size: 18px; font-weight: bold;">${bookshop.name}</h3>`,
//         content: `
//           <div style="font-size: 14px; line-height: 1.5;">
//             <p><b>Address:</b> ${bookshop.address}</p>
//             <p><b>Sector:</b> ${bookshop.sector}</p>
//             <p><b>Opening Hours:</b> ${bookshop.opening_hours}</p>
//           </div>
//         `,
//         overwriteActions: true
//       };
  
//       const pointGraphic = new this.Graphic({
//         geometry: point,
//         symbol: markerSymbol,
//         popupTemplate: popupTemplate
//       });
  
//       this.graphicsLayer.add(pointGraphic);
//     });
  
//     console.log("Librăriile au fost adăugate pe hartă.");
//   }

//   findBookshops() {
//     // Ștergem punctele existente înainte de a afișa rezultatele căutării
//     this.graphicsLayer.removeAll();

//     // Căutăm librăriile pe baza termenului de căutare
//     const searchResults = bookshops.filter((bookshop: any) => {
//       const lowerCaseQuery = this.searchQuery.toLowerCase();
//       const lowerCaseName = bookshop.name.toLowerCase();
//       const firmName = bookshop.name.split(' ')[0].toLowerCase(); // Primul cuvânt din denumire
//       return lowerCaseName.includes(lowerCaseQuery) || firmName.includes(lowerCaseQuery);
//     });

//     if (searchResults.length === 0) {
//       alert("No results found for the given search query.");
//     } else {
//       searchResults.forEach((bookshop: any) => {
//         const point = new this.Point({
//           longitude: bookshop.longitude,
//           latitude: bookshop.latitude
//         });

//         const markerSymbol = {
//           type: 'simple-marker',
//           color: [0, 255, 0], // Verde pentru rezultate
//           size: 10,
//           outline: {
//             color: [255, 255, 255],
//             width: 1
//           }
//         };

//         const popupTemplate = {
//           title: `<h3 style="margin: 0; font-size: 18px; font-weight: bold;">${bookshop.name}</h3>`,
//           content: `
//             <div style="font-size: 14px; line-height: 1.5;">
//               <p><b>Address:</b> ${bookshop.address}</p>
//               <p><b>Sector:</b> ${bookshop.sector}</p>
//               <p><b>Opening Hours:</b> ${bookshop.opening_hours}</p>
//             </div>
//           `,
//           overwriteActions: true
//         };

//         const pointGraphic = new this.Graphic({
//           geometry: point,
//           symbol: markerSymbol,
//           popupTemplate: popupTemplate
//         });

//         this.graphicsLayer.add(pointGraphic);
//       });

//       console.log("Rezultatele căutării au fost adăugate pe hartă.");
//     }
//   }
// }












// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { loadModules } from 'esri-loader';
// import bookshops from 'src/bookshops.json'; // Importăm fișierul JSON cu librăriile

// @Component({
//   selector: 'app-esri-map',
//   templateUrl: './esri-map.component.html',
//   styleUrls: ['./esri-map.component.scss']
// })
// export class EsriMapComponent implements OnInit {
//   @ViewChild('mapViewNode', { static: true }) private mapViewEl!: ElementRef;
//   private view: any; // Esri MapView
//   private graphicsLayer: any;
//   searchQuery: string = ''; // Variabila pentru termenul de căutare
//   suggestions: string[] = []; // Sugestii de căutare
//   recentSearches: string[] = []; // Căutări recente
//   showSuggestions: boolean = false; // Controlează afișarea sugestiilor
//   private Graphic: any;
//   private Point: any;

//   constructor() {}

//   ngOnInit(): void {
//     this.initializeMap();
//   }

//   async initializeMap() {
//     const [Map, MapView, Graphic, GraphicsLayer, Locate, Point] = await loadModules([
//       'esri/Map',
//       'esri/views/MapView',
//       'esri/Graphic',
//       'esri/layers/GraphicsLayer',
//       'esri/widgets/Locate',
//       'esri/geometry/Point'
//     ]);

//     this.Graphic = Graphic; // Stocăm Graphic pentru utilizare ulterioară
//     this.Point = Point; // Stocăm Point pentru utilizare ulterioară

//     const map = new Map({
//       basemap: 'streets-navigation-vector',
//     });

//     this.view = new MapView({
//       container: this.mapViewEl.nativeElement,
//       map: map,
//       center: [26.1025, 44.4292], // București
//       zoom: 13,
//     });

//     this.graphicsLayer = new GraphicsLayer();
//     map.add(this.graphicsLayer);


//     // Adăugăm widget-ul Locate
//     const locateWidget = new Locate({
//       view: this.view
//     });

//     this.view.ui.add(locateWidget, 'top-left'); // Adăugăm butonul în partea stângă sus

//     locateWidget.on('locate', (event: any) => {
//       console.log('User location found:', event.position);
//       const userPoint = new this.Point({
//         longitude: event.position.coords.longitude,
//         latitude: event.position.coords.latitude
//       });

//       const userGraphic = new this.Graphic({
//         geometry: userPoint,
//         symbol: {
//           type: 'simple-marker',
//           color: [0, 0, 255],
//           size: 10,
//           outline: {
//             color: [255, 255, 255],
//             width: 1
//           }
//         },
//         popupTemplate: {
//           title: 'Current Location',
//           content: 'This is your current location.'
//         }
//       });

//       this.graphicsLayer.add(userGraphic);
//       this.view.goTo({ center: userPoint, zoom: 15 });
//     });

//     locateWidget.on('error', (error: any) => {
//       console.error('Error finding location:', error);
//     });

//     // Adăugăm librăriile din JSON pe hartă
//     this.displayAllBookshops(); // Afișăm librăriile inițial
//   }

//   displayAllBookshops() {
//     this.graphicsLayer.removeAll(); // Eliminăm toate marcajele existente
//     bookshops.forEach((bookshop: any) => {
//       const point = new this.Point({
//         longitude: bookshop.longitude,
//         latitude: bookshop.latitude
//       });

//       const markerSymbol = {
//         type: 'simple-marker',
//         color: [255, 0, 0], // Roșu
//         size: 10,
//         outline: {
//           color: [255, 255, 255],
//           width: 1
//         }
//       };


//       const popupTemplate = {
//         title: `<h3 style="margin: 0; font-size: 18px; font-weight: bold;">${bookshop.name}</h3>`,
//         content: `
//           <div style="font-size: 14px; line-height: 1.5;">
//             <p><b>Address:</b> ${bookshop.address}</p>
//             <p><b>Sector:</b> ${bookshop.sector}</p>
//             <p><b>Opening Hours:</b> ${bookshop.opening_hours}</p>
//           </div>
//         `,
//         overwriteActions: true
//       };

//       const pointGraphic = new this.Graphic({
//         geometry: point,
//         symbol: markerSymbol,
//         popupTemplate: popupTemplate
//       });

//       this.graphicsLayer.add(pointGraphic);
//     });

//     console.log("Toate librăriile au fost adăugate pe hartă.");
//   }

//   updateSuggestions() {
//     const bookshopNames = bookshops.map(bookshop => bookshop.name.toLowerCase());
//     const lowerCaseQuery = this.searchQuery.toLowerCase();

//     this.suggestions = bookshopNames
//       .filter(name => name.includes(lowerCaseQuery))
//       .slice(0, 5); // Max 5 sugestii

//     const recentMatches = this.recentSearches.filter(search => 
//       search.toLowerCase().includes(lowerCaseQuery)
//     );

//     this.suggestions = [...new Set([...recentMatches, ...this.suggestions])];
//   }

//   selectSuggestion(suggestion: string) {
//     this.searchQuery = suggestion;
//     this.findBookshops();
//     this.showSuggestions = false; // Ascundem bara de sugestii după selecție
//   }

//   findBookshops() {
//     this.graphicsLayer.removeAll(); // Eliminăm marcajele existente
  
//     const searchResults = bookshops.filter((bookshop: any) => {
//       const lowerCaseQuery = this.searchQuery.toLowerCase();
//       const lowerCaseName = bookshop.name.toLowerCase();
//       return lowerCaseName.includes(lowerCaseQuery);
//     });
  
//     if (searchResults.length === 0) {
//       alert("No results found for the given search query.");
//     } else {
//       const graphics = []; // Array pentru a stoca graficele punctelor rezultate
//       searchResults.forEach((bookshop: any) => {
//         const point = new this.Point({
//           longitude: bookshop.longitude,
//           latitude: bookshop.latitude
//         });
  
//         const markerSymbol = {
//           type: 'simple-marker',
//           color: [0, 255, 0], // Verde
//           size: 10,
//           outline: {
//             color: [255, 255, 255],
//             width: 1
//           }
//         };
  
//         const popupTemplate = {
//           title: `<h3 style="margin: 0; font-size: 18px; font-weight: bold;">${bookshop.name}</h3>`,
//           content: `
//             <div style="font-size: 14px; line-height: 1.5;">
//               <p><b>Address:</b> ${bookshop.address}</p>
//               <p><b>Sector:</b> ${bookshop.sector}</p>
//               <p><b>Opening Hours:</b> ${bookshop.opening_hours}</p>
//             </div>
//           `
//         };
  
//         const pointGraphic = new this.Graphic({
//           geometry: point,
//           symbol: markerSymbol,
//           popupTemplate: popupTemplate
//         });
  
//         graphics.push(pointGraphic); // Adăugăm punctul în array
//         this.graphicsLayer.add(pointGraphic);
//       });
  
//       // Centrăm harta pe graficele rezultate
//       if (graphics.length === 1) {
//         this.view.goTo({
//           target: graphics, // Centrăm pe toate graficele
//           zoom: 14          // Nivel de zoom specific
//         });
//       } else {
//         this.view.goTo({
//           target: graphics, // Centrăm pe toate graficele
//           zoom: 12          // Nivel de zoom specific
//         });
//       }
//       // Salvăm căutarea în istoric
//       if (!this.recentSearches.includes(this.searchQuery)) {
//         this.recentSearches.unshift(this.searchQuery);
//         this.recentSearches = this.recentSearches.slice(0, 5);
//       }
//     }
//   }

//   resetSearch() {
//     this.searchQuery = ''; // Resetăm câmpul de căutare
//     this.displayAllBookshops(); // Reafișăm toate librăriile
//   }

//   onFocusSearch() {
//     this.showSuggestions = true;
//   }

//   onBlurSearch() {
//     setTimeout(() => {
//       this.showSuggestions = false; // Ascundem bara de sugestii cu un mic delay
//     }, 200);
//   }
// }






// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import Locate from "@arcgis/core/widgets/Locate";
// import Graphic from "@arcgis/core/Graphic";
// import Point from "@arcgis/core/geometry/Point";
// import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
// import Map from "@arcgis/core/Map";
// import MapView from "@arcgis/core/views/MapView";
// import bookshops from 'src/bookshops.json'; // Importăm fișierul JSON cu librăriile

// @Component({
//   selector: 'app-esri-map',
//   templateUrl: './esri-map.component.html',
//   styleUrls: ['./esri-map.component.scss']
// })
// export class EsriMapComponent implements OnInit {
//   @ViewChild('mapViewNode', { static: true }) private mapViewEl!: ElementRef;
//   private view: any; // Declarăm vizualizarea pentru referință ulterioară
//   private graphicsLayer: any;

//   availableSectors: number[] = []; // Sectors available for filtering
//   selectedSector: string = ''; // Currently selected sector
//   openingHour: string = ''; // Current input for filtering by opening hour
//   filteredBookshops: any[] = []; // Stores the filtered list of bookshops

//   constructor() {}

//   ngOnInit(): void {
//     this.availableSectors = [...new Set(bookshops.map(shop => shop.sector))]; // Extract unique sectors
//     this.filteredBookshops = bookshops; // Start with all bookshops visible
//     this.initializeMap();
//   }

//   async initializeMap() {
//     const map = new Map({
//       basemap: 'streets-navigation-vector'
//     });

//     this.view = new MapView({
//       container: this.mapViewEl.nativeElement,
//       map: map,
//       center: [26.1025, 44.4292], // Centru inițial București
//       zoom: 13
//     });

//     this.graphicsLayer = new GraphicsLayer();
//     map.add(this.graphicsLayer);

//     const locateWidget = new Locate({
//       view: this.view
//     });
//     this.view.ui.add(locateWidget, "top-left");

//     this.updateMapMarkers(); // Initialize markers on the map
//   }

//   filterBookshops() {
//     const hourRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
//     const isValidHour = hourRegex.test(this.openingHour);

//     this.filteredBookshops = bookshops.filter((shop) => {
//       const matchesSector = this.selectedSector
//         ? shop.sector.toString() === this.selectedSector
//         : true;

//       const matchesOpeningHour = this.openingHour && isValidHour
//         ? this.isShopOpenAt(shop.opening_hours, this.openingHour)
//         : true;

//       return matchesSector && matchesOpeningHour;
//     });

//     this.updateMapMarkers();
//   }

//   isShopOpenAt(shopHours: string, targetHour: string): boolean {
//     const [start, end] = shopHours.split('-').map((time) => time.trim());
//     return targetHour >= start && targetHour <= end;
//   }

//   updateMapMarkers() {
//     this.graphicsLayer.removeAll();
//     this.filteredBookshops.forEach((shop) => {
//       const point = new Point({
//         longitude: shop.longitude,
//         latitude: shop.latitude
//       });

//       const markerSymbol = {
//         type: 'simple-marker',
//         color: [255, 0, 0],
//         outline: { color: [255, 255, 255], width: 1 }
//       };

//       const popupTemplate = {
//         title: shop.name,
//         content: `
//           <b>Address:</b> ${shop.address}<br>
//           <b>Sector:</b> ${shop.sector}<br>
//           <b>Opening Hours:</b> ${shop.opening_hours}
//         `
//       };

//       const pointGraphic = new Graphic({
//         geometry: point,
//         symbol: markerSymbol,
//         popupTemplate: popupTemplate
//       });

//       this.graphicsLayer.add(pointGraphic);
//     });
//   }

//   resetFilters() {
//     this.selectedSector = '';
//     this.openingHour = '';
//     this.filteredBookshops = bookshops;
//     this.updateMapMarkers();
//   }
// }




// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import Locate from "@arcgis/core/widgets/Locate";
// import Graphic from "@arcgis/core/Graphic";
// import Point from "@arcgis/core/geometry/Point";
// import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
// import Map from "@arcgis/core/Map";
// import MapView from "@arcgis/core/views/MapView";
// import bookshops from 'src/bookshops.json'; // Importăm fișierul JSON cu librăriile

// @Component({
//   selector: 'app-esri-map',
//   templateUrl: './esri-map.component.html',
//   styleUrls: ['./esri-map.component.scss']
// })
// export class EsriMapComponent implements OnInit {
//   @ViewChild('mapViewNode', { static: true }) private mapViewEl!: ElementRef;
//   private view: any; // Declarăm vizualizarea pentru referință ulterioară
//   private graphicsLayer: any;

//   availableSectors: number[] = []; // Sectors available for filtering
//   selectedSector: string = ''; // Currently selected sector
//   openingHour: string = '09:00'; // Default opening hour for filtering
//   filteredBookshops: any[] = []; // Stores the filtered list of bookshops
//   searchQuery: string = ''; // Search query for the search bar

//   constructor() {}

//   ngOnInit(): void {
//     this.availableSectors = [...new Set(bookshops.map(shop => shop.sector))].sort((a, b) => a - b); // Extract unique sectors and sort them
//     this.filteredBookshops = bookshops; // Start with all bookshops visible
//     this.initializeMap();
//   }

//   async initializeMap() {
//     const map = new Map({
//       basemap: 'streets-navigation-vector'
//     });

//     this.view = new MapView({
//       container: this.mapViewEl.nativeElement,
//       map: map,
//       center: [26.1025, 44.4292], // Centru inițial București
//       zoom: 13
//     });

//     this.graphicsLayer = new GraphicsLayer();
//     map.add(this.graphicsLayer);

//     const locateWidget = new Locate({
//       view: this.view
//     });
//     this.view.ui.add(locateWidget, "top-left");

//     this.updateMapMarkers(); // Initialize markers on the map
//   }

//   filterBookshops() {
//     this.filteredBookshops = bookshops.filter((shop) => {
//       const matchesSector = this.selectedSector
//         ? shop.sector.toString() === this.selectedSector
//         : true;

//       const matchesOpeningHour = this.isShopOpenAt(shop.opening_hours, this.openingHour);

//       return matchesSector && matchesOpeningHour;
//     });

//     this.updateMapMarkers();
//   }

//   isShopOpenAt(shopHours: string, targetHour: string): boolean {
//     const [start, end] = shopHours.split('-').map((time) => time.trim());
//     return targetHour >= start && targetHour <= end;
//   }

//   updateMapMarkers() {
//     this.graphicsLayer.removeAll();
//     this.filteredBookshops.forEach((shop) => {
//       const point = new Point({
//         longitude: shop.longitude,
//         latitude: shop.latitude
//       });

//       const markerSymbol = {
//         type: 'simple-marker',
//         color: [255, 0, 0],
//         outline: { color: [255, 255, 255], width: 1 }
//       };

//       const popupTemplate = {
//         title: shop.name,
//         content: `
//           <b>Address:</b> ${shop.address}<br>
//           <b>Sector:</b> ${shop.sector}<br>
//           <b>Opening Hours:</b> ${shop.opening_hours}
//         `
//       };

//       const pointGraphic = new Graphic({
//         geometry: point,
//         symbol: markerSymbol,
//         popupTemplate: popupTemplate
//       });

//       this.graphicsLayer.add(pointGraphic);
//     });
//   }

//   resetFilters() {
//     this.selectedSector = '';
//     this.openingHour = '09:00';
//     this.filteredBookshops = bookshops;
//     this.updateMapMarkers();
//   }

//   // Search functionality
//   updateSearchResults() {
//     this.filteredBookshops = bookshops.filter((shop) =>
//       shop.name.toLowerCase().includes(this.searchQuery.toLowerCase())
//     );
//     this.updateMapMarkers();
//   }
// }







// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import Locate from "@arcgis/core/widgets/Locate";
// import Graphic from "@arcgis/core/Graphic";
// import Point from "@arcgis/core/geometry/Point";
// import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
// import Map from "@arcgis/core/Map";
// import MapView from "@arcgis/core/views/MapView";
// import bookshops from 'src/bookshops.json'; // Importăm fișierul JSON cu librăriile

// @Component({
//   selector: 'app-esri-map',
//   templateUrl: './esri-map.component.html',
//   styleUrls: ['./esri-map.component.scss']
// })
// export class EsriMapComponent implements OnInit {
//   @ViewChild('mapViewNode', { static: true }) private mapViewEl!: ElementRef;
//   private view: any; // Declarăm vizualizarea pentru referință ulterioară
//   private graphicsLayer: any;

//   availableSectors: number[] = []; // Sectors available for filtering
//   availableOpeningHours: string[] = []; // Opening hours available for filtering
//   selectedSector: string = ''; // Currently selected sector
//   selectedOpeningHours: string = ''; // Currently selected opening hours
//   filteredBookshops: any[] = []; // Stores the filtered list of bookshops
//   searchQuery: string = ''; // Search query for the search bar

//   constructor() {}

//   ngOnInit(): void {
//     this.availableSectors = [...new Set(bookshops.map(shop => shop.sector))].sort((a, b) => a - b); // Extract unique sectors and sort them
//     this.availableOpeningHours = [...new Set(bookshops.map(shop => shop.opening_hours))].sort(); // Extract unique opening hours and sort them
//     this.filteredBookshops = bookshops; // Start with all bookshops visible
//     this.initializeMap();
//   }

//   async initializeMap() {
//     const map = new Map({
//       basemap: 'streets-navigation-vector'
//     });

//     this.view = new MapView({
//       container: this.mapViewEl.nativeElement,
//       map: map,
//       center: [26.1025, 44.4292], // Centru inițial București
//       zoom: 13
//     });

//     this.graphicsLayer = new GraphicsLayer();
//     map.add(this.graphicsLayer);

//     const locateWidget = new Locate({
//       view: this.view
//     });
//     this.view.ui.add(locateWidget, "top-left");

//     this.updateMapMarkers(); // Initialize markers on the map
//   }

//   filterBookshops() {
//     this.filteredBookshops = bookshops.filter((shop) => {
//       const matchesSector = this.selectedSector
//         ? shop.sector.toString() === this.selectedSector
//         : true;

//       const matchesOpeningHours = this.selectedOpeningHours
//         ? shop.opening_hours === this.selectedOpeningHours
//         : true;

//       return matchesSector && matchesOpeningHours;
//     });

//     this.updateMapMarkers();
//   }

//   updateMapMarkers() {
//     this.graphicsLayer.removeAll();
//     this.filteredBookshops.forEach((shop) => {
//       const point = new Point({
//         longitude: shop.longitude,
//         latitude: shop.latitude
//       });

//       const markerSymbol = {
//         type: 'simple-marker',
//         color: [255, 0, 0],
//         outline: { color: [255, 255, 255], width: 1 }
//       };

//       const popupTemplate = {
//         title: shop.name,
//         content: `
//           <b>Address:</b> ${shop.address}<br>
//           <b>Sector:</b> ${shop.sector}<br>
//           <b>Opening Hours:</b> ${shop.opening_hours}
//         `
//       };

//       const pointGraphic = new Graphic({
//         geometry: point,
//         symbol: markerSymbol,
//         popupTemplate: popupTemplate
//       });

//       this.graphicsLayer.add(pointGraphic);
//     });
//   }

//   resetFilters() {
//     this.selectedSector = '';
//     this.selectedOpeningHours = '';
//     this.filteredBookshops = bookshops;
//     this.updateMapMarkers();
//   }
// }





// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import Locate from "@arcgis/core/widgets/Locate";
// import Graphic from "@arcgis/core/Graphic";
// import Point from "@arcgis/core/geometry/Point";
// import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
// import Map from "@arcgis/core/Map";
// import MapView from "@arcgis/core/views/MapView";
// import bookshops from 'src/bookshops.json'; // Importăm fișierul JSON cu librăriile

// @Component({
//   selector: 'app-esri-map',
//   templateUrl: './esri-map.component.html',
//   styleUrls: ['./esri-map.component.scss']
// })
// export class EsriMapComponent implements OnInit {
//   @ViewChild('mapViewNode', { static: true }) private mapViewEl!: ElementRef;
//   private view: any; // Declarăm vizualizarea pentru referință ulterioară
//   private graphicsLayer: any;

//   availableSectors: number[] = []; // Sectors available for filtering
//   availableOpeningHours: string[] = []; // Opening hours available for filtering
//   selectedSector: string = ''; // Currently selected sector
//   selectedOpeningHours: string = ''; // Currently selected opening hours
//   filteredBookshops: any[] = []; // Stores the filtered list of bookshops
//   searchQuery: string = ''; // Search query for the search bar

//   constructor() {}

//   ngOnInit(): void {
//     this.availableSectors = [...new Set(bookshops.map(shop => shop.sector))].sort((a, b) => a - b); // Extract unique sectors and sort them
//     this.availableOpeningHours = [...new Set(bookshops.map(shop => shop.opening_hours))].sort(); // Extract unique opening hours and sort them
//     this.filteredBookshops = bookshops; // Start with all bookshops visible
//     this.initializeMap();
//   }

//   async initializeMap() {
//     const map = new Map({
//       basemap: 'streets-navigation-vector'
//     });

//     this.view = new MapView({
//       container: this.mapViewEl.nativeElement,
//       map: map,
//       center: [26.1025, 44.4292], // Centru inițial București
//       zoom: 13
//     });

//     this.graphicsLayer = new GraphicsLayer();
//     map.add(this.graphicsLayer);

//     const locateWidget = new Locate({
//       view: this.view
//     });
//     this.view.ui.add(locateWidget, "top-left");

//     this.updateMapMarkers(); // Initialize markers on the map
//   }

//   filterBookshops() {
//     this.filteredBookshops = bookshops.filter((shop) => {
//       const matchesSector = this.selectedSector
//         ? shop.sector.toString() === this.selectedSector
//         : true;

//       const matchesOpeningHours = this.selectedOpeningHours
//         ? shop.opening_hours === this.selectedOpeningHours
//         : true;

//       return matchesSector && matchesOpeningHours;
//     });

//     this.updateMapMarkers();
//   }

//   updateMapMarkers() {
//     const query = this.searchQuery.toLowerCase();
//     this.graphicsLayer.removeAll();

//     this.filteredBookshops
//       .filter((shop) => shop.name.toLowerCase().includes(query))
//       .forEach((shop) => {
//         const point = new Point({
//           longitude: shop.longitude,
//           latitude: shop.latitude
//         });

//         const markerSymbol = {
//           type: 'simple-marker',
//           color: [255, 0, 0],
//           outline: { color: [255, 255, 255], width: 1 }
//         };

//         const popupTemplate = {
//           title: shop.name,
//           content: `
//             <b>Address:</b> ${shop.address}<br>
//             <b>Sector:</b> ${shop.sector}<br>
//             <b>Opening Hours:</b> ${shop.opening_hours}
//           `
//         };

//         const pointGraphic = new Graphic({
//           geometry: point,
//           symbol: markerSymbol,
//           popupTemplate: popupTemplate
//         });

//         this.graphicsLayer.add(pointGraphic);
//       });
//   }

//   findBookshops() {
//     this.updateMapMarkers();
//   }

//   resetSearch() {
//     this.searchQuery = '';
//     this.updateMapMarkers();
//   }

//   resetFilters() {
//     this.selectedSector = '';
//     this.selectedOpeningHours = '';
//     this.filteredBookshops = bookshops;
//     this.resetSearch();
//   }
// }



// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import Locate from "@arcgis/core/widgets/Locate";
// import Graphic from "@arcgis/core/Graphic";
// import Point from "@arcgis/core/geometry/Point";
// import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
// import Map from "@arcgis/core/Map";
// import MapView from "@arcgis/core/views/MapView";
// import bookshops from 'src/bookshops.json'; // Importăm fișierul JSON cu librăriile

// @Component({
//   selector: 'app-esri-map',
//   templateUrl: './esri-map.component.html',
//   styleUrls: ['./esri-map.component.scss']
// })
// export class EsriMapComponent implements OnInit {
//   @ViewChild('mapViewNode', { static: true }) private mapViewEl!: ElementRef;
//   private view: any; // Declarăm vizualizarea pentru referință ulterioară
//   private graphicsLayer: any;

//   availableSectors: number[] = []; // Sectors available for filtering
//   availableOpeningHours: string[] = []; // Opening hours available for filtering
//   selectedSector: string = ''; // Currently selected sector
//   selectedOpeningHours: string = ''; // Currently selected opening hours
//   filteredBookshops: any[] = []; // Stores the filtered list of bookshops
//   searchQuery: string = ''; // Search query for the search bar

//   constructor() {}

//   ngOnInit(): void {
//     this.availableSectors = [...new Set(bookshops.map(shop => shop.sector))].sort((a, b) => a - b); // Extract unique sectors and sort them
//     this.availableOpeningHours = [...new Set(bookshops.map(shop => shop.opening_hours))].sort(); // Extract unique opening hours and sort them
//     this.filteredBookshops = bookshops; // Start with all bookshops visible
//     this.initializeMap();
//   }

//   async initializeMap() {
//     const map = new Map({
//       basemap: 'streets-navigation-vector'
//     });

//     this.view = new MapView({
//       container: this.mapViewEl.nativeElement,
//       map: map,
//       center: [26.1025, 44.4292], // Centru inițial București
//       zoom: 13
//     });

//     this.graphicsLayer = new GraphicsLayer();
//     map.add(this.graphicsLayer);

//     const locateWidget = new Locate({
//       view: this.view
//     });
//     this.view.ui.add(locateWidget, "top-left");

//     this.updateMapMarkers(); // Initialize markers on the map
//   }

//   filterBookshops() {
//     this.filteredBookshops = bookshops.filter((shop) => {
//       const matchesSector = this.selectedSector
//         ? shop.sector.toString() === this.selectedSector
//         : true;

//       const matchesOpeningHours = this.selectedOpeningHours
//         ? shop.opening_hours === this.selectedOpeningHours
//         : true;

//       return matchesSector && matchesOpeningHours;
//     });

//     this.updateMapMarkers();
//   }

//   updateMapMarkers() {
//     const query = this.searchQuery.toLowerCase();
//     this.graphicsLayer.removeAll();

//     this.filteredBookshops
//       .filter((shop) => shop.name.toLowerCase().includes(query))
//       .forEach((shop) => {
//         const point = new Point({
//           longitude: shop.longitude,
//           latitude: shop.latitude
//         });

//         const markerSymbol = {
//           type: 'simple-marker',
//           color: [255, 0, 0],
//           outline: { color: [255, 255, 255], width: 1 }
//         };

//         const popupTemplate = {
//           title: shop.name,
//           content: `
//             <b>Address:</b> ${shop.address}<br>
//             <b>Sector:</b> ${shop.sector}<br>
//             <b>Opening Hours:</b> ${shop.opening_hours}
//           `
//         };

//         const pointGraphic = new Graphic({
//           geometry: point,
//           symbol: markerSymbol,
//           popupTemplate: popupTemplate
//         });

//         this.graphicsLayer.add(pointGraphic);
//       });
//   }

//   findBookshops() {
//     this.updateMapMarkers();
//   }

//   resetSearch() {
//     this.searchQuery = '';
//     this.updateMapMarkers();
//   }

//   resetFilters() {
//     this.selectedSector = '';
//     this.selectedOpeningHours = '';
//     this.filteredBookshops = bookshops;
//     this.resetSearch();
//   }
// }






// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import Locate from "@arcgis/core/widgets/Locate";
// import Graphic from "@arcgis/core/Graphic";
// import Point from "@arcgis/core/geometry/Point";
// import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
// import Map from "@arcgis/core/Map";
// import MapView from "@arcgis/core/views/MapView";
// import bookshops from 'src/bookshops.json'; // Importăm fișierul JSON cu librăriile
// import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";

// @Component({
//   selector: 'app-esri-map',
//   templateUrl: './esri-map.component.html',
//   styleUrls: ['./esri-map.component.scss']
// })
// export class EsriMapComponent implements OnInit {
//   @ViewChild('mapViewNode', { static: true }) private mapViewEl!: ElementRef;
//   private view: any; // Declarăm vizualizarea pentru referință ulterioară
//   private graphicsLayer: any;

//   availableSectors: number[] = []; // Sectors available for filtering
//   availableOpeningHours: string[] = []; // Opening hours available for filtering
//   selectedSector: string = ''; // Currently selected sector
//   selectedOpeningHours: string = ''; // Currently selected opening hours
//   filteredBookshops: any[] = []; // Stores the filtered list of bookshops
//   searchQuery: string = ''; // Search query for the search bar

//   constructor() {}

//   ngOnInit(): void {
//     this.availableSectors = [...new Set(bookshops.map(shop => shop.sector))].sort((a, b) => a - b); // Extract unique sectors and sort them
//     this.availableOpeningHours = [...new Set(bookshops.map(shop => shop.opening_hours))].sort(); // Extract unique opening hours and sort them
//     this.filteredBookshops = bookshops; // Start with all bookshops visible
//     this.initializeMap();
//   }

//   async initializeMap() {
//     const map = new Map({
//       basemap: 'streets-navigation-vector'
//     });

//     this.view = new MapView({
//       container: this.mapViewEl.nativeElement,
//       map: map,
//       center: [26.1025, 44.4292], // Centru inițial București
//       zoom: 13
//     });

//     this.graphicsLayer = new GraphicsLayer();
//     map.add(this.graphicsLayer);

//     const locateWidget = new Locate({
//       view: this.view
//     });
//     this.view.ui.add(locateWidget, { position: "top-left", index: 2 });

//     // const zoomInButton = document.createElement('button');
//     // zoomInButton.innerHTML = '+';
//     // zoomInButton.className = 'esri-widget--button';
//     // zoomInButton.style.marginTop = '60px';
//     // zoomInButton.onclick = () => this.zoomIn();
//     // this.view.ui.add(zoomInButton, 'top-left');

//     // const zoomOutButton = document.createElement('button');
//     // zoomOutButton.innerHTML = '-';
//     // zoomOutButton.className = 'esri-widget--button';
//     // zoomOutButton.style.marginTop = '100px';
//     // zoomOutButton.onclick = () => this.zoomOut();
//     // this.view.ui.add(zoomOutButton, 'top-left');

//     // const currentLocationButton = document.createElement('button');
//     // currentLocationButton.innerHTML = '📍';
//     // currentLocationButton.className = 'esri-widget--button';
//     // currentLocationButton.style.marginTop = '140px';
//     // currentLocationButton.onclick = () => this.findCurrentLocation();
//     // this.view.ui.add(currentLocationButton, 'top-left');

//     this.updateMapMarkers(); // Initialize markers on the map
//   }

//   filterBookshops() {
//     this.filteredBookshops = bookshops.filter((shop) => {
//       const matchesSector = this.selectedSector
//         ? shop.sector.toString() === this.selectedSector
//         : true;

//       const matchesOpeningHours = this.selectedOpeningHours
//         ? shop.opening_hours === this.selectedOpeningHours
//         : true;

//       return matchesSector && matchesOpeningHours;
//     });

//     this.updateMapMarkers();
//   }

//   updateMapMarkers() {
//     const query = this.searchQuery.toLowerCase();
//     this.graphicsLayer.removeAll();

//     this.filteredBookshops
//       .filter((shop) => shop.name.toLowerCase().includes(query))
//       .forEach((shop) => {
//         const point = new Point({
//           longitude: shop.longitude,
//           latitude: shop.latitude
//         });

//         const markerSymbol = {
//           type: 'simple-marker',
//           color: [255, 0, 0],
//           outline: { color: [255, 255, 255], width: 1 }
//         };

//         const popupTemplate = {
//           title: shop.name,
//           content: `
//             <b>Address:</b> ${shop.address}<br>
//             <b>Sector:</b> ${shop.sector}<br>
//             <b>Opening Hours:</b> ${shop.opening_hours}
//           `
//         };

//         const pointGraphic = new Graphic({
//           geometry: point,
//           symbol: markerSymbol,
//           popupTemplate: popupTemplate
//         });

//         this.graphicsLayer.add(pointGraphic);
//       });
//   }

//   zoomIn() {
//     this.view.zoom += 1;
//   }

//   zoomOut() {
//     this.view.zoom -= 1;
//   }

//   findCurrentLocation() {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         const { latitude, longitude } = position.coords;
//         this.view.center = new Point({ longitude, latitude });
//         this.view.zoom = 15;

//         const locationGraphic = new Graphic({
//           geometry: new Point({ longitude, latitude }),
//           symbol: new SimpleMarkerSymbol({
//             color: [0, 0, 255],
//             size: 8,
//             outline: { color: [255, 255, 255], width: 1 }
//           }),
//           popupTemplate: {
//             title: 'Current Location',
//             content: 'You are here!'
//           }
//         });
        

//         this.graphicsLayer.add(locationGraphic);
//       });
//     }
//   }

//   findBookshops() {
//     this.updateMapMarkers();
//   }

//   resetSearch() {
//     this.searchQuery = '';
//     this.updateMapMarkers();
//   }

//   resetFilters() {
//     this.selectedSector = '';
//     this.selectedOpeningHours = '';
//     this.filteredBookshops = bookshops;
//     this.resetSearch();
//   }
// }



// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import Locate from "@arcgis/core/widgets/Locate";
// import Graphic from "@arcgis/core/Graphic";
// import Point from "@arcgis/core/geometry/Point";
// import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
// import Map from "@arcgis/core/Map";
// import MapView from "@arcgis/core/views/MapView";
// import bookshops from 'src/bookshops.json';

// @Component({
//   selector: 'app-esri-map',
//   templateUrl: './esri-map.component.html',
//   styleUrls: ['./esri-map.component.scss']
// })
// export class EsriMapComponent implements OnInit {
//   @ViewChild('mapViewNode', { static: true }) private mapViewEl!: ElementRef;
//   private view: any; // Map view reference
//   private graphicsLayer: any;

//   availableSectors: number[] = []; // Sectors for filtering
//   availableOpeningHours: string[] = ["10:00-22:00", "10:00-21:00", "09:00-20:00", "10:00-20:00", "09:30-21:00"];
//   selectedSector: string = ''; // Selected sector
//   selectedOpeningHours: string = ''; // Selected opening hours
//   filteredBookshops: any[] = []; // Filtered bookshops

//   searchQuery: string = ''; // Search bar query

//   constructor() {}

//   ngOnInit(): void {
//     this.availableSectors = [...new Set(bookshops.map(shop => shop.sector))].sort((a, b) => a - b); // Extract sectors
//     this.filteredBookshops = bookshops; // Initialize with all bookshops
//     this.initializeMap();
//   }

//   async initializeMap() {
//     const map = new Map({
//       basemap: 'streets-navigation-vector'
//     });

//     this.view = new MapView({
//       container: this.mapViewEl.nativeElement,
//       map: map,
//       center: [26.1025, 44.4292], // Centered on Bucharest
//       zoom: 13
//     });

//     this.graphicsLayer = new GraphicsLayer();
//     map.add(this.graphicsLayer);

//     const locateWidget = new Locate({
//       view: this.view
//     });
//     this.view.ui.add(locateWidget, "top-left");

//     this.updateMapMarkers(); // Initialize markers
//   }

//   filterBookshops() {
//     this.filteredBookshops = bookshops.filter((shop) => {
//       const matchesSector = this.selectedSector
//         ? shop.sector.toString() === this.selectedSector
//         : true;
//       const matchesOpeningHours = this.selectedOpeningHours
//         ? shop.opening_hours === this.selectedOpeningHours
//         : true;

//       return matchesSector && matchesOpeningHours;
//     });

//     this.updateMapMarkers();
//   }

//   updateMapMarkers() {
//     this.graphicsLayer.removeAll();
//     this.filteredBookshops.forEach((shop) => {
//       const point = new Point({
//         longitude: shop.longitude,
//         latitude: shop.latitude
//       });

//       const markerSymbol = {
//         type: 'simple-marker',
//         color: [255, 0, 0],
//         outline: { color: [255, 255, 255], width: 1 }
//       };

//       const popupTemplate = {
//         title: shop.name,
//         content: `
//           <b>Address:</b> ${shop.address}<br>
//           <b>Sector:</b> ${shop.sector}<br>
//           <b>Opening Hours:</b> ${shop.opening_hours}<br>
//         `
//       };

//       const pointGraphic = new Graphic({
//         geometry: point,
//         symbol: markerSymbol,
//         popupTemplate: popupTemplate
//       });

//       this.graphicsLayer.add(pointGraphic);
//     });
//   }

//   resetFilters() {
//     this.selectedSector = '';
//     this.selectedOpeningHours = '';
//     this.filteredBookshops = bookshops;
//     this.updateMapMarkers();
//   }

//   updateSearchResults() {
//     this.filteredBookshops = bookshops.filter((shop) =>
//       shop.name.toLowerCase().includes(this.searchQuery.toLowerCase())
//     );
//     this.updateMapMarkers();
//   }

//   findBookshops() {
//     this.updateSearchResults();
//   }

//   resetSearch() {
//     this.searchQuery = '';
//     this.filteredBookshops = bookshops;
//     this.updateMapMarkers();
//   }
// }



// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import Locate from "@arcgis/core/widgets/Locate";
// import Graphic from "@arcgis/core/Graphic";
// import Point from "@arcgis/core/geometry/Point";
// import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
// import Map from "@arcgis/core/Map";
// import MapView from "@arcgis/core/views/MapView";
// import bookshops from 'src/bookshops.json';

// @Component({
//   selector: 'app-esri-map',
//   templateUrl: './esri-map.component.html',
//   styleUrls: ['./esri-map.component.scss']
// })
// export class EsriMapComponent implements OnInit {
//   @ViewChild('mapViewNode', { static: true }) private mapViewEl!: ElementRef;
//   private view: any; // Map view reference
//   private graphicsLayer: any;

//   availableSectors: number[] = []; // Sectors for filtering
//   availableOpeningHours: string[] = ["10:00-22:00", "10:00-21:00", "09:00-20:00", "10:00-20:00", "09:30-21:00"];
//   selectedSector: string = ''; // Selected sector
//   selectedOpeningHours: string = ''; // Selected opening hours
//   filteredBookshops: any[] = []; // Filtered bookshops

//   searchQuery: string = ''; // Search bar query

//   constructor() {}

//   ngOnInit(): void {
//     this.availableSectors = [...new Set(bookshops.map(shop => shop.sector))].sort((a, b) => a - b); // Extract sectors
//     this.filteredBookshops = bookshops; // Initialize with all bookshops
//     this.initializeMap();
//   }

//   async initializeMap() {
//     const map = new Map({
//       basemap: 'streets-navigation-vector'
//     });

//     this.view = new MapView({
//       container: this.mapViewEl.nativeElement,
//       map: map,
//       center: [26.1025, 44.4292], // Centered on Bucharest
//       zoom: 13
//     });

//     this.graphicsLayer = new GraphicsLayer();
//     map.add(this.graphicsLayer);

//     const locateWidget = new Locate({
//       view: this.view
//     });
//     this.view.ui.add(locateWidget, "top-left");

//     this.updateMapMarkers(); // Initialize markers
//   }

//   filterBookshops() {
//     this.filteredBookshops = bookshops.filter((shop) => {
//       const matchesSector = this.selectedSector
//         ? shop.sector.toString() === this.selectedSector
//         : true;
//       const matchesOpeningHours = this.selectedOpeningHours
//         ? shop.opening_hours === this.selectedOpeningHours
//         : true;

//       return matchesSector && matchesOpeningHours;
//     });

//     this.updateMapMarkers();
//   }

//   updateMapMarkers() {
//     this.graphicsLayer.removeAll();
//     this.filteredBookshops.forEach((shop) => {
//       const point = new Point({
//         longitude: shop.longitude,
//         latitude: shop.latitude
//       });

//       const markerSymbol = {
//         type: 'simple-marker',
//         color: [255, 0, 0],
//         outline: { color: [255, 255, 255], width: 1 }
//       };

//       const popupTemplate = {
//         title: shop.name,
//         content: `
//           <b>Address:</b> ${shop.address}<br>
//           <b>Sector:</b> ${shop.sector}<br>
//           <b>Opening Hours:</b> ${shop.opening_hours}<br>
//         `
//       };

//       const pointGraphic = new Graphic({
//         geometry: point,
//         symbol: markerSymbol,
//         popupTemplate: popupTemplate
//       });

//       this.graphicsLayer.add(pointGraphic);
//     });
//   }

//   resetFilters() {
//     this.selectedSector = '';
//     this.selectedOpeningHours = '';
//     this.filteredBookshops = bookshops;
//     this.updateMapMarkers();
//   }

//   updateSearchResults() {
//     this.filteredBookshops = bookshops.filter((shop) =>
//       shop.name.toLowerCase().includes(this.searchQuery.toLowerCase())
//     );
//     this.updateMapMarkers();
//   }

//   findBookshops() {
//     this.updateSearchResults();
//   }

//   resetSearch() {
//     this.searchQuery = '';
//     this.filteredBookshops = bookshops;
//     this.updateMapMarkers();
//   }
// }












// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import Locate from "@arcgis/core/widgets/Locate";
// import Graphic from "@arcgis/core/Graphic";
// import Point from "@arcgis/core/geometry/Point";
// import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
// import Map from "@arcgis/core/Map";
// import MapView from "@arcgis/core/views/MapView";
// import bookshops from 'src/bookshops.json'; // Importăm fișierul JSON cu librăriile

// @Component({
//   selector: 'app-esri-map',
//   templateUrl: './esri-map.component.html',
//   styleUrls: ['./esri-map.component.scss']
// })
// export class EsriMapComponent implements OnInit {
//   @ViewChild('mapViewNode', { static: true }) private mapViewEl!: ElementRef;
//   private view: any; 
//   private graphicsLayer: any;

//   searchQuery: string = '';
//   showSuggestions: boolean = false;
//   suggestions: any[] = []; // Suggestions array
//   filteredBookshops: any[] = bookshops;

//   constructor() {}

//   ngOnInit(): void {
//     this.initializeMap();
//   }

//   async initializeMap() {
//     const map = new Map({
//       basemap: 'streets-navigation-vector',
//     });

//     this.view = new MapView({
//       container: this.mapViewEl.nativeElement,
//       map: map,
//       center: [26.1025, 44.4292],
//       zoom: 13,
//     });

//     this.graphicsLayer = new GraphicsLayer();
//     map.add(this.graphicsLayer);
//     this.updateMapMarkers();
//   }

//   updateMapMarkers() {
//     this.graphicsLayer.removeAll();
//     this.filteredBookshops.forEach((shop) => {
//       const point = new Point({
//         longitude: shop.longitude,
//         latitude: shop.latitude,
//       });

//       const markerSymbol = {
//         type: 'simple-marker',
//         color: [255, 0, 0],
//         outline: { color: [255, 255, 255], width: 1 },
//       };

//       const popupTemplate = {
//         title: shop.name,
//         content: `
//           <b>Address:</b> ${shop.address}<br>
//           <b>Sector:</b> ${shop.sector}<br>
//           <b>Opening Hours:</b> ${shop.opening_hours}
//         `,
//       };

//       const pointGraphic = new Graphic({
//         geometry: point,
//         symbol: markerSymbol,
//         popupTemplate: popupTemplate,
//       });

//       this.graphicsLayer.add(pointGraphic);
//     });
//   }

//   updateSuggestions() {
//     this.showSuggestions = true;
//     this.suggestions = bookshops.filter((shop) =>
//       shop.name.toLowerCase().includes(this.searchQuery.toLowerCase())
//     );
//   }

//   selectSuggestion(suggestion: any) {
//     this.searchQuery = suggestion.name;
//     this.showSuggestions = false;

//     // Center the map on the selected suggestion
//     this.view.goTo({
//       center: [suggestion.longitude, suggestion.latitude],
//       zoom: 15,
//     });
//   }

//   findBookshops() {
//     this.filteredBookshops = bookshops.filter((shop) =>
//       shop.name.toLowerCase().includes(this.searchQuery.toLowerCase())
//     );
//     this.updateMapMarkers();
//   }

//   resetSearch() {
//     this.searchQuery = '';
//     this.showSuggestions = false;
//     this.filteredBookshops = bookshops;
//     this.updateMapMarkers();
//   }
// }






// export class EsriMapComponent implements OnInit {
//   @ViewChild('mapViewNode', { static: true }) private mapViewEl!: ElementRef;
//   private view: any; // Declarăm vizualizarea pentru referință ulterioară
//   private graphicsLayer: any;

//   availableSectors: number[] = [];
//   availableOpeningHours: string[] = [];
//   selectedSector: string = '';
//   selectedOpeningHours: string = '';
//   showOpenNow: boolean = false;
//   filteredBookshops: any[] = [];
//   searchQuery: string = '';

//   constructor() {}

//   ngOnInit(): void {
//     this.availableSectors = [...new Set(bookshops.map(shop => shop.sector))].sort((a, b) => a - b);
//     this.availableOpeningHours = [...new Set(bookshops.map(shop => shop.opening_hours))].sort();
//     this.filteredBookshops = bookshops;
//     this.initializeMap();
//   }

//   async initializeMap() {
//     const map = new Map({
//       basemap: 'streets-navigation-vector'
//     });

//     this.view = new MapView({
//       container: this.mapViewEl.nativeElement,
//       map: map,
//       center: [26.1025, 44.4292],
//       zoom: 13
//     });

//     this.graphicsLayer = new GraphicsLayer();
//     map.add(this.graphicsLayer);

//     const locateWidget = new Locate({
//       view: this.view
//     });
//     this.view.ui.add(locateWidget, { position: "bottom-left", index: 1 });

//     this.view.ui.move("zoom", { position: "top-left", index: 2 });

//     // Adjust the buttons' positions under the filter bar
//     this.view.ui.components.forEach((component) => {
//       if (component.id === "zoom") {
//         component.container.style.marginTop = "380px";
//       }
//       if (component.id === "locate") {
//         component.container.style.marginTop = "320px";
//       }
//     });

//     this.updateMapMarkers();
//   }

//   filterBookshops() {
//     const now = new Date();
//     const currentHour = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

//     this.filteredBookshops = bookshops.filter((shop) => {
//       const matchesSector = this.selectedSector ? shop.sector.toString() === this.selectedSector : true;
//       const matchesHours = this.selectedOpeningHours ? shop.opening_hours === this.selectedOpeningHours : true;
//       const matchesOpenNow = this.showOpenNow ? this.isShopOpenAt(shop.opening_hours, currentHour) : true;

//       return matchesSector && matchesHours && matchesOpenNow;
//     });

//     this.updateMapMarkers();
//   }

//   isShopOpenAt(shopHours: string, currentHour: string): boolean {
//     const [start, end] = shopHours.split('-').map((time) => time.trim());
//     return currentHour >= start && currentHour <= end;
//   }

//   updateMapMarkers() {
//     this.graphicsLayer.removeAll();
//     this.filteredBookshops.forEach((shop) => {
//       const point = new Point({
//         longitude: shop.longitude,
//         latitude: shop.latitude
//       });

//       const markerSymbol = {
//         type: 'simple-marker',
//         color: [255, 0, 0],
//         outline: { color: [255, 255, 255], width: 1 }
//       };

//       const popupTemplate = {
//         title: shop.name,
//         content: `
//           <b>Address:</b> ${shop.address}<br>
//           <b>Sector:</b> ${shop.sector}<br>
//           <b>Opening Hours:</b> ${shop.opening_hours}
//         `
//       };

//       const pointGraphic = new Graphic({
//         geometry: point,
//         symbol: markerSymbol,
//         popupTemplate: popupTemplate
//       });

//       this.graphicsLayer.add(pointGraphic);
//     });
//   }

//   toggleOpenNow() {
//     this.showOpenNow = !this.showOpenNow;
//     this.filterBookshops();
//   }

//   resetFilters() {
//     this.selectedSector = '';
//     this.selectedOpeningHours = '';
//     this.showOpenNow = false;
//     this.filteredBookshops = bookshops;
//     this.updateMapMarkers();
//   }

//   updateSearchResults() {
//     this.filteredBookshops = bookshops.filter((shop) =>
//       shop.name.toLowerCase().includes(this.searchQuery.toLowerCase())
//     );
//     this.updateMapMarkers();
//   }

//   findBookshops() {
//     this.updateSearchResults();
//   }

//   resetSearch() {
//     this.searchQuery = '';
//     this.filteredBookshops = bookshops;
//     this.updateMapMarkers();
//   }
// }









// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import Locate from "@arcgis/core/widgets/Locate";
// import Graphic from "@arcgis/core/Graphic";
// import Point from "@arcgis/core/geometry/Point";
// import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
// import Map from "@arcgis/core/Map";
// import MapView from "@arcgis/core/views/MapView";
// import bookshops from 'src/bookshops.json'; // Importăm fișierul JSON cu librăriile

// @Component({
//   selector: 'app-esri-map',
//   templateUrl: './esri-map.component.html',
//   styleUrls: ['./esri-map.component.scss']
// })
// export class EsriMapComponent implements OnInit {
//   @ViewChild('mapViewNode', { static: true }) private mapViewEl!: ElementRef;
//   private view: any;
//   private graphicsLayer: any;

//   searchQuery: string = '';
//   showSuggestions: boolean = false;
//   suggestions: any[] = [];
//   filteredBookshops: any[] = bookshops;

//   availableSectors: number[] = [];
//   availableOpeningHours: string[] = ["10:00-22:00", "10:00-21:00", "09:00-20:00", "10:00-20:00", "09:30-21:00"];
//   selectedSector: string = '';
//   selectedOpeningHours: string = '';

//   constructor() {}

//   ngOnInit(): void {
//     this.availableSectors = [...new Set(bookshops.map(shop => shop.sector))].sort((a, b) => a - b);
//     this.filteredBookshops = bookshops;
//     this.initializeMap();
//   }

//   async initializeMap() {
//     const map = new Map({
//       basemap: 'streets-navigation-vector'
//     });

//     this.view = new MapView({
//       container: this.mapViewEl.nativeElement,
//       map: map,
//       center: [26.1025, 44.4292],
//       zoom: 13
//     });

//     this.graphicsLayer = new GraphicsLayer();
//     map.add(this.graphicsLayer);

//     const locateWidget = new Locate({
//       view: this.view
//     });
//     this.view.ui.add(locateWidget, "top-left");

//     this.updateMapMarkers();
//   }

//   filterBookshops() {
//     this.filteredBookshops = bookshops.filter((shop) => {
//       const matchesSector = this.selectedSector
//         ? shop.sector.toString() === this.selectedSector
//         : true;

//       const matchesHours = this.selectedOpeningHours
//         ? shop.opening_hours === this.selectedOpeningHours
//         : true;

//       return matchesSector && matchesHours;
//     });

//     this.updateMapMarkers();
//   }

//   updateMapMarkers() {
//     this.graphicsLayer.removeAll();
//     this.filteredBookshops.forEach((shop) => {
//       const point = new Point({
//         longitude: shop.longitude,
//         latitude: shop.latitude
//       });

//       const markerSymbol = {
//         type: 'simple-marker',
//         color: [255, 0, 0],
//         outline: { color: [255, 255, 255], width: 1 }
//       };

//       const popupTemplate = {
//         title: shop.name,
//         content: `
//           <b>Address:</b> ${shop.address}<br>
//           <b>Sector:</b> ${shop.sector}<br>
//           <b>Opening Hours:</b> ${shop.opening_hours}
//         `
//       };

//       const pointGraphic = new Graphic({
//         geometry: point,
//         symbol: markerSymbol,
//         popupTemplate: popupTemplate
//       });

//       this.graphicsLayer.add(pointGraphic);
//     });
//   }

//   resetFilters() {
//     this.selectedSector = '';
//     this.selectedOpeningHours = '';
//     this.filteredBookshops = bookshops;
//     this.updateMapMarkers();
//   }

//   updateSuggestions() {
//     this.showSuggestions = true;
//     this.suggestions = bookshops.filter((shop) =>
//       shop.name.toLowerCase().includes(this.searchQuery.toLowerCase())
//     );
//   }

//   selectSuggestion(suggestion: any) {
//     this.searchQuery = suggestion.name;
//     this.showSuggestions = false;

//     this.view.goTo({
//       center: [suggestion.longitude, suggestion.latitude],
//       zoom: 15,
//     });
//   }

//   findBookshops() {
//     this.filteredBookshops = bookshops.filter((shop) =>
//       shop.name.toLowerCase().includes(this.searchQuery.toLowerCase())
//     );
//     this.updateMapMarkers();
//   }

//   resetSearch() {
//     this.searchQuery = '';
//     this.showSuggestions = false;
//     this.filteredBookshops = bookshops;
//     this.updateMapMarkers();
//   }
// }



import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Locate from "@arcgis/core/widgets/Locate";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import bookshops from 'src/bookshops.json'; // Import JSON with bookshops data

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.scss']
})
export class EsriMapComponent implements OnInit {
  @ViewChild('mapViewNode', { static: true }) private mapViewEl!: ElementRef;
  private view: any;
  private graphicsLayer: any;

  searchQuery: string = '';
  showSuggestions: boolean = false;
  suggestions: any[] = [];
  filteredBookshops: any[] = bookshops;

  availableSectors: number[] = [];
  availableOpeningHours: string[] = ["10:00-22:00", "10:00-21:00", "09:00-20:00", "10:00-20:00", "09:30-21:00"];
  selectedSector: string = '';
  selectedOpeningHours: string = '';

  constructor() {}

  ngOnInit(): void {
    this.availableSectors = [...new Set(bookshops.map(shop => shop.sector))].sort((a, b) => a - b);
    this.filteredBookshops = bookshops;
    this.initializeMap();
  }

  async initializeMap() {
    const map = new Map({
      basemap: 'streets-navigation-vector'
    });

    this.view = new MapView({
      container: this.mapViewEl.nativeElement,
      map: map,
      center: [26.1025, 44.4292],
      zoom: 13
    });

    this.graphicsLayer = new GraphicsLayer();
    map.add(this.graphicsLayer);

    const locateWidget = new Locate({
      view: this.view
    });
    this.view.ui.add(locateWidget, "top-left");

    this.updateMapMarkers();
  }

  filterBookshops() {
    // Filter bookshops based on selected sector and opening hours
    this.filteredBookshops = bookshops.filter((shop) => {
      const matchesSector = this.selectedSector
        ? shop.sector.toString() === this.selectedSector
        : true;

      const matchesHours = this.selectedOpeningHours
        ? shop.opening_hours === this.selectedOpeningHours
        : true;

      return matchesSector && matchesHours;
    });

    this.updateMapMarkers();
  }

  resetFilters() {
    // Reset all filters
    this.selectedSector = '';
    this.selectedOpeningHours = '';
    this.filteredBookshops = bookshops;
    this.updateMapMarkers();
  }

  updateMapMarkers() {
    // Update map markers based on filtered bookshops
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
        `
      };

      const pointGraphic = new Graphic({
        geometry: point,
        symbol: markerSymbol,
        popupTemplate: popupTemplate
      });

      this.graphicsLayer.add(pointGraphic);
    });
  }

  updateSuggestions() {
    // Show suggestions based on the search query
    this.showSuggestions = true;
    this.suggestions = bookshops.filter((shop) =>
      shop.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  selectSuggestion(suggestion: any) {
    // Display only the selected suggestion on the map
    this.filteredBookshops = [suggestion];
    this.showSuggestions = false;

    this.view.goTo({
      center: [suggestion.longitude, suggestion.latitude],
      zoom: 15,
    });

    this.updateMapMarkers();
  }

  findBookshops() {
    // Filter bookshops based on the search query
    this.filteredBookshops = bookshops.filter((shop) =>
      shop.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.updateMapMarkers();
  }

  resetSearch() {
    // Reset search and display all bookshops
    this.searchQuery = '';
    this.filteredBookshops = bookshops;
    this.updateMapMarkers();
  }
}








// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import Locate from "@arcgis/core/widgets/Locate";
// import Graphic from "@arcgis/core/Graphic";
// import Point from "@arcgis/core/geometry/Point";
// import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
// import Map from "@arcgis/core/Map";
// import MapView from "@arcgis/core/views/MapView";
// import bookshops from 'src/bookshops.json'; // Importăm fișierul JSON cu librăriile

// @Component({
//   selector: 'app-esri-map',
//   templateUrl: './esri-map.component.html',
//   styleUrls: ['./esri-map.component.scss']
// })
// export class EsriMapComponent implements OnInit {
//   @ViewChild('mapViewNode', { static: true }) private mapViewEl!: ElementRef;
//   private view: any; // Declarăm vizualizarea pentru referință ulterioară
//   private graphicsLayer: any;

//   availableSectors: number[] = []; // Sectors available for filtering
//   selectedSector: string = ''; // Currently selected sector
//   showOpenNow: boolean = false; // Toggle to show only open bookshops
//   filteredBookshops: any[] = []; // Stores the filtered list of bookshops
//   searchQuery: string = ''; // Search query for the search bar

//   constructor() {}

//   ngOnInit(): void {
//     this.availableSectors = [...new Set(bookshops.map(shop => shop.sector))].sort((a, b) => a - b); // Extract unique sectors and sort them
//     this.filteredBookshops = bookshops; // Start with all bookshops visible
//     this.initializeMap();
//   }

//   async initializeMap() {
//     const map = new Map({
//       basemap: 'streets-navigation-vector'
//     });

//     this.view = new MapView({
//       container: this.mapViewEl.nativeElement,
//       map: map,
//       center: [26.1025, 44.4292], // Centru inițial București
//       zoom: 13
//     });

//     this.graphicsLayer = new GraphicsLayer();
//     map.add(this.graphicsLayer);

//     const locateWidget = new Locate({
//       view: this.view
//     });
//     this.view.ui.add(locateWidget, "top-left");

//     this.updateMapMarkers(); // Initialize markers on the map
//   }

//   filterBookshops() {
//     const now = new Date();
//     const currentHour = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

//     this.filteredBookshops = bookshops.filter((shop) => {
//       const matchesSector = this.selectedSector
//         ? shop.sector.toString() === this.selectedSector
//         : true;

//       const matchesOpenNow = this.showOpenNow
//         ? this.isShopOpenAt(shop.opening_hours, currentHour)
//         : true;

//       return matchesSector && matchesOpenNow;
//     });

//     this.updateMapMarkers();
//   }

//   isShopOpenAt(shopHours: string, currentHour: string): boolean {
//     const [start, end] = shopHours.split('-').map((time) => time.trim());
//     return currentHour >= start && currentHour <= end;
//   }

//   updateMapMarkers() {
//     this.graphicsLayer.removeAll();
//     this.filteredBookshops.forEach((shop) => {
//       const point = new Point({
//         longitude: shop.longitude,
//         latitude: shop.latitude
//       });

//       const markerSymbol = {
//         type: 'simple-marker',
//         color: [255, 0, 0],
//         outline: { color: [255, 255, 255], width: 1 }
//       };

//       const popupTemplate = {
//         title: shop.name,
//         content: `
//           <b>Address:</b> ${shop.address}<br>
//           <b>Sector:</b> ${shop.sector}<br>
//           <b>Opening Hours:</b> ${shop.opening_hours}
//         `
//       };

//       const pointGraphic = new Graphic({
//         geometry: point,
//         symbol: markerSymbol,
//         popupTemplate: popupTemplate
//       });

//       this.graphicsLayer.add(pointGraphic);
//     });
//   }

//   toggleOpenNow() {
//     this.showOpenNow = !this.showOpenNow;
//     this.filterBookshops();
//   }

//   resetFilters() {
//     this.selectedSector = '';
//     this.showOpenNow = false;
//     this.filteredBookshops = bookshops;
//     this.updateMapMarkers();
//   }

//   // Search functionality
//   updateSearchResults() {
//     this.filteredBookshops = bookshops.filter((shop) =>
//       shop.name.toLowerCase().includes(this.searchQuery.toLowerCase())
//     );
//     this.updateMapMarkers();
//   }
// }
