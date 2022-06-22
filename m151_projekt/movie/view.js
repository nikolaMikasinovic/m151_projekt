export function render(movies) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Movie list</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
<a href="/logout">abmelden</a>
  <table>
    <thead><tr><th>Id</th><th>Title</th><th></th><th></th></tr></thead>
    <tbody>
      ${movies
        .map(
          (movie) => `
        <tr>
          <td>${movie.id}</td>
          <td>${movie.title}</td>
          <td>
            ${renderRatingStars(movie.userRating, movie.id)}
          </td>
          <td>${movie.rating}</td>
          <td><a href="/movie/delete/${movie.id}">löschen</a></td>
          <td><a href="/movie/form/${movie.id}">bearbeiten</a></td> 
        </tr>`,
        )
        .join('')}
    </tbody>
  </table>
  <a href="/movie/form">neu</a>
</body>
</html>
  `;
}

function renderRatingStars(stars, movieId) {
  let str = "";
  for (let i = 1; i <= 5; i++) {
    if (stars <= 0) {
      str += `<a href="/movie/rating/${movieId}/${i}">`;
      if (stars >= i) {
          str += "★";
      } else {
          str += "☆";
      }
      str += "</a>";
    } else { // Low budget implementation of user can only rate movie once
      str += `<a>`;
      if (stars >= i) {
          str += "★";
      } else {
          str += "☆";
      }
      str += "</a>";
    }
     
  }
  return str;
}
