export interface Transformer {
	fnc(input: number): number
	icon: string
}

export const PositiveTransformer: Transformer = {
	fnc(v: number): number {
		return Math.sin(v * (Math.PI / 2)) * 5 // Sinosoidal growth
	},
	icon: 'fa-plus-circle'
}

export const NegativeTransformer: Transformer = {
	fnc(v: number): number {
		return -(Math.sin(v * (Math.PI / 2)) * 5) // Sinosoidal growth
	},
	icon: 'fa-minus-circle'
}
