import { useState } from "react";
import Footer from "../../src/components/Footer/Footer";
import NavBar from "../../src/components/NavBar/NavBar";

const MakeBallotHome = () => {
	const [items, setItems] = useState<string[]>([]);

	const handleAddItems = (event: { preventDefault: () => void; }) => {
		event.preventDefault();
		if (items[0] === "ho") {
			setItems(["Hi"]) // check for empty strings on submit
		} else {
			setItems([...items, "Ho"]);
		}
		console.log(items)

	}

	const handleDeleteItem = (event, index: number) => {
		event.preventDefault();
		const newItems = items.slice();
		newItems.splice(index, 1);
		setItems(newItems);
	}

	const renderItems = () => {
		console.log(items);
		return items.fill(null).map( (item, index) => {
			// console.log(items[index]);
			return (
				<div key={`${item}-${index}`}>
					{/* <input type="text" placeholder={`Items #${index}`} onChange={(event) => handleChangeItems(event, index)}/> */}
					<input type="text" placeholder={`Items #${index}`} />
					<button onClick={(event) => handleDeleteItem(event, index)}> Delete </button>
				</div>
			);
		})	;
		
	}

	return (
		<div>
			<NavBar />
			<div className="main-block">
				<form className="basic-form">
					{/* <input type="text" placeholder="Ballot Title"  maxLength={256} />
					<input type="text" placeholder="Description" maxLength={256} /> */}
					{/* <input type="text" placeholder="Item #1" maxLength={100}/> */}
					{renderItems()}
					{/* <input type="submit" value="Make Ballot"/> */}
				</form>
			</div>
			<button onClick={(event) => handleAddItems(event)}> Add More Items </button>

			<Footer />
		</div>
	)
}

export default MakeBallotHome;