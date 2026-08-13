/* =========================================================
   ❤️ CINEMATIC BIRTHDAY UPGRADE
   Works with existing:
   jquery.js
   garden.js
   functions.js
   fireworks.js
========================================================= */

(function(){

    "use strict";

    const C = BIRTHDAY_CONFIG;

    if(!C){
        console.error("BIRTHDAY_CONFIG not found.");
        return;
    }


    /* =====================================================
       PAGE TITLE
    ===================================================== */

    document.title =
        C.pageTitle || "Happy Birthday ❤️";


    /* =====================================================
       CREATE EXPERIENCE
    ===================================================== */

    const app =
        document.createElement("div");

    app.id =
        "birthdayExperience";

    app.innerHTML = `

        <div class="bx-noise"></div>

        <div class="bx-progress"
             id="bxProgress"></div>

        <button
            class="bx-music"
            id="bxMusic">
            🔇
        </button>


        <!-- =============================================
             INTRO
        ============================================== -->

        <section class="bx-screen">

            <div class="bx-center">

                <div class="bx-label">
                    A LITTLE SOMETHING FOR YOU
                </div>

                <h1 class="bx-intro-title">

                    Hey,

                    <span id="bxIntroName">
                        ${C.name}
                    </span>

                </h1>

                <p class="bx-subtitle">

                    ${C.introSmallText}

                    <br>

                    <span>
                        ${C.introText}
                    </span>

                </p>

                <button
                    class="bx-button"
                    id="bxStart">

                    Open Your Surprise ✦

                </button>

                <p style="
                    color:#665b68;
                    font-size:10px;
                    letter-spacing:2px;
                    margin-top:25px;
                ">

                    🔊 Turn your volume up

                </p>

            </div>

        </section>


        <!-- =============================================
             HERO
        ============================================== -->

        <section class="bx-section">

            <div class="bx-center">

                <div class="bx-section-label">
                    TODAY IS DIFFERENT
                </div>

                <h1 class="bx-heading">

                    Happy
                    <i>Birthday</i>

                </h1>

                <div
                    style="
                    font-size:clamp(30px,5vw,60px);
                    color:#ffe1f1;
                    margin-top:35px;
                    "
                    id="bxHeroName">

                    ${C.name} ❤️

                </div>

                <p class="bx-subtitle">

                    Some people enter your life normally...

                    <br>

                    and somehow become
                    a little more special
                    than they were supposed to.

                </p>

            </div>

        </section>


        <!-- =============================================
             STORY
        ============================================== -->

        <section class="bx-section">

            <div class="bx-container">

                <div class="bx-section-label">
                    01 — A LITTLE STORY
                </div>

                <h2 class="bx-heading">

                    ${C.storyTitle}

                </h2>

                <div class="bx-text"
                     id="bxStory">

                </div>

            </div>

        </section>


        <!-- =============================================
             PHOTOS
        ============================================== -->

        <section class="bx-section">

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

                    <br>

                    They're tiny pieces
                    of memories.

                </p>

                <div
                    class="bx-gallery"
                    id="bxGallery">

                </div>

            </div>

        </section>


        <!-- =============================================
             VIDEO 1
        ============================================== -->

        <section class="bx-section">

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
                            src="${C.memoryVideo}"
                            type="video/mp4">

                    </video>

                </div>

            </div>

        </section>


        <!-- =============================================
             INTERLUDE
        ============================================== -->

        <section
            class="bx-section bx-interlude">

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


        <!-- =============================================
             LETTER
        ============================================== -->

        <section class="bx-section">

            <div class="bx-container">

                <div class="bx-section-label">
                    04 — SOMETHING I WANTED TO SAY
                </div>

                <div class="bx-letter">

                    <h2>

                        Hey
                        <span>
                            ${C.name}
                        </span>,

                    </h2>

                    <div id="bxLetter"></div>

                    <div
                        style="
                        margin-top:60px;
                        color:#7d717d;
                        line-height:1.8;
                        ">

                        — Someone who may like you

                        <br>

                        <span
                            style="color:#ff73c2">

                            a little more than he should. ♥

                        </span>

                    </div>

                </div>

            </div>

        </section>


        <!-- =============================================
             VIDEO 2
        ============================================== -->

        <section class="bx-section">

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
                            src="${C.secondVideo}"
                            type="video/mp4">

                    </video>

                </div>

            </div>

        </section>


        <!-- =============================================
             FINAL VIDEO
        ============================================== -->

        <section class="bx-section">

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
                            src="${C.finalVideo}"
                            type="video/mp4">

                    </video>

                </div>

            </div>

        </section>


        <!-- =============================================
             FINAL
        ============================================== -->

        <section class="bx-section bx-final">

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

                <div
                    class="bx-final-name">

                    ${C.name} ❤️

                </div>

                <p class="bx-final-message">

                    ${C.finalMessage}

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

                    <p>
                        ${C.finalSecret}
                    </p>

                    <div class="bx-heart">
                        ♥
                    </div>

                    <small>
                        ${C.finalFooter}
                    </small>

                </div>

                <p style="
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
                src=""
                alt="Memory">

        </div>

    `;


    document.body.appendChild(app);


    /* =====================================================
       STORY
    ===================================================== */

    const story =
        document.getElementById("bxStory");

    C.storyLines.forEach(
        function(text,index){

            const p =
                document.createElement("p");

            p.textContent =
                text;

            if(
                index ===
                C.storyLines.length - 1
            ){

                p.className =
                    "bx-highlight";

            }

            story.appendChild(p);

        }
    );


    /* =====================================================
       LETTER
    ===================================================== */

    const letter =
        document.getElementById("bxLetter");

    C.letter.forEach(
        function(text,index){

            const p =
                document.createElement("p");

            p.textContent =
                text;

            if(
                text ===
                "You just became special."
            ){

                p.className =
                    "special";

            }

            if(
                index ===
                C.letter.length - 1
            ){

                p.className =
                    "special";

            }

            letter.appendChild(p);

        }
    );


    /* =====================================================
       GALLERY
    ===================================================== */

    const gallery =
        document.getElementById("bxGallery");

    C.photos.forEach(
        function(photo,index){

            const div =
                document.createElement("div");

            div.className =
                "bx-photo";

            div.innerHTML = `

                <img
                    src="${photo}"
                    loading="lazy"
                    alt="Memory ${index + 1}">

            `;

            div.addEventListener(
                "click",
                function(){

                    document
                        .getElementById(
                            "bxLightboxImage"
                        )
                        .src =
                        photo;

                    document
                        .getElementById(
                            "bxLightbox"
                        )
                        .classList
                        .add("show");

                }
            );

            gallery.appendChild(div);

        }
    );


    /* =====================================================
       LIGHTBOX
    ===================================================== */

    document
        .getElementById("bxClose")
        .addEventListener(
            "click",
            function(){

                document
                    .getElementById("bxLightbox")
                    .classList
                    .remove("show");

            }
        );


    /* =====================================================
       MUSIC
    ===================================================== */

    const audio =
        document.createElement("audio");

    audio.id =
        "birthdayMusic";

    audio.loop =
        true;

    audio.src =
        C.music;

    audio.volume =
        C.musicVolume || .45;

    document.body.appendChild(audio);


    const musicButton =
        document.getElementById("bxMusic");


    function playMusic(){

        audio.play()
            .then(function(){

                musicButton.textContent =
                    "🎵";

            })
            .catch(function(){

                musicButton.textContent =
                    "🔇";

            });

    }


    musicButton.addEventListener(
        "click",
        function(){

            if(audio.paused){

                playMusic();

            }else{

                audio.pause();

                musicButton.textContent =
                    "🔇";

            }

        }
    );


    /* =====================================================
       START BUTTON
    ===================================================== */

    document
        .getElementById("bxStart")
        .addEventListener(
            "click",
            function(){

                playMusic();

                const first =
                    app.querySelector(
                        ".bx-section"
                    );

                first.scrollIntoView({
                    behavior:"smooth"
                });

                setTimeout(
                    function(){

                        app.classList.add(
                            "active"
                        );

                    },
                    300
                );

            }
        );


    /* =====================================================
       PROGRESS BAR
    ===================================================== */

    app.addEventListener(
        "scroll",
        function(){

            const max =
                app.scrollHeight -
                app.clientHeight;

            const progress =
                max > 0
                ?
                (app.scrollTop / max) * 100
                :
                0;

            document
                .getElementById(
                    "bxProgress"
                )
                .style.width =
                progress + "%";

        }
    );


    /* =====================================================
       VIDEO AUTO PAUSE
    ===================================================== */

    const vids =
        app.querySelectorAll("video");

    vids.forEach(
        function(video){

            video.addEventListener(
                "play",
                function(){

                    vids.forEach(
                        function(other){

                            if(
                                other !== video
                            ){

                                other.pause();

                            }

                        }
                    );

                }
            );

        }
    );

/* =========================================================
   ORIGINAL TEMPLATE REVEAL
========================================================= */

function revealOriginalBirthday() {

    /* -----------------------------------------
       Start original heart
    ----------------------------------------- */

    if (typeof startHeartAnimation === "function") {

        startHeartAnimation();

    }


    /* -----------------------------------------
       Start fireworks
    ----------------------------------------- */

    setTimeout(function () {

        if (typeof window.startFireworks === "function") {

            window.startFireworks();

        }

    }, 1500);


    /* -----------------------------------------
       Fade cinematic layer
    ----------------------------------------- */

    app.style.transition =
        "opacity 2s ease";

    app.style.opacity =
        "0";


    setTimeout(function () {

        app.style.display =
            "none";

        document.body.style.overflow =
            "auto";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }, 2200);

}

/* =========================================================
   FINAL REVEAL BUTTON
========================================================= */

const revealButton =
    document.getElementById("bxReveal");

if (revealButton) {

    revealButton.addEventListener(
        "click",
        function () {

            launchFinalCelebration();

            setTimeout(function () {

                revealOriginalBirthday();

            }, 1000);

        }
    );

}
   
    /* =====================================================
       FINAL VIDEO
    ===================================================== */

    const finalVideo =
        document.getElementById(
            "bxFinalVideo"
        );

    finalVideo.addEventListener(
    "ended",
    function () {

        launchFinalCelebration();

        setTimeout(function () {

            const reveal =
                document.getElementById(
                    "bxReveal"
                );

            if (reveal) {

                reveal.innerHTML =
                    "The Real Surprise ❤️";

                reveal.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }

        }, 1200);

    }
);


    /* =====================================================
       FINAL CELEBRATION
    ===================================================== */

    function launchFinalCelebration(){

        for(
            let i=0;
            i<80;
            i++
        ){

            const heart =
                document.createElement("div");

            heart.textContent =
                ["♥","❤","✨","💗"]
                [
                    Math.floor(
                        Math.random()*4
                    )
                ];

            heart.style.position =
                "fixed";

            heart.style.left =
                Math.random()*100+"vw";

            heart.style.top =
                "-30px";

            heart.style.zIndex =
                "100000";

            heart.style.fontSize =
                15 +
                Math.random()*25 +
                "px";

            heart.style.color =
                "#ff65b9";

            heart.style.pointerEvents =
                "none";

            heart.animate(
                [
                    {
                        transform:"translateY(0) rotate(0)",
                        opacity:1
                    },
                    {
                        transform:
                            "translateY(110vh) rotate(500deg)",
                        opacity:0
                    }
                ],
                {
                    duration:
                        3000 +
                        Math.random()*3000,
                    easing:"ease-out"
                }
            );

            document.body.appendChild(
                heart
            );

            setTimeout(
                function(){
                    heart.remove();
                },
                7000
            );

        }

    }


    /* =====================================================
       ESCAPE LIGHTBOX
    ===================================================== */

    document.addEventListener(
        "keydown",
        function(e){

            if(
                e.key === "Escape"
            ){

                document
                    .getElementById("bxLightbox")
                    .classList
                    .remove("show");

            }

        }
    );

/* =====================================================
   REPLACE ORIGINAL TEMPLATE TEXT
===================================================== */

(function(){

    const messages =
        document.getElementById("messages");

    const loveu =
        document.getElementById("loveu");

    if(messages){

        messages.innerHTML = `
            <span style="
                color:#ff8dca;
                font-size:22px;
            ">
                ${C.name}, you've made
                ordinary moments feel special.
            </span>

            <div id="elapseClock"></div>
        `;

    }

    if(loveu){

        loveu.innerHTML = `

            <span style="
                color:#ffffff;
                font-size:24px;
            ">
                Happy Birthday,
                ${C.name} ❤️
            </span>

            <br><br>

            <span style="
                color:#ff8dca;
            ">
                Stay happy.
                Stay amazing.
            </span>

            <div class="signature">
                — Someone who secretly cares a little too much.
            </div>

        `;

    }

})();
   

    /* =====================================================
       IMPORTANT:
       OLD GARDEN/FIREWORKS REMAIN ACTIVE
    ===================================================== */

    console.log(
        "❤️ Cinematic Birthday Upgrade Loaded for " +
        C.name
    );

})();
