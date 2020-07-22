// DOM to html sections
const intro = document.getElementById('intro');
const playerOne = document.getElementById('playerOne');
const playerTwo = document.getElementById('playerTwo');
const playerOneForm = document.forms['player-one'];
const playerTwoForm = document.forms['player-two'];
const inputPlayerOne = playerOneForm.querySelector('#playerOne-Username');
const inputPlayerTwo = playerTwoForm.querySelector('#playerTwo-Username');

//Init Github & ProfileUI Class
const github = new Github();
const profileUI = new ProfileUI();

// Init Usernames obj
const username = {
  playerone: '',
  playertwo: '',
};

//Init player profiles obj
const profiles = {
  playerone: '',
  playertwo: '',
};

const getStarted = document.querySelector('.getStarted');
getStarted.addEventListener('click', () => {
  // Display Player One Input field
  intro.style.display = 'none';
  playerOne.style.display = 'block';

  // Submit Player One Username
  playerOneForm.addEventListener('submit', (e) => {
    e.preventDefault();

    username.playerone = inputPlayerOne.value.trim();

    if (username.playerone === '') {
      profileUI.showEror('Please Enter Valid Username', 'alert alert-danger');
      inputPlayerOne.value = '';
      profileUI.inputError(inputPlayerOne);
    } else {
      // Fetch Player One profile data
      github.getUser(username.playerone).then((data) => {
        if (data.profile.message === 'Not Found') {
          profileUI.showEror('Invalid Input', 'alert alert-danger');
          inputPlayerOne.value = '';
          profileUI.inputError(inputPlayerOne);
        } else {
          profiles.playerone = data.profile;

          // Display Player two input field
          playerOne.style.display = 'none';
          playerTwo.style.display = 'block';

          // Submit Player Two Username
          playerTwoForm.addEventListener('submit', (e) => {
            e.preventDefault();

            username.playertwo = inputPlayerTwo.value.trim();

            if (username.playertwo === '') {
              profileUI.showEror(
                'Please Enter Valid Username',
                'alert alert-danger'
              );
              inputPlayerTwo.value = '';
              profileUI.inputError(inputPlayerTwo);
            } else if (
              username.playerone.toLowerCase() ===
              username.playertwo.toLowerCase()
            ) {
              profileUI.showEror(
                `Player One and Player Two must be different`,
                'alert alert-danger'
              );
              profileUI.inputError(inputPlayerTwo);
            } else {
              // Fetch player two profile data
              github.getUser(username.playertwo).then((data) => {
                if (data.profile.message === 'Not Found') {
                  profileUI.showEror('Invalid Input', 'alert alert-danger');

                  profileUI.inputError(inputPlayerTwo);
                } else {
                  playerTwo.style.display = 'none';

                  //Store to profiles object
                  profiles.playertwo = data.profile;

                  // Confirm Profile
                  profileUI.showProfiles(
                    profiles.playerone,
                    profiles.playertwo
                  );

                  // Battle
                  document
                    .querySelector('.battle')
                    .addEventListener('click', battle);

                  //Reset Game
                  document
                    .querySelector('.resetGame')
                    .addEventListener('click', reset);
                }
              });
            }
          });
        }
      });
    }
  });
});

// Battle
const battle = (e) => {
  e.preventDefault();

  // Player One Score
  const playerOneScore =
    profiles.playerone.followers +
    profiles.playerone.following +
    profiles.playerone.public_repos / 2;

  // Player Two Score
  const playerTwoScore =
    profiles.playertwo.followers +
    profiles.playertwo.following +
    profiles.playertwo.public_repos / 2;

  // Display Result
  playerOneScore > playerTwoScore
    ? profileUI.displayResult(
        profiles.playerone,
        profiles.playertwo,
        playerOneScore,
        playerTwoScore
      )
    : profileUI.displayResult(
        profiles.playertwo,
        profiles.playerone,
        playerTwoScore,
        playerOneScore
      );

  //Start Over
  document.querySelector('.resetGame').addEventListener('click', reset);
};

// Reset
const reset = (e) => {
  e.preventDefault();

  // Reset usernames
  username.playerone = '';
  username.playertwo = '';
  profiles.playerone = '';
  profiles.playertwo = '';

  // Display Player One
  playerOne.style.display = 'block';
  playerOneForm.querySelector('#playerOne-Username').value = '';
  playerTwoForm.querySelector('#playerTwo-Username').value = '';

  profileUI.clearProfile();
};
