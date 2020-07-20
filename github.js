class Github {
  constructor() {
    this.client_id = '7e00815d5c78e36371f0';
    this.client_secret = '409306a1e568df267b6d8e18b562356bfda99a45';
  }

  async getUser(user1, user2) {
    const profileResponseOne = await fetch(
      `https://api.github.com/users/${user1}?client_id=${this.client_id}&client_secret=${this.client_secret}`
    );

    const profileOne = await profileResponseOne.json();

    const profileResponseTwo = await fetch(
      `https://api.github.com/users/${user2}?client_id=${this.client_id}&client_secret=${this.client_secret}`
    );

    const profileTwo = await profileResponseTwo.json();

    return {
      profileOne,
      profileTwo,
    };
  }
}
