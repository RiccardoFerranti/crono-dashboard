import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { completeSignal, deleteSignal, getSignals } from '@/api/signals/service';
import type { Signal } from '@/api/signals/types';
import { renderWithQueryClient } from '@/test/renderWithQueryClient';

import { SignalsCard } from './SignalsCard';

vi.mock('@number-flow/react', () => ({
  default: ({ value }: { value: number }) => <span>{value}</span>,
}));

vi.mock('@/api/signals/service', () => ({
  getSignals: vi.fn(),
  completeSignal: vi.fn(),
  deleteSignal: vi.fn(),
}));

function renderSignalsCard() {
  return renderWithQueryClient(<SignalsCard />);
}

function createSignal(id: string, name: string): Signal {
  return {
    id,
    category: 'role-change',
    inSequence: false,
    message: [{ text: name, emphasis: 'strong' }],
    date: '2025-04-02',
    image: { src: `${id}.svg`, alt: `${name} company` },
  };
}

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((resolvePromise, rejectPromise) => {
    resolve = resolvePromise;
    reject = rejectPromise;
  });

  return { promise, resolve, reject };
}

async function selectSignalAction(user: ReturnType<typeof userEvent.setup>, signal: Signal, action: 'Complete' | 'Delete') {
  await user.click(screen.getByRole('button', { name: `Action for ${signal.image.alt}` }));
  await user.click(await screen.findByRole('menuitem', { name: action }));
}

async function expectSignalsCount(count: number) {
  const card = screen.getByRole('region', { name: 'Signals' });
  expect(await within(card).findByText(String(count))).toBeInTheDocument();
}

