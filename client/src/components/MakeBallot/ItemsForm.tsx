interface ItemsFormProp {
	step: number,
	setStep: (step: number) => void,
	addedItems: boolean[],
	setAddedItems: (addedItems: boolean[]) => void,
	item: string,
	setItem: (item: string) => void,
	items: string[],
	setItems: (items: string[]) => void,
}

const ItemsForm: React.FC<ItemsFormProp> = ({
	step,
	setStep,
	addedItems,
	setAddedItems,
	item,
	setItem,
	items,
	setItems
}) => {
	if (step !== 1) return null;

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
	
	const handleAddItem = (event, index: number) => {
		event.preventDefault();

		const newAddedItems = addedItems.slice();
		newAddedItems[index] = true;

		setAddedItems(newAddedItems);
		setItems([...items, item]);
	}

	const addOrDeleteItem = (index: number) => {
		if (addedItems[index] === false) {
			return (
				<div style={{display: "flex", flexDirection: "row"}}>
					<input 
						type="text" 
						placeholder="text" 
						onChange={(event) => setItem(event.target.value)}
						style={{
							width:"75%"
						}}
				 	/>
					<input type="submit" value="Add" onClick={ event => handleAddItem(event, index)} style={{width: "100px"}}/>
				</div>
			);
		} else {
			return (
				<div style={{display: "flex", flexDirection: "row"}}>
					<div style={{border: "1px solid black", width: "75%"}}>{items[index]}</div>
					<button onClick={ event => handleDeleteItem(event, index)} style={{width: "100px"}}>Delete</button> 
				</div>
			)
		}
	}

	const renderAddItemButton = () => {
		if (addedItems.includes(false)) return null;
		else return (
			<button 
				onClick={(event) => handleAddItems(event)}
				style={{width: "100%"}}
			> 
				Add Item 
			</button>
		);
	}

	const renderItems = () => {
		return addedItems.map( (item, index) => {
			return (
				<form key={`${item}-${index}`}>
					{addOrDeleteItem(index)}
				</form>
			);
		})	;
	}

	return (
		<div style={{textAlign: "center"}}>
			<h2>Add Items</h2>
			<div className="basic-form">
				{renderItems()}
			</div>
			{renderAddItemButton()}

			<div style={{ display: "flex", flexDirection: "row" }}>
				<button onClick={() => setStep(step - 1)} style={{width: "50%"}}> Back </button>
				<input type="submit" value="Next" onClick={() => setStep(step + 1)} style={{width: "50%"}}/>
			</div>
		</div>
	);
}

export default ItemsForm;