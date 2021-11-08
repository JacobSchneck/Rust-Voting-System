import Link from "next/link";

import styles from "../../../styles/NavBar.module.css";

import { useUser } from '@auth0/nextjs-auth0'

const NavBar = () => {
	const { user } = useUser();
	const url = user ? "/api/auth/logout" : "/api/auth/login";
	const loginLabel = user ? "logout" : "login";

	const renderUser = () => {
		if (loginLabel === "login") return null;
		else {
			return (
				<div className={styles["link-element"]}>
					<Link href="/User">
						<a>User</a>
					</Link>
				</div>
			)
		}
	}

	return (
		<div className={styles["outer-container"]}>
			<div className={styles["inner-container"]}>
				<div className={styles["link-element"]}>
					<Link href="/">
						<a>Home</a>
					</Link>
				</div>

				<div className={styles["link-element"]}>
					<Link href="/MakeBallot">
						<a>Make Ballot</a>
					</Link>
				</div>

				{renderUser()}

				<div className={styles["link-element"]}>
					<Link href={url}>
						<a>{loginLabel}</a>
					</Link>
				</div>
				
			</div>
		</div>
	)
}

export default NavBar;