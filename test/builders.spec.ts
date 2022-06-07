import {Color} from 'notion-api-types/global';
import {Block, Blocks, RichText} from 'notion-api-types/requests';
import * as builders from '../src/builders';

const SAMPLES = {
  richTexts: [
    {
      type: 'text',
      annotations: {
        bold: true,
        code: true,
        color: 'brown_background',
        italic: true,
        strikethrough: true,
        underline: true,
      },
      text: {
        content: 'abc',
        link: {
          type: 'url',
          url: 'https://example.com',
        },
      },
    } as RichText,
  ],
  blocks: [
    {
      type: 'paragraph',
      paragraph: {
        rich_text: [
          {
            type: 'text',
            annotations: {
              bold: true,
              code: true,
              color: 'brown_background',
              italic: true,
              strikethrough: true,
              underline: true,
            },
            text: {
              content: 'abc',
              link: {
                type: 'url',
                url: 'https://example.com',
              },
            },
          },
        ],
        children: [],
        color: 'blue',
      },
    } as Block,
  ],
  url: 'https://example.com',
};

function testBlock(type: Exclude<Block['type'], undefined>, res: Block) {
  it(`should create a ${type} block`, () => {
    expect(res.type).toBe(type);
    expect(res).toHaveProperty(type);
  });
}

function testRichText(
  callback: (c: RichText[]) => Block,
  testScope = 'rich_text'
) {
  it(`should support ${testScope}`, () => {
    const res = callback(SAMPLES.richTexts);

    // @ts-expect-error We're accessing the location of the rich_text property
    expect(res[res.type][testScope]).toEqual(SAMPLES.richTexts);
  });
}

function testChildren(callback: (c: Block[]) => Block) {
  it('should support children', () => {
    const res = callback(SAMPLES.blocks);

    // @ts-expect-error We're accessing the location of the children property
    expect(res[res.type].children).toEqual(SAMPLES.blocks);
  });
}

function testColor(callback: (c: Color) => Block) {
  it('should support color', () => {
    const a = callback('blue'),
      b = callback('blue_background'),
      c = callback('brown');

    // @ts-expect-error We're accessing the location of the color property
    expect(a[a.type].color).toBe('blue');
    // @ts-expect-error We're accessing the location of the color property
    expect(b[b.type].color).toBe('blue_background');
    // @ts-expect-error We're accessing the location of the color property
    expect(c[c.type].color).toBe('brown');
  });
}

describe('richText', () => {
  it('should produce a richText array', () => {
    const res = builders.richText('abc');

    expect(res).toEqual([
      {
        type: 'text',
        text: {
          content: 'abc',
        },
      },
    ]);
  });

  it('should support equations', () => {
    const res = builders.richText('abc', {type: 'equation'});

    expect(res).toEqual([
      {
        type: 'equation',
        equation: {
          expression: 'abc',
        },
      },
    ]);
  });

  it('should support annotations', () => {
    const annotations: RichText['annotations'] = {
        bold: true,
        code: true,
        color: 'brown_background',
        italic: true,
        strikethrough: true,
        underline: true,
      },
      res = builders.richText('abc', {annotations});

    expect(res).toEqual([
      {
        type: 'text',
        annotations,
        text: {
          content: 'abc',
        },
      },
    ]);
  });

  it('should support links', () => {
    const res = builders.richText('abc', {url: 'url'});

    expect(res).toEqual([
      {
        type: 'text',
        text: {
          content: 'abc',
          link: {
            type: 'url',
            url: 'url',
          },
        },
      },
    ]);
  });
});

describe('paragraph', () => {
  testBlock('paragraph', builders.paragraph([]));
  testRichText(c => builders.paragraph(c));
  testChildren(c => builders.paragraph([], c));
  testColor(c => builders.paragraph([], undefined, c));
});

describe('headingOne', () => {
  testBlock('heading_1', builders.headingOne([]));
  testRichText(c => builders.headingOne(c));
  testChildren(c => builders.headingOne([], c));
  testColor(c => builders.headingOne([], undefined, c));
});

describe('headingTwo', () => {
  testBlock('heading_2', builders.headingTwo([]));
  testRichText(c => builders.headingTwo(c));
  testChildren(c => builders.headingTwo([], c));
  testColor(c => builders.headingTwo([], undefined, c));
});

