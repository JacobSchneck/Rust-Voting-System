import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";

const Login = () => {
	return (
		<div>
			<NavBar/>

			<div className="main-block">
				<h1> Login Page </h1>
				<form className="basic-form">
					<input type="text" placeholder="Username"/>
					<input type="text" placeholder="Password"/>
					<input type="submit" value="Login"/>
				</form>
			</div>

			<Footer /> 
		</div>
	)
}

export default Login;