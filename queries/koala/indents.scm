;; Ref: https://github.com/nvim-treesitter/nvim-treesitter/blob/master/CONTRIBUTING.md#indents

[
  (parameter_list)
  (block)
] @indent.begin

[
 "{"
 "("
] @indent.begin

[
 "}"
 ")"
] @indent.branch

[
 "}"
 ")"
] @indent.end

[
 (comment)
] @indent.auto
