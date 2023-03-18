const player = document.getElementById("player");
const audio = document.getElementById("audio");
const playPause = document.getElementById("play-pause");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const playlist = document.getElementById("songs");
const progressBar = document.getElementById("progress-bar");
const progress = document.querySelector(".progress");
const currentTime = document.querySelector("#current-time");
const duration = document.querySelector("#duration");
const cards = document.querySelectorAll(".card-flyer");
const songs_by_playlist = {
  pop: [
    {
      song_name: "Tutu Remix - Camilo Ft. Shakira, Pedro Capó",
      song_link:
        "https://www.playurbanomp3.com/Albums/2020/Camilo%20-%20Por%20Primera%20Vez%202020/10%20-%20Camilo,%20Shakira,%20Pedro%20Cap%c3%b3%20-%20Tutu%20-%20Remix.mp3",
    },
    {
      song_name: "Aunque Te Fuiste - Don Omar",
      song_link:
        "https://www.playurbanomp3.com/Canciones/Don%20Omar/05.%20Don%20Omar%20-%20Aunque%20Te%20Fuiste%20(WwW.PlayUrbano.Com).mp3",
    },
    {
      song_name: "Aunque Te Fuiste - Don Omar",
      song_link:
        "https://www.playurbanomp3.com/Canciones/Don%20Omar/Don%20Omar,%20Rakim%20&%20Ken-Y%20-%20Si%20La%20Ves%20(WwW.PlayUrbano.Com).mp3",
    },
    {
      song_name: "Si La Vez - Don Omar Ft. RKM Y Ken-Y",
      song_link:
        "https://www.playurbanomp3.com/Canciones/Don%20Omar/Don%20Omar,%20Wisin%20&%20Yandel%20-%20My%20Space%20(WwW.PlayUrbano.Com).mp3",
    },
    {
      song_name: "My Space - Don Omar Ft. Wisin Y Yandel",
      song_link:
        "https://www.playurbanomp3.com/Canciones/Don%20Omar/Don%20Omar%20-%20Angelito%20Vuela%20(WwW.PlayUrbano.Com).mp3",
    },
    {
      song_name: "Angelito Vuela - Don Omar",
      song_link:
        "https://www.playurbanomp3.com/Canciones/Don%20Omar/Don%20Omar%20-%20Luna%20(WwW.PlayUrbano.Com).mp3",
    },
    {
      song_name: "Luna - Don Omar",
      song_link:
        "https://www.playurbanomp3.com/Canciones/Don%20Omar/Don%20Omar%20-%20Pobre%20diabla%20(WwW.PlayUrbano.Com).mp3",
    },
    {
      song_name: "Pobre Diabla - Don Omar",
      song_link:
        "https://www.playurbanomp3.com/Canciones/Don%20Omar/Don%20Omar%20Ft.%20Aventura%20-%20Ella%20y%20Yo%20(WwW.PlayUrbano.Com).mp3",
    },
  ],
};

let currentSong = 0;

// Loop through each card and add a click event listener
cards.forEach((card) => {
  card.addEventListener("click", (e) => {
    playlist.innerHTML = "";
    console.log(card);
    // Get the data from the clicked card
    // console.log(e.target);

    const get_genre_name = card.querySelector("h6").innerHTML;
    console.log(get_genre_name.toLowerCase());
    const get_song_info_genre = songs_by_playlist[get_genre_name.toLowerCase()];
    console.log(get_song_info_genre);
    get_song_info_genre.forEach((song) => {
      // Create a new li element with data-src attribute and text content
      const li = document.createElement("li");
      li.setAttribute("data-src", song["song_link"]);
      li.textContent = song["song_name"];

      // Append the new li element to the ul element
      playlist.appendChild(li);
    });
  });
});

playlist.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    currentSong = Array.from(playlist.children).indexOf(e.target);
    audio.src = e.target.getAttribute("data-src");
    playPause.innerHTML = '<i class="bi bi-pause-fill"></i>';
    console.log(e.target);
    e.target.classList.add("active-song");
    audio.play();
    setActiveSong(currentSong);
  }
});

playPause.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playPause.innerHTML = '<i class="bi bi-pause-fill"></i>';
  } else {
    audio.pause();
    playPause.innerHTML = '<i class="bi bi-play-fill"></i>';
  }
});

prev.addEventListener("click", () => {
  currentSong--;
  if (currentSong < 0) {
    currentSong = playlist.children.length - 1;
  }
  audio.src = playlist.children[currentSong].getAttribute("data-src");
  audio.play();
  setActiveSong(currentSong);
});

next.addEventListener("click", () => {
  currentSong++;
  if (currentSong === playlist.children.length) {
    currentSong = 0;
  }
  audio.src = playlist.children[currentSong].getAttribute("data-src");
  audio.play();
  setActiveSong(currentSong);
});

// volume.addEventListener("input", (e) => {
//   audio.volume = e.target.value;
// });

audio.addEventListener("timeupdate", (e) => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${percent}%`;
  currentTime.textContent = formatTime(audio.currentTime);
  duration.textContent = formatTime(audio.duration);
});

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

progressBar.addEventListener("click", (e) => {
  const percent =
    (e.clientX - progressBar.offsetLeft) / progressBar.offsetWidth;
  audio.currentTime = percent * audio.duration;
  progress.style.width = `${percent}%`;
});

audio.addEventListener("ended", (e) => {
  if (currentSong === playlist.children.length - 1) {
    currentSong = 0;
  } else {
    currentSong++;
  }
  audio.src = playlist.children[currentSong].getAttribute("data-src");
  audio.play();
  setActiveSong(currentSong);
});

const setActiveSong = (index) => {
  // remove "active" class from previously active song
  playlist.querySelector(".active-song").classList.remove("active-song");

  // add "active" class to currently playing song
  const activeSong = playlist.querySelectorAll("li")[index];
  console.log(activeSong);
  activeSong.classList.add("active-song");
};