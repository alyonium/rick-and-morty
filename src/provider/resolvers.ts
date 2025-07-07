import { ApolloCache, gql } from "@apollo/client";
import type { UpdatedCharacterType } from "modules/card/edit/convertData.ts";
import type { NormalizedCacheObject } from "@apollo/client";

export const resolvers = {
  Mutation: {
    updateCharacterLocal: (
      _: unknown,
      { id, updatedData }: { id: number; updatedData: UpdatedCharacterType },
      { cache }: { cache: ApolloCache<NormalizedCacheObject> },
    ) => {
      const fragment = gql(`
            fragment CharacterFields on Character {
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

      if (!existingCharacter) {
        const updatedCharacter = {
          ...updatedData,
        };

        cache.writeFragment({
          id: characterId,
          fragment,
          data: updatedCharacter,
        });

        return updatedCharacter;
      } else {
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
      }
    },
  },
};
