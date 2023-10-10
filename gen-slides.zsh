#!/bin/zsh 

function update_html_if_necessary() {
    html_file="$1.html"   
    if [[ ! -f "$html_file" || "$html_file" -ot "$1" ]]
    then
        echo "generating:" $html_file 
        rst2ld/rst2ld.py "$1" > "$html_file"       
    else
        echo "up to date:" $html_file 
    fi
}

function update_all_html_if_necessary() {
    for f in "$@"
    do
        # echo "processing $f"
        update_html_if_necessary "$f"
    done
}

update_all_html_if_necessary \
    "0-introduction.rst" \
    "1-introduction_to_number_theory.rst" \
    "2-classical_encryption_techniques.rst" \
    "3-block_ciphers.rst" \
    "4-finite_fields.rst" \
    "5-aes.rst" \
    "6-block_cipher_operations.rst" \
    "7-stream_ciphers.rst" \
    "8-public_key_cryptography.rst" \
    "9-hash_functions.rst"