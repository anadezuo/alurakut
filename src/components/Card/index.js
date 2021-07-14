export function Card({ name, alt, image, url }) {
  return (
    <li>
      <a href={url}>
        <img src={image} alt={alt} />
        <span>{name}</span>
      </a>
    </li>
  );
}