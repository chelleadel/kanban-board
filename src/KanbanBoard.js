import "./Main.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import { useState } from "react";
import {
	Typography,
	Button,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@material-ui/core";
import { useLocation } from "react-router-dom";

// limit of the items in each column
const maxItem = 2;

const columnItems = [{ id: uuid(), content: "Hello World" }];

const columnNames = {
	[uuid()]: {
		name: "To Do",
		items: columnItems,
	},
	[uuid()]: {
		name: "In Progress",
		items: [{ id: uuid(), content: "Hi World" }],
	},
	[uuid()]: {
		name: "Done",
		items: [],
	},
};

// function to move items to different columns
const onDragFunc = (result, columns, setColumns) => {
	if (!result.destination) return;
	const { source, destination } = result;
	if (source.droppableId !== destination.droppableId) {
		const srcCol = columns[source.droppableId];
		const desCol = columns[destination.droppableId];
		const srcItems = [...srcCol.items];
		const destItems = [...desCol.items];
		if (destItems.length < maxItem) {
			const [removed] = srcItems.splice(source.index, 1);
			destItems.splice(destination.index, 0, removed);
			setColumns({
				...columns,
				[source.droppableId]: {
					...srcCol,
					items: srcItems,
				},
				[destination.droppableId]: {
					...desCol,
					items: destItems,
				},
			});
		}
	} else {
		const column = columns[source.droppableId];
		const copy = [...column.items];
		const [removed] = copy.splice(source.index, 1);
		copy.splice(destination.index, 0, removed);
		setColumns({
			...columns,
			[source.droppableId]: {
				...column,
				items: copy,
			},
		});
	}
};

const kanbanName = "";
const kanbanDescription = "";

function KanbanBoard() {
	const [columns, setColumns] = useState(columnNames);
	const [name, setName] = useState(kanbanName);
	const [description, setDescription] = useState(kanbanDescription);
	const [counter, setCounter] = useState(0);
	const location = useLocation();
	const from = location.state;

	if (counter == 0) {
		setName(from.name);
		setDescription(from.description);
		setCounter(1);
	}

	// Functions for Edit Kanban Board Dialog Box

	const [editOpen, setEditOpen] = useState(false);

	const handleEditClickOpen = () => {
		setEditOpen(true);
	};

	const handleEditClose = () => {
		setEditOpen(false);
	};

	return (
		<div className="Base">
			<Typography variant="h2"> {name} </Typography>
			<Typography variant="h5"> {description} </Typography>
			<Button color="secondary" onClick={handleEditClickOpen}>
				Edit Board Details
			</Button>
			<Dialog open={editOpen} onClose={handleEditClose}>
				<DialogTitle>Edit Kanban Board</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Name"
						type="text"
						value={name}
						fullWidth
						variant="standard"
						onChange={(e) => {
							setName(e.target.value);
						}}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="description"
						label="Description"
						type="text"
						value={description}
						fullWidth
						variant="standard"
						onChange={(e) => {
							setDescription(e.target.value);
						}}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleEditClose}>Cancel</Button>
					<Button onClick={handleEditClose}>Save Changes</Button>
				</DialogActions>
			</Dialog>
			<div className="BodyKanban">
				<DragDropContext onDragEnd={(result) => onDragFunc(result, columns, setColumns)}>
					{Object.entries(columns).map(([id, column]) => {
						return (
							<div>
								<Typography variant="h5">{column.name}</Typography>
								<Droppable droppableId={id} key={id}>
									{(provided, snapshot) => {
										return (
											<div
												{...provided.droppableProps}
												ref={provided.innerRef}
												style={{
													minWidth: 250,
													background: snapshot.isDraggingOver ? "lightblue" : "lightgrey",
													minHeight: 550,
													margin: "0 30px 0 0",
													boxShadow: "5px",
													borderRadius: "10px",
												}}
											>
												<Button
													fullWidth
													onClick={() => {
														const column = columns[{ id }.id];
														if (column.items !== "undefined") {
															const copy = [...column.items];
															if (copy.length < maxItem) {
																copy.push({ id: uuid(), content: "Type Here" });
																setColumns({
																	...columns,
																	[{ id }.id]: {
																		...column,
																		items: copy,
																	},
																});
															}
														}
													}}
												>
													+
												</Button>
												{column.items.map((item, index) => {
													var itemContent = item.content;
													return (
														<Draggable key={item.id} draggableId={item.id} index={index}>
															{(provided, snapshot) => {
																return (
																	<div
																		ref={provided.innerRef}
																		{...provided.draggableProps}
																		{...provided.dragHandleProps}
																		style={{
																			userSelect: "none",
																			padding: 16,
																			textAlign: "center",
																			margin: "2px 0 8px 0",
																			color: "white",
																			backgroundColor: snapshot.isDragging ? "grey" : "lightblue",
																			...provided.draggableProps.style,
																			borderRadius: "10px",
																		}}
																	>
																		<div>
																			<TextField
																				style={{ border: "none" }}
																				variant="outlined"
																				type="text"
																				value={itemContent}
																				onChange={(e) => {
																					const copy = [...column.items];
																					copy[index] = { id: item.id, content: e.target.value };
																					setColumns({
																						...columns,
																						[{ id }.id]: {
																							...column,
																							items: copy,
																						},
																					});
																				}}
																			></TextField>
																		</div>
																		<Button
																			onClick={() => {
																				const copy = [...column.items];
																				copy.splice(index, 1);
																				setColumns({
																					...columns,
																					[{ id }.id]: {
																						...column,
																						items: copy,
																					},
																				});
																			}}
																		>
																			Delete
																		</Button>
																	</div>
																);
															}}
														</Draggable>
													);
												})}
												{provided.placeholder}
											</div>
										);
									}}
								</Droppable>
							</div>
						);
					})}
				</DragDropContext>
			</div>
		</div>
	);
}

export default KanbanBoard;
