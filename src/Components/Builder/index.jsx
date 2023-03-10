import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import makeRequest from '../../utils/requests';
import ls from 'local-storage';
import PropTypes from 'prop-types';
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

import BuilderNav from '../BuilderNav';
import BuilderMainCard from '../BuilderMainCard';
import BuilderAddParameterCard from '../BuilderAddParameterCard';
import './style.css';

const Builder = ({ contentTypeList, setContentTypeList }) => {
  const { contentTypeId } = useParams();
  const [fields, setFields] = useState([]);
  const [fieldTypes, setFieldTypes] = useState([]);
  const [contentTypeName, setContentTypeName] = useState('');
  const [schemaId, setSchemaId] = useState('');
  const [recordsLength, setRecordsLength] = useState(0);
  const [currentTypeName, setCurrentTypeName] = useState('');

  const navigate = useNavigate();

  const syncName = async () => {
    if (!currentTypeName === '' || currentTypeName === contentTypeName)
      return alert('New Name can not Same as Old Name');
    try {
      let reqBody = {
        name: currentTypeName,
      };
      let apiResponse = await makeRequest(
        PUT_CONTENT_TYPE_METHOD,
        PUT_CONTENT_TYPE_API(contentTypeId),
        reqBody,
        {
          authorization: `${ls.get('accessToken')}`,
        },
      );
      setContentTypeName(currentTypeName);
      window.location.reload();
      console.log(apiResponse);
    } catch (error) {
      console.log(error);
      return alert(
        'Error while updating content type name: check logs to debug',
      );
    }
  };
  useEffect(() => {
    if (!contentTypeId) {
      return;
    }
    makeRequest(
      GET_CONTENT_TYPE_BY_ID_METHOD,
      GET_CONTENT_TYPE_BY_ID_API(contentTypeId),
      {},
      {
        authorization: `${ls.get('accessToken')}`,
      },
    )
      .then((res) => {
        console.log(res.data);
        let { name, schema, records } = res.data;
        setSchemaId(schema.id);
        setContentTypeName(name);
        setCurrentTypeName(name);
        const fields = Object.keys(schema.schema);
        const fieldTypes = Object.values(schema.schema);
        setFields(fields);
        setRecordsLength(records.length);
        setFieldTypes(fieldTypes);
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 401) {
          return navigate('/auth');
        }
        return alert('Error while fetching content type: check logs to debug');
      });
  }, [contentTypeId]);
  return (
    <div className="builder">
      <BuilderNav list={contentTypeList} setList={setContentTypeList} />
      <div className="builder-main">
        <header className="builder-header">
          {contentTypeId ? (
            <h2>
              <b>{contentTypeName}</b>
            </h2>
          ) : (
            <h2>
              <b>Content Type Builder</b>
            </h2>
          )}
        </header>
        {contentTypeId ? (
          <div className="content-type-types">
            <div className="typeName">
              <input
                type="text"
                value={currentTypeName}
                onChange={(e) => setCurrentTypeName(e.target.value)}
              />
              <button onClick={syncName}>Sync</button>
            </div>

            <span>{fieldTypes.length} fields</span>

            <BuilderAddParameterCard
              key={0}
              schemaId={schemaId}
              fields={fields}
              setFields={setFields}
              fieldTypes={fieldTypes}
              setFieldTypes={setFieldTypes}
            />

            {fields.length
              ? fields.map((field, index) => (
                  <BuilderMainCard
                    index={index}
                    key={index}
                    field={{ fieldName: field, fieldType: fieldTypes[index] }}
                    schemaId={schemaId}
                    recordsLength={recordsLength}
                    fields={fields}
                    setFields={setFields}
                    fieldTypes={fieldTypes}
                    setFieldTypes={setFieldTypes}
                  />
                ))
              : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

Builder.propTypes = {
  contentTypeList: PropTypes.array,
  setContentTypeList: PropTypes.func,
};

export default Builder;
