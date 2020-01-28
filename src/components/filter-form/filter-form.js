import React, { Component } from 'react';

import './filter-form.scss';

export class FilterForm extends Component {
  state = {
    searchName: 'Search...',
    gender: '',
    ageMin: null,
    ageMax: null
  };

  componentDidMount = () => {
    const { ageMin, ageMax } = this.props;
    this.setState({ ageMin, ageMax });
  };

  onNameChange = e => {
    const { onFilterName } = this.props;
    this.setState({ searchName: e.target.value });
    onFilterName(e.target.value);
  };

  onGenderChange = e => {
    const { onFilterGender } = this.props;
    this.setState({ gender: e.target.value });
    onFilterGender(e.target.value);
  };

  onAgeChange = e => {
    const { onFilterAge } = this.props;
    this.setState({
      ageMin: e.target.value,
      ageMax: e.target.value
    });
    console.log(e.target);
    console.log(this.state);
    // onFilterAge(e.target.value)
  };

  resetFilters = () => {
    const { onResetFliters, ageMin, ageMax } = this.props;
    this.setState({
      searchName: 'Search...',
      gender: '',
      ageMin: ageMin,
      ageMax: ageMax
    });
    onResetFliters();
  };

  render() {
    return (
      <div className='filter-form'>
        <form>
          <label className='title'>Filters</label>
          <label>Name</label>
          <input
            type='search'
            placeholder={this.state.searchName}
            className='filter-name'
            onChange={this.onNameChange}
          />
          <label>Age</label>
          <div className='age' onChange={this.onAgeChange}>
            <div>
              <label>From</label>
              <input type='text' name='from' placeholder={this.state.ageMin} />
            </div>
            <div>
              <label>To</label>

              <input type='text' name='to' placeholder={this.state.ageMax} />
            </div>
          </div>
          <label>Gender</label>
          <select
            onChange={this.onGenderChange}
            defaultValue={this.state.gender}
          >
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value=''>Both</option>
          </select>
          <div className='btn' onClick={this.resetFilters}>
            Reset
          </div>
        </form>
      </div>
    );
  }
}
