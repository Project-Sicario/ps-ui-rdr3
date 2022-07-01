import React from 'react';
import ReactDOM from 'react-dom';
import { debugData } from './nui/nui';

import Test from './nui/test';

debugData([
  {
    action: 'nui-test',
    data: {
      nui_toggle: true,
      data: {
        test: 'test',
        abc: 'abc',
      },
    },
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <Test />
  </React.StrictMode>,
  document.getElementById('root'),
);
