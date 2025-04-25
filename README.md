# Tree-sitter Grammar for Koala 🐨

This repository contains the [Tree-sitter](https://tree-sitter.github.io/) grammar and highlighting configuration for [**Koala**](https://github.com/hsnavihS/koala), a toy programming language designed for learning and experimenting with interpreters and tooling.

> ✨ You can try Koala here: [Koala playground](https://hsnavihs.github.io/koala/)

---

## Motivation

I've been fascinated by the tooling ecosystem that Neovim uses, but I never really felt motivated enough to write a tree-sitter grammar or LSP for an existing language. After working on Koala though, I found this motivation.

Primarily because, even though I was just writing ```.kol``` files for testing purposes, editing the file on the left doesn't feel like you're writing _code_. It just doesn't scratch that itch. So I wrote this grammar to enable the highlighting you see on the file on the right:

![koala-highlights-side-by-side](https://github.com/user-attachments/assets/b4a1a181-2e34-41e7-ba2b-5426d50bb486)

---

## Features

1. Syntax tree generation
2. Syntax highlighting for keywords, operators, literals, comments, and more
3. Smart indentation on newline (C-like behavior)

---

## Setup

Follow the steps below to get tree-sitter support for Koala in Neovim:

### 1. Clone the repository

```bash
git clone https://github.com/hsnavihS/tree-sitter-koala.git
```

### 2. Let neovim know about Koala

Add the following lines to your init.lua to register the Koala grammar with Neovim’s Tree-sitter plugin:

```lua
require('nvim-treesitter.parsers').get_parser_configs().koala = {
  install_info = {
    url = 'path/to/cloned/repo/tree-sitter-koala',
    files = { 'src/parser.c' },
  },
  filetype = 'koala',
}

vim.filetype.add {
  extension = {
    kol = 'koala',
  },
}
```
This registers the grammar and maps .kol files to the koala filetype.

### 3. Link Highlighting and Indentation Files

Tree-sitter looks for highlight and indent queries inside the Neovim runtime. You can link them like this:

```bash
mkdir -p ~/.config/nvim/queries/koala

# Link highlight and indent queries
ln -s path/to/cloned/repo/tree-sitter-koala/queries/highlights.scm ~/.config/nvim/queries/koala/highlights.scm
ln -s path/to/cloned/repo/tree-sitter-koala/queries/indents.scm ~/.config/nvim/queries/koala/indents.scm
```

Restart Neovim, open a .kol file and you should see syntax highlighting in action!

### 4. [Optional] Install Tree-sitter CLI

Not required if you don't plan on tinkering with the defined grammar.
But if you do, you’ll need the tree-sitter CLI to generate the parser:

```bash
npm install -g tree-sitter-cli
```

Then, once you're done making changes in the grammar, run this command at the root:

```bash
tree-sitter generate
```

This creates `src/parser.c` (and some other files) using `grammar.js`.

---

## Future

These things would be cool to have, but since this is just a toy language I'm not going to invest time in these right now:
1. Support for editors that work on TextMate grammars for highlighting (VSCode being the major one I wanted to have support for)
2. Add support for more queries like folding, and locals

---

## Notes

Tree-sitter wouldn't pick up the changes I made to the grammar because of a couple of cached files. I had to remove these manually every time to see updates:

```bash
cd .local/share/nvim && rm ./lazy/nvim-treesitter/parser/koala.so && rm ./lazy/nvim-treesitter/parser-info/koala.revision
```

```:Inspect``` and ```:InspectTree``` are really cool commands, I found being able to look at the generated AST really helpful.

![2025-04-25-162318_hyprshot](https://github.com/user-attachments/assets/531410fc-1e1a-47e9-8d7c-4af727ff2487)

---
