$(document).ready(() => {

  //References to form and inputs
  const editProfileForm = $(`form#editProfile`);
  const aboutInput = $(`textarea#about`);
  const birthdateInput = $(`input#birthdate`);
  const cityInput = $(`input#city`);
  const stateInput = $(`input#state`);
  const favoriteSportInput = $('input#favoriteSport');
  const favoriteTeamInput = $('input#favoriteTeam');
  const facebookURLInput = $(`input#facebookURL`);


  editProfileForm.submit(event => {

    const userProfileData = {
      about: aboutInput.val().trim(),
      birthdate: birthdateInput.val().trim(),
      city: cityInput.val().trim(),
      state: stateInput.val().trim(),
      favoriteSport: favoriteSportInput.val().trim(),
      favoriteTeam: favoriteTeamInput.val().trim(),
      facebookURL: facebookURLInput.val().trim()
    };

    if (!userProfileData.birthdate ||
      userProfileData.birthdate < 10 ||
      !userProfileData.city ||
      !userProfileData.state ||
      userProfileData.state.length > 2 ||
      !userProfileData.favoriteSport ||
      !userProfileData.favoriteTeam) {
      return;
    }

    const createPlayerProfile = (about, birthdate, city, state, favoriteSport, favoriteTeam, facebookURL) => {
      $.post(`/api/createplayerprofile`, {
        about: about,
        birthdate: birthdate,
        city: city,
        state: state,
        favoriteSport: favoriteSport,
        favoriteTeam: favoriteTeam,
        facebookURL: facebookURL
      });

    };

    createPlayerProfile(userProfileData.about,
      userProfileData.birthdate,
      userProfileData.city,
      userProfileData.state,
      userProfileData.favoriteSport,
      userProfileData.favoriteTeam,
      userProfileData.facebookURL);

    aboutInput.val("");
    birthdateInput.val("");
    cityInput.val("");
    stateInput.val("");
    favoriteSportInput.val("");
    favoriteTeamInput.val("");
    facebookURLInput.val("");
  });
});