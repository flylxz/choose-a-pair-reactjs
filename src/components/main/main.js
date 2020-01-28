import React, { Component } from 'react';
import { AppHeader } from '../app-header/app-header';
import { FilterForm } from '../filter-form/filter-form';
import { ModalChoose, ModalConfirm } from '../modal/modal';
import { UserList } from '../user-list/user-list';
import { Loader } from '../loader/loader';

import GoRestService from '../../services/goRestService';

import './main.scss';

export class Main extends Component {
  goRestService = new GoRestService();

  state = {
    modalChoose: false,
    modalConfirm: false,
    userId: null,
    searchName: '',
    gender: '',
    ageMin: null,
    ageMax: null,
    userList: null
  };

  componentDidMount() {
    this.updateList();
    // if (this.state.userList) {
    //   this.calcMinMaxAge(this.state.userList);
    // }
  }

  updateList = () => {
    this.goRestService.getUserList().then(userList => {
      this.calcMinMaxAge(userList.result);
      this.setState({ userList: userList.result });
    });
  };

  calcMinMaxAge = userList => {
    const currentYear = new Date(Date.now()).getFullYear();

    const getYearFromDob = dob => {
      return +dob.substr(0, 4);
    };

    let ageMin = 100;
    let ageMax = 0;

    for (let value of userList) {
      const calcAge = currentYear - getYearFromDob(value.dob);
      // ageMin,ageMax = calcAge;
      if (calcAge < ageMin) {
        ageMin = calcAge;
      }
      if (calcAge > ageMax) {
        ageMax = calcAge;
      }
    }

    this.setState({ ageMin, ageMax });
  };

  getModal = () => {
    if (this.state.modalChoose)
      return (
        <ModalChoose
          stateModalChoose={this.stateModalChoose}
          stateModalConfirm={this.stateModalConfirm}
          id={this.state.userId}
          onDelete={this.onDelete}
        />
      );
    else if (this.state.modalConfirm) {
      return <ModalConfirm stateModalConfirm={this.stateModalConfirm} />;
    }
    return null;
  };

  stateModalChoose = (stateModal, id) => {
    this.setState({ modalChoose: stateModal, userId: id });
  };

  stateModalConfirm = stateModal => {
    this.setState({ modalConfirm: stateModal });
  };

  searchUser = (userList, searchName) => {
    if (searchName.length < 3) {
      return userList;
    }

    return userList.filter(user => {
      return (
        user.first_name.toLowerCase().indexOf(searchName.toLowerCase()) > -1 ||
        user.last_name.toLowerCase().indexOf(searchName.toLowerCase()) > -1
      );
    });
  };

  searchGender = (userList, gender) => {
    if (gender) {
      return userList.filter(user => user.gender === gender);
    }
    return userList;
  };

  searchAge = (userList, min, max) => {
    // console.log(userList, min, max);
  };

  sortByFirstName = (a, b) => {
    if (a.first_name > b.first_name) {
      return 1;
    }
    if (a.first_name < b.first_name) {
      return -1;
    }
    return 0;
  };

  onFilterName = searchName => {
    setTimeout(() => this.setState({ searchName }), 400);
  };

  onFilterGender = gender => {
    setTimeout(() => this.setState({ gender }), 400);
  };

  onFilterAge = (ageMin, ageMax) => {
    setTimeout(() => this.setState({ ageMin, ageMax }), 400);
  };

  onResetFliters = () => {
    setTimeout(
      () =>
        this.setState({ searchName: '', gender: '', ageMin: 0, ageMax: 99 }),
      400
    );
  };

  onDelete = id => {
    this.setState(state => {
      const idUser = state.userList.findIndex(user => user.id === id);
      const userList = [
        ...state.userList.slice(0, idUser),
        ...state.userList.slice(idUser + 1)
      ];
      return { userList };
    });
  };

  render() {
    const { userList, searchName, gender, ageMin, ageMax } = this.state;

    if (!userList) {
      return <Loader />;
    }

    const activeCount = userList.filter(user => user.status === 'active')
      .length;

    const filteredByName = this.searchUser(userList, searchName);
    const filterdByGender = this.searchGender(filteredByName, gender);
    const filteredByAge = this.searchAge(filterdByGender, ageMin, ageMax);
    const visibleUsers = filterdByGender.sort(this.sortByFirstName);

    const renderList = (
      <UserList
        userList={visibleUsers}
        stateModalChoose={this.stateModalChoose}
      />
    );

    return (
      <div className='container'>
        {renderList}
        <FilterForm
          onFilterName={this.onFilterName}
          onFilterGender={this.onFilterGender}
          onFilterAge={this.onFilterAge}
          onResetFliters={this.onResetFliters}
          ageMin={this.state.ageMin}
          ageMax={this.state.ageMax}
        />
        <AppHeader active={activeCount} />
        {this.getModal()}
      </div>
    );
  }
}
