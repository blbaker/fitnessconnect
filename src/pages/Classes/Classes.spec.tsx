import React from 'react';
import { render } from '@testing-library/react';

import Classes from './Classes';

describe(' Classes', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Classes />);
    expect(baseElement).toBeTruthy();
  });
});
