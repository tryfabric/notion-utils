import {Color} from 'notion-api-types/global';
import {Blocks, Block, RichText} from 'notion-api-types/requests';
import {Blocks as ResponseBlocks} from 'notion-api-types/responses';
import {LIMITS} from './constants';
import {chunkString} from './internal';

export interface RichTextOptions {
  type?: 'text' | 'equation'; // 'mention' is not supported, it's quicker to just write the object
  annotations?: RichText['annotations'];
  url?: string;
}
export function richText(
  content: string,
  options: RichTextOptions = {}
): RichText[] {
  if (options.type === 'equation') {
    return chunkString(content, LIMITS.RICH_TEXT.EQUATION_EXPRESSION).map(
      expression => ({
        type: 'equation',
        annotations: options.annotations,
        equation: {
          expression,
        },
      })
    );
  } else
    return chunkString(content, LIMITS.RICH_TEXT.TEXT_CONTENT).map(str => ({
      type: 'text',
      annotations: options.annotations,
      text: {
        content: str,
        link: options.url
          ? {
              type: 'url',
              url: options.url,
            }
          : undefined,
      },
    }));
}

export function paragraph(
  text: RichText[],
  children?: Block[],
  color?: Color
): Blocks.Paragraph {
  return {
    type: 'paragraph',
    paragraph: {
      rich_text: text,
      children,
      color,
    },
  };
}

export function headingOne(
  text: RichText[],
  children?: Block[],
  color?: Color
): Blocks.Heading1 {
  return {
    type: 'heading_1',
    heading_1: {
      rich_text: text,
      children,
      color,
    },
  };
}

export function headingTwo(
  text: RichText[],
  children?: Block[],
  color?: Color
): Blocks.Heading2 {
  return {
    type: 'heading_2',
    heading_2: {
      rich_text: text,
      children,
      color,
    },
  };
}

export function headingThree(
  text: RichText[],
  children?: Block[],
  color?: Color
): Blocks.Heading3 {
  return {
    type: 'heading_3',
    heading_3: {
      rich_text: text,
      children,
      color,
    },
  };
}

export function callout(
  text: RichText[],
  icon?: Blocks.Callout['callout']['icon'],
  children?: Block[],
  color?: Color
): Blocks.Callout {
  return {
    type: 'callout',
    callout: {
      rich_text: text,
      icon,
      children,
      color,
    },
  };
}

export function quote(
  text: RichText[],
  children?: Block[],
  color?: Color
): Blocks.Quote {
  return {
    type: 'quote',
    quote: {
      rich_text: text,
      children,
      color,
    },
  };
}

export function bulletedListItem(
  text: RichText[],
  children?: Block[],
  color?: Color
): Blocks.BulletedListItem {
  return {
    type: 'bulleted_list_item',
    bulleted_list_item: {
      rich_text: text,
      children,
      color,
    },
  };
}

export function numberedListItem(
  text: RichText[],
  children?: Block[],
  color?: Color
): Blocks.NumberedListItem {
  return {
    type: 'numbered_list_item',
    numbered_list_item: {
      rich_text: text,
      children,
      color,
    },
  };
}

export function toDo(
  checked: boolean,
  text: RichText[],
  children?: Block[],
  color?: Color
): Blocks.ToDo {
  return {
    type: 'to_do',
    to_do: {
      rich_text: text,
      checked: checked,
      children,
      color,
    },
  };
}

