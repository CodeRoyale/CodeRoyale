import React, { useState } from 'react';
import './Tabs.css';

const Tabs = ({ children }) => {
  // Check if children passed in props are array or not
  const checkChildren = () => {
    if (Array.isArray(children)) {
      return children[0].props.label;
    } else {
      return children.props.label;
    }
  };

  // Display tabs based on array or not.
  // If only one child passed to component then not array
  const displayTabs = () => {
    if (Array.isArray(children)) {
      return children.map((tab, index) => {
        const label = tab.props.label;
        return (
          <li className={label === activeTab ? 'tab-current' : ''} key={index}>
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
      });
    } else {
      const label = children.props.label;
      return (
        <li className={label === activeTab ? 'tab-current' : ''}>
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
    }
  };

  // Display children based on array or not.
  // If only one child passed to component then not array
  const displayChildren = () => {
    if (Array.isArray(children)) {
      // eslint-disable-next-line array-callback-return
      return children.map((child, index) => {
        if (child.props.label === activeTab) {
          return (
            <div className='tabs-content' key={index}>
              {child.props.children}
            </div>
          );
        }
      });
    } else {
      if (children.props.label === activeTab) {
        return <div className='tabs-content'>{children.props.children}</div>;
      }
    }
  };

  // Always the first child passed in props will be active tab initially
  const [activeTab, setActiveTab] = useState(checkChildren());

  const handleTabChange = (e, newActiveTab) => {
    e.preventDefault();
    setActiveTab(newActiveTab);
  };

  return (
    <div>
      <ul className='tabs'>{displayTabs()}</ul>
      {displayChildren()}
    </div>
  );
};

export default Tabs;
