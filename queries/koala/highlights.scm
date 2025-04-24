;; highlights.scm

;; Keywords
"func" @keyword
"var" @keyword
"for" @repeat
"while" @repeat
"if" @conditional
"else" @conditional
"return" @keyword
"print" @keyword
"and" @keyword.operator
"or" @keyword.operator
"true" @boolean
"false" @boolean
"nil" @constant.builtin

;; Identifiers
(identifier) @variable

;; Function definitions and calls
(function_declaration name: (identifier) @function)
(call (identifier) @function.call)

;; Control flow
(if_statement
  "if" @keyword)

(if_statement
	"else" @keyword)

(for_statement
  "for" @keyword)

(while_statement
  "while" @keyword)


;; Parameters
(parameter_list (identifier) @parameter)

;; Operators
"=" @operator
"==" @operator
"!=" @operator
">" @operator
">=" @operator
"<" @operator
"<=" @operator
"+" @operator
"-" @operator
"*" @operator
"/" @operator
"!" @operator

;; Blocks and punctuation
"{" @punctuation.bracket
"}" @punctuation.bracket
"(" @punctuation.bracket
")" @punctuation.bracket
";" @punctuation.delimiter
"," @punctuation.delimiter

;; Literals
(string) @string
(number) @number

;; Comments
(comment) @comment
