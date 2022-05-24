import {Blocks, RichText} from 'notion-api-types/requests';
import {Block} from 'notion-api-types/requests';

export function paragraph(text: RichText[]): Blocks.Paragraph {
  return {
    type: 'paragraph',
    paragraph: {
      rich_text: text,
    },
  };
}

export function code(
  text: RichText[],
  lang: Blocks.Code['code']['language'] = 'plain text',
  caption: RichText[] = []
): Blocks.Code {
  return {
    type: 'code',
    code: {
      rich_text: text,
      language: lang,
      caption,
    },
  };
}

export function blockquote(text: RichText[]): Blocks.Quote {
  return {
    type: 'quote',
    quote: {
      rich_text: text,
    },
  };
}

export function image(url: string, caption: RichText[] = []): Blocks.Image {
  return {
    type: 'image',
    image: {
      type: 'external',
      caption,
      external: {
        url: url,
      },
    },
  };
}

export function table_of_contents(): Blocks.TableOfContents {
  return {
    type: 'table_of_contents',
    table_of_contents: {},
  };
}

export function headingOne(text: RichText[]): Blocks.Heading1 {
  return {
    type: 'heading_1',
    heading_1: {
      rich_text: text,
    },
  };
}

export function headingTwo(text: RichText[]): Blocks.Heading2 {
  return {
    type: 'heading_2',
    heading_2: {
      rich_text: text,
    },
  };
}

export function headingThree(text: RichText[]): Blocks.Heading3 {
  return {
    type: 'heading_3',
    heading_3: {
      rich_text: text,
    },
  };
}

export function bulletedListItem(
  text: RichText[],
  children: Block[] = []
): Blocks.BulletedListItem {
  return {
    type: 'bulleted_list_item',
    bulleted_list_item: {
      rich_text: text,
      children,
    },
  };
}

export function numberedListItem(
  text: RichText[],
  children: Block[] = []
): Blocks.NumberedListItem {
  return {
    type: 'numbered_list_item',
    numbered_list_item: {
      rich_text: text,
      children,
    },
  };
}

export function toDo(
  checked: boolean,
  text: RichText[],
  children: Block[] = []
): Blocks.ToDo {
  return {
    type: 'to_do',
    to_do: {
      rich_text: text,
      checked: checked,
      children,
    },
  };
}

export function table(
  rows: Blocks.TableRow[],
  tableWidth: number
): Blocks.Table {
  return {
    type: 'table',
    table: {
      table_width: tableWidth,
      has_row_header: true,
      children: rows,
    },
  };
}

export function tableRow(cells: RichText[][] = []): Blocks.TableRow {
  return {
    type: 'table_row',
    table_row: {
      cells: cells.length ? cells : [],
    },
  };
}

export function equation(value: string): Blocks.Equation {
  return {
    type: 'equation',
    equation: {
      expression: value,
    },
  };
}
