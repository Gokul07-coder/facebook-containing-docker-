const mysql = require("mysql");
const express = require("express");
const env = require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  // database : process.env.DATABASE
});

db.connect((err) => {
  if (err) console.log("Connection Failed", err);
  else console.log("Connection Success");

  db.query("CREATE DATABASE fb", function (err, result) {
    if (err) throw err;
    console.log("Created database fb");

    // Switch to the new database
    db.query("USE fb", function (err, result) {
      if (err) throw err;
      console.log("Using database fb");

      db.query(
        `CREATE TABLE account (
    id INT(11) NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(150) NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    email VARCHAR(200) NOT NULL,
    phone BIGINT NOT NULL,
    password VARCHAR(250) NOT NULL,
    account_type ENUM('Private','Public') NOT NULL DEFAULT 'Private',
    dob DATE NOT NULL,
    gender ENUM('Male','Female','Transgender') NOT NULL,
    profile VARCHAR(300) DEFAULT NULL,
    cover VARCHAR(300) DEFAULT NULL,
    isVerified TINYINT(1) DEFAULT '0',
    token VARCHAR(500) DEFAULT NULL,
    anotherEmail VARCHAR(250) DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY email (email),
    UNIQUE KEY phone (phone)
  )`,
        (err, res) => {
          if (err) throw err;
          console.error("created Account");

          db.query(
            `INSERT INTO account (first_name,last_name,email,phone,password,account_type,dob,gender,profile,cover,isVerified,token,anotherEmail) VALUES 
            ('Gokul','M','mgokul@gmail.com',9364521458,'$2b$05$4xyW0kR2oQSfVHyBtvp7P.p8QnNFOkH.tEbgsxYVDRL.BYZ4qkujG','Private','2002-03-03','Male',NULL,NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJFbWFpbCI6Im1nb2t1bEBnbWFpbC5jb20iLCJpYXQiOjE2Nzg3MDI0NDAsImV4cCI6MTY3ODc4ODg0MH0.lXBo-WcjTUDTPYU9fqe_U5dP0iRYGBPEJdAgdlTog08',NULL),
            ('Dhanush','M','theinvesterofficial@gmail.com',9361405521,'$2b$05$XKs8rZwAfCuahX76wJi/D.aAzHuQ1gYu4.9F5kPdPnTLaogRdV9eK','Private','2002-07-07','Male',NULL,NULL,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozMywiRW1haWwiOiJ0aGVpbnZlc3Rlcm9mZmljaWFsQGdtYWlsLmNvbSIsImlhdCI6MTY4MDA3NTcyNCwiZXhwIjoxNjgwMTYyMTI0fQ.ftdykm3uckpKDdsCsIHtHs3hq0ocmHfiUGlXNKP_Ak8',NULL),
            ('Naveen','M','mgoku0707@gmail.com',9361045521,'$2b$05$anKBakDgTHDJYama3eKw7eJsF3BaWtnz../wOnbwjJ0BsFoeHXh1K','Private','2002-07-07','Male',NULL,NULL,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozNSwiZW1haWwiOiJtZ29rdTA3MDdAZ21haWwuY29tIiwiaWF0IjoxNjc3NjQ5NjkzLCJleHAiOjE2Nzc2NTMyOTN9.VdIPURjteC9_5QzgoMiGTa7nEd9FNefh_WC6JJ1mYP0',NULL),
            ('Rakesh','M','vigneshrm@gmail.com',9361078521,'$2b$05$1mxAsm0XFmTIvEXCPU5QuOLnMQsxpgl4tt9x7cWrrrekkKZ5DNvru','Private','2002-07-07','Male',NULL,NULL,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozNiwiRW1haWwiOiJ2aWduZXNocm1AZ21haWwuY29tIiwiaWF0IjoxNjc4Njk5MDEyLCJleHAiOjE2Nzg3ODU0MTJ9.65qqbADVu0o3W000XZknZ5U5chnFgY6yDurF9yBTq00',NULL),
            ('Maddy','M','nari@gmail.com',8361012521,'$2b$05$HV9VRJ/I5Bs2SOfjPOgMd.6YtGifciuuAUdJ1bJww3B8UHRdskhLm','Private','2002-07-07','Male','http://res.cloudinary.com/dfvkaaj5l/image/upload/v1677823344/Home/profile_pic/lraf4snee0kekeaqdv6k.jpg','http://res.cloudinary.com/dfvkaaj5l/image/upload/v1677756544/Home/profile_pic/r9ajdh6gnorylxy6efj5.jpg',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozOSwiRW1haWwiOiJuYXJpQGdtYWlsLmNvbSIsImlhdCI6MTY4MDU5OTk2MiwiZXhwIjoxNjgwNjg2MzYyfQ.iwo_ORt2AOY99UKo7E6uqSlNskHJufMKdbetxpPP9zk',NULL),
            ('Naruto','M','qwer@gmail.com',7418529637,'$2b$05$NoOnjeCkjXayt4gWv0lZs.M4OKl0N9zodsYfZL83gNSeu6CyQPX0K','Private','2006-03-07','Female',NULL,NULL,0,NULL,NULL),
            ('Manudev','M','mgokul0707@gmail.com',7418525637,'$2b$05$IPH0/mG9OqxiZDT5TGJ/JuCRTRS8xHjt0lck/jYRlmKQ0sf9xdN8y','Private','2023-03-23','Male',NULL,NULL,0,NULL,NULL),
            ('uchiha','Shyam','shyamvenkat007@gmail.com',7418529634,'$2b$05$7tKXZuQs9kRBr04URilqHuZFTewgK2pbx5e8S96aUQlFeHy.QsfEu','Private','2001-05-07','Male',NULL,NULL,0,NULL,NULL)`,
            (err, res) => {
              if (err) throw err;
              console.log("Data inserted Successfully");
            }
          );
        }
      );
    });
  });
});

module.exports = db;
