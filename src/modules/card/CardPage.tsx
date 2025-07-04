import { useParams } from "react-router-dom";
import CardEdit from "./edit/CardEdit.tsx";
import CardView from "./view/CardView.tsx";
import { CARD_MODE } from "../../router/const.ts";
import { useQuery } from "@apollo/client";
import type { GetCharacterQuery } from "../../api/__generated__/graphql.ts";
import { GET_CHARACTER } from "../../api/queries/card/characterPage.ts";
import PageWrapper from "../../components/PageWrapper/PageWrapper.tsx";
import { useMemo } from "react";

const CardPage = () => {
  const urlParams = useParams();

  const { loading, error, data } = useQuery<GetCharacterQuery>(GET_CHARACTER, {
    variables: {
      id: urlParams.cardId,
    },
  });

  const updatedCharacterData = useMemo(() => {
    if (data?.character === null) {
      return "empty";
    }

    const character = JSON.parse(
      localStorage.getItem(`character:${urlParams.cardId}`),
    );

    if (character) {
      return {
        ...data?.character,
        ...character,
      };
    } else {
      return data?.character;
    }
  }, [data]);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  if (urlParams.cardMode === CARD_MODE.EDIT) {
    return (
      <PageWrapper title={`${updatedCharacterData.name} card`}>
        <CardEdit defaultData={updatedCharacterData} />
      </PageWrapper>
    );
  }

  if (urlParams.cardMode === CARD_MODE.VIEW) {
    return (
      <PageWrapper title={`${updatedCharacterData.name} card`}>
        <CardView data={updatedCharacterData} />
      </PageWrapper>
    );
  }
};

export default CardPage;
