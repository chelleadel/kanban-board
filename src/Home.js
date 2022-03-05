import { Button, Typography } from "@material-ui/core";
import "./Main.css";
import { v4 as uuid } from "uuid";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-modal";

const kanbanboards = {
	[uuid()]: {
		name: "Kanban Board #1",
		description: "This is a Kanban Board",
	},
	[uuid()]: {
		name: "Kanban Board #2",
		description: "Michelle's Kanban Board",
	},
};

function Home() {
	const [boards, setKanbanBoards] = useState(kanbanboards);
	
	return (
		<div>
			<div className="Title">
				<Typography variant="h3"> Welcome to Kanban Boards!</Typography>
			</div>
			<div className="Buttons">
				<Button variant="contained" color="primary" className="AddKanbanButton" >
					+ <br /> Create A Kanban Board
				</Button>
			</div>
			{Object.entries(boards).map(([id, board]) => {
				return (
					<div className="Buttons">
						<Link to="/kanbanboard" style={{ textDecoration: "none" }}>
							<Button variant="contained" color="info" className="ExistingKanbanButton">
								<Typography>
									{board.name} <br /> {board.description}
								</Typography>
							</Button>
						</Link>
					</div>
				);
			})}
		</div>
	);
}

export default Home;
