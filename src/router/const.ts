export const CARD_MODE = {
  EDIT: "edit",
  VIEW: "view",
};

export const ROUTE = {
  CATALOG: "/rick-and-morty/catalog",
  CARD: "/rick-and-morty/card",
  CARD_EDIT: `/card/${CARD_MODE.EDIT}`,
  CARD_VIEW: `/card/${CARD_MODE.VIEW}`,
};
