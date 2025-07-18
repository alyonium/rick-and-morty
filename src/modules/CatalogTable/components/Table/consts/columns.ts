import type { SelectedCharacterFields } from 'src/types/types.ts';

type CellType = 'string' | 'array' | 'object';

export type ObjectType = {
  id: string;
  name: string;
};

export type ArrayType = ObjectType[];

type ColumnType = {
  fieldName: string;
  fieldKey: keyof Partial<SelectedCharacterFields>;
  type: CellType;
  overflow?: boolean;
};

export const COLUMNS: ColumnType[] = [
  {
    fieldName: 'Name',
    fieldKey: 'name',
    type: 'string',
  },
  {
    fieldName: 'Species',
    fieldKey: 'species',
    type: 'string',
  },
  {
    fieldName: 'Status',
    fieldKey: 'status',
    type: 'string',
  },
  {
    fieldName: 'Gender',
    fieldKey: 'gender',
    type: 'string',
  },
  {
    fieldName: 'Location',
    fieldKey: 'location',
    type: 'object',
  },
  {
    fieldName: 'Episodes',
    fieldKey: 'episode',
    type: 'array',
    overflow: true,
  },
];
