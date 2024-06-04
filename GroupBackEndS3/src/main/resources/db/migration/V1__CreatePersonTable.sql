CREATE TABLE person (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(50),
    phone_number varchar(50) NOT NULL,
    license_plate varchar(50) NOT NULL,
    role varchar(50),
    primary key (id),
    UNIQUE (license_plate),
    UNIQUE (phone_number)
)