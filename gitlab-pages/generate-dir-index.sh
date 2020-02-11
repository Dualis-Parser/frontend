#!/bin/bash

OUTPUT="index.html"
echo "<html><head><title>Code coverage reports</title><link rel='stylesheet' href='styles.css'></head><body>" > $OUTPUT

echo "<ul>" >> $OUTPUT
for filepath in $(find . -maxdepth 1 -mindepth 1 -type d| sort); do
  echo "  <li><a href=\"$filepath/\">$filepath</a></li>" >> $OUTPUT
done
echo "</ul>" >> $OUTPUT

echo "</body></html>"
