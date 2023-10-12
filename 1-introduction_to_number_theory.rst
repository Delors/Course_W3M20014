
.. meta:: 
    :author: Michael Eichberg
    :keywords: Number Theory
    :description lang=en: Introduction to Number Theory
    :description lang=de: Einführung in die Zahlentheorie
    :id: 2023_10-W3M20014-introduction_to_number_theory
    :first-slide: last-viewed

.. |date| date::

.. role:: incremental
.. role:: ger


Introduction to Number Theory
=============================

:Lecturer: **Prof. Dr. Michael Eichberg**
:Version: |date|
:Based on: *Cryptography and Network Security - Principles and Practice, 8th Edition, William Stallings*

.. image:: logo.svg
    :alt: DHBW CAS Logo
    :scale: 4
    :class: logo


Divisibility
------------

.. class:: incremental

    - We say that a nonzero :math:`b` divides :math:`a` if :math:`a = mb` for some :math:`m`, where :math:`a`, :math:`b` and :math:`m` are integers.

    - :math:`b` divides :math:`a` if there is no remainder on division.

    - The notation :math:`b|a` is used to mean :math:`b` divides :math:`a`.

    - If :math:`b|a` we say that :math:`b` is a divisor of :math:`a`.


.. admonition:: Example
    :class: incremental

    The positive divisors of: :math:`24` 
    
    are: :math:`1`, :math:`2`, :math:`3`, :math:`4`, :math:`6`, :math:`8`, :math:`12` and :math:`24`
    
    :math:`13 | 182`; :math:`-5 | 30`; :math:`17 | 289`; :math:`-3 | 33`; :math:`17 | 0`.


Properties of Divisibility
--------------------------

.. class:: incremental

    - If :math:`a|1`, then :math:`a = \pm 1`.

    - If :math:`a | b` and :math:`b|a`, then :math:`a = \pm b`.

    - Any :math:`b \neq 0` divides :math:`0`.

    - If :math:`a | b` and :math:`b|c`, then :math:`a|c`.

    .. admonition:: Example
        :class: incremental
    
        :math:`11|66, 66|198 \Rightarrow 11|198`


Properties of Divisibility
--------------------------

If :math:`b | g` and :math:`b|h`, then :math:`b|(mg+nh)` for arbitrary integers :math:`m` and :math:`n`.
    
.. admonition:: Example
    :class: incremental:

    :math:`3 | 27` and :math:`3|33 \Rightarrow 3|(m \times 27 + n \times 33)`

.. admonition:: Explanation 
    :class: incremental

    If :math:`b | g` then :math:`g` is of the form :math:`g = b \times g_1`  for some integer :math:`g_1`.

    If :math:`b | h` then :math:`h` is of the form :math:`h = b \times h_1`  for some integer :math:`h_1`.

    So: :math:`mg+nh = mb g_1 + n b h_1 = b \times (mg_1+nh_1)` and therefore :math:`b` divides :math:`mg+mh`


Division Algorithm
------------------

Given any positive integer :math:`n` and any nonnegative integer :math:`a`, if we divide :math:`a` by n we get an integer quotient :math:`q` and an integer remainder :math:`r` that obey the following relationship:

.. math:: 

    a = qn + r \qquad 0 \leq r < n; q = \left \lfloor{a/n} \right \rfloor


.. image:: 1-division_algorithm.png
    :alt: The relationship a=qn+r
    :class: incremental
    

Division Algorithm for negative `a`
-----------------------------------


.. image:: 1-division_algorithm_negative_a.png
    :alt: The relationship a=qn+r for negative a

.. admonition:: Example
    :class: incremental

    .. math:: 
        a = -11; n = 7; -11 = (-2)\times 7 + 3; \quad r = 3 \quad q = -2


Euclidean Algorithm
-------------------

One of the basic techniques of number theory.

Procedure for determing the greatest common divisor (GCD) of two positive integers.


.. admonition:: Definition

    Two integers are **relatively prime** :ger:`relativ prim` if their only common positive integer factor is 1 (e.g. 7 and 9, but also 3 and 8).


Greatest Common Divisor (:ab:`GCD`)
-----------------------------------

