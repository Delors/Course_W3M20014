.. meta:: 
    :author: Michael Eichberg
    :keywords: AES
    :description lang=en: Advanced Encryption Standard (AES)
    :description lang=de: Advanced Encryption Standard (AES)
    :id: 2023_10-W3M20014-aes
    :first-slide: last-viewed

.. |date| date::

.. role:: incremental
.. role:: ger
.. role:: red
.. role:: green 
.. role:: blue 
    
    

Advanced Encryption Standard (AES)
===============================================

:Lecturer: **Prof. Dr. Michael Eichberg**
:Version: |date|
:Based on: *Cryptography and Network Security - Principles and Practice, 8th Edition, William Stallings*


.. image:: logo.svg
    :alt: DHBW CAS Logo
    :scale: 4
    :class: logo


Finite Field Arithmetic (Recap)
-------------------------------

.. class:: incremental

- A field is a set in which we can do addition, subtraction, multiplication, and division without leaving the set.
- Division is defined with the following rule:  :math:`a/b = a(b^{-1})`.
-  An example of a finite field (one with a finite number of elements) is the set :math:`Z_p` consisting of all the integers :math:`\lbrace 0,1,....,p-1 \rbrace`, where p is a prime number and in which arithmetic is carried out modulo :math:`p`.


Finite Field Arithmetic (Recap)
--------------------------------

.. class:: incremental

  - For convenience and for implementation efficiency, we would like to work with integers that fit exactly into a given number of bits with no wasted bit patterns.
  
    • Integers in the range 0 through :math:`2^n – 1`, which fit into an n-bit word.

  - If one of the operations used in the algorithm is division, then we need to work in arithmetic defined over a field.
  
    • Division requires that each nonzero element has a multiplicative inverse.

  - The set of such integers, :math:`Z_{2^n}`, using modular arithmetic, is not a field!
  
    • For example, the integer 2 has no multiplicative inverse in :math:`Z_{2^n}`, that is, there is no integer b, such that :math:`2b\; mod\; 2^n = 1`

  - A finite field containing :math:`2^n` elements is referred to as :math:`GF(2^n)`.

  .. container:: hint

    Every polynomial in :math:`GF(2^n)` can be represented by an n-bit number.


Finite Field Arithmetic for AES
--------------------------------

- In the Advanced Encryption Standard (AES) all operations are performed on 8-bit bytes
    
- The arithmetic operations of addition, multiplication, and division are performed over the finite field :math:`GF(2^8)`

  AES uses the irreducible polynomial :math:`m(x) = x^8 + x^4 + x^3 +x +1` 


AES Key Elements
----------------

- AES uses a fixed block size of 128 bits.
- AES operates on a 4x4 column-major order array of 16 bytes/128 bits: :math:`b_0,b_1,\dots,b_{15}` termed the state:
  
  .. math::

    \begin{bmatrix}b_{0}&b_{4}&b_{8}&b_{12}\\b_{1}&b_{5}&b_{9}&b_{13}\\b_{2}&b_{6}&b_{10}&b_{14}\\b_{3}&b_{7}&b_{11}&b_{15}\end{bmatrix}
    



AES Encryption Process
-----------------------

.. image:: 5-aes_encryption_process.svg
    :width: 1700px
    :alt: AES Encryption Process
    :align: center

AES Parameters
--------------

.. csv-table::        
    :align: center 
    :width: 1650px
    :class: highlight-line-on-hover

    Key Size (words/bytes/bits), 4/16/128, 6/24/192, 8/32/256
    Plaintext Block Size (words/bytes/bits), 4/16/128, 4/16/128, 4/16/128
    Number of Rounds, 10, 12, 14
    Round Key Size (words/bytes/bits), 4/16/128, 4/16/128, 4/16/128
    Expanded Key Size (words/bytes), 44/176, 52/208, 60/240


AES Encryption and Decryption Process
--------------------------------------------------------

.. container:: small
    
    (Key Size 128bits)

