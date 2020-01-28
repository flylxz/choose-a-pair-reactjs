import React, { Component } from 'react';
import { UserListItem } from '../user-list-item/user-list-item';
import { Loader } from '../loader/loader';

import './user-list.scss';

export class UserList extends Component {
  handleClick = e => {
    this.props.stateModalChoose(true, e.target.id);
  };

  render() {
    const { userList } = this.props;
    let firstLetter = 'A';

    const elements = userList ? (
      userList.map(user => {
        if (firstLetter === user.first_name[0]) {
          return (
            <>
              <li
                key={user.id}
                id={user.id}
                className={user.status}
                onClick={this.handleClick}
              >
                <UserListItem {...user} />
              </li>
            </>
          );
        }
        if ((firstLetter = user.first_name[0])) {
          return (
            <>
              <>{firstLetter}:</>
              <li
                key={user.id}
                id={user.id}
                className={user.status}
                onClick={this.handleClick}
              >
                <UserListItem {...user} />
              </li>
            </>
          );
        }

        return (
          <li
            key={user.id}
            id={user.id}
            className={user.status}
            onClick={this.handleClick}
          >
            <UserListItem {...user} />
          </li>
        );
      })
    ) : (
      <Loader />
    );

    return (
      <ul className='userList'>
        <>{firstLetter.toUpperCase()}:</>
        {elements}
      </ul>
    );
  }
}
