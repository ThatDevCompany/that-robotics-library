"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NegativeTransformer = exports.PositiveTransformer = void 0;
exports.PositiveTransformer = {
    fnc(v) {
        return Math.sin(v * (Math.PI / 2)) * 5; // Sinosoidal growth
    },
    icon: 'fa-plus-circle'
};
exports.NegativeTransformer = {
    fnc(v) {
        return -(Math.sin(v * (Math.PI / 2)) * 5); // Sinosoidal growth
    },
    icon: 'fa-minus-circle'
};
