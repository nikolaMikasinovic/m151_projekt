import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: '127.0.0.1',
  //port: 3307,
  user: 'vmadmin',
  password: 'sml12345',
  database: 'movie-db',
});

await connection.connect();

export async function getAll(userId) {
  const query = `
  SELECT
    movies.id,
    movies.title,
    movies.year,
    IFNULL(ROUND(AVG(ratings.rating),1), 0) AS rating,
    IFNULL((SELECT ratings.rating FROM ratings WHERE ratings.movie = movies.id AND ratings.user = ?), 0) AS userRating
  FROM
    Movies
  LEFT JOIN ratings ON ratings.movie = movies.id
  GROUP BY
    movies.id`;
  const [data] = await connection.query(query, userId);
  return data;
}

async function insert(movie) {
  const query = 'INSERT INTO Movies (title, year) VALUES (?, ?)';
  const [result] = await connection.query(query, [movie.title, movie.year]);
  return { ...movie, id: result.insertId };
}

async function update(movie) {
  const query = 'UPDATE Movies SET title = ?, year = ? WHERE id = ?';
  await connection.query(query, [movie.title, movie.year, movie.id]);
  return movie;
}

export async function get(id) {
  const query = 'SELECT * FROM Movies WHERE id = ?';
  const [data] = await connection.query(query, [id]);
  return data.pop();
}

export async function remove(id) {
  const query = 'DELETE FROM Movies WHERE id = ?';
  await connection.query(query, [id]);
  return;
}

export function save(movie) {
  if (!movie.id) {
    return insert(movie);
  } else {
    return update(movie);
  }
}

export async function rateMovie(userId, movieId, rating) {
  const query = 'INSERT INTO Ratings (user, movie, rating) VALUES (?, ?, ?)'
  await connection.query(query, [userId, movieId, rating]);
}