#!/bin/zsh -x

rst2ld/rst2ld.py "0-introduction.rst" > "0-introduction.rst.html"
rst2ld/rst2ld.py "1-introduction_to_number_theory.rst" > "1-introduction_to_number_theory.rst.html"
rst2ld/rst2ld.py "2-classical_encryption_techniques.rst" > "2-classical_encryption_techniques.rst.html"
rst2ld/rst2ld.py "3-block_ciphers.rst" > "3-block_ciphers.rst.html"