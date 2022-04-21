import React from 'react';

export const JournalEntry = () => {
  return (
    <div className="journal__entry pointer">
      <div
        className="journal__entry-picture"
        style={{
          backgroundSize: 'cover',
          backgroundImage:
            'url(https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60)',
        }}
      ></div>
      <div className="journal__entry-body">
        <p className="journal__entry-title">A simple cat</p>
        <p className="journal__entry-content">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div className="journal__entry-date-box">
        <span>Monday</span>
        <h4>25</h4>
      </div>
    </div>
  );
};
