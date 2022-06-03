import {CodeLang} from './types';

/** This is just to keep a value with all languages, so that is can be used at runtime */
const codeLangs: Record<CodeLang, null> = {
  abap: null,
  arduino: null,
  bash: null,
  basic: null,
  c: null,
  clojure: null,
  coffeescript: null,
  'c++': null,
  'c#': null,
  css: null,
  dart: null,
  diff: null,
  docker: null,
  elixir: null,
  elm: null,
  erlang: null,
  flow: null,
  fortran: null,
  'f#': null,
  gherkin: null,
  glsl: null,
  go: null,
  graphql: null,
  groovy: null,
  haskell: null,
  html: null,
  java: null,
  javascript: null,
  json: null,
  julia: null,
  kotlin: null,
  latex: null,
  less: null,
  lisp: null,
  livescript: null,
  lua: null,
  makefile: null,
  markdown: null,
  markup: null,
  matlab: null,
  mermaid: null,
  nix: null,
  'objective-c': null,
  ocaml: null,
  pascal: null,
  perl: null,
  php: null,
  'plain text': null,
  powershell: null,
  prolog: null,
  protobuf: null,
  python: null,
  r: null,
  reason: null,
  ruby: null,
  rust: null,
  sass: null,
  scala: null,
  scheme: null,
  scss: null,
  shell: null,
  sql: null,
  swift: null,
  typescript: null,
  'vb.net': null,
  verilog: null,
  vhdl: null,
  'visual basic': null,
  webassembly: null,
  xml: null,
  yaml: null,
  'java/c/c++/c#': null,
};

/**
 * Returns whether a string is a supported language for `code` blocks
 */
export function isCodeLang(str: string): str is CodeLang {
  return Object.keys(codeLangs).includes(str);
}
