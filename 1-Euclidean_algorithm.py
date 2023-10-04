"""
    Computes the GCD of two numbers a and b.
"""

initial_a = a = 1160718174
initial_b = b = 316258250

if a < b: # initial swap of and b necessary?
    c = a 
    a = b
    b = c

i = 0 # just the number of the step
while True:
    i += 1 
    q = a // b
    r = a % b
    print(f"{i}, {a}, {b}, {q}, {r}")
    if r > 0:
        a = b
        b = r
    else :
        break

print(f"gcd of a={initial_a} and b={initial_b} is {b}")