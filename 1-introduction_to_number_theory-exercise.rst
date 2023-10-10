.. meta:: 
    :author: Michael Eichberg
    :keywords: Block Ciphers
    :description lang=en: Block Ciphers
    :description lang=de: Blockverschlüsselung
    :id: 2023_10-W3M20014-block_ciphers-exercise

.. |date| date::

IT-Security Cryptography and Secure Communications
==================================================

**Exercise: Introduction to Number Theory**


:Lecturer: **Prof. Dr. Michael Eichberg**
:Version: |date|



1. Compute the result of :math:`5^9\, mod\, 7` by hand. Don't use a calculator!

    .. 
        Solution:

            :math:`(5^9)\, mod\, 7 = (5^2 \times 5^2 \times 5^2 \times 5^2 \times 5) \, mod\, 7`

            :math:`= (5^2 \times 5^2 \times 5^2 \times 5^2 \times 5) \, mod\, 7 = (((5^2) \, mod\, 7)^4 \times (5\, mod\, 7))\, mod\, 7`

            :math:`= ((25 \, mod\, 7)^4 \times (5))\, mod \, 7`

            :math:`= (4^4 \times 5)\, mod \, 7`

            :math:`= (4^2 \times 4^2 \times 5)\, mod \, 7`

            :math:`= (2 \times 2 \times 5)\, mod \, 7`

            :math:`= (20)\, mod \, 7`

            :math:`= 6` 


2. Which numbers are relative prime to :math:`21`?

    .. 
        Solution: :math:`|\lbrace 1,2,4,5,8,10,11,13,16,17,19,20 \rbrace| = 12`; e.g. gcd(6,21) is 3 and therefore 6 and 21 are not relatively prime! 
   
3. Compute the :math:`gcd(1037,768)` using the Euclidean algorithm.

    .. 
        Solution
        
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

    .. 
        Solution: 37 is a prime number hence all numbers below are necessarily relatively prime to 37!

5. Convince yourself that Fermat's (little) theorem holds. E.g., for the numbers: :math:`a = 9, p = 7`.

    
    ..  
        Solution: :math:`9^6\, mod\, 7 = 531441\, mod\, 7 = 1` 



6. Convince yourself that Euler's theorem holds. E.g., for the following values: a=7 and n=9.
   
    ..
        Solution:

            :math:`\phi(9) = 6 = |\lbrace 2,4,5,6,7,8 \rbrace|` 

            :math:`7^6\, mod\, 9 = 1` 