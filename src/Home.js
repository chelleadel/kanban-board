import {
	Button,
	Typography,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Box,
} from "@material-ui/core";
import "./Main.css";
import { v4 as uuid } from "uuid";
import { useState } from "react";
import { Link } from "react-router-dom";

const kanbanboards = [
	{
		name: "Kanban Board #1",
		description: "This is a Kanban Board",
	},
	{
		name: "Kanban Board #2",
		description: "Michelle's Kanban Board",
	},
];

function Home() {
	const [boards, setKanbanBoards] = useState(kanbanboards);
	const [open, setOpen] = useState(false);
	const [newName, setName] = useState("");
	const [newDescription, setDescription] = useState("");
	// Functions for Add Kanban Board Dialog Box
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleNameChange = (e) => {
		setName(e.target.value);
	};

	const handleDesChange = (e) => {
		setDescription(e.target.value);
	};

	const handleAdd = () => {
		const copy = [...boards];
		const newBoard = {
			name: newName,
			description: newDescription,
		};
		copy.push(newBoard);
		setKanbanBoards(copy);

		setName("");
		setDescription("");
		setOpen(false);
	};

	return (
		<div>
			<div className="Title">
				<Typography variant="h3"> My Kanban Boards</Typography>
			</div>
			<div style={{ margin: "20px", float: "left" }}>
				<Button variant="contained" color="primary" className="AddKanbanButton" onClick={handleClickOpen}>
					+ <br /> Create A Kanban Board
				</Button>
			</div>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Create New Kanban Board</DialogTitle>
				<DialogContent>
					<DialogContentText>Add in new Kanban Board Title and its description</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Name"
						type="text"
						fullWidth
						variant="standard"
						onChange={handleNameChange}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="description"
						label="Description"
						type="text"
						fullWidth
						variant="standard"
						onChange={handleDesChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleAdd}>Add</Button>
				</DialogActions>
			</Dialog>
			{boards.map((board, index) => {
				const name = board.name;
				const description = board.description;
				return (
					<div>
						<Box className="ExistingKanban">
							<Link
								to="/kanbanboard"
								style={{ textDecoration: "none", color: "black" }}
								state={{ name: name, description: description }}
							>
								<div className="LinkToIndividualBoard">
									<Typography style={{ textAlign: "center" }}>
										{board.name} <br /> {board.description}
									</Typography>
								</div>
							</Link>
							<Button
								style={{ height: "200px" }}
								color="secondary"
								onClick={() => {
									const copy = [...boards];
									copy.splice(index, 1);
									setKanbanBoards(copy);
								}}
							>
								Delete
							</Button>
						</Box>
					</div>
				);
			})}
		</div>
	);
}

export default Home;
