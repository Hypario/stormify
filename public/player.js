const audioElement = document.createElement('audio')
const playButton = document.getElementById("player-play")
const audioSource = document.createElement('source')
audioElement.appendChild(audioSource)
audioSource.src = ""

const machine = {
  initial: "playing",
  context: {
    current: '',
    queue: []
  },
  states: {
    playing: () => {
      playButton.classList.remove("btn-primary")
      playButton.classList.add('btn-danger')
      playButton.innerText = "Pause"

      audioElement.play();
      return "paused"
    },
    paused: () => {
      playButton.classList.remove("btn-danger")
      playButton.classList.add('btn-primary')
      playButton.innerText = "Play"

      audioElement.pause();
      return "playing"
    }
  },
  play: (song) => {
    let currentSrc = new URL(audioSource.src)
    if (song !== undefined) {
      const newSrc = new URL(song, window.location);

      if (newSrc.pathname !== currentSrc.pathname) {
        audioSource.src = newSrc.toString();
        audioElement.load();

        currentSrc = new URL(audioSource.src)
        currentState = machine.initial
      }
    }

    if (machine.context.queue.length > 0 && currentSrc.pathname === "/") {
      return machine.next()
    }

    if (currentSrc.pathname !== "/") {
      let transition = machine.states[currentState];
      currentState = transition();
    }
  },
  addQueue: (song) => {
    machine.context.queue.push(song)
  },
  next: () => {
    if (machine.context.queue.length > 0) {
      machine.play(machine.context.queue[0])
      machine.context.queue.shift()
    } else {
      let transition = machine.states["paused"]
      currentState = transition()
    }
  }
}

let currentState = machine.initial

// TODO : migrate to an FSM (way easier)

document.querySelectorAll(".song-play").forEach((element) => {
  element.addEventListener('click', () => {
    const selected = element.dataset.source;
    machine.play(selected)
  })
});

document.querySelectorAll(".song-queue-add").forEach((element) => {
  element.addEventListener('click', () => {
    const selected = element.dataset.source
    machine.addQueue(selected)
    console.log("added to queue : " + selected)
  })
})

playButton.addEventListener("click", () => {
  machine.play()
})

audioElement.addEventListener("ended", () => {
  machine.next()
})