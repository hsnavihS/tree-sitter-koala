/**
 * @file Tree sitter grammar for the Koala programming language
 * @author Shivansh Shukla <shuklashivansh26@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "koala",

  extras: ($) => [$.comment, /[\s]/],

  rules: {
    program: ($) => repeat($._declaration),

    _declaration: ($) =>
      choice($.function_declaration, $.variable_declaration, $._statement),

    function_declaration: ($) =>
      seq("func", field("name", $.identifier), $.parameter_list, $.block),

    parameter_list: ($) =>
      seq("(", optional(commaSeparated($.identifier)), ")"),

    variable_declaration: ($) =>
      seq("var", $.identifier, optional(seq("=", $.expression)), ";"),

    _statement: ($) =>
      choice(
        $.expression_statement,
        $.for_statement,
        $.if_statement,
        $.while_statement,
        $.print_statement,
        $.return_statement,
        $.block,
      ),

    expression_statement: ($) => prec(1, seq($.expression, ";")),

    for_statement: ($) =>
      seq(
        "for",
        "(",
        optional(choice($.variable_declaration, $.expression_statement)),
        optional($.expression),
        ";",
        optional($.expression),
        ")",
        $._statement,
      ),

    if_statement: ($) =>
      prec.right(
        seq(
          "if",
          "(",
          $.expression,
          ")",
          $._statement,
          optional(seq("else", $._statement)),
        ),
      ),

    while_statement: ($) => seq("while", "(", $.expression, ")", $._statement),

    print_statement: ($) => seq("print", $.expression, ";"),

    return_statement: ($) => seq("return", optional($.expression), ";"),

    block: ($) => seq("{", repeat($._declaration), "}"),

    expression: ($) => $.assignment,

    assignment: ($) =>
      choice(seq($.assign_target, "=", $.assignment), $.logic_or),

    assign_target: ($) => choice($.identifier, seq($.call, ".", $.identifier)),

    logic_or: ($) =>
      prec.left(1, seq($.logic_and, repeat(seq("or", $.logic_and)))),

    logic_and: ($) =>
      prec.left(2, seq($.equality, repeat(seq("and", $.equality)))),

    equality: ($) =>
      prec.left(
        3,
        seq($.comparison, repeat(seq(choice("==", "!="), $.comparison))),
      ),

    comparison: ($) =>
      prec.left(
        4,
        seq($.term, repeat(seq(choice(">", ">=", "<", "<="), $.term))),
      ),

    term: ($) =>
      prec.left(5, seq($.factor, repeat(seq(choice("+", "-"), $.factor)))),

    factor: ($) =>
      prec.left(6, seq($.unary, repeat(seq(choice("*", "/"), $.unary)))),

    unary: ($) => choice(seq(choice("!", "-"), $.unary), $.call),

    call: ($) =>
      prec.left(
        seq($.primary, repeat(choice($.call_suffix, seq(".", $.identifier)))),
      ),

    call_suffix: ($) => seq("(", optional(commaSeparated($.expression)), ")"),

    comment: (_) =>
      token(
        choice(
          seq("//", /[^\r\n\u2028\u2029]*/),
          seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/"),
        ),
      ),

    primary: ($) =>
      choice(
        "true",
        "false",
        "nil",
        $.number,
        $.string,
        $.identifier,
        seq("(", $.expression, ")"),
      ),

    identifier: (_) => /[a-zA-Z_][a-zA-Z0-9_]*/,
    number: (_) => /\d+(\.\d+)?/,
    string: (_) => /"([^"\\]|\\.)*"/,
  },
});

function commaSeparated(rule) {
  return seq(rule, repeat(seq(",", rule)));
}
