INSERT INTO users (id,name,email,password)
VALUES (1001,'John','john@gmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (id,name,email,password)
VALUES (1002,'Renold','renold@gmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (id,name,email,password)
VALUES (1003,'Reeta','reeta@gmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
 
INSERT INTO properties (id,owner_id,title,description,thumbnail_photo_url,cover_photo_url,cost_per_night,parking_spaces,number_of_bathrooms,number_of_bedrooms,country,street,city,province,post_code,active)
VALUES (1001,1001,'Richvilla','description',' https://images.pexels.com/photos/1756826/pexels-photo-1756826.jpeg?auto=compress&cs=tinysrgb&h=350','https://images.pexels.com/photos/1756826/pexels-photo-1756826.jpeg',200,1,2,3,'Canada','carling','ottawa','ontario','K2E',true);
INSERT INTO properties (id,owner_id,title,description,thumbnail_photo_url,cover_photo_url,cost_per_night,parking_spaces,number_of_bathrooms,number_of_bedrooms,country,street,city,province,post_code,active)
VALUES (1002,1002,'Richvilla','description',' https://images.pexels.com/photos/1475938/pexels-photo-1475938.jpeg?auto=compress&cs=tinysrgb&h=350',' https://images.pexels.com/photos/1475938/pexels-photo-1475938.jpeg',100,1,2,2,'Canada','carling Street','ottawa','ontario','K2E',true);
INSERT INTO properties (id,owner_id,title,description,thumbnail_photo_url,cover_photo_url,cost_per_night,parking_spaces,number_of_bathrooms,number_of_bedrooms,country,street,city,province,post_code,active)
VALUES (1003,1003,'Richvilla','description',' https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&h=350' ,'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg ',150,0,2,3,'Canada','woodroff ','ottawa','ontario','K2E',true);

INSERT INTO reservations (id,start_date,end_date,property_id,guest_id)
VALUES (1001,'2018-09-11', '2018-09-26',1001,1001);
INSERT INTO reservations (id,start_date,end_date,property_id,guest_id)
VALUES (1002,'2018-09-27', '2018-10-16',1002,1002);
INSERT INTO reservations (id,start_date,end_date,property_id,guest_id)
VALUES (1003,'2018-12-11', '2019-01-01',1003,1003);

INSERT INTO property_reviews(guest_id,reservation_id,property_id,rating,message)
VALUES (1001,1001,1001,3,'message');
INSERT INTO property_reviews(guest_id,reservation_id,property_id,rating,message)
VALUES (1002,1002,1002,4,'message');
INSERT INTO property_reviews(guest_id,reservation_id,property_id,rating,message)
VALUES (1003,1003,1003,5,'message');
