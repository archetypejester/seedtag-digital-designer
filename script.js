// Hamburger menu

function myFunction() {
    const x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }

  document.addEventListener("DOMContentLoaded", function() {
    const adClickElements = document.querySelectorAll('#ad-clickable, #ad-clickable2');
    const planes = document.querySelectorAll('.airplane');
    const videos = document.querySelectorAll('#ad-video');
    const masks = document.querySelectorAll('.image-mask');
    const ctas = document.querySelectorAll('.cta, .cta-overlay');
    const closeWindows = document.querySelectorAll('#close-window, #close-window2');
    const adContainers = document.querySelectorAll('.ad-container, .ad-container-overlay');
    const adLogos = document.querySelectorAll('.ad-logo');
    let isFirstLoop = true;

    // Make a div clickable to redirect it to ad website.

    adClickElements.forEach(adClick => {
        adClick.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    });

    // Function to close the ad anytime.

    closeWindows.forEach((closeWindow, index) => {
        closeWindow.addEventListener('click', () => {
            adContainers[index].style.display = 'none';
        });
    });

    // This section guarantee that only the airplane animation will be triggered first

    planes.forEach((plane, index) => {
        plane.addEventListener('animationend', function() {
            document.querySelectorAll('.transition-container')[index].style.display = 'none';

            masks[index].style.display = 'block';
            masks[index].classList.add('zoom-in-effect');

            adLogos[index].style.display = 'block';
            ctas[index].style.display = 'block';
    
    // The second part of our ad will play right after the first one ends and ensure that blur

    const video = videos[index];
    video.style.display = 'block';
    video.play();
    video.playbackRate = 1;

    // effect will only apply to the first video loop.
    if (isFirstLoop) {
        video.classList.add('first-loop-blur');

        video.addEventListener('play', function handlePlay() {
            setTimeout(() => {
                video.classList.remove('first-loop-blur');
            }, 1500);

            video.removeEventListener('play', handlePlay);
        });

        video.addEventListener('ended', function handleEnd() {
            if (isFirstLoop) {
                isFirstLoop = false;
                video.removeEventListener('ended', handleEnd);
                }
            });
        }

    });
})});
