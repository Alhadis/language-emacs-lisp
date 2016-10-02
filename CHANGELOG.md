Change Log
==========

This project adheres to [Semantic Versioning](http://semver.org).


[v1.1.1]
------------------------------------------------------------------------
**October 2nd, 2016**  
* __Fixed [#1]__: Inaccurate matching of formatting specifiers

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
[v1.1.1]: https://github.com/Alhadis/language-emacs-lisp/releases/v1.1.1
[v1.1.0]: https://github.com/Alhadis/language-emacs-lisp/releases/v1.1.0
[v1.0.1]: https://github.com/Alhadis/language-emacs-lisp/releases/v1.0.1
[v1.0.0]: https://github.com/Alhadis/language-emacs-lisp/releases/v1.0.0
[2.3.3.2]: http://www.hep.by/gnu/elisp/General-Escape-Syntax.html
