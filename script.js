const songs = [
  {
    file: "Apna Bana Le (From Bhediya).mp3",
    title: "Apna Bana Le",
    artist: "Arijit Singh",
    composer: "Sachin–Jigar",
    lyricist: "Amitabh Bhattacharya",
    thumbnail: "./thumbnails/apna bana le.webp",
  },
  {
    file: "BAD MUNDA _ Jass Manak Ft. Emiway Bantai (Full Video) Satti Dhillon  Deep Jandu  GK  Geet MP3.mp3",
    title: "Bad Munda",
    artist: "Jass Manak, Emiway Bantai",
    composer: "Deep Jandu",
    lyricist: "Jass Manak",
    thumbnail: "./thumbnails/Bad-Munda.jpg",
  },
  {
    file: "JAB TAK Full Video  M.S. DHONI -THE UNTOLD STORY  Armaan Malik, Amaal Mallik Sushant Singh Rajput.mp3",
    title: "Jab Tak",
    artist: "Armaan Malik",
    composer: "Amaal Mallik",
    lyricist: "Manoj Muntashir",
    thumbnail: "./thumbnails/Jab-tak.jpeg",
  },
  {
    file: "Kachha Ghada ( Ye jo hans rahi hai duniya) Song by Rahgir  Music Shubhodeep Roy.mp3",
    title: "Kachha Ghada",
    artist: "Rahgir",
    composer: "Shubhodeep Roy",
    lyricist: "Rahgir",
    thumbnail: "./thumbnails/Kaccha-ghada.jpeg",
  },
  {
    file: "Prateek Kuhad - Co2 (Lyrics).mp3",
    title: "Co2",
    artist: "Prateek Kuhad",
    composer: "Prateek Kuhad",
    lyricist: "Prateek Kuhad",
    thumbnail: "./thumbnails/co2.jpeg",
  },
];

const container = document.querySelector(".card-container");
const globalPlayBtn = document.getElementById("globalPlayBtn");
const prevBtn = document.getElementById("prevPlay");
const nextBtn = document.getElementById("nextPlay");

let currentAudio = null;
let currentSongFile = null;
let isPlaying = false;
let currentIndex = -1;

const songElements = [];

songs.forEach((song, index) => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${song.thumbnail}" class="card-img" alt="${song.title}" />
    <div class="play">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50" fill="none">
        <circle cx="12" cy="12" r="10" stroke="none" stroke-width="1.5"></circle>
        <path d="M9.5 11.2v1.6c0 1.52 0 2.28.456 2.586.456.307 1.079-.033 2.326-.712l1.468-.8C15.25 13.056 16 12.647 16 12s-.75-1.056-2.25-1.874l-1.468-.8c-1.247-.679-1.87-1.019-2.326-.712C9.5 8.921 9.5 9.68 9.5 11.2Z" fill="#000"></path>
      </svg>
    </div>
    <h3>${song.title}</h3>
    <ul>
      <li>${song.composer}</li>
      <li>${song.artist}</li>
      <li>${song.lyricist}</li>
    </ul>`;

  card.addEventListener("click", () => {
    card.classList.add("card-clicked");
    setTimeout(() => card.classList.remove("card-clicked"), 150);

    if (currentSongFile === song.file) {
      if (isPlaying) {
        card.classList.remove("playing");
        currentAudio.pause();
        isPlaying = false;
        updatePlayIcon(false);
      } else {
        currentAudio.play();
        card.classList.add("playing");
        isPlaying = true;
        updatePlayIcon(true)
      }
    } else {
      songElements.forEach(c => c.classList.remove("playing"));
      playSongAtIndex(index);
      card.classList.add("playing");
    }
  });

  container.appendChild(card);
  songElements.push(card); // Track card elements
});

const playIcon = document.getElementById("globalPlayIcon");

// ✅ Global Play Button
// Global Play Button Logic
globalPlayBtn.addEventListener("click", () => {
  if (currentIndex === -1) {
    // No song was playing — play the first one
    playSongAtIndex(0);
    songElements[0].classList.add("playing");
    updatePlayIcon(true);
  } else {
    if (isPlaying) {
      currentAudio.pause();
      songElements[currentIndex].classList.remove("playing");
      isPlaying = false;
      updatePlayIcon(false);
    } else {
      currentAudio.play();
      songElements[currentIndex].classList.add("playing");
      isPlaying = true;
      updatePlayIcon(true);
    }
  }
});

// Reusable function to update play/pause icon
function updatePlayIcon(isNowPlaying) {
  playIcon.src = isNowPlaying ? "./svgs/pause.svg" : "./svgs/play.svg";
  playIcon.alt = isNowPlaying ? "pause" : "play";
}

// Play song at given index
function playSongAtIndex(idx) {
  if (currentAudio) {
    currentAudio.pause();
  }

  // Clean up previous playing card
  songElements.forEach(c => c.classList.remove("playing"));

  const song = songs[idx];
  currentAudio = new Audio(`./songs/${song.file}`);
  currentAudio.play();
  currentSongFile = song.file;
  currentIndex = idx;
  isPlaying = true;

  // Add playing class to the current card
  songElements[idx].classList.add("playing");
  updatePlayIcon(true);

  // When song ends, auto-play next
  currentAudio.addEventListener("ended", () => {
    playSongAtIndex((idx + 1) % songs.length);
  });
}

// Next / Previous Button
nextBtn.addEventListener("click", () => {
  if (currentIndex === -1) {
    playSongAtIndex(0);
  } else {
    playSongAtIndex((currentIndex + 1) % songs.length);
  }
});

prevBtn.addEventListener("click", () => {
  if (currentIndex === -1) {
    playSongAtIndex(songs.length - 1);
  } else {
    playSongAtIndex((currentIndex - 1 + songs.length) % songs.length);
  }
});
  