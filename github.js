class Github {
  constructor() {
    this.client_id = '7e00815d5c78e36371f0';
    this.client_secret = '409306a1e568df267b6d8e18b562356bfda99a45';
  }

  async getUser(user) {
    const profileResponse = await fetch(
      `https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`
    );

    const profile = await profileResponse.json();

    return {
      profile,
    };
  }
}
