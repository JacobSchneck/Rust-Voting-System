import { useState, useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import Login from './Components/Login/Login';
import User from "./Components/User/User";

import "./App.css";

const App = () => { 
	const [username, setUsername] = useState("");

	console.log(username);

	return (
		<div>
			<Router>
				<Switch>

						{/* TODO: Make home page and reroute login in to url: /login */}

						<Route path="/" exact >  
							<Login username={username} setUsername={setUsername} />
						</Route>

						<Route path={`/user/${username}`} exact >
							<User username={username} />	
						</Route>

						{/* TODO: Add a default route or page not found route */}
						<Redirect to="/" />

				</Switch>
			</Router>
		</div>
	);
}

export default App;
