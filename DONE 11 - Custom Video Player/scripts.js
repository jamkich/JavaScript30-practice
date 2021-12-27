/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen');

/*  Build Out Functions */
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton() {
  const sign = this.paused ? '►' : '❚❚';
  toggle.textContent = sign;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

let mousedown = false;
function handleRangeUpdate() {
  mousedown = true;
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function goFullscreen() {
  if (!document.fullscreenElement) {
    video.requestFullscreen();
  } else video.exitFullscreen();
}

/* Hook Up the event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach((button) => button.addEventListener('click', skip));

// active changing value
ranges.forEach((range) =>
  range.addEventListener('mousemove', handleRangeUpdate)
);
ranges.forEach((range) =>
  range.addEventListener('mouseup', () => {
    mousedown = false;
  })
);
ranges.forEach((range) =>
  range.addEventListener('mouseout', () => {
    mousedown = false;
  })
);

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mouseup', () => (mousedown = false));
progress.addEventListener('mouseout', () => (mousedown = false));

fullscreen.addEventListener('click', goFullscreen);
window.addEventListener('keypress', (e) => {
  if (e.key === 'f') goFullscreen();
});
