import { For, createSignal } from 'solid-js';

import { Terminal } from './components/terminal';
import { Leaderboard } from './routes/leaderboard/page';
import { Market } from './routes/market/page';

const App = () => {
  const [activeSection, setActiveSection] = createSignal<
    'none' | 'leaderboard' | 'market'
  >('none');
  const [commandInput, setCommandInput] = createSignal('');
  const [commandHistory, setCommandHistory] = createSignal<string[]>([]);
  const [historyIndex, setHistoryIndex] = createSignal(-1);

  let inputRef: HTMLInputElement | undefined;

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    setCommandHistory((prev) => [...prev, `> ${cmd}`]);

    if (trimmedCmd === 'leaderboard' || trimmedCmd === 'ls') {
      setActiveSection('leaderboard');
      setCommandHistory((prev) => [...prev, 'Accessing leaderboard data...']);
    } else if (trimmedCmd === 'market' || trimmedCmd === 'shop') {
      setActiveSection('market');
      setCommandHistory((prev) => [...prev, 'Connecting to black market...']);
    } else if (trimmedCmd === 'clear' || trimmedCmd === 'cls') {
      setCommandHistory([]);
      setActiveSection('none');
    } else if (trimmedCmd === 'help') {
      setCommandHistory((prev) => [
        ...prev,
        'Available commands:',
        '  leaderboard, ls - View hacker rankings',
        '  market, shop - Access black market',
        '  clear, cls - Clear terminal',
        '  help - Show this help message',
      ]);
    } else if (trimmedCmd === '') {
      // Do nothing for empty command
    } else {
      setCommandHistory((prev) => [...prev, `Command not found: ${cmd}`]);
    }

    setCommandInput('');
    setHistoryIndex(-1);

    if (inputRef) {
      inputRef.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(commandInput());
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const currentHistoryIndex = historyIndex();
      if (currentHistoryIndex < commandHistory().length - 1) {
        const newIndex = currentHistoryIndex + 1;
        setHistoryIndex(newIndex);
        const cmd = commandHistory()[commandHistory().length - 1 - newIndex];
        if (cmd?.startsWith('> ')) {
          setCommandInput(cmd.substring(2));
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const currentHistoryIndex = historyIndex();
      if (currentHistoryIndex > 0) {
        const newIndex = currentHistoryIndex - 1;
        setHistoryIndex(newIndex);
        const cmd = commandHistory()[commandHistory().length - 1 - newIndex];
        if (cmd?.startsWith('> ')) {
          setCommandInput(cmd.substring(2));
        }
      } else {
        setHistoryIndex(-1);
        setCommandInput('');
      }
    }
  };

  return (
    <Terminal>
      <div class="min-h-screen w-full bg-black text-terminal-green font-mono p-4 relative overflow-hidden flex flex-col">
        <header class="mb-6">
          <h1 class="text-2xl md:text-3xl lg:text-4xl text-terminal-green glitch-text">
            GALACTIC_FISHING v1.1
          </h1>
          <p class="text-terminal-dim mt-1 text-sm md:text-base">
            <span class="blink">█</span> Connection established:{' '}
            {new Date().toISOString()}
          </p>
        </header>

        <div class="flex-1 overflow-auto mb-4">
          <div class="terminal-output space-y-1">
            {commandHistory().length === 0 && (
              <p class="text-terminal-dim">
                Type <span class="text-terminal-cyan">help</span> for available
                commands
              </p>
            )}
            <For each={commandHistory()}>
              {(line) => (
                <p
                  class={
                    line.startsWith('>')
                      ? 'text-terminal-cyan'
                      : 'text-terminal-green'
                  }
                >
                  {line}
                </p>
              )}
            </For>
          </div>

          {activeSection() === 'leaderboard' && (
            <div class="mt-4 border-t border-terminal-dim pt-4">
              <Leaderboard />
            </div>
          )}
          {activeSection() === 'market' && (
            <div class="mt-4 border-t border-terminal-dim pt-4">
              <Market />
            </div>
          )}
        </div>

        <div class="flex items-center border-t border-terminal-dim pt-4">
          <span class="text-terminal-cyan mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={commandInput()}
            onInput={(e) => setCommandInput(e.currentTarget.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              setTimeout(() => {
                inputRef?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center',
                });
              }, 150);
            }}
            class="flex-1 bg-transparent border-none outline-none text-terminal-green font-mono"
            spellcheck={false}
            autocomplete="off"
            autocapitalize="off"
          />
        </div>

        <footer class="mt-4 text-terminal-dim text-xs">
          <p>
            System: Running on secure connection | Memory usage: 42.3MB | CPU:
            12%
          </p>
        </footer>
      </div>
    </Terminal>
  );
};

export default App;
