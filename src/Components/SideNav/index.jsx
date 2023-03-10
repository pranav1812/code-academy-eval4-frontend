import React from 'react';
import './style.css';

import PropTypes from 'prop-types';

import { useNavigate } from 'react-router-dom';

const SideNav = ({ contentTypeList }) => {
  const navigate = useNavigate();

  return (
    <div className="sidenav">
      <div className="sidenav-logo">
        <h1>CMS+</h1>
      </div>
      <div className="side-nav-main">
        <h2>Content Types</h2>
        <ul>
          {contentTypeList.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                navigate(`/entry/${item.id}`);
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <div
        className="side-nav-bold"
        onClick={() => {
          navigate('/builder');
        }}
      >
        <li>Content Type Builder</li>
      </div>
    </div>
  );
};

SideNav.propTypes = {
  contentTypeList: PropTypes.array.isRequired,
};

export default SideNav;
