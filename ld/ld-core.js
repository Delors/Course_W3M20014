/*
       
   Core Ideas: 

       -   LectureDoc (i.e., the slide set) must be 
           usable without a Server(!); hence, no JavaScript modules :-(...
       
       -   We store most state information in the DOM to make it possible to
           start the presentation in a specific state (e.g., on a specific slide,
           directly showing the light-table etc.)

           However, if a presentation was already opened local storage will be used
           to track the further progress.
           

*/
"use strict";

/**
 * Let's put all functionality in the `lectureDoc2` "module" to avoid conflicts
 * with other JavaScript libraries.
 */
const lectureDoc2 = function() {

    /**
     * The following information is read from the document if it is specified 
     * and is therefore neither representing the state nor static configuration.
     */
    const presentation = { // we can't use "document" here because we don't want to override the standard document object.
        /** 
         * The unique id of this document; required to store state information 
         * across multiple calls to the same document in local storage. If
         * the document id is null we will not use local storage.
         */
        id : null,
        /** 
         * Configuration of the slide dimensions. The default is 1920 (width) : 
         * 1200 (height) for a 16:10 ratio. This can be changed in the meta 
         * information.
         */
        slide:{
            width: 1920,
            height: 1200
        },
        /**
         * The number of slides.
         */
        slideCount: -1
    }

    function initDocumentId() {
        try {
            presentation.id = document.querySelector('meta[name="id"]').content;
        } catch (error) {
            console.info("document id not found; state will not be preserved in local storage");
        }
    }

    /**
     * Reads the meta element which specifies the dimension of a slide and initializes
     * the corresponding variables.
     * 
     * The name has to be: `slide-dimensions` and the value (content) has to 
     * use the format: `<width>x<height>`.
     * 
     * E.g., `<meta name="slide-dimensions" content="1600x1200">`.
     */ 
    function initSlideDimensions() {
        try {
            const slideDimensions = document.querySelector('meta[name="slide-dimensions"]').content;
            const [width,height] = slideDimensions.trim().split("x").map((e) => e.trim())
            presentation.slide.width = width;
            presentation.slide.height = height;
        } catch (error) {
            console.info("slide dimensions are not specified; using default (1920x1200)");
        }
        // Set the corresponding CSS variables accordingly.
        const root = document.querySelector(":root");
        root.style.setProperty("--ld-slide-width", presentation.slide.width + "px");
        root.style.setProperty("--ld-slide-height", presentation.slide.height + "px");        
    }

    /**
     * Counts the number of slides in the document and initializes `slideCount`.
     */
    function initSlideCount() {
        presentation.slideCount = document.querySelectorAll("body>div.ld-slide").length
    }


    function setupLighttable() {
        const ld_light_table_pane = document.createElement("DIV")
        ld_light_table_pane.id = "ld-light-table-pane"
        ld_light_table_pane.innerHTML = `
            <div id="ld-light-table">
                <div id="ld-light-table-header">
                    <span>Lighttable: ${presentation.slideCount} slides</span>
                    <div id="ld-light-table-zoom">
                        <label for="ld-light-table-zoom-slider">Zoom:</label>
                        <input type="range" id="ld-light-table-zoom-slider" name="Zoom" min="3"  max="25" step="2" value="10"/>
                    </div>
                </div>
                <div id="ld-light-table-slides"></div>        
            </div>
        `
        document.getElementsByTagName("BODY")[0].prepend(ld_light_table_pane);
    }

    function setupHelp() {
        const ld_help_dialog = document.createElement("DIALOG")
        ld_help_dialog.id = "ld-help-dialog"
        document.getElementsByTagName("BODY")[0].prepend(ld_help_dialog);
    }

    function setupJumpTargetDialog() {
        const ld_jump_target_dialog = document.createElement("DIALOG")
        ld_jump_target_dialog.id = "ld-jump-target-dialog"
        ld_jump_target_dialog.innerHTML = `
            <span id="ld-jump-target-current"></span> / <span id="ld-jump-target-max"></span>        
        `
        document.getElementsByTagName("BODY")[0].prepend(ld_jump_target_dialog);
    }

    function setupMainPane() {
        const ld_main_pane = document.createElement("DIV")
        ld_main_pane.id = "ld-main-pane"
        document.getElementsByTagName("BODY")[0].prepend(ld_main_pane);
    }

    function setupContinuousView() {
        const ld_continuous_view_pane = document.createElement("DIV")
        ld_continuous_view_pane.id = "ld-continuous-view-pane"
        document.getElementsByTagName("BODY")[0].prepend(ld_continuous_view_pane);
    }

    /**
     * Captures the current state of the presentation; in particular the progress.
     */
    const state = {
        currentSlideNo: 0,
    }


    /* 
    Simple helper functions. 
    */

    /**
     * The number of the last slide.
     */
    function lastSlideNo(){
        return presentation.slideCount -1;
    }


function togglePane(ld_pane) {
    if (ld_pane.style.opacity == 1) {
        ld_pane.style.opacity = 0;
        /* the 500ms is also hard coded in the css */
        setTimeout(function () { ld_pane.style.display = "none" }, 500);
    } else {
        ld_pane.style.display = "block"
        ld_pane.style.opacity = 1;
    }
}

function uniqueId(id) {
    if (presentation.id != null) {
        return "ld-" + presentation.id + "-" + id;
    } else {
        throw new Error("no document id available")
    }
}


/*  ---------------------------------------------------------------------------
    Setup everything for rendering the slides and jumping to the slides.

    Incremental animation is simply realized by making correspondingly 
    marked-up elements hidden and as long as an element is hidden progress
    is made by making the respective element visible. I.e., the whole
    progress is implicitly covered by the visible and hidden elements.
*/
function getCurrentSlide() {
    return document.getElementById("ld-slide-no-" + state.currentSlideNo);
}


window.addEventListener("load", (event) => {
    /*  Associate every slide with a unique id based on the
        number of the slide (ld-slide-no-*). Show the first 
        slide. Internally the numbering of slides starts 
        with 0 - however, user facing functions assume that
        the first slide has the id 1.
    */
    const ld_main_pane = document.getElementById("ld-main-pane");
    const slides = document.querySelectorAll("body > .ld-slide");
    for (var i = 0; i <= lastSlideNo(); i++) {
        const main_slide = slides[i].cloneNode(true);
        main_slide.id = "ld-slide-no-" + i;
        /*  let's hide all elements that should be shown incrementally */
        resetSlideProgress(main_slide);
        ld_main_pane.appendChild(main_slide);
    };
    const ld_initial_slide_no = document.querySelector('meta[name="first-slide"]');
    if (ld_initial_slide_no) {
        try {
            if (ld_initial_slide_no.content == "last") {
                state.currentSlideNo = lastSlideNo();
            } else if (ld_initial_slide_no.content == "last-viewed") {
                // Remember that we can't use local storage meaningfully when
                // the documentId is null; we don't want multiple slide sets
                // to share the same state! That's why we test for 
                // id != null.
                if (presentation.id) {
                    const lastViewed = localStorage.getItem(uniqueId("current-slide-no"));
                    if (lastViewed) {
                        if (lastViewed > lastSlideNo()) {
                            lastViewed = lastSlideNo();
                        } else {
                            state.currentSlideNo = lastViewed;
                        }
                    }
                } else {
                    console.info("the document has no id using first-slide is not possible");
                    state.currentSlideNo = 0;
                }
            } else {
                state.currentSlideNo = Number(ld_initial_slide_no.content) - 1
                if (state.currentSlideNo > lastSlideNo()) {
                    state.currentSlideNo = lastSlideNo();
                } else if (state.currentSlideNo < 0) {
                    state.currentSlideNo = 0;
                }
            }
        } catch (error) {
            console.error(error)
        }
    }
    console.info("the presentation starts with slide: " + state.currentSlideNo);
    showSlide(state.currentSlideNo);

    /*  Initialize the span element which shows the  
        number of the last slide when the user wants to 
        jump to a specific slide. */
    document.getElementById("ld-jump-target-max").innerText = presentation.slideCount;
});

/*  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    Make sure that the slide is always shown in the middle
    of the screen and completely fills it.
    I.e., rescale the slide whenever the viewport changes. 
*/
function setPaneScale() {
    const w_scale = window.innerWidth / presentation.slide.width;
    const h_scale = window.innerHeight / presentation.slide.height;
    document.getElementById("ld-main-pane").style.scale = Math.min(w_scale, h_scale);
}
window.addEventListener("load", (event) => {
    setPaneScale();
    /* the following element will be added when the "DOMConentIsLoaded" */
    document.getElementById("ld-main-pane").addEventListener("click", (event) => {
        if (window.getSelection().anchorNode != null) {
            return;
        }

        /* let's determine if we have clicked on the left or right part */
        if (event.pageX < (window.innerWidth / 2)) {
            moveToPreviousSlide();
        } else {
            advancePresentation();
        }
    });
});
document.defaultView.addEventListener("resize", (event) => setPaneScale());

/*  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    Handling of presentation progress. 
*/

/**
 * Core method to show the next slide. Hiding and showing slides has to be done
 * using this and the `hideSlide` method. This ensures that the internal
 * state is correctly updated!
 */
function showSlide(slideNo) {
    const slide_id = "ld-slide-no-" + slideNo;
    console.info("trying to show: " + slide_id + " / " + lastSlideNo());
    document.getElementById(slide_id).style.display = "block";
    if (presentation.id) {
        localStorage.setItem(uniqueId("current-slide-no"), slideNo);
    }
}
function hideSlide(slideNo) {
    const ld_slide = document.getElementById("ld-slide-no-" + slideNo)
    if (ld_slide) {
        ld_slide.style.display = "none";

        /* We have to clear a potential selection to avoid a very confusing 
           behavior.
        */
        window.getSelection().empty()
    }
}
function advancePresentation() {
    const slide = getCurrentSlide();
    const elementsToAnimate = 
        ':scope :is(ul,ol).incremental>li, ' +
        ':scope :is(table).incremental>tbody>tr, ' +
        ':scope :not( :is(ul,ol,table)).incremental'
    const steps = slide.querySelectorAll(elementsToAnimate);
    const stepsCount = steps.length;
    for (var s = 0; s < stepsCount; s++) {
        if (steps[s].style.visibility == "hidden") {
            steps[s].style.visibility = "visible";
            return;
        }
    }
    moveToNextSlide();
}
function resetSlideProgress(slide) {
    const elementsToAnimate = 
        ":scope :is(ol,ul).incremental>li, "+
        ':scope :is(table).incremental>tbody>tr, '+
        ":scope :not( :is(ol,ul,table)).incremental"
    slide
        .querySelectorAll(elementsToAnimate)
        .forEach((element) => element.style.visibility = "hidden" )
}
function moveToNextSlide() {
    if (state.currentSlideNo < lastSlideNo()) {
        hideSlide(state.currentSlideNo);
        showSlide(++state.currentSlideNo);
    }
}
function moveToPreviousSlide() {
    if (state.currentSlideNo > 0) {
        hideSlide(state.currentSlideNo)
        showSlide(--state.currentSlideNo)
    }
}
function clearJumpTarget() {
    document.getElementById("ld-jump-target-current").innerText = "";
    document.getElementById("ld-jump-target-dialog").close()
}
/** Removes the last digit of the current jump target. */
function cutDownJumpTarget() {
    var ld_goto_number = document.getElementById("ld-jump-target-current");
    var jumpTarget = ld_goto_number.innerText
    switch (jumpTarget.length) {
        case 0: /* a redundant "backspace" press */
            return;
        case 1: /* the last remaining digit is deleted */
            clearJumpTarget(); return;
        default:
            ld_goto_number.innerText = jumpTarget.substring(0, jumpTarget.length - 1)
    }
}
function updateJumpTarget(number) {
    document.getElementById("ld-jump-target-current").innerText += number;
    document.getElementById("ld-jump-target-dialog").showModal();
}
function jumpToSlide() {
    const ld_goto_number = document.getElementById("ld-jump-target-current");
    const slideNo = Number(ld_goto_number.innerText) - 1; /* users number the slides starting with 1 */
    ld_goto_number.innerText = "";
    document.getElementById("ld-jump-target-dialog").close();
    if (slideNo >= 0) {
        hideSlide(state.currentSlideNo);
        if (slideNo > lastSlideNo()) {
            state.currentSlideNo = lastSlideNo();
        } else {
            state.currentSlideNo = slideNo;
        }
        showSlide(state.currentSlideNo);
    }
}

/*  -------------------------------------------------------------------
    Handling the light table.
*/
window.addEventListener("load", (event) => {
    const lt = document.getElementById("ld-light-table-slides");
    document.querySelectorAll("body > .ld-slide").forEach((slide, i) => {
        var lt_slide = slide.cloneNode(true);
        lt_slide.removeAttribute("id"); // not needed anymore (in case it was set)
        lt_slide.style.display = "block"; // in case it was "none"

        var lt_slide_scaler = document.createElement("DIV");
        lt_slide_scaler.className = "ld-light-table-slide-scaler";
        lt_slide_scaler.appendChild(lt_slide);

        var lt_slide_overlay = document.createElement("DIV");
        lt_slide_overlay.className = "ld-light-table-slide-overlay";
        lt_slide_overlay.id = "ld-light-table-slide-no-" + i;
        lt_slide_overlay.addEventListener("click", (event) => {
            hideSlide(state.currentSlideNo);
            state.currentSlideNo = i;
            showSlide(state.currentSlideNo);
        });
        var lt_slide_pane = document.createElement("DIV");
        lt_slide_pane.className = "ld-light-table-slide-pane";
        lt_slide_pane.appendChild(lt_slide_scaler);
        lt_slide_pane.appendChild(lt_slide_overlay);

        lt.appendChild(lt_slide_pane);
    });

    const ld_show_light_table = document.querySelector('meta[name="ld-show-light-table"]');
    if (ld_show_light_table && ld_show_light_table.content == "true") {
        toggleLightTable();
    }

    document.querySelector("#ld-light-table-zoom-slider").addEventListener("input", (event) => {
        console.log(event.target.value)
        const root = document.querySelector(":root");
        root.style.setProperty("--ld-light-table-zoom-level", event.target.value);
    })
});
function toggleLightTable() {
    togglePane(document.getElementById("ld-light-table-pane"));
}
/*  -------------------------------------------------------------------
    Handling help.
*/
window.addEventListener("load", (event) => {
    document.getElementById("ld-help-dialog").appendChild(getHelpElement());
});
function toggleHelp() {
    const ld_help_dialog = document.getElementById("ld-help-dialog");
    //const ld_content = document.getElementById("ld-help");
    if (ld_help_dialog.open) {
        ld_help_dialog.style.opacity = 0;
        /* the 500ms is also hard coded in the css */
        setTimeout(function () { ld_help_dialog.close() }, 500);
    } else {
        ld_help_dialog.showModal();
        ld_help_dialog.style.opacity = 1;
    }
}

/*  -------------------------------------------------------------------
    Supporting a handout pane/a print preview pane.
*/
window.addEventListener("load", (event) => {
    const ho = document.getElementById("ld-continuous-view-pane");
    document.querySelectorAll("body > .ld-slide").forEach((slide, i) => {
        const ho_slide = slide.cloneNode(true);
        ho_slide.removeAttribute("id"); // not needed anymore (in case it was set)

        const ho_slide_scaler = document.createElement("DIV");
        ho_slide_scaler.className = "ld-continuous-view-scaler";
        ho_slide_scaler.appendChild(ho_slide);

        const ho_slide_pane = document.createElement("DIV");
        ho_slide_pane.className = "ld-continuous-view-slide-pane"
        ho_slide_pane.appendChild(ho_slide_scaler);

        ho.appendChild(ho_slide_pane);
    });
});

function toggleContinuousView() {
    const ld_continuous_view_pane = document.getElementById("ld-continuous-view-pane");
    const ld_main_pane = document.getElementById("ld-main-pane")
    if (getComputedStyle(ld_main_pane).display == "flex") {
        ld_main_pane.style.display = "none"
        ld_continuous_view_pane.style.display = "block"
    } else {
        ld_continuous_view_pane.style.display = "none"
        ld_main_pane.style.display = "flex"
    }
}

    /** 
     * Central keyboard event handler 
     */
    function registerKeyboardEventListener() {
        document.addEventListener("keydown", (event) => {
            if (event.altKey || event.ctrlKey || event.shiftKey || event.metaKey) {
                console.log("modifier pressed: " + event.key);
                return;
            }

            switch (event.key) {
                // handle navigation 
                case "0": 
                case "1": 
                case "2": 
                case "3": 
                case "4": 
                case "5": 
                case "6": 
                case "7": 
                case "8": 
                case "9":           updateJumpTarget(event.key); break;
                case "Escape":      clearJumpTarget(); break;
                case "Backspace":   cutDownJumpTarget(); break;
                case "Enter":       jumpToSlide(); break;
                case "ArrowLeft":   moveToPreviousSlide(); break;
                case "ArrowRight": 
                case "Space":       advancePresentation(); break;
                case "r":           resetSlideProgress(document.getElementById("ld-slide-no-" + state.currentSlideNo)); break;

                case "l":           toggleLightTable(); break;

                case "h":           toggleHelp(); break;

                case "c":           toggleContinuousView(); break;

                // for development purposes:
                default:
                    console.log("unhandled: " + event.key);
            }
        });
    }


    /**
     * Queries and manipulates the DOM to setup LectureDoc.
     */
    document.addEventListener("DOMContentLoaded", (event) => {
        initDocumentId();
        initSlideDimensions();
        initSlideCount();

        /*
        Setup base structure!

        Given a LectureDoc HTML document - which is basically an HTML document that
        has to follow some well-defined restrictions - we first extend the DOM with
        the elements that realize LectureDoc's core functionality.
        */
        setupLighttable();
        setupHelp();
        setupJumpTargetDialog();
        setupContinuousView();
        setupMainPane();
    });

    /**
     * Registers the navigation related listeners. I.e., we only enable 
     * navigation after all slides are fully loaded.
     */
    window.addEventListener("load", (event) => {
        registerKeyboardEventListener();
    });


    return {
        'presentation':presentation,
        'state':state
    };
}();