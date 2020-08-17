import React, { Component } from 'react';
var shortid = require('shortid');

const url = new URL("http://localhost:8080/NBA/")

const optionsPositions = [
	{ id: 1, value: 'All', label: 'All'},
	{ id: 2, value: 'PF', label: 'Power Forward' },
	{ id: 3, value: 'SG', label: 'Shooting Guard'},
	{ id: 4, value: 'PG', label: 'Point Guard'},
	{ id: 5, value: 'C', label: 'Center'},
	{ id: 6, value: 'F', label: 'Forward'},


]

const optionsCriteria = [
	{ id: 1, value: 'Pts', label: 'Total Points' },
	{ id: 2, value: 'Ast', label: 'Assists'},
	{ id: 3, value: 'P3_Per', label: '3Pointer%'},
]

class Season extends Component{

  constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      Year : null,
      Position : null,
      Criteria : null,
      Size : null,
      Results : [],
			InvalidYear: false,
			URLError: false,
      isSubmitted: false,

    };
  }

  handleChange (event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
		if(value===''){
			this.setState({
				[name] : null
			})
		}
		// console.log("changed: "+[name]+" to "+value);
		else
    this.setState({
			InvalidYear: false,
			URLError:false,
      isSubmitted: false,
      [name] : value
    });
  };

  handleSubmit(e) {
    /* Prevents browser from reloading page */
    e.preventDefault();

    // const url = 'http://localhost:8080/NBA';
    const Year = this.state.Year;
    const Position = this.state.Position;
    const Criteria = this.state.Criteria;
    const Size = this.state.Size;

    // console.log('Submitting...', Year, Position, Criteria, Size);
		if(Year==null || Position==null || Criteria==null || Size==null) {
				this.setState({
					URLError: true
				});
		}
		// console.log(url+Year+'/'+Position+'/'+Criteria+'/'+Size);
		else if(Year<1950 || Year>2017){
			this.setState({
				InvalidYear: true
			});
		}
		else{
    fetch(url+Year+'/'+Position+'/'+Criteria+'/'+Size,{
      method: 'GET',
    })
    /* Returns a promise containing the response */
      .then((response) => {
        // console.log(response.status, response.statusText);
      if (response.ok){
          this.setState({
						InvalidYear: false,
						URLError:false,
						isSubmitted: true
          });
          // console.log(response.data);
          return response.json();
        }
      })
      .then(json => {
        // console.log(json);
        this.setState({
          Results: json,

        });
				// console.log(this.state.Results);
      })
      .catch((error) => {
        console.error('Error:', error);
      });}
  }

  createSelect(selectedOption) {
		const arrayOfData = selectedOption;
		//console.log('arrayOfData = ', arrayOfData);
		return arrayOfData.map((data) =>
			<option
			key={data.id}
			value={data.value}
			>
			{data.label}
			</option>

		);
	}

  render(){
		const InvalidYear = this.state.InvalidYear
		const URLError = this.state.URLError;
		const isSubmitted = this.state.isSubmitted;


				return(
		<div className="center">
    	<div className="container-lg" >
    		<form className="was-validated" onSubmit={this.handleSubmit}>

    			<div className=''>
  					<h1>NBA Players Statistics</h1>
    			</div>

					<div id="Position">
					  <div className="form-row">
					    <div className="form-group col-md-10">
					      <label htmlFor="validationDefault05">Position</label>
					      <select required className="custom-select" name="Position" value={this.state.Position} onChange={this.handleChange}>
					        <option disabled selected value> -- Select Position -- </option>
					        {this.createSelect(optionsPositions)}
					      </select>
								<div className="invalid-feedback">Please select a value</div>
					    </div>
					  </div>
					</div>

					<div id="Criteria">
					  <div className="form-row">
					    <div className="form-group col-md-10">
					      <label htmlFor="validationDefault03">Criteria</label>
					      <select required className="custom-select" name="Criteria" value={this.state.Criteria} onChange={this.handleChange}>
					        <option disabled selected value> -- Select Criteria -- </option>
					        {this.createSelect(optionsCriteria)}
					      </select>
								<div className="invalid-feedback">Please select a value</div>
					    </div>
					  </div>
					</div>

					<div className="form-row">
						<div className="form-group col-md-10">
							<label htmlFor="validationDefault03">Year</label>
							<input required className="form-control" name="Year" id="DateNone" type="text" placeholder="YYYY" value={this.state.Year} onChange={this.handleChange}
								pattern="^[0-9]{4}"/>
							<div className="invalid-feedback">Please input a value</div>
						</div>
					</div>

					<div className="form-row">
						<div className="form-group col-md-10">
							<label htmlFor="validationDefault03">Size</label>
							<input required className="form-control" name="Size" id="DateNone" type="text" placeholder="XXX" value={this.state.Size} onChange={this.handleChange}
								pattern="^[0-9]{3}|[0-9]{2}|[0-9]{1}"/>
							<div className="invalid-feedback">Please input a value</div>
						</div>
					</div>

					<div className="left">
			    	<button class="button button2" type="submit">Search</button>
					</div>
    		</form>
				<div>
					{(URLError)?<p><strong>Error: </strong>Fill all fields</p>:<div/>}
					{(InvalidYear)?<p>Invalid Year Range. Choose between 1950-2017</p>:<div/>}
					{(isSubmitted)
						?(
					<div id="span3" className="table-responsive -sm">
						<table className="table table-hover">
							<thead class="thead-dark">
								<tr>
									<th scope="col">Year</th>
									<th scope="col">Player</th>
									<th scope="col">Positon</th>
									<th scope="col">Team</th>
									<th scope="col">Number of Games</th>
									<th scope="col">3Pointer%</th>
									<th scope="col">Assists</th>
									<th scope="col">Total Points</th>
								</tr>
							</thead>
							<tbody>
							{this.state.Results.map(item => (
								<tr key={shortid.generate()}>
									<td>{item.year}</td>
									<td>{item.player}</td>
									<td>{item.pos}</td>
									<td>{item.tm}</td>
									<td>{item.g}</td>
									<td>{item.p3_Per}</td>
									<td>{item.ast}</td>
									<td>{item.pts}</td>
								</tr>
							)
						)}
							</tbody>
						</table>
					</div>

			  )
				:(<div></div>)}
			</div>

	</div>
	</div>

)
}

}

export default Season;
