import React from 'react';
import ReactDOM from 'react-dom';
import ProfileForm from './ProfileForm';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProfileForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});