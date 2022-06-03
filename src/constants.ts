/**
 * The limits that the Notion API uses for property values.
 * @see https://developers.notion.com/reference/request-limits#limits-for-property-values
 */
export const LIMITS = {
  /** @see https://developers.notion.com/reference/request-limits#size-limits */
  PAYLOAD_BLOCKS: 1000,

  RICH_TEXT_ARRAYS: 100,
  RICH_TEXT: {
    TEXT_CONTENT: 2000,
    LINK_URL: 1000,
    EQUATION_EXPRESSION: 1000,
  },
  URL: 1000,
  EMAIL: 200,
  PHONE: 200,
  MULTI_SELECT: 100,
  RELATION: 100,
  PEOPLE: 100,
};
