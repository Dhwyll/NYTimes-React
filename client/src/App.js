import React from "react";
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import TopNav from "./components/TopNav";
import Main from "./components/Main";

const App = () => (
	<Router>
		<div>
			<div className="container">
			<div className="row">
				<TopNav />
			</div>
			</div>
			<div className="row">
				<Main />
			</div>
		</div>
	</Router>
)

export default App;