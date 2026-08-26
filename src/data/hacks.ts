export interface HackQuestion {
  id: string;
  category: 'car' | 'bike' | 'truck';
  text: string;
  icon: string;
  color: string;
}

export const ROADSIDE_HACK_QUESTIONS: HackQuestion[] = [
  // 🚗 CAR HACKS
  { id: 'c1', category: 'car', text: 'Locked keys inside the car cabin?', icon: '🔑', color: 'text-cyan-400' },
  { id: 'c2', category: 'car', text: 'How to jumpstart a dead car battery safely?', icon: '⚡', color: 'text-amber-400' },
  { id: 'c3', category: 'car', text: 'Seatbelt stuck or locked up rigidly?', icon: '🎗️', color: 'text-emerald-400' },
  { id: 'c4', category: 'car', text: 'Engine overheating in heavy traffic?', icon: '💨', color: 'text-rose-400' },

  // 🏍️ BIKE HACKS
  { id: 'b1', category: 'bike', text: 'Drive chain slipped or feels loose?', icon: '⛓️', color: 'text-cyan-400' },
  { id: 'b2', category: 'bike', text: 'Bike battery dead and kickstart won\'t work?', icon: '⚡', color: 'text-amber-400' },
  { id: 'b3', category: 'bike', text: 'Front disc brake feels spongy or weak?', icon: '🛑', color: 'text-emerald-400' },
  { id: 'b4', category: 'bike', text: 'Engine bogs down or misfires during acceleration?', icon: '🔧', color: 'text-rose-400' },

  // 🚛 TRUCK HACKS
  { id: 't1', category: 'truck', text: 'Air brakes dropping pressure rapidly?', icon: '💨', color: 'text-cyan-400' },
  { id: 't2', category: 'truck', text: 'Heavy transmission grinding during gear shifts?', icon: '⚙️', color: 'text-amber-400' },
  { id: 't3', category: 'truck', text: '24V dual-battery system won\'t crank the starter?', icon: '🔋', color: 'text-emerald-400' },
  { id: 't4', category: 'truck', text: 'Dual wheels smoking or overheating on highways?', icon: '🛞', color: 'text-rose-400' }
];
