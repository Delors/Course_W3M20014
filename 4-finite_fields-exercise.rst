.. meta:: 
    :author: Michael Eichberg
    :keywords: exercise, finite fields

.. |date| date::

.. image:: logo.png
    :align: right


IT-Security Cryptography and Secure Communications
==================================================
    
:Excercise: **Finite Fields**
:Lecturer: *Prof. Dr. Michael Eichberg*
:Version: |date|


1. Fill in the missing values (:math:`GF(2^m)`)

.. csv-table::
    :header: Polynomial, Binary, Decimal

    :math:`x^7 +x^6 +x^4 +x+1`, , 
     , 11001001, 
     , , 133
    :math:`x^4 +x^2 +x`, , 
     , 00011001
     , , 10

.. 
    admonition:: Solution
    .. csv-table::
        :header: Polynomial, Binary, Decimal

        :math:`x^7 +x^6 +x^4 +x+1`, 11010011, 211
        :math:`x^7 +x^6 +x^3 +1`, 11001001, 201
        :math:`x^7 +x^2 +1` , 10000101, 133
        :math:`x^4 +x^2 +x`, 00010110 , 22
        :math:`x^4 +x^3 +1`, 00011001, 25
        :math:`x^3 +x`, 00001010, 10     

2. In :math:`GF(2^5)` with irreducible polynom :math:`p(x) = x5 + x2 + 1`
   
  - Calculate: :math:`(x^3 + x^2 + x + 1)−(x+1)` 

  .. Solution: x^3 + x^2

  - Calculate: :math:`(x^4 + x) \times (x^3 + x^2)` 
  
  .. Solution: f(x)=(x^4+x)·(x^3+x^2)\; mod\; p(x)=x^7+x^6+x^4+x^3\; mod\; p(x)=x^2+x

  - Calculate:  :math:`(x^3) \times (x^2 + x^1 + 1)`

  .. Solution: x^4 +x^3 +x^2 +1

  - Calculate: :math:`(x^4+x)/(x^3+x^2)` given :math:`(x^3+x^2)^{−1} =(x^2+x+1)`
  
    Recall: Division can be defined in terms of multiplication: if :math:`a, b \in F` then :math:`a/b = a \times (b^{−1})`, where :math:`b^{−1}` is called the inverse of :math:`b`.

  .. Solution: x^4 + 1  

  - Verify: :math:`(x^3+x^2)^{−1}=(x^2+x+1)`

  .. Solution: result is 1 (rest) 

3. In :math:`GF(2^8)`
 
  Let's assume that 7 and 3 are representative of the bit patterns of the coefficients of the polynomial.
  
  - Calculate: :math:`7d - 3d`
  - Calculate: :math:`7d + 3d`

  .. 7 = 0000 0111
  .. 3 = 0000 0011
  .. xor =>.. 0100
  .. Solution in both cases: 4 (i.e., learning objective: addition and subtraction is the same; every value is its additive inverse.)

  - Calculate: :math:`(0x03\; \times\; 0x46)` (use both approaches)

  .. Solution: 
          03 \times 46 = 46 \oplus (02 \times 46)
          = 0100 0110 \oplus 1000 1100 = 11001010 = 202d = 0xCA
