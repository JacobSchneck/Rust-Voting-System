import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";

// TODO: Refactor with Auth
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


// const LoginLink = () => {
// 	return (
// 		<div 
// 			<Link href="/api/auth/login">
// 				<a>Login</a>
// 			</Link>
// 		</div>
// 	)
// }

// const Login = () => {
// 	return (

// 		<div className={styles["link-element"]}>
// 			<Link href="/api/auth/login">
// 				<a>Login</a>
// 			</Link>
// 		</div>
// 	)
// }

export default Login;