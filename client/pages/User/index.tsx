import Footer from "../../src/components/Footer/Footer";
import NavBar from "../../src/components/NavBar/NavBar";

import { useUser } from "@auth0/nextjs-auth0";

const UserHome = () => {
	const { user } = useUser();
	const { name, email } = user;
	return (
		<div>
			<NavBar />
			<div className="main-block">
				<p>{name}</p>
				<p>{email}</p>
			</div>
			<Footer />
		</div>
	)
	
}

export default UserHome;