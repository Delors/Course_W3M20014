initial_a  = 1160718174
a = initial_a
initial_b = 316258250
b = initial_b

if a < b: # initial swap of and b necessary?
    c = a 
    a = b
    b = c

i = 0
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