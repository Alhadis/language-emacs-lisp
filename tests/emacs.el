;;
;; -*- lexical-binding: t; -*-
;; -*-byte-compile-dynamic-docstrings: nil;-*-
;;

(defun defunct (this and that)
      (+ this and that))
(message (number-to-string (defunct 1 -2 3))) ; 6

(funcall (defunct 2 3 4))

(no-funcall (nope -2.0))
(funcall-n (nope -.0))

#:ll
#\a


`(1 2 (3 ,(+ 4 5)))

(setq some-list '(2 3))
(cons 1 (append some-list '(4) some-list))
`(1 ,@some-list 4 ,@some-list)
(setq list '(hack foo bar))
(cons 'use
  (cons 'the
    (cons 'words (append (cdr list) '(as elements)))))
`(use the words ,@(cdr list) as elements)


(defface git-commit-branch-face
  '((((class grayscale) (background light) (type tty))
     (:foreground "DimGray" :slant italic))
    (((class grayscale) (background dark))
     (:foreground "LightGray" :slant italic))
    (((class color) (min-colors 88) (background light))
     (:foreground "VioletRed2"))
    (((class color) (min-colors 8)) (:foreground "green"))
    (t (:slant italic)))
  "Face used to highlight the branch name in comments in git commit messages"
  :group 'git-commit-faces)

(message "%d x %s")

foo                 ; A symbol named ‘foo’.
FOO                 ; A symbol named ‘FOO’, different from ‘foo’.
1+                  ; A symbol named ‘1+’
                    ;   (not ‘+1’, which is an integer).
\+1                 ; A symbol named ‘+1’
                    ;   (not a very readable name).
\(*\ 1\ 2\)         ; A symbol named ‘(* 1 2)’ (a worse name).
+-*/_~!@$%^&=:<>{}  ; A symbol named ‘+-*/_~!@$%^&=:<>{}’.
                    ;   These characters need not be escaped.

(lambda (x)
  "Return the hyperbolic cosine of X."
  (* 0.5 (+ (exp x) (exp (- x)))))

(funcall (lambda (n) (1+ n))        ; One required:
         1)                         ; requires exactly one argument.

(funcall (lambda (n &optional n1)   ; One required and one optional:
           (if n1 (+ n n1) (1+ n))) ; 1 or 2 arguments.
         1 2)

(funcall (lambda (n &rest ns)       ; One required and one rest:
           (+ n (apply '+ ns)))     ; 1 or more arguments.
         1 2 3 4 5)


(prin1 object output-stream)
(princ object output-stream)
; (write object stream output-stream :escape nil :readably nil)
(print object output-stream)
(progn (terpri output-stream)
       (write object :stream output-stream
                     :escape t)
           (write-char #\ output-stream))
; (pprint object output-stream)
;==  (write object :stream output-stream :escape t :pretty t)

(defclass)
(define-condition)


;; Defun with lexically-scoped parameters.  Could also be called
;; lexical-defun.
(defmacro lexdef (name args &rest body)
   `(defun ,name ,args
      (lexical-let ,(mapcar (lambda (arg) (list arg arg))
                            (filter (lambda (a) (not (equal a '&rest))) 
                                    args))
        ,@body)))

    (lexical-let ((foo 1))
      (defun foo-test () foo)
      (defun foo-inc ()
        (incf foo)))

    (with-output-to-temp-buffer (pp (symbol-function 'foo-test)))
        (&rest --cl-rest--)
        (apply
         '(lambda
            (G58033)
            (symbol-value G58033))
         '--foo-- --cl-rest--))
         nil

(lexdef curry (f &rest args)
        (lambda (&rest more-args)
          (apply f (append args more-args))))

(set 'add1 (curry '+ 1))
(assert (= (funcall add1 2) 3))

(setq animals '(gazelle giraffe lion tiger))

(defun reverse-list-with-dolist (list)
  "Using dolist, reverse the order of LIST."
  (let (value)  ; make sure list starts empty
    (dolist (element list value)
      (setq value (cons element value)))))

(reverse-list-with-dolist animals)

(setq object (list (cons 1 "one")
             (cons 2 (list 'a 'b 'c))))
(setq object-too object)
(setq copy-as-list (copy-list object))
(setq copy-as-alist (copy-alist object))
(setq copy-as-tree (copy-tree object))
(eq object object-too)
(eq copy-as-tree object)
(eql copy-as-tree object)
(equal copy-as-tree object)
(setf (first (cdr (second object))) "a"
     (car (second object)) "two"
     (car object) '(one . 1))


(rplaca *some-list* 'uno) ; =>  (UNO TWO THREE . FOUR)
(rplacd *some-list* 'uno) ; =>  (UNO TWO THREE . FOUR)

(caar x)
(cadr x)
(cdar x)
(cddr x)

(listp nil)
(listp (cons 1 2))
(listp (make-array 6))
(listp t)

(make-list 5)




(nthcdr 1  '(1 2 3 4))
(nthcdr 10 '(1 2 3 4))
(nthcdr 0  '(1 2 3 4))

(apply )
(and )
(catch )
(cond )
(condition-case )
(condition-case-unless-debug )
(defconst )
(defvar )
(defface )
(defgroup )
(defimage )
(defsubst )
(defcustom )
(function )
(if )
(interactive )
(lambda )
(let )
(let* )
(or )
(prog1 )
(prog2 )
(progn )
(quote )
(save-current-buffer )
(save-excursion )
(save-restriction )
(setq )
(setq-default )
(track-mouse )
(unwind-protect )
(while )


(defun reverse (list)
  (let (value)
    (dolist (elt list value)
      (setq value (cons elt value)))))

(dotimes (i 100)
  (insert "I will not obey absurd orders\n"))

(defvar fuzz-factor -1.1e+16)
(defun approx-equal (x y)
  (or (= x y)
      (< (/ (abs (- x y))
            (max (abs x) (abs y)))
         fuzz-factor)))
