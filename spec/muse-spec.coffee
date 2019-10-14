describe "Muse grammar", ->
  grammar = null

  beforeEach ->
    waitsForPromise ->
      atom.packages.activatePackage("language-emacs-lisp")

    runs ->
      grammar = atom.grammars.grammarForScopeName("text.muse")

  it "tokenizes line comments", ->
    {tokens} = grammar.tokenizeLine(";")
    expect(tokens[0]).toEqual value: ";", scopes: ['text.muse', 'meta.document.muse', 'comment.line.semicolon.muse', 'punctuation.definition.comment.begin.muse']

    {tokens} = grammar.tokenizeLine("; Foo bar")
    expect(tokens[0]).toEqual value: ";", scopes: ['text.muse', 'meta.document.muse', 'comment.line.semicolon.muse', 'punctuation.definition.comment.begin.muse']
    expect(tokens[1]).toEqual value: " ", scopes: ['text.muse', 'meta.document.muse', 'comment.line.semicolon.muse']
    expect(tokens[2]).toEqual value: "Foo bar", scopes: ['text.muse', 'meta.document.muse', 'comment.line.semicolon.muse']

    # Require a space after ";"
    {tokens} = grammar.tokenizeLine(";Foo bar")
    expect(tokens[0]).toEqual value: ";Foo bar", scopes: ['text.muse', 'meta.document.muse', 'meta.paragraph.align.left.muse']
