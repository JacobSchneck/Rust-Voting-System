
interface BallotFormProps {
	step: number,
	setStep: (step: number) => void,
	setTitle: (title: string) => void,
	setDescription: (description: string) => void,
}

const BallotForm: React.FC<BallotFormProps> = ({ 
	step, 
	setStep, 
	setTitle,
	setDescription,
	}) => {
	if (step !== 0) return null;

	return (
		<div>
			<h2>Create a Ballot</h2>
			<form className="basic-form">
				<input 
					type="text" 
					placeholder="Ballot Title"  
					maxLength={256} 
					onChange={(event) => setTitle(event.target.value)}
				/>
				<input 
					type="text" 
					placeholder="Description" 
					maxLength={256} 
					style={{marginBottom: "5px"}} 
					onChange={(event) => setDescription(event.target.value)}
				/>
				<input type="submit" value="Next" onClick={() => setStep(step + 1)}/>	
			</form>
		</div>
	);
}

export default BallotForm;