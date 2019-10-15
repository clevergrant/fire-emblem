export class Datum {
	public bits: number
	public bitCode: string
	public address: number

	constructor(bits: number, bitCode: string, address: number) {
		this.bits = bits
		this.bitCode = bitCode
		this.address = address
	}

	public get hexString(): string {
		return this.address.toString(16)
	}
}
