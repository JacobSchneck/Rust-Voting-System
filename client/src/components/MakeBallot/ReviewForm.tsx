interface ReviewFormProps {
	step: number,
	setStep: (step: number) => void,
	title: string,
	description: string,
	items: string[],
}

const ReviewForm: React.FC<ReviewFormProps> = ({step, setStep, title, description, items}) => {
	if (step != 2) return null;
	return (
		<div>
			<div>
				<div style={{border: "1px solid black", margin: "5px", padding: "5px"}}>Ballot Title: {title} </div>
				<div style={{border: "1px solid black", margin: "5px", padding: "5px"}}>Ballot Description: {description} </div>
				<div style={{border: "1px solid black", margin: "5px", padding: "5px"}}>
					<ol>
						{items.map( (item, index) => {
							return (
								<li key={`${item}-${index}`}>{item}</li>
							)
						})}
					</ol>
				</div>
			</div>

			<div style={{display: "flex", flexDirection: "column"}}>
				<button onClick={() => setStep(step - 1)}> Back </button>
				<button>Submit Ballot</button>
			</div>
		</div>
	);
}

export default ReviewForm;