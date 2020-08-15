#!/bin/bash

trap 'kill 0' EXIT

(pushd ./client; python3 -m http.server; popd) &
python3 ./server/server.py

wait
