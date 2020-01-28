import React from 'react';
// import { SearchPanel } from '../search-panel/search-panel';

import './app-header.scss';

export const AppHeader = ({ active, onSearchChange }) => {
  return (
    <header className='app-header'>
      <h1>Choose-a-pair</h1>
      <h3>{active} people in active search</h3>
      {/* <SearchPanel onSearchChange={onSearchChange} /> */}
    </header>
  );
};
