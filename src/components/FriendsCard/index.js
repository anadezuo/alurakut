export function FriendsCard({ login, avatar_url, html_url }) {
  return (
    <li key={login}>
      <a href={html_url}>
        <img src={avatar_url} alt={login} />
        <span>{login}</span>
      </a>
    </li>
  );
}