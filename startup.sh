#!/bin/bash

git pull
git reset --hard
pm2 start ./bin/www -i max