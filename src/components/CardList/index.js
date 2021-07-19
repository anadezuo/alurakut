import { Card } from "../Card";
import { ProfileRelationsBoxWrapper } from "../ProfileRelations";

export function CardList({ cardList, title, quantity }) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {" "}
        {title} ({cardList.length}){" "}
      </h2>
      <ul>
        {cardList.map((card) => {
            return (
              <Card
                key={card.id}
                id={card.id}
                name={card.name}
                image={card.image}
                url={card.url}
              />
            );
          })
          .slice(0, quantity)}
      </ul>
      <hr />
      <p className="boxLink"> Ver todos</p>
    </ProfileRelationsBoxWrapper>
  );
}
