const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Profile = require("./models/Profile");

const app = express();
app.use(express.json());
app.use(cors());

const dbURL=process.env.MONGO_URI;
mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));


const EnterProfile = async () => {
  const exist = await Profile.findOne();
  if (!exist) {
    const profile = new Profile({
      name: "Anmol Mishra",
      email: "anmol14108@gmail.com",
      education: "B.Tech in Electronics and Communication Engineering, IIIT Kalyani (2022-2026)",
      skills: [
        "c++","Node.js", "Express.js", "React.js", "Redux", "MongoDB", "MySQL",
        "HTML", "CSS", "JavaScript", "Python",
        "OOP", "DSA", "Algorithm Analysis", "Git", "NoSQL",
      ],
      projects: [
        {
          title: "CHAT SPACE",
          description: "ChatSpace is a real-time WebSocket chat app enabling private, secure, and responsive room-based conversations.",
          links: [
            "https://github.com/anmolmishra08/chat-space",
            "https://github.com/anmolmishra08/"
          ]
        },
        
        {
          title: "Weather App ",
          description: "Responsive JavaScript weather app fetching real-time temperature, conditions, and humidity via OpenWeatherMap with clean UI.",
          links: [
            "https://github.com/anmolmishra08/weather-app",
           "https://github.com/anmolmishra08/"
          ]
        },
       
      ],
     
     
    });

    await profile.save();
    console.log("Profile Enter ");
  }
};
EnterProfile();



app.get("/health", (req, res) => res.status(200).send("OK"));

app.get("/profile", async (req, res) => {
  const profile = await Profile.findOne();
  res.json(profile);
});

app.post("/profile", async (req, res) => {
  const profile = new Profile(req.body);
  await profile.save();
  res.json(profile);
});

app.put("/profile", async (req, res) => {
  const profile = await Profile.findOneAndUpdate({}, req.body, { new: true });
  res.json(profile);
});


app.get("/projects", async (req, res) => {
  const { skill } = req.query;
  const profile = await Profile.findOne();
  if (!skill) return res.json(profile.projects);
  const filtered = profile.projects.filter(p =>
    profile.skills.map(s => s.toLowerCase()).includes(skill.toLowerCase())
  );
  res.json(filtered);
});

app.get("/skills/top", async (req, res) => {
  const profile = await Profile.findOne();
  res.json(profile.skills.slice(0, 3));
});


app.get("/search", async (req, res) => {
  const { q } = req.query;
  const profile = await Profile.findOne();
  const results = {
    skills: profile.skills.filter(s => s.toLowerCase().includes(q.toLowerCase())),
    projects: profile.projects.filter(p => p.title.toLowerCase().includes(q.toLowerCase()))
  };
  res.json(results);
});


app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
