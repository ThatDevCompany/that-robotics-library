"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LightSensor = void 0;
const ProximitySensor_1 = require("./ProximitySensor");
class LightSensor extends ProximitySensor_1.ProximitySensor {
    constructor() {
        super(...arguments);
        this.icon = 'fa-sun';
    }
}
exports.LightSensor = LightSensor;
