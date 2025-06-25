import { gql } from "@apollo/client";

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
            type
            gender
            origin {
              id
              name
            }
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
