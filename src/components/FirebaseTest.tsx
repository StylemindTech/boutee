import React, { useState } from 'react';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db, ensureAnonAuth } from '../lib/firebaseClient';
import { useBotCheck } from '../lib/useBotCheck';

type Ring = {
  id: string;
  name?: string;
};

const FirebaseTest: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');
  const [rings, setRings] = useState<Ring[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { checked, setChecked, honeypot, setHoneypot, delayPassed, isReady } = useBotCheck(900);

  const runTest = async () => {
    try {
      setStatus('loading');
      setError(null);
      const uid = await ensureAnonAuth();
      console.log('Anon user uid:', uid);

      const q = query(collection(db, 'rings'), limit(3));
      const snap = await getDocs(q);
      const data: Ring[] = snap.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as any),
      }));

      setRings(data);
      setStatus('ok');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Unknown error');
      setStatus('error');
    }
  };

  const handleConnect = async () => {
    if (!isReady) {
      setError("Quick check: confirm you're human before hitting Firebase.");
      setStatus('idle');
      return;
    }
    await runTest();
  };

  if (status === 'idle') {
    return (
      <div className="space-y-3">
        <p>Run a quick Firebase read when you're ready.</p>
        <label className="flex items-center gap-2 text-sm text-[#171719]">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            className="h-4 w-4 rounded border border-gray-400"
          />
          <span>I'm not a bot</span>
        </label>
        {!delayPassed && <p className="text-xs text-gray-500">Button unlocks in a moment…</p>}
        <input
          type="text"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          aria-hidden="true"
          autoComplete="off"
          style={{ position: 'absolute', left: '-9999px', height: '1px', width: '1px', opacity: 0 }}
        />
        <button
          type="button"
          onClick={handleConnect}
          disabled={!isReady}
          className={`rounded-lg px-4 py-2 text-white ${isReady ? 'bg-black' : 'bg-gray-400 cursor-not-allowed'}`}
        >
          Connect to Firebase
        </button>
        {error ? <p className="text-sm text-red-700">{error}</p> : null}
      </div>
    );
  }

  if (status === 'loading') {
    return <p>Connecting to Boutee app data…</p>;
  }

  if (status === 'error') {
    return <p>Firebase error: {error}</p>;
  }

  return (
    <div>
      <p>Connected to Firebase ✅</p>
      <p>Sample rings from Firestore:</p>
      <ul>
        {rings.map((ring) => (
          <li key={ring.id}>{ring.name || ring.id}</li>
        ))}
      </ul>
    </div>
  );
};

export default FirebaseTest;
