let songIndex = 0;
let audioElement = new Audio("songs/1.mp3"); // Start with the first song
let masterPlay = document.getElementById("masterPlay");
let masterSongName = document.getElementById("masterSongName");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let currentTimeDisplay = document.getElementById("currentTimeDisplay"); // To display current time
let durationDisplay = document.getElementById("durationDisplay"); // To display total duration

let songs = [
  {
    songName: "_1920ER - Jaavedaan Hai.mp3",
    filePath: "songs/1.mp3",
    coverPath: "kkimg.webp",
  },
  {
    songName: "_Gangster 2006 - Tu Hi Meri Shab Hai.mp3",
    filePath: "songs/2.mp3",
    coverPath: "kkimg.webp",
  },
  {
    songName: "_Jannat 2 2012 - Tujhe Sochta Hoon.mp3",
    filePath: "songs/3.mp3",
    coverPath: "kkimg.webp",
  },
  {
    songName: "_Jannat 2008 - Zara Sa.mp3",
    filePath: "songs/4.mp3",
    coverPath: "kkimg.webp",
  },
  {
    songName: "_OSO 2007 - Aankhon Mein Teri Ajab Si (1).mp3",
    filePath: "songs/5.mp3",
    coverPath: "kkimg.webp",
  },
  {
    songName: "_WL 2006 - Kya Mujhe Pyar Hai.mp3",
    filePath: "songs/6.mp3",
    coverPath: "kkimg.webp",
  },
  {
    songName: "old_BB-Labon Ko.mp3",
    filePath: "songs/7.mp3",
    coverPath: "kkimg.webp",
  },
  {
    songName: "old_kites-dil kyun.mp3",
    filePath: "songs/8.mp3",
    coverPath: "kkimg.webp",
  },
  {
    songName: "old_Murder 3-Mat Aazma Re.mp3",
    filePath: "songs/9.mp3",
    coverPath: "kkimg.webp",
  },
  {
    songName: "old_RHTDM - Sach Keh Raha Hai.mp3",
    filePath: "songs/10.mp3",
    coverPath: "kkimg.webp",
  },
];

// Initialize song items with cover image, song name, and duration
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

  // Set the song duration
  let tempAudio = new Audio(songs[i].filePath);
  tempAudio.addEventListener("loadedmetadata", () => {
    let duration = formatTime(tempAudio.duration);
    element.getElementsByClassName("songDuration")[0].innerText = duration;
  });
});

// Function to format time into MM:SS
function formatTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = Math.floor(seconds % 60);
  if (remainingSeconds < 10) {
    remainingSeconds = "0" + remainingSeconds;
  }
  return minutes + ":" + remainingSeconds;
}

// Event listener for master play/pause button
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
  }
});

// Update progress bar and current time display
audioElement.addEventListener("timeupdate", () => {
  // Update progress bar
  let progress = (audioElement.currentTime / audioElement.duration) * 100;
  myProgressBar.value = progress;

  // Update current time display
  currentTimeDisplay.innerText = formatTime(audioElement.currentTime);
});

// Handle progress bar change
myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

// Function to reset play/pause icons for all song items
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
    }
  );
};

// Handle play/pause for each song item
Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element, i) => {
    element.addEventListener("click", (e) => {
      if (
        audioElement.paused ||
        audioElement.currentTime <= 0 ||
        songIndex !== i
      ) {
        // If the song is paused or a new song is selected, play it
        makeAllPlays();
        songIndex = i;
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
      } else {
        // If the song is already playing, pause it
        audioElement.pause();
        e.target.classList.remove("fa-pause-circle");
        e.target.classList.add("fa-play-circle");
        gif.style.opacity = 0;
      }
    });
  }
);

// Event listeners for next and previous buttons
document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex -= 1;
  }
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});
