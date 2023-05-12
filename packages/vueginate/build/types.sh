#!/usr/bin/env bash

set -e          # Abort on nonzero exit status
set -u          # Abort on unbound variable
set -o pipefail # Do not hide errors within pipes

source ./build/colors.sh

function generate_types {
    print "Generating type declarations..."
    vue-tsc --declaration --emitDeclarationOnly --outDir dist/types --rootDir src/ --project tsconfig.app.json
}

function remove_build_info_file {
    if [[ -f "dist/tsconfig.app.tsbuildinfo" ]]; then
        print "Removing tsconfig.app.tsbuildinfo file..."
        rm -f dist/tsconfig.app.tsbuildinfo
    fi
}

function remove_style_import {
    if [[ -r "dist/types/main.d.ts" ]]; then
        print "Removing style import from main.d.ts file..."
        sed -i "/import '.*\.css'\;\?/d" dist/types/main.d.ts

        print "Removing ending comma from export..."
        sed -i 's/,\s*\}/ \}/g' dist/types/main.d.ts
    fi
}

function generate_types_file {
    print "Generating vueginate.d.ts file..."
    echo "export * from './types/main';" > dist/vueginate.d.ts
}

generate_types
remove_build_info_file
remove_style_import
generate_types_file
