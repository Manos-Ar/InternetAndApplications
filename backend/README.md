 # Εγκατάσταση Backend

 Πρώτα ακολουθήστε τις οδηγίες εγκατάστασης της βάσης στο Readme του φακέλου database . Βεβαιωθείτε ότι ο Mysql server τρέχει στο port 3306 . Διαφορετικά βρείτε την  πόρτα στην οποία τρέχει ,συνήθως εντοπίζεται στο αρχείο /etc/mysql/mysql.conf.d/mysqld.cnf και αλλάξτε στο /backend/src/main/resources/application.properties την ζητούμενη πόρτα
 >spring.datasource.url=jdbc:mysql://localhost:port/nba?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC

 Έπειτα,στον φάκελο /backend, εκτελέστε τα παρακάτω για να την εγκατάσταση και την εκκίνηση του api
 >mvn install
 
 >mvn spring-boot:run
