import { GenderOptions, StatusOptions } from "./data.ts";
import type { Character } from "../../../api/__generated__/graphql.ts";
import type { OptionType } from "./components/SelectPicker.tsx";

export const convertDataToBackend = (data: {
  name: string;
  species: string;
  status: OptionType;
  gender: OptionType;
}) => ({
  name: data.name,
  species: data.species,
  status: StatusOptions.find((item) => item.value === data.status)?.label,
  gender: GenderOptions.find((item) => item.value === data.gender)?.label,
});

export const convertDataToFrontend = (data: Partial<Character>) => ({
  name: data.name,
  species: data.species,
  status: StatusOptions.find((item) => item.label === data.status)?.value,
  gender: GenderOptions.find((item) => item.label === data.gender)?.value,
  location: +data?.location?.id,
  episode: data?.episode?.map((item) => ({ id: item?.id, label: item?.name })),
});
