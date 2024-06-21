import express, { Request, Response } from "express";
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

  if (!Name || Name.trim().length <= 3) {
    return res
      .status(400)
      .json({ error: "Name must be greater than 3 characters." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!Email || !emailRegex.test(Email.trim())) {
    return res
      .status(400)
      .json({ error: "Please enter a valid email address." });
  }

  const phoneRegex = /^\d{10}$/;
  if (!Phone || !phoneRegex.test(Phone.trim())) {
    return res
      .status(400)
      .json({ error: "Please enter a valid 10-digit Indian mobile number." });
  }

  const githubRegex = /^https:\/\/github\.com\/[A-Za-z0-9._%+-]+\/?$/;
  if (!GithubLink || !githubRegex.test(GithubLink.trim())) {
    return res.status(400).json({ error: "Please enter a valid GitHub URL." });
  }

  const db = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
  db.submissions.push({
    Name: Name.trim(),
    Email: Email.trim(),
    Phone: Phone.trim(),
    GithubLink: GithubLink.trim(),
    StopwatchTime,
  });
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));

  res.status(201).json({ success: true });
});

app.get("/api/read", (req: Request, res: Response) => {
  console.log(req.query.index);

  let index = parseInt(req.query.index as string, 10);

  console.log(index);

  const db = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));

  if (index >= db.submissions.length) {
    index %= db.submissions.length;
  }

  if (isNaN(index) || index < 0 || index >= db.submissions.length) {
    return res.status(400).json({ error: "Invalid index" });
  }

  res.json(db.submissions[index]);
});

app.delete("/api/delete", (req: Request, res: Response) => {
  const { index } = req.query;
  const db = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
  let idx = parseInt(index as string, 10);

  if (idx >= db.submissions.length) {
    idx %= db.submissions.length;
  }

  if (isNaN(idx) || idx < 0 || idx >= db.submissions.length) {
    return res.status(400).json({ error: "Invalid index" });
  }

  db.submissions.splice(idx, 1);
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));

  res.status(200).json({ success: true });
});

app.put("/api/update", (req: Request, res: Response) => {
  const idx = parseInt(req.query.index as string, 10);
  const { Name, Email, Phone, GithubLink, StopwatchTime } = req.body;
  const db = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));

  if (isNaN(idx) || idx < 0 || idx >= db.submissions.length) {
    return res.status(400).json({ error: "Invalid index" });
  }

  if (!Name || !Email || !Phone || !GithubLink || !StopwatchTime) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (!Name || Name.trim().length <= 3) {
    return res
      .status(400)
      .json({ error: "Name must be greater than 3 characters." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!Email || !emailRegex.test(Email.trim())) {
    return res
      .status(400)
      .json({ error: "Please enter a valid email address." });
  }

  const phoneRegex = /^\d{10}$/;
  if (!Phone || !phoneRegex.test(Phone.trim())) {
    return res
      .status(400)
      .json({ error: "Please enter a valid 10-digit Indian mobile number." });
  }

  const githubRegex = /^https:\/\/github\.com\/[A-Za-z0-9._%+-]+\/?$/;
  if (!GithubLink || !githubRegex.test(GithubLink.trim())) {
    return res.status(400).json({ error: "Please enter a valid GitHub URL." });
  }

  db.submissions[idx] = {
    Name: Name.trim(),
    Email: Email.trim(),
    Phone: Phone.trim(),
    GithubLink: GithubLink.trim(),
    StopwatchTime,
  };
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));

  res.status(200).json({ success: true });
});

app.get("/api/search", (req: Request, res: Response) => {
  const { email } = req.query;
  const db = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));

  const results = db.submissions.filter((submission: any) =>
    submission.Email.toLowerCase().includes((email as string).toLowerCase())
  );

  res.json(results);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
