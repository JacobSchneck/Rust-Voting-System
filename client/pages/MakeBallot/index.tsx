import { useState } from "react";
import Footer from "../../src/components/Footer/Footer";
import NavBar from "../../src/components/NavBar/NavBar";

const MakeBallotHome = () => {
	const [items, setItems] = useState<Array<string>>([]);
	console.log(items)

	const handleAddItems = (event: { preventDefault: () => void; }) => {
		event.preventDefault();
		if (items[0] === "ho") {
			setItems(["Hi"]) // check for empty strings on submit
		} else {
			setItems(prevItems => [...prevItems, "Ho"]);
		}
	}

	// const handleDeleteItem = (event, index: number) => {
	// 	event.preventDefault();
	// 	const newItems = items.slice();
	// 	newItems.splice(index, 1);
	// 	setItems(newItems);
	// }

	const renderItems = () => {
		return items.map( (item, index) => {
			return (
				<div key={`${item}-${index}`}>
					{`${index}-${item}`}
					{/* <input type="text" placeholder={`Items #${index}`} onChange={(event) => handleChangeItems(event, index)}/> */}
					{/* <input type="text" placeholder={`Items #${index}`} /> */}
					{/* <button onClick={(event) => handleDeleteItem(event, index)}> Delete </button> */}
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
				<button onClick={(event) => handleAddItems(event)}> Add More Items </button>
			</div>

			<Footer />
		</div>
	)
}

export default MakeBallotHome;