declare namespace google {
    export namespace maps {
      class LatLng {
        constructor(lat: number, lng: number);
      }
  
      class Map {
        constructor(mapDiv: HTMLElement, opts?: MapOptions);
        setCenter(latLng: LatLng): void;
        setOptions(options: MapOptions): void; // Add setOptions method
      }
  
      class Marker {
        constructor(opts: MarkerOptions);
      }
  
      interface MapOptions {
        center: LatLng;
        zoom: number;
      }
  
      interface MarkerOptions {
        position: LatLng;
        map: Map;
      }
  
      namespace places {
        class Autocomplete {
          constructor(input: HTMLInputElement, opts?: AutocompleteOptions);
          addListener(eventName: string, handler: Function): void;
          getPlace(): PlaceResult;
        }
  
        interface AutocompleteOptions {
          types: string[];
        }
  
        interface PlaceResult {
          formatted_address: string;
          geometry: {
            location: LatLng;
          };
        }
      }
    }
  }
  