.. image:: 5-aes_encryption_and_decryption.svg
    :width: 1250px
    :alt: AES Encryption and Decryption Process
    :align: center


AES Detailed Structure
-----------------------

- Processes the entire data block as a single matrix during each round using substitutions and permutation.

.. class:: incremental

- The key that is provided as input is expanded into an array of forty-four 32-bit words, :math:`w[i]` if 128 bits are used for the keysize.

- The cipher begins and ends with an AddRoundKey stage.
- Can view the cipher as alternating operations of XOR encryption (AddRoundKey) of a block, followed by scrambling of the block (the other three stages), followed by XOR encryption, and so on.
- Each stage is easily reversible.
- The decryption algorithm makes use of the expanded key in reverse order, however the decryption algorithm is not identical to the encryption algorithm.
- State is the same for both encryption and decryption.
- Final round of both encryption and decryption consists of only three stages.


AES Uses Four Different Stages
-------------------------------

:Substitute bytes: uses an S-box to perform a byte-by-byte substitution of the block
:ShiftRows: is a simple permutation.
:MixColumns: is a substitution that makes use of arithmetic over :math:`GF(2^8)`.
:AddRoundKey: is a simple bitwise XOR of the current block with a portion of the expanded key.


AES Substitute byte transformation
----------------------------------

.. image:: 5-aes_substitute_byte_transformation.svg
    :align: center
    :width: 1400px
    :alt: AES substitute byte tansformation


AES S-box
-----------

.. csv-table::
    :class: small monospaced highlight-on-hover       
    :align: center 
    :name: s-box

    :math:`_x\\^y` ,   0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F
    0, 63, 7C, 77, 7B, F2, 6B, 6F, C5, 30, 01, 67, 2B, FE, D7, AB, 76
    1, CA, 82, C9, 7D, FA, 59, 47, FO, AD, D4, A2, AF, 9C, A4, 72, CO
    2, B7, FD, 93, 26, 36, 3F, F7, CC, 34, A5, E5, F1, 71, D8, 31, 15
    3, 04, C7, 23, С3, 18, 96, 05, 9A, 07, 12, 80, E2, EB, 27, B2, 75
    4, 09, 83, 2C, 1A, 1B, 6E, 5A, A0, 52, 3B, D6, B3, 29, E3, 2F, 84
    5, 53, D1, 00, ED, 20, FC, B1, 5B, 6A, СВ, BE, 39, 4A, 4C, 58, CF
    6, DO, EF, AA, FB, 43, 4D, 33, 85, 45, F9, 02, 7F, 50, 3C, 9F, A8
    7, 51, A3, 40, 8F, 92, 9D, 38, F5, BC, B6, DA, 21, 10, FF, F3, D2
    8, CD, 0C, 13, EC, 5F, 97, 44, 17, C4, A7, 7E, 3D, 64, 5D, 19, 73
    9, 60, 81, 4F, DC, 22, 2A, 90, 88, 46, EE, B8, 14, DE, 5E, 0B, DB
    A, E0, 32, ЗА, 0A, 49, 06, 24, 5C, C2, D3, AC, 62, 91, 95, E4, 79
    B, E7, C8, 37, 6D, 8D, D5, 4E, A9, 6C, 56, F4, EA, 65, 7A, AE, 08
    C, BA, 78, 25, 2E, 1C, A6, B4, С6, E8, DD, 74, 1F, 4B, BD, 8B, 8A
    D, 70, 3E, B5, 66, 48, 03, F6, 0E, 61, 35, 57, B9, 86, C1, 1D, 9E
    E, E1, F8, 98, 11, 69, D9, 8E, 94, 9B, 1E, 87, E9, CE, 55, 28, DF
    F, 8C, A1, 89, OD, BF, E6, 42, 68, 41, 99, 2D, OF, BO, 54, BB, 16

.. class:: smaller incremental

    Each individual byte of State is mapped into a new byte in the following way: The leftmost 4 bits of the byte are used as a row value and the rightmost 4 bits are used as a column vlaue. These two values serve as indexes into the S-box.

