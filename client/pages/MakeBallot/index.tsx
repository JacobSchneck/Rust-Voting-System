import { ChangeEvent, MouseEvent, useState } from "react";
import Footer from "../../src/components/Footer/Footer";
import MakeBallot from "../../src/components/MakeBallot/MakeBallot";
import NavBar from "../../src/components/NavBar/NavBar";

interface Ballot {
	user_id: number,
	title: string,
	description: string,
}

interface Item {
	ballot_id: number,
	item: string,
}

const MakeBallotHome = () => {
	return (
		<div>
			<NavBar />
			<MakeBallot />
			<Footer />
		</div>
	)
}

export default MakeBallotHome;