export function toggle(
  text: RichText[],
  children?: Block[],
  color?: Color
): Blocks.Toggle {
  return {
    type: 'toggle',
    toggle: {
      rich_text: text,
      children,
      color,
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

/**
 * Child page blocks should be created using their dedicated endpoints.
 * @see https://developers.notion.com/reference/block#child-page-blocks
 */
export function childPage(title: string): Partial<ResponseBlocks.ChildPage> {
  return {
    type: 'child_page',
    child_page: {
      title,
    },
  };
}

/**
 * Child database blocks should be created using their dedicated endpoints.
 * @see https://developers.notion.com/reference/block#child-database-blocks
 */
export function childDatabase(
  title: string
): Partial<ResponseBlocks.ChildDatabase> {
  return {
    type: 'child_database',
    child_database: {
      title,
    },
  };
}

/**
 * Embed blocks created through the API may differ from the ones created in Notion.
 * @see https://developers.notion.com/reference/block#embed-blocks
 */
export function embed(url: string, caption: RichText[] = []): Blocks.Embed {
  return {
    type: 'embed',
    embed: {
      url,
      caption,
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

export function video(url: string, caption: RichText[] = []): Blocks.Video {
  return {
    type: 'video',
    video: {
      type: 'external',
      external: {
        url,
      },
      caption,
    },
  };
}

export function file(url: string, caption: RichText[] = []): Blocks.File {
  return {
    type: 'file',
    file: {
      type: 'external',
      external: {
        url,
      },
      caption,
    },
  };
}

export function pdf(url: string, caption: RichText[] = []): Blocks.Pdf {
  return {
    type: 'pdf',
    pdf: {
      type: 'external',
      external: {
        url,
      },
      caption,
    },
  };
}

export function bookmark(
  url: string,
  caption: RichText[] = []
): Blocks.Bookmark {
  return {
    type: 'bookmark',
    bookmark: {
      url,
      caption,
    },
  };
}

export function equation(expression: string): Blocks.Equation {
  return {
    type: 'equation',
    equation: {
      expression,
    },
  };
}

export function divider(): Blocks.Divider {
  return {
    type: 'divider',
    divider: {},
  };
}

export function tableOfContents(color?: Color): Blocks.TableOfContents {
  return {
    type: 'table_of_contents',
    table_of_contents: {
      color,
    },
  };
}

export function breadcrumb(): Blocks.Breadcrumb {
  return {
    type: 'breadcrumb',
    breadcrumb: {},
  };
}

export function columnList(columns: Blocks.Column[]): Blocks.ColumnList {
  return {
    type: 'column_list',
    column_list: {
      children: columns,
    },
  };
}

export function column(children: Block[]): Blocks.Column {
  return {
    type: 'column',
    column: {
      children,
    },
  };
}

/**
 * Link preview blocks can't be used in a request.
 * @see https://developers.notion.com/reference/block#link-preview-blocks
 */
export function linkPreview(url: string): Partial<ResponseBlocks.LinkPreview> {
  return {
    type: 'link_preview',
    link_preview: {
      url,
    },
  };
}

export function template(text: RichText[], children: Block[]): Blocks.Template {
  return {
    type: 'template',
    template: {
      rich_text: text,
      children,
    },
  };
}

export function linkToPage(
  type: Exclude<Blocks.LinkToPage['link_to_page']['type'], undefined>,
  id: string
): Blocks.LinkToPage {
  return {
    type: 'link_to_page',
    link_to_page:
      type === 'page_id'
        ? {
            type,
            page_id: id,
          }
        : {
            type,
            database_id: id,
          },
  };
}

export function syncedBlock(from: string): Blocks.SyncedBlock;
export function syncedBlock(from: null, children: Block[]): Blocks.SyncedBlock;
export function syncedBlock(
  from: string | null,
  children?: Block[]
): Blocks.SyncedBlock {
  return {
    type: 'synced_block',
    synced_block:
      from === null
        ? {
            synced_from: null,
            children,
          }
        : {
            synced_from: {
              block_id: from,
            },
          },
  };
}

export function table(
  rows: Blocks.TableRow[],
  tableWidth: number,
  hasRowHeader?: boolean,
  hasColumnHeader?: boolean
): Blocks.Table {
  return {
    type: 'table',
    table: {
      table_width: tableWidth,
      has_row_header: hasRowHeader,
      has_column_header: hasColumnHeader,
      children: rows,
    },
  };
}

export function tableRow(cells: RichText[][] = []): Blocks.TableRow {
  return {
    type: 'table_row',
    table_row: {
      cells,
    },
  };
}
