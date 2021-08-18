import { B2AppliedForce, B2Body, B2Vec2 } from "that-box2d-library";
import { ConnectorOutputDevice } from "../connector";

export enum ActuatorType {
  WHEEL,
}

export interface ActuatorConfig {
  id: string;
  type: ActuatorType;
  name: string;
  size: B2Vec2;
  position: B2Vec2;
}

export interface Actuator extends ConnectorOutputDevice, ActuatorConfig {
  body: B2Body;
  input: number;
  appliedForces: Array<B2AppliedForce>;
  CreateShapes();
  CreateFixtures(body: B2Body);
}
