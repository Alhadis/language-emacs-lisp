"use strict";

const {CompositeDisposable} = require("atom");
const childProcess = require("child_process");
const path = require("path");


/**
 * Singleton class which manages the package's lifecycle.
 * @hideconstructor
 * @class
 */
class EmacsLisp{
	
	/**
	 * Register the package's commands with Atom.
	 * @internal
	 */
	activate(){
		this.disposables = new CompositeDisposable();
		this.disposables.add(atom.commands.add("atom-text-editor", {
			"language-emacs-lisp:run-selection": e => {
				const text = this.getSelection();
				if(text && !/^\s+$/.test(text))
					this.eval(text)
						.then(output  => this.showOutput(output))
						.catch(output => this.showOutput(output, true));
			},
			"language-emacs-lisp:run-file": e => {
				const ed = atom.workspace.getActiveTextEditor();
				if(ed) this.runFile(ed.getPath())
					.then(output  => this.showOutput(output))
					.catch(output => this.showOutput(output, true));
			},
		}));
	}
	
	
	/**
	 * Free up memory when deactivating package.
	 * @internal
	 */
	deactivate(){
		if(null !== this.disposables)
			this.disposables.dispose();
		this.disposables = null;
	}
	
	
	/**
	 * Evaluate a string of Emacs Lisp code.
	 *
	 * @example eval("(+ 5 5)") -> "10"
	 * @param {String} text
	 * @return {Promise} Resolves with collected output.
	 */
	eval(text){
		return new Promise((resolve, reject) => {
			const emacs = childProcess.spawn("emacs", [
				"--batch",
				"--eval",
				`(message "%s" ${text})`
			]);
			
			let output = "";
			emacs.stderr.on("data", data => {
				if(data) output += data.toString();
			});
			
			emacs.on("close", code => {
				output = output.replace(/^\n+|\n+$/g, "");
				code !== 0
					? reject(output)
					: resolve(output);
			})
		});
	}
	
	
	/**
	 * Run a Lisp file in Emacs.
	 *
	 * @example runFile("~/.emacs.d/lisp/script.el")
	 * @param {String} file - Path to file
	 * @return {Promise} Resolves with the script's output, if any.
	 */
	runFile(file){
		return new Promise((resolve, reject) => {
			const emacs = childProcess.spawn("emacs", ["--script", file]);
			
			let output = "";
			emacs.stderr.on("data", data => {
				if(data) output += data.toString();
			});
			
			emacs.on("close", code => {
				output = output.replace(/^\n+|\n+$/g, "");
				code !== 0
					? reject(output)
					: resolve(output);
			})
		});
	}
	
	
	/**
	 * Show output in the notifications area.
	 *
	 * @param {String} text
	 * @param {Boolean} error
	 * @internal
	 */
	showOutput(text, error = false){
		const msg = "**Emacs:** " + text;
		const opt = {dismissable: true};
		error
			? atom.notifications.addError(msg, opt)
			: atom.notifications.addInfo(msg, opt);
	}

	
	/**
	 * Retrieve an editor's currently-selected text.
	 *
	 * If nothing's selected, the scope enclosing the cursor's
	 * current position is selected and returned instead.
	 *
	 * @param {TextEditor} ed - Defaults to current editor
	 * @return {String}
	 * @internal
	 */
	getSelection(ed){
		ed = ed || atom.workspace.getActiveTextEditor();
		if(!ed) return "";
		let text = ed.getSelectedText();
		
		// If the user hasn't made a selection, make one for 'em
		if(!text){
			if(atom.packages.activePackages["bracket-matcher"]){
				const command = "bracket-matcher:select-inside-brackets";
				atom.commands.dispatch(ed.element, command);
				
				// Select containing brackets too
				const range = ed.getSelectedBufferRange();
				--range.start.column;
				++range.end.column;
				ed.setSelectedBufferRange(range);
			}
			
			// Fallback if bracket-matcher isn't available
			else ed.selectWordsContainingCursors();
			
			text = ed.getSelectedText();
		}
		return text;
	}
}

EmacsLisp.prototype.disposables = null;
module.exports = new EmacsLisp();
