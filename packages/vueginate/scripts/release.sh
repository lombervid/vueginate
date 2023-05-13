#!/usr/bin/env bash

set -e          # Abort on nonzero exit status
set -u          # Abort on unbound variable
set -o pipefail # Do not hide errors within pipes

declare -r SCRIPTS_DIR="$(dirname "$(readlink -f "$0")")"

source "${SCRIPTS_DIR}/settings.sh"

print "Copying README.md..." "Purple"
cp "${ROOT_DIR}/README.md" "${PACKAGE_DIR}/README.md"

print "Copying LICENSE..." "Purple"
cp "${ROOT_DIR}/LICENSE" "${PACKAGE_DIR}/LICENSE"
