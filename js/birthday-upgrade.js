/* =========================================================
   CINEMATIC BIRTHDAY EXPERIENCE
   Stable Scene Engine
   Compatible with:
   - config.js
   - cinematic.css
   - existing garden.js
   - existing fireworks.js
   - existing functions.js

   IMPORTANT:
   Replace the COMPLETE old birthday-upgrade.js
   with this file.
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       CONFIG
    ===================================================== */

    var CONFIG = null;

    try {

        if (typeof BIRTHDAY_CONFIG !== "undefined") {
            CONFIG = BIRTHDAY_CONFIG;
        }

    } catch (e) {}


    if (!CONFIG) {

        try {
            CONFIG = window.BIRTHDAY_CONFIG;
        } catch (e) {}

    }


    if (!CONFIG) {

        console.error(
            "Birthday Experience: BIRTHDAY_CONFIG not found."
        );

        return;
    }


    /* =====================================================
       STATE
    ===================================================== */

    var state = {

        started: false,

        finished: false,

        currentScene: null,

        musicStarted: false,

        videoPlaying: false,

        finalRevealStarted: false,

        locked: true

    };


    var root = null;

    var music = null;


    /* =====================================================
       HELPERS
    ===================================================== */

    function exists(value) {

        return (
            typeof value === "string" &&
            value.trim() !== ""
        );

    }


    function safeArray(value) {

        return Array.isArray(value)
            ? value
            : [];

    }


    function esc(value) {

        if (
            value === undefined ||
            value === null
        ) {

            return "";

        }


        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

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
       CSS SAFETY LAYER
       
       This is intentionally injected so the JS does not
       depend on one particular version of cinematic.css.
    ===================================================== */

    function injectSafetyCSS() {

        if (
            document.getElementById(
                "birthdaySafetyCSS"
            )
        ) {

            return;

        }


        var style =
            document.createElement("style");


        style.id =
            "birthdaySafetyCSS";


        style.textContent = `

            #birthdayExperience {
                position: fixed !important;
                inset: 0 !important;
                width: 100vw !important;
                height: 100vh !important;
                z-index: 99990 !important;
                overflow: hidden !important;
                background: #050308;
                color: #fff;
            }

            #birthdayExperience .bx-scene {
                position: absolute !important;
                inset: 0 !important;
                width: 100% !important;
                height: 100% !important;
                opacity: 0 !important;
                visibility: hidden !important;
                pointer-events: none !important;
                transform: scale(1.02);
                transition:
                    opacity 900ms ease,
                    transform 1200ms ease,
                    visibility 900ms ease;
                overflow-y: auto !important;
                overflow-x: hidden !important;
                -webkit-overflow-scrolling: touch;
            }

            #birthdayExperience .bx-scene.active {
                opacity: 1 !important;
                visibility: visible !important;
                pointer-events: auto !important;
                transform: scale(1);
                z-index: 5;
            }

            #birthdayExperience .bx-scene.exit {
                opacity: 0 !important;
                visibility: hidden !important;
                pointer-events: none !important;
                transform: scale(.98);
            }

            #birthdayExperience .bx-stage {
                min-height: 100%;
                min-height: 100dvh;
                width: 100%;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: center;
                padding:
                    60px
                    24px;
            }

            #birthdayExperience .bx-inner {
                width: min(1000px, 92vw);
                margin: 0 auto;
                text-align: center;
            }

            #birthdayExperience .bx-kicker {
                font-size: 10px;
                letter-spacing: 5px;
                text-transform: uppercase;
                opacity: .65;
                margin-bottom: 24px;
            }

            #birthdayExperience h1 {
                font-size:
                    clamp(
                        45px,
                        9vw,
                        105px
                    );
                line-height: .95;
                margin: 0;
                font-weight: 700;
                letter-spacing: -3px;
            }

            #birthdayExperience h1 span {
                color: #ff75bd;
            }

            #birthdayExperience h2 {
                font-size:
                    clamp(
                        32px,
                        6vw,
                        70px
                    );
                line-height: 1;
                margin: 0 0 25px;
            }

            #birthdayExperience p {
                line-height: 1.9;
            }

            #birthdayExperience .bx-button {
                appearance: none;
                border: 1px solid rgba(255,255,255,.35);
                background:
                    linear-gradient(
                        135deg,
                        rgba(255,255,255,.14),
                        rgba(255,95,175,.18)
                    );
                color: white;
                padding: 16px 28px;
                border-radius: 999px;
                cursor: pointer;
                letter-spacing: 2px;
                font-size: 11px;
                transition:
                    transform .25s ease,
                    background .25s ease;
                margin-top: 28px;
            }

            #birthdayExperience .bx-button:hover {
                transform: translateY(-3px);
                background:
                    linear-gradient(
                        135deg,
                        rgba(255,255,255,.22),
                        rgba(255,95,175,.28)
                    );
            }

            #birthdayExperience .bx-button:active {
                transform: scale(.97);
            }

            #birthdayExperience .bx-text {
                max-width: 700px;
                margin: 0 auto;
                color: rgba(255,255,255,.72);
                font-size: 16px;
            }

            #birthdayExperience .bx-text p {
                margin: 0 0 20px;
            }

            #birthdayExperience .bx-highlight {
                color: #ff8ac8;
                font-size: 19px;
            }

            #birthdayExperience .bx-gallery {
                width: min(1000px, 94vw);
                margin: 40px auto 0;
                display: grid;
                grid-template-columns:
                    repeat(
                        auto-fit,
                        minmax(180px, 1fr)
                    );
                gap: 14px;
            }

            #birthdayExperience .bx-photo {
                aspect-ratio: 1 / 1;
                overflow: hidden;
                border-radius: 18px;
                cursor: pointer;
                background: #111;
                border:
                    1px solid
                    rgba(255,255,255,.1);
            }

            #birthdayExperience .bx-photo img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                display: block;
                transition:
                    transform .6s ease;
            }

            #birthdayExperience .bx-photo:hover img {
                transform: scale(1.06);
            }

            #birthdayExperience .bx-video-wrap {
                width: min(900px, 94vw);
                margin: 35px auto 0;
            }

            #birthdayExperience video {
                display: block;
                width: 100%;
                max-height: 72vh;
                border-radius: 18px;
                background: #000;
                box-shadow:
                    0 20px 70px
                    rgba(0,0,0,.45);
            }

            #birthdayExperience .bx-video-note {
                margin-top: 18px;
                color: rgba(255,255,255,.45);
                font-size: 10px;
                letter-spacing: 2px;
                text-transform: uppercase;
            }

            #birthdayExperience .bx-letter {
                width: min(720px, 90vw);
                margin: 0 auto;
                text-align: left;
                color: rgba(255,255,255,.76);
                font-size: 17px;
            }

            #birthdayExperience .bx-letter p {
                margin:
                    0 0
                    24px;
            }

            #birthdayExperience .bx-letter .special {
                color: #ff8ac8;
            }

            #birthdayExperience .bx-final-message {
                max-width: 650px;
                margin: 35px auto;
                color: rgba(255,255,255,.72);
                font-size: 17px;
            }

            #birthdayExperience .bx-secret {
                width: min(600px, 88vw);
                margin: 45px auto 0;
                padding: 30px;
                border:
                    1px solid
                    rgba(255,255,255,.1);
                border-radius: 22px;
                background:
                    rgba(255,255,255,.035);
            }

            #birthdayExperience .bx-secret strong {
                color: #ff73bc;
                letter-spacing: 3px;
            }

            #birthdayExperience .bx-secret p {
                color: rgba(255,255,255,.7);
            }

            #birthdayExperience .bx-heart {
                color: #ff6bb8;
                font-size: 32px;
                margin: 15px 0;
                animation:
                    birthdayPulse
                    1.5s
                    ease-in-out
                    infinite;
            }

            #birthdayExperience .bx-secret small {
                color: rgba(255,255,255,.42);
                line-height: 1.8;
            }

            #birthdayExperience .bx-music {
                position: fixed;
                right: 20px;
                top: 20px;
                z-index: 100;
                width: 42px;
                height: 42px;
                border-radius: 50%;
                border:
                    1px solid
                    rgba(255,255,255,.18);
                background:
                    rgba(255,255,255,.07);
                color: white;
                cursor: pointer;
            }

            #birthdayExperience .bx-progress {
                position: fixed;
                top: 0;
                left: 0;
                height: 2px;
                width: 0;
                z-index: 110;
                background: #ff72bb;
                transition: width .3s ease;
            }

            #birthdayExperience .bx-lightbox {
                position: fixed;
                inset: 0;
                z-index: 200;
                background:
                    rgba(0,0,0,.94);
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 30px;
                opacity: 0;
                visibility: hidden;
                pointer-events: none;
                transition: opacity .3s ease;
            }

            #birthdayExperience .bx-lightbox.show {
                opacity: 1;
                visibility: visible;
                pointer-events: auto;
            }

            #birthdayExperience .bx-lightbox img {
                max-width: 94vw;
                max-height: 90vh;
                object-fit: contain;
                border-radius: 12px;
            }

            #birthdayExperience .bx-close {
                position: absolute;
                right: 20px;
                top: 20px;
                width: 44px;
                height: 44px;
                border: 0;
                border-radius: 50%;
                background:
                    rgba(255,255,255,.1);
                color: white;
                font-size: 28px;
                cursor: pointer;
            }

            @keyframes birthdayPulse {
                0%,100% {
                    transform: scale(1);
                }

                50% {
                    transform: scale(1.18);
                }
            }

            @media(max-width:600px) {

                #birthdayExperience .bx-stage {
                    padding:
                        50px
                        18px;
                }

                #birthdayExperience .bx-letter {
                    font-size: 15px;
                }

                #birthdayExperience .bx-gallery {
                    grid-template-columns:
                        repeat(2,1fr);
                }

            }

        `;


        document.head.appendChild(
            style
        );

    }


    /* =====================================================
       CREATE ROOT
    ===================================================== */

    function createRoot() {

        var old =
            document.getElementById(
                "birthdayExperience"
            );


        if (old) {

            old.remove();

        }


        root =
            document.createElement("div");


        root.id =
            "birthdayExperience";


        root.setAttribute(
            "aria-label",
            "Birthday surprise"
        );


        document.body.appendChild(
            root
        );

    }


    /* =====================================================
       SCENE HTML
    ===================================================== */

    function scene(
        id,
        html
    ) {

        var el =
            document.createElement(
                "section"
            );


        el.className =
            "bx-scene";


        el.id =
            id;


        el.innerHTML =
            html;


        root.appendChild(
            el
        );


        return el;

    }


    /* =====================================================
       BUILD INTRO
    ===================================================== */

    function buildIntro() {

        return scene(
            "bxSceneIntro",
            `

            <div class="bx-stage">

                <div class="bx-inner">

                    <div class="bx-kicker">
                        A LITTLE SOMETHING FOR YOU
                    </div>

                    <h1>

                        Hey,

                        <br>

                        <span>
                            ${esc(CONFIG.name)}
                        </span>

                    </h1>

                    <p class="bx-text"
                       style="margin-top:30px;">

                        ${esc(
                            CONFIG.introSmallText ||
                            "I could have just wished you normally..."
                        )}

                        <br><br>

                        ${esc(
                            CONFIG.introText ||
                            "But you're not exactly a normal person to me."
                        )}

                    </p>

                    <button
                        class="bx-button"
                        id="bxStartButton">

                        OPEN YOUR SURPRISE ✦

                    </button>

                    <div
                        style="
                        margin-top:24px;
                        font-size:10px;
                        letter-spacing:3px;
                        opacity:.4;
                        ">

                        🔊 TURN YOUR VOLUME UP

                    </div>

                </div>

            </div>

            `
        );

    }


    /* =====================================================
       BUILD HERO
    ===================================================== */

    function buildHero() {

        return scene(
            "bxSceneHero",
            `

            <div class="bx-stage">

                <div class="bx-inner">

                    <div class="bx-kicker">
                        TODAY IS DIFFERENT
                    </div>

                    <h1>

                        Happy

                        <br>

                        <span>
                            Birthday
                        </span>

                    </h1>

                    <div
                        style="
                        margin-top:35px;
                        font-size:
                        clamp(25px,5vw,55px);
                        ">

                        ${esc(CONFIG.name)}
                        ❤️

                    </div>

                    <p
                        class="bx-text"
                        style="margin-top:30px;">

                        Some people enter your life
                        normally...

                        <br><br>

                        and somehow become
                        a little more special
                        than they were supposed to.

                    </p>

                </div>

            </div>

            `
        );

    }


    /* =====================================================
       BUILD STORY
    ===================================================== */

    function buildStory() {

        var lines =
            safeArray(
                CONFIG.storyLines
            );


        var html =
            lines.map(
                function (line, index) {

                    return `
                        <p
                            class="${
                                index ===
                                lines.length - 1
                                    ? "bx-highlight"
                                    : ""
                            }">

                            ${esc(line)}

                        </p>
                    `;

                }
            ).join("");


        return scene(
            "bxSceneStory",
            `

            <div class="bx-stage">

                <div class="bx-inner">

                    <div class="bx-kicker">
                        01 — A LITTLE STORY
                    </div>

                    <h2>

                        ${esc(
                            CONFIG.storyTitle ||
                            "This wasn't supposed to become this."
                        )}

                    </h2>

                    <div class="bx-text">

                        ${html}

                    </div>

                </div>

            </div>

            `
        );

    }


    /* =====================================================
       BUILD PHOTOS
    ===================================================== */

    function buildPhotos() {

        var photos =
            safeArray(
                CONFIG.photos
            );


        var cards = "";


        photos.forEach(
            function (path, index) {

                if (!exists(path)) {
                    return;
                }


                cards += `

                    <div
                        class="bx-photo"
                        data-photo="${esc(path)}">

                        <img
                            src="${esc(path)}"
                            alt="Memory ${index + 1}"
                            loading="lazy">

                    </div>

                `;

            }
        );


        return scene(
            "bxScenePhotos",
            `

            <div class="bx-stage">

                <div class="bx-inner">

                    <div class="bx-kicker">
                        02 — LITTLE MOMENTS
                    </div>

                    <h2>

                        Things worth
                        <span>remembering.</span>

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

                        ${cards}

                    </div>

                </div>

            </div>

            `
        );

    }


    /* =====================================================
       BUILD VIDEO SCENE
    ===================================================== */

    function buildVideo(
        id,
        number,
        title,
        path,
        finalVideo
    ) {

        var section =
            scene(
                id,
                `

                <div class="bx-stage">

                    <div class="bx-inner">

                        <div class="bx-kicker">
                            ${esc(number)}
                        </div>

                        <h2>
                            ${esc(title)}
                        </h2>

                        <div
                            class="bx-video-wrap">

                            <video
                                playsinline
                                controls
                                preload="metadata"
                                data-video-path="${esc(
                                    path || ""
                                )}"
                                data-final="${
                                    finalVideo
                                        ? "1"
                                        : "0"
                                }">

                                <source
                                    src="${esc(
                                        path || ""
                                    )}"
                                    type="video/mp4">

                            </video>

                        </div>

                        <div class="bx-video-note">
                            ${finalVideo
                                ? "THE LAST SURPRISE"
                                : "PRESS PLAY"}
                        </div>

                    </div>

                </div>

                `
            );


        return section;

    }


    /* =====================================================
       BUILD LETTER
    ===================================================== */

    function buildLetter() {

        var lines =
            safeArray(
                CONFIG.letter
            );


        var html =
            lines.map(
                function (line, index) {

                    return `
                        <p class="${
                            index ===
                            lines.length - 1
                                ? "special"
                                : ""
                        }">

                            ${esc(line)}

                        </p>
                    `;

                }
            ).join("");


        return scene(
            "bxSceneLetter",
            `

            <div class="bx-stage">

                <div class="bx-inner">

                    <div class="bx-kicker">
                        04 — SOMETHING I WANTED TO SAY
                    </div>

                    <div class="bx-letter">

                        <h2>

                            Hey
                            <span>
                                ${esc(CONFIG.name)}
                            </span>,

                        </h2>

                        ${html}

                        <div
                            style="
                            margin-top:50px;
                            opacity:.7;
                            ">

                            — Someone who may like you

                            <br>

                            <span
                                style="
                                color:#ff73bc;
                                ">

                                a little more than he should. ♥

                            </span>

                        </div>

                    </div>

                </div>

            </div>

            `
        );

    }


    /* =====================================================
       BUILD FINAL MESSAGE
    ===================================================== */

    function buildFinal() {

        return scene(
            "bxSceneFinal",
            `

            <div class="bx-stage">

                <div class="bx-inner">

                    <div class="bx-kicker">
                        AND FINALLY...
                    </div>

                    <h1>

                        Happy

                        <br>

                        <span>
                            Birthday.
                        </span>

                    </h1>

                    <div
                        style="
                        margin-top:30px;
                        font-size:
                        clamp(25px,5vw,55px);
                        ">

                        ${esc(CONFIG.name)}
                        ❤️

                    </div>

                    <p class="bx-final-message">

                        ${esc(
                            CONFIG.finalMessage || ""
                        )}

                    </p>

                    <div class="bx-secret">

                        <strong>
                            P.S.
                        </strong>

                        <p>

                            ${esc(
                                CONFIG.finalSecret || ""
                            )}

                        </p>

                        <div class="bx-heart">
                            ♥
                        </div>

                        <small>

                            ${esc(
                                CONFIG.finalFooter || ""
                            )}

                        </small>

                    </div>

                </div>

            </div>

            `
        );

    }


    /* =====================================================
       BUILD LIGHTBOX
    ===================================================== */

    function buildLightbox() {

        var el =
            document.createElement(
                "div"
            );


        el.className =
            "bx-lightbox";


        el.id =
            "bxLightbox";


        el.innerHTML = `

            <button
                class="bx-close"
                id="bxLightboxClose">

                ×

            </button>

            <img
                id="bxLightboxImage"
                alt="Memory">

        `;


        root.appendChild(
            el
        );

    }


    /* =====================================================
       BUILD MUSIC
    ===================================================== */

    function buildMusic() {

        var button =
            document.createElement(
                "button"
            );


        button.className =
            "bx-music";


        button.id =
            "bxMusicButton";


        button.textContent =
            "🔇";


        button.setAttribute(
            "aria-label",
            "Music"
        );


        root.appendChild(
            button
        );


        if (!exists(CONFIG.music)) {

            return;

        }


        music =
            document.createElement(
                "audio"
            );


        music.id =
            "birthdayMusic";


        music.src =
            CONFIG.music;


        music.loop =
            true;


        music.preload =
            "auto";


        music.volume =
            typeof CONFIG.musicVolume ===
            "number"
                ? Math.max(
                    0,
                    Math.min(
                        1,
                        CONFIG.musicVolume
                    )
                )
                : .45;


        music.addEventListener(
            "error",
            function () {

                console.warn(
                    "Birthday music unavailable."
                );

            },
            {
                once: true
            }
        );


        root.appendChild(
            music
        );


        button.addEventListener(
            "click",
            function () {

                if (!music) {
                    return;
                }


                if (music.paused) {

                    safePlayMusic();

                } else {

                    music.pause();

                    button.textContent =
                        "🔇";

                }

            }
        );

    }


    /* =====================================================
       MUSIC
    ===================================================== */

    function safePlayMusic() {

        if (!music) {
            return;
        }


        try {

            var promise =
                music.play();


            if (
                promise &&
                typeof promise.catch ===
                "function"
            ) {

                promise.catch(
                    function () {

                        console.warn(
                            "Music autoplay blocked."
                        );

                    }
                );

            }


            var button =
                document.getElementById(
                    "bxMusicButton"
                );


            if (button) {

                button.textContent =
                    "🎵";

            }


            state.musicStarted =
                true;

        } catch (error) {

            console.warn(
                "Music could not start.",
                error
            );

        }

    }


    /* =====================================================
       SCENE MANAGEMENT
    ===================================================== */

    function getScenes() {

        return Array.prototype.slice.call(
            root.querySelectorAll(
                ".bx-scene"
            )
        );

    }


    function showScene(
        target
    ) {

        if (!target) {
            return;
        }


        var scenes =
            getScenes();


        scenes.forEach(
            function (sceneEl) {

                if (
                    sceneEl ===
                    target
                ) {

                    sceneEl.classList.remove(
                        "exit"
                    );

                    sceneEl.classList.add(
                        "active"
                    );

                } else {

                    if (
                        sceneEl.classList.contains(
                            "active"
                        )
                    ) {

                        sceneEl.classList.remove(
                            "active"
                        );

                        sceneEl.classList.add(
                            "exit"
                        );

                    } else {

                        sceneEl.classList.remove(
                            "active"
                        );

                    }

                }

            }
        );


        state.currentScene =
            target;


        /*
         * Reset scroll of target scene
         */

        try {

            target.scrollTop =
                0;

        } catch (e) {}


        /*
         * Progress
         */

        updateProgress();

    }


    function showSceneById(id) {

        var target =
            document.getElementById(id);


        if (!target) {
            return false;
        }


        showScene(target);

        return true;

    }


    /* =====================================================
       NEXT SCENE
    ===================================================== */

    function nextScene() {

        var scenes =
            getScenes();


        var index =
            scenes.indexOf(
                state.currentScene
            );


        if (index < 0) {
            return;
        }


        var next =
            scenes[index + 1];


        if (!next) {

            finishExperience();

            return;

        }


        /*
         * If next scene has been marked
         * as skipped, continue.
         */

        if (
            next.dataset.skip ===
            "true"
        ) {

            state.currentScene =
                next;


            nextScene();

            return;

        }


        showScene(next);

    }


    /* =====================================================
       PROGRESS
    ===================================================== */

    function updateProgress() {

        var scenes =
            getScenes();


        var current =
            scenes.indexOf(
                state.currentScene
            );


        if (current < 0) {
            return;
        }


        var percent =
            scenes.length > 1
                ? (
                    current /
                    (scenes.length - 1)
                ) * 100
                : 0;


        var old =
            document.getElementById(
                "bxProgress"
            );


        if (!old) {

            var bar =
                document.createElement(
                    "div"
                );


            bar.id =
                "bxProgress";


            bar.style.position =
                "fixed";


            bar.style.top =
                "0";


            bar.style.left =
                "0";


            bar.style.height =
                "2px";


            bar.style.zIndex =
                "100";


            bar.style.background =
                "#ff72bb";


            bar.style.transition =
                "width .5s ease";


            root.appendChild(
                bar
            );


            old =
                bar;

        }


        old.style.width =
            percent + "%";

    }


    /* =====================================================
       START EXPERIENCE
    ===================================================== */

    function startExperience() {

        if (state.started) {
            return;
        }


        state.started =
            true;


        state.locked =
            false;


        /*
         * Start music only NOW.
         */

        safePlayMusic();


        /*
         * First cinematic scene.
         */

        showSceneById(
            "bxSceneHero"
        );

    }


    /* =====================================================
       PHOTO SAFETY
    ===================================================== */

    function setupPhotos() {

        var images =
            root.querySelectorAll(
                ".bx-photo img"
            );


        Array.prototype.forEach.call(
            images,
            function (img) {

                img.addEventListener(
                    "error",
                    function () {

                        var card =
                            img.closest(
                                ".bx-photo"
                            );


                        if (card) {

                            card.remove();

                        }


                        checkPhotoScene();

                    },
                    {
                        once: true
                    }
                );


                img.addEventListener(
                    "click",
                    function () {

                        openLightbox(
                            img.src
                        );

                    }
                );

            }
        );


        checkPhotoScene();

    }


    function checkPhotoScene() {

        var gallery =
            document.getElementById(
                "bxGallery"
            );


        if (!gallery) {
            return;
        }


        if (
            gallery.querySelectorAll(
                ".bx-photo"
            ).length === 0
        ) {

            skipScene(
                "bxScenePhotos"
            );

        }

    }


    /* =====================================================
       LIGHTBOX
    ===================================================== */

    function openLightbox(src) {

        var box =
            document.getElementById(
                "bxLightbox"
            );


        var image =
            document.getElementById(
                "bxLightboxImage"
            );


        if (!box || !image) {
            return;
        }


        image.src =
            src;


        box.classList.add(
            "show"
        );

    }


    function closeLightbox() {

        var box =
            document.getElementById(
                "bxLightbox"
            );


        if (box) {

            box.classList.remove(
                "show"
            );

        }

    }


    /* =====================================================
       VIDEO HANDLING
       
       IMPORTANT:
       A missing video NEVER blocks the sequence.
    ===================================================== */

    function setupVideos() {

        var videos =
            root.querySelectorAll(
                "video"
            );


        Array.prototype.forEach.call(
            videos,
            function (video) {

                setupOneVideo(
                    video
                );

            }
        );

    }


    function setupOneVideo(video) {

        var sceneEl =
            video.closest(
                ".bx-scene"
            );


        if (!sceneEl) {
            return;
        }


        var path =
            video.getAttribute(
                "data-video-path"
            );


        /*
         * Empty path
         */

        if (!exists(path)) {

            skipVideoScene(
                video,
                "empty path"
            );

            return;

        }


        var finished =
            false;


        /*
         * ERROR
         */

        function onError() {

            if (finished) {
                return;
            }


            finished =
                true;


            skipVideoScene(
                video,
                "load error"
            );

        }


        video.addEventListener(
            "error",
            onError,
            {
                once: true
            }
        );


        /*
         * ENDED
         */

        video.addEventListener(
            "ended",
            function () {

                if (finished) {
                    return;
                }


                finished =
                    true;


                state.videoPlaying =
                    false;


                var isFinal =
                    video.getAttribute(
                        "data-final"
                    ) === "1";


                if (isFinal) {

                    finishExperience();

                } else {

                    nextScene();

                }

            }
        );


        /*
         * PLAY
         */

        video.addEventListener(
            "play",
            function () {

                state.videoPlaying =
                    true;


                /*
                 * Pause all other videos.
                 */

                var all =
                    root.querySelectorAll(
                        "video"
                    );


                Array.prototype.forEach.call(
                    all,
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


        video.addEventListener(
            "pause",
            function () {

                state.videoPlaying =
                    false;

            }
        );


        /*
         * If browser cannot load
         * source, skip after short delay.
         */

        var timeout =
            setTimeout(
                function () {

                    if (
                        !finished &&
                        video.readyState === 0
                    ) {

                        /*
                         * Don't blindly skip if
                         * browser has not attempted
                         * network yet.
                         */

                        try {

                            video.load();

                        } catch (e) {}

                    }

                },
                1500
            );


        video.addEventListener(
            "loadedmetadata",
            function () {

                clearTimeout(
                    timeout
                );

            },
            {
                once: true
            }
        );


        video.addEventListener(
            "canplay",
            function () {

                clearTimeout(
                    timeout
                );

            },
            {
                once: true
            }
        );

    }


    /* =====================================================
       SKIP VIDEO
    ===================================================== */

    function skipVideoScene(
        video,
        reason
    ) {

        console.warn(
            "Skipping video:",
            reason,
            video
                ? video.getAttribute(
                    "data-video-path"
                )
                : ""
        );


        var sceneEl =
            video
                ? video.closest(
                    ".bx-scene"
                )
                : null;


        if (!sceneEl) {
            return;
        }


        /*
         * Mark skipped.
         */

        sceneEl.dataset.skip =
            "true";


        /*
         * Stop video.
         */

        try {

            video.pause();

        } catch (e) {}


        /*
         * Hide scene.
         */

        sceneEl.style.display =
            "none";


        /*
         * If this scene is currently
         * active, automatically move on.
         */

        if (
            state.currentScene ===
            sceneEl
        ) {

            nextScene();

        }

    }


    /* =====================================================
       FINAL EXPERIENCE
    ===================================================== */

    function finishExperience() {

        if (
            state.finished
        ) {

            return;

        }


        state.finished =
            true;


        state.finalRevealStarted =
            true;


        /*
         * Stop any cinematic videos.
         */

        var videos =
            root.querySelectorAll(
                "video"
            );


        Array.prototype.forEach.call(
            videos,
            function (video) {

                try {
                    video.pause();
                } catch (e) {}

            }
        );


        /*
         * Music can continue during
         * final reveal.
         */


        /*
         * Hide cinematic overlay.
         */

        setTimeout(
            function () {

                revealOriginalBirthday();

            },
            600
        );

    }


    /* =====================================================
       ORIGINAL PAGE REVEAL
       
       We don't destroy garden.js/fireworks.js.
       We simply reveal the original page.
    ===================================================== */

    function revealOriginalBirthday() {

        /*
         * Try existing original page.
         */

        try {

            var original =
                document.getElementById(
                    "main"
                );


            if (original) {

                original.style.visibility =
                    "visible";

                original.style.opacity =
                    "1";

            }

        } catch (e) {}


        /*
         * Fade cinematic layer.
         */

        if (root) {

            root.style.transition =
                "opacity 1600ms ease";


            root.style.opacity =
                "0";


            setTimeout(
                function () {

                    if (root) {

                        root.style.display =
                            "none";

                    }

                },
                1700
            );

        }


        /*
         * Trigger original animation
         * if available.
         */

        setTimeout(
            function () {

                try {

                    if (
                        typeof startHeartAnimation ===
                        "function"
                    ) {

                        startHeartAnimation();

                    }

                } catch (e) {

                    console.log(
                        "Garden animation unavailable."
                    );

                }


                try {

                    if (
                        typeof startFireworks ===
                        "function"
                    ) {

                        startFireworks();

                    }

                } catch (e) {

                    console.log(
                        "Fireworks unavailable."
                    );

                }

            },
            500
        );


        /*
         * Fireworks fallbacks.
         */

        try {

            var canvas =
                document.getElementById(
                    "canvas"
                );


            if (canvas) {

                canvas.style.visibility =
                    "visible";

                canvas.style.opacity =
                    "1";

            }

        } catch (e) {}

    }


    /* =====================================================
       SKIP GENERIC SCENE
    ===================================================== */

    function skipScene(id) {

        var sceneEl =
            document.getElementById(
                id
            );


        if (!sceneEl) {
            return;
        }


        sceneEl.dataset.skip =
            "true";


        sceneEl.style.display =
            "none";

    }


    /* =====================================================
       START BUTTON
    ===================================================== */

    function setupStart() {

        var button =
            document.getElementById(
                "bxStartButton"
            );


        if (!button) {
            return;
        }


        button.addEventListener(
            "click",
            function () {

                startExperience();

            }
        );

    }


    /* =====================================================
       LIGHTBOX EVENTS
    ===================================================== */

    function setupLightbox() {

        var close =
            document.getElementById(
                "bxLightboxClose"
            );


        if (close) {

            close.addEventListener(
                "click",
                closeLightbox
            );

        }


        var box =
            document.getElementById(
                "bxLightbox"
            );


        if (box) {

            box.addEventListener(
                "click",
                function (event) {

                    if (
                        event.target ===
                        box
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
       PREVENT PAGE SCROLL
       
       Cinematic scenes handle their own scrolling.
    ===================================================== */

    function lockBody() {

        document.documentElement.style
            .overflow =
            "hidden";

        document.body.style
            .overflow =
            "hidden";

    }


    /* =====================================================
       UNLOCK BODY
    ===================================================== */

    function unlockBody() {

        document.documentElement.style
            .overflow =
            "";

        document.body.style
            .overflow =
            "";

    }


    /* =====================================================
       BUILD ALL
    ===================================================== */

    function build() {

        injectSafetyCSS();

        lockBody();

        createRoot();


        /*
         * Build in exact order.
         */

        buildIntro();

        buildHero();

        buildStory();

        buildPhotos();


        buildVideo(
            "bxSceneVideo1",
            "03 — PRESS PLAY",
            "Some moments deserve motion.",
            CONFIG.memoryVideo,
            false
        );


        buildLetter();


        buildVideo(
            "bxSceneVideo2",
            "05 — ONE MORE THING",
            "Okay... one more.",
            CONFIG.secondVideo,
            false
        );


        buildVideo(
            "bxSceneFinalVideo",
            "06 — THE LAST SURPRISE",
            "This one's just for you.",
            CONFIG.finalVideo,
            true
        );


        buildFinal();


        buildLightbox();

        buildMusic();


        /*
         * Intro active.
         */

        var intro =
            document.getElementById(
                "bxSceneIntro"
            );


        if (intro) {

            intro.classList.add(
                "active"
            );


            state.currentScene =
                intro;

        }


        /*
         * Setup interactions.
         */

        setupStart();

        setupPhotos();

        setupVideos();

        setupLightbox();


        /*
         * Ensure no video can autoplay
         * before Start.
         */

        var videos =
            root.querySelectorAll(
                "video"
            );


        Array.prototype.forEach.call(
            videos,
            function (video) {

                video.autoplay =
                    false;

                video.removeAttribute(
                    "autoplay"
                );

            }
        );


        console.log(
            "🎬 Cinematic Birthday Experience ready."
        );


        console.log(
            "👆 Waiting for START button."
        );

    }


    /* =====================================================
       SAFETY
    ===================================================== */

    function boot() {

        try {

            build();

        } catch (error) {

            console.error(
                "Birthday cinematic boot error:",
                error
            );

        }

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
            boot
        );

    } else {

        boot();

    }


})();
