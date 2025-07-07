import { GenderOptions, StatusOptions } from "./data.ts";
import type { Character } from "../../../api/__generated__/graphql.ts";

export type UpdatedCharacterType = {
  name: string;
  species: string;
  status: number;
  gender: number;
};

export const convertDataToBackend = (
  data: UpdatedCharacterType,
): Partial<Character> => ({
  name: data.name,
  species: data.species,
  status: StatusOptions.find((item) => item.value === data.status)?.label,
  gender: GenderOptions.find((item) => item.value === data.gender)?.label,
});

export const convertDataToFrontend = (
  data: Partial<Character>,
): UpdatedCharacterType & {
  location: number | undefined;
  episode: { id: string; label: string }[] | undefined;
} => ({
  name: data.name as string,
  species: data.species as string,
  status: StatusOptions.find((item) => item.label === data.status)
    ?.value as number,
  gender: GenderOptions.find((item) => item.label === data.gender)
    ?.value as number,
  location: data?.location?.id ? +data?.location?.id : undefined,
  episode: data?.episode?.map((item) => ({ id: item?.id, label: item?.name })),
});
