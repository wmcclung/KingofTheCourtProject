$(document).ready(() => {
  // Getting references to our form and inputs
  const signinForm = $(`form#signIn`);
  const emailInput = $(`input#email`);
  const passwordInput = $(`input#password`);

  // When the form is submitted, we validate there's an email and password entered
  signinForm.on(`submit`, event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    signinUser(userData.email, userData.password);
    emailInput.val(``);
    passwordInput.val(``);
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  const signinUser = (email, password) => {
    $.post(`/api/signin`, {
      email: email,
      password: password
    })
      .then(data => {
        //if login is successful will send on home route which will proceed further based off of account type
        window.location.replace('/home');

        // If there's an error, log the error
      })
      .catch(function (err) {
        console.log(err);
      });
  };
});
