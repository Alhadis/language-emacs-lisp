(defun defunct (this and that)
      (+ this and that))
(message (number-to-string (defunct 1 2 3))) ; 6


(lambda (x)
  "Return the hyperbolic cosine of X."
  (* 0.5 (+ (exp x) (exp (- x)))))

(funcall (lambda (n) (1+ n))        ; One required:
         1)                         ; requires exactly one argument.
    ; ⇒ 2
(funcall (lambda (n &optional n1)   ; One required and one optional:
           (if n1 (+ n n1) (1+ n))) ; 1 or 2 arguments.
         1 2)
    ; ⇒ 3
(funcall (lambda (n &rest ns)       ; One required and one rest:
           (+ n (apply '+ ns)))     ; 1 or more arguments.
         1 2 3 4 5)
    ; ⇒ 15
