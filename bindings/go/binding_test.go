package tree_sitter_koala_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_koala "github.com/hsnavihs/tree-sitter-koala/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_koala.Language())
	if language == nil {
		t.Errorf("Error loading Koala grammar")
	}
}
