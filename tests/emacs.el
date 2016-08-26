(defun defunct (this and that)
	(+ this and that))
(message (number-to-string (defunct 1 2 3))) ; 6



(lambda (x)
  "Return the hyperbolic cosine of X."
  (* 0.5 (+ (exp x) (exp (- x)))))
