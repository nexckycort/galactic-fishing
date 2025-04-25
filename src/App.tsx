import { For, createSignal } from 'solid-js';

import { Terminal } from './components/terminal';
import { Leaderboard } from './routes/leaderboard/page';
import { Market } from './routes/market/page';

type CommandLine =
  | { type: 'text'; content: string }
  | { type: 'component'; name: 'leaderboard' | 'market' };

const App = () => {
  const [commandInput, setCommandInput] = createSignal('');
  const [commandHistory, setCommandHistory] = createSignal<CommandLine[]>([]);

  let inputRef: HTMLInputElement | undefined;
  let endRef: HTMLDivElement | undefined;

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    setCommandHistory((prev) => [
      ...prev,
      { type: 'text', content: `> ${cmd}` },
    ]);

    if (trimmedCmd === 'leaderboard' || trimmedCmd === 'ls') {
      setCommandHistory((prev) => [
        ...prev,
        { type: 'text', content: 'Accessing leaderboard data...' },
        { type: 'component', name: 'leaderboard' },
      ]);
    } else if (trimmedCmd === 'market' || trimmedCmd === 'shop') {
      setCommandHistory((prev) => [
        ...prev,
        { type: 'text', content: 'Connecting to black market...' },
        { type: 'component', name: 'market' },
      ]);
    } else if (trimmedCmd === 'clear' || trimmedCmd === 'cls') {
      setCommandHistory([]);
    } else if (trimmedCmd === 'help') {
      setCommandHistory((prev) => [
        ...prev,
        { type: 'text', content: 'Available commands:' },
        { type: 'text', content: '  leaderboard, ls - View hacker rankings' },
        { type: 'text', content: '  market, shop - Access black market' },
        { type: 'text', content: '  clear, cls - Clear terminal' },
        { type: 'text', content: '  help - Show this help message' },
      ]);
    } else if (trimmedCmd === '') {
      // Do nothing for empty command
    } else {
      setCommandHistory((prev) => [
        ...prev,
        { type: 'text', content: `Command not found: ${cmd}` },
      ]);
    }

    setCommandInput('');

    if (inputRef) {
      inputRef.focus();
    }

    if (endRef) {
      endRef.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(commandInput());
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

        <div class="flex-1 overflow-y-auto mb-4">
          <div class="terminal-output space-y-1">
            {commandHistory().length === 0 && (
              <p class="text-terminal-dim">
                Type <span class="text-terminal-cyan">help</span> for available
                commands
              </p>
            )}
            <For each={commandHistory()}>
              {(line) => {
                if (line.type === 'text') {
                  return (
                    <p
                      class={
                        line.content.startsWith('>')
                          ? 'text-terminal-cyan'
                          : 'text-terminal-green'
                      }
                    >
                      {line.content}
                    </p>
                  );
                }
                if (line.type === 'component') {
                  return (
                    <div class="mt-4 border-t border-terminal-dim pt-4">
                      {line.name === 'leaderboard' && <Leaderboard />}
                      {line.name === 'market' && <Market />}
                    </div>
                  );
                }
                return null;
              }}
            </For>
          </div>
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
          <div ref={endRef} />
        </div>
      </div>
    </Terminal>
  );
};

export default App;