AES Inverse S-box
-----------------

.. csv-table::
    :class: small monospaced highlight-on-hover        
    :align: center
    :name: inverse-s-box

    :math:`_x\\^y`, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F
    0, 52, 09, 6A, D5, 30, 36, A5, 38, BF, 40, A3, 9E, 81, F3, D7, FB
    1, 7C, E3, 39, 82, 9B, 2F, FF, 87, 34, 8E, 43, 44, C4, DE, E9, СВ
    2, 54, 7B, 94, 32, A6, C2, 23, 3D, EE, 4C, 95, 0B, 42, FA, С3, 4E
    3, 08, 2E, A1, 66, 28, D9, 24, B2, 76, 5B, A2, 49, 6D, 8B, D1, 25
    4, 72, F8, F6, 64, 86, 68, 98, 16, D4, A4, 5C, CC, 5D, 65, B6, 92
    5, 6C, 70, 48, 50, FD, ED, B9, DA, 5E, 15, 46, 57, A7, 8D, 9D, 84
    6, 90, D8, AB, 00, 8C, ВС, D3, 0A, F7, E4, 58, 05, B8, B3, 45, 06
    7, DO, 2C, 1E, 8F, CA, 3F, OF, 02, C1, AF, BD, 03, 01, 13, 8A, 6B
    8, ЗА, 91, 11, 41, 4F, 67, DC, EA, 97, F2, CF, CE, FO, B4, E6, 73
    9, 96, AC, 74, 22, E7, AD, 35, 85, E2, F9, 37, E8, 1C, 75, DF, 6E
    A, 47, FI, 1A, 71, 1D, 29, C5, 89, 6F, B7, 62, 0E, AA, 18, BE, 1B
    B, FC, 56, 3E, 4B, С6, D2, 79, 20, 9A, DB, CO, FE, 78, CD, 5A, F4
    C, 1F, DD, A8, 33, 88, 07, C7, 31, B1, 12, 10, 59, 27, 80, EC, 5F
    D, 60, 51, 7F, A9, 19, B5, 4A, OD, 2D, E5, 7A, 9F, 93, С9, 9C, EF
    E, A0, E0, 3B, 4D, AE, 2A, F5, BO, C8, EB, BB, 3С, 83, 53, 99, 61
    F, 17, 2B, 04, 7E, BA, 77, D6, 26, E1, 69, 14, 63, 55, 21, 0C, 7D

.. class:: smaller incremental

    *Example*: The (hex)value 0xA3 (x=A and y=3) is mapped by the S-box to the (hex)value 0x0A. **The inverse S-box maps the value 0x0A (x=0 and y=A) back to the original value**.

    

S-Box Rationale
----------------

- The S-box is designed to be resistant to known cryptanalytic attacks.
- The Rijndael developers sought a design that has a low correlation between input bits and output bits and the property that the output is not a linear mathematical function of the input.
- The nonlinearity is due to the use of the multiplicative inverse in the construction of the S-box.



Shift Row Transformation
------------------------

.. image:: 5-aes_shift_row_transformation.svg
    :width: 1600px 
    :alt: Shift row transformation
    :align: center 


Shift Row Transformation - Rationale
--------------------------------------

- More substantial than it may first appear!

.. class:: incremental
    
- The State, as well as the cipher input and output, is treated as an array of four 4-byte columns.
- On encryption, the first 4 bytes of the plaintext are copied to the first column of State, and so on.
- The round key is applied to State column by column.
- Thus, a row shift moves an individual byte from one column to another, which is a linear distance of a multiple of 4 bytes.
- Transformation ensures that the 4 bytes of one column are spread out to four different columns.

Mix Column Transformation
---------------------------


.. image:: 5-aes_mix_column_transformation.svg 
    :alt: Mix column transformation
    :align: center
    :width: 1500px 

Inverse Mix Column Transformation
---------------------------------


.. image:: 5-aes_inv_mix_column_transformation.svg
    :alt: Mix column transformation
    :align: center
    :width: 1500px 


