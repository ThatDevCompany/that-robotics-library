import {
	B2Body,
	B2Vec2,
	B2FixtureDef,
	B2Fixture,
	B2AppliedForce
} from 'that-box2d-library'
import { ConnectorInputDevice } from '../connector'

export enum SensorType {
	LIGHT_SENSOR,
	PROXIMITY_SENSOR
}

export interface SensorConfig {
	id: string
	name: string
	type: SensorType
	size: B2Vec2
	position: B2Vec2
	angle: number
	angleAnti: number
	distance: number
}

export interface Sensor extends ConnectorInputDevice, SensorConfig {
	body: B2Body
	output: number
	appliedForces: Array<B2AppliedForce>
	CreateShapes()
	CreateFixtures(body: B2Body)
}
