
export function getSpellData(actor) {
  const flag = actor?.getFlag("dm-screen-plus", "spellTracker");
  if (flag) return flag;

  const slots = {};
  for (let i = 1; i <= 9; i++) {
    slots[i] = { used: 0, max: 0 };
  }
  return { slots, concentration: false };
}

export async function saveSpellData(actor, data) {
  if (!actor) return;
  await actor.setFlag("dm-screen-plus", "spellTracker", data);
}
