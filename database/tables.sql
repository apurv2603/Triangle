-- Clean out tables if they already exist
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS WeeklyDj;
DROP TABLE IF EXISTS DjSched;
DROP TABLE IF EXISTS DjDesc;
DROP TABLE IF EXISTS Senority;
-- Create Schemas
CREATE TABLE Users(
  Email VARCHAR(255),
  Initials VARCHAR(255),
  Role VARCHAR(255),
  Salt VARCHAR(255),
  Password VARCHAR(255),
  PRIMARY KEY (Email)
);

CREATE TABLE WeeklyDj(
  Email VARCHAR(255),
  Dj VARCHAR(255),
  Week Int,
  Status VARCHAR(255),
  PRIMARY KEY(Email, Dj),
  FOREIGN KEY(Email) REFERENCES Users(Email)
);

CREATE TABLE DjSched(
    Email VARCHAR(255),
    Day DATE,
    PRIMARY KEY(Email),
    FOREIGN KEY(Email) REFERENCES Users(email)
);

CREATE TABLE DjDesc(
  Dj VARCHAR(255),
  Description VARCHAR(255),
  PRIMARY KEY (Dj)
);

CREATE TABLE Senority(
    Email VARCHAR(255),
    Points Decimal(10),
    PRIMARY KEY(Email),
    FOREIGN KEY(Email) REFERENCES Users(email)
);

