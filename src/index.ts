import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3000;
const DB_PATH = path.join(__dirname, '../db.json');

app.use(express.json());

if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({ submissions: [] }, null, 2));
}

app.get('/ping', (req: Request, res: Response) => {
    res.json(true);
});


app.post('/submit', (req: Request, res: Response) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;

    if (!name || !email || !phone || !github_link || !stopwatch_time) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
    db.submissions.push({ name, email, phone, github_link, stopwatch_time });
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));

    res.json({ success: true });
});


app.get('/read', (req: Request, res: Response) => {
    const index = parseInt(req.query.index as string, 10);

    const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));

    if (isNaN(index) || index < 0 || index >= db.submissions.length) {
        return res.status(400).json({ error: 'Invalid index' });
    }

    res.json(db.submissions[index]);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
