#!/usr/bin/env bash

CURRENT_DIR="$(dirname "$(readlink -f "$0")")"

declare -r PACKAGE_DIR="$(dirname ${CURRENT_DIR})"
declare -r PACKAGES_DIR="$(dirname ${PACKAGE_DIR})"
declare -r ROOT_DIR="$(dirname ${PACKAGES_DIR})"
declare -r SCRIPT="$( basename "$0")"

# Reset
Reset='\033[0m'       # Text Reset

# Regular Colors
Black='\033[0;30m'        # Black
Red='\033[0;31m'          # Red
Green='\033[0;32m'        # Green
Yellow='\033[0;33m'       # Yellow
Blue='\033[0;34m'         # Blue
Purple='\033[0;35m'       # Purple
Cyan='\033[0;36m'         # Cyan
White='\033[0;37m'        # White

function print() {
    COLOR="${2:-Cyan}"
    echo -e "${!COLOR}[script:${SCRIPT%.sh}]${Reset} ${Green}${1:-}${Reset}"
}
