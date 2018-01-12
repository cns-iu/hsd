#!/bin/bash

ng build --prod --aot --output-hashing=none --sourcemaps --base-href /hsd/

cp -r dist/* ../hsd-release/
