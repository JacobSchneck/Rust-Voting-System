import { useState } from "react";
import { __RouterContext } from "react-router";

import "./User.css";

const User = ({ username }) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	const [ballot, setBallot] = useState([]);
	const [ballots, setBallots] = useState([]); // stores all ballots used by person guy thing 

	const addItemToBallot = (event) => {

		// Handles Empty Field
		if (title === "") {
			alert("Empty field");
			return;
		}

		const item = {
			title: title,
			description: description,
		}

		setBallot([...ballot, item]);

		event.preventDefault();
	}

	const removeItemFromBallot = (index) => {
		ballot.splice(index, 1);
		setBallot([...ballot]);
	}

	const makeBallot = () => {
		setBallots([...ballots, ballot.slice()]);
		setBallot([]);
		console.log(ballots);
	}

	const displayBallot = (index) => {
		ballots[index].map( (ballotItem, i) => {
			console.log(`${i} -> ${ballotItem.title}: ${ballotItem.description}`);
		});
	}

	return (
		<div>
			<div className="form-container">
				{username} Make a Ballot

				<form className="item-form">
					<input type="text" placeholder="title" onChange={ event => setTitle(event.target.value.trim()) } />
					<input type="text" placeholder="Desription" onChange={ event => setDescription(event.target.value.trim()) } />
					<input type="submit" value="Make Item" onClick={ event => addItemToBallot(event) }/>
				</form>

				<ul className="list">
					{
						ballot.map( (ballotItem, i) => {
							return (
								<li key={`${i} - ${ballot}`}>
									{`${i} -> ${ballotItem.title}: ${ballotItem.description}`}
									<button className="remove-button" onClick={() => removeItemFromBallot(i)}> 
										Remove 
									</button>
								</li>
							);
						})
					}
				</ul>

				<button className="make-ballot-button" onClick={() => makeBallot()}> Make Ballot </button>

				<ul className="list">
					{
						ballots.map( (ballotTicket, i) => {
							return (
								<li key={`${i} - ${ballotTicket}`}>
									{`${i} -> ${ballotTicket.length}`}
									<button className="display-ballot" onClick={() => displayBallot(i)}>
										Display Contents
									</button>
								</li>
							);
						})
					}
				</ul>


			</div>
		</div>
	);
}

export default User;