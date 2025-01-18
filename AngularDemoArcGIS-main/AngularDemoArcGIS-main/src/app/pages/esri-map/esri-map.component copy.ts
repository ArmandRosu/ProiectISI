import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  OnDestroy
} from "@angular/core";

import { Subscription } from "rxjs";
import { FirebaseService, IDatabaseItem } from "src/app/services/firebase";
import { SuperheroFactoryService } from "src/app/services/superhero-factory";

import esri = __esri; // Esri TypeScript Types

import Config from "@arcgis/core/config";
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import Bookmarks from "@arcgis/core/widgets/Bookmarks";
import Expand from "@arcgis/core/widgets/Expand";

import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";

import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Locate from "@arcgis/core/widgets/Locate";
import Track from "@arcgis/core/widgets/Track";
import Search from "@arcgis/core/widgets/Search"; // Import the Search widget

import FeatureSet from "@arcgis/core/rest/support/FeatureSet";
import RouteParameters from "@arcgis/core/rest/support/RouteParameters";
import * as route from "@arcgis/core/rest/route.js";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, update } from "firebase/database";

class MyPoint {
  public latitude;
  public longitude;

  constructor(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
}

@Component({
  selector: "app-esri-map",
  templateUrl: "./esri-map.component.html",
  styleUrls: ["./esri-map.component.scss"]
})
export class EsriMapComponent implements OnInit, OnDestroy {
  // firebase sync
  isConnected: boolean = false;
  subscriptionList: Subscription;
  subscriptionObj: Subscription;

  listItems: IDatabaseItem[] = [];
  listPoints: MyPoint[] = [];
  len_listItems = 0;

  @Output() mapLoadedEvent = new EventEmitter<boolean>();

  @ViewChild("mapViewNode", { static: true }) private mapViewEl: ElementRef;

  map: esri.Map;
  view: esri.MapView;
  graphicsLayer: esri.GraphicsLayer;
  graphicsLayerUserPoints: esri.GraphicsLayer;
  graphicsLayerRoutes: esri.GraphicsLayer;
  trailheadsLayer: esri.FeatureLayer;

  zoom = 12;
  center: Array<number> = [26.1025, 44.4268];
  basemap = "streets-vector";
  loaded = false;
  directionsElement: any;

  constructor(private fbs: FirebaseService, private sfs: SuperheroFactoryService) {

  }

  ngOnInit() {
    this.initializeMap().then(() => {
      this.loaded = this.view.ready;
      this.mapLoadedEvent.emit(true);
    });

    setInterval(() => {
      this.repeatingFunction();
    }, 2000);
  }

  repeatingFunction() {
    console.log("This function runs every 2 seconds");
    if (this.listItems.length < this.len_listItems) {
      let nr_removed = this.len_listItems - this.listItems.length;

      console.log(this.listItems.length.toString());
      console.log(this.len_listItems.toString());
      console.log(nr_removed.toString() + " Items Removed");
      this.len_listItems--;
    }
  }

  connectFirebase() {
    if (this.isConnected) {
        return;
    }
    this.isConnected = true;
    this.fbs.connectToDatabase();
    this.subscriptionList = this.fbs.getChangeFeedList().subscribe((items: IDatabaseItem[]) => {
        console.log("list updated: ", items);
        this.listItems = items;
    });
    this.subscriptionObj = this.fbs.getChangeFeedObject().subscribe((stat: IDatabaseItem) => {
        console.log("object updated: ", stat);
    });
  }

  addListItem() {
      let latitude = Math.random() * 180 - 90; 
      let longitude = Math.random() * 360 - 180;
      this.addPoint(latitude, longitude);
      this.len_listItems++;
      let my_point = new MyPoint(latitude, longitude);
      this.listPoints.push(my_point)
      let newItemValue: string = "Latitude: " + latitude.toString() + "; Longitude: " + longitude.toString();
      this.fbs.addListObject(newItemValue);
  }

  removeItems() {
      this.fbs.removeListItems();
      this.removePoints();
      this.len_listItems = 0;
      this.listPoints = [];
  }

  disconnectFirebase() {
      if (this.subscriptionList != null) {
          this.subscriptionList.unsubscribe();
      }
      if (this.subscriptionObj != null) {
          this.subscriptionObj.unsubscribe();
      }
  }

