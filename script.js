function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }

  document.addEventListener("DOMContentLoaded", function() {
    const plane = document.querySelector('.airplane');
    const video = document.getElementById('ad-video');
    const mask = document.querySelector('.image-mask');
    const cta = document.querySelector('.cta');
    const closeWindow = document.getElementById('close-window');
    const adContainer = document.querySelector('.ad-container');
    let isFirstLoop = true;

    // Function to close the ad anytime.

    function closeAd() {
            adContainer.style.display = 'none';
        }
    
    closeWindow.addEventListener('click', closeAd);

    // This section guarantee that only the airplane animation will be triggered first

    plane.addEventListener('animationend', function() {
        document.querySelector('.transition-container').style.display = 'none';
        
        mask.style.display = 'block';
        mask.classList.add('zoom-in-effect');

        cta.style.display = 'block';
    
    // The second part of our ad will play right after the first one ends and ensure that blur
    // effect will only apply to the first video loop.

        video.style.display = 'block';
        video.play();
        video.playbackRate = 1;

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
});