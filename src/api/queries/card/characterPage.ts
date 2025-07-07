import { gql } from '@apollo/client';

export const GET_CHARACTER = gql(`
    query GetCharacter($id: ID!) {
      character(id: $id) {
        id
        name
        species
        status
        gender
        image
        location {
          id
          name
        }
        episode {
          id
          name
        }
      }
    }
`);
