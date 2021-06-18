import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Coordinates, Location, Marker} from '../../models/location.model';
import { DangerCategories } from './danger-cat.enum';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-agm',
  templateUrl: './agm.component.html',
  styleUrls: ['./agm.component.css']
})
export class AgmComponent implements OnInit {

  redCircleLat = 28.653483;
  redCircleLong = 77.271218;
  circleRadius = 20;

  greenCircleLat = 28.654067;
  greenCircleLong = 77.270936;

  location: Location = {
    latitude: 28.653848,
    longitude: 77.271182,
    zoom: 19,
    icon: '../../../assets/panda-bear.svg',
    marker: {
      lat: 0,
      long: 0,
      temp: 0,
      name: '',
      isInDanger: false,
      suitedHabitat: ''
    }
  };

  staticMarkers = [
    {
      name: 'Deer',
      lat: 28.654070,
      long: 77.272659,
      temp: 98,
      icon: '../../../assets/deer.svg',
      isInDanger: false,
      suitedHabitat: 'Deers usually adapt to wide range of temperatures but they prefer lower 60s to mid 70s degrees of temperature with humid conditions'
    },
    {
      name: 'Tiger',
      lat: 28.654169,
      long: 77.272212,
      temp: 98,
      icon: '../../../assets/tiger-icon.svg',
      isInDanger: false,
      suitedHabitat: 'Tigers like the constant shade and prefer temperatures betweeen 64 degrees celsius and can reach up to 91 degrees'
    },
    {
      name: 'Elephant',
      lat: 28.6537166,
      long: 77.269384,
      temp: 150,
      icon: '../../../assets/elephant.svg',
      isInDanger: false,
      suitedHabitat: 'Elephants can survive below freezing temperatures as well as temperatures above 120 degrees Fahrenheit for short periods.'
    },
    {
      name: 'Wolf',
      lat: 28.654220,
      long: 77.269559,
      temp: 98,
      icon: '../../../assets/wolf.svg',
      isInDanger: false,
      suitedHabitat: 'Wolves tolerate a wide range of temperatures, from -70 to 120 degrees Fahrenheit'
    },
    {
      name: 'Farmer',
      lat: 28.654067,
      long: 77.270936,
      temp: 98,
      icon: '../../../assets/farmer.svg',
      isInDanger: false,
      suitedHabitat: 'The suited habitat temperature humans survives in, is dynamic'
    }
  ]
  
  dangerCategory: Array<String> = [];

  animate: any;

  selectedAnimal: any;
  showAnimalStatus = false;
  isToggled = false;
  isInDanger = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    setInterval(()=> { 
      this.http.get<Coordinates>('http://localhost:5000/serve')
        .subscribe(data => {
          let marker: Marker = {
            lat: parseFloat(data['Latitude']),
            long: parseFloat(data['Longitude']),
            temp: parseFloat(data['Temperature']),
            name: 'Panda',
            isInDanger: false,
            suitedHabitat: 'Pandas prefer to live in habitats that were about 64-69° Farhenheit'
          };
          this.location['marker'] = marker;
          this.dangerCategory = [];
          if(this.isToggled) {
            marker['temp'] = 67;
          } 
          this.isInDanger = this.getDangerZoneStatus(this.location['marker'], this.redCircleLat, this.redCircleLong)
          if(!this.isInDanger){
            this.isInDanger = this.getDangerZoneStatus(this.location['marker'], this.greenCircleLat, this.greenCircleLong)
          }
        })
    }, 2000);
    
  }

  getDangerZoneStatus(marker: Marker, circleLat: number, circleLong: number){

    let isInRedZone = this.getDistanceBetween(marker.lat,marker.long,circleLat,circleLong,this.circleRadius);
    if(isInRedZone){
      this.dangerCategory.push(DangerCategories.InRedZone);
    }
    
    let isInBlueZone = this.getDistanceBetween(marker.lat,marker.long,this.greenCircleLat,this.greenCircleLong,this.circleRadius);
    if(isInBlueZone){
      this.dangerCategory.push(DangerCategories.isInBlueZone);
    }
    
    let isHabitatSuitable = this.getHabitatHazardStatus(marker.temp);
    if(isHabitatSuitable){
      this.dangerCategory.push(DangerCategories.isInHabitatHazard);
    }
    
    let isInDanger = false;
    if(isInRedZone || isInBlueZone || isHabitatSuitable){
      isInDanger = true;
      this.animate = 'BOUNCE';
    }
    else{
      this.animate = null;
    }
    if(isInDanger){
      marker['isInDanger'] = true;
    }
    this.selectedAnimal.name == 'Panda'? this.selectedAnimal = marker: null;
    return isInDanger;
  }

  getDistanceBetween(lat1: number, long1: number, lat2: number, long2: number, radius: number){
    var from = new google.maps.LatLng(lat1,long1);
    var to = new google.maps.LatLng(lat2,long2);

    if(google.maps.geometry.spherical.computeDistanceBetween(from,to) <= radius){    
      console.log('Radius',radius);
      console.log('Distance Between',google.maps.geometry.spherical.computeDistanceBetween(
        from,to
      ));
      return true;
    }else{
      return false;
    }
  }

  getHabitatHazardStatus(temp: number){
    if(this.isToggled){
      return false;
    }
    else{
      if(temp>64 && temp<69){
        return false;
      }
      else{
        return true;
      }
    }
  }

  isDeerOrElephant(marker: any){
    return marker.name == 'Deer' || marker.name == 'Elephant'? "BOUNCE": "DROP"; 
  }

  onMarkerClicked(animal: any){
    this.selectedAnimal = animal;
    this.showAnimalStatus = true;
  }

  onToggle(event: any){
    this.isToggled = event;
  }
}
