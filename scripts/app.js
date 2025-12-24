class DMScreenPlus extends Application {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "dm-screen-plus",
      title: "DM Screen Plus",
      template: "modules/dm-screen-plus/templates/app.html",
      width: 540,
      height: 660,
      resizable: true
    });
  }

  getData() {
    return {
      actors: game.actors.filter(a =>
        ["npc", "character"].includes(a.type)
      )
    };
  }

  activateListeners(html) {
    html.find("[data-tab]").click(ev => {
      const tab = ev.currentTarget.dataset.tab;
      html.find(".tab").hide();
      html.find(`#${tab}`).show();
    });

    html.find("#gen-npc").click(() => {
      ui.notifications.info("NPC generator hook ready");
    });

    html.find("#long-rest").click(() => {
      ui.notifications.info("Spell slots reset (long rest)");
    });
  }
}

/* Create app instance */
Hooks.once("ready", () => {
  if (!game.user.isGM) return;
  game.dmScreenPlus ??= new DMScreenPlus();
});

/* 🔑 SCENE CONTROL BUTTON */
Hooks.on("getSceneControlButtons", controls => {
  if (!game.user.isGM) return;

  controls.push({
    name: "dm-screen-plus",
    title: "DM Screen Plus",
    icon: "fas fa-scroll",
    layer: null,
    tools: [{
      name: "open-dmsp",
      title: "Open DM Screen Plus",
      icon: "fas fa-hat-wizard",
      button: true,
      onClick: () => {
        game.dmScreenPlus.render(true);
      }
    }]
  });
});
