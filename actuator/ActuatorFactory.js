"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActuatorFactory = void 0;
const Actuator_1 = require("./Actuator");
const WheelActuator_1 = require("./WheelActuator");
function ActuatorFactory(config) {
    switch (config.type) {
        case Actuator_1.ActuatorType.WHEEL:
            return new WheelActuator_1.WheelActuator(config);
    }
}
exports.ActuatorFactory = ActuatorFactory;
