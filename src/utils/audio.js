// Premium, Highly Audible Tactile Acoustic Audio Engine for Spoon & Beyond
// Clean, warm acoustic harmonics (440Hz - 880Hz) with audible gain (0.20 - 0.28)
// Unlocks AudioContext immediately on user gesture and guarantees crystal clear audibility.

class SoundEffects {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.lastHoverTime = 0;
    this._attachUnlockListeners();
  }

  _attachUnlockListeners() {
    if (typeof window === 'undefined') return;
    const unlock = () => {
      this.init();
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    };
    window.addEventListener('click', unlock, { once: false, passive: true });
    window.addEventListener('touchstart', unlock, { once: false, passive: true });
    window.addEventListener('keydown', unlock, { once: false, passive: true });
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Helper to ensure audio context is active before scheduling sound
  _playWithActiveCtx(soundFn) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().then(() => soundFn(this.ctx)).catch(() => {});
    } else {
      soundFn(this.ctx);
    }
  }

  // 1. Ingredient Selected: Crisp, resonant marimba tap (C5 - 523Hz to E5 - 659Hz)
  playIngredientSelect() {
    this._playWithActiveCtx((ctx) => {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.05);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1800, now);

      gain.gain.setValueAtTime(0.24, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.11);
    });
  }

  // 2. Ingredient Deselected: Gentle muted acoustic release (G4 - 392Hz)
  playIngredientDeselect() {
    this._playWithActiveCtx((ctx) => {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(349.23, now + 0.04);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, now);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    });
  }

  // 3. Smart Substitute Applied: Sophisticated warm acoustic Rhodes triad (C5, E5, G5)
  playSubstituteSwap() {
    this._playWithActiveCtx((ctx) => {
      const now = ctx.currentTime;
      const freqs = [523.25, 659.25, 783.99]; // C5, E5, G5 triad

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.03);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2200, now);

        const startTime = now + idx * 0.03;
        gain.gain.setValueAtTime(0.20, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.18);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.19);
      });
    });
  }

  // 4. Substitute Reverted: Clean, elegant acoustic tick
  playSubstituteRevert() {
    this._playWithActiveCtx((ctx) => {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(493.88, now);
      osc.frequency.exponentialRampToValueAtTime(392.00, now + 0.04);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now);

      gain.gain.setValueAtTime(0.19, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    });
  }

  // 5. Diet Category Selected: Clean acoustic button press
  playDietSelect() {
    this._playWithActiveCtx((ctx) => {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(523.25, now + 0.04);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1600, now);

      gain.gain.setValueAtTime(0.20, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    });
  }

  // 6. Step Next / Prev in Flowchart: Crisp smooth page turn click
  playStepNext() {
    this._playWithActiveCtx((ctx) => {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(587.33, now + 0.05);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1500, now);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    });
  }

  // 7. Step Timer Toggle: Precision tactile shutter click
  playTimerToggle(_isRunning) {
    this._playWithActiveCtx((ctx) => {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.035);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1800, now);

      gain.gain.setValueAtTime(0.20, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    });
  }

  // 8. Opening Recipe Flow / Diagram: Rich acoustic harmonic swell
  playFlowChartOpen() {
    this._playWithActiveCtx((ctx) => {
      const now = ctx.currentTime;
      [392.00, 523.25, 659.25].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2000, now);

        const startTime = now + idx * 0.04;
        gain.gain.setValueAtTime(0.18, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.22);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.23);
      });
    });
  }

  // 9. Saving Recipe: Warm bell chime
  playRecipeSaved() {
    this.playSubstituteSwap();
  }

  // 10. People / Servings Selection: Deep warm acoustic cello pluck (distinct for table size)
  playPeopleChange(_servings = 2) {
    this._playWithActiveCtx((ctx) => {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now); // A3 cello note
      osc.frequency.exponentialRampToValueAtTime(261.63, now + 0.05); // C4

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1100, now);

      gain.gain.setValueAtTime(0.26, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    });
  }

  // 11. Time Specification Selection: Crisp metallic chronometer chime tick
  playTimeChange(_mins = 30) {
    this._playWithActiveCtx((ctx) => {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1174.66, now); // D6 bright bell
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.03);

      filter.type = 'highpass';
      filter.frequency.setValueAtTime(600, now);

      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.07);
    });
  }

  // 12. Meal Type Selection (Dinner, Lunch, Breakfast): Warm culinary kalimba bell
  playMealTypeChange(_type = 'dinner') {
    this._playWithActiveCtx((ctx) => {
      const now = ctx.currentTime;
      const freqs = [440, 554.37]; // A4, C#5 appetizing major 3rd

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.035);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1900, now);

        const startTime = now + idx * 0.035;
        gain.gain.setValueAtTime(0.21, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.16);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.17);
      });
    });
  }

  // 13. Substitutes List Open: Fast sparkling crystal cascade (distinct from recipe flow)
  playSubstituteOpen() {
    this._playWithActiveCtx((ctx) => {
      const now = ctx.currentTime;
      const notes = [659.25, 783.99, 1046.50]; // E5, G5, C6 crystal sparkle

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.03);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(freq * 1.2, now);
        filter.Q.setValueAtTime(3, now);

        const startTime = now + idx * 0.03;
        gain.gain.setValueAtTime(0.20, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.16);
      });
    });
  }

  // 14. Feedback Open: Gentle notepad paper-glide chime
  playFeedbackOpen() {
    this._playWithActiveCtx((ctx) => {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.06); // G5

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2400, now);

      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.13);
    });
  }

  // 15. Feedback Submitted: Triumphant acoustic celebration arpeggio
  playFeedbackSubmitted() {
    this._playWithActiveCtx((ctx) => {
      const now = ctx.currentTime;
      const chord = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 triumph

      chord.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2800, now);

        const startTime = now + idx * 0.04;
        gain.gain.setValueAtTime(0.22, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.28);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.30);
      });
    });
  }

  // 16. Crisp tactile pop (audible on any speaker)
  playPop(freq = 520) {
    this._playWithActiveCtx((ctx) => {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      const f = Math.max(380, Math.min(750, freq));
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now);
      osc.frequency.exponentialRampToValueAtTime(f * 0.75, now + 0.04);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1800, now);

      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    });
  }

  // Warm confirmation chime
  playChime() {
    this.playSubstituteSwap();
  }

  playPin(checked = true) {
    if (checked) this.playIngredientSelect();
    else this.playIngredientDeselect();
  }

  playThreadWhoosh() {
    this.playFlowChartOpen();
  }
}

export const sounds = new SoundEffects();
