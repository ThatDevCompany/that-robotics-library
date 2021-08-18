"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProximitySensor = void 0;
const that_box2d_library_1 = require("that-box2d-library");
const _ = require("lodash");
class ProximitySensor {
    constructor(config) {
        this.icon = 'fa-arrows-alt-v';
        this._sensed = {};
        _.assign(this, config);
    }
    get appliedForces() {
        return [];
    }
    get output() {
        let pos = this.body.GetWorldPoint(this.position, new that_box2d_library_1.B2Vec2(0, 0)), dist = this.distance;
        for (let s in this._sensed) {
            dist = Math.min(that_box2d_library_1.B2Vec2.DistanceVV(pos, this._sensed[s]), dist);
        }
        return 1 - dist / this.distance;
    }
    CreateShapes() {
        ;
        this._fixtures[0].m_shape.Set(this.beamVertices);
        this._fixtures[1].m_shape.Set(this.deviceVertices);
    }
    CreateFixtures(body) {
        this._fixtures = this._fixtureDefs.map(fd => {
            return body.CreateFixture(fd);
        });
    }
    get _fixtureDefs() {
        // Create Beam FixtureDef
        const beamShape = new that_box2d_library_1.B2PolygonShape();
        beamShape.Set(this.beamVertices);
        const beamFixtureDef = new that_box2d_library_1.B2FixtureDef();
        beamFixtureDef.shape = beamShape;
        beamFixtureDef.density = 0.01;
        beamFixtureDef.friction = 0;
        beamFixtureDef.restitution = 0;
        beamFixtureDef.isSensor = true;
        beamFixtureDef.userData = {
            name: this.name + ' Beam',
            class: 'beam',
            BeginContact: this.onContact.bind(this),
            ContinueContact: this.onContact.bind(this),
            EndContact: this.onEndContact.bind(this)
        };
        // Create Device FixtureDef
        const deviceShape = new that_box2d_library_1.B2PolygonShape();
        deviceShape.Set(this.deviceVertices);
        const deviceFixtureDef = new that_box2d_library_1.B2FixtureDef();
        deviceFixtureDef.shape = deviceShape;
        deviceFixtureDef.density = 0.5;
        deviceFixtureDef.friction = 0.3;
        deviceFixtureDef.restitution = 0.25;
        deviceFixtureDef.userData = {
            name: this.name + ' Device',
            class: 'sensor'
        };
        return [beamFixtureDef, deviceFixtureDef];
    }
    get beamVertices() {
        const x = this.position.x, y = this.position.y - 2, dx1 = Math.sin(that_box2d_library_1.B2DegToRad(this.angleAnti)) * this.distance, dy1 = Math.cos(that_box2d_library_1.B2DegToRad(this.angleAnti)) * this.distance, dx2 = Math.sin(that_box2d_library_1.B2DegToRad(this.angleAnti / 2)) * this.distance, dy2 = Math.cos(that_box2d_library_1.B2DegToRad(this.angleAnti / 2)) * this.distance, dx3 = 0, dy3 = this.distance, dx4 = Math.sin(that_box2d_library_1.B2DegToRad(-this.angle / 2)) * this.distance, dy4 = Math.cos(that_box2d_library_1.B2DegToRad(-this.angle / 2)) * this.distance, dx5 = Math.sin(that_box2d_library_1.B2DegToRad(-this.angle)) * this.distance, dy5 = Math.cos(that_box2d_library_1.B2DegToRad(-this.angle)) * this.distance;
        return [
            new that_box2d_library_1.B2Vec2(x, y),
            new that_box2d_library_1.B2Vec2(x - dx1, y - dy1),
            new that_box2d_library_1.B2Vec2(x - dx2, y - dy2),
            new that_box2d_library_1.B2Vec2(x - dx3, y - dy3),
            new that_box2d_library_1.B2Vec2(x - dx4, y - dy4),
            new that_box2d_library_1.B2Vec2(x - dx5, y - dy5)
        ];
    }
    get deviceVertices() {
        const x = this.position.x, y = this.position.y, sX = this.size.x, sY = this.size.y;
        return [
            new that_box2d_library_1.B2Vec2(x - sX / 2, y - sY / 2),
            new that_box2d_library_1.B2Vec2(x + 0, y + sY / 2),
            new that_box2d_library_1.B2Vec2(x + sX / 2, y - sY / 2)
        ];
    }
    onContact(contact, otherFixture) {
        let wm = new that_box2d_library_1.B2WorldManifold();
        contact.GetWorldManifold(wm);
        let p = wm.points[0];
        this._sensed[otherFixture.m_userData.name] = p;
    }
    onEndContact(contact, otherFixture) {
        let wm = new that_box2d_library_1.B2WorldManifold();
        contact.GetWorldManifold(wm);
        let p = wm.points[0];
        delete this._sensed[otherFixture.m_userData.name];
    }
}
exports.ProximitySensor = ProximitySensor;