describe('headingThree', () => {
  testBlock('heading_3', builders.headingThree([]));
  testRichText(c => builders.headingThree(c));
  testChildren(c => builders.headingThree([], c));
  testColor(c => builders.headingThree([], undefined, c));
});

describe('callout', () => {
  testBlock('callout', builders.callout([]));

  it('should support icons', () => {
    const res = builders.callout([], {type: 'emoji', emoji: 'abc'});
    expect(res).toEqual({
      type: 'callout',
      callout: {
        rich_text: [],
        icon: {
          type: 'emoji',
          emoji: 'abc',
        },
      },
    });
  });

  testRichText(c => builders.callout(c));
  testChildren(c => builders.callout([], undefined, c));
  testColor(c => builders.callout([], undefined, undefined, c));
});

describe('quote', () => {
  testBlock('quote', builders.quote([]));
  testRichText(c => builders.quote(c));
  testChildren(c => builders.quote([], c));
  testColor(c => builders.quote([], undefined, c));
});

describe('bulletedListItem', () => {
  testBlock('bulleted_list_item', builders.bulletedListItem([]));
  testRichText(c => builders.bulletedListItem(c));
  testChildren(c => builders.bulletedListItem([], c));
  testColor(c => builders.bulletedListItem([], undefined, c));
});

describe('numberedListItem', () => {
  testBlock('numbered_list_item', builders.numberedListItem([]));
  testRichText(c => builders.numberedListItem(c));
  testChildren(c => builders.numberedListItem([], c));
  testColor(c => builders.numberedListItem([], undefined, c));
});

describe('toDo', () => {
  testBlock('to_do', builders.toDo(false, []));

  it('should support checked', () => {
    const a = builders.toDo(true, []),
      b = builders.toDo(false, []);

    expect(a).toEqual({
      type: 'to_do',
      to_do: {
        rich_text: [],
        checked: true,
      },
    });
    expect(b).toEqual({
      type: 'to_do',
      to_do: {
        rich_text: [],
        checked: false,
      },
    });
  });

  testRichText(c => builders.toDo(false, c));
  testChildren(c => builders.toDo(false, [], c));
  testColor(c => builders.toDo(false, [], undefined, c));
});

describe('toggle', () => {
  testBlock('toggle', builders.toggle([]));
  testRichText(c => builders.toggle(c));
  testChildren(c => builders.toggle([], c));
  testColor(c => builders.toggle([], undefined, c));
});

describe('code', () => {
  testBlock('code', builders.code([]));
  testRichText(c => builders.code(c));

  it('should support language', () => {
    const custom = builders.code([], 'abap'),
      def = builders.code([]);

    expect(custom.code.language).toBe('abap');
    expect(def.code.language).toBe('plain text');
  });

  testRichText(c => builders.code([], undefined, c), 'caption');
});

describe('childPage', () => {
  // @ts-expect-error child_page should not be used to make requests
  testBlock('child_page', builders.childPage('abc'));

  it('should support title', () => {
    const res = builders.childPage('abc');
    expect(res.child_page?.title).toBe('abc');
  });
});

describe('childDatabase', () => {
  // @ts-expect-error child_database should not be used to make requests
  testBlock('child_database', builders.childDatabase('abc'));

  it('should support title', () => {
    const res = builders.childDatabase('abc');
    expect(res.child_database?.title).toBe('abc');
  });
});

describe('embed', () => {
  testBlock('embed', builders.embed('url'));

  it('should support url', () => {
    const res = builders.embed(SAMPLES.url);
    expect(res.embed.url).toBe(SAMPLES.url);
  });

  testRichText(c => builders.embed('', c), 'caption');
});

describe('image', () => {
  testBlock('image', builders.image('url'));

  it('should support url', () => {
    const res = builders.image(SAMPLES.url);
    expect(res.image).toEqual({
      type: 'external',
      caption: [],
      external: {
        url: SAMPLES.url,
      },
    });
  });

  testRichText(c => builders.image('', c), 'caption');
});

describe('video', () => {
  testBlock('video', builders.video('url'));

  it('should support url', () => {
    const res = builders.video(SAMPLES.url);
    expect(res.video).toEqual({
      type: 'external',
      caption: [],
      external: {
        url: SAMPLES.url,
      },
    });
  });

  testRichText(c => builders.video('', c), 'caption');
});

