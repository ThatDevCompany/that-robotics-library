import { Sensor, SensorType, SensorConfig } from './Sensor'
import {
	B2Body,
	B2WorldManifold,
	B2Vec2,
	B2DegToRad,
	B2Fixture,
	B2Contact,
	B2FixtureDef,
	B2PolygonShape,
	B2AppliedForce
} from 'that-box2d-library'
import * as _ from 'lodash'

export class ProximitySensor implements Sensor {
	id: string
	name: string
	type: SensorType
	body: B2Body
	size: B2Vec2
	position: B2Vec2
	angle: number
	angleAnti: number
	distance: number

	icon: string = 'fa-arrows-alt-v'
	private _fixtures: Array<B2Fixture>
	private _sensed: any = {}

	constructor(config: SensorConfig) {
		_.assign(this, config)
	}

	get appliedForces(): Array<B2AppliedForce> {
		return []
	}

	get output(): number {
		let pos = this.body.GetWorldPoint(this.position, new B2Vec2(0, 0)),
			dist = this.distance
		for (let s in this._sensed) {
			dist = Math.min(B2Vec2.DistanceVV(pos, this._sensed[s]), dist)
		}
		return 1 - dist / this.distance
	}

	CreateShapes() {
		;(<B2PolygonShape>this._fixtures[0].m_shape).Set(this.beamVertices)
		;(<B2PolygonShape>this._fixtures[1].m_shape).Set(this.deviceVertices)
	}

	CreateFixtures(body: B2Body) {
		this._fixtures = this._fixtureDefs.map(fd => {
			return body.CreateFixture(fd)
		})
	}

	private get _fixtureDefs(): Array<B2FixtureDef> {
		// Create Beam FixtureDef
		const beamShape = new B2PolygonShape()
		beamShape.Set(this.beamVertices)
		const beamFixtureDef = new B2FixtureDef()
		beamFixtureDef.shape = beamShape
		beamFixtureDef.density = 0.01
		beamFixtureDef.friction = 0
		beamFixtureDef.restitution = 0
		beamFixtureDef.isSensor = true
		beamFixtureDef.userData = {
			name: this.name + ' Beam',
			class: 'beam',
			BeginContact: this.onContact.bind(this),
			ContinueContact: this.onContact.bind(this),
			EndContact: this.onEndContact.bind(this)
		}

		// Create Device FixtureDef
		const deviceShape = new B2PolygonShape()
		deviceShape.Set(this.deviceVertices)
		const deviceFixtureDef = new B2FixtureDef()
		deviceFixtureDef.shape = deviceShape
		deviceFixtureDef.density = 0.5
		deviceFixtureDef.friction = 0.3
		deviceFixtureDef.restitution = 0.25
		deviceFixtureDef.userData = {
			name: this.name + ' Device',
			class: 'sensor'
		}

		return [beamFixtureDef, deviceFixtureDef]
	}

	private get beamVertices(): Array<B2Vec2> {
		const x = this.position.x,
			y = this.position.y - 2,
			dx1 = Math.sin(B2DegToRad(this.angleAnti)) * this.distance,
			dy1 = Math.cos(B2DegToRad(this.angleAnti)) * this.distance,
			dx2 = Math.sin(B2DegToRad(this.angleAnti / 2)) * this.distance,
			dy2 = Math.cos(B2DegToRad(this.angleAnti / 2)) * this.distance,
			dx3 = 0,
			dy3 = this.distance,
			dx4 = Math.sin(B2DegToRad(-this.angle / 2)) * this.distance,
			dy4 = Math.cos(B2DegToRad(-this.angle / 2)) * this.distance,
			dx5 = Math.sin(B2DegToRad(-this.angle)) * this.distance,
			dy5 = Math.cos(B2DegToRad(-this.angle)) * this.distance

		return [
			new B2Vec2(x, y),
			new B2Vec2(x - dx1, y - dy1),
			new B2Vec2(x - dx2, y - dy2),
			new B2Vec2(x - dx3, y - dy3),
			new B2Vec2(x - dx4, y - dy4),
			new B2Vec2(x - dx5, y - dy5)
		]
	}

	private get deviceVertices(): Array<B2Vec2> {
		const x = this.position.x,
			y = this.position.y,
			sX = this.size.x,
			sY = this.size.y

		return [
			new B2Vec2(x - sX / 2, y - sY / 2),
			new B2Vec2(x + 0, y + sY / 2),
			new B2Vec2(x + sX / 2, y - sY / 2)
		]
	}

	private onContact(contact: B2Contact, otherFixture: B2Fixture) {
		let wm = new B2WorldManifold()
		contact.GetWorldManifold(wm)
		let p = wm.points[0]
		this._sensed[otherFixture.m_userData.name] = p
	}

	private onEndContact(contact: B2Contact, otherFixture: B2Fixture) {
		let wm = new B2WorldManifold()
		contact.GetWorldManifold(wm)
		let p = wm.points[0]
		delete this._sensed[otherFixture.m_userData.name]
	}
}
