#!/bin/bash

# Extensões
exts=('*.js' '*.ts' '*.cs' '*.py')

# Remove saída antiga
rm -f todos-codigos.txt

# Encontra arquivos e processa conteúdo
find . -type f \( -name "*.js" -o -name "*.ts" -o -name "*.cs" -o -name "*.py" \) ! -path "*node_modules*" -print0 | while IFS= read -r -d $'\0' file; do
    echo "===== ${file} =====" >> todos-codigos.txt
    cat "$file" >> todos-codigos.txt
    echo "" >> todos-codigos.txt
done