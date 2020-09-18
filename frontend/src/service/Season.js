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
			InvalidSize: false,
      isSubmitted: false,
			PositionSubmit: false,
			CriteriaSubmit: false,
			YearSubmit: false,
			SizeSubmit: false,

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
		else{
			if(name === "Year" || name === "Size"){
				this.setState({["Invalid"+name]:false})
			}
	    this.setState({
				[name+"Submit"]: false,
	      isSubmitted: false,
	      [name] : value
	    });
		}
  };

  handleSubmit(e) {
    /* Prevents browser from reloading page */
    e.preventDefault();

    // const url = 'http://localhost:8080/NBA';
		var ErrorCheck = false
    const Year = this.state.Year;
    const Position = this.state.Position;
    const Criteria = this.state.Criteria;
    const Size = this.state.Size;

			if(Position==null) {
					this.setState({
						PositionSubmit:true
					});
					ErrorCheck = true;
			}
			if(Criteria==null) {
					this.setState({
						CriteriaSubmit:true
					});
					ErrorCheck = true;
			}
			if(Year==null) {
					this.setState({
						YearSubmit:true,
						InvalidYear: false
					});
					ErrorCheck = true;
			}
			else if(Year<1950 || Year>2017){
					this.setState({
						InvalidYear: true,
						YearSubmit:false
					});
					ErrorCheck = true;
				}
			if(Size==null) {
					this.setState({
						SizeSubmit:true,
						InvalidSize: false
					});
					ErrorCheck = true;
			}
			else if(Size <=0){
					this.setState({
						InvalidSize: true,
						SizeSubmit:false
					});
					ErrorCheck = true;
			}

		if(ErrorCheck)
			return;
		else{
    fetch(url+Year+'/'+Position+'/'+Criteria+'/'+Size,{
      method: 'GET',
    })
    /* Returns a promise containing the response */
      .then((response) => {
        // console.log(response.status, response.statusText);
      if (response.ok){
          this.setState({
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
		const InvalidYear = this.state.InvalidYear;
		const InvalidSize = this.state.InvalidSize;
		const isSubmitted = this.state.isSubmitted;
		const PositionSubmit = this.state.PositionSubmit;
		const CriteriaSubmit = this.state.CriteriaSubmit;
		const YearSubmit = this.state.YearSubmit;
		const SizeSubmit = this.state.SizeSubmit;


				return(
		<div className="center">
    	<div className="container-lg" >


    		<form onSubmit={this.handleSubmit}>

    			<div className=''>
  					<h1>NBA Players Statistics</h1>
    			</div>

					<div id="Position">
					  <div className="form-row">
					    <div className="form-group col-md-10">
					      <label >Position</label>
					      <select name="Position" value={this.state.Position} onChange={this.handleChange}>
					        <option disabled selected value> -- Select Position -- </option>
					        {this.createSelect(optionsPositions)}
					      </select>
									{(PositionSubmit)?<p class="error">Please select a Position.</p>:<div/>}
					    </div>
					  </div>
					</div>

					<div id="Criteria">
					  <div className="form-row">
					    <div className="form-group col-md-10">
					      <label >Criteria</label>
					      <select  name="Criteria" value={this.state.Criteria} onChange={this.handleChange}>
					        <option disabled selected value> -- Select Criteria -- </option>
					        {this.createSelect(optionsCriteria)}
					      </select>
								{(CriteriaSubmit)?<p class="error">Please select a Criteria.</p>:<div/>}
					    </div>
					  </div>
					</div>

					<div id="Year">
						<div className="form-row">
							<div className="form-group col-md-10">
								<label >Year</label>
								<input  name="Year"  type="text" placeholder="YYYY" value={this.state.Year} onChange={this.handleChange}/>
								{(YearSubmit)?<p class="error">Please input a Year.</p>:<div/>}
								{(InvalidYear)?<p class="error">Invalid Year . Please choose between 1950-2017</p>:<div/>}
							</div>
						</div>
					</div>

					<div id="Size">
						<div className="form-row">
							<div className="form-group col-md-10">
								<label >Size</label>
								<input name="Size" type="text" placeholder="XXX" value={this.state.Size} onChange={this.handleChange}/>
								{(SizeSubmit)?<p class="error">Please input a Size.</p>:<div/>}
								{(InvalidSize)?<p class="error">The size must be larger of 0.</p>:<div/>}
							</div>
						</div>
					</div>

					<div id="Button">
						<div className="left">
				    	<button class="button" type="submit">Search</button>
						</div>
					</div>

    		</form>
				<div>
					{(isSubmitted)
						?(
					<div id="span3" className="table-responsive -sm">
						<table className="table table-hover">
							<thead class="thead-dark">
								<tr>
									<th scope="col">Year</th>
									<th scope="col">Player</th>
									<th scope="col">Position</th>
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
