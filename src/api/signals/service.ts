import { signalsFixture } from './data';
import type { Signal } from './types';

function copySignal(signal: Signal): Signal {
  return {
    ...signal,
    message: signal.message.map((part) => ({ ...part })),
    image: { ...signal.image },
  };
}

// Keep the static fixture immutable and use a separate in-memory store for runtime changes.
const signalRecords = signalsFixture.map(copySignal);

export async function getSignals(): Promise<Signal[]> {
  return signalRecords.map(copySignal);
}
