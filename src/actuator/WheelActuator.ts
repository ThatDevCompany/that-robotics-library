import {
	B2Body,
	B2Vec2,
	B2AppliedForce,
	B2FixtureDef,
	B2Fixture,
	B2PolygonShape
} from 'that-box2d-library'
import { Actuator, ActuatorConfig, ActuatorType } from './Actuator'
import * as _ from 'lodash'

export class WheelActuator implements Actuator {
	id: string
	type: ActuatorType
	name: string
	body: B2Body
	size: B2Vec2
	position: B2Vec2

	private _baseForce: B2Vec2 = new B2Vec2(0, -2500)
	private _input: number
	private _fixtures: Array<B2Fixture>

	constructor(config: ActuatorConfig) {
		_.assign(this, config)
	}

	set input(v: number) {
		this._input = v
	}

	set speed(v: number) {
		this._baseForce = new B2Vec2(0, -500 * v)
	}

	get appliedForces(): Array<B2AppliedForce> {
		return [
			{
				force: this._baseForce
					.Clone()
					.SelfAdd(this._baseForce.Clone().SelfMul(this._input)),
				point: this.position
			}
		]
	}

	get vertices(): Array<B2Vec2> {
		const x = this.position.x,
			y = this.position.y,
			sX = this.size.x / 2,
			sY = this.size.y / 2
		return [
			new B2Vec2(x - sX, y - sY),
			new B2Vec2(x + sX, y - sY),
			new B2Vec2(x + sX, y + sY),
			new B2Vec2(x - sX, y + sY),
			new B2Vec2(x - sX, y - sY)
		]
	}

	CreateShapes() {
		;(<B2PolygonShape>this._fixtures[0].m_shape).Set(this.vertices)
	}

	CreateFixtures(body: B2Body) {
		this._fixtures = this._fixtureDefs.map(fd => {
			return body.CreateFixture(fd)
		})
		this.CreateShapes()
	}

	private get _fixtureDefs(): Array<B2FixtureDef> {
		// Create Shape
		const b2Shape: B2PolygonShape = new B2PolygonShape()
		b2Shape.Set(this.vertices)

		// Create Fixture Definition
		const b2FixtureDef = new B2FixtureDef()
		b2FixtureDef.shape = b2Shape
		b2FixtureDef.density = 0.5
		b2FixtureDef.friction = 0.3
		b2FixtureDef.restitution = 0.25
		b2FixtureDef.userData = {
			name: this.name,
			class: 'actuator'
		}
		return [b2FixtureDef]
	}
}
