#!/bin/basg
# Warning: you need to install apidoc in order to run this
# $ npm install -g apidoc
apidoc -i . -f routes/apis.js -o public/apidocs
