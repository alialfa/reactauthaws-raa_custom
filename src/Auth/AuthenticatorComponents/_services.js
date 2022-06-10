import { Auth } from "aws-amplify";

export const services = {
  async handleSignUp(formData) {
    let { username, password, attributes } = formData;
    // custom username
    username = username.toLowerCase();
    attributes.email = attributes.email.toLowerCase();
    return Auth.signUp({
      username,
      password,
      attributes,
    });
  },

  async validateCustomSignUp(formData) {
    //console.log(formData["custom:category"]);
    //alert(formData["custom:category"]);
    var category = formData["custom:category"];
    console.log("CATEGORY >> ", category);
    if (!formData["custom:category"]) {
      return {
        ["custom:category"]: "Category is a required field.",
      };
    }
    if (!formData.acknowledgement) {
      return {
        acknowledgement: "You must agree to the T&Cs",
      };
    }
  },
};

/*
async validateCustomSignUp(formData) {
  if (!formData.category) {
    return {
      acknowledgement: "The category is a required field.",
    };
  }
},
*/
