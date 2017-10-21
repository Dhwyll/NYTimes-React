import React from 'react'
// import { Switch, Route } from 'react-router-dom'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TimesContainer from './TimesContainer'
import SavedArticles from './SavedArticles'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
    <Switch>
		{/* The home page */}
		<Route exact path='/' component={TimesContainer}/>

		{/* The saved articles page */}
		<Route exact path="/savedarticles" component={SavedArticles}/>
    </Switch>
)

export default Main
