var settings = require('./appsettings');

var Server = require("./BackEnd/server");

var BLEscanner = require("./BackEnd/BLEscanner");

var BLE_NOBLE = require("./BackEnd/BLE_NOBLE");
var BLEemitter = require("./BackEnd/BLEemitter");


// -------------------------------------------
// ----------- SERVER ------------------------
// -------------------------------------------

new Server();

// -------------------------------------------
// ----------- SCANNERS -----------------------
// -------------------------------------------

//ports: 1880 (from 1880 to 1885 are used by Emitter)

new BLE_NOBLE({
    clientId: 'scanner-entrance',
    topic: settings.entranceTopic,
    topicDesc: "Entrance at ground floor",
    people: 0,
    port: 1880
});

new BLEscanner({
    clientId: 'scanner-exit',
    topic: settings.exitTopic,
    topicDesc: "Exit at ground floor",
    people: 0,
    port: 1881
});

new BLEscanner({
    clientId: 'scanner-Room100',
    topic: settings.firstFloorOfficeTopic,
    topicDesc: "Office at first floor",
    people: 0,
    port: 1882
});

new BLEscanner({
    clientId: 'scanner-Bath100',
    topic: settings.firstFloorBathTopic,
    topicDesc: "Bathroom at first floor",
    people: 0,
    port: 1883
});


// -------------------------------------------
// ----------- EMITTERS -----------------------
// -------------------------------------------

new BLEemitter({
    clientId: 'emitter-1',
});
new BLEemitter({
    clientId: 'emitter-2',
});
new BLEemitter({
    clientId: 'emitter-3',
});
new BLEemitter({
    clientId: 'emitter-4',
});

