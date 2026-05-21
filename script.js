// ================= SONG LIST =================
const songs = [
  {
    title: "SoundHelix Song 1",
    artist: "Music Artist",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://picsum.photos/id/237/300/300"
  },
  {
    title: "SoundHelix Song 2",
    artist: "Music Artist",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://picsum.photos/id/238/300/300"
  },
  {
    title: "SoundHelix Song 3",
    artist: "Music Artist",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://picsum.photos/id/239/300/300"
  }
];

let songIndex = 0;

// ================= SELECT ELEMENTS =================
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progressContainer");

const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");

// ================= LOAD SONG =================
function loadSong(song) {
  title.innerText = song.title;
  artist.innerText = song.artist;
  cover.src = song.cover;
  audio.src = song.src;

  updatePlaylistActive();
}

// ================= PLAY SONG =================
function playSong() {
  audio.play();
  playBtn.innerText = "⏸";
}

// ================= PAUSE SONG =================
function pauseSong() {
  audio.pause();
  playBtn.innerText = "▶";
}

// ================= PLAY / PAUSE =================
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

// ================= NEXT SONG =================
function nextSong() {
  songIndex++;

  if (songIndex >= songs.length) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// ================= PREVIOUS SONG =================
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
}

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// ================= UPDATE PROGRESS =================
audio.addEventListener("timeupdate", updateProgress);

function updateProgress(e) {
  const duration = e.srcElement.duration;
  const currentTime = e.srcElement.currentTime;

  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  currentTimeEl.innerText = formatTime(currentTime);
  durationEl.innerText = formatTime(duration);
}

// ================= FORMAT TIME =================
function formatTime(time) {
  if (isNaN(time)) return "0:00";

  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");

  return `${mins}:${secs}`;
}

// ================= SEEK SONG =================
progressContainer.addEventListener("click", setProgress);

function setProgress(e) {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// ================= VOLUME CONTROL =================
volume.addEventListener("input", (e) => {
  audio.volume = e.target.value;
});

// ================= AUTOPLAY =================
audio.addEventListener("ended", nextSong);

// ================= CREATE PLAYLIST =================
function createPlaylist() {
  playlist.innerHTML = "";

  songs.forEach((song, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <strong>${song.title}</strong><br>
      <small>${song.artist}</small>
    `;

    li.addEventListener("click", () => {
      songIndex = index;
      loadSong(songs[songIndex]);
      playSong();
    });

    playlist.appendChild(li);
  });
}

// ================= ACTIVE PLAYLIST =================
function updatePlaylistActive() {
  const items = playlist.querySelectorAll("li");

  items.forEach((item, index) => {
    item.classList.remove("active");

    if (index === songIndex) {
      item.classList.add("active");
    }
  });
}

// ================= INITIALIZE =================
createPlaylist();
loadSong(songs[songIndex]);

// Default Volume
audio.volume = 1;