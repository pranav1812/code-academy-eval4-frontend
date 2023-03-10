import React, { useState } from 'react';
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
  DELETE_RECORD as DELETE_RECORD_API,
  UPDATE_RECORD as UPDATE_RECORD_API,
} from '../../constants/apiEndpoints';
import {
  GET_CONTENT_TYPES as GET_CONTENT_TYPES_METHOD,
  GET_CONTENT_TYPE_BY_ID as GET_CONTENT_TYPE_BY_ID_METHOD,
  POST_CONTENT_TYPE as POST_CONTENT_TYPE_METHOD,
  PUT_CONTENT_TYPE_BY_ID as PUT_CONTENT_TYPE_METHOD,
  EDIT_SCHEMA_FIELD_TYPE as EDIT_SCHEMA_FIELD_TYPE_METHOD,
  EDIT_SCHEMA_FIELD_NAME as EDIT_SCHEMA_FIELD_NAME_METHOD,
  DELETE_RECORD as DELETE_RECORD_METHOD,
  UPDATE_RECORD as UPDATE_RECORD_METHOD,
} from '../../constants/apiMethods';

import './style.css';

const EditRecordModal = ({
  fields,
  fieldTypes,
  open,
  setOpen,
  records,
  setRecords,
  entry,
  index,
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
        UPDATE_RECORD_METHOD,
        UPDATE_RECORD_API(entry.id),
        {
          ...reqBody,
        },
        {
          authorization: `${ls.get('accessToken')}`,
        },
      );
      let newRecords = [...records];
      newRecords[index] = apiResponse.data;
      setRecords(newRecords);
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
            <h3>{field}</h3>
            <input
              required
              placeholder={fieldTypes[index]}
              defaultValue={entry.data[field]}
              onBlur={(e) => {
                handleBlur(e, field);
              }}
            />
          </div>
        ))}
        <button type="submit" onClick={handleSubmit}>
          Save
        </button>
      </form>
      <button onClick={() => setOpen(!open)}>Close</button>
    </div>
  );
};

EditRecordModal.propTypes = {
  fields: PropTypes.array,
  fieldTypes: PropTypes.array,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  records: PropTypes.array,
  setRecords: PropTypes.func,
  entry: PropTypes.object,
  index: PropTypes.number,
};

const EntryCard = ({
  entry,
  fields,
  fieldTypes,
  entries,
  setEntries,
  index,
}) => {
  const [open, setOpen] = useState(false);
  const handleDelete = async () => {
    try {
      await makeRequest(
        DELETE_RECORD_METHOD,
        DELETE_RECORD_API(entry.id),
        {},
        {
          authorization: `${ls.get('accessToken')}`,
        },
      ); // 204 response
      let newEntries = [...entries];
      newEntries.splice(index, 1);
      setEntries(newEntries);
    } catch (error) {
      console.log(error);
      return alert('Error deleting record: check console for details');
    }
  };
  return (
    <div className="entry-card">
      <div key={index} className="entry-card-field">
        <span>{index + 1}</span>
      </div>
      {fields.map((field, index) => (
        <div key={index} className="entry-card-field">
          <span>{entry.data[field] || 'Undefined'}</span>
        </div>
      ))}
      <div className="entry-card-actions">
        <button onClick={() => setOpen(!open)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
      {open && (
        <EditRecordModal
          fields={fields}
          fieldTypes={fieldTypes}
          open={open}
          setOpen={setOpen}
          records={entries}
          setRecords={setEntries}
          entry={entry}
          index={index}
        />
      )}
    </div>
  );
};

EntryCard.propTypes = {
  entry: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired,
  fieldTypes: PropTypes.array.isRequired,
  entries: PropTypes.array.isRequired,
  setEntries: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default EntryCard;
