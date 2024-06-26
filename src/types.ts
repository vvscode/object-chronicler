export type HistoryItem = {
  type: 'get' | 'set' | 'call';
  key: string | symbol;
  value?: unknown;
  args?: unknown[] | Readonly<unknown[]>;
};

export interface History {
  put(item: HistoryItem): void;
  getAll(): HistoryItem[];
  has(match: DeepPartial<HistoryItem>): boolean;
  reset(): Promise<void>;
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Record<string, unknown> ? DeepPartial<T[P]> : T[P];
};

export const isObject = (value: unknown): value is object =>
  typeof value === 'object' && value !== null;

export const isFunction = (value: unknown) => typeof value === 'function';

export const isHistoryInstance = (obj: unknown): obj is History => {
  return (
    !!obj &&
    typeof obj === 'object' &&
    'put' in obj &&
    typeof obj.put === 'function' &&
    'getAll' in obj &&
    typeof obj.getAll === 'function' &&
    'has' in obj &&
    typeof obj.has === 'function' &&
    'reset' in obj &&
    typeof obj.reset === 'function'
  );
};
