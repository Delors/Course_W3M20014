.. meta:: 
    :author: Michael Eichberg
    :keywords: Block Ciphers
    :description lang=en: Block Ciphers
    :description lang=de: Blockverschlüsselung
    :id: 2023_10-W3M20014-block_ciphers
    :first-slide: last-viewed

.. |date| date::

.. role:: incremental


Block Ciphers and the Data Encryption Standard 
===============================================

:Lecturer: **Prof. Dr. Michael Eichberg**
:Version: |date|

.. image:: logo.svg
    :alt: DHBW CAS Logo
    :scale: 4
    :class: logo


Stream Cipher
--------------

- Encrypts a digital data stream one bit or one byte at a time. Examples: Autokeyed Vigenère cipher and  Vernam cipher

- In the ideal case, a one-time pad version of the Vernam cipher would be used, in which the keystream is as long as the plaintext bit stream.

    .. class:: smaller

       - If the cryptographic keystream is random, then this cipher is unbreakable by any means other than acquiring the keystream

        .. class:: smaller

          • Keystream must be provided to both users in advance via some independent and secure channel
          • This introduces insurmountable logistical problems if the intended data traffic is very large
        

Stream Cipher
--------------

- For practical reasons the bit- stream generator must be implemented as an algorithmic procedure so that the cryptographic bit stream can be produced by both users
    - It must be computationally impractical to predict future portions of the bit stream based on previous portions of the bit stream.
    - The two users need only share the generating key and each can produce the keystream.


Block Cipher
-------------

- A block of plaintext is treated as a whole and used to produce a ciphertext block of equal length.
- Typically a block size of 64 or 128 bits is used.
- As with a stream cipher, the two users share a symmetric encryption key.
- The majority of network-based symmetric cryptographic applications make use of block ciphers.


Stream Cipher vs. Block Cipher
------------------------------

.. image:: 3-stream_cipher.svg
    :align: left

.. image:: 3-block_cipher.svg
    :align: right
   

General n-bit-n-bit Block Substitution (n = 4)
-----------------------------------------------




Encryption and Decryption Tables for Substitution Cipher
---------------------------------------------------------

.. list-table:: Encryption Table
    :align: center
    :class: small
        
    * - Plaintext	
      - 0000
      - 0001
      - 0010
      - 0011
      - 0100
      - 0101
      - 0110
      - 0111
      - 1000
      - 1001
      - 1010
      - 1011
      - 1100
      - 1101
      - 1110
      - 1111
    * - Ciphertext
      - 1110
      - 0100
      - 1101
      - 0001
      - 0010
      - 1111
      - 1011
      - 1000
      - 0011
      - 1010
      - 0110
      - 1100
      - 0101
      - 1001
      - 0000
      - 0111


.. list-table:: Decryption Table
    :align: center
    :class: small

    * - Ciphertext	
      - 0000
      - 0001
      - 0010
      - 0011
      - 0100
      - 0101
      - 0110
      - 0111
      - 1000
      - 1001
      - 1010
      - 1011
      - 1100
      - 1101
      - 1110
      - 1111
    * - Plaintext
      - 1110
      - 0011
      - 0100
      - 1000
      - 0001
      - 1100
      - 1010
      - 1111
      - 0111
      - 1101
      - 1001
      - 0110
      - 1011
      - 0010
      - 0000
      - 0101
 

Feistel Cipher
--------------

Feistel proposed the use of a cipher that alternates substitutions and permutations.

.. admonition:: Substitutions
    :class: incremental

    Each plaintext element or group of elements is uniquely replaced by a corresponding ciphertext element or group of elements

.. admonition:: Permutation
    :class: incremental

    No elements are added or deleted or replaced in the sequence, rather the order in which the elements appear in the sequence is changed


Feistel Cipher - Background
---------------------------

- This is a practical application of a proposal by Claude Shannon to develop a product cipher that alternates confusion and diffusion functions.

- It is the structure used by many significant symmetric block ciphers currently in use


Diffusion and Confusion
------------------------

- Terms introduced by Claude Shannon to capture the two basic building blocks for any cryptographic system.
- Shannon’s concern was to thwart cryptanalysis based on statistical analysis.

**Diffusion** and Confusion
---------------------------

.. admonition:: Diffusion

    - The statistical structure of the plaintext is dissipated into long-range statistics of the ciphertext
    - This is achieved by having each plaintext digit affect the value of many ciphertext digits.
    - Diffusion can be achieved, e.g., by permutations.

Diffusion and **Confusion**
---------------------------


.. admonition:: Confusion

    - Seeks to make the relationship between the statistics of the ciphertext and the value of the encryption key as complex as possible
    - Even if the attacker can get some handle on the statistics of the ciphertext, the way in which the key was used to produce that ciphertext is so complex as to make it difficult to deduce the key
    - Confusion can be realized, e.g., by substitutions.