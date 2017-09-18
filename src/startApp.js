import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import registerServiceWorker from './registerServiceWorker';

import Root from './components/Root';

export function startApp(config) {
  config.finalize();
  console.debug("Starting app.", config);

  ReactDOM.render(<Root config={config} />, document.getElementById('root'));
  registerServiceWorker();
}
