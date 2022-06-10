import { Authenticator } from "@aws-amplify/ui-react";
import { TextField } from "@aws-amplify/ui-react";

// https://ui.docs.amplify.aws/components/authenticator?platform=react#headers--footers

export function FormFields_FNP() {
  //const { validationErrors } = useAuthenticator();

  return (
    <>
      <Authenticator.ForceNewPassword.FormFields />
      <TextField
        label="Zone Info"
        id="12233"
        placeholder="Zone Info"
        name="gender"
        type="text"
      ></TextField>
    </>
  );
}
