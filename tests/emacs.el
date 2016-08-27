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

(message "%d x %s")

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
           (write-char #\space output-stream))
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