describe('SignalsCard', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should render an error state and retry loading signals', async () => {
    const signals: Signal[] = [
      {
        id: 'signal-001',
        category: 'role-change',
        inSequence: false,
        message: [{ text: 'Robert Smith', emphasis: 'strong' }],
        date: '2025-04-02',
        image: { src: 'medium.svg', alt: 'Medium' },
      },
    ];
    let resolveRetry: (value: Signal[]) => void;
    const retryPromise = new Promise<Signal[]>((resolve) => {
      resolveRetry = resolve;
    });

    vi.mocked(getSignals).mockRejectedValueOnce(new Error('Signals unavailable')).mockReturnValueOnce(retryPromise);

    const user = userEvent.setup();
    renderSignalsCard();

    expect(await screen.findByRole('alert')).toHaveTextContent('Unable to load signals.');
    expect(screen.getByLabelText('Signals count unavailable')).toHaveTextContent('—');
    const retryButton = screen.getByRole('button', { name: 'Retry loading signals' });

    await user.click(retryButton);
    await waitFor(() => {
      expect(screen.getByRole('region', { name: 'Signals' })).toHaveAttribute('aria-busy', 'true');
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    resolveRetry!(signals);

    expect(await screen.findByText('Robert Smith')).toBeInTheDocument();
    await expectSignalsCount(1);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(getSignals).toHaveBeenCalledTimes(2);
  });

  it('should render the signals returned by a successful query and their visible count', async () => {
    vi.mocked(getSignals).mockResolvedValue([
      createSignal('signal-001', 'First signal'),
      createSignal('signal-002', 'Second signal'),
    ]);

    renderSignalsCard();

    expect(await screen.findByText('First signal')).toBeInTheDocument();
    expect(screen.getByText('Second signal')).toBeInTheDocument();
    await expectSignalsCount(2);
  });

  it('should optimistically remove a completed signal and keep it removed after success', async () => {
    const firstSignal = createSignal('signal-001', 'First signal');
    const secondSignal = createSignal('signal-002', 'Second signal');
    const completion = deferred<Signal>();
    vi.mocked(getSignals).mockResolvedValue([firstSignal, secondSignal]);
    vi.mocked(completeSignal).mockReturnValue(completion.promise);
    const user = userEvent.setup();

    renderSignalsCard();

    expect(await screen.findByText('First signal')).toBeInTheDocument();
    await selectSignalAction(user, firstSignal, 'Complete');

    await waitFor(() => expect(completeSignal).toHaveBeenCalledWith(firstSignal.id, expect.any(Object)));
    await waitFor(() => expect(screen.queryByText('First signal')).not.toBeInTheDocument());
    expect(screen.getByText('Second signal')).toBeInTheDocument();
    await expectSignalsCount(1);

    completion.resolve(firstSignal);

    await waitFor(() => expect(screen.queryByText('First signal')).not.toBeInTheDocument());
    await expectSignalsCount(1);
  });

  it('should optimistically remove a deleted signal and keep it removed after success', async () => {
    const firstSignal = createSignal('signal-001', 'First signal');
    const secondSignal = createSignal('signal-002', 'Second signal');
    const deletion = deferred<Signal>();
    vi.mocked(getSignals).mockResolvedValue([firstSignal, secondSignal]);
    vi.mocked(deleteSignal).mockReturnValue(deletion.promise);
    const user = userEvent.setup();

    renderSignalsCard();

    expect(await screen.findByText('First signal')).toBeInTheDocument();
    await selectSignalAction(user, firstSignal, 'Delete');

    await waitFor(() => expect(deleteSignal).toHaveBeenCalledWith(firstSignal.id, expect.any(Object)));
    await waitFor(() => expect(screen.queryByText('First signal')).not.toBeInTheDocument());
    expect(screen.getByText('Second signal')).toBeInTheDocument();
    await expectSignalsCount(1);

    deletion.resolve(firstSignal);

    await waitFor(() => expect(screen.queryByText('First signal')).not.toBeInTheDocument());
    await expectSignalsCount(1);
  });

  it('should restore an optimistically removed signal when its mutation fails', async () => {
    const firstSignal = createSignal('signal-001', 'First signal');
    const secondSignal = createSignal('signal-002', 'Second signal');
    const completion = deferred<Signal>();
    vi.mocked(getSignals).mockResolvedValue([firstSignal, secondSignal]);
    vi.mocked(completeSignal).mockReturnValue(completion.promise);
    const user = userEvent.setup();

    renderSignalsCard();

    expect(await screen.findByText('First signal')).toBeInTheDocument();
    await selectSignalAction(user, firstSignal, 'Complete');
    await waitFor(() => expect(screen.queryByText('First signal')).not.toBeInTheDocument());
    await expectSignalsCount(1);

    completion.reject(new Error('Completion unavailable'));

    expect(await screen.findByText('First signal')).toBeInTheDocument();
    await expectSignalsCount(2);
  });

  it('should keep concurrent mutations for different signals independent', async () => {
    const firstSignal = createSignal('signal-001', 'First signal');
    const secondSignal = createSignal('signal-002', 'Second signal');
    const completion = deferred<Signal>();
    const deletion = deferred<Signal>();
    vi.mocked(getSignals).mockResolvedValue([firstSignal, secondSignal]);
    vi.mocked(completeSignal).mockReturnValue(completion.promise);
    vi.mocked(deleteSignal).mockReturnValue(deletion.promise);
    const user = userEvent.setup();

    renderSignalsCard();

    expect(await screen.findByText('First signal')).toBeInTheDocument();
    await selectSignalAction(user, firstSignal, 'Complete');
    await selectSignalAction(user, secondSignal, 'Delete');

    await waitFor(() => expect(completeSignal).toHaveBeenCalledWith(firstSignal.id, expect.any(Object)));
    await waitFor(() => expect(deleteSignal).toHaveBeenCalledWith(secondSignal.id, expect.any(Object)));
    await waitFor(() => {
      expect(screen.queryByText('First signal')).not.toBeInTheDocument();
      expect(screen.queryByText('Second signal')).not.toBeInTheDocument();
    });
    await expectSignalsCount(0);

    completion.resolve(firstSignal);

    await waitFor(() => {
      expect(screen.queryByText('First signal')).not.toBeInTheDocument();
      expect(screen.queryByText('Second signal')).not.toBeInTheDocument();
    });
    await expectSignalsCount(0);

    deletion.reject(new Error('Deletion unavailable'));

    expect(await screen.findByText('Second signal')).toBeInTheDocument();
    expect(screen.queryByText('First signal')).not.toBeInTheDocument();
    await expectSignalsCount(1);
  });
});
