Emacs Lisp Support
==================

[![Build status: TravisCI][TravisCI-badge]][TravisCI-link]
[![Build status: AppVeyor][AppVeyor-badge]][AppVeyor-link]
[![Latest package version][APM-badge]][APM-link]

Hand-crafted syntax highlighting and editor commands for Emacs Lisp in Atom.

<img src="https://raw.githubusercontent.com/Alhadis/language-emacs-lisp/static/figure-1.png" width="802" alt="Atomacs" />


Commands
--------
This package includes two commands to run Lisp code in Emacs from Atom:

* `language-emacs-lisp:run-selection`
* `language-emacs-lisp:run-file`

<img src="https://raw.githubusercontent.com/Alhadis/language-emacs-lisp/static/figure-2.png" width="464" alt="Math: One not even" />

These aren't attached to any keybindings by default. You'll need to assign them
[shortcuts](http://flight-manual.atom.io/behind-atom/sections/keymaps-in-depth/)
yourself.

**NOTE:**
These require Emacs to be in your `$PATH`, and probably don't work on Windows.


<!-- Referenced links -->
[TravisCI-badge]: https://travis-ci.org/Alhadis/language-emacs-lisp.svg?branch=master
[TravisCI-link]:  https://travis-ci.org/Alhadis/language-emacs-lisp
[AppVeyor-badge]: https://ci.appveyor.com/api/projects/status/9m9wn1u6f76wr05f?svg=true
[AppVeyor-link]:  https://ci.appveyor.com/project/Alhadis/language-emacs-lisp
[APM-badge]:      https://img.shields.io/apm/v/language-emacs-lisp.svg?colorB=brightgreen
[APM-link]:       https://atom.io/packages/language-emacs-lisp
