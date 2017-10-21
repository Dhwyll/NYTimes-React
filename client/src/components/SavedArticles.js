import React, { Component } from "react";
import Jumbotron from "./Jumbotron/Jumbotron.js";
import GetArticles from "../utils/GetArticles.js";
import '../App.css';


class SavedArticles extends Component {

	// The state for this page holds keys for:
	// 	Array to hold the articles found
	//  Conditional to display the No Articles Found result

	state = {
		articles: [],
		foundArticles: true
	};

	// When starting, grab the saved articles
	componentDidMount() {
		GetArticles.getSavedArticles()
			.then(res => {
				// If there are articles, save them and set the foundArticles to true
				if (res.data.length !== 0) {
					this.setState({
						articles: res.data,
						foundArticles: true
					});					
				}
					// Otherwise, create a dummy entry for the articles and set the foundArticles to false
					else {
						let noArticles = [{
							url: "",
							snippet: "No articles have been saved",
							headline: "No Articles Found"
						}];
						this.setState({
							articles: noArticles,
							foundArticles: false
						});
					}
			})
			.catch(err => console.log(err));
		// this.searchArticles("headlines");
	}

	// When the button to delete a saved article is clicked, delete it
	deleteArticle(info) {
		GetArticles.deleteArticle(info).then(res => {
			if (res.data.length !== 0) {
				this.setState({ articles: res.data});					
			}
				else {
					let noArticles = [{
						url: "",
						snippet: "No articles have been saved",
						headline: "No Articles Found"
					}];
					this.setState({
						articles: noArticles,
						foundArticles: false
					});
				}
		}).catch(err => console.log(err));
	};

	render() {
		// If there are articles to display, use the version that has a button to delete the articles...probably better done with props
		if (this.state.foundArticles) {
			return (
				<div className = "container">
					<div className="App">
						<Jumbotron children={"Saved Articles"} />
						<div className = "container">
							<div className="row">
								<div className="col-sm-12">
									{this.state.articles.map(info => (
										<div className = "row">
											<div className = "panel panel-default">
												<div className = "panel-heading">
													<h3 className = "panel-title"><a href={info.url} target="_blank">{info.headline}</a></h3>
												</div>
												<div className = "panel-body">
													{info.snippet}
													<br />
													<br />
													<div>
														<button className="btn btn-primary" onClick={() => this.deleteArticle({info})}>Unsave</button>
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
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
							<Jumbotron children={"Saved Articles"} />
							<div className="container">
								<div className="row">
									<div className = "col-sm-12">
										{this.state.articles.map(info => (
											info.snippet &&
											<div className = "row">
												<div className = "panel panel-default">
													<div className = "panel-heading">
														<h3 className = "panel-title"><a href={info.url} target="_blank">{info.headline}</a></h3>
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
						</div>
					</div>
				)	
			}
	}
}

export default SavedArticles;