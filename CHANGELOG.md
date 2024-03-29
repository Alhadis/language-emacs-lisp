Change Log
==========

This project adheres to [Semantic Versioning](http://semver.org).

[Unpublished]: ../../compare/v1.4.1...HEAD


[Unpublished]
------------------------------------------------------------------------
* __Added:__ Highlighting for [key binding substitution sequences][2] in
Elisp comments and docstrings, introduced (or changed) circa Emacs 28.1.
* __Fixed:__ Escaped brackets and quotes not recognised in YASnippets
* __Improved:__ Highlighting of escape sequences in strings on GitHub

[2]: https://bit.ly/44MSmgO


[v1.4.1]
------------------------------------------------------------------------
**August 4th, 2021**  
* __Added:__ Comment highlighting for interpreter directives (hashbangs)
* __Added:__ Snippets for [YASnippet][] metadata and placeholders
* __Fixed:__ [Various inaccuracies][1] related to modeline matching

[1]: https://github.com/github/linguist/pull/5271



[v1.4.0]
------------------------------------------------------------------------
**October 17th, 2019**  
* __Added:__ Syntax highlighting for [Emacs Muse] and [AmuseWiki] markup
* __Added:__ Highlighting for [`el-get`], [`straight.el`] and [`quelpa`]
* __Fixed:__ Automatic insertion of closing backticks and single-quotes
* __Fixed:__ Unescaped and mangled output from evaluation commands



[v1.3.1]
------------------------------------------------------------------------
**July 1st, 2019**  
* __Added:__ Highlighting for another 30 keywords used by [`mocha.el`][]
* __Added:__ Highlighting for the [`use-package`][] macro
* __Fixed:__ Highlighting of YASnippets without prologues



[v1.3.0]
------------------------------------------------------------------------
**September 6th, 2018**  
* __Added:__ `defun` highlighting for `cl-{defun,defmacro,defsubst}`
* __Added:__ Highlighting for "magic" autoloading comments
* __Added:__ Highlighting for another 1,935 function names
* __Added:__ Support for strings using ASCII-style directional quotes
* __Added:__ Syntax highlighting for [YASnippet][] files
* __Fixed:__ Inconsistent highlighting of `(lambda())` and `(lambda ())`
* __Fixed:__ Missing highlighting of `,` when inserting symbols



[v1.2.0]
------------------------------------------------------------------------
**October 14th, 2017**  
* __Added:__ Highlighting for faces and another 30,134 function names,
courtesy of [Endless Parentheses](http://doc.endlessparentheses.com/)
* __Fixed:__ Broken highlighting of `<=` and `>=` in functions
* __Fixed:__ Editor commands still registered after deactivating package
* __Fixed:__ Deprecation warning when evaluating Lisp expressions
* __Fixed:__ Duplicated output when `language-emacs-lisp:run-selection`
is used to evaluate an expression already enclosed by `(message "%s" …)`


[v1.1.1]
------------------------------------------------------------------------
**October 2nd, 2016**  
* __Fixed [#1]:__ Inaccurate matching of formatting specifiers

[#1]: https://github.com/Alhadis/language-emacs-lisp/issues/1


[v1.1.0]
------------------------------------------------------------------------
**September 28th, 2016**  
Improves file support and highlighting of numeric constants.

* __Added:__ File extension support for `_emacs`, `abbrev_defs`, `.eld`,
`gnus`, `Project.ede`, and `viper`
* __Added:__ Highlighting to pair separators and square brackets
* __Added:__ Recognition of modelines and hashbangs
* __Added:__ Support for [character escape sequences][2.3.3.2]
* __Fixed:__ Partial highlighting of binary and hexadecimal literals
* __Fixed:__ Partial highlighting of `±INF` and `±NaN` constants


[v1.0.1]
------------------------------------------------------------------------
**August 29th, 2016**  
Small patch to fix broken highlighting in certain symbols with dashes.


[v1.0.0]
------------------------------------------------------------------------
**August 28th, 2016**  
Initial release. Adds editor commands and highlighting for Emacs Lisp.


[Referenced links]:_____________________________________________________
[v1.4.1]: https://github.com/Alhadis/language-emacs-lisp/releases/v1.4.1
[v1.4.0]: https://github.com/Alhadis/language-emacs-lisp/releases/v1.4.0
[v1.3.1]: https://github.com/Alhadis/language-emacs-lisp/releases/v1.3.1
[v1.3.0]: https://github.com/Alhadis/language-emacs-lisp/releases/v1.3.0
[v1.2.0]: https://github.com/Alhadis/language-emacs-lisp/releases/v1.2.0
[v1.1.1]: https://github.com/Alhadis/language-emacs-lisp/releases/v1.1.1
[v1.1.0]: https://github.com/Alhadis/language-emacs-lisp/releases/v1.1.0
[v1.0.1]: https://github.com/Alhadis/language-emacs-lisp/releases/v1.0.1
[v1.0.0]: https://github.com/Alhadis/language-emacs-lisp/releases/v1.0.0
[2.3.3.2]: http://www.hep.by/gnu/elisp/General-Escape-Syntax.html
[AmuseWiki]: https://amusewiki.org/library/manual
[Emacs Muse]: https://gnu.org/software/emacs-muse/manual/muse.html
[YASnippet]: http://joaotavora.github.io/yasnippet
[`el-get`]: https://github.com/dimitri/el-get
[`mocha.el`]: https://github.com/scottaj/mocha.el
[`quelpa`]: https://github.com/quelpa/quelpa
[`straight.el`]: https://github.com/raxod502/straight.el
[`use-package`]: https://github.com/jwiegley/use-package
