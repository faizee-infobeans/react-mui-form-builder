
# React MUI Form Builder

Form Builder is a package that simplifies the process of building a React form. It provides an easy way to create different field types by importing a simple React component and passing a specified object. With Form Builder, you can create forms without the hassle of individually coding each field type.

## Installation

In your project's `package.json` file, add the following line in the dependencies:

```bash
"dependencies": {
   "react-mui-form-builder": "git+https://github.com/faizee-infobeans/react-mui-form-builder.git"
}
```

After adding this, run:

```bash
npm install
```


## Usage

Here is a sample JavaScript object:

```javascript
const anyTypeDataObject = {
    fieldName : ["FieldName1"], // Different fields
    fieldType : "text", // text, textarea, select, checkbox, radio
    inputType : "number", // number, alphanumeric(text), email, password etc (only in case of text or textarea)
    labelName : "", // Label of the field
};
```

To use the component, import it as follows:

```jsx
<MUIForm
  data={textTypeDataObject}
  validate={true}
  onFormChange={handleFormData}
  isFormSubmitted={isFormSubmitted}
/>
```

Keep the `validate` prop as true to add validation to your fields, and make sure to use the `onFormChange` and `isFormSubmitted` props as shown above.

Here's a sample code for using the component in your React app:

```jsx
import { useState } from "react";
import { MUIForm } from "react-mui-form-builder";

function TestComponent() {
  const [formData, setFormData] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  function handleFormData(fieldName, value, hasError) {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: { value, hasError },
    }));
  }

  const submitHandler = (event) => {
    event.preventDefault();
    setIsFormSubmitted(true);

    const keys = Object.keys(formData);

    if (keys.length > 0) {
      const isAllValid = Object.values(formData).every(
        (field) => !field.hasError
      );

      if (isAllValid) {
        console.log(formData);
      } else {
        console.log("Some fields have errors. Please correct them.");
      }
    } else {
      console.log("No form data present.");
    }
  };

  const textTypeDataObject = {
    fieldName: ["First Name"], // if fieldType === text then use on element only in array
    fieldType: "text",
    inputType: "text",
    labelName: "", // not required in case of fieldType text
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="app">
        <MUIForm
          data={textTypeDataObject}
          validate={true}
          onFormChange={handleFormData}
          isFormSubmitted={isFormSubmitted}
        />
      </div>
      <button>Submit</button>
    </form>
  );
}

export default TestComponent;
```

### Sample Field Objects

Here are some sample objects for different types of fields that you can use with the Form Builder:

- Radio type:

```javascript
const radioTypeDataObject = {
  fieldName: ["Yes", "No"],
  fieldType: "radio", // not required in case of fieldType radio
  inputType: "",
  labelName: "Accept Terms",
};
```

- Checkbox type:

```javascript
const checkboxTypeDataObject = {
  fieldName: ["Email", "Newsletter"],
  fieldType: "checkbox",
  inputType: "",
  labelName: "Get Updates Via", // not required in case of fieldType checkbox
};
```

- Text type:

```javascript
const textTypeDataObject = {
  fieldName: ["First Name"], // if fieldType === text then use on element only in array
  fieldType: "text",
  inputType: "text",
  labelName: "", // not required in case of fieldType text
};
```

- Number type:

```javascript
const numberTypeDataObject = {
  fieldName: ["Phone"], // if fieldType === text then use on element only in array
  fieldType: "text",
  inputType: "number",
  labelName: "", // not required in case of fieldType text
};
```

- Email type:

```javascript
const emailTypeDataObject = {
  fieldName: ["Email"], // if fieldType === text then use on element only in array
  fieldType: "text",
  inputType: "email",
  labelName: "", // not required in case of fieldType text
};
```

- Password type:

```javascript
const passwordTypeDataObject = {
  fieldName: ["Password"], // if fieldType === text then use on element only in array
  fieldType: "text",
  inputType: "password",
  labelName: "", // not required in case of fieldType text
};
```

- Textarea type:

```javascript
const textareaTypeDataObject = {
  fieldName: ["Remark"], // if fieldType === textarea then use on element only in array
  fieldType: "textarea",
  inputType: "text", // not required in case of fieldType textarea
  labelName: "", // not required in case of fieldType textarea
};
```

- Select type:

```javascript
const selectTypeDataObject = {
  fieldName: ["India", "USA", "UK", "UAE"], // enter multiple elements for options
  fieldType: "select",
  inputType: "", // not required in case of fieldType textarea
  labelName: "Country",
};
```

Feel free to use these sample objects as templates for your specific field requirements.


## License

This project is licensed under the [MIT License](LICENSE).

Make sure to replace the placeholders with the actual content and modify the structure as needed.
