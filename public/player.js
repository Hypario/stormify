const audio = document.createElement('audio');
const source = document.createElement('source');
source.src = "";

const playButton = document.getElementById("player-play")

const queue = [];
let current = null;

audio.appendChild(source);

// TODO : migrate to an FSM (way easier)

document.querySelectorAll(".song-play").forEach((element) => {
  element.addEventListener('click', () => {
    const selected = element.dataset.source;
    play(selected)
  })
});

document.querySelectorAll(".queue-add").forEach((element) => {
  element.addEventListener('click', () => {
    const selected = element.dataset.source
    queue.push(selected)
    console.log("added to queue : " + selected)
  })
})

playButton.addEventListener("click", () => {
  if (current !== null)
    play(current)
  else if (queue.length > 0)
    play(queue[0])
  else {
    console.log("No songs to play")
  }
})

audio.addEventListener("ended", () => {
  if (queue.length > 0) {
    play(queue[0])
    queue.shift()
  }
})

function play(song) {
  const newSrc = new URL(song, window.location);
  const currentSrc = new URL(source.src);
  current = song

  if (newSrc.pathname !== currentSrc.pathname) {
    source.src = newSrc.toString();
    audio.load();
  }

  if (audio.paused) {
    console.log("playing " + song)
    audio.play();
    playButton.classList.remove("btn-primary")
    playButton.classList.add('btn-danger')
    playButton.innerText = "Pause"
  } else if (audio) {
    console.log("paused " + song)
    audio.pause();
    playButton.classList.remove("btn-danger")
    playButton.classList.add('btn-primary')
    playButton.innerText = "Play"
  }
}