"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _material = require("@mui/material");
var _useInput2 = _interopRequireDefault(require("./use-input"));
var _FormHelperText = _interopRequireDefault(require("@mui/material/FormHelperText"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var MUIForm = function MUIForm(_ref) {
  var data = _ref.data,
    validate = _ref.validate,
    onFormChange = _ref.onFormChange,
    isFormSubmitted = _ref.isFormSubmitted;
  var fieldName = data.fieldName,
    fieldType = data.fieldType,
    inputType = data.inputType,
    labelName = data.labelName;
  var isFieldValid = function isFieldValid(value) {
    if (!validate) {
      return true;
    }
    switch (fieldType) {
      case "text":
      case "textarea":
        return value.trim().length >= 8;
      case "email":
        return /^[a-zA-Z0-9._%+-]+@[a-zAZ.-]+\.[a-zA-Z]{2,}$/.test(value.trim());
      case "password":
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
      case "select":
      case "checkbox":
      case "radio":
        return value.trim().length > 0;
      default:
        return false;
    }
  };
  var _useInput = (0, _useInput2["default"])(isFieldValid, onFormChange, fieldType === "checkbox" || fieldType === "radio" || fieldType === "select" ? labelName : fieldName[0], isFormSubmitted),
    enteredValue = _useInput.value,
    inputHasError = _useInput.hasError,
    valueChangeHandler = _useInput.valueChangeHandler,
    inputBlurHandler = _useInput.inputBlurHandler;
  var label = fieldType === "text" || fieldType === "textarea" ? fieldName[0] : labelName;
  var inputField;
  if (fieldType === "checkbox") {
    inputField = /*#__PURE__*/_react["default"].createElement(_material.FormControl, {
      component: "fieldset",
      error: inputHasError,
      className: "form-control",
      helperText: inputHasError ? "".concat(label, " must not be empty or invalid.") : ""
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "checkbox-group"
    }, fieldName.map(function (field, index) {
      return /*#__PURE__*/_react["default"].createElement(_material.FormControlLabel, {
        key: index,
        control: /*#__PURE__*/_react["default"].createElement(_material.Checkbox, {
          onChange: valueChangeHandler,
          value: field
        }),
        label: field
      });
    })), inputHasError && /*#__PURE__*/_react["default"].createElement(_FormHelperText["default"], null, "Select at least one from ", label));
  } else if (fieldType === "radio") {
    inputField = /*#__PURE__*/_react["default"].createElement(_material.FormControl, {
      component: "fieldset",
      error: inputHasError,
      className: "form-control",
      helperText: inputHasError ? "".concat(label, " must not be empty or invalid.") : ""
    }, /*#__PURE__*/_react["default"].createElement(_material.RadioGroup, {
      "aria-label": labelName,
      name: labelName,
      value: enteredValue,
      onChange: valueChangeHandler
    }, fieldName.map(function (field, index) {
      return /*#__PURE__*/_react["default"].createElement(_material.FormControlLabel, {
        key: index,
        value: field,
        control: /*#__PURE__*/_react["default"].createElement(_material.Radio, null),
        label: field
      });
    })), inputHasError && /*#__PURE__*/_react["default"].createElement(_FormHelperText["default"], null, "Select any one from ", label));
  } else if (fieldType === "select") {
    inputField = /*#__PURE__*/_react["default"].createElement(_material.FormControl, {
      sx: {
        minWidth: 235
      },
      error: inputHasError,
      className: "form-control"
    }, /*#__PURE__*/_react["default"].createElement(_material.TextField, {
      size: "lg",
      id: fieldName,
      label: label,
      select: true,
      onChange: valueChangeHandler,
      onBlur: inputBlurHandler,
      value: enteredValue,
      error: inputHasError,
      helperText: inputHasError ? "".concat(label, " must not be empty or invalid.") : ""
    }, /*#__PURE__*/_react["default"].createElement(_material.MenuItem, {
      value: "",
      disabled: true
    }, "Choose an option"), fieldName.map(function (field, index) {
      return /*#__PURE__*/_react["default"].createElement(_material.MenuItem, {
        key: index,
        value: field
      }, field);
    })));
  } else {
    inputField = /*#__PURE__*/_react["default"].createElement(_material.FormControl, {
      error: inputHasError,
      className: "form-control"
    }, fieldType === "textarea" ? /*#__PURE__*/_react["default"].createElement(_material.TextField, {
      multiline: true,
      rows: 3,
      id: "outlined-multiline-static",
      label: label
      // placeholder={label}
      ,
      onChange: valueChangeHandler,
      onBlur: inputBlurHandler,
      value: enteredValue,
      error: inputHasError,
      helperText: inputHasError ? "".concat(label, " must not be empty or invalid.") : ""
    }) : /*#__PURE__*/_react["default"].createElement(_material.TextField, {
      type: inputType,
      id: fieldName,
      label: label,
      onChange: valueChangeHandler,
      onBlur: inputBlurHandler,
      value: enteredValue,
      error: inputHasError,
      helperText: inputHasError ? "".concat(label, " must not be empty or invalid.") : ""
    }));
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "control-group ".concat(fieldType === "checkbox" || fieldType === "radio" ? "different-type-group" : "")
  }, (fieldType === "checkbox" || fieldType === "radio") && /*#__PURE__*/_react["default"].createElement(_material.FormLabel, {
    className: "different-label-group",
    htmlFor: labelName
  }, labelName), inputField);
};
var _default = exports["default"] = MUIForm;