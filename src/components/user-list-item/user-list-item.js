import React from 'react';

import './user-listitem.scss';

export const UserListItem = ({ id, first_name, last_name, dob, gender }) => {
  const currentYear = new Date(Date.now()).getFullYear();

  const getYearFromDob = dob => {
    return +dob.substr(0, 4);
  };

  const age = currentYear - getYearFromDob(dob);

  return (
    <>
      #{id} - {first_name} {last_name} - {age} year old - {gender}
    </>
  );
};
