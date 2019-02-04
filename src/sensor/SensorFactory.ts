import { Sensor, SensorType, SensorConfig } from './Sensor'
import { LightSensor } from './LightSensor'
import { ProximitySensor } from './ProximitySensor'
import { B2Vec2 } from 'that-box2d-library'

export function SensorFactory(config: SensorConfig): Sensor {
	switch (config.type) {
		case SensorType.LIGHT_SENSOR:
			return new LightSensor(config)
		case SensorType.PROXIMITY_SENSOR:
			return new ProximitySensor(config)
	}
}
