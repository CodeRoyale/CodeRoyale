import React from 'react';
import 'rsuite/lib/styles/index.less';
import { Alert } from 'rsuite';

export default function SpringPopper() {
  return (
    <div>
      <button onClick={() => Alert.error('This is an error message.')}>
        {' '}
        Error{' '}
      </button>
    </div>
  );
}
