import { signalsFixture } from './data';
import type { Signal } from './types';

function copySignal(signal: Signal): Signal {
  // Copy nested data too, so callers cannot mutate the in-memory records by reference.
  return {
    ...signal,
    message: signal.message.map((part) => ({ ...part })),
    image: { ...signal.image },
  };
}

// Keep the static fixture immutable and use a separate in-memory store for runtime changes.
const signalRecords = signalsFixture.map(copySignal);
const signalLoadingDelay = 5000;
const signalMutationDelay = 500;

function waitForSignalLoading() {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, signalLoadingDelay);
  });
}

function waitForSignalMutation() {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, signalMutationDelay);
  });
}

async function removeSignal(id: string): Promise<Signal> {
  await waitForSignalMutation();

  const signalIndex = signalRecords.findIndex((signal) => signal.id === id);

  if (signalIndex === -1) {
    throw new Error(`Signal ${id} was not found`);
  }

  const [removedSignal] = signalRecords.splice(signalIndex, 1);
  return copySignal(removedSignal);
}

export async function getSignals(): Promise<Signal[]> {
  await waitForSignalLoading();
  return signalRecords.map(copySignal);
}

export function completeSignal(id: string): Promise<Signal> {
  return removeSignal(id);
}

export function deleteSignal(id: string): Promise<Signal> {
  return removeSignal(id);
}
