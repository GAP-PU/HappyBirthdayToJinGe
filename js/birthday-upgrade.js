/* =========================================================
   ❤️ CINEMATIC BIRTHDAY EXPERIENCE
   AUTO SCENE ENGINE

   Existing files preserved:
   jquery.js
   garden.js
   functions.js
   fireworks.js
   config.js

========================================================= */

(function () {

    "use strict";


    /* =====================================================
       CONFIG
    ===================================================== */

    let C = null;

    try {

        if (typeof BIRTHDAY_CONFIG !== "undefined") {

            C = BIRTHDAY_CONFIG;

        }

    } catch (e) {

        console.error(
            "Birthday config error:",
            e
        );

    }


    if (!C) {

        console.error(
            "BIRTHDAY_CONFIG not found."
        );

        return;

    }


    /* =====================================================
       DEFAULTS
    ===================================================== */

    C.name =
        C.name || "Someone Special";

    C.photos =
        Array.isArray(C.photos)
            ? C.photos
            : [];

    C.music =
        C.music || "";

    C.memoryVideo =
        C.memoryVideo || "";

    C.secondVideo =
        C.secondVideo || "";

    C.finalVideo =
        C.finalVideo || "";


    /* =====================================================
       PAGE TITLE
    ===================================================== */

    document.title =
        C.pageTitle ||
        "Happy Birthday ❤️";


    /* =====================================================
       HELPERS
    ===================================================== */

    function escapeHTML(value) {

        const div =
            document.createElement("div");

        div.textContent =
            value == null
                ? ""
                : value;

        return div.innerHTML;

    }


    function wait(ms) {

        return new Promise(
            function (resolve) {

                setTimeout(
                    resolve,
                    ms
                );

            }
        );

    }


    /* =====================================================
       CREATE MAIN EXPERIENCE
    ===================================================== */

    const app =
        document.createElement("div");

    app.id =
        "birthdayExperience";


    app.innerHTML = `

        <div class="bx-background">

            <div class="bx-orb one"></div>
            <div class="bx-orb two"></div>

        </div>


        <div class="bx-noise"></div>


        <div
            class="bx-progress"
            id="bxProgress">
        </div>


        <div
            class="bx-flash"
            id="bxFlash">
        </div>


        <button
            class="bx-music"
            id="bxMusic"
            aria-label="Music">

            🔇

        </button>


        <div
            class="bx-scenes"
            id="bxScenes">


            <!-- =========================================
                 SCENE 0 — INTRO
            ========================================== -->

            <section
                class="bx-scene active"
                data-scene="0">

                <div class="bx-center">

                    <div class="bx-label">
                        A LITTLE SOMETHING FOR YOU
                    </div>


                    <h1 class="bx-intro-title">

                        Hey,

                        <span>
                            ${escapeHTML(C.name)}
                        </span>

                    </h1>


                    <p class="bx-intro-subtitle">

                        ${escapeHTML(
                            C.introSmallText ||
                            "I could have just wished you normally..."
                        )}

                        <br><br>

                        <strong>
                            ${escapeHTML(
                                C.introText ||
                                "But you're not exactly a normal person to me."
                            )}
                        </strong>

                    </p>


                    <button
                        class="bx-button"
                        id="bxStart">

                        Open Your Surprise ✦

                    </button>


                    <div class="bx-auto-hint">

                        TAP TO BEGIN

                    </div>

                </div>

            </section>


            <!-- =========================================
                 SCENE 1 — BIRTHDAY
            ========================================== -->

            <section
                class="bx-scene"
                data-scene="1">

                <div class="bx-center">

                    <div class="bx-label">
                        TODAY IS DIFFERENT
                    </div>


                    <h1 class="bx-heading">

                        Happy

                        <span>
                            Birthday.
                        </span>

                    </h1>


                    <div class="bx-name">

                        ${escapeHTML(C.name)} ❤️

                    </div>


                    <p class="bx-small">

                        Some people enter your life normally...

                        <br>

                        and somehow become
                        a little more special
                        than they were supposed to.

                    </p>

                </div>

            </section>


            <!-- =========================================
                 SCENE 2 — STORY
            ========================================== -->

            <section
                class="bx-scene"
                data-scene="2">

                <div class="bx-center">

                    <div class="bx-label">
                        01 — A LITTLE STORY
                    </div>


                    <h2 class="bx-heading">

                        This wasn't
                        <i>planned.</i>

                    </h2>


                    <div
                        class="bx-story"
                        id="bxStory">
                    </div>

                </div>

            </section>


            <!-- =========================================
                 SCENE 3 — MOMENTS
            ========================================== -->

            <section
                class="bx-scene"
                data-scene="3">

                <div class="bx-center">

                    <div class="bx-label">
                        02 — LITTLE MOMENTS
                    </div>


                    <h2 class="bx-heading">

                        Worth

                        <i>remembering.</i>

                    </h2>


                    <div class="bx-memory">

                        <img
                            id="bxMemory1"
                            alt="Memory">


                        <img
                            id="bxMemory2"
                            alt="Memory">


                        <div
                            class="bx-memory-caption"
                            id="bxMemoryCaption">

                            Little moments.

                        </div>

                    </div>


                    <div
                        class="bx-counter"
                        id="bxCounter">

                    </div>

                </div>

            </section>


            <!-- =========================================
                 SCENE 4 — VIDEO 1
            ========================================== -->

            <section
                class="bx-scene"
                data-scene="4">

                <div class="bx-center">

                    <div class="bx-label">
                        03 — PRESS PLAY
                    </div>


                    <h2 class="bx-heading">

                        Some memories
                        deserve <i>motion.</i>

                    </h2>


                    <div class="bx-video-wrap">

                        <video
                            class="bx-video"
                            id="bxVideo1"
                            controls
                            playsinline
                            preload="metadata">

                            <source
                                src="${escapeHTML(C.memoryVideo)}"
                                type="video/mp4">

                        </video>


                        <div class="bx-video-note">

                            VIDEO WILL CONTINUE
                            AFTER IT ENDS

                        </div>

                    </div>

                </div>

            </section>


            <!-- =========================================
                 SCENE 5 — INTERLUDE
            ========================================== -->

            <section
                class="bx-scene"
                data-scene="5">

                <div class="bx-center bx-interlude">

                    <div class="bx-label">
                        WAIT...
                    </div>


                    <h2>

                        You thought

                        <br>

                        <span>
                            that was it?
                        </span>

                    </h2>


                    <p class="bx-small">

                        Not quite.

                    </p>

                </div>

            </section>


            <!-- =========================================
                 SCENE 6 — LETTER
            ========================================== -->

            <section
                class="bx-scene"
                data-scene="6">

                <div class="bx-center">

                    <div class="bx-label">
                        04 — SOMETHING I WANTED TO SAY
                    </div>


                    <div class="bx-letter">

                        <h2>

                            Hey
                            <span>
                                ${escapeHTML(C.name)}
                            </span>,

                        </h2>


                        <div
                            id="bxLetter">
                        </div>


                        <div
                            style="
                            margin-top:30px;
                            color:#7d717d;
                            line-height:1.8;
                            ">

                            — Someone who may like you

                            <br>

                            <span
                                style="
                                color:#ff73c2;
                                ">

                                a little more than he should. ♥

                            </span>

                        </div>

                    </div>

                </div>

            </section>


            <!-- =========================================
                 SCENE 7 — VIDEO 2
            ========================================== -->

            <section
                class="bx-scene"
                data-scene="7">

                <div class="bx-center">

                    <div class="bx-label">
                        05 — ONE MORE THING
                    </div>


                    <h2 class="bx-heading">

                        Okay...

                        <i>one more.</i>

                    </h2>


                    <div class="bx-video-wrap">

                        <video
                            class="bx-video"
                            id="bxVideo2"
                            controls
                            playsinline
                            preload="metadata">

                            <source
                                src="${escapeHTML(C.secondVideo)}"
                                type="video/mp4">

                        </video>

                    </div>

                </div>

            </section>


            <!-- =========================================
                 SCENE 8 — FINAL VIDEO
            ========================================== -->

            <section
                class="bx-scene"
                data-scene="8">

                <div class="bx-center">

                    <div class="bx-label">
                        06 — THE LAST SURPRISE
                    </div>


                    <h2 class="bx-heading">

                        This one's
                        <i>just for you.</i>

                    </h2>


                    <div class="bx-video-wrap">

                        <video
                            class="bx-video"
                            id="bxFinalVideo"
                            controls
                            playsinline
                            preload="metadata">

                            <source
                                src="${escapeHTML(C.finalVideo)}"
                                type="video/mp4">

                        </video>

                    </div>

                </div>

            </section>


            <!-- =========================================
                 SCENE 9 — FINAL MESSAGE
            ========================================== -->

            <section
                class="bx-scene bx-final"
                data-scene="9">

                <div class="bx-center">

                    <div class="bx-label">
                        AND FINALLY...
                    </div>


                    <h1>

                        Happy

                        <br>

                        <span>
                            Birthday.
                        </span>

                    </h1>


                    <div class="bx-final-name">

                        ${escapeHTML(C.name)} ❤️

                    </div>


                    <p class="bx-final-message">

                        ${escapeHTML(
                            C.finalMessage ||
                            "Stay exactly the way you are."
                        )}

                    </p>


                    <button
                        class="bx-button"
                        id="bxReveal">

                        One Last Surprise ❤️

                    </button>


                    <div class="bx-secret">

                        <strong>
                            P.S.
                        </strong>


                        <div>

                            ${escapeHTML(
                                C.finalSecret ||
                                "Maybe someday..."
                            )}

                        </div>


                        <div class="bx-heart">
                            ♥
                        </div>


                        <small>

                            ${escapeHTML(
                                C.finalFooter ||
                                "Made with a little too much affection."
                            )}

                        </small>

                    </div>

                </div>

            </section>


        </div>


        <!-- =============================================
             LIGHTBOX
        ============================================== -->

        <div
            class="bx-lightbox"
            id="bxLightbox">

            <button
                class="bx-close"
                id="bxClose">

                ×

            </button>


            <img
                id="bxLightboxImage"
                alt="Memory">

        </div>

    `;


    document.body.appendChild(app);


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const scenes =
        Array.from(
            app.querySelectorAll(".bx-scene")
        );


    const progress =
        document.getElementById(
            "bxProgress"
        );


    const startButton =
        document.getElementById(
            "bxStart"
        );


    const revealButton =
        document.getElementById(
            "bxReveal"
        );


    const musicButton =
        document.getElementById(
            "bxMusic"
        );


    let currentScene =
        0;


    let timer =
        null;


    let experienceStarted =
        false;


    let revealDone =
        false;


    /* =====================================================
       STORY
    ===================================================== */

    const storyElement =
        document.getElementById(
            "bxStory"
        );


    const storyLines =
        Array.isArray(C.storyLines)
            ? C.storyLines
            : [];


    storyLines.forEach(
        function (text, index) {

            const p =
                document.createElement("p");

            p.className =
                "bx-story-line";


            if (
                index ===
                storyLines.length - 1
            ) {

                p.classList.add(
                    "final"
                );

            }


            p.textContent =
                text;


            storyElement.appendChild(
                p
            );

        }
    );


    /* =====================================================
       LETTER
    ===================================================== */

    const letterElement =
        document.getElementById(
            "bxLetter"
        );


    const letterLines =
        Array.isArray(C.letter)
            ? C.letter
            : [];


    letterLines.forEach(
        function (text, index) {

            const p =
                document.createElement("p");


            p.textContent =
                text;


            if (
                index ===
                letterLines.length - 1
            ) {

                p.className =
                    "special";

            }


            letterElement.appendChild(
                p
            );

        }
    );


    /* =====================================================
       MUSIC
    ===================================================== */

    let audio =
        null;


    if (C.music) {

        audio =
            document.createElement(
                "audio"
            );


        audio.src =
            C.music;


        audio.loop =
            true;


        audio.preload =
            "auto";


        audio.volume =
            typeof C.musicVolume === "number"
                ? C.musicVolume
                : .45;


        document.body.appendChild(
            audio
        );

    }


    function startMusic() {

        if (!audio) {

            musicButton.textContent =
                "🎵";

            return;

        }


        const play =
            audio.play();


        if (
            play &&
            typeof play.catch === "function"
        ) {

            play.catch(
                function () {

                    musicButton.textContent =
                        "🔇";

                }
            );

        } else {

            musicButton.textContent =
                "🎵";

        }

    }


    function stopMusic() {

        if (audio) {

            audio.pause();

        }

        musicButton.textContent =
            "🔇";

    }


    musicButton.addEventListener(
        "click",
        function () {

            if (!audio) {
                return;
            }


            if (audio.paused) {

                startMusic();

            } else {

                stopMusic();

            }

        }
    );


    /* =====================================================
       FLOATING HEARTS
    ===================================================== */

    function createFloatingHearts() {

        const total =
            18;


        for (
            let i = 0;
            i < total;
            i++
        ) {

            setTimeout(
                function () {

                    const heart =
                        document.createElement(
                            "div"
                        );


                    heart.className =
                        "bx-floating-heart";


                    heart.textContent =
                        Math.random() > .5
                            ? "♥"
                            : "❤";


                    heart.style.left =
                        (
                            5 +
                            Math.random() * 90
                        ) + "%";


                    heart.style.fontSize =
                        (
                            12 +
                            Math.random() * 20
                        ) + "px";


                    heart.style.animationDuration =
                        (
                            5 +
                            Math.random() * 5
                        ) + "s";


                    app.appendChild(
                        heart
                    );


                    setTimeout(
                        function () {

                            heart.remove();

                        },
                        11000
                    );

                },
                i * 250
            );

        }

    }


    /* =====================================================
       PHOTO MEMORY ENGINE
    ===================================================== */

    const memoryImages = [

        document.getElementById(
            "bxMemory1"
        ),

        document.getElementById(
            "bxMemory2"
        )

    ];


    const memoryCaption =
        document.getElementById(
            "bxMemoryCaption"
        );


    const memoryCounter =
        document.getElementById(
            "bxCounter"
        );


    let photoIndex =
        0;


    let photoTimer =
        null;


    let visiblePhoto =
        0;


    const photoDuration =
        3200;


    function preparePhotos() {

        if (
            !C.photos ||
            !C.photos.length
        ) {

            memoryImages.forEach(
                function (img) {

                    img.style.display =
                        "none";

                }
            );


            memoryCaption.textContent =
                "Some memories are better kept in the heart. ❤️";


            memoryCounter.textContent =
                "";


            return;

        }


        photoIndex =
            0;


        visiblePhoto =
            0;


        memoryImages[0].src =
            C.photos[0];


        memoryImages[0].classList.add(
            "active"
        );


        memoryImages[1].classList.remove(
            "active"
        );


        memoryCounter.textContent =
            "01 / " +
            String(C.photos.length)
                .padStart(2, "0");


        memoryCaption.textContent =
            "A little moment worth remembering. ❤️";

    }


    function showNextPhoto() {

        if (
            !C.photos ||
            !C.photos.length
        ) {

            return;

        }


        if (
            C.photos.length === 1
        ) {

            return;

        }


        const nextIndex =
            (photoIndex + 1) %
            C.photos.length;


        const nextLayer =
            visiblePhoto === 0
                ? 1
                : 0;


        memoryImages[nextLayer].src =
            C.photos[nextIndex];


        memoryImages[nextLayer].classList.add(
            "active"
        );


        memoryImages[visiblePhoto].classList.remove(
            "active"
        );


        visiblePhoto =
            nextLayer;


        photoIndex =
            nextIndex;


        memoryCounter.textContent =
            String(photoIndex + 1)
                .padStart(2, "0") +
            " / " +
            String(C.photos.length)
                .padStart(2, "0");


        memoryCaption.textContent =
            "Another little memory. ❤️";

    }


    function startPhotoShow() {

        preparePhotos();


        clearInterval(
            photoTimer
        );


        if (
            C.photos &&
            C.photos.length > 1
        ) {

            photoTimer =
                setInterval(
                    showNextPhoto,
                    photoDuration
                );

        }

    }


    function stopPhotoShow() {

        clearInterval(
            photoTimer
        );

        photoTimer =
            null;

    }


    /* =====================================================
       SCENE HELPERS
    ===================================================== */

    function scenePercent() {

        if (
            scenes.length <= 1
        ) {

            return 100;

        }


        return (
            currentScene /
            (scenes.length - 1)
        ) * 100;

    }


    function updateProgress() {

        progress.style.width =
            scenePercent() + "%";

    }


    function clearSceneTimer() {

        if (timer) {

            clearTimeout(timer);

            timer =
                null;

        }

    }


    function pauseAllVideos() {

        app.querySelectorAll(
            "video"
        ).forEach(
            function (video) {

                video.pause();

            }
        );

    }


    function resetStoryAnimation() {

        storyElement
            .querySelectorAll(
                ".bx-story-line"
            )
            .forEach(
                function (line) {

                    line.classList.remove(
                        "show"
                    );

                }
            );

    }


    /* =====================================================
       STORY ANIMATION
    ===================================================== */

    function animateStory() {

        resetStoryAnimation();


        const lines =
            Array.from(
                storyElement.querySelectorAll(
                    ".bx-story-line"
                )
            );


        lines.forEach(
            function (line, index) {

                setTimeout(
                    function () {

                        line.classList.add(
                            "show"
                        );

                    },
                    500 +
                    index * 1300
                );

            }
        );

    }


    /* =====================================================
       SCENE ACTIVATION
    ===================================================== */

    function activateScene(
        newScene,
        automatic
    ) {

        clearSceneTimer();

        stopPhotoShow();

        pauseAllVideos();


        if (
            newScene < 0
        ) {

            newScene =
                0;

        }


        if (
            newScene >= scenes.length
        ) {

            newScene =
                scenes.length - 1;

        }


        scenes.forEach(
            function (scene, index) {

                scene.classList.remove(
                    "active"
                );

                scene.classList.remove(
                    "exit"
                );


                if (
                    index <
                    newScene
                ) {

                    scene.classList.add(
                        "exit"
                    );

                }

            }
        );


        currentScene =
            newScene;


        const scene =
            scenes[currentScene];


        scene.classList.add(
            "active"
        );


        updateProgress();


        /* ==============================================
           SCENE SPECIFIC ACTIONS
        =============================================== */


        /* STORY */

        if (
            currentScene === 2
        ) {

            animateStory();

            timer =
                setTimeout(
                    function () {

                        activateScene(
                            3,
                            true
                        );

                    },
                    Math.max(
                        6500,
                        storyLines.length *
                        1300 +
                        1800
                    )
                );

        }


        /* PHOTOS */

        else if (
            currentScene === 3
        ) {

            startPhotoShow();


            const duration =
                Math.max(
                    6500,
                    (
                        C.photos.length || 1
                    ) * photoDuration
                );


            timer =
                setTimeout(
                    function () {

                        activateScene(
                            4,
                            true
                        );

                    },
                    duration
                );

        }


        /* VIDEO 1 */

        else if (
            currentScene === 4
        ) {

            const video =
                document.getElementById(
                    "bxVideo1"
                );


            if (
                video &&
                C.memoryVideo
            ) {

                video.currentTime =
                    0;


                const promise =
                    video.play();


                if (
                    promise &&
                    promise.catch
                ) {

                    promise.catch(
                        function () {

                            /*
                               If browser blocks
                               autoplay, user can
                               press play manually.
                            */

                        }
                    );

                }

            } else {

                timer =
                    setTimeout(
                        function () {

                            activateScene(
                                5,
                                true
                            );

                        },
                        3500
                    );

            }

        }


        /* INTERLUDE */

        else if (
            currentScene === 5
        ) {

            timer =
                setTimeout(
                    function () {

                        activateScene(
                            6,
                            true
                        );

                    },
                    4200
                );

        }


        /* LETTER */

        else if (
            currentScene === 6
        ) {

            timer =
                setTimeout(
                    function () {

                        activateScene(
                            7,
                            true
                        );

                    },
                    Math.max(
                        8000,
                        letterLines.length *
                        650
                    )
                );

        }


        /* VIDEO 2 */

        else if (
            currentScene === 7
        ) {

            const video =
                document.getElementById(
                    "bxVideo2"
                );


            if (
                video &&
                C.secondVideo
            ) {

                video.currentTime =
                    0;


                const promise =
                    video.play();


                if (
                    promise &&
                    promise.catch
                ) {

                    promise.catch(
                        function () {}
                    );

                }

            } else {

                timer =
                    setTimeout(
                        function () {

                            activateScene(
                                8,
                                true
                            );

                        },
                        3500
                    );

            }

        }


        /* FINAL VIDEO */

        else if (
            currentScene === 8
        ) {

            const video =
                document.getElementById(
                    "bxFinalVideo"
                );


            if (
                video &&
                C.finalVideo
            ) {

                video.currentTime =
                    0;


                const promise =
                    video.play();


                if (
                    promise &&
                    promise.catch
                ) {

                    promise.catch(
                        function () {}
                    );

                }

            } else {

                timer =
                    setTimeout(
                        function () {

                            activateScene(
                                9,
                                true
                            );

                        },
                        3500
                    );

            }

        }


        /* FINAL */

        else if (
            currentScene === 9
        ) {

            createFloatingHearts();

        }

    }


    /* =====================================================
       VIDEO END EVENTS
    ===================================================== */

    const video1 =
        document.getElementById(
            "bxVideo1"
        );


    const video2 =
        document.getElementById(
            "bxVideo2"
        );


    const finalVideo =
        document.getElementById(
            "bxFinalVideo"
        );


    if (video1) {

        video1.addEventListener(
            "ended",
            function () {

                activateScene(
                    5,
                    true
                );

            }
        );

    }


    if (video2) {

        video2.addEventListener(
            "ended",
            function () {

                activateScene(
                    8,
                    true
                );

            }
        );

    }


    if (finalVideo) {

        finalVideo.addEventListener(
            "ended",
            function () {

                activateScene(
                    9,
                    true
                );

            }
        );

    }


    /* =====================================================
       START EXPERIENCE
    ===================================================== */

    startButton.addEventListener(
        "click",
        function () {

            if (
                experienceStarted
            ) {

                return;

            }


            experienceStarted =
                true;


            startMusic();


            startButton.disabled =
                true;


            activateScene(
                1,
                true
            );


            timer =
                setTimeout(
                    function () {

                        activateScene(
                            2,
                            true
                        );

                    },
                    5000
                );

        }
    );


    /* =====================================================
       FINAL REVEAL
    ===================================================== */

    revealButton.addEventListener(
        "click",
        function () {

            revealOriginalBirthday();

        }
    );


    /* =====================================================
       REVEAL ORIGINAL GARDEN
    ===================================================== */

    function revealOriginalBirthday() {

        if (revealDone) {

            return;

        }


        revealDone =
            true;


        clearSceneTimer();

        stopPhotoShow();

        pauseAllVideos();


        const flash =
            document.getElementById(
                "bxFlash"
            );


        flash.classList.add(
            "play"
        );


        /*
           Give Garden canvas a moment
           to become visible.
        */

        setTimeout(
            function () {

                /*
                   Existing Garden heart
                */

                try {

                    if (
                        typeof startHeartAnimation ===
                        "function"
                    ) {

                        startHeartAnimation();

                    }

                } catch (error) {

                    console.error(
                        "Heart animation error:",
                        error
                    );

                }


                /*
                   Existing fireworks
                */

                setTimeout(
                    function () {

                        try {

                            if (
                                typeof window.startFireworks ===
                                "function"
                            ) {

                                window.startFireworks();

                            }

                        } catch (error) {

                            console.error(
                                "Fireworks error:",
                                error
                            );

                        }

                    },
                    1800
                );


            },
            300
        );


        /*
           Fade cinematic layer
        */

        setTimeout(
            function () {

                app.classList.add(
                    "bx-hidden"
                );


            },
            500
        );


        /*
           Remove after fade
        */

        setTimeout(
            function () {

                app.remove();


                document.body.style.overflow =
                    "auto";


                /*
                   If old page uses
                   loveHeart visibility,
                   make sure it is visible.
                */

                const loveHeart =
                    document.getElementById(
                        "loveHeart"
                    );


                if (loveHeart) {

                    loveHeart.style.visibility =
                        "visible";

                }

            },
            2200
        );

    }


    /* =====================================================
       LIGHTBOX
    ===================================================== */

    const lightbox =
        document.getElementById(
            "bxLightbox"
        );


    const lightboxImage =
        document.getElementById(
            "bxLightboxImage"
        );


    const closeButton =
        document.getElementById(
            "bxClose"
        );


    function closeLightbox() {

        lightbox.classList.remove(
            "show"
        );

    }


    closeButton.addEventListener(
        "click",
        closeLightbox
    );


    lightbox.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                lightbox
            ) {

                closeLightbox();

            }

        }
    );


    /* =====================================================
       PHOTO CLICK
    ===================================================== */

    memoryImages.forEach(
        function (image) {

            image.addEventListener(
                "click",
                function () {

                    if (
                        !image.src
                    ) {

                        return;

                    }


                    lightboxImage.src =
                        image.src;


                    lightbox.classList.add(
                        "show"
                    );

                }
            );

        }
    );


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                closeLightbox();

            }

        }
    );


    /* =====================================================
       KEYBOARD CONTROL
       Optional — user can still use arrows.
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                !experienceStarted ||
                revealDone
            ) {

                return;

            }


            if (
                event.key === "ArrowRight"
            ) {

                if (
                    currentScene <
                    9
                ) {

                    activateScene(
                        currentScene + 1,
                        false
                    );

                }

            }


            if (
                event.key === "ArrowLeft"
            ) {

                if (
                    currentScene >
                    1
                ) {

                    activateScene(
                        currentScene - 1,
                        false
                    );

                }

            }

        }
    );


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    updateProgress();


    /*
       Keep original page underneath.
       Cinematic layer is above it.
    */

    document.body.style.overflow =
        "hidden";


    console.log(
        "❤️ Cinematic Birthday Auto Scene loaded for:",
        C.name
    );


})();
