#!/bin/bash

# Assumes the gh-pages branch has been checked out to ../hsd-release/
# Use this command:
# > git clone https://github.com/cns-iu/hsd.git -b gh-pages ../hsd-release/

ng build --prod --aot --output-hashing=none --sourcemaps --base-href /hsd/

cp -r dist/* ../hsd-release/
