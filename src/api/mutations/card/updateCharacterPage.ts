import { gql } from '@apollo/client';

export const UPDATE_CHARACTER_LOCAL = gql(`
  mutation UpdateCharacterLocal(
    $id: Int!
    $name: String!
    $status: String!
    $gender: String!
    $species: String!
  ) {
    updateCharacterLocal(id: $id, updatedData: { name: $name, status: $status, gender: $gender, species: $species }) @client
  }
`);
