export const FRAME_COUNT = 300;

/** Safety net: the reveal must never wait on a stalled network indefinitely. */
export const INTRO_TIMEOUT_MS = 3500;

const CONCURRENCY = 8;

export const frameSource = (index: number) =>
  `/video-frames/ezgif-frame-${String(index + 1).padStart(3, "0")}.jpg`;

type LoadOptions = {
  onFrame: (index: number) => void;
};

/**
 * Loads the sequence through a bounded queue instead of firing all 300 requests
 * at once, so the opening frames land quickly and fonts/CSS keep their
 * connections. Frame order is preserved, so frame 0 is always among the first.
 */
export function loadFrames({ onFrame }: LoadOptions) {
  const images: HTMLImageElement[] = new Array(FRAME_COUNT);
  let next = 0;
  let active = 0;
  let cancelled = false;

  const settle = (index: number) => {
    active -= 1;
    onFrame(index);
    pump();
  };

  const start = (index: number) => {
    active += 1;
    const image = new Image();
    images[index] = image;
    image.addEventListener("load", () => !cancelled && settle(index), {
      once: true,
    });
    image.addEventListener("error", () => !cancelled && settle(index), {
      once: true,
    });
    image.decoding = "async";
    image.src = frameSource(index);
  };

  const pump = () => {
    while (!cancelled && active < CONCURRENCY && next < FRAME_COUNT) {
      start(next);
      next += 1;
    }
  };

  pump();

  return {
    images,
    cancel() {
      cancelled = true;
    },
  };
}
