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
	
	describe("Regression tests", () => {
		it("tokenises `===` as a single entity", () => {
			const {tokens} = muse.tokenizeLine("===");
			const baseScopes = ["text.muse", "meta.document.muse", "markup.raw.literal.muse"];
			expect(tokens[0]).to.eql({value: "=", scopes: [...baseScopes, "punctuation.definition.literal.begin.muse"]});
			expect(tokens[1]).to.eql({value: "=", scopes: [...baseScopes]});
			expect(tokens[2]).to.eql({value: "=", scopes: [...baseScopes, "punctuation.definition.literal.end.muse"]});
		});
		
		it("doesn't terminate emphasis at embedded asterisks", () => {
			const {tokens} = muse.tokenizeLine("Foo **bold**bar baz qux** qul");
			const baseScopes = ["text.muse", "meta.document.muse", "meta.paragraph.align.left.muse"];
			expect(tokens[0]).to.eql({value: "Foo ",        scopes: [...baseScopes]});
			expect(tokens[1]).to.eql({value: "**",          scopes: [...baseScopes, "markup.bold.strong.emphasis.muse", "punctuation.definition.emphasis.begin.muse"]});
			expect(tokens[2]).to.eql({value: "bold",        scopes: [...baseScopes, "markup.bold.strong.emphasis.muse"]});
			expect(tokens[3]).to.eql({value: "**",          scopes: [...baseScopes, "markup.bold.strong.emphasis.muse"]});
			expect(tokens[4]).to.eql({value: "bar baz qux", scopes: [...baseScopes, "markup.bold.strong.emphasis.muse"]});
			expect(tokens[5]).to.eql({value: "**",          scopes: [...baseScopes, "markup.bold.strong.emphasis.muse", "punctuation.definition.emphasis.end.muse"]});
			expect(tokens[6]).to.eql({value: " qul",        scopes: [...baseScopes]});
		});
		
		it("stops skipping blank-lines when encountering a list", () => {
			const lines = muse.tokenizeLines("\n - list\n");
			const baseScopes = ["text.muse", "meta.document.muse", "markup.list.muse"];
			expect(lines[0][0]).to.eql({value: "",     scopes: ["text.muse", "meta.blank-lines.muse"]});
			expect(lines[1][0]).to.eql({value: " ",    scopes: [...baseScopes, "punctuation.whitespace.leading.muse"]});
			expect(lines[1][1]).to.eql({value: "-",    scopes: [...baseScopes, "keyword.operator.list.unnumbered.marker.muse"]});
			expect(lines[1][2]).to.eql({value: " ",    scopes: [...baseScopes]});
			expect(lines[1][3]).to.eql({value: "list", scopes: [...baseScopes]});
			expect(lines[1][4]).to.eql({value: "",     scopes: [...baseScopes]});
			expect(lines[2][0]).to.eql({value: "",     scopes: [...baseScopes]});
		});
	});
	
	describe("Fixture highlighting", function(){
		const inputDir  = join(__dirname, "fixtures", "input");
		const outputDir = join(__dirname, "fixtures", "output");
		const files = fs.readdirSync(inputDir);
		this.timeout(30000);
		this.slow(2500);
		
		before(async () => {
			await atom.packages.activatePackage("language-html");
			await atom.packages.activatePackage("language-hyperlink");
			await atom.packages.activatePackage("language-xml");
			await atom.packages.activatePackage(resolve(__dirname, "..", "node_modules", "language-texinfo"));
			expect(atom.grammars.grammarForScopeName("text.texinfo")).to.be.ok;
		});
		
		for(const filename of files){
			const inputPath  = join(inputDir, filename);
			const outputPath = join(outputDir, filename + ".json");
			
			// Ignore pending fixtures
			if(!fs.existsSync(outputPath)){
				it.skip(`tokenises ${filename}`);
				continue;
			}
			
			const inputFile  = fs.readFileSync(inputPath, "utf8");
			const outputFile = fs.readFileSync(outputPath, "utf8");
			
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
