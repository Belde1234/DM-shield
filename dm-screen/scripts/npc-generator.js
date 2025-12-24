
export function generateNPC() {
  const roles = ["Brute", "Skirmisher", "Caster"];
  const races = ["Human", "Elf", "Dwarf", "Half-Orc", "Tiefling"];
  const names = {
    Human: ["Alden", "Mira", "Thom", "Kara"],
    Elf: ["Aelthir", "Lia", "Faelar", "Sylra"],
    Dwarf: ["Brom", "Helja", "Thrain", "Kelda"],
    "Half-Orc": ["Gor", "Maka", "Rend", "Usha"],
    Tiefling: ["Zara", "Nix", "Kael", "Vex"]
  };

  const role = roles[Math.floor(Math.random() * roles.length)];
  const race = races[Math.floor(Math.random() * races.length)];
  const name = names[race][Math.floor(Math.random() * names[race].length)];
  const level = Math.ceil(Math.random() * 5);
  const base = 10 + level;

  const abilities = {
    str: base + (role === "Brute" ? 2 : 0),
    dex: base + (role === "Skirmisher" ? 2 : 0),
    con: base,
    int: base + (role === "Caster" ? 2 : 0),
    wis: base,
    cha: base
  };

  const hp = Math.floor(level * (role === "Brute" ? 10 : 7));
  const ac = 12 + (role === "Skirmisher" ? 2 : 0);

  return { name, race, role, level, abilities, hp, ac };
}
