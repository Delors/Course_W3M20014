#!/bin/zsh 

function update_html_if_necessary() {
    html_file="$1.html"   
    if [[ ! -f "$html_file" || "$html_file" -ot "$1" ]]
    then
        echo "$(date) updating:" $html_file 
        rst2ld/rst2ld.py "$1" > "$html_file"       
    else
        # [debug] echo "up to date:" $html_file 
    fi
}

function update_all_html_if_necessary() {
    for f in "$@"
    do
        # echo "processing $f"
        update_html_if_necessary "$f"
    done
}

function update_pdf_if_necessary() {
    pdf_file="$1.pdf"   
    if [[ ! -f "$pdf_file" || "$pdf_file" -ot "$1" ]]
    then
        echo "$(date) updating:" $pdf_file 
        /Users/Michael/Library/Python/3.12/bin/rst2pdf "$1" -o "$pdf_file"       
    else
        #[debug] echo "up to date:" $pdf_file 
    fi
}

function update_all_pdf_if_necessary() {
    for f in "$@"
    do
        # echo "processing $f"
        update_pdf_if_necessary "$f"
    done
}

echo "Checks every couple of seconds if some file needs to be regenarated."
echo "Press CTRL+C to terminate"
while true
do
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

    update_all_pdf_if_necessary \
        "1-introduction_to_number_theory-exercise.rst" \
        "2-classical_encryption_techniques-exercise.rst" \
        "3-block_ciphers-exercise.rst" \
        "4-finite_fields-exercise.rst" \
        "5-aes-exercise.rst" \
        "6-block_cipher_operations-exercise.rst" \
        "8-public_key_cryptography-exercise.rst" \
        "9-hash_functions-exercise.rst" 

    sleep 3
done