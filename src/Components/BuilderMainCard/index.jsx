import React, { useState } from 'react';
import './style.css';
import makeRequest from '../../utils/requests';
import ls from 'local-storage';
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

import PropTypes from 'prop-types';

const BuilderMainCard = ({
  field,
  schemaId,
  recordsLength,
  index,
  fields,
  setFields,
  fieldTypes,
  setFieldTypes,
}) => {
  const [fieldType, setFieldType] = useState(field.fieldType);
  const [fieldName, setFieldName] = useState(field.fieldName);
  const handleEdit = async () => {
    console.log(
      'Handle edit called',
      field.fieldType,
      fieldType,
      field.fieldName,
      fieldName,
    );
    if (fieldType === field.fieldType && fieldName === field.fieldName) return;
    if (fieldType !== field.fieldType && fieldName !== field.fieldName) {
      alert('Can not edit both field name and field type at the same time');
    }
    if (fieldType !== field.fieldType && fieldName === field.fieldName) {
      console.log('edit field type');
      try {
        let reqBody = {};
        reqBody[field.fieldName] = fieldType;
        let apiResponse = await makeRequest(
          EDIT_SCHEMA_FIELD_TYPE_METHOD,
          EDIT_SCHEMA_FIELD_TYPE_API(schemaId),
          reqBody,
          {
            authorization: `${ls.get('accessToken')}`,
          },
        );
        if (apiResponse.data[0] === 1) {
          //   field.fieldType = fieldType; update to parent state
          let fieldTy = [...fieldTypes];
          fieldTy[index] = fieldType;
          setFieldTypes(fieldTy);
        }
        console.log(apiResponse);
      } catch (error) {
        console.log(error);
        alert('API error: check logs to debug');
      }
    }
    if (fieldType === field.fieldType && fieldName !== field.fieldName) {
      // edit field name
      console.log('edit field name');
      try {
        // can not be edited if records are present
        if (recordsLength > 0) {
          alert(
            'Can not edit field name if records are present, delete them first',
          );
          return;
        }
        let reqBody = {
          oldName: field.fieldName,
          newName: fieldName,
        };
        let apiResponse = await makeRequest(
          EDIT_SCHEMA_FIELD_NAME_METHOD,
          EDIT_SCHEMA_FIELD_NAME_API(schemaId),
          reqBody,
          {
            authorization: `${ls.get('accessToken')}`,
          },
        );
        if (apiResponse.data[0] === 1) {
          //   field.fieldName = fieldName;
          let fieldN = [...fields];
          fieldN[index] = fieldName;
          setFields(fieldN);
        }
        console.log(apiResponse);
      } catch (error) {
        console.log(error);
        alert('API error: check logs to debug');
      }
    }
  };

  const handleDelete = async () => {
    try {
      let reqBody = {
        oldName: field.fieldName,
      };
      let apiResponse = await makeRequest(
        EDIT_SCHEMA_FIELD_NAME_METHOD,
        EDIT_SCHEMA_FIELD_NAME_API(schemaId),
        reqBody,
        {
          authorization: `${ls.get('accessToken')}`,
        },
      );
      if (apiResponse.data[0] === 1) {
        //   field.fieldName = fieldName;
        let fieldN = [...fields];
        fieldN.splice(index, 1);
        setFields(fieldN);
      }
      console.log(apiResponse);
    } catch (error) {
      console.log(error);
      alert('API error: check logs to debug');
    }
  };
  return (
    <div className="builder-main-card">
      <div className="builder-main-card-left">
        {/* img */}
        <input
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
        />
      </div>

      <div className="builder-main-card-center">
        <input
          value={fieldType}
          onChange={(e) => setFieldType(e.target.value)}
        />
      </div>

      <div className="builder-main-card-right">
        <button onClick={handleEdit}>edit</button>
        <button onClick={handleDelete}>delete</button>
      </div>
    </div>
  );
};

BuilderMainCard.propTypes = {
  index: PropTypes.number.isRequired,
  field: PropTypes.object.isRequired,
  schemaId: PropTypes.string.isRequired,
  recordsLength: PropTypes.number.isRequired,
  fields: PropTypes.array.isRequired,
  setFields: PropTypes.func.isRequired,
  fieldTypes: PropTypes.array.isRequired,
  setFieldTypes: PropTypes.func.isRequired,
};

export default BuilderMainCard;
