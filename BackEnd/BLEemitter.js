var mqtt = require('mqtt');
var settings = require('../appsettings')



module.exports = class BLEemitter {

  constructor(emitterDevice){
    this.scannerPortToConnectTo = -1;
    this.scannerConnectedTo = null;
    this.emitterId = emitterDevice.clientId;
    setInterval(this.startEmitter, settings.personRefreshMs, this);    
  }

  startEmitter(self){
    var min_range = 1881
    var max_range = 1883

    var auxScannerPort = Math.floor(Math.random() * (max_range - min_range) + min_range);
    if(auxScannerPort !== self.scannerPortToConnectTo){
      if(self.scannerConnectedTo){
        self.scannerConnectedTo.end();
      }

      self.scannerPortToConnectTo = auxScannerPort;
      
      this.clientSettings = {
        port: self.scannerPortToConnectTo,
        clientId: self.emitterId
      }
      // -- from settings
      self.scannerConnectedTo = mqtt.connect(settings.mqttUrl, this.clientSettings);
    }   
  }
}