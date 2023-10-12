.. meta:: 
    :author: Michael Eichberg
    :keywords: exercise, block cipher operation

.. |date| date::

.. image:: logo.png
    :align: right


IT-Security Cryptography and Secure Communications
==================================================
    
:Excercise: **Block Cipher Operation**
:Lecturer: *Prof. Dr. Michael Eichberg*
:Version: |date|


1. Why is it important in CBC to protect the IV?

  .. solution if the IV is sent as is, we are able to flip some bytes of the plaintext (of the first block) when we change the IV. 


2. In which operation modes is padding necessary?

  .. solution: ECB and CBC (the input to the encryption is a full plaintext block)

3. What happens in case of a transmission error (single bit flip in the ciphertext) in ECB, CBC, CFB, OFB, CTR?
   
  .. solution: 
   ECB: one block is affected
   CBC: in the current block we will have 1 bit flip in the plaintext and 50% in the next block.
   CFB: the error will propagate up to the block size of the encryption algorithm
   OFB, CTR: we will have one bit flipped


4. Why does the IV in OFB has to be a nonce (i.e., unique to each execution of the encryption algorithm)?

  .. solution:  The O_i only depend on the key and the IV, if the IV is reused with the same key and we happen to know a specific plaintext we may be able to decrypt a corresponding ciphertext in a different message.

5. You want to determine if a program for encrypting files uses ECB mode. What do you need to do?

  .. solution:  use a document that consists of n (n>1) data blocks with the block size of the underlying cipher. This enables you to detect if identical blocks are encrypted using the same key.

6. A friend of yours invented a new block cipher. You are **very** skeptical. Think about some very simple tests to invalidate the cipher.
   
   .. solution: 
      - calculate the entropy on a encrypted file when the input was (a) completely homogenous, (b) completely random.
      -  Check what happens if the key is very regular/ random.
      - Check the size before and after the encryption, check if you encrypt the same message using different keys what happens to the ciphertext. Are certain block identical (nearly identical)
      - Go to an expert :-)

7. Use the OFB mode in combination with a Caesar cipher. The block size is a single character. The key is the number of characters you are going to shift the characters - as before. The IV is some character. To make the XOR work we map every character to a value and extend the alphabet with the digits 1 to 3, "!", "?" and the "_". This way it is always possible to output a meaningful character. 

    Hence, we will have the following encoding:

    .. csv-table::
        :header: Index, Character, Binary represenation

        0, A, 00000 
        1, B, 00001 
        2, C, 00010 
        3, D, 00011 
        4, E, 00100 
        5, F, 00101 
        6, G, 00110 
        7, H, 00111 
        8, I, 01000 
        9, J, 01001 
        10, K, 01010 
        11, L, 01011 
        12, M, 01100 
        13, N, 01101 
        14, O, 01110 
        15, P, 01111 
        16, Q, 10000 
        17, R, 10001 
        18, S, 10010 
        19, T, 10011 
        20, U, 10100 
        21, V, 10101 
        22, W, 10110 
        23, X, 10111 
        24, Y, 11000 
        25, Z, 11001 
        26, 1, 11010
        27, 2, 11011
        28, 3, 11100
        29, !, 11101
        30, ?, 11110
        31, "_", 11111

    Now encode some messages using your new cipher. What will you realize?

    .. solution... our substitution cipher is now also performing a permutation and the same character is no longer mapped to the same target; i.e, we have improved confusion.

    .. example: IV A, k =3, M = AA
    .. 1. I_1 = IV = A; E(I_1) = D; C_1 = A \oplus D = D
    .. 2. I_2 = D; E(I_2) = G, C_2 = A \oplus G = G
    
    .. example: M = T
    .. IV Z, E(IV) = 3, C_1 = T \oplus 3 = "P" (10011 \oplus 11100 = 01111 = P) 
  