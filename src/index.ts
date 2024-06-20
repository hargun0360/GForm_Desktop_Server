import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 3000;
const DB_PATH = path.join(__dirname, "../db.json");

app.use(express.json());

if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify({ submissions: [] }, null, 2));
}

app.get("/api/ping", (req: Request, res: Response) => {
  res.json(true);
  console.log("hello");
});

app.post("/api/submit", (req: Request, res: Response) => {
  const { Name, Email, Phone, GithubLink, StopwatchTime } = req.body;

  console.log(req.body);

  if (!Name || !Email || !Phone || !GithubLink || !StopwatchTime) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const db = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
  db.submissions.push({ Name, Email, Phone, GithubLink, StopwatchTime });
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));

  res.status(201).json({ success: true });
});

app.get("/api/read", (req: Request, res: Response) => {
    console.log(req.query.index);
    
  const index = parseInt(req.query.index as string, 10);

  console.log(index);

  const db = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));

  if (isNaN(index) || index < 0 || index >= db.submissions.length) {
    return res.status(400).json({ error: "Invalid index" });
  }

  res.json(db.submissions[index]);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
