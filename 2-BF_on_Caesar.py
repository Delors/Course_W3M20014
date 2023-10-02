#!/usr/bin/python3
from functools import partial

C = "PHHW PH DIWHU WKH WRJD SDUWB"

def decrypt(k,c : int) -> str:
    if (c == " "):
        return c
    else:
        # A has the value 65 
        p = (((ord(c)-65) - k) % 26) + 65
        return chr(p)

for k in range (1,26):
    d = partial(decrypt,k)
    p = str(k)+ " "+"".join(list(map(d,C)))
    print(p)
