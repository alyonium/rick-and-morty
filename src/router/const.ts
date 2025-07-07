export const BASE_PATH = '/rick-and-morty';

export const CARD_MODE = {
  EDIT: 'edit',
  VIEW: 'view',
};

export const ROUTE = {
  CATALOG: `${BASE_PATH}/catalog`,
  CARD: `${BASE_PATH}/card`,
  CARD_EDIT: `${BASE_PATH}/card/${CARD_MODE.EDIT}`,
  CARD_VIEW: `${BASE_PATH}/card/${CARD_MODE.VIEW}`,
};
