export default class GitHubService 
{
    static async getFollowers(githubUser, quantidade = 0, randomico = false) {
        const url = `https://api.github.com/users/${githubUser}/followers`;
        const params = new URLSearchParams();

        if (quantidade > 0) {
            params.append('qtd', quantidade);
        }

        if (randomico) {
            params.append('random', true);
        }

        const resposta = await fetch(url + "?" + params);
        const followersList = await resposta.json();
        return followersList;
    }

    static async getUsername() {
        const url = `https://api.github.com/users/${githubUser}`;
        const resposta = await fetch(url);
        const username = await resposta.json();
        return username;
    }
}