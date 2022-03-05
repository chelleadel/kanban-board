import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./Main.css";
import KanbanBoard from "./KanbanBoard";
import Home from "./Home";

function App() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Home />} exact />
				<Route path="/kanbanboard" element={<KanbanBoard />} exact />
			</Routes>
		</div>
	);
}

export default App;
