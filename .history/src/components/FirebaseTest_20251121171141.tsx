import React, { useEffect, useState } from 'react';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db, ensureAnonAuth } from '../lib/firebaseClient';

type Ring = {
  id: string;
  name?: string;
};

const FirebaseTest: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');
  const [rings, setRings] = useState<Ring[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        setStatus('loading');
        // Make sure we are authenticated (anonymous ok)
        const uid = await ensureAnonAuth();
        console.log('Anon user uid:', uid);

        // Read a few rings
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

    run();
  }, []);

  if (status === 'loading' || status === 'idle') {
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
