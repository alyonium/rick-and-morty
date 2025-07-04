import { gql } from "@apollo/client";

export const resolvers = {
  Mutation: {
    updateCharacterLocal: (_, { id, updatedData }, { cache }) => {
      const fragment = gql(`
            fragment CharacterFields on character {
                id
                name
                species
                status
                gender
                location {
                  id
                  name
                }
                episode {
                  id
                  name
                }
            }`);

      const characterId = `character:${id}`;

      const existingCharacter = cache.readFragment({
        id: characterId,
        fragment,
      });

      const updatedCharacter = {
        ...existingCharacter,
        ...updatedData,
      };

      cache.writeFragment({
        id: characterId,
        fragment,
        data: updatedCharacter,
      });

      return updatedCharacter;
    },
  },
};
