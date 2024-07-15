const songs = [
  {
    id: 1,
    name: "Yun Hi Chala Chal",
    artist: "Javed Akhtar",
    img: "img1.jpg",
    genre: "rock",
    source: "song1.mp3",
  },
  {
    id: 2,
    name: "Kun Faya Kun",
    artist: "A.R. Rahman, Javed Ali",
    img: "img2.jpg",
    genre: "pop",
    source: "song2.mp3",
  },
  {
    id: 3,
    name: "Behti Hawa Sa Tha Woh",
    artist: "Shaan & Shantanu M",
    img: "img3.jpg",
    genre: "Hip-Hop",
    source: "song3.mp3",
  },
  // Add more songs as needed
];

const playlists = [];
let currentSongIndex = 0;
let currentPlaylist = null;
const audioPlayer = document.getElementById("audioPlayer");

const toggleInput = document.querySelector(".toggle-input");
const header = document.querySelector(".header");
const allSongsDiv = document.querySelector(".all-songs");
const songCardDiv = document.querySelector(".song-card");
const playlistDiv = document.querySelector(".playlist");

toggleInput.addEventListener("change", () => {
  if (toggleInput.checked) {
    document.body.setAttribute("data-theme", "dark");
    header.classList.add("dark");
    header.classList.remove("light");
    allSongsDiv.classList.add("dark");
    songCardDiv.classList.add("dark");
    playlistDiv.classList.add("dark");
    document
      .querySelectorAll("#songsList li")
      .forEach((li) => li.classList.add("dark"));
    document
      .querySelectorAll("#playlistsList li")
      .forEach((li) => li.classList.add("dark"));
    document
      .querySelectorAll("#currentPlaylistSongs li")
      .forEach((li) => li.classList.add("dark"));
  } else {
    document.body.setAttribute("data-theme", "light");
    header.classList.add("light");
    header.classList.remove("dark");
    allSongsDiv.classList.remove("dark");
    songCardDiv.classList.remove("dark");
    playlistDiv.classList.remove("dark");
    document
      .querySelectorAll("#songsList li")
      .forEach((li) => li.classList.remove("dark"));
    document
      .querySelectorAll("#playlistsList li")
      .forEach((li) => li.classList.remove("dark"));
    document
      .querySelectorAll("#currentPlaylistSongs li")
      .forEach((li) => li.classList.remove("dark"));
  }
});

function showSongs(filteredSongs = songs) {
  const songsList = document.getElementById("songsList");
  songsList.innerHTML = "";

  filteredSongs.forEach((song) => {
    const li = document.createElement("li");
    li.textContent = `${song.name} - ${song.artist}`;
    li.addEventListener("click", () => {
      currentSongIndex = songs.indexOf(song);
      renderCurrentSong();
    });
    songsList.appendChild(li);
  });
}

function filterSongsByGenre() {
  const genreFilter = document.getElementById("genreFilter").value;
  if (genreFilter === "all") {
    showSongs(songs);
  } else {
    const filteredSongs = songs.filter((song) => song.genre === genreFilter);
    showSongs(filteredSongs);
  }
}

document
  .getElementById("genreFilter")
  .addEventListener("change", filterSongsByGenre);

function renderCurrentSong() {
  const song = songs[currentSongIndex];
  const currentSong = document.getElementById("currentSong");
  currentSong.innerHTML = `
      <img src="${song.img}" alt="${song.name}">
      <h3>${song.name}</h3>
      <p>${song.artist}</p>
    `;
  const audioSource = document.getElementById("audioSource");
  audioSource.src = song.source;
  audioPlayer.load();
}

document.getElementById("nextButton").addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  renderCurrentSong();
});

document.getElementById("prevButton").addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  renderCurrentSong();
});

document.getElementById("addToPlaylistButton").addEventListener("click", () => {
  const playlistIndex = currentPlaylist;
  if (playlistIndex !== null) {
    addToPlaylist(playlistIndex);
  } else {
    alert("Please select a playlist first.");
  }
});

document
  .getElementById("createPlaylistButton")
  .addEventListener("click", () => {
    const newPlaylistName = document
      .getElementById("newPlaylistName")
      .value.trim();
    if (newPlaylistName) {
      playlists.push({ name: newPlaylistName, songs: [] });
      renderPlaylists();
      document.getElementById("newPlaylistName").value = "";
    } else {
      alert("Please enter a valid playlist name.");
    }
  });

function renderPlaylists() {
  const playlistsList = document.getElementById("playlistsList");
  playlistsList.innerHTML = "";

  playlists.forEach((playlist, index) => {
    const li = document.createElement("li");
    li.textContent = playlist.name;
    li.addEventListener("click", () => {
      currentPlaylist = index;
      renderCurrentPlaylistSongs();
    });
    playlistsList.appendChild(li);
  });
}

function renderCurrentPlaylistSongs() {
  const currentPlaylistSongs = document.getElementById("currentPlaylistSongs");
  currentPlaylistSongs.innerHTML = "";

  if (currentPlaylist !== null) {
    playlists[currentPlaylist].songs.forEach((song, songIndex) => {
      const li = document.createElement("li");
      li.textContent = `${song.name} - ${song.artist}`;

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", () => {
        removeFromPlaylist(songIndex);
      });
      li.appendChild(removeButton);

      currentPlaylistSongs.appendChild(li);
    });
  }
}

function removeFromPlaylist(songIndex) {
  playlists[currentPlaylist].songs.splice(songIndex, 1);
  renderCurrentPlaylistSongs();
}

function addToPlaylist(playlistIndex) {
  const song = songs[currentSongIndex];
  playlists[playlistIndex].songs.push(song);
  renderCurrentPlaylistSongs();
}

function searchItems() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const searchResults = document.getElementById("searchResults");
  searchResults.innerHTML = "";

  const filteredSongs = songs.filter(
    (song) =>
      song.name.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query)
  );

  const filteredPlaylists = playlists.filter((playlist) =>
    playlist.name.toLowerCase().includes(query)
  );

  filteredSongs.forEach((song) => {
    const li = document.createElement("li");
    li.textContent = `Song: ${song.name} - ${song.artist}`;
    li.addEventListener("click", () => {
      currentSongIndex = songs.indexOf(song);
      renderCurrentSong();
      searchResults.innerHTML = ""; // Clear search results on song click
    });
    searchResults.appendChild(li);
  });

  filteredPlaylists.forEach((playlist, index) => {
    const li = document.createElement("li");
    li.textContent = `Playlist: ${playlist.name}`;
    li.addEventListener("click", () => {
      currentPlaylist = index;
      renderCurrentPlaylistSongs();
      searchResults.innerHTML = ""; // Clear search results on playlist click
    });
    searchResults.appendChild(li);
  });

  if (filteredSongs.length === 0 && filteredPlaylists.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No results found.";
    searchResults.appendChild(li);
  }

  // Close search results when clicking outside
  document.addEventListener("click", (event) => {
    const isClickInside = document
      .querySelector(".search-container")
      .contains(event.target);
    if (!isClickInside) {
      searchResults.innerHTML = "";
    }
  });
}

document.getElementById("searchButton").addEventListener("click", searchItems);

// Initial render
showSongs();
renderCurrentSong();
renderPlaylists();
