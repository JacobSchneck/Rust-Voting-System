import { ChangeEvent, MouseEvent, useState } from "react";
import Footer from "../../src/components/Footer/Footer";
import NavBar from "../../src/components/NavBar/NavBar";

interface Ballot {
	user_id: number,
	title: string,
	description: string,
}

interface Item {
	ballot_id: number,
	title: string,
	description: string,
}

const MakeBallotHome = () => {
	const [items, setItems] = useState<Array<string>>([]);
	console.log(items)

	const handleAddItems = (event: { preventDefault: () => void; }) => {
		event.preventDefault();
		setItems(prevItems => [...prevItems, ""]);
	}

	const handleDeleteItem = (event, index: number) => {
		event.preventDefault();
		const newItems = items.slice();
		newItems.splice(index, 1);
		setItems(newItems);
	}

	const handleChangeItems = (event, index: number) => {
		const newItems = items.slice();
		newItems[index] = event.target.value;
		setItems(newItems);
	}

	const renderItems = () => {
		return items.map( (item, index) => {
			return (
				<div key={`${item}-${index}`}>
					<input type="text" placeholder={`Items #${index + 1}`} onChange={(event) => handleChangeItems(event, index)}/>
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
					<input type="text" placeholder="Ballot Title"  maxLength={256} />
					<input type="text" placeholder="Description" maxLength={256} style={{marginBottom: "5px"}} />

					<form style={{
						display: "flex",
						flexDirection: "row",
						marginBottom: "5px",
					}}>
							<input type="text" placeholder="Item" />
							<input type="submit" value="Add Item" />
							<button> Delete </button>
					</form>

					{renderItems()}
					<button onClick={(event) => handleAddItems(event)}> New Item </button>

					<input type="submit" value="Make Ballot" style={{marginTop: "10px"}}/>
				</form>
			</div>

			<Footer />
		</div>
	)
}

export default MakeBallotHome;