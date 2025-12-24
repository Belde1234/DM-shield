
import { generateNPC } from "../npc-generator.js";
import { getSpellData, saveSpellData } from "../spell-tracker.js";

export class DMScreenApp extends Application {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "dm-screen-plus",
      title: "DM Screen Plus",
      template: "modules/dm-screen-plus/templates/dm-screen.hbs",
      width: 960,
      height: 640,
      resizable: true
    });
  }

  async getData() {
    const actor = game.user.character || game.actors.contents[0];
    const spellData = actor ? getSpellData(actor) : null;
    return { npc: this.npc, actor, spellData };
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.find("#generate-npc").click(() => {
      this.npc = generateNPC();
      this.render();
    });

    html.find("#create-npc").click(async () => {
      if (!this.npc) return;
      await Actor.create({
        name: this.npc.name,
        type: "npc",
        system: {
          attributes: {
            ac: { value: this.npc.ac },
            hp: { value: this.npc.hp, max: this.npc.hp }
          },
          abilities: Object.fromEntries(
            Object.entries(this.npc.abilities).map(([k, v]) => [k, { value: v }])
          )
        }
      });
    });

    html.find(".spell-use").click(async ev => {
      const level = ev.currentTarget.dataset.level;
      const actor = game.user.character || game.actors.contents[0];
      if (!actor) return;
      const data = getSpellData(actor);
      data.slots[level].used++;
      await saveSpellData(actor, data);
      this.render();
    });

    html.find("#toggle-concentration").click(async () => {
      const actor = game.user.character || game.actors.contents[0];
      if (!actor) return;
      const data = getSpellData(actor);
      data.concentration = !data.concentration;
      await saveSpellData(actor, data);
      this.render();
    });
  }
}
