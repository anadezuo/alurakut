export default class GitHubService {
  static async getFollowers(githubUser, quantity = 0, random = false) {
    const url = `https://api.github.com/users/${githubUser}/followers`;
    const params = new URLSearchParams();

    if (quantity > 0) {
      params.append("qtd", quantity);
    }

    if (random) {
      params.append("random", true);
    }

    const resposta = await fetch(url + "?" + params);
    const followersGit = await resposta.json();

    let followersList = new Array();
    followersGit.map((follower) => {
      followersList.push({
        id: follower.login,
        name: follower.login,
        alt: `amigo ${follower.login}`,
        image: follower.avatar_url,
        url: follower.html_url,
      });
    });

    return followersList;
  }

  static async getUsername() {
    const url = `https://api.github.com/users/${githubUser}`;
    const resposta = await fetch(url);
    const username = await resposta.json();
    return username;
  }
}
