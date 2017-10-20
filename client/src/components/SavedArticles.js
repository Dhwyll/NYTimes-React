import React, { Component } from "react";
import Jumbotron from "./Jumbotron/Jumbotron.js";
import GetArticles from "../utils/GetArticles.js";
import '../App.css';


class SavedArticles extends Component {

	state = {
		subject: "",
		start_date: "",
		end_date: "",
		articles: []
	};

	componentDidMount() {
		this.searchArticles("headlines");
	}

	searchArticles = (subject, start_date, end_date) => {
		GetArticles.search(subject, start_date, end_date)
			.then(res => {
				console.log("res data", res);
				this.setState({ articles: res.data.response.docs });
			})
			.catch(err => console.log(err));
	};

	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	handleFormSubmit = event => {
		// Preventing the default behavior of the form submit (which is to refresh the page)
		event.preventDefault();
		this.searchArticles(this.state.subject, this.state.start_date, this.state.end_date);
	};

	showAlert(info) {
		GetArticles.saveArticle(info).then((data) => console.log("Data is", data));
		// make an API call 
		// that post the info object 
		// to the server 
		
	}

	render() {
		if (!this.state.articles) return <p>Loading...</p>
		return (
			<div className = "container">
				<div className="App">
					<Jumbotron children={"Saved Articles"} />
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
								<div>
									<button onClick={() => this.showAlert({info})}>Unsave</button>
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

export default SavedArticles;