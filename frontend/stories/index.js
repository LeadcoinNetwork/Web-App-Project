import React from 'react';
import { storiesOf } from '@storybook/react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from '../src/components/Button';

storiesOf('Button', module)
  .add('with text', () => (
    <MuiThemeProvider>
      <Button label="Hello"/>
    </MuiThemeProvider>
  ))