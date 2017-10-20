import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TopNav from "./components/TopNav";
import Main from "./components/Main";

const App = () => (
	<Router>
		<div>
			<TopNav />
			<Main />
		</div>
	</Router>
)

export default App;