.. class:: incremental

    - The greatest common divisor of two integers :math:`a` and :math:`b` is the largest integer that both divides :math:`a` and :math:`b`.

    - We use the notation :math:`gcd(a,b)` to mean the GCD of :math:`a` and b.

    - We define :math:`gcd(0,0) = 0`.

    - The **positive** integer :math:`c` is said to be the gcd of :math:`a` and :math:`b` if:

        - :math:`c` is a divisor of :math:`a` and :math:`b`
        - any divisor of :math:`a` and :math:`b` is a divisor of :math:`c`.


Greatest Common Divisor (:ab:`GCD`)
-----------------------------------

Alternative definition:

.. math:: 

    gcd(a,b) = max[k, such\;that\; k|a \; and \; k|b]

.. admonition:: Example

    .. class:: incremental

        :math:`gcd(60,24) =`

    .. class:: incremental

        :math:`gcd(60, -24) =`

    .. class:: incremental
        
        :math:`12`

Greatest Common Divisor (:ab:`GCD`)
-----------------------------------

We stated:

    two integers :math:`a` and :math:`b` are relatively prime iff  their only common positive integer factor is 1

    :math:`\Leftrightarrow`

    :math:`a` and :math:`b` are relatively prime if :math:`gcd(a,b)=1` 

Greatest Common Divisor (:ab:`GCD`)
-----------------------------------

Computing the GCD using the Euclidean algorithm.

..  To be done!!! 
    .. raw:: html
       <iframe src="Test/gcd animation/Standard/Standard.html" style="margin:auto;position:relative;width:600px;height:400px;overflow:hidden;" title="W3Schools Free Online Web Tutorials"></iframe>

.. image:: 1-euclidean_algorithm.svg
    :width: 1600


Greatest Common Divisor (:ab:`GCD`)
-----------------------------------

Example of computing the GCD using the Euclidean algorithm.


.. image:: 1-euclidean_algorithm_example.png
    :width: 600


Euclidean Algorithm
-------------------

.. csv-table:: 
    :header: "Step", "Dividend", "Divisor", "Quotient", "Remainder" 
    :width: 100%

    1, 1160718174, 316258250, 3, 211943424
    2, 316258250, 211943424, 1, 104314826
    3, 211943424, 104314826, 2, 3313772
    4, 104314826, 3313772, 31, 1587894
    5, 3313772, 1587894, 2, 137984
    6, 1587894, 137984, 11, 70070
    7, 137984, 70070, 1, 67914
    8, 70070, 67914, 1, 2156
    9, 67914, 2156, 31, 1078
    10, 2156, **1078**, 2, 0


Modular Arithmetic
------------------

The Modulus
___________

If a is an integer and n is a positive integer, we define :math:`a\; mod\; n` to be the remainder when a is divided by n. The integer n is called the modulus.

Thus, for any integer a:

.. math:: 
    
    a = qn + r \quad 0 \leq r < n; q = \left\lfloor a / n \right\rfloor

    a =  \left\lfloor a / n \right\rfloor \times n + (a\; mod\;  n)

.. admonition:: Example
    :class: incremental

    .. math::

        11\;  mod\;  7 = 4; \qquad -11\;  mod\;  7 = 3


Modular Arithmetic (Congruent modulo :math:`n`)
------------------------------------------------

- Two integers a and b are said to be congruent modulo n if :math:`(a\; mod\; n) = (b\; mod\; n)`

- This is written as :math:`a \equiv b(mod\; n)`.

- Note that if :math:`a \equiv 0 (mod\; n)`, then :math:`n|a`.

.. admonition:: Example
    :class: incremental

    .. math:: 

        73 \equiv 4 (mod\; 23); \qquad 21 \equiv -9 (mod\; 10)

.. admonition:: Note
    :class: incremental

    The operator :math:`mod` is used (a) as a binary operator that produces a remainder and (b) as a congruence relation that shows the equivalence of two integers.


Properties of Congruence
------------------------

Congruences have the following properties:

.. class:: incremental

1. :math:`a \equiv b (mod\; n)` if :math:`n|(a-b)`
2. :math:`a \equiv b (mod\; n) \Rightarrow b \equiv a (mod\; n)`
3. :math:`a \equiv b (mod\; n)\; and\; b \equiv c (mod\; n) \Rightarrow a \equiv c (mod\; n)`


