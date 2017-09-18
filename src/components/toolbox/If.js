import React from 'react';

import { funcify } from '../../utils';

export class If extends React.Component {
  render() {
    const conditionResult = funcify(this.props.condition);

    if (conditionResult && this.props.then) {
      return funcify(this.props.then, conditionResult);
    }

    if (!conditionResult && this.props.else) {
      return funcify(this.props.else);
    }

    return null;
  }
}

export default If;
