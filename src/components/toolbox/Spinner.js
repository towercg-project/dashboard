import * as React from 'react';
import * as Spinkit from 'better-react-spinkit';

export class Spinner extends React.Component {
  render() {
    return (
      <Spinkit.ChasingDots />
    );
  }
}

export default Spinner;
