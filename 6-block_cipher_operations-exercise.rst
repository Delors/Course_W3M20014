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
    CBC: in the current block we will have 1 bit flip in the plaintext and ~50% in the next block.
    CFB: the error will propagate up to the block size of the encryption algorithm
    OFB, CTR: we will have one bit flipped


4. Why does the IV in OFB has to be a nonce (i.e., unique to each execution of the encryption algorithm)?

   .. solution:  The O_i only depend on the key and the IV, if the IV is reused with the same key and we happen to know a specific plaintext we may be able to decrypt a corresponding ciphertext in a different message.
