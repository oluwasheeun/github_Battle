class ProfileUI {
  constructor() {
    this.profile = document.getElementById('profiles');
  }

  showProfiles(user1, user2) {
    this.profile.innerHTML = `
    <h1 class="lead">Confirm players</h1>
        <div class="profiles-container">
          <div id="p-one" class="profile">
            <p class="lead-2">Player 1</p>
            <div class="profile-box">
              <ul class="list-group">
                <li class="list-group-item">
                  <img
                    class="profile-image"
                    src="${user1.avatar_url}"
                  />
                </li>
                <li class="list-group-item">Username: ${user1.login}</li>
                <li class="list-group-item">Followers: ${user1.followers}</li>
                <li class="list-group-item">Following: ${user1.following}</li>
                <li class="list-group-item">Public Repos: ${
                  user1.public_repos
                }</li>
                <li class="list-group-item">Public Gists: ${
                  user1.public_gists
                }</li>
                <li class="list-group-item">Member Since: ${user1.created_at.slice(
                  0,
                  10
                )}</li>
              </ul>
            </div>
          </div>
          <div id="p-two" class="profile">
            <p class="lead-2">Player 2</p>
            <div class="profile-box">
              <ul class="list-group">
                <li class="list-group-item">
                  <img
                    class="profile-image"
                    src="${user2.avatar_url}"
                  />
                </li>
                <li class="list-group-item">Username: ${user2.login}</li>
                <li class="list-group-item">Followers: ${user2.followers}</li>
                <li class="list-group-item">Following: ${user2.following}</li>
                <li class="list-group-item">Public Repos: ${
                  user2.public_repos
                }</li>
                <li class="list-group-item">Public Gists: ${
                  user2.public_gists
                }</li>
                <li class="list-group-item">Member Since: ${user2.created_at.slice(
                  0,
                  10
                )}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="battle">
          <button type="button" class="btn btn-green btn-2">
            Initiate Battle
          </button>
        </div>
        <div class="resetGame">
          <button type="button" class="btn btn-blue">
            Reselect Players
          </button>
        </div>
    `;
  }

  displayResult(user1, user2, score1, score2) {
    this.profile.innerHTML = `
    <h1 class="lead">Result</h1>
        <div class="profiles-container">
          <div id="p-one" class="profile">
            <p class="lead-2 winner">Winner</p>
            <div class="profile-box">
              <ul class="list-group">
                <li class="list-group-item score"> <h3> Score: ${score1}
                </h3></li>
                <li class="list-group-item">
                  <img
                    class="profile-image"
                    src="${user1.avatar_url}"
                  />
                </li>
                <li class="list-group-item">Username: ${user1.login}</li>
                <li class="list-group-item">Followers: ${user1.followers}</li>
                <li class="list-group-item">Following: ${user1.following}</li>
                <li class="list-group-item">Public Repos: ${
                  user1.public_repos
                }</li>
                <li class="list-group-item">Public Gists: ${
                  user1.public_gists
                }</li>
                <li class="list-group-item">Member Since: ${user1.created_at.slice(
                  0,
                  10
                )}</li>
              </ul>
            </div>
          </div>
          <div id="p-two" class="profile">
            <p class="lead-2 loser">Loser</p>
            <div class="profile-box">
              <ul class="list-group">
              <li class="list-group-item score"> <h3> Score: ${score2}
                </h3></li>
                <li class="list-group-item">
                  <img
                    class="profile-image"
                    src="${user2.avatar_url}"
                  />
                </li>
                <li class="list-group-item">Username: ${user2.login}</li>
                <li class="list-group-item">Followers: ${user2.followers}</li>
                <li class="list-group-item">Following: ${user2.following}</li>
                <li class="list-group-item">Public Repos: ${
                  user2.public_repos
                }</li>
                <li class="list-group-item">Public Gists: ${
                  user2.public_gists
                }</li>
                <li class="list-group-item">Member Since: ${user2.created_at.slice(
                  0,
                  10
                )}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="resetGame">
          <button type="button" class="btn btn-green btn-2">
            Start Over
          </button>
        </div>
    `;
  }

  //show alert message
  showEror(msg, className) {
    //clear any remaining alerts
    this.clearAlert();

    //Create div
    const div = document.createElement('div');
    //Add classes
    div.className = className;
    //Add text
    div.appendChild(document.createTextNode(msg));
    //Get parent
    const container = document.querySelector('.container');
    //Get search box
    const search = document.querySelector('#playerOne');
    //Insert alert
    container.insertBefore(div, search);

    //Timeout after 3 sec
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  //clear alert message
  clearAlert() {
    const currentAlert = document.querySelector('.alert');

    if (currentAlert) {
      currentAlert.remove();
    }
  }
  //clear profile
  clearProfile() {
    this.profile.innerHTML = '';
  }

  // Input Field Error
  inputError(input) {
    input.classList.add('invalid-input');
    input.addEventListener('keyup', () => {
      input.classList.remove('invalid-input');
    });
  }
}
