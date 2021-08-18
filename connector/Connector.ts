import { Transformer } from './Transformer'
import { B2Vec2 } from 'that-box2d-library'

export interface ConnectorInputDevice {
	position: B2Vec2
	output: number
}

export interface ConnectorOutputDevice {
	position: B2Vec2
	input: number
}

export class Connector {
	input: number
	output: number

	constructor(
		public inputDevice: ConnectorInputDevice,
		public outputDevice: ConnectorOutputDevice,
		public transformer?: Transformer
	) {}

	tick() {
		this.input = this.inputDevice.output

		this.output = this.transformer
			? this.transformer.fnc(this.input)
			: this.input

		this.outputDevice.input = this.output
		this.input = Math.round(this.input * 100) / 100
		this.output = Math.round(this.output * 100) / 100
	}
}
