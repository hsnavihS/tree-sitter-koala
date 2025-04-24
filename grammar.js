/**
 * @file Tree sitter grammar for the Koala programming language
 * @author Shivansh Shukla <shuklashivansh26@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "koala",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
