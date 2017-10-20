import React from 'react'
import { Link } from 'react-router-dom'

// The Header creates links that can be used to navigate
// between routes.
const TopNav = () => (
	<nav className="navbar navbar-default navbar-fixed-top">
		<div className="container-fluid">
			<div className="nav navbar-nav">
				<Link to='/'><button className="btn btn-primary">Home</button></Link>
				<Link to='/savedarticles'><button className="btn btn-primary">Saved Articles</button></Link>
			</div>
		</div>
	</nav>
)

export default TopNav
