import type { Character } from "../../../api/__generated__/graphql.ts";

type CardViewProps = {
  data: Character;
};

const CardView = ({ data }: CardViewProps) => {
  return <div>{data?.name}</div>;
};

export default CardView;