Mix Colum Transformation - Example
-----------------------------------

.. container:: two-columns smaller
    
    .. csv-table:: Given
        :class: monospaced small

        87, F2, 4D, 97
        6E, 4C, 90, EC
        46, E7, 4A, C3
        A6, 8C, D8, 95

    .. csv-table:: Result
        :class: monospaced small

        47,40,A3,4C
        37,D4,70,9F
        94,E4,3A,42 
        ED,A5,A6,BC
        
.. container:: smaller

    Example computation of :math:`S'_{0,0}`:

    .. math::
        
        (02 \times 87) \oplus (03 \times 6E) \oplus (46) \oplus (A6) = 47.

.. admonition:: Hints
    :class: smaller
    
    .. math::

        \begin{matrix}
        (02 \times 87) = (0000\,1110) \oplus (0001\,1011) = & (0001\,0101) \\
        (03 \times 6E) = 6E \oplus (02 \times 6E) = (0110\,1110) \oplus (1101\, 1100)  = & (1011\,0010) \\
        46 = & (0100\,0110) \\
        A6 = & (1010\,0110) \\
        & \overline{  (0100\, 0111) }
        \end{matrix}


Mix Column Transformation - Rationale
--------------------------------------


- Coefficients of a matrix based on a linear code with maximal distance between code words ensures a good mixing among the bytes of each column.
  
- The mix column transformation combined with the shift row transformation ensures that after a few rounds all output bits depend on all input bits.


AddRoundKey Transformation
--------------------------

• The 128 bits of State are bitwise XORed with the 128 bits of the round key.

.. class:: incremental 

• Operation is viewed as a columnwise operation between the 4 bytes of a State column and one word of the round key.
• *Can also be viewed as a byte-level operation*.

.. admonition:: Rationale
    :class: incremental 
        

    -  It is as simple as possible and affects every bit of State.
    -  The complexity of the round key expansion plus the complexity of the other stages of AES ensure security!
    

Input for a Single AES Encryption Round
-----------------------------------------

.. image::  5-aes_input_for_a_single_round.svg
    :alt: Input for a single round.
    :align: center
    :width: 1150px 
    

AES Key Expansion
------------------

- Takes as input a four-word (16 byte) key and produces a linear array of 44 words (176) bytes.
- This is sufficient to provide a four-word round key for the initial `AddRoundKey` stage and each of the 10 rounds of the cipher.
- Key is copied into the first four words of the expanded key.
- The remainder of the expanded key is filled in four words at a time.
- Each added word :math:`w[i]` depends on the immediately preceding word, :math:`w[i – 1]`, and the word four positions back, :math:`w[i – 4]`
- In three out of four cases a simple XOR is used.
- For a word whose position in the w array is a multiple of 4, a more complex function :math:`g` is used.


AES Key Expansion - Visualized
--------------------------------

.. image:: 5-aes_key_expansion.svg 
    :alt: AES Key Expansion
    :align: center
    :width: 1200px



AES Round Key Computation
-------------------------

.. math::

    r_i = (r_{c_i},00,00,00)

    r_{c_1} = 01
    
    r_{c_{i+1}} = xtime(r_{c_i})

.. admonition:: :math:`xtime` Function
    :class: incremental smaller

    .. math::
            y_7y_6y_5y_5y_4y_3y_2y_1y_0 = xtime(x_7x_6x_5x_5x_4x_3x_2x_1x_0) \qquad (x_i,y_i \in \lbrace 0,1 \rbrace)

            y_7y_6y_5y_5y_4y_3y_2y_1y_0 =
            \begin{cases}
            x_6x_5x_5x_4x_3x_2x_1x_00, & if x_7 = 0\\
            x_6x_5x_5x_4x_3x_2x_1x_00 \oplus 0001 1011,& if x_7 = 1\\
            \end{cases}

