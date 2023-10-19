.. meta:: 
    :author: Michael Eichberg
    :keywords: number theory, exercise
    :id: 2023_10-W3M20014-introduction_to_number_theory

.. |date| date::

.. image:: logo.png
    :align: right

IT-Security Cryptography and Secure Communications
==================================================

:Exercise: **Introduction to Number Theory**
:Lecturer: *Prof. Dr. Michael Eichberg*
:Version: |date|



1. Compute the result of :math:`5^9\, mod\, 7` by hand. Don't use a calculator!

   .. admonition:: One Possible Solution

      :math:`(5^9)\, mod\, 7 = (5^2 \times 5^2 \times 5^2 \times 5^2 \times 5) \, mod\, 7`

      :math:`= (5^2 \times 5^2 \times 5^2 \times 5^2 \times 5) \, mod\, 7 = (((5^2) \, mod\, 7)^4 \times (5\, mod\, 7))\, mod\, 7`

      :math:`= ((25 \, mod\, 7)^4 \times (5))\, mod \, 7`

      :math:`= (4^4 \times 5)\, mod \, 7`

      :math:`= (4^2 \times 4^2 \times 5)\, mod \, 7`

      :math:`= (2 \times 2 \times 5)\, mod \, 7`

      :math:`= (20)\, mod \, 7`

      :math:`= 6` 


2. Which numbers are relative prime to :math:`21`?

   .. admonition:: Solution
        
      :math:`|\lbrace 1,2,4,5,8,10,11,13,16,17,19,20 \rbrace| = 12`
        
      (Recall: :math:`gcd(6,21)` is 3 and therefore 6 and 21 are not relatively prime!) 
   
3. Compute the :math:`gcd(1037,768)` using the Euclidean algorithm.

   .. admonition:: Solution

      .. csv-table::
        :header: step, a,b,q,r

        1, 1037, 768, 1, 269
        2, 768, 269, 2, 230
        3, 269, 230, 1, 39
        4, 230, 39, 5, 35
        5, 39, 35, 1, 4
        6, 35, 4, 8, 3
        7, 4, 3, 1, 1
        8, 3, 1, 3, 0



4. Determine the result of Euler's Totient function :math:`\phi` for the value :math:`37`. Don't look it up; just think about it.

   .. admonition:: Solution

      36 because 37 is a prime number. Hence all numbers below are necessarily relatively prime to 37!

5. Convince yourself that Fermat's (little) theorem holds. E.g., for the numbers: :math:`a = 9, p = 7`.

   .. admonition:: Solution
        
      :math:`9^6\, mod\, 7 = 531441\, mod\, 7 = 1` 



6. Convince yourself that Euler's theorem holds. E.g., for the following values: a=7 and n=9.
   
   .. admonition:: Solution

      :math:`\phi(9) = 6 = |\lbrace 1,2,4,5,7,8 \rbrace|` 

      :math:`7^6\, mod\, 9 = 1` 

7. Execute the Miller-Rabin Algorithm for n = 37.

   .. admonition:: Solution

      ::

            primality test for 37:

            k      s      a      x      y
            round 0:
            0      0     27     36      1
            0      1     27      1      1
            round 1:
            1      0     19      6     36
            1      1     19     36      1
            round 2:
            2      0     18     31     36
            2      1     18     36      1
            _____________________________
            probably prime
    
     `Miller-Rabin Algorithm: <https://github.com/Delors/Course_W3M20014/blob/main/1-miller-rabin-algorithm.ipynb>`__