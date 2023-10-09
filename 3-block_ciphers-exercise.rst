.. meta:: 
    :author: Michael Eichberg
    :keywords: Block Ciphers
    :description lang=en: Block Ciphers
    :description lang=de: Blockverschlüsselung
    :id: 2023_10-W3M20014-block_ciphers-exercise

.. |date| date::

IT-Security Cryptography and Secure Communications
==================================================

**Exercise: Block Ciphers**


:Lecturer: **Prof. Dr. Michael Eichberg**
:Version: |date|



Feistel Cipher
--------------


1. Implement a feistel chiper in the programming language of your choice (e.g., Java, Scala, Python, C, (JavaScript) ...) that enables you to: 
   
   - encrypt and decrypt messages
   - encrypt blocks of 128 bits
   - easily exchange the function :math:`f` to test the effect of :math:`f` (depending on the language of your choice you can, e.g, use native higher order functions or a function pointer)
   - you can use a function that produces the round keys by simply shifting the key
  
    .. note::

        Don't worry about messages that are larger or smaller than the block size. This is not necessary to understand the impact of :math:`f` or using a round key. Don't worry about a key that does not have the appropriate size.

    .. note::

        Don't optimize; don't waste time on ... This is not the time to learn a new programming language or a tool.    

2. What happens if `f` just returns `0x00` values (independent of the round key)?
3. What happens if `f` just returns `0x01` values (independent of the round key)?
4. What happens if `f` simply xors the respective half with the result of the shift of the key?
5. Test what happens when you change your message. In particular test what happens when the message just consists of `0x00` (and you use a "more reasonable" `f` function.)
6. Test what happens when you change your key. What happens in extrem cases (e.g., the password just consists of "0"s?
7. Do you see any issues when the message is very regular, i.e.,