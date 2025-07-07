import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql(`
  query GetCharacters($page: Int!, $name: String) {
      characters(page: $page, filter: { name: $name }) {
          info {
            count
            pages
            next
            prev
          }
          results {
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
          }
      }
  }
`);
