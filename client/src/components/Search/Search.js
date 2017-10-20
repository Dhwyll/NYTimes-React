import React from "react";
import { Input, FormBtn } from "../Form";


const Search = props =>

	<form>
		<Input
			value={props.subject}
			onChange={props.handleInputChange}
			name="subject"
			className="form-control"
			placeholder="Subject (Required)"
			id="subject"
		/>
		<Input
			value={props.start_date}
			onChange={props.handleInputChange}
			name="start_date"
			className="form-control"
			placeholder="Start Year (Optional)"
			id="start_date"
		/>
		<Input
			value={props.end_date}
			onChange={props.handleInputChange}
			name="end_date"
			className="form-control"
			placeholder="End Year (Optional)"
			id="end_date"
		/>
		<FormBtn
			// disabled={!(props.subject)}
			onClick={props.handleFormSubmit}
		>
			Search
		</FormBtn>
	</form>

export default Search;
