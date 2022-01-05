import React, { useEffect, useState } from 'react';
import { 
	Container, 
	Typography, 
	Avatar, 
	Card, 
	CardContent, 
	CardHeader,
	List,
	ListItem,
	Button
} from '@material-ui/core'
import { KeyboardArrowRight } from '@mui/icons-material';
import User from '../../types/User';
import { makeStyles } from '@material-ui/core';

const fakePostData = [
	"Example Post One",
	"Example Post Two",
	"Example Post Three",
];

const useStyles = makeStyles((theme) => {
	return {
		toolbar: theme.mixins.toolbar,
		container: {
			display: "grid",
			justifyContent: "center",
		},
		card: {
			display: "flex",
			flexDirection: "column",
			alignItems: "Center",
			minWidth: "500px",
			maxWidth: "500px",
			minHeight: "500px",
			marginTop: theme.spacing(3),
		},
		cardContent: {
			alignItems: "center",
			width: "100%",
		},
		cardHeader: {
			backgroundColor: "#f3f3f3",
			borderBottom: "1px solid grey",
			width: "100%"
		},
		posts: {
			borderBottom: "1px solid grey",
			textAlign: "center",
			width: "100%"
		},
		item: {
			width: "100%",
			backgroundColor: "#f3f3f3",
			marginBottom: theme.spacing(1),
		},
		postTitle: {
			flexGrow: 1,
		},
		button: {
			// width: "25%",
			// padding: 0,
			flexGrow: 1,
			float: "right",
			maxWidth: "20%",
		}
	}
});

// TODO: Refactor code such that profile retrieved is dependent on who is logged in (So auth Context probably)
const ProfileHome = () => {
	const classes = useStyles();

	const [user, setUser] = useState<User>({username: "loading...", email: "loading...", id: -1});

	useEffect(() => {
			fetch('http://localhost:8000/users') // should probably pass in user id to retrive a single user
				.then(res => res.json())
				.then(data => setUser(data[0])) // would just be data in refactored code
				.catch(err => console.error(err))
	}, []);

	return (
		<Container className={classes.container}>
			<div className={classes.toolbar}></div>

			{/* <Container> */}
				<Card elevation={5} className={classes.card}>
					<CardHeader
						avatar={
							<Avatar>
								{user.username[0]}
							</Avatar>
						}
						title={
							<Typography variant="h6">
								{user.username}
							</Typography>
						}
						subheader={
							<Typography variant="body2">
								{user.email}
							</Typography>
						}
						className={classes.cardHeader}
					/>
					<CardContent className={classes.cardContent}> 
						<Typography variant="h4" className={classes.posts}>
							Posts
						</Typography>
						<List style={{width: "100%", margin: 0}}> 
							{fakePostData.map(post => (
								<ListItem key={post} className={classes.item}> 
									<Typography variant="h6" className={classes.postTitle}>{post}</Typography>
										<Button
											type="submit"
											color="secondary"
											variant="contained"
											endIcon={<KeyboardArrowRight />}
											style={{width: "100%"}}
											className={classes.button}
										>
											View
										</Button>
								</ListItem>
							))}
						</List>

					</CardContent>
				</Card>
			{/* </Container> */}

		</Container>
	)
}

export default ProfileHome;