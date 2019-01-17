$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $(`form#signUp`);
  const accountTypeInput = $(`select#accountType`);
  const firstNameInput = $(`input#firstName`);
  const lastNameInput = $(`input#lastName`);
  const companyNameInput = $(`input#companyName`);
  const emailInput = $(`input#email`);
  const passwordInput = $(`input#password`);
  const passwordConfirmInput = $(`input#passwordConfirm`);

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on(`submit`, event => {
    event.preventDefault();
    const userData = {
      accountType: accountTypeInput.val(),
      firstName: firstNameInput.val().trim(),
      lastName: lastNameInput.val().trim(),
      companyName: companyNameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      passwordConfirm: passwordConfirmInput.val().trim()
    };

    if (
      !userData.accountType ||
      !userData.firstName ||
      !userData.lastName ||
      !userData.email ||
      !userData.password
    ) {
      return;
    }

    if (password === passwordConfirm) {
      return;
    }

    if (userData.accountType === `sponsor` && !userData.companyName) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(
      userData.accountType,
      userData.firstName,
      userData.lastName,
      userData.companyName,
      userData.email,
      userData.password
    );
    accountTypeInput.val(``);
    firstNameInput.val(``);
    lastNameInput.val(``);
    companyNameInput.val(``);
    emailInput.val(``);
    passwordInput.val(``);
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  const signUpUser = (
    accountType,
    firstName,
    lastName,
    companyName,
    email,
    password
  ) => {
    $.post(`/api/signup`, {
      accountType: accountType,
      firstName: firstName,
      lastName: lastName,
      companyName: companyName,
      email: email,
      password: password
    })
      .then(data => {

        if (accountType === `player`) {
          window.location.replace(`/createplayerprofile`);
        }

        if (accountType === `sponsor`) {
          window.location.replace(`/sponsorhome`);
        }
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  };

  const handleLoginErr = err => {
    $(`#alert .msg`).text(err.responseJSON);
    $(`#alert`).fadeIn(500);
  };
});
