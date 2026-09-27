const envelope = document.querySelector('#envelope');
const overlay = document.querySelector('#letterOverlay');
const closeLetter = document.querySelector('#closeLetter');
const musicButton = document.querySelector('#musicButton');
const musicLabel = document.querySelector('.music-label');
const playIcon = document.querySelector('.play-icon');
const equalizer = document.querySelector('#equalizer');
const note = document.querySelector('#youtubeNote');
let player;
let isPlaying = false;

function openLetter() {
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  envelope.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
  closeLetter.focus();
}

function closeTheLetter() {
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  envelope.setAttribute('aria-expanded', 'false');
  envelope.focus();
}

envelope.addEventListener('click', openLetter);
closeLetter.addEventListener('click', closeTheLetter);
overlay.addEventListener('click', event => { if (event.target === overlay) closeTheLetter(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && overlay.classList.contains('open')) closeTheLetter(); });

window.onYouTubeIframeAPIReady = function () {
  player = new YT.Player('youtubePlayer', {
    height: '1', width: '1', videoId: '17ILK7mjdVI',
    playerVars: { playsinline: 1, controls: 0 },
    events: {
      onStateChange(event) {
        isPlaying = event.data === YT.PlayerState.PLAYING;
        musicButton.setAttribute('aria-pressed', String(isPlaying));
        musicLabel.textContent = isPlaying ? 'Pausar nuestra canción' : 'Reproducir nuestra canción';
        playIcon.textContent = isPlaying ? 'Ⅱ' : '▶';
        equalizer.classList.toggle('playing', isPlaying);
      },
      onError() { note.hidden = false; }
    }
  });
};

musicButton.addEventListener('click', () => {
  if (!player || typeof player.playVideo !== 'function') { note.hidden = false; return; }
  if (isPlaying) player.pauseVideo(); else player.playVideo();
});

const fireflies = document.querySelector('.fireflies');
for (let i = 0; i < 18; i += 1) {
  const spark = document.createElement('i');
  spark.className = 'spark';
  spark.style.left = `${Math.random() * 92 + 4}%`;
  spark.style.top = `${Math.random() * 62 + 30}%`;
  spark.style.setProperty('--speed', `${3 + Math.random() * 5}s`);
  spark.style.animationDelay = `${Math.random() * -6}s`;
  fireflies.appendChild(spark);
}
