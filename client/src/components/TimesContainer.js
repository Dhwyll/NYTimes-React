import React, { Component } from "react";
import Jumbotron from "./Jumbotron/Jumbotron.js";
import GetArticles from "../utils/GetArticles.js";
import Search from "./Search/Search.js";
import '../App.css';


class TimesContainer extends Component {

	// The state for this page holds keys for:
	// 	Subject to be searched
	// 	Start date for search
	// 	End date for search
	// 	Array to hold the articles found
	//  Conditional to display the No Articles Found result

	state = {
		subject: "",
		start_date: "",
		end_date: "",
		articles: [],
		foundArticle: true
	};

	// When starting, grab the headlines from the NYT
	componentDidMount() {
		this.searchArticles("headlines");
	}

	// Do a search for articles based on subject, start date, and end date
	searchArticles = (subject, start_date, end_date) => {
		GetArticles.search(subject, start_date, end_date)
			.then(res => {
				// If articles were found, set the state and set the foundArticles to true
				if (res.data.response.docs.length !== 0) {
					this.setState({
						articles: res.data.response.docs,
						foundArticles: true
					});					
				}
					// Otherwise, create a dummy entry for the articles and set the foundArticles to false
					else {
						let noArticles = [{
							web_url: "",
							snippet: "No articles found matching search terms",
							headline: {
								main: "No Articles Found"
							}
						}];
						this.setState({
							articles: noArticles,
							foundArticles: false
						});
					}
			})
			.catch(err => console.log(err));
	};

	// Whenever anything in the Form is updated, update the state so the search can be done
	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	// When the form is submitted, run the search
	handleFormSubmit = event => {
		// Preventing the default behavior of the form submit (which is to refresh the page)
		event.preventDefault();
		this.searchArticles(this.state.subject, this.state.start_date, this.state.end_date);
	};

	// When the button to save the article is clicked, save the article
	saveArticle(info) {
		GetArticles.saveArticle(info);		
	}

	render() {
		// If there are articles to display, use the version that has a button to display the articles...probably better done with props
		if (this.state.foundArticles) {
			return (
				<div className = "container">
					<div className="App">
						<Jumbotron children={"New York Times Article Search"} />
						<div className = "row">
						<Search
							query={this.state.query}
							start_date={this.state.start_date}
							end_date={this.state.end_date}
							handleInputChange={this.handleInputChange}
							handleFormSubmit={this.handleFormSubmit}
						/>
						</div>
						<br />

						{/* Run the article list and create panels for each article */}
						<div className="row">
						{this.state.articles.map(info => (
							info.snippet &&
							<div className = "row">
								<div className = "panel panel-default">
									<div className = "panel-heading">
										<h3 className = "panel-title"><a href={info.web_url} target="_blank">{info.headline.main}</a></h3>
									</div>
									<div className = "panel-body">
										{info.snippet}
										<br />
										<br />
										<div>
											<button className="btn btn-primary" onClick={() => this.saveArticle({info})}>Save Article</button>
										</div>
									</div>
								</div>
							</div>
						))}
						</div>
					</div>
				</div>
			)
		}
			// Otherwise, display the No Articles Found...again, probably better done with props.
			else {
				return (
					<div className = "container">
						<div className="App">
							<Jumbotron children={"New York Times Article Search"} />
							<div className = "row">
							<Search
								query={this.state.query}
								start_date={this.state.start_date}
								end_date={this.state.end_date}
								handleInputChange={this.handleInputChange}
								handleFormSubmit={this.handleFormSubmit}
							/>
							</div>
							<br />
	
							{/* Run the article list and create panels for each article */}
							<div className="row">
							{this.state.articles.map(info => (
								info.snippet &&
								<div className = "row">
									<div className = "panel panel-default">
										<div className = "panel-heading">
											<h3 className = "panel-title"><a href={info.web_url} target="_blank">{info.headline.main}</a></h3>
										</div>
										<div className = "panel-body">
											{info.snippet}
										</div>
									</div>
								</div>
							))}
							</div>
						</div>
					</div>
				)
			}
	}
}

export default TimesContainer;