#!/usr/bin/env bash

sh ./scripts/tasks/clean.sh

mkdir build/

sh ./scripts/tasks/copy.sh

gulp

#sh ./scripts/tasks/transpile.sh
