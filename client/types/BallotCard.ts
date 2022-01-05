import ItemType from "./Item";

export default interface BallotCardType {
	title: string,
	details: string,
	username: string,
	items: ItemType[],
	id: number
}