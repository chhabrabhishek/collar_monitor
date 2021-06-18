# Collar Monitor

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.4.

# Prerequisites

Both the Angular CLI and generated project have dependencies that require Node 14.17.0 or higher, together with NPM 7.17.0 or higher.
## Angular Installation
### Install Globally

```bash
npm install -g @angular/cli
```


# Getting Started

Super simple Angular app with 1 module and 2 routes. This is a minor variation on the Tour of Heroes I wrote for the [official docs](https://angular.io/tutorial).

## Get the Code
```
git clone '' collarMonitor
cd collarMonitor
npm i
```

## Run the flask app to enable web service. This needs to be done from CollarKafka Repository collar_kafka
```
      
      export FLASK_APP=servejson
      flask run --host=0.0.0.0
```

## Running the app

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Components

Current Web UI uses 3 major components:

###### 1. Title Component : Title Component consists of a tool bar consisting of a header and a toggle switch which 'mocks' weather.
###### 2. Agm Component : Agm Component use a Google Maps API , which is used to monitors real time location of endangered animals.
###### 3. Actions Component : Action Component displays the current status and vitals of the animal under observation and displays dangers it is facing and helps user take action regarding it.



## Working

The Collar Monitor is a interactive single web page UI which acts as a Monitoring tool for endangered animals. All the animals wearing the smart collar device would be displayed on the google map component on the UI.

The Map also shows different type of regions which may prove hazardous to the animals and if any animal would be in any danger, the marker associated with that animal will start bouncing on the map.

When the bouncing marker would be clicked the action component would display all the status and vitals of the selected animal and would highlight the current danger under which the animal is, Also this component would contain a button labeled "Inform Authorities" which when clicked will help us inform the designated authorities about the probable danger so that appropriate actions can be taken well within in time.



## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.




## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
