import { useState, useEffect } from "react";
import BallotForm from "./BallotForm";
import ItemsForm from "./ItemsForm";
import ReviewForm from "./ReviewForm";

import { useUser } from "@auth0/nextjs-auth0";

const MakeBallot = () => {
	const { user } = useUser();
	if (!user) return;   

	const [title, setTitle] = useState<string>(""); // ballot title
	const [description, setDescription] = useState<string>(""); // ballot description

	const [addedItems, setAddedItems] = useState<boolean[]>([]);
	const [item, setItem] = useState<string>("");
	const [items, setItems] = useState<Array<string>>([]); // items on the ballot

	const [step, setStep] = useState<number>(0); // Describes the step the user is on in Make Ballot
	
	return (
		<div className="main-block">
			<BallotForm 
				step={step} 
				setStep={setStep}
				setTitle={setTitle}
				setDescription={setDescription}
			/>
			<ItemsForm 
				step={step} 
				setStep={setStep}
				addedItems={addedItems}
				setAddedItems={setAddedItems}
				item={item}
				setItem={setItem}
				items={items}
				setItems={setItems}
			/>
			<ReviewForm 
				step={step}
				setStep={setStep}
				title={title}
				description={description}
				items={items}
			/>
		</div>
	);
}

export default MakeBallot;