class _app {
  id = 0;
  videoElement = null;
  audioElement = null;
  musicVolume = 0.12;
  musicFadeIn = 4000;
  skippedIntro = false;
  backgroundToggler = false;
  shouldIgnoreVideo = false;
  effects = [    "bounce",    "flash",    "pulse",    "rubberBand",    "shake",    "swing",    "tada",    "wobble",    "jello"  ];
  brandDescription = [    "de_stroyer",    "pro roblox player",    "localhost ddoser",    "trashtalker",    "skeet fanboy",    "primordial fanboy"  ];

  titleChanger = (text, delay) => {
    if (!text) return;

    delay = delay || 2000;

    let counter = 0;

    function changeTitle() {
      if (counter < text.length) document.title = text[counter++];
      else document.title = text[(counter = 0)];

      requestAnimationFrame(changeTitle);
    }

    requestAnimationFrame(changeTitle);
  };

  iconChanger = (urls, delay) => {
    if (!urls) return;

    delay = delay || 2000;

    let counter = 0;
    const link =
      document.querySelector("link[rel*='icon']") ||
      document.createElement("link");

    link.type = "image/x-icon";
    link.rel = "shortcut icon";
    link.href = urls[counter];

    document.getElementsByTagName("head")[0].appendChild(link);

    function changeIcon() {
      if (counter < urls.length) link.href = urls[counter++];
      else counter = 0;

      requestAnimationFrame(changeIcon);
    }

    requestAnimationFrame(changeIcon);
  };
}

const app = new _app();
