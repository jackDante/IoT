# Prototype of an Indoor Contact Tracing Systems - IoT

```node backend_Simulator.js``` script'll initialise the backend part with some data (server, scanners...).
The client is based on Angular framework (v 9.0.4): you have to install the latest version and then run the ```ng serve --open``` command.
_______________________________________________________________________________________

## Prerequisites

### MODULES:
* https://www.npmjs.com/package/mosca
npm install mosca --save

* https://www.npmjs.com/package/websocket
npm install websocket

* https://www.npmjs.com/package/mqtt
npm install mqtt --save

* https://www.npmjs.com/package/mongodb
npm install mongodb --save

* https://www.npmjs.com/package/noble
npm install noble

* npm install --save-dev @angular-devkit/build-angular

## Usage

```javascript
npm install
``` 
run it in both "FrontEnd" and "BackEnd" folders to get the required node modules.

## HOW TO RUN

1. From FrontEnd folder run ```ng serve --open``` that it'll launch Frontend and automatically open the browser (at http://localhost:4200/ in order to see the live)

1. From IoT folder run ```node backend_Simulator.js``` that'll launch server, DB, scanners and emitters.

__NOTE:__ 
In this project we are using the [noble module](https://github.com/noble/noble) that detects the Bluetooth devices near the PC. The other scanners data are simulated via NodeJS. 


## HOW TO SOLVE Error: No compatible USB Bluetooth 4.0 device found! -> we have to ADD our USB adapter

Edit the file \bluetooth-hci-socket\lib\usb.js. 
Then I added ```usb.findByIds(0x8087, 0x0A2A)``` on line 66. The parameters were fetched from zadig.exe (program) based on my PC.

### VIDEO TUTORIAL:
* https://web.microsoftstream.com/video/1fcf0704-1ace-45a4-886a-6fbeeb7f34c2
This is the presentation

* https://www.dropbox.com/s/6d3molnr8hcac4b/2020-11-08%2011-32-04.mp4?dl=0
This is the video about the tutorial (how it works)
