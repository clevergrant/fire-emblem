import { Datum } from "models"

export class Slot {
	portrait: Datum = new Datum(16, `8`, 33733968)
	class: Datum = new Datum(16, `8`, 33733972)
	level: Datum = new Datum(8, `3`, 33733976)
	experience: Datum = new Datum(8, `3`, 33733977)
	hiddenStatus: Datum = new Datum(8, `3`, 33733981)

	hitPoints: { maximum: Datum, current: Datum } = {
		maximum: new Datum(8, `3`, 33733986),
		current: new Datum(8, `3`, 33733987)
	}

	attributes: { strength: Datum, skill: Datum, speed: Datum, defense: Datum, luck: Datum, constitution: Datum } = {
		strength: new Datum(8, `3`, 33733988),
		skill: new Datum(8, `3`, 33733989),
		speed:new Datum(8, `3`, 33733990),
		defense: new Datum(8, `3`, 33733991),
		luck: new Datum(8, `3`, 33733993),
		constitution: new Datum(8, `3`, 33733994)
	}

	rescue: Datum = new Datum(8, `3`, 33733995)
	move: Datum = new Datum(8, `3`, 33733997)

	items: { type: Datum, quantity: Datum, quantityType: Datum }[] = [
		{
			type: new Datum(8, `3`, 33733998),
			quantity: new Datum(8, `3`, 33733999),
			quantityType: new Datum(16, `8`, 33733998)
		},
		{
			type: new Datum(8, `3`, 33734000),
			quantity: new Datum(8, `3`, 33734001),
			quantityType: new Datum(16, `8`, 33734000)
		},
		{
			type: new Datum(8, `3`, 33734002),
			quantity: new Datum(8, `3`, 33734003),
			quantityType: new Datum(16, `8`, 33734002)
		},
		{
			type: new Datum(8, `3`, 33734004),
			quantity: new Datum(8, `3`, 33734005),
			quantityType: new Datum(16, `8`, 33734004)
		},
		{
			type: new Datum(8, `3`, 33734006),
			quantity: new Datum(8, `3`, 33734007),
			quantityType: new Datum(16, `8`, 33734006)
		}
	]

	skills: { sword: Datum, lance: Datum, axe: Datum, bow: Datum, staff: Datum, anima: Datum, light: Datum, dark: Datum} = {
		sword: new Datum(8, `3`, 33734008),
		lance: new Datum(8, `3`, 33734009),
		axe: new Datum(8, `3`, 33734010),
		bow: new Datum(8, `3`, 33734011),
		staff: new Datum(8, `3`, 33734012),
		anima: new Datum(8, `3`, 33734013),
		light: new Datum(8, `3`, 33734014),
		dark: new Datum(8, `3`, 33734015)
	}
}