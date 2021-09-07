import { useState, useEffect } from 'react';
import './App.css';

const App = () => { 
	const [items, setItems] = useState(["Kittens", "Avocado Toast", "Root Bear", "Jean Luc Picard"]);

	return (
		<div> 
			<h1> Vote for Things or Die </h1> 
			Ballot Length = {items.length}
			<ol>
				{ items.map( (item, index) => {
					return (
						<li> 
							{item}
							<button> Vote </button>
						</li>
					);
				})
				}
			</ol>
		</div>
	);
}

export default App;
