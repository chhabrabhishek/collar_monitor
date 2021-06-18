export interface Location {
    latitude: number;
    longitude: number;
    zoom: number;
    icon: string;
    marker: Marker
}

export interface Marker {
    lat: number;
    long: number;
    temp: number;
    name: string;
    isInDanger: boolean;
    suitedHabitat: string;
}

export interface Coordinates {
    Latitude: string;
    Longitude: string;
    Temperature: string;
}
