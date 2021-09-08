import { useState } from "react";
import { useHistory } from "react-router";

import "./Login.css";

const Login = ({username, setUsername} ) => {
	// const [username, setUsername] = useState("");
	const history = useHistory();


	const handleLogin = () => {
		history.push(`/user/${username}`);
	}

	return (
		<div className="login-outer-container">
			<div className="login-inner-container">
				<h1> Login </h1>
				<form className="login-form">
					<input type="text" placeholder="username" onChange={(event) => setUsername(event.target.value)} />
					<input type="submit" value="login" onClick={() => handleLogin()}/>
				</form>
			</div>
		</div>
	)
}

export default Login;