#!/bin/bash

git pull
git reset --hard
pm2 ./bin/www