Properties of Congruence (Explained)
------------------------------------

    To demonstrate the first point, if :math:`n|(a - b)`, then :math:`(a - b) = kn` for some :math:`k`

    - So we can write :math:`a=b+kn`

    - Therefore, :math:`(a\; mod\; n)` = (remainder when :math:`b + kn` is divided by n) = (remainder when b is divided by n) = :math:`(b\; mod\; n)`

    .. admonition:: Example
        :class: incremental

        :math:`23 = 8(mod\; 5)` because :math:`23 - 8 = 15 = 5* 3`

        :math:`-11 = 5(mod\; 8)` because :math:`-11 - 5 = -16 = 8* (-2)`

        :math:`81 = 0(mod\; 27)` because :math:`81 - 0 = 81 = 27* 3`


Modular Arithmetic
------------------

Modular arithmetic exhibits the following properties: 

1. :math:`[(a\; mod\; n) + (b\; mod\; n)]\; mod\; n = (a + b)\; mod\; n`
2. :math:`[(a\; mod\; n) - (b\; mod\; n)]\; mod\; n = (a - b)\; mod\; n`
3. :math:`[(a\; mod\; n) \times (b\; mod\; n)]\; mod\; n = (a \times b)\; mod\; n`

Modular Arithmetic (First Property)
-----------------------------------

Define :math:`(a\; mod\; n) = r_a` and :math:`(b\; mod\; n) = r_b`. Then we can write :math:`a = r_a + jn` for some integer j and :math:`b = r_b + kn` for some integer k.

Then:

.. math:: 

    (a + b)\; mod\; n = (r_a + jn + r_b + kn)\; mod\; n

    = (r_a + r_b + (k + j)n)\; mod\; n

    = (r_a + r_b)\; mod\; n

    = [(a\; mod\; n) + (b\; mod\; n)]\; mod\; n


Modular Arithmetic (Examples of Properties)
-------------------------------------------

.. admonition:: Examples
    
    
    .. math::

        11\; mod\; 8 = 3;\qquad 15\; mod\; 8 = 7

    .. math::
        :class: incremental
        
        [(11\; mod\; 8) + (15\; mod\; 8)]\; mod\; 8 = 10\; mod\; 8 = 2 
        
        (11 + 15)\; mod\; 8 = 26\; mod\; 8 = 2

    .. math::
        :class: incremental

        [(11\; mod\; 8) - (15\; mod\; 8)]\; mod\; 8 = - 4\; mod\; 8 = 4 
        
        (11 - 15)\; mod\; 8 = -4\; mod\; 8 = 4

    .. math::
        :class: incremental

        [(11\; mod\; 8) \times (15\; mod\; 8)]\; mod\; 8= 21\; mod\; 8 = 5 
        
        (11 \times 15)\; mod\; 8 = 165\; mod\; 8 = 5


Modular Arithmetic Modulo 8
---------------------------

.. note:: 
    
    Definition

    .. math:: 

        Z_n = {0,1,...,(n-1)}

    .. math:: 

        Z_8 = {0,1,2,3,4,5,6,7}

Addition

.. csv-table:: 
    :header: `+`,"0","1","2","3","4","5","6","7"

    0,*0*,1,2,3,4,5,6,7
    1,1,2,3,4,5,6,7,*0*
    2,2,3,4,5,6,7,*0*,1
    3,3,4,5,6,7,*0*,1,2
    4,4,5,6,7,*0*,1,2,3
    5,5,6,7,*0*,1,2,3,4
    6,6,7,*0*,1,2,3,4,5
    7,7,*0*,1,2,3,4,5,6

Modular Arithmetic Modulo 8
---------------------------

Multiplication

.. csv-table:: 
    :header: `×`,"0","1","2","3","4","5","6","7"

    0, 0,0,0,0,0,0,0,0
    1, 0,*1*,2,3,4,5,6,7
    2, 0,2,4,6,0,2,4,6
    3, 0,3,6,*1*,4,7,2,5
    4, 0,4,0,4,0,4,0,4
    5, 0,5,2,7,4,*1*,6,3
    6, 0,6,4,2,0,6,4,2
    7, 0,7,6,5,4,3,2,*1*

.. 
    Generator script:
    for i in range(0,8):
    print(str(i)+", ",end="")
    for j in range(0,8):
        v = (i*j) % 8
        if v == 1:
            v = "*"+str(v)+"*"
        else:
            v = str(v)
        print(v+",",end="")
    print()

Modular Arithmetic Modulo 8
---------------------------

Additive and muliplicative inverse modulo 8.

