#!/bin/zsh -x

function update_html_if_necessary {

    html_file="{$1}.html"
    if [ ! -f $html_file ]; then
        rst2ld/rst2ld.py "$1" > "$html_file"       
    else
        echo $html_file "is already up to date"
    fi
}

update_html_if_necessary("0-introduction.rst")

rst2ld/rst2ld.py "0-introduction.rst" > "0-introduction.rst.html"
rst2ld/rst2ld.py "1-introduction_to_number_theory.rst" > "1-introduction_to_number_theory.rst.html"
rst2ld/rst2ld.py "2-classical_encryption_techniques.rst" > "2-classical_encryption_techniques.rst.html"
rst2ld/rst2ld.py "3-block_ciphers.rst" > "3-block_ciphers.rst.html"
rst2ld/rst2ld.py "4-finite_fields.rst" > "4-finite_fields.rst.html"