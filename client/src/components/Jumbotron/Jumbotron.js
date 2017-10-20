import React from "react";

const Jumbotron = ({ children }) =>
	<div className = "jumbotron text-center">
			<h1 className="display-3">{children}</h1>
	</div>;

export default Jumbotron;