import React, { useEffect } from "react";
// import { BrowserRouter as Router, withRouter, Route, Link, Switch } from 'react-router-dom';
import { Formik, Form, useField, useFormikContext } from "formik";
import { USERID } from "./App";
import { DATABASE_URL } from "../constants";
import * as Yup from "yup";
import styled from "@emotion/styled";
import "./Styles.css";
//import "./styles-custom.css";

// ref: https://formik.org/docs/tutorial

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" class={props.name} {...field} {...props} />
      {
        props.text ? (
          <span className={props.text}></span>
        ) : null
      }
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <>
      <label className="checkbox">
        <input {...field} {...props} type="checkbox" />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

// Styled components ....
const StyledSelect = styled.select`
  color: var(--blue);
`;

const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: var(--red-600);
  width: 400px;
  margin-top: 0.25rem;
  &:before {
    content: "❌ ";
    font-size: 10px;
  }
  @media (prefers-color-scheme: dark) {
    color: var(--red-300);
  }
`;

const StyledLabel = styled.label`
  margin-top: 1rem;
`;

const post = (
  url,
  messages
) => {
  // POST request using fetch with error handling
  console.log("id" + USERID);
  const requestOptions = {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
      },
      body: JSON.stringify({ messages, USERID }),
  };
  fetch(url, requestOptions)
      .then(async (response) => {
          // check for error response
          if (!response.ok) {
              // get error message from body or default to response status
              const error = response.status;
              return Promise.reject(error);
          }
      })
      .catch((error) => {
          console.error("There was an error!", error);
      });
};

const MySelect = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <StyledSelect {...field} {...props} />
      {meta.touched && meta.error ? (
        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
      ) : null}
    </>
  );
};

export class StartForm extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <div className="centered3">
        <Formik
          initialValues={{
            age: "",
            gender: "",
            height: "",
            weight: "",
          }}
          validationSchema={Yup.object({
            age: Yup.number()
              .integer("Must be an integer")
              .positive("Must be postive")
              .required("Required"),
            gender: Yup.string()
              .oneOf(
                ["male", "female", "unknown"],
                "Invalid option"
              )
              .required("Required"),
            height: Yup.number()
              .positive("Must be postive")
              .required("Required a number"),
            weight: Yup.number()
              .positive("Must be postive")
              .required("Required a number"),
          })}

          onSubmit={async (values) => {
            await sleep(500);
            // alert(JSON.stringify(values, null, 2));
            post(DATABASE_URL, values);
            history.push('/Form2');
          }}
        >
          <Form>
            <MySelect label="Gender" name="gender">
              <option value="">Select an answer</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="unknown">Prefer not to disclose</option>
            </MySelect>
            <MyTextInput
              label="Age"
              name="age"
              type="number"
              placeholder="30"
            />
            <MyTextInput
              label="Height"
              name="height"
              type="number"
              placeholder="150"
              text="height"
            />
            <MyTextInput
              label="Weight"
              name="weight"
              type="number"
              placeholder="65"
              text="weight"
            />
            <div class="centered">
              <button type="submit">Submit</button>
            </div>
          </Form>
        </Formik>
        </div>
      </>
    );
  }
}

export class StartForm2 extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <div className="centered3">
        <Formik
          initialValues={{
            doSmoke: "",
            doHighCholesterol: "",
            doHypertension: "",
            doDiabetes: "",
            acceptedDataCollection: true, // added for our checkbox
          }}
          validationSchema={Yup.object({
            doSmoke: Yup.string()
              .oneOf(
                ["yes", "no", "idk"],
                "Invalid option"
              )
              .required("Required"),
            doHighCholesterol: Yup.string()
              .oneOf(
                ["yes", "no", "idk"],
                "Invalid option"
              )
              .required("Required"),
            doHypertension: Yup.string()
              .oneOf(
                ["yes", "no", "idk"],
                "Invalid option"
              )
              .required("Required"),
            doDiabetes: Yup.string()
              .oneOf(
                ["yes", "no", "idk"],
                "Invalid option"
              )
              .required("Required"),
            acceptedDataCollection: Yup.boolean()
              .required("You have to allow us to use your data!")
              .oneOf([true], 'You have to allow us to use your data!')
          })}

          onSubmit={async (values) => {
            await sleep(500);
            // alert(JSON.stringify(values, null, 2));
            post(DATABASE_URL, values);
            history.push('/Chatbot');
          }}
        >
          <Form>
            <MySelect label="Do you smoke?" name="doSmoke">
              <option value="">Select an answer</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="idk">I don't know</option>
            </MySelect>
            <MySelect label="Do you have high cholesterol?" name="doHighCholesterol">
              <option value="">Select an answer</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="idk">I don't know</option>
            </MySelect>
            <MySelect label="Are you suffering from Hypertension?" name="doHypertension">
              <option value="">Select an answer</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="idk">I don't know</option>
            </MySelect>
            <MySelect label="Do you have Diabetes?" name="doDiabetes">
              <option value="">Select an answer</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="idk">I don't know</option>
            </MySelect>
            <MyCheckbox name="acceptedDataCollection">
              I agree and consent the use of above data.
            </MyCheckbox>
            <div class="centered">
              <button type="submit">Submit</button>
            </div>
          </Form>
        </Formik>
        </div>
      </>
    );
  }
}

// export default withRouter(StartForm);
