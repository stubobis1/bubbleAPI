#!/bin/bash

git pull
git reset --hard
pm2 start -i max ./bin/www