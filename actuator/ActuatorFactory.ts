import { Actuator, ActuatorConfig, ActuatorType } from './Actuator'
import { WheelActuator } from './WheelActuator'

export function ActuatorFactory(config: ActuatorConfig): Actuator {
	switch (config.type) {
		case ActuatorType.WHEEL:
			return new WheelActuator(config)
	}
}
