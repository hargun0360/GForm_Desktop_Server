"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = 3000;
const DB_PATH = path_1.default.join(__dirname, "../db.json");
app.use(express_1.default.json());
if (!fs_1.default.existsSync(DB_PATH)) {
    fs_1.default.writeFileSync(DB_PATH, JSON.stringify({ submissions: [] }, null, 2));
}
app.get("/api/ping", (req, res) => {
    res.json(true);
    console.log("hello");
});
app.post("/api/submit", (req, res) => {
    const { Name, Email, Phone, GithubLink, StopwatchTime } = req.body;
    console.log(req.body);
    if (!Name || !Email || !Phone || !GithubLink || !StopwatchTime) {
        return res.status(400).json({ error: "All fields are required" });
    }
    const db = JSON.parse(fs_1.default.readFileSync(DB_PATH, "utf-8"));
    db.submissions.push({ Name, Email, Phone, GithubLink, StopwatchTime });
    fs_1.default.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
    res.status(201).json({ success: true });
});
app.get("/api/read", (req, res) => {
    console.log(req.query.index);
    const index = parseInt(req.query.index, 10);
    console.log(index);
    const db = JSON.parse(fs_1.default.readFileSync(DB_PATH, "utf-8"));
    if (isNaN(index) || index < 0 || index >= db.submissions.length) {
        return res.status(400).json({ error: "Invalid index" });
    }
    res.json(db.submissions[index]);
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map