.. admonition:: The (Fixed) Round Key Values:
    :class: incremental smaller

    :math:`r_{c_{1}}=01, r_{c_{2}}=02,r_{c_{3}}=04,r_{c_{4}}=08,r_{c_{5}}=10,r_{c_{6}}=20,r_{c_{7}}=40,r_{c_{8}}=80,r_{c_{9}}=1B = 0001 1011, r_{c_{10}}=36`




    

AES Key Expansion - Example (Round 1)
-------------------------------------

Let's assume: :math:`w[3] = (67,20,46,75)`:

- :math:`g(w[3])`:

  - circular byte left shift of :math:`w[3]`: :math:`(20,46,75,67)`  
  - byte substitution using s-box: :math:`(B7,5A,9D,85)`
  - adding round constant :math:`(01,00,00,00)` gives: :math:`g(w[3]) = (B6,5A,9D,85)`  

- :math:`w[4] = w[0] \oplus g(w[3]) = (E2,32,FC,F1)` 
- :math:`w[5] = w[4] \oplus w[1] = (91,12,91,88)` 
- :math:`w[6] = w[5] \oplus w[2] = (B1,59,E4,E6)` 
- :math:`w[7] = w[6] \oplus w[3] = (D6,79,A2,93)` 
- First roundkey is: :math:`w[4] || w[5] || w[6] || w[7]` 
  

AES Key Expansion - Rationale
------------------------------

.. note:: 
    :class: incremental small

    The specific criteria that were used are:

    • Knowledge of a part of the cipher key or round key does not enable calculation of many other round-key bits
    • An invertible transformation
    • Speed on a wide range of processors
    • Usage of round constants to eliminate symmetries
    • Diffusion of cipher key differences into the round keys
    • Enough nonlinearity to prohibit the full determination of round key differences from cipher key differences only
    • Simplicity of description 
    
    

• The Rijndael developers designed the expansion key algorithm to be resistant to known cryptanalytic attacks
• Inclusion of a round-dependent round constant eliminates the symmetry between the ways in which round keys are generated in different rounds


Avalanche Effect in AES: Change in Plaintext
--------------------------------------------

.. csv-table::        
    :class: tiny monospaced highlight-line-on-hover
    :align: center 
    :width: 1000px

    Round,,"Number of Bits 
    that Differ"
        ,"0123456789abcdeffedcba9876543210
    0023456789abcdeffedcba9876543210",1
    0,"0e3634aece7225b6f26b174ed92b5588
    0f3634aece7225b6f26b174ed92b5588",1
    1,"657470750fc7ff3fc0e8e8ca4dd02a9c
    c4a9ad090fc7ff3fc0e8e8ca4dd02a9c",20
    2,"5c7bb49a6b72349b05a2317ff46d1294
    fe2ae569f7ee8bb8c1f5a2bb37ef53d5",58
    3,"7115262448dc747e5cdac7227da9bd9c
    ec093dfb7c45343d6890175070485e62",59
    4,"f867aee8b437a5210c24c1974cffeabc
    43efdb697244df808e8d9364ee0ae6f5",61
    5,"721eb200ba06206dcbd4bce704fa654e
    7b28a5d5ed643287e006c099bb375302",68
    6,"0ad9d85689f9f77bc1c5f71185e5fb14
    3bc2d8b6798d8ac4fe36ald891ac181a",64
    7,"db18a8ffa16d30d5f88b08d777ba4eaa
    9fb8b5452023c70280e5c4bb9e555a4b",67
    8,"f91b4fbfe934c9bf8f2f85812b084989
    20264e1126b219aef7feb3f9b2d6de40",65
    9,"cca104a13e678500f£59025f3bafaa34
    b56a0341b2290ba7dfdfbddcd8578205",61
    10,"ff0b844a0853bf7c6934ab4364148fb9
    612b89398d0600cde116227ce72433f0",58


Avalanche Effect in AES: Change in Key
----------------------------------------

