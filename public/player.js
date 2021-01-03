const audio = document.createElement('audio');
const source = document.createElement('source');
source.src = "";

const queueButton = document.getElementById("play-queue")
const queue = [];

audio.appendChild(source);

document.querySelectorAll(".player-play").forEach((element, key) => {
  element.addEventListener('click', () => {
    const selected = document.querySelectorAll('.player-source')[key].innerText;
    play(selected)
  })
});

document.querySelectorAll(".queue-add").forEach((element, key) => {
  element.addEventListener('click', () => {
    const selected =  document.querySelectorAll('.player-source')[key].innerText
    queue.push(selected)
  })
})

queueButton.addEventListener("click", () => {
  if (queue.length > 0)
    play(queue[0])
})

audio.addEventListener("ended", () => {
  queue.shift()
  if (queue.length > 0)
    play(queue[0])
})

function play(song) {
  const newSrc = new URL(song, window.location);
  const currentSrc = new URL(source.src);

  if (newSrc.pathname !== currentSrc.pathname) {
    source.src = newSrc.toString();
    audio.load();
  }

  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}