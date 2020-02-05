import React from 'react';
import { render } from '@testing-library/react';

import Class from './Class';

describe(' Class', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Class />);
    expect(baseElement).toBeTruthy();
  });
});
