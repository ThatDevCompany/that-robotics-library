"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connector = void 0;
class Connector {
    constructor(inputDevice, outputDevice, transformer) {
        this.inputDevice = inputDevice;
        this.outputDevice = outputDevice;
        this.transformer = transformer;
    }
    tick() {
        this.input = this.inputDevice.output;
        this.output = this.transformer
            ? this.transformer.fnc(this.input)
            : this.input;
        this.outputDevice.input = this.output;
        this.input = Math.round(this.input * 100) / 100;
        this.output = Math.round(this.output * 100) / 100;
    }
}
exports.Connector = Connector;
