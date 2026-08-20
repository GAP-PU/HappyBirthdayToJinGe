/* =========================================================
   ❤️ CINEMATIC BIRTHDAY EXPERIENCE
   COMPLETE + FAIL-SAFE VERSION
   ========================================================= */

(function () {

    "use strict";

    /* =====================================================
       CONFIG
       Supports both:
       const BIRTHDAY_CONFIG = {...}
       and
       window.BIRTHDAY_CONFIG
    ===================================================== */

    const C =
        (typeof BIRTHDAY_CONFIG !== "undefined")
            ? BIRTHDAY_CONFIG
            : window.BIRTHDAY_CONFIG;


    if (!C) {

        console.error(
            "❌ BIRTHDAY_CONFIG not found."
        );

        return;
    }


    /* =====================================================
       GLOBAL STATE
    ===================================================== */

    let music = null;

    let experience = null;

    let finalCelebrationStarted = false;

    let currentVideo = null;


    /* =====================================================
       UTILITY
    ===================================================== */

    function hasPath(value) {

        return (
            typeof value === "string" &&
            value.trim().length > 0
        );

    }


    function escapeHTML(value) {

        if (value === undefined || value === null) {
            return "";
        }

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =====================================================
       CREATE MAIN EXPERIENCE
    ===================================================== */

    function createExperience() {

        /*
         * Prevent duplicate creation
         */

        if (
            document.getElementById(
                "birthdayExperience"
            )
        ) {

            return;

        }


        experience =
            document.createElement("div");

        experience.id =
            "birthdayExperience";


        experience.innerHTML = `

            <div class="bx-noise"></div>

            <div
                class="bx-progress"
                id="bxProgress">
            </div>


            <!-- =========================================
                 MUSIC BUTTON
            ========================================== -->

            <button
                class="bx-music"
                id="bxMusic"
                aria-label="Music">

                🔇

            </button>


            <!-- =========================================
                 INTRO
            ========================================== -->

            <section
                class="bx-screen"
                data-section="intro">

                <div class="bx-center">

                    <div class="bx-label">
                        A LITTLE SOMETHING FOR YOU
                    </div>


                    <h1 class="bx-intro-title">

                        Hey,

                        <span id="bxIntroName">
                            ${escapeHTML(C.name)}
                        </span>

                    </h1>


                    <p class="bx-subtitle">

                        ${escapeHTML(
                            C.introSmallText ||
                            "I could have just wished you normally..."
                        )}

                        <br><br>

                        <span>

                            ${escapeHTML(
                                C.introText ||
                                "But you're not exactly a normal person to me."
                            )}

                        </span>

                    </p>


                    <button
                        class="bx-button"
                        id="bxStart">

                        Open Your Surprise ✦

                    </button>


                    <p
                        style="
                        color:#665b68;
                        font-size:10px;
                        letter-spacing:2px;
                        margin-top:25px;
                        ">

                        🔊 Turn your volume up

                    </p>

                </div>

            </section>


            <!-- =========================================
                 HERO
            ========================================== -->

            <section
                class="bx-section"
                data-section="hero">

                <div class="bx-center">

                    <div class="bx-section-label">
                        TODAY IS DIFFERENT
                    </div>


                    <h1 class="bx-heading">

                        Happy
                        <i>Birthday</i>

                    </h1>


                    <div
                        class="bx-hero-name"
                        style="
                        font-size:clamp(30px,5vw,60px);
                        color:#ffe1f1;
                        margin-top:35px;
                        ">

                        ${escapeHTML(C.name)}
                        ❤️

                    </div>


                    <p class="bx-subtitle">

                        Some people enter your life normally...

                        <br><br>

                        and somehow become
                        a little more special
                        than they were supposed to.

                    </p>

                </div>

            </section>


            <!-- =========================================
                 STORY
            ========================================== -->

            <section
                class="bx-section"
                data-section="story">

                <div class="bx-container">

                    <div class="bx-section-label">
                        01 — A LITTLE STORY
                    </div>


                    <h2 class="bx-heading">

                        ${escapeHTML(
                            C.storyTitle ||
                            "This wasn't supposed to become this."
                        )}

                    </h2>


                    <div
                        class="bx-text"
                        id="bxStory">

                    </div>

                </div>

            </section>


            <!-- =========================================
                 PHOTO GALLERY
            ========================================== -->

            <section
                class="bx-section"
                data-section="photos">

                <div class="bx-container">

                    <div class="bx-section-label">
                        02 — LITTLE MOMENTS
                    </div>


                    <h2 class="bx-heading">

                        Things worth
                        <i>remembering.</i>

                    </h2>


                    <p class="bx-text">

                        Because some pictures
                        are not just pictures.

                        <br><br>

                        They're tiny pieces
                        of memories.

                    </p>


                    <div
                        class="bx-gallery"
                        id="bxGallery">

                    </div>

                </div>

            </section>


            <!-- =========================================
                 VIDEO 1
            ========================================== -->

            <section
                class="bx-section bx-video-section"
                data-section="video1">

                <div class="bx-container">

                    <div class="bx-section-label">
                        03 — PRESS PLAY
                    </div>


                    <h2 class="bx-heading">

                        Some moments
                        deserve <i>motion.</i>

                    </h2>


                    <div class="bx-video">

                        <video
                            id="bxVideo1"
                            controls
                            playsinline
                            preload="metadata">

                            <source
                                src=""
                                type="video/mp4">

                        </video>

                    </div>

                </div>

            </section>


            <!-- =========================================
                 INTERLUDE
            ========================================== -->

            <section
                class="bx-section bx-interlude"
                data-section="interlude">

                <div class="bx-center">

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


                    <p
                        style="
                        color:#766a77;
                        margin-top:35px;
                        letter-spacing:4px;
                        ">

                        Not quite.

                    </p>

                </div>

            </section>


            <!-- =========================================
                 LETTER
            ========================================== -->

            <section
                class="bx-section"
                data-section="letter">

                <div class="bx-container">

                    <div class="bx-section-label">
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
                            margin-top:60px;
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
                 VIDEO 2
            ========================================== -->

            <section
                class="bx-section bx-video-section"
                data-section="video2">

                <div class="bx-container">

                    <div class="bx-section-label">
                        05 — ONE MORE THING
                    </div>


                    <h2 class="bx-heading">

                        Okay...
                        <i>one more.</i>

                    </h2>


                    <div class="bx-video">

                        <video
                            id="bxVideo2"
                            controls
                            playsinline
                            preload="metadata">

                            <source
                                src=""
                                type="video/mp4">

                        </video>

                    </div>

                </div>

            </section>


            <!-- =========================================
                 FINAL VIDEO
            ========================================== -->

            <section
                class="bx-section bx-video-section"
                data-section="finalVideo">

                <div class="bx-container">

                    <div class="bx-section-label">
                        06 — THE LAST SURPRISE
                    </div>


                    <h2 class="bx-heading">

                        This one's
                        <i>just for you.</i>

                    </h2>


                    <div class="bx-video">

                        <video
                            id="bxFinalVideo"
                            controls
                            playsinline
                            preload="metadata">

                            <source
                                src=""
                                type="video/mp4">

                        </video>

                    </div>

                </div>

            </section>


            <!-- =========================================
                 FINAL
            ========================================== -->

            <section
                class="bx-section bx-final"
                data-section="final">

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

                        ${escapeHTML(C.name)}
                        ❤️

                    </div>


                    <p class="bx-final-message">

                        ${escapeHTML(
                            C.finalMessage ||
                            ""
                        )}

                    </p>


                    <div class="bx-secret">

                        <strong>
                            P.S.
                        </strong>


                        <p>
                            ${escapeHTML(
                                C.finalSecret ||
                                ""
                            )}
                        </p>


                        <div class="bx-heart">
                            ♥
                        </div>


                        <small>
                            ${escapeHTML(
                                C.finalFooter ||
                                ""
                            )}
                        </small>

                    </div>


                    <p
                        style="
                        margin-top:60px;
                        color:#514852;
                        font-size:9px;
                        letter-spacing:2px;
                        line-height:2;
                        ">

                        Made with a little too much effort

                        <br>

                        and probably a little too much affection.

                    </p>

                </div>

            </section>


            <!-- =========================================
                 LIGHTBOX
            ========================================== -->

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
                    src=""
                    alt="Memory">

            </div>

        `;


        document.body.appendChild(
            experience
        );

    }


    /* =====================================================
       STORY
    ===================================================== */

    function buildStory() {

        const box =
            document.getElementById(
                "bxStory"
            );


        if (!box) return;


        const lines =
            Array.isArray(C.storyLines)
                ? C.storyLines
                : [];


        if (!lines.length) {

            box.innerHTML = "";

            return;
        }


        lines.forEach(
            function (text, index) {

                const p =
                    document.createElement(
                        "p"
                    );


                p.textContent =
                    text;


                if (
                    index ===
                    lines.length - 1
                ) {

                    p.className =
                        "bx-highlight";

                }


                box.appendChild(p);

            }
        );

    }


    /* =====================================================
       LETTER
    ===================================================== */

    function buildLetter() {

        const box =
            document.getElementById(
                "bxLetter"
            );


        if (!box) return;


        const lines =
            Array.isArray(C.letter)
                ? C.letter
                : [];


        lines.forEach(
            function (text, index) {

                const p =
                    document.createElement(
                        "p"
                    );


                p.textContent =
                    text;


                if (
                    text ===
                    "You just became special."
                ) {

                    p.className =
                        "special";

                }


                if (
                    index ===
                    lines.length - 1
                ) {

                    p.className =
                        "special";

                }


                box.appendChild(p);

            }
        );

    }


    /* =====================================================
       PHOTO GALLERY
       MISSING PHOTO = SKIP
    ===================================================== */

    function buildGallery() {

        const gallery =
            document.getElementById(
                "bxGallery"
            );


        if (!gallery) return;


        const photos =
            Array.isArray(C.photos)
                ? C.photos
                : [];


        if (!photos.length) {

            hideSection(
                gallery.closest(
                    ".bx-section"
                )
            );

            return;

        }


        photos.forEach(
            function (photo, index) {

                if (!hasPath(photo)) {
                    return;
                }


                const wrapper =
                    document.createElement(
                        "div"
                    );


                wrapper.className =
                    "bx-photo";


                const img =
                    document.createElement(
                        "img"
                    );


                img.src =
                    photo;

                img.alt =
                    "Memory " +
                    (index + 1);

                img.loading =
                    "lazy";


                /*
                 * IMAGE ERROR
                 */

                img.addEventListener(
                    "error",
                    function () {

                        console.warn(
                            "⚠️ Photo skipped:",
                            photo
                        );


                        wrapper.remove();

                        checkGalleryEmpty();

                    },
                    {
                        once: true
                    }
                );


                /*
                 * IMAGE CLICK
                 */

                wrapper.addEventListener(
                    "click",
                    function () {

                        openLightbox(
                            photo
                        );

                    }
                );


                wrapper.appendChild(
                    img
                );


                gallery.appendChild(
                    wrapper
                );

            }
        );


        checkGalleryEmpty();


        function checkGalleryEmpty() {

            if (
                gallery.children.length === 0
            ) {

                hideSection(
                    gallery.closest(
                        ".bx-section"
                    )
                );

            }

        }

    }


    /* =====================================================
       LIGHTBOX
    ===================================================== */

    function openLightbox(src) {

        const lightbox =
            document.getElementById(
                "bxLightbox"
            );

        const image =
            document.getElementById(
                "bxLightboxImage"
            );


        if (!lightbox || !image) {
            return;
        }


        image.src =
            src;


        lightbox.classList.add(
            "show"
        );

    }


    function closeLightbox() {

        const lightbox =
            document.getElementById(
                "bxLightbox"
            );


        if (!lightbox) return;


        lightbox.classList.remove(
            "show"
        );

    }


    /* =====================================================
       HIDE SECTION
    ===================================================== */

    function hideSection(section) {

        if (!section) return;


        section.dataset.skipped =
            "true";


        section.style.display =
            "none";

    }


    /* =====================================================
       FIND NEXT VISIBLE SECTION
    ===================================================== */

    function getNextSection(section) {

        if (!section) return null;


        let next =
            section.nextElementSibling;


        while (next) {

            if (
                next.classList &&
                next.classList.contains(
                    "bx-section"
                ) &&
                next.style.display !==
                    "none"
            ) {

                return next;

            }


            next =
                next.nextElementSibling;

        }


        return null;

    }


    /* =====================================================
       GO NEXT
    ===================================================== */

    function goNextSection(element) {

        const section =
            element &&
            element.closest
                ? element.closest(
                    ".bx-section"
                )
                : null;


        if (!section) return;


        const next =
            getNextSection(
                section
            );


        if (!next) return;


        setTimeout(
            function () {

                next.scrollIntoView({
                    behavior:
                        "smooth",
                    block:
                        "start"
                });

            },
            500
        );

    }


    /* =====================================================
       VIDEO SETUP
       MISSING VIDEO = AUTOMATIC SKIP
    ===================================================== */

    function setupVideo(
        videoId,
        path,
        isFinal
    ) {

        const video =
            document.getElementById(
                videoId
            );


        if (!video) return;


        const section =
            video.closest(
                ".bx-section"
            );


        /*
         * No path
         */

        if (!hasPath(path)) {

            console.warn(
                "⚠️ Video path empty:",
                videoId
            );


            skipVideoSection(
                video,
                "empty path"
            );

            return;

        }


        const source =
            video.querySelector(
                "source"
            );


        if (!source) {

            skipVideoSection(
                video,
                "source element missing"
            );

            return;

        }


        /*
         * Set source
         */

        source.src =
            path;


        video.load();


        /*
         * Prevent duplicate ending
         */

        let finished =
            false;


        /*
         * VIDEO ERROR
         */

        video.addEventListener(
            "error",
            function () {

                if (finished) return;


                finished =
                    true;


                skipVideoSection(
                    video,
                    "video load error"
                );

            },
            {
                once: true
            }
        );


        /*
         * SOURCE ERROR
         */

        source.addEventListener(
            "error",
            function () {

                if (finished) return;


                finished =
                    true;


                skipVideoSection(
                    video,
                    "source error"
                );

            },
            {
                once: true
            }
        );


        /*
         * VIDEO ENDED
         */

        video.addEventListener(
            "ended",
            function () {

                if (finished) return;


                finished =
                    true;


                currentVideo =
                    null;


                if (isFinal) {

                    launchFinalCelebration();

                    return;

                }


                goNextSection(
                    video
                );

            }
        );


        /*
         * VIDEO PLAY
         */

        video.addEventListener(
            "play",
            function () {

                currentVideo =
                    video;


                /*
                 * Pause every other
                 * birthday video
                 */

                const allVideos =
                    experience.querySelectorAll(
                        "video"
                    );


                allVideos.forEach(
                    function (other) {

                        if (
                            other !==
                            video
                        ) {

                            try {
                                other.pause();
                            } catch (e) {}

                        }

                    }
                );

            }
        );


        /*
         * NETWORK STALL
         *
         * Temporary stall is allowed.
         * Only permanently unavailable
         * video gets skipped.
         */

        let stallTimer =
            null;


        video.addEventListener(
            "stalled",
            function () {

                if (stallTimer) {
                    clearTimeout(
                        stallTimer
                    );
                }


                stallTimer =
                    setTimeout(
                        function () {

                            if (
                                !finished &&
                                video.readyState <
                                    2
                            ) {

                                finished =
                                    true;


                                skipVideoSection(
                                    video,
                                    "network timeout"
                                );

                            }

                        },
                        7000
                    );

            }
        );


        /*
         * CAN PLAY
         */

        video.addEventListener(
            "canplay",
            function () {

                if (stallTimer) {

                    clearTimeout(
                        stallTimer
                    );

                    stallTimer =
                        null;

                }

            }
        );

    }


    /* =====================================================
       SKIP VIDEO
    ===================================================== */

    function skipVideoSection(
        video,
        reason
    ) {

        console.warn(
            "⏭️ Skipping video:",
            reason
        );


        if (!video) return;


        const section =
            video.closest(
                ".bx-section"
            );


        /*
         * Stop video safely
         */

        try {

            video.pause();

            video.removeAttribute(
                "src"
            );

            const source =
                video.querySelector(
                    "source"
                );


            if (source) {

                source.removeAttribute(
                    "src"
                );

            }


            video.load();

        } catch (e) {

            console.warn(
                "Video cleanup:",
                e
            );

        }


        /*
         * Hide complete section
         */

        if (section) {

            hideSection(
                section
            );


            /*
             * Continue automatically
             */

            const next =
                getNextSection(
                    section
                );


            if (next) {

                setTimeout(
                    function () {

                        next.scrollIntoView({
                            behavior:
                                "smooth",
                            block:
                                "start"
                        });

                    },
                    600
                );

            }

        }

    }


    /* =====================================================
       MUSIC
       MISSING MUSIC NEVER BREAKS PAGE
    ===================================================== */

    function setupMusic() {

        if (
            !hasPath(C.music)
        ) {

            console.warn(
                "ℹ️ No music configured."
            );

            return;

        }


        music =
            document.createElement(
                "audio"
            );


        music.id =
            "birthdayMusic";


        music.src =
            C.music;


        music.loop =
            true;


        music.preload =
            "auto";


        music.volume =
            typeof C.musicVolume ===
            "number"
                ? Math.max(
                    0,
                    Math.min(
                        1,
                        C.musicVolume
                    )
                )
                : 0.45;


        /*
         * MUSIC ERROR
         */

        music.addEventListener(
            "error",
            function () {

                console.warn(
                    "⚠️ Music unavailable. Continuing without music."
                );

            },
            {
                once: true
            }
        );


        document.body.appendChild(
            music
        );


        /*
         * BUTTON
         */

        const button =
            document.getElementById(
                "bxMusic"
            );


        if (!button) return;


        button.addEventListener(
            "click",
            function () {

                if (!music) return;


                if (
                    music.paused
                ) {

                    playMusic();

                } else {

                    music.pause();

                    button.textContent =
                        "🔇";

                }

            }
        );

    }


    /* =====================================================
       SAFE MUSIC PLAY
    ===================================================== */

    function playMusic() {

        if (!music) return;


        const button =
            document.getElementById(
                "bxMusic"
            );


        try {

            const promise =
                music.play();


            if (
                promise &&
                typeof promise.catch ===
                    "function"
            ) {

                promise.catch(
                    function () {

                        /*
                         * Browser autoplay
                         * blocked.
                         *
                         * No error screen.
                         */

                        console.warn(
                            "ℹ️ Music autoplay blocked. User can start it manually."
                        );

                    }
                );

            }


            if (button) {

                button.textContent =
                    "🎵";

            }

        } catch (error) {

            console.warn(
                "Music play failed:",
                error
            );

        }

    }


    /* =====================================================
       START BUTTON
    ===================================================== */

    function setupStartButton() {

        const button =
            document.getElementById(
                "bxStart"
            );


        if (!button) return;


        button.addEventListener(
            "click",
            function () {

                playMusic();


                const firstSection =
                    experience.querySelector(
                        '[data-section="hero"]'
                    );


                if (firstSection) {

                    firstSection.scrollIntoView({
                        behavior:
                            "smooth",
                        block:
                            "start"
                    });

                }

            }
        );

    }


    /* =====================================================
       PROGRESS BAR
    ===================================================== */

    function setupProgress() {

        if (!experience) return;


        experience.addEventListener(
            "scroll",
            function () {

                const max =
                    experience.scrollHeight -
                    experience.clientHeight;


                const percent =
                    max > 0
                        ? (
                            experience.scrollTop /
                            max
                        ) * 100
                        : 0;


                const bar =
                    document.getElementById(
                        "bxProgress"
                    );


                if (bar) {

                    bar.style.width =
                        percent + "%";

                }

            }
        );

    }


    /* =====================================================
       LIGHTBOX EVENTS
    ===================================================== */

    function setupLightbox() {

        const close =
            document.getElementById(
                "bxClose"
            );


        if (close) {

            close.addEventListener(
                "click",
                closeLightbox
            );

        }


        const lightbox =
            document.getElementById(
                "bxLightbox"
            );


        if (lightbox) {

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

        }


        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key ===
                    "Escape"
                ) {

                    closeLightbox();

                }

            }
        );

    }


    /* =====================================================
       FINAL CELEBRATION
    ===================================================== */

    function launchFinalCelebration() {

        if (
            finalCelebrationStarted
        ) {

            return;

        }


        finalCelebrationStarted =
            true;


        console.log(
            "🎆 Final birthday celebration!"
        );


        /*
         * Create hearts
         */

        for (
            let i = 0;
            i < 90;
            i++
        ) {

            const heart =
                document.createElement(
                    "div"
                );


            const symbols = [
                "♥",
                "❤",
                "💗",
                "✨",
                "💖"
            ];


            heart.textContent =
                symbols[
                    Math.floor(
                        Math.random() *
                        symbols.length
                    )
                ];


            heart.style.position =
                "fixed";


            heart.style.left =
                Math.random() *
                100 +
                "vw";


            heart.style.top =
                "-40px";


            heart.style.zIndex =
                "100000";


            heart.style.fontSize =
                (
                    15 +
                    Math.random() *
                    25
                ) +
                "px";


            heart.style.color =
                "#ff65b9";


            heart.style.pointerEvents =
                "none";


            const duration =
                3000 +
                Math.random() *
                3500;


            heart.animate(
                [
                    {
                        transform:
                            "translateY(0) rotate(0deg)",
                        opacity:
                            1
                    },
                    {
                        transform:
                            "translateY(115vh) rotate(600deg)",
                        opacity:
                            0
                    }
                ],
                {
                    duration:
                        duration,
                    easing:
                        "ease-out"
                }
            );


            document.body.appendChild(
                heart
            );


            setTimeout(
                function () {

                    if (
                        heart &&
                        heart.parentNode
                    ) {

                        heart.remove();

                    }

                },
                duration + 500
            );

        }


        /*
         * Try to activate existing
         * fireworks if available.
         *
         * We DO NOT depend on it.
         */

        try {

            if (
                typeof fireworks ===
                "function"
            ) {

                fireworks();

            }

        } catch (e) {

            console.log(
                "Existing fireworks unavailable:",
                e
            );

        }


        /*
         * Scroll to final section
         */

        const finalSection =
            experience.querySelector(
                '[data-section="final"]'
            );


        if (finalSection) {

            setTimeout(
                function () {

                    finalSection.scrollIntoView({
                        behavior:
                            "smooth",
                        block:
                            "start"
                    });

                },
                700
            );

        }

    }


    /* =====================================================
       GLOBAL FALLBACK
       If ANY non-critical part fails,
       website still stays usable.
    ===================================================== */

    function safeRun(
        functionName,
        callback
    ) {

        try {

            callback();

        } catch (error) {

            console.error(
                "Birthday module error [" +
                functionName +
                "]:",
                error
            );

        }

    }


    /* =====================================================
       INITIALIZATION
    ===================================================== */

    function initialize() {

        safeRun(
            "createExperience",
            createExperience
        );


        if (!experience) {

            return;

        }


        safeRun(
            "buildStory",
            buildStory
        );


        safeRun(
            "buildLetter",
            buildLetter
        );


        safeRun(
            "buildGallery",
            buildGallery
        );


        safeRun(
            "setupMusic",
            setupMusic
        );


        safeRun(
            "setupStartButton",
            setupStartButton
        );


        safeRun(
            "setupProgress",
            setupProgress
        );


        safeRun(
            "setupLightbox",
            setupLightbox
        );


        /*
         * Setup videos separately
         */

        safeRun(
            "video1",
            function () {

                setupVideo(
                    "bxVideo1",
                    C.memoryVideo,
                    false
                );

            }
        );


        safeRun(
            "video2",
            function () {

                setupVideo(
                    "bxVideo2",
                    C.secondVideo,
                    false
                );

            }
        );


        safeRun(
            "finalVideo",
            function () {

                setupVideo(
                    "bxFinalVideo",
                    C.finalVideo,
                    true
                );

            }
        );


        console.log(
            "❤️ Cinematic Birthday Experience loaded for:",
            C.name
        );

    }


    /* =====================================================
       DOM READY
    ===================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initialize
        );

    } else {

        initialize();

    }


})();
