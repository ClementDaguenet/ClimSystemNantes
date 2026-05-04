"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type DevKeysCtx = {
  showKeys: boolean;
  toggle: () => void;
};

const DevKeysContext = createContext<DevKeysCtx | null>(null);

export function TextesDevKeysProvider({ children }: { children: ReactNode }) {
  const [showKeys, setShowKeys] = useState(false);
  const toggle = useCallback(() => setShowKeys((v) => !v), []);
  const value = useMemo(
    () => ({ showKeys, toggle }),
    [showKeys, toggle],
  );
  return (
    <DevKeysContext.Provider value={value}>{children}</DevKeysContext.Provider>
  );
}

export function TextesDeveloperModeButton() {
  const ctx = useContext(DevKeysContext);
  if (!ctx) {
    throw new Error(
      "TextesDeveloperModeButton doit être dans TextesDevKeysProvider",
    );
  }
  const { showKeys, toggle } = ctx;
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={showKeys}
      className="shrink-0 rounded-lg bg-blue-950 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-900"
    >
      Mode développeur
    </button>
  );
}

export function TextesVisibleKey({ children }: { children: ReactNode }) {
  const ctx = useContext(DevKeysContext);
  if (!ctx) {
    throw new Error("TextesVisibleKey doit être dans TextesDevKeysProvider");
  }
  if (!ctx.showKeys) return null;
  return (
    <span className="mt-1 block font-mono text-[10px] text-slate-400">
      {children}
    </span>
  );
}
