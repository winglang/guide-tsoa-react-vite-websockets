bring vite;
bring cloud;
bring tsoa;
bring "./broadcaster.w" as b;

let broadcaster = new b.Broadcaster();
let counter = new cloud.Counter();

let api = new tsoa.Service(
  controllerPathGlobs: ["./tsoa/*Controller.ts"],
  outputDirectory: "../build",
  routesDir: "../build"
);

api.liftClient("counter", counter, ["inc", "peek"]);
api.liftClient("broadcaster", broadcaster, ["broadcast"]);

new vite.Vite(
  root: "../frontend",
  publicEnv: {
    TITLE: "Wing + Vite + React",
    WS_URL: broadcaster.url,
    API_URL: api.url,
  }
);
