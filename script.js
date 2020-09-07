const music = document.querySelector("audio");
const img = document.querySelector("img");
const play = document.getElementById("play");
const artist = document.getElementById("artist");
const title = document.getElementById("title");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const songsCount = document.getElementById("songsCount");
let isPlaying = false;
let progress = document.getElementById("progress");
let current_Time = document.getElementById("current_time");
let total_Duration = document.getElementById("total_duration");
const progressbar_div = document.getElementById("progressbar_div");
const label = "Songs";
const songs = [
  {
    name: "Aayengi",
    title: "36-Aayengi",
    artist: "IndeepBakshi",
  },
  { name: "Affair", title: "Affair", artist: "MC JD" },
  { name: "Amplifier", title: "Amplifier", artist: "Imran Khan" },
  { name: "Backbone", title: "Backbone", artist: "Hardy Sandhu" },
  { name: "BapuZimidar", title: "BapuZimidar", artist: "Jassi Gill" },
  {
    name: "BeautifulBillo",
    title: "BeautifulBillo",
    artist: "Diljit Doshanjh",
  },
  { name: "BebeDiSupport", title: "BebeDiSupport", artist: "Kadir Thind" },
  { name: "BebeJiDaNaa", title: "BebeJiDaNaa", artist: "Anmulla Jatt" },
  { name: "Bewafa", title: "Bewafa", artist: "Imran Khan" },
  {
    name: "BilloNiTereNakhreNe",
    title: "BilloNiTereNakhreNe",
    artist: "Jaspindar Narula",
  },
  {
    name: "BilloThumkaLaga",
    title: "BilloThumkaLaga",
    artist: "Geeta Zaildar",
  },
  { name: "BirthdayBash", title: "BirthdayBash", artist: "Yo Yo Honey Singh" },
  { name: "BlueEyes", title: "BlueEyes", artist: "Yo Yo Honey Singh" },
  { name: "BrownRang", title: "BrownRang", artist: "Yo Yo Honey Singh" },
  { name: "Burrraahh", title: "Burrraahh", artist: "Geeta Zaildar" },
  { name: "CarNachdi", title: "CarNachdi", artist: "Gippy Grewal" },
  { name: "DholJageeroDa", title: "DholJageeroDa", artist: "Master Saleem" },
  { name: "DilChori", title: "DilChori", artist: "Hans Raj Hans" },
  { name: "DoNumber", title: "DoNumber", artist: "Bilal Saeed" },
  { name: "TeenPeg", title: "TeenPeg", artist: "Sharry maan" },
];

songsCount.textContent = `Song 1/${songs.length}`;

function playMusic() {
  isPlaying = true;
  music.play();
  play.classList.replace("fa-play", "fa-pause");
  img.classList.add("anime");
}

function pauseMusic() {
  isPlaying = false;
  music.pause();
  play.classList.replace("fa-pause", "fa-play");
  img.classList.remove("anime");
}

function loadSong(songs) {
  title.textContent = songs.title;
  artist.textContent = songs.artist;
  music.src = "songs/" + songs.name + ".mp3";
  img.src = "images/" + songs.name + ".jpg";
}
songIndex = 0;
function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playMusic();
  songsCount.textContent = `Song ${songIndex + 1 + "/" + songs.length}`;
}
function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playMusic();
  songsCount.textContent = `Song ${songIndex + 1 + "/" + songs.length}`;
}

play.addEventListener("click", function () {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
});

// Progress bar code

music.addEventListener("timeupdate", function (event) {
  const { currentTime, duration } = event.srcElement;
  let progress_time = (currentTime / duration) * 100;
  progress.style.width = `${progress_time}%`;
  /*total duration*/
  let duration_minutes = Math.floor(duration / 60);
  let duration_seconds = Math.floor(duration % 60);
  var formatted = `${duration_minutes}:${duration_seconds}`;
  if (duration) {
    total_Duration.textContent = `${formatted}`;
  }

  //Current duration
  let current_minutes = Math.floor(currentTime / 60);
  let current_seconds = Math.floor(currentTime % 60);
  if (current_seconds < 10) {
    current_seconds = `0${current_seconds}`;
  }
  var formatted = `${current_minutes}:${current_seconds}`;
  current_Time.textContent = `${formatted}`;
});

progressbar_div.addEventListener("click", function (event) {
  const { duration } = music;
  let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration;
  music.currentTime = move_progress;
});

music.addEventListener("ended", nextSong);
next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);
