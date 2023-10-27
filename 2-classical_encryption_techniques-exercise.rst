.. meta:: 
    :author: Michael Eichberg
    :keywords: classical encryption techniques, exercise
    :id: 2023_10-W3M20014-classical_encryption_techniques

.. |date| date::

.. image:: logo.png
    :align: right


IT-Security Cryptography and Secure Communications
==================================================
    
:Exercise: **Classical Encryption Techniques**
:Lecturer: `Prof. Dr. Michael Eichberg <michael.eichberg@dhbw-mannheim.de>`__
:Version: |date|



Playfair Cipher
_______________

Decrypt the ciphertext: ``XGAWMGAZ``. The password is ``MONARCHY`` (as used in the slides.)

.. admonition:: Solution

    ``w(i/j)nXnerX => winner``

Vigenère Cipher
_______________

Let's assume that you got one plaintext / ciphertext pair.

    :P: ``secret``
    :C: ``HSFGSW``

1. Can you recover the key?
   
   .. admonition:: Solution

      The key is: PODPOD.

2. What type of attack were you able to perform?

   .. admonition:: Solution
        
        A plaintext attack.


Rail-fence Cipher
__________________

Encrypt the message: "i love crypto" with the key/depth 3.

.. admonition:: Solution
    
   ::
   
      P = I L O V E C R Y P T O
          1 2 3 1 2 3 1 2 3 1 2    

      C = I V R T L E Y O O C P


Row Transposition Cipher
________________________

You received the following message:

.. class:: monospaced

    YSFRITTUNCOSPJU

Additionally, you were able to extract the key except of one value: 4153.

1. How many possible decryptions are possible?

   .. admonition:: Solution
   
      5: 24153, 42153, 41253, 41523, 41532

2. Can you decrypt the text?
   
   .. admonition:: Solution

      We have five colums (len of key) and therefore three rows.

      Split up in 5 segments of three letter.
      YSF RIT TUN COS PJU

      Write them down in a table:

      ::

         y r t c p   => looks like "crypt" 
         s i u o j   
         f t n s u   

      P = ``crypto is just fun`` (space added for readability.)

3. What is the key?

   .. admonition:: Solution

      ``K = 42153``

Steganography
______________

Uncover the text hiden in the spam message. 

   .. admonition:: Solution

      ``Success``
