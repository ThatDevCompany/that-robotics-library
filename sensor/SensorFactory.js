"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorFactory = void 0;
const Sensor_1 = require("./Sensor");
const LightSensor_1 = require("./LightSensor");
const ProximitySensor_1 = require("./ProximitySensor");
function SensorFactory(config) {
    switch (config.type) {
        case Sensor_1.SensorType.LIGHT_SENSOR:
            return new LightSensor_1.LightSensor(config);
        case Sensor_1.SensorType.PROXIMITY_SENSOR:
            return new ProximitySensor_1.ProximitySensor(config);
    }
}
exports.SensorFactory = SensorFactory;
