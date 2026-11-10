// ==========================================
// 🎵 BACKEND MUSIC SERVICE (Node.js)
// ==========================================
// This microservice holds the music catalog and returns JSON data
// over HTTP with CORS enabled for Vercel frontends.

const http = require('http');

// Render sets the PORT dynamically via environment variables
const PORT = process.env.PORT || 3000;

// 🎧 Song database (Clean, school-safe hits!)
const songs = [
  {
    id: 1,
    title: "As It Was",
    artist: "Harry Styles",
    album: "Harry's House",
    vibe: "🕺 Upbeat & Nostalgic",
    year: 2022,
    streams: "3.4 Billion",
    coverGradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
    emoji: "🏠"
  },
  {
    id: 2,
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    vibe: "🚀 Disco Pop / Fun",
    year: 2020,
    streams: "2.1 Billion",
    coverGradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
    emoji: "🪐"
  },
  {
    id: 3,
    title: "Sunroof",
    artist: "Nicky Youre & dazy",
    album: "Sunroof",
    vibe: "☀️ Good Vibes / Summer",
    year: 2022,
    streams: "850 Million",
    coverGradient: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
    emoji: "🚗"
  },
  {
    id: 4,
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    vibe: "⚡ 80s Synthpop / Energetic",
    year: 2020,
    streams: "4.3 Billion",
    coverGradient: "linear-gradient(135deg, #f12711 0%, #f5af19 100%)",
    emoji: "⚡"
  },
  {
    id: 5,
    title: "Golden Hour",
    artist: "JVKE",
    album: "this is what ____ feels like",
    vibe: "🎹 Piano Pop / Dreamy",
    year: 2022,
    streams: "1.2 Billion",
    coverGradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    emoji: "🌅"
  },
  {
    id: 6,
    title: "Counting Stars",
    artist: "OneRepublic",
    album: "Native",
    vibe: "⭐ Pop Rock Classic",
    year: 2013,
    streams: "2.5 Billion",
    coverGradient: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
    emoji: "🌠"
  },
  {
    id: 7,
    title: "Anti-Hero",
    artist: "Taylor Swift",
    album: "Midnights",
    vibe: "🌙 Indie Pop / Melodic",
    year: 2022,
    streams: "1.8 Billion",
    coverGradient: "linear-gradient(135deg, #2b5876 0%, #4e4376 100%)",
    emoji: "✨"
  }
];

// Helper to set standard CORS & JSON headers
function setCorsHeaders(res) {
  // '*' allows any frontend origin (e.g. Vercel, localhost) to call this API
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
}

// Create the HTTP server
const server = http.createServer((req, res) => {
  setCorsHeaders(res);

  // 1. Handle CORS pre-flight browser check (OPTIONS request)
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Parse incoming path (ignore query params)
  const pathname = req.url.split('?')[0];

  // 2. Root route: Friendly message when visiting directly in browser
  if (pathname === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      message: "🎵 Music Microservice is online!",
      try_endpoint: "/api/track",
      status_endpoint: "/api/status",
      hosted_on: process.env.RENDER ? "Render" : "Localhost"
    }));
    return;
  }

  // 3. 📡 API Route 1: Get a random track
  if (pathname === '/api/track' && req.method === 'GET') {
    const randomIndex = Math.floor(Math.random() * songs.length);
    const chosenSong = songs[randomIndex];

    console.log(`📡 [HTTP GET /api/track] -> Sent: "${chosenSong.title}" by ${chosenSong.artist}`);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(chosenSong));
    return;
  }

  // 4. 📡 API Route 2: Server health check (used by Render and Frontend)
  if (pathname === '/api/status' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'online',
      service: 'Spotify Music Microservice',
      totalSongs: songs.length,
      timestamp: new Date().toISOString()
    }));
    return;
  }

  // 5. Fallback 404 for unknown routes
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Endpoint not found', available_routes: ['/api/track', '/api/status'] }));
});

// Start listening for incoming connections
server.listen(PORT, () => {
  console.log('=============================================');
  console.log(`🎵 Music Microservice is RUNNING!`);
  console.log(`🌐 Port: ${PORT}`);
  console.log(`👉 Endpoint:  http://localhost:${PORT}/api/track`);
  console.log(`📡 CORS is enabled for all origins (*)`);
  console.log('👀 Waiting for requests from frontend...');
  console.log('=============================================');
});
