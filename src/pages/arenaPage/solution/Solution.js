import React from 'react';
import './Solution.css';

function solution() {
  return (
    <div className='solution-body'>
      <div className='solution-header'>SOLUTION</div>
      <div className='solution-content'>
        # Enter your code here. Read input from STDIN. Print output to STDOUT
        import string words = raw_input().split(' ') for i in
        xrange(len(words)): words[i] = string.capitalize(words[i]) print '
        '.join(words)
      </div>
    </div>
  );
}

export default solution;
