import type { Character, Characters } from 'api/__generated__/graphql.ts';

export type SelectedCharacterFields = Pick<
  Character,
  'id' | 'name' | 'species' | 'status' | 'episode' | 'gender' | 'location'
>;

export type TableDataType = {
  info: Characters['info'];
  results: SelectedCharacterFields[];
};
