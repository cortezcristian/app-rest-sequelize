#!/bin/bash
for i in {1..105}
do
   echo "Welcome $i times"
   mocha test/unit
done
