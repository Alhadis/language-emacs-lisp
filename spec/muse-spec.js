"use strict";

const {join, resolve} = require("path");
const fs = require("fs");

describe("Muse grammar", () => {
	let muse = null;
	
	beforeEach(async () => {
		const path = require("path");
		await atom.packages.activatePackage(path.resolve(__dirname, ".."));
		expect(atom.packages.activePackages["language-emacs-lisp"]).to.be.an("object");
		muse = atom.grammars.grammarForScopeName("text.muse");
		expect(muse).to.be.ok;
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
	
	describe("Fixture highlighting", function(){
		const inputDir  = join(__dirname, "fixtures", "input");
		const outputDir = join(__dirname, "fixtures", "output");
		const files = fs.readdirSync(inputDir);
		this.timeout(30000);
		this.slow(2500);
		
		before(() => atom.packages.activatePackage("language-hyperlink"));
		
		for(const filename of files){
			const inputFile  = fs.readFileSync(join(inputDir, filename), "utf8").replace(/\n+$/, "");
			const outputFile = fs.readFileSync(join(outputDir, filename + ".json"), "utf8");
			
			it(`tokenises ${filename}`, () => {
				const input  = muse.tokenizeLines(inputFile);
				const output = JSON.parse(outputFile).map(l => l.map(([value, ...scopes]) => ({value, scopes})));
				expect(input).to.have.lengthOf(output.length);
				
				const {length} = input;
				for(let i = 0; i < length; ++i)
					expect(input[i]).to.eql(output[i]);
			});
		}
	});
});
