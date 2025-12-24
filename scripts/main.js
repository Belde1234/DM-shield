
import { DMScreenApp } from "./ui/dm-screen-app.js";

Hooks.once("init", () => {
  game.dmscreenplus = {
    DMScreenApp
  };
});

Hooks.once("ready", () => {
  ui.controls.controls.push({
    name: "dm-screen-plus",
    title: "DM Screen Plus",
    icon: "fas fa-hat-wizard",
    layer: null,
    tools: [
      {
        name: "open",
        title: "Open DM Screen",
        icon: "fas fa-scroll",
        onClick: () => new game.dmscreenplus.DMScreenApp().render(true),
        button: true
      }
    ]
  });
});
