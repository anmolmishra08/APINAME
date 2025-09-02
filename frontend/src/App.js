

import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [profile, setProfile] = useState(null);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  
   const API_URL="https://apiname-backend.onrender.com";
  useEffect(() => {
    axios.get(`${API_URL}/profile`).then((res) => setProfile(res.data));
  }, []);

  const handleSearch = async () => {
    if (!search) return;
    const res = await axios.get(`${API_URL}/search?q=${search}`);
    setSearchResults(res.data.projects);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>My API Playground</h1>

      {profile ? (
        <>
          <h2>{profile.name}</h2>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Education:</strong> {profile.education}</p>
          <p><strong>Skills:</strong> {profile.skills.join(", ")}</p>

          <h3>Projects</h3>
          <ul>
            {profile.projects.map((p, i) => (
              <li key={i}>
                <strong>{p.title}</strong> – {p.description} <br />
                {p.links.map((link, idx) => (
                  <a key={idx} href={link} target="_blank" rel="noreferrer">
                    {link}
                  </a>
                ))}
              </li>
            ))}
          </ul>

          <h3>Quick Search</h3>
          <input
            type="text"
            placeholder="Search projects/skills"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>

          {searchResults.length > 0 && (
            <ul>
              {searchResults.map((p, i) => (
                <li key={i}>{p.title}</li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

export default App;

