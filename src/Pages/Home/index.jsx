import React, { useEffect, useState } from 'react';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import './style.css';
import ls from 'local-storage';
import makeRequest from '../../utils/requests';
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
import { SideNav, Builder, EntryScreen } from '../../Components';

const Home = () => {
  const navigate = useNavigate();
  const [contentTypeList, setContentTypeList] = useState([]);
  useEffect(() => {
    let token = ls.get('accessToken');
    if (!token) {
      navigate('/auth');
    }
    makeRequest(
      GET_CONTENT_TYPES_METHOD,
      GET_CONTENT_TYPES_API,
      {},
      {
        authorization: `${token}`,
      },
    )
      .then((response) => {
        console.log(response);
        setContentTypeList(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 401) {
          ls.remove('accessToken');
          navigate('/auth');
        }
        alert('Error while fetching content types: check logs to debug');
      });
  }, []);

  return (
    <div className="home">
      {/* <h1>Home</h1>
      <ul>
        <li onClick={() => navigate('/home')}>Home</li>
        <li onClick={() => navigate('/next')}>Next</li>
      </ul>
      */}
      <div className="home-sidebar">
        {/* <div className="home__sidenav"> */}
        <SideNav contentTypeList={contentTypeList} />
        {/* </div> */}
      </div>
      <div className="home-main">
        <div className="home-main-container">
          <Routes>
            <Route
              path="/builder/:contentTypeId"
              element={
                <Builder
                  contentTypeList={contentTypeList}
                  setContentTypeList={setContentTypeList}
                />
              }
            />
            <Route
              path="/builder"
              element={
                <Builder
                  contentTypeList={contentTypeList}
                  setContentTypeList={setContentTypeList}
                />
              }
            />
            <Route path="/entry/:contentTypeId" element={<EntryScreen />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Home;
