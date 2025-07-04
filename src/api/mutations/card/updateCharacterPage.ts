import { gql } from "@apollo/client";

export const UPDATE_CHARACTER_LOCAL = gql(`
  mutation UpdateCharacterLocal(
    $id: Int!
    $updatedData: Character!
  ) {
    updateCharacterLocal(id: $id, updatedData: $updatedData) @client
  }
`);
