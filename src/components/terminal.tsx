import { For, type JSX, createEffect, createSignal, onCleanup } from 'solid-js';

interface TerminalProps {
  children: JSX.Element;
}

export function Terminal({ children }: TerminalProps) {
  const [bootSequence, setBootSequence] = createSignal(true);
  const [bootText, setBootText] = createSignal<string[]>([]);

  createEffect(() => {
    const bootMessages = [
      'Initializing system...',
      'Loading kernel modules...',
      'Establishing secure connection...',
      'Bypassing security protocols...',
      'Accessing mainframe...',
      'Connection established.',
      'Welcome to the galactic fishing.',
    ];

    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < bootMessages.length) {
        setBootText((prev) => [...prev, bootMessages[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setBootSequence(false);
        }, 500);
      }
    }, 300);

    onCleanup(() => clearInterval(interval));
  });

  return (
    <>
      {bootSequence() ? (
        <div class="min-h-screen w-full bg-black text-terminal-green font-mono p-4 flex flex-col justify-start">
          <For each={bootText()}>
            {(text) => (
              <p class="mb-2">
                <span class="text-terminal-cyan">[SYSTEM]</span> {text}
              </p>
            )}
          </For>
          <p class="blink">█</p>
        </div>
      ) : (
        <div class="relative min-h-screen overflow-hidden">{children}</div>
      )}
    </>
  );
}
