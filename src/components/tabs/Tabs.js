import React, { useState } from 'react';
import './Tabs.css';

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const handleTabChange = (e, newActiveTab) => {
    e.preventDefault();
    setActiveTab(newActiveTab);
  };

  return (
    <div>
      <ul className='tabs'>
        {children.map((tab, index) => {
          const label = tab.props.label;
          return (
            <li
              className={label === activeTab ? 'tab-current' : ''}
              key={index}
            >
              <div
                className='tab-label'
                onClick={(e) => {
                  handleTabChange(e, label);
                }}
              >
                {label}
              </div>
            </li>
          );
        })}
      </ul>
      {children.map((child, index) => {
        if (child.props.label === activeTab) {
          return (
            <div className='tabs-content' key={index}>
              {child.props.children}
            </div>
          );
        }
      })}
    </div>
  );
};

export default Tabs;
