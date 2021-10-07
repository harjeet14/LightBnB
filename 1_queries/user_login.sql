-- Get details about a single user.
SELECT users.id,name,email,password
FROM users
 WHERE email = 'tristanjacobs@gmail.com';

-- Get the average duration of all reservations.
SELECT AVG(end_date - start_date)AS average_duration
FROM  reservations;

-- Show all details about properties located in Vancouver including their average rating.
SELECT properties.*,AVG(property_reviews.rating) AS average_review
FROM properties
JOIN property_reviews ON property_reviews.property_id= properties.id
WHERE properties.city LIKE '%ncouve%' 
GROUP BY properties.id
HAVING avg(property_reviews.rating) >= 4
ORDER BY cost_per_night 
LIMIT 10;

-- Get a list of the most visited cities
SELECT properties.city , 
COUNT(reservations) AS number_of_reservations
FROM reservations
JOIN properties ON property_id = properties.id
GROUP BY properties.city
ORDER BY number_of_reservations DESC;

-- -- Show all reservations for a user.

SELECT reservations.*,properties.*,AVG(rating) AS average_review
FROM reservations
JOIN property_reviews ON reservation_id = reservations.id
JOIN properties ON reservations.property_id = properties.id
WHERE reservations.guest_id = 1 
AND reservations.end_date < now()::date
GROUP BY reservations.id,properties.id
ORDER BY reservations.start_date
LIMIT 10;
