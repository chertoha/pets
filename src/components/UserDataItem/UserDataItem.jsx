import { useState } from 'react';
import { Form, Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { parse, isDate } from 'date-fns';
// import { toast } from 'react-toastify';

import {
  BtnImage,
  BtnImageDis,
  BtnImageDone,
  FieldText,
  StyledBtn,
  StyledInput,
  StyledValue,
  Wrapper,
} from './UserDataItem.styled';

const today = new Date();
const nameSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Too Short!')
    .max(32, 'Too Long!')
    // .matches(/^[a-zA-Z, ]*$/g, 'Only alphabetic characters are allowed')
    .matches(
      /^[a-zA-zа-яіїєА-ЯІЇЄ ,.'-]+$/,
      'Only alphabetic characters are allowed'
    )
    .required('Field is required!'),
});
const emailSchema = yup.object({
  // /^([a-zA-Z0-9]{1}[a-zA-Z0-9_\-.]{1,})@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/
  email: yup
    .string()
    .email('Invalid email: example@mail.com')
    .required('Email is required'),
});
const citySchema = yup.object({
  city: yup
    .string()
    .min(2)
    .max(36)
    .matches(
      // /(\b[a-zA-Z]+(,\s*)\s*[a-zA-Z]+\b)/g,
      /^[a-zA-Zа-яіїєА-ЯІЇЄ ,.'-]+[,][ ][a-zA-Zа-яіїєА-ЯІЇЄ]+$/,
      'Only in format "City, Region"'
    )
    .required('Field is required!'),
});
const phoneSchema = yup.object({
  phone: yup
    .string()
    .min(13, 'Phone should be in format +380671234567')
    .max(13, 'Phone should be in format +380671234567')
    .matches(
      // /^\+[0-9]{3}\d+\d{3}\d{2}\d{2}/,
      /^\+380\d{9}$/,
      'Phone should be in format +380671234567'
    ),
});
const birthdaySchema = yup.object({
  birthday: yup
    .date()
    .test('len', 'Must be exactly DD.MM.YYYY', (value, { originalValue }) => {
      if (originalValue) {
        return originalValue.length === 10;
      }
    })
    .transform(function (_, originalValue) {
      const parsedDate = isDate(originalValue)
        ? originalValue
        : parse(originalValue, 'dd.MM.yyyy', new Date());

      return parsedDate;
    })
    .typeError('Please enter a valid date: dd.MM.yyyy')
    .required()
    .min('01.01.1950', 'Date is too early')
    .max(today),
});
const capitalize = s => (s && s[0].toUpperCase() + s.slice(1)) || '';

export default function UserDataItem({
  field,
  initValue,
  setIsDisabledBtn,
  isDisabledBtn,
  setUser,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const addSchema = f => {
    switch (f) {
      case 'name':
        return nameSchema;
      case 'email':
        return emailSchema;

      case 'city':
        return citySchema;

      case 'birthday':
        return birthdaySchema;

      case 'phone':
        return phoneSchema;

      default:
        return nameSchema;
    }
  };
  return (
    <Formik
      validationSchema={addSchema(field)}
      initialValues={initValue}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={values => {
        if (Object.keys(values)[0] === 'birthday') {
          setUser({ birthday: parseDateToISO(values.birthday) });
          setIsEdit(false);
          setIsDisabledBtn(false);
          return;
        }
        if (Object.keys(values)[0] === 'city') {
          setUser({ city: values.city });
          setIsEdit(false);
          setIsDisabledBtn(false);
          return;
        }

        setUser(values);
        setIsEdit(false);
        setIsDisabledBtn(false);
      }}
    >
      {({ values, handleSubmit, errors, touched }) => (
        <Form>
          {/* <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
          > */}
          <Wrapper>
            <FieldText>{capitalize(field)}:</FieldText>
            {isEdit ? (
              <StyledInput autoComplete="off" name={field} />
            ) : (
              <StyledValue>{values[field]}</StyledValue>
            )}

            {!isEdit && !isDisabledBtn && (
              <StyledBtn
                type="button"
                onClick={() => {
                  setIsEdit(true);
                  setIsDisabledBtn(true);
                }}
              >
                <BtnImage />
              </StyledBtn>
            )}
            {isDisabledBtn && !isEdit && (
              <StyledBtn type="button" disabled isDisabled>
                <BtnImageDis />
              </StyledBtn>
            )}
            {isEdit && (
              <StyledBtn type="submit" onClick={handleSubmit}>
                <BtnImageDone />
              </StyledBtn>
            )}
          </Wrapper>
          <ErrorMessage
            name={field}
            render={msg => (
              <div
                style={{
                  color: 'red',
                  fontSize: '.6rem',
                  position: 'relative',
                  maxWidth: '55%',
                  marginBottom: '8px',
                  marginLeft: 'auto',
                  marginRight: '32px',
                  height: '20px',
                }}
              >
                {msg}
                {/* {toast.error(msg, { autoClose: 3000 })} */}
              </div>
            )}
          />
          {/* </div> */}
        </Form>
      )}
    </Formik>
  );
}

// export default UserDataItem;

function parseDateToISO(str) {
  if (str === '00.00.0000') {
    return null;
  }
  const dateParts = str.split('.');
  const formattedDate = new Date(
    +dateParts[2],
    +dateParts[1] - 1,
    +dateParts[0]
  );

  return formattedDate.toISOString();
}
