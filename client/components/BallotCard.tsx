import React, { useEffect, useState } from 'react';
import { 
	Container, 
	Card, 
	CardContent, 
	CardHeader, 
	makeStyles,
	RadioGroup,
	Radio,
	FormControl,
	FormControlLabel,
	FormLabel,
	Button,
	Typography,
} from '@material-ui/core';
import BallotCardType from '../types/BallotCard';

const useStyles = makeStyles((theme) => {
	return {
		container: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
		},
		card: {
			marginTop: theme.spacing(2),
			marginBottom: theme.spacing(2),
			backgroundColor: "#f6f6f6",
			minWidth: "50%",
			maxWidth: "50%"
		},
		submit: {
			marginTop: theme.spacing(2),
		},
		details: {
			marginBottom: theme.spacing(2), 
		}
	}
});

const BallotCard = () => {
	const [ballotCards, setBallotCards] = useState<BallotCardType[]>([]);
	const classes = useStyles();

	useEffect(() => {
		fetch("http://localhost:8000/ballotCard")
			.then(res => res.json())
			.then(data => setBallotCards(data))
			.catch(err => console.error(err))
	}, []);
	console.log(ballotCards)

	return (
		<Container className={classes.container}>
			{ballotCards.map(ballot => (
				<Card className={classes.card} key="ballot-card-key">
					<CardHeader title={ballot.title} subheader={ballot.username}/>	
					<CardContent>
						<Typography 
							variant="body2"
							className={classes.details}
						>
							{ballot.details === "" ? "No details..." : ballot.details}
						</Typography>
						<FormControl> 
							<FormLabel component="h2">Vote</FormLabel>
								<RadioGroup>
									{ballot.items.map(item => (
										<FormControlLabel value={item.title} control={<Radio />} label={item.title} key={item.title}/>
									))}
								</RadioGroup>
								<Button 
									type="submit" 
									variant='outlined' 
									color="secondary"
									className={classes.submit}
								>
									Submit
								</Button>
						</FormControl>

					</CardContent>
				</Card>	
			))}
		</Container>
	)
}

export default BallotCard;