.. note::
    :class: smaller 

    The negative/additive inverse of an integer x is the integer y such that :math:`(x + y)\; mod\; 8 = 0`.  

    The muliplicative inverse of an integer x is the integer y such that :math:`(x \times y)\; mod\; 8 = 1`.


.. csv-table:: 
    :header: :math:`w`, :math:`-w`, :math:`w^{-1}`
    
    0, 0, :math:`-`
    1, 7, 1
    2, 6, :math:`-`
    3, 5, 3
    4, 4, :math:`-`
    5, 3, 5
    6, 2, :math:`-`
    7, 1, 7 


Properties of Modular Arithmetic for Integers in :math:`Z_n`
------------------------------------------------------------

:Commutative Laws:

    

    :math:`(w + x)\; mod\; n = (x + w)\; mod\; n`

    :math:`(w \times x)\; mod\; n = (x \times w)\; mod\; n`

.. class:: incremental

    :Associative Laws:

        :math:`[(w + x) + y]\; mod\; n = [w + (x + y)]\; mod\; n`

        :math:`[(w \times x) \times y]\; mod\; n = [w \times (x \times y)]\; mod\; n`

.. class:: incremental

    :Distributive Law:
        :math:`[w \times (x + y)]\; mod\; n = [(w \times x) + (w \times y)]\; mod\; n`

.. class:: incremental

    :Identities:
        :math:`(0 + w)\; mod\; n = w\; mod\; n`
        :math:`(1 \times w)\; mod\; n = w\; mod\; n`

.. class:: incremental

    :Additive Inverse (-w):
        For each :math:`w \in Z_n` there exists a :math:`z` such that :math:`w + z \equiv 0\; mod\; n`


Euclidean Algorithm Revisited
--------------------------------

.. admonition:: Theorem

    For any integers :math:`a, b` with :math:`a \geq b \geq 0`,

    .. math::
        gcd(a,b) = gcd(b, a\; mod\; b)

.. code:: pseudocode
    :class: incremental

    Euclid(a,b):
        if (b = 0) then return a;
        else return Euclid(b, a mod b);

.. class:: incremental small

  **Example**

  .. code:: pseudocode
    
    gcd(10,6)
        ↳ gcd(6,4)
            ↳ gcd(4,2)
                ↳ gcd(2,0)
    2              ↩︎

Extended Euclidean Algorithm 
--------------------------------------

- Necessary for computations in the area of finite fields and encryption algoritms such as RSA.
- For two integers :math:`a` and :math:`b`, the extended Euclidean Algorithm computes the gcd :math:`d`, but also two additional integers :math:`x` and :math:`y` that satisfy the following equation:
  
  .. note::
    :class: incremental smaller

    :math:`x` and :math:`y` will have oposite signs. 

  .. math::
    ax + by = d = gcd(a,b)

Extended Euclidean Algorithm - :math:`gcd(a=42,b=30)`
------------------------------------------------------------------------------

Let's take a look at :math:`ax+by` for some :math:`x` and :math:`y`:

.. csv-table::
    :width: 1500px
    :class: hexdump
    :align: center

    :math:`_у \\ ^x`, -3, -2, -1, 0, 1, 2, 3
    -3, -216, -174, -132, -90, -48, -6, 36
    -2, -186, -144, -102, -60, -18, 24, 66
    -1, -156, -114, -72, -30, 12, 54, 96
    0, -126, -84, -42, 0, 42, 84, 126
    1, -96, -54, -12, 30, 72, 114, 156
    2, -66, -24, 18, 60, 102, 144, 186
    3, -36, 6, 48, 90, 132, 174, 216

.. admonition:: Note
    :class: incremental small

    The :math:`gcd` :math:`6` appears in the table.
    

Extended Euclidean Algorithm 
-----------------------------

We assume that at each step :math:`i` we can find integers :math:`x_i` and :math:`y_i` that satisfy: :math:`r_i = ax_i + by_i`.

.. math::

    \begin{matrix}
    original & extension \\
    a = q_1b + r_1 & r_1 = ax_1 + by_1 \\
    b = q_2r_1 + r_2 & r_2 = ax_2 + by_2 \\
    r_1 = q_3r_2 + r_3 & r_3 = ax_3 + by_3 \\
    \vdots & \vdots \\
    r_{n-2} = q_nr_{n-1}+r_n & r_n=ax_n + by_n \\
    r_{n-1} = q_{n+1}r_n +0 & \\
    d = gcd(a,b) = r_n &
    \end{matrix}

