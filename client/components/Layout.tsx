import React from 'react';
import { makeStyles, Typography, AppBar, Container, Toolbar } from "@material-ui/core";
import { List, ListItem } from '@mui/material';
import { useRouter } from 'next/dist/client/router';

interface MenuItem {
	title: string,
	path: string,
}

const menuItems: MenuItem[] = [
	{
		title: "Home",
		path: "/",
	},
	{
		title: "Post",
		path: "/post"
	},
	{
		title: "Profile",
		path: "/profile",
	},
	{
		title: "Login",
		path: "/login",
	},
];

const useStyles = makeStyles((theme) => {
	return {
		title: {
			flexGrow: 1,
		},
		toolbar: {
			display: "flex",
			flexDirection: "row",
		},
		listItem: {
			marginRight: theme.spacing(3),
			fontSize: "17px",
		}
	}
});

const Layout: React.FC<any> = ({ children }) => {
	const classes = useStyles();
	const router = useRouter();

	return (
		<Container>
			{/* App Bar */}
			<AppBar elevation={0}> 
				<Toolbar>
					<Typography className={classes.title} variant="h5">Voting App</Typography>
					<List className={classes.toolbar}>
						{menuItems.map(item => (
							<ListItem 
								onClick={() => router.push(item.path)}
								key={item.title}
								button
								className={classes.listItem}
							>
								{item.title}
							</ListItem>
						))}
					</List>

				</Toolbar>
			</AppBar>

			{/* Side Drawer */}

			{children}
		</Container>
	);
}

export default Layout;