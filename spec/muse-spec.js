"use strict";

describe("Muse grammar", () => {
	let muse = null;
	
	beforeEach(async () => {
		await atom.packages.activatePackage("language-emacs-lisp");
		muse = atom.grammars.grammarForScopeName("text.muse");
	});
	
	describe("Comments", () => {
		it("tokenises empty comments", () => {
			const {tokens} = muse.tokenizeLine(";");
			expect(tokens[0]).to.eql({value: ";", scopes: [
				"text.muse",
				"meta.document.muse",
				"comment.line.semicolon.muse",
				"punctuation.definition.comment.begin.muse",
			]});
		});
		
		it("tokenises non-empty comments", () => {
			const {tokens} = muse.tokenizeLine("; Foo bar");
			expect(tokens[0]).to.eql({value: ";", scopes: [
				"text.muse",
				"meta.document.muse",
				"comment.line.semicolon.muse",
				"punctuation.definition.comment.begin.muse",
			]});
			expect(tokens[1]).to.eql({value: " ", scopes: [
				"text.muse",
				"meta.document.muse",
				"comment.line.semicolon.muse",
			]});
			expect(tokens[2]).to.eql({value: "Foo bar", scopes: [
				"text.muse",
				"meta.document.muse",
				"comment.line.semicolon.muse",
			]});
		});
		
		it("requires a space", () => {
			const {tokens} = muse.tokenizeLine(";Foo bar");
			expect(tokens[0]).to.eql({value: ";Foo bar", scopes: [
				"text.muse",
				"meta.document.muse",
				"meta.paragraph.align.left.muse",
			]});
		});
	});
});