describe('file', () => {
  testBlock('file', builders.file('url'));

  it('should support url', () => {
    const res = builders.file(SAMPLES.url);
    expect(res.file).toEqual({
      type: 'external',
      caption: [],
      external: {
        url: SAMPLES.url,
      },
    });
  });

  testRichText(c => builders.file('', c), 'caption');
});

describe('pdf', () => {
  testBlock('pdf', builders.pdf('url'));

  it('should support url', () => {
    const res = builders.pdf(SAMPLES.url);
    expect(res.pdf).toEqual({
      type: 'external',
      caption: [],
      external: {
        url: SAMPLES.url,
      },
    });
  });

  testRichText(c => builders.pdf('', c), 'caption');
});

describe('bookmark', () => {
  testBlock('bookmark', builders.bookmark('url'));

  it('should support url', () => {
    const res = builders.bookmark(SAMPLES.url);
    expect(res.bookmark.url).toBe(SAMPLES.url);
  });

  testRichText(c => builders.bookmark('', c), 'caption');
});

describe('equation', () => {
  testBlock('equation', builders.equation(''));

  it('should support expression', () => {
    const res = builders.equation('abc');
    expect(res.equation.expression).toBe('abc');
  });
});

describe('divider', () => {
  testBlock('divider', builders.divider());
});

describe('tableOfContents', () => {
  testBlock('table_of_contents', builders.tableOfContents());
  testColor(c => builders.tableOfContents(c));
});

describe('breadcrumb', () => {
  testBlock('breadcrumb', builders.breadcrumb());
});

describe('columnList', () => {
  testBlock('column_list', builders.columnList([]));
  testChildren(c => builders.columnList(c as Blocks.Column[]));
});

describe('column', () => {
  testBlock('column', builders.column([]));
  testChildren(c => builders.column(c));
});

describe('linkPreview', () => {
  // @ts-expect-error child_page should not be used to make requests
  testBlock('link_preview', builders.linkPreview(''));

  it('should support url', () => {
    const res = builders.linkPreview(SAMPLES.url);
    expect(res.link_preview?.url).toBe(SAMPLES.url);
  });
});

describe('template', () => {
  testBlock('template', builders.template([], []));
  testRichText(c => builders.template(c, []));
  testChildren(c => builders.template([], c));
});

describe('linkToPage', () => {
  testBlock('link_to_page', builders.linkToPage('page_id', ''));

  it('should support page_id', () => {
    const res = builders.linkToPage('page_id', 'abc');

    expect(res.link_to_page).toStrictEqual({
      type: 'page_id',
      page_id: 'abc',
    });
  });

  it('should support database_id', () => {
    const res = builders.linkToPage('database_id', 'abc');

    expect(res.link_to_page).toStrictEqual({
      type: 'database_id',
      database_id: 'abc',
    });
  });
});

describe('syncedBlock', () => {
  testBlock('synced_block', builders.syncedBlock(''));

  it('should support "original" blocks', () => {
    const res = builders.syncedBlock(null, SAMPLES.blocks);
    expect(res.synced_block).toStrictEqual({
      synced_from: null,
      children: SAMPLES.blocks,
    });
  });

  it('should support "reference" blocks', () => {
    const res = builders.syncedBlock('abc');
    expect(res.synced_block).toStrictEqual({
      synced_from: {
        block_id: 'abc',
      },
    });
  });
});

describe('table', () => {
  testBlock('table', builders.table([], 1));
  testChildren(c => builders.table(c as Blocks.TableRow[], 1));

  it('should support table_width', () => {
    const res = builders.table([], 123);
    expect(res.table.table_width).toBe(123);
  });

  it('should support has_row_header', () => {
    [true, false, undefined].forEach(v => {
      const res = builders.table([], 1, v);
      expect(res.table.has_row_header).toBe(v);
    });
  });

  it('should support has_column_header', () => {
    [true, false, undefined].forEach(v => {
      const res = builders.table([], 1, undefined, v);
      expect(res.table.has_column_header).toBe(v);
    });
  });
});

describe('tableRow', () => {
  testBlock('table_row', builders.tableRow());

  it('should support cells', () => {
    const cells = new Array(3).fill(SAMPLES.richTexts),
      res = builders.tableRow(cells);
    expect(res.table_row.cells).toStrictEqual(cells);
  });
});
