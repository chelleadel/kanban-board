import "./Main.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import { useState } from "react";
import { Typography, Button } from "@material-ui/core";

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
	const maxItem = 1;
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
				items: copy,
			},
		});
	}
};

function App() {
	const [columns, setColumns] = useState(columnNames);
	return (
		<div className="Base">
			<Typography variant="h1">Kanban Board</Typography>
			<div>
				<DragDropContext onDragEnd={(result) => onDragFunc(result, columns, setColumns)}>
					{Object.entries(columns).map(([id, column]) => {
						return (
							<div className="Column">
								<Typography variant="h2">{column.name}</Typography>
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
													margin: "0 8px 0 0",
												}}
											>
												{column.items.map((item, index) => {
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
																			margin: "0 0 8px 0",
																			color: "white",
																			backgroundColor: snapshot.isDragging ? "black" : "brown",
																			...provided.draggableProps.style,
																		}}
																	>
																		{item.content}
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
								<Button>+ Add Item</Button>
							</div>
						);
					})}
				</DragDropContext>
			</div>
		</div>
	);
}

export default App;
