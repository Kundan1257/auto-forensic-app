import { useState, useEffect } from "react";

export function useTrialGate() {
  const [isTrialExpired, setIsTrialExpired] = useState(false);
  const [daysRemaining, setDaysRemaining] = useState(3);

  useEffect(() => {
    // ⏰ 3-DAY TIMESTAMP CALCULATION LOGIC
    const localSignupKey = "auto_forensic_signup_date";
    let signupTimestamp = localStorage.getItem(localSignupKey);

    if (!signupTimestamp) {
      // First time opening the app? Start their 3-day clock right now
      const now = new Date().toISOString();
      localStorage.setItem(localSignupKey, now);
      signupTimestamp = now;
    }

    const signupDate = new Date(signupTimestamp);
    const currentDate = new Date();
    
    // Calculate the difference in total days
    const differenceInTime = currentDate.getTime() - signupDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    const remaining = Math.max(0, Math.ceil(3 - differenceInDays));
    setDaysRemaining(remaining);

    if (differenceInDays > 3) {
      setIsTrialExpired(true);
    } else {
      setIsTrialExpired(false);
    }
  }, []);

  return { isTrialExpired, daysRemaining };
}
