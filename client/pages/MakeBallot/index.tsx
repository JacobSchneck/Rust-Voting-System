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
	item: string,
}

const MakeBallotHome = () => {
	const [title, setTitle] = useState<string>(""); // ballot title
	const [description, setDescription] = useState<string>(""); // ballot description

	const [addedItems, setAddedItems] = useState<boolean[]>([]);
	const [item, setItem] = useState<string>("");
	const [items, setItems] = useState<Array<string>>([]); // items on the ballot

	const [step, setStep] = useState<number>(0); // Describes the step the user is on in Make Ballot

	const handleAddItems = (event: { preventDefault: () => void; }) => {
		event.preventDefault();
		setAddedItems([...addedItems, false]);
	}

	const handleDeleteItem = (event, index: number) => {
		event.preventDefault();

		const newAddedItems = addedItems.slice();
		newAddedItems.splice(index, 1);
		setAddedItems(newAddedItems);

		const newItems = items.slice();
		newItems.splice(index, 1);
		setItems(newItems);
	}
	
	const handleAddItem = (event, index) => {
		event.preventDefault();

		const newAddedItems = addedItems.slice();
		newAddedItems[index] = true;

		setAddedItems(newAddedItems);
		setItems([...items, item]);
	}

	const addOrDeleteItem = (index) => {
		if (addedItems[index] === false) {
			return (
				<>
					<input type="text" placeholder="text" onChange={(event) => setItem(event.target.value)} />
					<input type="submit" value="Add" onClick={ event => handleAddItem(event, index)} style={{width: "100px"}}/>
				</>
			);
		} else {
			return (
				<>
					<p>{items[index]}</p>
					<button onClick={ event => handleDeleteItem(event, index)} style={{width: "100px"}}>Delete</button> 
				</>
			)
		}
	}

	const renderItems = () => {
		return addedItems.map( (item, index) => {
			return (
				<form>
					{addOrDeleteItem(index)}
				</form>
			);
		})	;
	}

	// TODO: Consider making its own component
	const renderBallotForm = () => {
		if (step !== 0) return null;
		return (
				<div style={{textAlign: "center"}}>
					<h2>Create a Ballot</h2>
					<form className="basic-form">
						<input 
							type="text" 
							placeholder="Ballot Title"  
							maxLength={256} 
							onChange={(event) => setTitle(event.target.value)}
						/>
						<input 
							type="text" 
							placeholder="Description" 
							maxLength={256} 
							style={{marginBottom: "5px"}} 
							onChange={(event) => setDescription(event.target.value)}
						/>
						<input type="submit" value="Next" onClick={() => setStep( s => s + 1)}/>	
					</form>
				</div>
		);
	}

	const renderAddItemButton = () => {
		if (addedItems.includes(false)) return null;
		else return <button onClick={(event) => handleAddItems(event)}> Add Item </button>
	}

	const renderItemsForm = () => {
		if (step != 1) return null;
		return (
			<div style={{textAlign: "center"}}>
				<h2>Add Items</h2>
				<form className="basic-form">
					{renderItems()}
				</form>
				{renderAddItemButton()}

				<div style={{ display: "flex", flexDirection: "row" }}>
					<button onClick={() => setStep(s => s - 1)} style={{width: "50%"}}> Back </button>
					<input type="submit" value="Next" onClick={() => setStep(s => s + 1)} style={{width: "50%"}}/>
				</div>
			</div>
		);
	}

	const renderReviewForm = () => {
		if (step != 2) return null;
		return (
			<div>
				<div>
					<div style={{border: "1px solid black", margin: "5px", padding: "5px"}}>Ballot Title: {title} </div>
					<div style={{border: "1px solid black", margin: "5px", padding: "5px"}}>Ballot Description: {description} </div>
					<div style={{border: "1px solid black", margin: "5px", padding: "5px"}}>
						<ol>
							{items.map(item => {
								return (
									<li>{item}</li>
								)
							})}
						</ol>
					</div>
				</div>

				<div style={{display: "flex", flexDirection: "column"}}>
					<button onClick={() => setStep(s => s - 1)}> Back </button>
					<button>Submit Ballot</button>
				</div>
			</div>
		);
	}


	return (
		<div>
			<NavBar />
			<div className="main-block">
				{renderBallotForm()}
				{renderItemsForm()}
				{renderReviewForm()}
			</div>

			<Footer />
		</div>
	)
}

export default MakeBallotHome;