import React from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import makeRequest from '../../utils/requests';
import ls from 'local-storage';
import {
  GET_CONTENT_TYPES as GET_CONTENT_TYPES_API,
  GET_CONTENT_TYPE_BY_ID as GET_CONTENT_TYPE_BY_ID_API,
  POST_CONTENT_TYPE as POST_CONTENT_TYPE_API,
  PUT_CONTENT_TYPE_BY_ID as PUT_CONTENT_TYPE_API,
  EDIT_SCHEMA_FIELD_TYPE as EDIT_SCHEMA_FIELD_TYPE_API,
  EDIT_SCHEMA_FIELD_NAME as EDIT_SCHEMA_FIELD_NAME_API,
} from '../../constants/apiEndpoints';
import {
  GET_CONTENT_TYPES as GET_CONTENT_TYPES_METHOD,
  GET_CONTENT_TYPE_BY_ID as GET_CONTENT_TYPE_BY_ID_METHOD,
  POST_CONTENT_TYPE as POST_CONTENT_TYPE_METHOD,
  PUT_CONTENT_TYPE_BY_ID as PUT_CONTENT_TYPE_METHOD,
  EDIT_SCHEMA_FIELD_TYPE as EDIT_SCHEMA_FIELD_TYPE_METHOD,
  EDIT_SCHEMA_FIELD_NAME as EDIT_SCHEMA_FIELD_NAME_METHOD,
} from '../../constants/apiMethods';

const BuilderNav = ({ list, setList }) => {
  const navigate = useNavigate();
  const handlePrompt = async () => {
    let newContentTypeName = prompt('Enter New Content Type Name', '');
    if (newContentTypeName === '') return alert('Name can not be empty');
    const reqBody = {
      name: newContentTypeName,
      schema: {
        schema: {},
      },
    };
    let apiResponse = await makeRequest(
      POST_CONTENT_TYPE_METHOD,
      POST_CONTENT_TYPE_API,
      reqBody,
      {
        authorization: `${ls.get('accessToken')}`,
      },
    );
    setList([...list, apiResponse.data]);
  };
  return (
    <div className="builder-navbar">
      <div className="builder-navbar-length">
        <h3>{list.length} Types</h3>
      </div>

      <div className="builder-navbar-add-type">
        <button onClick={handlePrompt}>
          <b>+ Add Type</b>
        </button>
      </div>

      <ul>
        {list.map((item, index) => (
          <li key={index} onClick={() => navigate(`/builder/${item.id}`)}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

BuilderNav.propTypes = {
  list: PropTypes.array.isRequired,
  setList: PropTypes.func.isRequired,
};

export default BuilderNav;
