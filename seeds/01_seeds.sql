INSERT INTO users (id,name,email,password)
VALUES (1,'John','john@gmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (id,name,email,password)
VALUES (2,'Renold','renold@gmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (id,name,email,password)
VALUES (3,'Reeta','reeta@gmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
 
INSERT INTO properties (owner_id,title,description,thumbnail_photo_url,cover_photo_url,cost_per_night,parking_spaces,no_of_bathrooms,no_of_bedrooms,country,street,city,province,post_code,active)
VALUES (1,'Richvilla','description',' ','',200,1,2,3,'Canada','carling','ottawa','ontario','K2E',true);
INSERT INTO properties (owner_id,title,description,thumbnail_photo_url,cover_photo_url,cost_per_night,parking_spaces,no_of_bathrooms,no_of_bedrooms,country,street,city,province,post_code,active)

VALUES (2,'Richvilla','description',' ',' ',100,1,2,2,'Canada','carling Street','ottawa','ontario','K2E',true);
INSERT INTO properties (owner_id,title,description,thumbnail_photo_url,cover_photo_url,cost_per_night,parking_spaces,no_of_bathrooms,no_of_bedrooms,country,street,city,province,post_code,active)

VALUES (3,'Richvilla','description',' ',' ',150,0,2,3,'Canada','woodroff ','ottawa','ontario','K2E',true);

INSERT INTO reservations (start_date,end_date,property_id,guest_id)
VALUES ('2018-09-11', '2018-09-26',1,1);
INSERT INTO reservations (start_date,end_date,property_id,guest_id)
VALUES ('2018-09-27', '2018-10-16',2,2);
INSERT INTO reservations (start_date,end_date,property_id,guest_id)
VALUES ('2018-12-11', '2019-01-01',3,3);

INSERT INTO property_reviews(guest_id,reservations_id,property_id,rating,message)
VALUES (1,1,1,3,'message');
INSERT INTO property_reviews(guest_id,reservations_id,property_id,rating,message)
VALUES (2,2,2,4,'message');
INSERT INTO property_reviews(guest_id,reservations_id,property_id,rating,message)
VALUES (3,3,3,5,'message');

