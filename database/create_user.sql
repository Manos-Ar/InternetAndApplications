
DROP USER IF EXISTS 'user'@'localhost';

CREATE USER 'user'@'localhost' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON * . * TO 'user'@'localhost';

FLUSH PRIVILEGES;
