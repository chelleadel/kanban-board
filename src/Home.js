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
		id: uuid(),
		name: "Kanban Board #1",
		description: "This is a Kanban Board",
	},
	{
		id: uuid(),
		name: "Kanban Board #2",
		description: "Michelle's Kanban Board",
	},
];

function Home() {
	const [boards, setKanbanBoards] = useState(kanbanboards);
	const [open, setOpen] = useState(false);
	const [newName, setName] = useState("");
	const [newDescription, setDescription] = useState("");

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
		setKanbanBoards({
			...kanbanboards,
			[uuid()]: {
				name: newName,
				description: newDescription,
			},
		});

		setName("");
		setDescription("");
		setOpen(false);
	};

	return (
		<div>
			<div className="Title">
				<Typography variant="h3"> My Kanban Boards</Typography>
			</div>
			<div className="Buttons">
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
			{Object.entries(boards).map(([id, board], index) => {
				const name = board.name;
				const description = board.description;
				return (
					<div className="ExistingKanban">
						<Link to="/kanbanboard" style={{ textDecoration: "none" }} state={{ name: name, description: description }}>
							<Box>
								<Typography>
									{board.name} <br /> {board.description}
								</Typography>
							</Box>
						</Link>
						<Button>Edit</Button>
						<Button
							onClick={() => {
								const copy = [...boards];
								copy.splice(index, 1);
								setKanbanBoards(copy);
							}}
						>
							Delete
						</Button>
					</div>
				);
			})}
		</div>
	);
}

export default Home;
