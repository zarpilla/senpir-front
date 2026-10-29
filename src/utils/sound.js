// "Tada" sound generated with the Web Audio API.
// No audio file is needed, so it works offline (e.g. in the mountains without signal).

let ctx = null

function getContext() {
  if (!ctx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return null
    ctx = new AudioCtx()
  }
  return ctx
}

// Mobile browsers only allow audio after a user gesture.
// Call once at startup: the first tap anywhere unlocks audio for later.
export function installAudioUnlock() {
  const unlock = () => {
    const c = getContext()
    if (!c) return
    if (c.state === 'suspended') c.resume()
    // Play a silent buffer: required by older iOS Safari to really unlock
    const buffer = c.createBuffer(1, 1, 22050)
    const src = c.createBufferSource()
    src.buffer = buffer
    src.connect(c.destination)
    src.start(0)
    if (c.state === 'running') {
      document.removeEventListener('touchend', unlock, true)
      document.removeEventListener('click', unlock, true)
    }
  }
  document.addEventListener('touchend', unlock, true)
  document.addEventListener('click', unlock, true)
}

// One brass-like note made of a few detuned sawtooth oscillators
function note(c, out, freq, start, duration, volume) {
  const gain = c.createGain()
  gain.gain.setValueAtTime(0, start)
  gain.gain.linearRampToValueAtTime(volume, start + 0.02)
  gain.gain.setValueAtTime(volume, start + duration * 0.4)
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration)
  gain.connect(out)

  for (const detune of [-6, 0, 6]) {
    const osc = c.createOscillator()
    osc.type = 'sawtooth'
    osc.frequency.value = freq
    osc.detune.value = detune
    osc.connect(gain)
    osc.start(start)
    osc.stop(start + duration + 0.05)
  }
}

export function playTada() {
  const c = getContext()
  if (c) {
    if (c.state === 'suspended') c.resume()

    const out = c.createBiquadFilter()
    out.type = 'lowpass'
    out.frequency.value = 2500
    const master = c.createGain()
    master.gain.value = 0.5
    out.connect(master)
    master.connect(c.destination)

    const t = c.currentTime + 0.05
    // "ta": short pickup chord
    ;[392.0, 493.88, 587.33].forEach(f => note(c, out, f, t, 0.12, 0.12)) // G4 B4 D5
    // "daaa": sustained C major chord
    ;[523.25, 659.25, 783.99, 1046.5].forEach(f => note(c, out, f, t + 0.15, 1.2, 0.1)) // C5 E5 G5 C6
  }

  // Vibrate too, useful if the phone is muted (Android only, iOS ignores it)
  if (navigator.vibrate) navigator.vibrate([100, 50, 300])
}
