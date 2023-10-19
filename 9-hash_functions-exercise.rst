.. meta:: 
    :author: Michael Eichberg
    :keywords: exercise, hash functions

.. |date| date::

.. image:: logo.png
    :align: right


IT-Security Cryptography and Secure Communications
==================================================
    
:Exercise: **Hash Functions**
:Lecturer: *Prof. Dr. Michael Eichberg*
:Version: |date|

1. Why is a simple hash function that computes a 256bit hash value by performing an XOR over all blocks of a message generally inapproriate?

.. Depending on the nature of the underlying data we may be able to recover the original message. E.g., imagine that only the first block contains meaningful data and all other block are just "0"; additionally, we may not make use of all bits.


2. Compute the MD5 and SHA256 hash of a file that just contains "0x00" values. What happens if the file is longer? 

  (Hint: use ``dd`` to read zeros from ``/dev/zero`` and ``md5(sum)`` and ``sha(256)sum`` tools on your computer. On Windows use the Linux subsystem, a virtual machine, ...)

  .. Solution: just to convince yourself that it is effective.
    395  dd if=/dev/zero of=/tmp/zero bs=1 count=1024
    396  xxd /dev/zero
     % md5 /tmp/zero
      MD5 (/tmp/zero) = 0f343b0931126a20f133d67c2b018a3b
    % shasum -a 256 /tmp/zero
      5f70bf18a086007016e948b04aed3b82103a36bea41755b6cddfaf10ace3c6ef  /tmp/zero


3. Why are second-preimage resistance and collision resistance not relevant if the hash algorithm is used for password hashing?

.. Solution: we don't have a block of the message to work with and we don't get any advantage from finding two different messages that have the same hash. 


4. Where is the problem when you apply a simple XOR to the 64bit blocks of a message and then encrypt the entire message using DES with CBC mode. (Hence, our hash is also encrypted!)
   
   .. solution if the ciphertext blocks are permuted, the hash would not detect it.


5. Determine the passwords hashed with plain MD5:
   
  1. ``81dc9bdb52d04dc20036dbd8313ed055``
   
      Hint: the password is short and just consits of digits!

      .. solution: 1234

  2. ``7c6a180b36896a0a8c02787eeafb0e4c``
    
      Hint: the password consists of letters and digits. However, it is a password used very frequently.

      .. solution: password1
  
  You can use Hashcat (https://hashcat.net/hashcat/) or write a bash script or develop a small solution in the programming language of your choice.
   

6. Why is it important that hashing of passwords is deliberately inefficient while other cryptographic hash functions strive for efficiency? In both cases, we want to thwart an attack!