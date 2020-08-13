#!/usr/bin/env bash

mysql -u root -p < create_database.sql

mysql -u root -p < create_user.sql
