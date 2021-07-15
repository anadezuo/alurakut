export function Card({ name, alt, image, url }) {
  return (
    <li>
      <a href={url? url : image}>
        <img src={image} alt={name} />
        <span>{name}</span>
      </a>
    </li>
  );
}