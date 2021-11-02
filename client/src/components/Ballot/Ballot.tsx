import axios from 'axios';
import { useState, useEffect } from 'react';

const Ballot = () => {
	const [item, setItems] = useState<Array<string>>([]);
	const [description, setDescription] = useState<string>("");

	useEffect( () => {
		axios.get("localhost:8000/")
	}, [])
}