  async initializeMap() {
    try {
      Config.apiKey =
        "AAPTxy8BH1VEsoebNVZXo8HurEIH6COp6zjJhpUjTD0oQmOEqtWjpyAFusDqwqx3HTl_LFn_pWy1M9OAOIuZsFWoToqJ6InJFgACJ33qb4cyDiqg7SmL5oPieQONwexb5Azkd8U_EYPmlc71bQ-1dfdxK8NaIbRMMDd5h-BtcLuvfbSGcv5eXbfv9qriMgtv2dKVSP5lrFgLlzqd7EpqiNNKw048djxUJNZ25OGFeTwrcgM.AT1_tJztzRCj";

      const mapProperties: esri.WebMapProperties = {
        basemap: this.basemap
      };
      this.map = new WebMap(mapProperties);

      this.addFeatureLayers();
      this.addGraphicsLayer();

      const mapViewProperties = {
        container: this.mapViewEl.nativeElement,
        center: this.center,
        zoom: this.zoom,
        map: this.map
      };
      this.view = new MapView(mapViewProperties);

      // Add Locate widget
      const locateWidget = new Locate({
        view: this.view
      });
      this.view.ui.add(locateWidget, "top-left");

      // Add Track widget
      const trackWidget = new Track({
        view: this.view,
        graphic: new Graphic({
          symbol: new SimpleMarkerSymbol({
            color: "green",
            size: "12px",
            outline: {
              color: "#efefef",
              width: "1.5px"
            }
          })
        })
      });
      this.view.ui.add(trackWidget, "top-left");

      // Add Search widget for place search
      const searchWidget = new Search({
        view: this.view
      });
      this.view.ui.add(searchWidget, "top-right");

      this.view.on("pointer-move", ["Shift"], (event) => {
        const point = this.view.toMap({ x: event.x, y: event.y });
        console.log("Map pointer moved: ", point.longitude, point.latitude);
      });

      await this.view.when();
      console.log("ArcGIS map loaded");
      this.addRouting();
      
      return this.view;
    } catch (error) {
      console.error("Error loading the map: ", error);
      alert("Error loading the map");
    }
  }

  addFeatureLayers() {
    this.trailheadsLayer = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0",
      outFields: ["*"]
    });
    this.map.add(this.trailheadsLayer);

    const trailsLayer = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0"
    });
    this.map.add(trailsLayer, 0);

    const parksLayer = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0"
    });
    this.map.add(parksLayer, 0);

    console.log("Feature layers added");
  }

  addGraphicsLayer() {
    this.graphicsLayer = new GraphicsLayer();
    this.map.add(this.graphicsLayer);
    this.graphicsLayerUserPoints = new GraphicsLayer();
    this.map.add(this.graphicsLayerUserPoints);
    this.graphicsLayerRoutes = new GraphicsLayer();
    this.map.add(this.graphicsLayerRoutes);
  }

  addRouting() {
    const routeUrl =
      "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";
    this.view.on("click", (event) => {
      this.view.hitTest(event).then((elem: esri.HitTestResult) => {
        if (elem && elem.results && elem.results.length > 0) {
          let point: esri.Point = elem.results.find(
            (e) => e.layer === this.trailheadsLayer
          )?.mapPoint;
          if (point) {
            console.log("get selected point: ", elem, point);
            if (this.graphicsLayerUserPoints.graphics.length === 0) {
              this.addPoint(point.latitude, point.longitude);
            } else if (this.graphicsLayerUserPoints.graphics.length === 1) {
              this.addPoint(point.latitude, point.longitude);
              this.calculateRoute(routeUrl);
            } else {
              this.removePoints();
            }
          }
        }
      });
    });
  }

  addPoint(lat: number, lng: number) {
    let point = new Point({
      longitude: lng,
      latitude: lat
    });

    const simpleMarkerSymbol = new SimpleMarkerSymbol({
      color: [226, 119, 40], // Orange
      outline: {
        color: [255, 255, 255], // White
        width: 1
      }
    });

    let pointGraphic: esri.Graphic = new Graphic({
      geometry: point,
      symbol: simpleMarkerSymbol
    });

    this.graphicsLayerUserPoints.add(pointGraphic);
  }

  removePoints() {
    this.graphicsLayerUserPoints.removeAll();
  }

  removeRoutes() {
    this.graphicsLayerRoutes.removeAll();
  }

  async calculateRoute(routeUrl: string) {
    const routeParams = new RouteParameters({
      stops: new FeatureSet({
        features: this.graphicsLayerUserPoints.graphics.toArray()
      }),
      returnDirections: true
    });

    try {
      const data = await route.solve(routeUrl, routeParams);
      this.displayRoute(data);
    } catch (error) {
      console.error("Error calculating route: ", error);
      alert("Error calculating route");
    }
  }

  displayRoute(data: any) {
    for (const result of data.routeResults) {
      result.route.symbol = {
        type: "simple-line",
        color: [5, 150, 255],
        width: 3
      };
      this.graphicsLayerRoutes.graphics.add(result.route);
    }
    if (data.routeResults.length > 0) {
      this.showDirections(data.routeResults[0].directions.features);
    } else {
      alert("No directions found");
    }
  }

  clearRouter() {
    if (this.view) {
      this.removeRoutes();
      this.removePoints();
      console.log("Route cleared");
      this.view.ui.remove(this.directionsElement);
      this.view.ui.empty("top-right");
      console.log("Directions cleared");
    }
  }

  showDirections(features: any[]) {
    this.directionsElement = document.createElement("ol");
    this.directionsElement.classList.add(
      "esri-widget",
      "esri-widget--panel",
      "esri-directions__scroller"
    );
    this.directionsElement.style.marginTop = "0";
    this.directionsElement.style.padding = "15px 15px 15px 30px";

    features.forEach((result, i) => {
      const direction = document.createElement("li");
      direction.innerHTML = `${result.attributes.text} (${result.attributes.length} miles)`;
      this.directionsElement.appendChild(direction);
    });

    this.view.ui.empty("top-right");
    this.view.ui.add(this.directionsElement, "top-right");
  }

  ngOnDestroy() {
    if (this.view) {
      this.view.container = null;
      this.view.destroy();
      this.view = null;
    }
  }
}