Extended Euclidean Algorithm 
-----------------------------

.. csv-table::
    :align: left
    :width: 1800px
    :class: small
    :header: Calculate, Which satisfies, Calculate, Which satisfies

    :math:`r_{-1} = a`, , :math:`x_{-1}=1; y_{-1}=0`, :math:`a = ax_{-1} + by_{-1}`
    :math:`r_{0} = b`, , :math:`x_0=0;y_{0}=0`, :math:`b = ax_{0} + by_{0}`
    :math:`r_{1} = a\;mod\;b; q_1= \lfloor a/b \rfloor`, :math:`a=q_1b+r_1` , :math:`x_1=x_{-1} -q_1x_0 = 1; y_1=y_{-1} -q_1y_0 = -q_1`, :math:`r_1 = ax_{1} + by_{1}` 
    :math:`r_{2} = b\;mod\;r_1; q_2= \lfloor b/r_1 \rfloor`, :math:`b=q_2r_1+r_2` , :math:`x_2=x_{0} -q_2x_1; y_2=y_{0} -q_2y_1`, :math:`r_2 = ax_{2} + by_{2}`
    :math:`r_{3} = r_1\;mod\;r_2; q_3= \lfloor r_1/r_2 \rfloor`, :math:`r_1=q_3r_2+r_3` , :math:`x_3=x_{1} -q_3x_2; y_3=y_{1} -q_3y_2`, :math:`r_3 = ax_{3} + by_{3}`
    :math:`\vdots`, :math:`\vdots`, :math:`\vdots`, :math:`\vdots`
    :math:`r_{n} = r_{n-2}\;mod\;r_{n-1}; q_n= \lfloor r_{n-2}/r_{n-1} \rfloor`, :math:`r_{n-2}=q_nr_{n-1}+r_n` , :math:`x_n=x_{n-2} -q_nx_{n-1}; y_n=y_{n-2} -q_ny_{n-1}`, :math:`r_n = ax_{n} + by_{n}`
    :math:`r_{n+1} = r_{n-1}\;mod\;r_{n} = 0; q_{n+1}= \lfloor r_{n-1}/r_{n} \rfloor`, :math:`r_{n-1}=q_{n+1}r_{n}+0` , ,  

.. class:: incremental 

    .. container:: small

        **Solution**

        :math:`d = gcd(a,b) = r_n; x = x_n; y = y_n` 



Extended Euclidean Algorithm - Example :math:`gcd(1759,550)`
-------------------------------------------------------------

.. csv-table::
    :header: :math:`i`, :math:`r_i`, :math:`q_i`, :math:`x_i`, :math:`y_i`
    :width: 1200px
    :class: hexdump
    :align: center

    -1, 1759, , 1, 0
    0, 550, , 0, 1
    1, 109, 3, 1, -3
    2, 5, 5, -5, 16
    3, 4, 21, 106, -339
    4, 1, 1, -111, 355
    5, 0, 4, , 

Result: :math:`d=1; x= -111; y = 355` 

Prime Numbers
-------------

.. class:: incremental

   - Prime numbers only have divisors of 1 and itself.
   - They cannot be written as a product of other numbers
   - Prime numbers are central to number theory
   - Any integer a > 1 can be factored in a unique way as: :math:`a=p_1^{a_1} \times p_2^{a_2} \times \dots \times p_t^{a_1}`  where :math:`p_1 < p_2 < . . . < p_t` are prime numbers and where each :math:`a_i` is a positive integer
   - This is known as the fundamental theorem of arithmetic.
  
.. admonition:: Note
    :class: incremental

    .. math:: 

        a = \displaystyle \prod_{p \in P} p^{a_p}\qquad where\; each\; a_p \geq 0


Fermat's (little) theorem
-------------------------

.. admonition:: Note
    :class: note

    Important in public-key cryptography.

States the following:

- If p is prime and a is a positive integer not divisible by p then :math:`a^{p-1} \equiv 1 (mod\;p)`

.. class:: incremental

    Alternative form:
    
    - If p is prime and a is a positive integer then :math:`a^p \equiv a(mod\; p)`




Some values of Euler's Totient Function :math:`\phi(n)`
-------------------------------------------------------