.. csv-table::        
    :class: tiny monospaced highlight-line-on-hover
    :align: center 
    :width: 1000px

    Round, , Number of Bits that Differ
     , "0123456789abcdeffedcba9876543210
    0123456789abcdeffedcba9876543210", 0
    0, "0e3634aece7225b6f26b174ed92b5588
    0f3634aece7225b6f26b174ed92b5588", 1
    1, "657470750fc7ff3fc0e8e8ca4dd02a9c
    c5a9ad090ec7ff3fcle8e8ca4cd02a9c", 22
    2, "5c7bb49a6b72349b05a2317ff46d1294
    90905fa9563356d15f3760f3b8259985", 58
    3, "7115262448dc747e5cdac7227da9bd9c
    18aeb7aa794b3b66629448d575c7cebf", 67
    4, "f867aee8b437a5210c24c1974cffeabc
    f81015f993c978a876ae017cb49e7eec", 63
    5, "721eb200ba06206dcbd4bce704fa654e
    5955c91b4e769f3cb4a94768e98d5267", 81
    6, "0ad9d85689f9f77bc1c5f71185e5fb14
    dc60a24d137662181e45b8d3726b2920", 70
    7, "db18a8ffa16d30d5f88b08d777ba4eaa
    fe8343b8f88bef66cab7e977d005a03c", 74
    8, "f91b4fbfe934c9bf8f2f85812b084989
    da7dad581d1725c5b72fa0f9d9d1366a", 67
    9, "cca104a13e678500ff59025f3bafaa34
    Occb4c66bbfd912f4b511d72996345e0", 59
    10, "ff0b844a0853bf7c6934ab4364148fb9
    fc8923ee501a7d207ab670686839996b", 53



Equivalent Inverse Cipher
--------------------------

AES decryption cipher is not identical to the encryption cipher.

• The sequence of transformations differs although the form of the key schedules is the same.
• Has the disadvantage that two separate software or firmware modules are needed for applications that require both encryption and decryption.

.. class:: incremental

  Two separate changes are needed to bring the decryption structure in line with the encryption structure:

  .. class:: incremental

    1. The first two stages of the decryption round need to be interchanged.
    2. The second two stages of the decryption round need to be interchanged.


Interchanging `InvShiftRows` and `InvSubBytes`
----------------------------------------------

• `InvShiftRows` :red:`affects the sequence` of bytes in State but does not alter byte contents and does not depend on byte contents to perform its transformation
• `InvSubBytes` :blue:`affects the contents` of bytes in State but does not alter byte sequence and does not depend on byte sequence to perform its transformation


.. admonition:: Important 
    
    Thus, these two operations commute and can be interchanged.


Interchanging `AddRoundKey` and `InvMixColumns`
------------------------------------------------

- The transformations `AddRoundKey` and `InvMixColumns` do not alter the sequence of bytes in State.
- If we view the key as a sequence of words, then both AddRoundKey and InvMixColumns operate on State one column at a time.
- These two operations are linear with respect to the column input.

  That is, for a given State :math:`S_i` and a given round key :math:`w_j`:
  
  .. math:: 

    InvMixColumns(S_i \oplus w_j) = InvMixColumns(S_i) \oplus InvMixColumns(w_j)

Equivalent Inverse Cipher
--------------------------

.. image:: 5-aes_equivalent_inverse_cipher.svg
    :width: 1230px
    :align: center



Implementation Aspects
-----------------------

AES can be implemented very efficiently on an 8-bit processor:
 
:AddRoundKey: is a bytewise XOR operation.
:ShiftRows: is a simple byte-shifting operation.
:SubBytes: operates at the byte level and only requires a table of 256 bytes.
:MixColumns: requires matrix multiplication in the field :math:`GF(2^8)`, which means that all operations are carried out on bytes.


Implementation Aspects
-----------------------

Can be efficiently implemented on a 32-bit processor:

• Redefine steps to use 32-bit words
• Can precompute 4 tables of 256-words
• Then each column in each round can be computed using 4 table lookups + 4 XORs
• At a cost of 4Kb to store tables
• Designers believe this very efficient implementation was a key factor in its selection as the AES cipher