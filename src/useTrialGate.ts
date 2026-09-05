import { useState, useEffect } from "react";

export function useTrialGate() {
  const [isTrialExpired, setIsTrialExpired] = useState(false);
  const [daysRemaining, setDaysRemaining] = useState(3);

  useEffect(() => {
    const localCreatedAtKey = "auto_forensic_created_at";
    let createdAtTimestamp = localStorage.getItem(localCreatedAtKey);

    if (!createdAtTimestamp) {
      const now = new Date().toISOString();
      localStorage.setItem(localCreatedAtKey, now);
      createdAtTimestamp = now;
    }

    const updateTrialState = () => {
      const createdAt = new Date(createdAtTimestamp as string).getTime();
      const elapsedDays = (Date.now() - createdAt) / (1000 * 60 * 60 * 24);
      const remaining = Math.max(0, Math.ceil(3 - elapsedDays));

      setDaysRemaining(remaining);
      setIsTrialExpired(remaining === 0);
    };

    updateTrialState();
    const intervalId = window.setInterval(updateTrialState, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  return { isTrialExpired, daysRemaining };
}
