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

- In the Advanced Encryption Standard (AES) all operations are performed on 8-bit bytes
- The arithmetic operations of addition, multiplication, and division are performed over the finite field :math:`GF(2^8)`
- A field is a set in which we can do addition, subtraction, multiplication, and division without leaving the set
- Division is defined with the following rule:  :math:`a/b = a(b^{-1})`
-  An example of a finite field (one with a finite number of elements) is the set :math:`Z_p` consisting of all the integers :math:`\lbrace 0,1,....,p-1 \rbrace`, where p is a prime number and in which arithmetic is carried out modulo :math:`p`




Finite Field Arithmetic (Recap)
--------------------------------

.. class::incremental

- For convenience and for implementation efficiency, we would like to work with integers that fit exactly into a given number of bits with no wasted bit patterns
  
  • Integers in the range 0 through :math:`2^n – 1`, which fit into an n-bit word.

- If one of the operations used in the algorithm is division, then we need to work in arithmetic defined over a field.
  
  • Division requires that each nonzero element has a multiplicative inverse

- The set of such integers, :math:`Z_{2^n}`, using modular arithmetic, is not a field
  
  • For example, the integer 2 has no multiplicative inverse in :math:`Z_{2^n}`, that is, there is no integer b, such that :math:`2b\; mod\; 2^n = 1`

- A finite field containing :math:`2^n` elements is referred to as :math:`GF(2^n)`.

    .. container:: hint

        Every polynomial in :math:`GF(2^n)` can be represented by an n-bit number.


AES Parameters
--------------

.. csv-table::        
    :align: center 
    :width: 1650px

    Key Size (words/bytes/bits), 4/16/128, 6/24/192, 8/32/256
    Plaintext Block Size (words/bytes/bits), 4/16/128, 4/16/128, 4/16/128
    Number of Rounds, 10, 12, 14
    Round Key Size (words/bytes/bits), 4/16/128, 4/16/128, 4/16/128
    Expanded Key Size (words/bytes), 44/176, 52/208, 60/240



AES S-box
-----------

.. csv-table::
    :class: small hexdump        
    :align: center 


    :math:`_y\\^x` ,   0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F
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


AES Inverse S-box
-----------------

.. csv-table::
    :class: small hexdump        
    :align: center 

    :math:`_y\\^x`, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F
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


Avalanche Effect in AES: Change in Plaintext
--------------------------------------------

.. csv-table::        
    :class: tiny hexdump
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
    :class: tiny hexdump
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