import { ObjectId } from 'bson';
import React, { Dispatch, SetStateAction } from 'react';
import classes from './hub-nav.module.scss';

export interface HubNavProps {
  query: {
    val: string;
    set: Dispatch<SetStateAction<string>>;
  };
}

export const HubNav: React.VFC<HubNavProps> = ({ query }) => {
  const handleNew = () => {
    const newID = new ObjectId();
    location.href = '/builder/' + newID;
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    query.set(e.target.value);
  };

  return (
    <nav className={classes.container}>
      <h1>All Forms</h1>
      <div className={classes.actions}>
        <input
          type='text'
          placeholder='Search...'
          value={query.val}
          onChange={(e) => handleSearch(e)}
        />
        <a onClick={handleNew}>New</a>
      </div>
    </nav>
  );
};
