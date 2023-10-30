import React, { useState, useEffect } from 'react';

const useInput = (validateValue, onFormChange, fieldName, isFormSubmitted) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    const newValue = event.target.value;
    setEnteredValue(newValue);
    if (onFormChange) {
      onFormChange(fieldName, newValue, hasError);
    }
  };

  useEffect(() => {
    if (isFormSubmitted) {
      setIsTouched(true);
    }
  }, [isFormSubmitted]);

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
