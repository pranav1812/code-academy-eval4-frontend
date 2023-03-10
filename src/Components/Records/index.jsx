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
  CREATE_RECORD as CREATE_RECORD_API,
} from '../../constants/apiEndpoints';
import {
  GET_CONTENT_TYPES as GET_CONTENT_TYPES_METHOD,
  GET_CONTENT_TYPE_BY_ID as GET_CONTENT_TYPE_BY_ID_METHOD,
  POST_CONTENT_TYPE as POST_CONTENT_TYPE_METHOD,
  PUT_CONTENT_TYPE_BY_ID as PUT_CONTENT_TYPE_METHOD,
  EDIT_SCHEMA_FIELD_TYPE as EDIT_SCHEMA_FIELD_TYPE_METHOD,
  EDIT_SCHEMA_FIELD_NAME as EDIT_SCHEMA_FIELD_NAME_METHOD,
  CREATE_RECORD as CREATE_RECORD_METHOD,
} from '../../constants/apiMethods';

import EntryCard from '../EntryCard';

import './style.css';

const AddNewCTModal = ({
  fields,
  fieldTypes,
  open,
  setOpen,
  records,
  setRecords,
  contentTypeId,
}) => {
  const [reqBody, setReqBody] = useState({});
  const handleBlur = (e, field) => {
    setReqBody({ ...reqBody, [field]: e.target.value });
  };
  const handleSubmit = async (e) => {
    // e.preventDefault();
    console.log(reqBody);
    try {
      let apiResponse = await makeRequest(
        CREATE_RECORD_METHOD,
        CREATE_RECORD_API,
        {
          contentTypeId,
          record: {
            data: reqBody,
          },
        },
        {
          authorization: `${ls.get('accessToken')}`,
        },
      );
      setRecords([...records, apiResponse.data]);
    } catch (error) {
      console.log(error);
      return alert('Error while creating new record: check logs to debug');
    }
  };
  return (
    <div className="add-new-ct-modal">
      <form>
        {fields.map((field, index) => (
          <div key={index}>
            <span>{field}</span>
            <br />
            <input
              required
              placeholder={fieldTypes[index]}
              onBlur={(e) => {
                handleBlur(e, field);
              }}
            />
          </div>
        ))}
        <button type="submit" onClick={handleSubmit}>
          Create
        </button>
      </form>
      <button onClick={() => setOpen(!open)}>Close</button>
    </div>
  );
};

AddNewCTModal.propTypes = {
  fields: PropTypes.array,
  fieldTypes: PropTypes.array,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  records: PropTypes.array,
  setRecords: PropTypes.func,
  contentTypeId: PropTypes.string,
};

const Records = () => {
  const { contentTypeId } = useParams();
  const [fields, setFields] = useState([]);
  const [fieldTypes, setFieldTypes] = useState([]);
  const [contentTypeName, setContentTypeName] = useState('');
  const [records, setRecords] = useState([]);
  const [currentTypeName, setCurrentTypeName] = useState('');

  const [addNewCTModal, setAddNewCTModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
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
        setContentTypeName(name);
        const fields = Object.keys(schema.schema);
        const fieldTypes = Object.values(schema.schema);
        setFields(fields);
        setRecords(records);
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
    <div className="records-screen">
      <div className="records-screen-header">
        <h2>{contentTypeName}</h2>
      </div>
      <div className="records-screen-main">
        <div className="records-screen-main-header">
          <h3>{records.length} Entries</h3>
          <button onClick={() => setAddNewCTModal(!addNewCTModal)}>
            Add New Entry
          </button>
        </div>

        {addNewCTModal && (
          <AddNewCTModal
            open={addNewCTModal}
            setOpen={setAddNewCTModal}
            fields={fields}
            fieldTypes={fieldTypes}
            records={records}
            setRecords={setRecords}
            contentTypeId={contentTypeId}
          />
        )}

        <div key={0} className="entry-card">
          {['id', ...fields].map((field, index) => (
            <div key={index} className="entry-card-field">
              <span>{field}</span>
            </div>
          ))}
          <div className="entry-card-actions">
            <span>Acti</span>
            <span>ons</span>
          </div>
        </div>
        <div className="record-list">
          {records.map((record, index) => (
            <EntryCard
              key={index}
              entry={record}
              fields={fields}
              fieldTypes={fieldTypes}
              index={index}
              entries={records}
              setEntries={setRecords}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Records;