Euler's totient function (:math:`\phi(n)`.) is defined as the number of positive integers less than n and relatively prime to n; by convention :math:`\phi(1) = 1`.

.. csv-table:: 
    :header: 𝜑(n), +0, +1, +2, +3, +4, +5, +6, +7, +8, +9

    0+, / , 1, 1, 2, 2, 4, 2, 6, 4, 6
    10+, 4, 10, 4, 12, 6, 8, 8, 16, 6, 18
    20+, 8, 12, 10, 22, 8, 20, 12, 18, 12, 28
    30+, 8, 30, 16, 20, 16, 24, 12, 36, 18, 24
    40+, 16, 40, 12, 42, 20, 24, 22, 46, 16, 42
    50+, 20, 32, 24, 52, 18, 40, 24, 36, 28, 58
    60+, 16, 60, 30, 36, 32, 48, 20, 66, 32, 44
    70+, 24, 70, 24, 72, 36, 40, 36, 60, 24, 78
    80+, 32, 54, 40, 82, 24, 64, 42, 56, 40, 88
    90+, 24, 72, 44, 60, 46, 72, 32, 96, 42, 60

cf. https://de.wikipedia.org/wiki/Eulersche_Phi-Funktion


Euler's Theorem
----------------

States that for every a and n that are relatively prime: 

.. math::
        a^{\phi(n)} \equiv 1(mod\; n)

An alternative form is:

.. math::
        a^{\phi(n)+1} \equiv a (mod\; n)


Miller-Rabin Algorithm
----------------------

- Many cryptographic algorithms require one or more very large prime numbers at random. 
- The Miller-Rabin primality test is a probabilistic primality test that is fast and simple. 

- Background: Any positive odd integer :math:`n \geq 3` can be expressed as :math:`n-1 = 2^kq \qquad with\; k > 0, q\; odd`


Miller-Rabin Algorithm
----------------------

.. code:: pseudocode

    TEST(n, k) # n > 2, an odd integer to be tested for primality
               # k, the number of rounds of testing to perform

    let s > 0 and d odd > 0 such that n−1 = pow(2,s)*d  
    repeat k times:
        a ← random(2, n−2)
        x ← pow(a,d) mod n
        repeat s times:
            y ← sqr(x) mod n
            if y = 1 and x ≠ 1 and x ≠ n−1 then return “composite”
            x ← y
        if y ≠ 1 then return “composite”
    return “probably prime”


Deterministic Primality Algorithm
---------------------------------

.. class:: incremental

  - Prior to 2002 there was no known method of efficiently proving the primality of very large numbers.
  - All of the algorithms in use produced a probabilistic result
  - In 2002 Agrawal, Kayal, and Saxena developed an algorithm that efficiently determines whether a given large number is prime:
  
    - Known as the AKS algorithm.
    - Does not appear to be as efficient as the Miller-Rabin algorithm.


Chinese Remainder Theorem (CRT)
-------------------------------

.. note:: 
     
  Provides a way to manipulate (potentially very large) numbers mod M in terms of tuples of smaller numbers.
   
  - This can be useful when M is 150 digits or more.
  - However, it is necessary to know beforehand the factorization of M.

- Believed to have been discovered by the Chinese mathematician Sun-Tsu in around 100 A.D.
- One of the most useful results of number theory.
- Says it is possible to reconstruct integers in a certain range from their residues modulo a set of pairwise relatively prime moduli.
- Can be stated in several ways.


Chinese Remainder Theorem (CRT) - Example in :math:`Z_{10}` 
-------------------------------------------------------------


Let's assume that the (relatively prime/coprime) factors of a number :math:`x` are :math:`2` and :math:`5` and 

.. class:: incremental

that the known residues of the decimal digit :math:`x` are :math:`r_2 = 0` and :math:`r_5 = 3`. 

.. class:: incremental

Hence, :math:`x\; mod \;2 = 0`; i.e., :math:`x` has to be an even number; furthermore, :math:`x\; mod\; 5 = 3`.

.. class:: incremental

The unique solution is: :math:`8` (:math:`3` is not a solution, because it is odd!)

.. admonition:: High-level Summary
    :class: incremental

    The Chinese remainder theorem is widely used for computing with large integers, as it allows replacing a computation for which one knows a bound on the size of the result by several similar computations on small integers.

    It is applied in public-key cryptography.



