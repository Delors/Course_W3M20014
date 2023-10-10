.. meta:: 
    :author: Michael Eichberg
    :keywords: classical encryption techniques, exercise
    :id: 2023_10-W3M20014-classical_encryption_techniques

.. |date| date::

.. image:: logo.png
    :align: right


IT-Security Cryptography and Secure Communications
==================================================
    
:Excercise: **Classical Encryption Techniques**
:Lecturer: *Prof. Dr. Michael Eichberg*
:Version: |date|



Playfair Cipher
_______________

Decrypt the ciphertext: ``XGAWMGAZ``. The password is ``MONARCHY`` (as used in the slides.)

.. 
    Solution:
        w(i/j)nXnerX => Winner


Vigenère Cipher
_______________

Let's assume that you got one plaintext / ciphertext pair.

    :P: ``secret``
    :C: ``HSFGSW``

1. Can you recover the key?
   
..
        Solution: 
        the key is: PWDPWD

2. What type of attack were you able to perform?

..
        Solution:
        a simple plaintext attack


Rail-fence Cipher
__________________

Encrypt the message: "i love crypto" with the key/depth 3.

..
    Solution: 

        I L O V E C R Y P T O
        1 2 3 1 2 3 1 2 3 1 2    

        I V R T L E Y O O C P


Row Transposition Cipher
________________________

You received the following message:

.. class:: hexdump

    YSFRITTUNCOSPJU

Additionally, you were able to extract the key except of one value: 4153.

1. How many possible decryptions are possible?

.. 
    Solution:
    5: 
        24153, 42153, 41253, 41523, 41532

2. Can you decrypt the text?
   
.. 
    Solution:

    We have five colums (len of key) and therefore three rows.

    Split up in 5 segments of three letter.
    YSF RIT TUN COS PJU

    Write them down in a table:

      y r t c p   => looks like "crypt" 
      s i u o j   
      f t n s u   

    cryptoisjustfun

3. What is the key?

.. 
        Solution:   
            42153    
            crypto is just fun

Steganography
______________

Uncover the text hiden in the spam message. 

.. 
    Solution:

        Success
