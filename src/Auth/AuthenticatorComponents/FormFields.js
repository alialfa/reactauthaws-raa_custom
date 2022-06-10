import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { CheckboxField, TextField, SelectField } from "@aws-amplify/ui-react";

// https://ui.docs.amplify.aws/components/authenticator?platform=react#headers--footers

export function FormFields() {
  const { validationErrors } = useAuthenticator();
  //console.log(validationErrors);
  return (
    <>
      {/* Re-use default `Authenticator.SignUp.FormFields` */}
      <Authenticator.SignUp.FormFields />
      {/* Enter APP-SPECIFIC STANDARD ATTRIBUTES here e.g. address, gender, birthdate` */}
      {/* optional standard attribute  */}
      <TextField name="nickname" label="Nickname" placeholder="J" type="text" />
      {/* required standard attribute based on backend config */}
      <SelectField name="gender" label="Gender" placeholder="Select gender">
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </SelectField>

      {/* Enter CUSTOM ATTRIBUTES here` */}
      {/* custom attribute required via validation    */}
      <SelectField
        label="Category"
        id="category"
        //labelHidden
        errorMessage={validationErrors["custom:category"]} // errorMessage="This is a required field."
        hasError={!!validationErrors["custom:category"]} // hasError={false}
        name="custom:category"
        descriptiveText="What's your designation?"
        placeholder="Please select a role"
      >
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
        <option value="driver">Driver</option>
      </SelectField>
      <TextField
        isRequired={true}
        name="custom:schoolid"
        label="School ID"
        placeholder="ID"
        type="text"
      />
      {/* Append & require Terms & Conditions field to sign up  */}
      <CheckboxField
        errorMessage={validationErrors.acknowledgement}
        hasError={!!validationErrors.acknowledgement}
        name="acknowledgement"
        value="yes"
        label="I agree with the Terms & Conditions"
      />
    </>
  );
}
