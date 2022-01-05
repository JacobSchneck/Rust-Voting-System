import React, { useState } from 'react';
import { 
	Container, 
	makeStyles,
	Button,
	Typography,
	TextField,
	Radio,
	RadioGroup,
	FormControl,
	FormLabel,
	FormControlLabel,
	Select,
	MenuItem,
	InputLabel,
} from '@material-ui/core'
import { KeyboardArrowRight } from '@mui/icons-material';
import ItemType from '../../types/Item';

const useStyles = makeStyles((theme) => {
	return {
		toolbar: theme.mixins.toolbar,
		form: {
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			marginTop: theme.spacing(2),
			minWidth: "50%",
			maxWidth: "50%",
		},
		title: {
			textAlign: "center",
			marginTop: theme.spacing(3),
		},
		spacing: {
			marginTop: theme.spacing(2),
			marginBottom: theme.spacing(2),
		},
		textField: {
			marginTop: 5,
			marginBottom: 5,
		},
	}
});


const PostBallotHome = () => {
	const classes = useStyles();

	const [ballotTitle, setBallotTitle] = useState<string>("");
	const [ballotDetails, setBallotDetails] = useState<string>("");

	const [numItems, setNumItems] = useState<number>(2);
	const [itemTitle, setItemTitle] = useState<string>("");
	const [items, setItems] = useState<string[]>([]);


	const handelNumItems = (e: any) => {
		const n = e.target.value;
		const oldItems = items.slice();
		const newItems = Array(n).fill("");
		for (let i = 0; i < newItems.length; i++) {
			if (i > oldItems.length - 1) break;
			if (oldItems[i] !== "") {
				newItems[i] = oldItems[i];
			}
		}

		setNumItems(n);
		setItems(newItems);
	}

	const handleChangeItem = (e: any, index: number) => {
		let newItems = items.slice();
		newItems[index] = e.target.value;
		setItems(newItems);
		console.log(items);
	}

	return (
		<Container>
			<div className={classes.toolbar}></div>
			<Container className={classes.title}>
				<Typography
					variant="h6"
					color="textSecondary"
					component="h2"
					gutterBottom
				>
					Create a New Ballot
				</Typography>
			</Container>
			
			<Container className={classes.form}>
				<form 
					noValidate
					autoComplete="off"
				>
					<TextField
						onChange={(e) => setBallotTitle(e.target.value)}
						className={classes.textField}
						label="Ballot Title"
						color="secondary"
						variant="filled"
						fullWidth
						required
					/>
					<TextField
						onChange={(e) => setBallotDetails(e.target.value)}
						className={classes.textField}
						label="Details..."
						color="secondary"
						variant="filled"
						multiline
						rows={2}
						fullWidth
					/>

					<Container className={classes.spacing}>
						<FormControl fullWidth>
							<InputLabel id="number-of-items">Number of Items on Ballot</InputLabel>
							<Select
								id="select-number-of-items"
								value={numItems}
								label="Number of Items on Ballot"
								onChange={handelNumItems}
							>
								<MenuItem value={1}>One</MenuItem>
								<MenuItem value={2}>Two</MenuItem>
								<MenuItem value={3}>Three</MenuItem>
								<MenuItem value={4}>Four</MenuItem>
								<MenuItem value={5}>Five</MenuItem>
							</Select>
						</FormControl>
					</Container>

					{Array(numItems).fill(0).map((item, index) => (
						<TextField
							className={classes.textField}
							onChange={(e) => handleChangeItem(e, index)}
							key={`${index}`}
							label={`Item #${index + 1}`}
							color="secondary"
							variant="filled"
							multiline
							fullWidth
						/>
					))}

					<Button
						type="submit"
						color="secondary"
						variant="contained"
						endIcon={<KeyboardArrowRight />}
						style={{width: "100%"}}
						className={classes.spacing}
					>
						Submit
					</Button>
				</form>
			</Container>
		</Container>
	)
}

export default PostBallotHome;
