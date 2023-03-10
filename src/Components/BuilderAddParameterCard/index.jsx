import React, { useState, useEffect } from 'react';
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
} from '../../constants/apiEndpoints';
import {
  GET_CONTENT_TYPES as GET_CONTENT_TYPES_METHOD,
  GET_CONTENT_TYPE_BY_ID as GET_CONTENT_TYPE_BY_ID_METHOD,
  POST_CONTENT_TYPE as POST_CONTENT_TYPE_METHOD,
  PUT_CONTENT_TYPE_BY_ID as PUT_CONTENT_TYPE_METHOD,
  EDIT_SCHEMA_FIELD_TYPE as EDIT_SCHEMA_FIELD_TYPE_METHOD,
  EDIT_SCHEMA_FIELD_NAME as EDIT_SCHEMA_FIELD_NAME_METHOD,
} from '../../constants/apiMethods';

import PropTypes from 'prop-types';

const BuilderAddParameterCard = ({
  schemaId,
  fields,
  setFields,
  fieldTypes,
  setFieldTypes,
}) => {
  const [fieldType, setFieldType] = useState('');
  const [fieldName, setFieldName] = useState('');

  const handleSave = async () => {
    try {
      if (fieldType.trim() === '' || fieldName.trim() === '') {
        return alert('Can not be empty');
      }
      if (fields.includes(fieldName)) {
        return alert('Field already exists');
      }
      let reqBody = {};
      reqBody[fieldName] = fieldType;
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
        let fieldTy = [...fieldTypes, fieldType];
        setFieldTypes(fieldTy);
        let field = [...fields, fieldName];
        setFields(field);
      }
      console.log(apiResponse);
    } catch (error) {
      console.log(error);
      alert('Something went wrong: Cheeck console for more details');
    }
  };

  useEffect(() => {
    setFieldName('');
    setFieldType('');
  }, [fields]);

  return (
    <div className="builder-main-card">
      <div className="builder-main-card-left">
        {/* img */}
        <input
          value={fieldName}
          placeholder="Add Field (Name)"
          onChange={(e) => setFieldName(e.target.value)}
        />
      </div>

      <div className="builder-main-card-center">
        <input
          value={fieldType}
          placeholder="Add Field (Type)"
          onChange={(e) => setFieldType(e.target.value)}
        />
      </div>

      <div className="builder-main-card-right">
        <button onClick={handleSave}>+ Save</button>
      </div>
    </div>
  );
};

BuilderAddParameterCard.propTypes = {
  index: PropTypes.number.isRequired,
  schemaId: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  setFields: PropTypes.func.isRequired,
  fieldTypes: PropTypes.array.isRequired,
  setFieldTypes: PropTypes.func.isRequired,
};

export default BuilderAddParameterCard;
