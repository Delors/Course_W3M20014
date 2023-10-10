.. meta:: 
    :author: Michael Eichberg
    :keywords: Block Cipher Operation
    :description lang=en: Block Cipher Operations
    :description lang=de: Betriebsmodi bei Blockchiffren
    :id: 2023_10-W3M20014-block_cipher_operations
    :first-slide: last-viewed

.. |date| date::

.. role:: incremental
.. role:: ger
.. role:: red
.. role:: green 
.. role:: blue 
    
    

Block Cipher Operations
===============================================

:Lecturer: **Prof. Dr. Michael Eichberg**
:Version: |date|
:Based on: *Cryptography and Network Security - Principles and Practice, 8th Edition, William Stallings*


.. image:: logo.svg
    :alt: DHBW CAS Logo
    :scale: 4
    :class: logo


Multiple Encryption
-------------------------------

TODO


Meet-in-the-Middle Attack
--------------------------


Triple-DES with Two-Keys
-------------------------

Obvious counter to the meet-in-the-middle attack is to use three stages of encryption with three different keys
• This raises the cost of the meet-in-the-middle attack to :math:`2^{112}`, which is beyond what is practical
• Has the drawback of requiring a key length of :math:`56 x 3 = 168\,bits`, which may be somewhat unwieldy
• As an alternative Tuchman proposed a triple encryption method that uses only two keys
3DES with two keys is a relatively popular alternative to DES and has been adopted for use in the key management standards ANSI X9.17 and ISO 8732


Triple-DES with Three-Keys
--------------------------


Modes of Operation
--------------------

• A technique for enhancing the effect of a cryptographic algorithm or adapting the algorithm for an application
• To apply a block cipher in a variety of applications, five modes of operation have been defined by NIST
• The five modes are intended to cover a wide variety of applications of encryption for which a block cipher could be used
• These modes are intended for use with any symmetric block cipher, including triple DES and AES

