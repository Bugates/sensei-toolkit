(() => {
  const cardFrom = (target) =>
    target instanceof Element ? target.closest(".concept-card") : null;

  const startVideo = (card) => {
    const video = card?.querySelector(".concept-video");
    if (!video) return;

    video.currentTime = 0;
    const playback = video.play();
    if (playback) playback.catch(() => {});
    card.classList.add("video-playing");
  };

  const stopVideo = (card) => {
    const video = card?.querySelector(".concept-video");
    if (!video) return;

    video.pause();
    video.currentTime = 0;
    card.classList.remove("video-playing");
  };

  document.addEventListener("pointerover", (event) => {
    const card = cardFrom(event.target);
    if (!card || card.contains(event.relatedTarget)) return;
    startVideo(card);
  });

  document.addEventListener("pointerout", (event) => {
    const card = cardFrom(event.target);
    if (!card || card.contains(event.relatedTarget)) return;
    stopVideo(card);
  });

  document.addEventListener("focusin", (event) => {
    const card = cardFrom(event.target);
    if (card) startVideo(card);
  });

  document.addEventListener("focusout", (event) => {
    const card = cardFrom(event.target);
    if (!card || card.contains(event.relatedTarget)) return;
    stopVideo(card);
  });

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) return;
    document.querySelectorAll(".concept-card.video-playing").forEach(stopVideo);
  });
})();
