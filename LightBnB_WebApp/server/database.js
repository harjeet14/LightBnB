const { Pool } = require('pg');
const properties = require('./json/properties.json');

const users = require('./json/users.json');
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  return pool.query(`
  SELECT *
  FROM users
  WHERE email= $1`
    , [`${email.toLowerCase()}`])
    .then(result => result.rows[0])
    .catch(err => console.log(err));

}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  return pool.query(`
  SELECT *
  FROM users
  WHERE id= $1`
    , [id])
    .then(result => result.rows[0])
    .catch(err => console.log(err));
  // return Promise.resolve(users[id]);
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  return pool.query(`
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
  `, [user.name, user.email, user.password])
    .then(result => result.rows[0]);
}

exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getFulfilledReservations = function (guest_id, limit = 10) {
  const queryString = `
  SELECT properties.*, reservations.*, avg(rating) as average_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id 
  WHERE reservations.guest_id = $1
  AND reservations.end_date < now()::date
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT $2;`;
  const params = [guest_id, limit];
  return pool.query(queryString, params)
    .then(res => res.rows);
}
exports.getFulfilledReservations = getFulfilledReservations;

// Properties
/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function (options, limit = 10) {

  // Previous working code
  // return pool.query(`
  // SELECT * 
  // FROM properties
  // LIMIT $1`, [limit])
  //   .then(result => result.rows)
  //   .catch(err => console.log(err));


  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;
  console.log(options);

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length}`;
    console.log("city", queryParams.length);
  }

  if (options.owner_id) {
    queryParams.push(Number(options.owner_id));
    (queryParams.length === 1) ? queryString += ` WHERE` : queryString += ` AND`;
    queryString += ` owner_id = $${queryParams.length}`;
  }
  if (options.minimum_price_per_night) {
    queryParams.push(Number(options.minimum_price_per_night) * 100);
    (queryParams.length === 1) ? queryString += ` WHERE` : queryString += ` AND`;
    queryString += ` cost_per_night >= $${queryParams.length}`;
  }

  if (options.maximum_price_per_night) {
    queryParams.push(Number(options.maximum_price_per_night) * 100);
    (queryParams.length === 1) ? queryString += ` WHERE` : queryString += ` AND`;
    queryString += ` cost_per_night <= $${queryParams.length}`;
  }

  if (options.minimum_rating) {
    queryParams.push(Number(options.minimum_rating));
    (queryParams.length === 1) ? queryString += ` WHERE` : queryString += ` AND`;

    queryString += ` property_reviews.rating >= $${queryParams.length}`;
    console.log("Rating", queryParams.length);
  }

  // 4
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  console.log(queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams).then((res) => res.rows);
};
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const queryString = `INSERT INTO
  properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, number_of_bathrooms, number_of_bedrooms, street, city, province, post_code, country)
  VALUES
  ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`;

  const values = [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night, property.number_of_bathrooms, property.number_of_bedrooms, property.street, property.city, property.province, property.post_code, property.country];

  return pool
    .query(queryString, values)
    .then(result => console.log(result))
    .catch((err) => err.message);
}
//   const propertyId = Object.keys(properties).length + 1;
//   property.id = propertyId;
//   properties[propertyId] = property;
//   return Promise.resolve(property);
// }

exports.addProperty = addProperty;
const addReservation = function (reservation) {
  /*
   * Adds a reservation from a specific user to the database
   */
  return pool.query(`
    INSERT INTO reservations (start_date, end_date, property_id, guest_id)
    VALUES ($1, $2, $3, $4) RETURNING *;
  `, [reservation.start_date, reservation.end_date, reservation.property_id, reservation.guest_id])
    .then(res => res.rows[0])
}
exports.addReservation = addReservation;

const getUpcomingReservations = function (guest_id, limit = 10) {
  const queryString = `
  SELECT properties.*, reservations.*, avg(rating) as average_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id 
  WHERE reservations.guest_id = $1
  AND reservations.start_date > now()::date
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT $2;`;
  const params = [guest_id, limit];
  return pool.query(queryString, params)
    .then(res => res.rows);
}
exports.getUpcomingReservations = getUpcomingReservations;

const getIndividualReservation = function (reservationId) {
  const queryString = `SELECT * FROM reservations WHERE reservations.id = $1`;
  return pool.query(queryString, [reservationId])
    .then(res => res.rows[0]);
}
exports.getIndividualReservation = getIndividualReservation;

//
//  Updates an existing reservation with new information
//
const updateReservation = function (reservationData) {
  // base string
  let queryString = `UPDATE reservations SET `;
  const queryParams = [];
  if (reservationData.start_date) {
    queryParams.push(reservationData.start_date);
    queryString += `start_date = $1`;
    if (reservationData.end_date) {
      queryParams.push(reservationData.end_date);
      queryString += `, end_date = $2`;
    }
  } else {
    queryParams.push(reservationData.end_date);
    queryString += `end_date = $1`;
  }
  queryString += ` WHERE id = $${queryParams.length + 1} RETURNING *;`
  queryParams.push(reservationData.reservation_id);
  console.log(queryString);
  return pool.query(queryString, queryParams)
    .then(res => res.rows[0])
    .catch(err => console.error(err));
}

exports.updateReservation = updateReservation;

//
//  Deletes an existing reservation
//
const deleteReservation = function (reservationId) {
  const queryParams = [reservationId];
  const queryString = `DELETE FROM reservations WHERE id = $1`;
  return pool.query(queryString, queryParams)
    .then(() => console.log("Successfully deleted!"))
    .catch(err => console.error(err));
}
exports.deleteReservation = deleteReservation;