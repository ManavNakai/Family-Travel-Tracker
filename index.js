import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";

const app = express();
const port = 3000;
env.config();

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries INNER JOIN users ON visited_countries.user_id=users.id WHERE users.id=$1;", [currentUserId]);
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

let users = [];

async function checkUsers() {
  const result = await db.query("SELECT * FROM users");
  users = result.rows;
  return users.find((user) => user.id == currentUserId);
}

app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  const currentUser = await checkUsers();
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    colour: currentUser.colour,
  });
});

app.post("/add", async (req, res) => {
  const input = req.body.country;
  let result="";
  try {
    result = await db.query("SELECT country_code FROM countries WHERE LOWER(country_name) LIKE $1", [input.toLowerCase()]);
    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query("INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)", [countryCode, currentUserId]);
      res.redirect("/");
    } catch (err) {
      console.log(err);
      const countries = await checkVisisted();
      const currentUser = await checkUsers();
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        users: users,
        colour: currentUser.colour,
        error: "Country has already been added, try again!",
      });
    }
  } catch (err) {
    console.log(err);
    const countries = await checkVisisted();
    const currentUser = await checkUsers();
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      users: users,
      colour: currentUser.colour,
      error: "Country name does not exist, try again!",
    });
  }
});

app.post("/user", async (req, res) => {
  console.log(req.body);
  if(req.body.add === "new")
  res.render("new.ejs");
  if(req.body.user>0)
    {
      currentUserId = req.body["user"];
      res.redirect("/");
    }
});

app.post("/new", async (req, res) => {
  const name = req.body["name"];
  const colour = req.body["color"];
  try {
    const result = await db.query("INSERT INTO users (name, colour) VALUES ($1, $2) RETURNING *;", [name, colour]);
    const id = result.rows[0].id;
    currentUserId = id;
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});