"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WheelActuator = void 0;
const that_box2d_library_1 = require("that-box2d-library");
const _ = require("lodash");
class WheelActuator {
    constructor(config) {
        this._baseForce = new that_box2d_library_1.B2Vec2(0, -2500);
        _.assign(this, config);
    }
    set input(v) {
        this._input = v;
    }
    set speed(v) {
        this._baseForce = new that_box2d_library_1.B2Vec2(0, -500 * v);
    }
    get appliedForces() {
        return [
            {
                force: this._baseForce
                    .Clone()
                    .SelfAdd(this._baseForce.Clone().SelfMul(this._input)),
                point: this.position
            }
        ];
    }
    get vertices() {
        const x = this.position.x, y = this.position.y, sX = this.size.x / 2, sY = this.size.y / 2;
        return [
            new that_box2d_library_1.B2Vec2(x - sX, y - sY),
            new that_box2d_library_1.B2Vec2(x + sX, y - sY),
            new that_box2d_library_1.B2Vec2(x + sX, y + sY),
            new that_box2d_library_1.B2Vec2(x - sX, y + sY),
            new that_box2d_library_1.B2Vec2(x - sX, y - sY)
        ];
    }
    CreateShapes() {
        ;
        this._fixtures[0].m_shape.Set(this.vertices);
    }
    CreateFixtures(body) {
        this._fixtures = this._fixtureDefs.map(fd => {
            return body.CreateFixture(fd);
        });
        this.CreateShapes();
    }
    get _fixtureDefs() {
        // Create Shape
        const b2Shape = new that_box2d_library_1.B2PolygonShape();
        b2Shape.Set(this.vertices);
        // Create Fixture Definition
        const b2FixtureDef = new that_box2d_library_1.B2FixtureDef();
        b2FixtureDef.shape = b2Shape;
        b2FixtureDef.density = 0.5;
        b2FixtureDef.friction = 0.3;
        b2FixtureDef.restitution = 0.25;
        b2FixtureDef.userData = {
            name: this.name,
            class: 'actuator'
        };
        return [b2FixtureDef];
    }
}
exports.WheelActuator = WheelActuator;
