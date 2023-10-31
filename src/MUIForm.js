import React from "react";
import {
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  MenuItem,
} from "@mui/material";
import useInput from "./use-input";
import FormHelperText from "@mui/material/FormHelperText";

const MUIForm = ({ data, validate, onFormChange, isFormSubmitted }) => {
  const { fieldName, fieldType, inputType, labelName } = data;

  const isFieldValid = (value) => {
    if (!validate) {
      return true;
    }
    switch (fieldType) {
      case "text":
      case "textarea":
        return value.trim().length >= 8;
      case "email":
        return /^[a-zA-Z0-9._%+-]+@[a-zAZ.-]+\.[a-zA-Z]{2,}$/.test(
          value.trim()
        );
      case "password":
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value
        );
      case "select":
      case "checkbox":
      case "radio":
        return value.trim().length > 0;
      default:
        return false;
    }
  };

  const {
    value: enteredValue,
    hasError: inputHasError,
    valueChangeHandler,
    inputBlurHandler,
  } = useInput(
    isFieldValid,
    onFormChange,
    fieldType === "checkbox" || fieldType === "radio" || fieldType === "select"
      ? labelName
      : fieldName[0],
    isFormSubmitted
  );

  const label =
    fieldType === "text" || fieldType === "textarea" ? fieldName[0] : labelName;

  let inputField;

  if (fieldType === "checkbox") {
    inputField = (
      <FormControl
        component="fieldset"
        error={inputHasError}
        className="form-control"
        helperText={
          inputHasError ? `${label} must not be empty or invalid.` : ""
        }
      >
        <div className="checkbox-group">
          {fieldName.map((field, index) => (
            <FormControlLabel
              key={index}
              control={<Checkbox onChange={valueChangeHandler} value={field} />}
              label={field}
            />
          ))}
        </div>
        {inputHasError && (
          <FormHelperText>Select at least one from {label}</FormHelperText>
        )}
      </FormControl>
    );
  } else if (fieldType === "radio") {
    inputField = (
      <FormControl
        component="fieldset"
        error={inputHasError}
        className="form-control"
        helperText={
          inputHasError ? `${label} must not be empty or invalid.` : ""
        }
      >
        <RadioGroup
          aria-label={labelName}
          name={labelName}
          value={enteredValue}
          onChange={valueChangeHandler}
        >
          {fieldName.map((field, index) => (
            <FormControlLabel
              key={index}
              value={field}
              control={<Radio />}
              label={field}
            />
          ))}
        </RadioGroup>
        {inputHasError && (
          <FormHelperText>Select any one from {label}</FormHelperText>
        )}
      </FormControl>
    );
  } else if (fieldType === "select") {
    inputField = (
      <FormControl
        sx={{ minWidth: 235 }}
        error={inputHasError}
        className="form-control"
      >
        <TextField
          size="lg"
          id={fieldName}
          label={label}
          select
          onChange={valueChangeHandler}
          onBlur={inputBlurHandler}
          value={enteredValue}
          error={inputHasError}
          helperText={
            inputHasError ? `${label} must not be empty or invalid.` : ""
          }
        >
          <MenuItem value="" disabled>
            Choose an option
          </MenuItem>
          {fieldName.map((field, index) => (
            <MenuItem key={index} value={field}>
              {field}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
    );
  } else {
    inputField = (
      <FormControl error={inputHasError} className="form-control">
        {fieldType === "textarea" ? (
          <TextField
            multiline
            rows={3}
            id="outlined-multiline-static"
            label={label}
            // placeholder={label}
            onChange={valueChangeHandler}
            onBlur={inputBlurHandler}
            value={enteredValue}
            error={inputHasError}
            helperText={
              inputHasError ? `${label} must not be empty or invalid.` : ""
            }
          />
        ) : (
          <TextField
            type={inputType}
            id={fieldName}
            label={label}
            onChange={valueChangeHandler}
            onBlur={inputBlurHandler}
            value={enteredValue}
            error={inputHasError}
            helperText={
              inputHasError ? `${label} must not be empty or invalid.` : ""
            }
          />
        )}
      </FormControl>
    );
  }

  return (
    <div
      className={`control-group ${
        fieldType === "checkbox" || fieldType === "radio"
          ? "different-type-group"
          : ""
      }`}
    >
      {(fieldType === "checkbox" || fieldType === "radio") && (
        <FormLabel className="different-label-group" htmlFor={labelName}>
          {labelName}
        </FormLabel>
      )}
      {inputField}
    </div>
  );
};

export default MUIForm;
