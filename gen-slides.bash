#!/bin/zsh -x

rst2ld/rst2ld.py "0-Introduction.rst" > "0-Introduction.rst.html"
rst2ld/rst2ld.py "1-Introduction to Number Theory.rst" > "1-Introduction to Number Theory.rst.html"
rst2ld/rst2ld.py "2-Classical Encryption Techniques.rst" > "2-Classical Encryption Techniques.rst.html"