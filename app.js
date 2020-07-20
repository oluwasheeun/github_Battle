// DOM to html sections
const intro = document.getElementById('intro');
const playerOne = document.getElementById('playerOne');
const playerTwo = document.getElementById('playerTwo');

//Init Github
const github = new Github();

//Init ProfileUI
const profileUI = new ProfileUI();

const getStarted = document.querySelector('.getStarted');

getStarted.addEventListener('click', () => {
  // Init Usernames obj
  const username = {
    playerone: '',
    playertwo: '',
  };

  intro.style.display = 'none';
  playerOne.style.display = 'block';

  // Player One Form Data
  const playerOneForm = document.forms['player-one'];
  playerOneForm.addEventListener('submit', (e) => {
    e.preventDefault();

    username.playerone = playerOneForm.querySelector(
      '#playerOne-Username'
    ).value;

    playerOne.style.display = 'none';
    playerTwo.style.display = 'block';

    // Player Two Form Data
    const playerTwoForm = document.forms['player-two'];
    playerTwoForm.addEventListener('submit', (e) => {
      e.preventDefault();

      username.playertwo = playerTwoForm.querySelector(
        '#playerTwo-Username'
      ).value;

      playerTwo.style.display = 'none';

      if (username.playerone !== '' && username.playertwo !== '') {
        // Make http call
        github.getUser(username.playerone, username.playertwo).then((data) => {
          if (data.profileOne.message === 'Not Found') {
            //show alert
            profileUI.showEror('User not found', 'alert alert-danger');

            playerOne.style.display = 'block';
            username.playerone = '';
          } else if (data.profileTwo.message === 'Not Found') {
            //show alert
            profileUI.showEror('User not found', 'alert alert-danger');

            playerTwo.style.display = 'block';
            username.playertwo = '';
          } else {
            // Show Profile
            profileUI.showProfiles(data.profileOne, data.profileTwo);

            // Battle
            document.querySelector('.battle').addEventListener('click', (e) => {
              e.preventDefault();

              // Player One Score
              const playerOneScore =
                data.profileOne.followers +
                data.profileOne.following +
                data.profileOne.public_repos / 2;

              // Player Two Score
              const playerTwoScore =
                data.profileTwo.followers +
                data.profileTwo.following +
                data.profileTwo.public_repos / 2;

              // Display Result
              playerOneScore > playerTwoScore
                ? profileUI.displayResult(
                    data.profileOne,
                    data.profileTwo,
                    playerOneScore
                  )
                : profileUI.displayResult(
                    data.profileTwo,
                    data.profileOne,
                    playerTwoScore
                  );

              //Start Over
              document
                .querySelector('.resetGame')
                .addEventListener('click', (e) => {
                  e.preventDefault();

                  // Reset usernames
                  username.playerone = '';
                  username.playertwo = '';

                  // Display Player One
                  playerOne.style.display = 'block';
                  playerOneForm.querySelector('#playerOne-Username').value = '';
                  playerTwoForm.querySelector('#playerTwo-Username').value = '';

                  document.getElementById('profiles').innerHTML = '';
                });
            });

            //Reset Game
            document
              .querySelector('.resetGame')
              .addEventListener('click', (e) => {
                e.preventDefault();

                // Reset usernames
                username.playerone = '';
                username.playertwo = '';

                // Display Player One
                playerOne.style.display = 'block';
                playerOneForm.querySelector('#playerOne-Username').value = '';
                playerTwoForm.querySelector('#playerTwo-Username').value = '';

                document.getElementById('profiles').innerHTML = '';
              });
          }
        });
      }
    });
  });
});
