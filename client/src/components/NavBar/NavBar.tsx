import Link from "next/link";

import styles from "../../../styles/NavBar.module.css";

const NavBar = () => {
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

				<div className={styles["link-element"]}>
					<Link href="/Login">
						<a>Login</a>
					</Link>
				</div>

				{/*TODO: Route to specific userpage */}
				<div className={styles["link-element"]}>
					<Link href="/User">
						<a>User</a>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default NavBar;