import XCTest
import SwiftTreeSitter
import TreeSitterKoala

final class TreeSitterKoalaTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_koala())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Koala grammar")
    }
}
