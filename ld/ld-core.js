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
     * The following information is read from the document, if it is specified.
     * Therefore this information is neither representing the state nor static 
     * configuration information.
     */
    const presentation = { 
        /** 
         * The unique id of this document; required to store state information 
         * across multiple visits to the same document in local storage. If
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
        slideCount: -1,
        /**
         * Defines the first slide that should be shown; the default is 
         * to show the last-shown slide.
         * Alternatives:
         * - "<slide no>" where slide no is a number in the range [1,<#slides>]
         * - "last" to show the last slide
         * - "last-viewed" to show the last shown slide (default)
         */
        firstSlide: "last-viewed",
        /**
         * If true the light table will be shown when this presentation
         * is shown for the first time. If false (default) it will not be shown.
         */
        showLightTable: false, 
        /**
         * If true the help dialog will be shown when this presentation is
         * shown for the first time.
         * 
         * However, if the help was never shown before w.r.t. the same origin
         * the help will be shown; unless help is explicitly set to false.
         */
        showHelp: false 
    }

    /**
     * Captures the current state of the presentation; in particular the progress.
     */
    var state = { // the following is the default state 
        currentSlideNo: 0,
        showLightTable: false,
        lightTableZoomLevel : 10,
        showHelp: false,
        showContinuousView: false      
    }

    function storeState() {
        if (presentation.id) {
            localStorage.setItem(documentSpecificId("state"),JSON.stringify(state));
        }
    }

    function restoreState() {
        if (presentation.id) {
            const newState = JSON.parse(localStorage.getItem(documentSpecificId("state")));
            if (newState) {
                console.log("restored state: "+newState);
                state = newState;
            }
        }
    }

    function applyState() {
        if (state.currentSlideNo > lastSlideNo()) {
            console.info(`the specified slide number is too large: ${state.currentSlideNo}; setting it to the last slide`)
            state.currentSlideNo = lastSlideNo();
        } 
        showSlide(state.currentSlideNo);

        updateLightTableZoomLevel(state.lightTableZoomLevel);
        if (state.showLightTable) toggleDialog("light-table");

        if (state.showHelp) toggleDialog("help");

        if (state.showContinuousView) toggleContinuousView();
    }


    /**
     * Creates a document dependent unique id. This enables the storage of
     * document dependent information in local storage, even though all documents
     * have the same origin and therefore use the same local storage object.
     * 
     * @param {string} id the id of the information item without the prefix "ld-".
     */
    function documentSpecificId(id) {
        if (presentation.id != null) {
            return "ld-" + presentation.id + "-" + id;
        } else {
            throw new Error("no document id available")
        }
    }

    /**
     * 
     * @param {string} a string in css notation; e.g., "light-table". 
     * @returns The given string where each segment is capitalized. 
     *      Segments are assumed to be separated using a dash ("-").
     *      E.g., "light-table" => "LightTable"
     *          
     */
    function capitalize(str, separator = "-") {
        return str.
                split(separator).
                map((e) => { 
                    return e[0].toUpperCase() + e.slice(1) 
                }).
                join("")
    }

    /**
     * The number of the last slide.
     */
    function lastSlideNo(){
        return presentation.slideCount -1;
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

    /**
     * Initializes the state information regarding the current slide to show and also 
     * initializes the field storing the meta-information about the first-slide
     * that should be shown.
     */
    function initCurrentSlide() {
        try {
            presentation.firstSlide = document.querySelector('meta[name="first-slide"]').content;
        } catch (error) {
            console.info("first slide is not specified; trying to show last viewed slide");
        }
        switch (presentation.firstSlide) {
            case "last-viewed":
                // handled by applyState; defaults to the first slide 
                break;
            case "last":
                state.currentSlideNo = lastSlideNo();
                break;
            
            default:
                try {
                    state.currentSlideNo = Number(presentation.firstSlide) - 1
                } catch (error) {
                    console.error('invalid "first-slide" information: ${error}')
                }
        }
    }

    function initShowLightTable() {
        const showLightTable = document.querySelector('meta[name="ld-show-light-table"]');
        if (showLightTable) {
            presentation.showLightTable = showLightTable.content.trim().toLowerCase()
            state.showLightTable = (presentation.showLightTable === "true")
        } 
    }

    function initShowHelp() {
        const showHelp = document.querySelector('meta[name="ld-show-help"]');
        if (showHelp) {
            presentation.showHelp = showHelp.content.trim().toLowerCase()
            state.showHelp = (presentation.showHelp === "true")
        } 
        // We don't want to show the help over and over again ... therefore,
        // we use a LectureDoc specific - i.e., document independent - id to
        // store the information if the help was shown at least once.
        if (!state.showHelp && !localStorage.getItem("ld-help-was-shown")) {
            state.showHelp = true
            localStorage.setItem("ld-help-was-shown", true);
        }
    }

    function setupLightTable() {
        const light_table_dialog = document.createElement("DIALOG")
        light_table_dialog.id = "ld-light-table-dialog"
        light_table_dialog.className = "ld-dialog"

        const light_table = document.createElement("DIV")
        light_table.id = "ld-light-table"
        light_table_dialog.appendChild(light_table)

        const light_table_header = document.createElement("DIV")
        light_table_header.id = "ld-light-table-header"
        light_table_header.innerHTML = `
            <span>Light Table: ${presentation.slideCount} slides</span>
            <div id="ld-light-table-zoom">
                <label for="ld-light-table-zoom-slider">Zoom:</label>
                <input type="range" id="ld-light-table-zoom-slider" name="Zoom" min="3"  max="25" step="2" value="10"/>
            </div>
        `
        light_table.appendChild(light_table_header)

        const light_table_slides = document.createElement("DIV")
        light_table_slides.id = "ld-light-table-slides"
        light_table.appendChild(light_table_slides)

        document.querySelectorAll("body > .ld-slide").forEach((slide_template, i) => {
            const slide = slide_template.cloneNode(true);
            slide.removeAttribute("id"); // not needed anymore (in case it was set)
            slide.style.display = "block"; // in case it was "none"
    
            const slide_scaler = document.createElement("DIV");
            slide_scaler.className = "ld-light-table-slide-scaler";
            slide_scaler.appendChild(slide);
    
            const slide_overlay = document.createElement("DIV");
            slide_overlay.className = "ld-light-table-slide-overlay";
            slide_overlay.dataset.ldSlideNo = i;

            const slide_pane = document.createElement("DIV");
            slide_pane.className = "ld-light-table-slide-pane";
            slide_pane.appendChild(slide_scaler);
            slide_pane.appendChild(slide_overlay);
    
            light_table_slides.appendChild(slide_pane);
        });

        document.getElementsByTagName("BODY")[0].prepend(light_table_dialog);
    }

    function setupHelp() {
        const help_dialog = document.createElement("DIALOG")
        help_dialog.id = "ld-help-dialog"
        help_dialog.className = "ld-dialog"
        try {
            help_dialog.appendChild(lectureDoc2Help());
        } catch (error) {
            help_dialog.innerText = 'Help not found. "ld-help.js" probably not loaded.'
        }

        document.getElementsByTagName("BODY")[0].prepend(help_dialog);
    }

    function setupJumpTargetDialog() {
        const jump_target_dialog = document.createElement("DIALOG")
        jump_target_dialog.id = "ld-jump-target-dialog"
        jump_target_dialog.className = "ld-dialog"
        jump_target_dialog.innerHTML = `
            <span id="ld-jump-target-current"></span> / 
            <span id="ld-jump-target-max">${presentation.slideCount}</span>        
        `

        document.getElementsByTagName("BODY")[0].prepend(jump_target_dialog);
    }

    function setupMainPane() {
        const main_pane = document.createElement("DIV")
        main_pane.id = "ld-main-pane"

        /* 
        Copies all slide(-template)s found in the document to the main pane
        additionally, associate every slide with a unique id based on the
        number of the slide (ld-slide-no-*). 
        Internally the numbering of slides starts with 0. However, user facing
        functions assume that the first slide has the id 1.
        */
        document.querySelectorAll("body > .ld-slide").forEach((slideTemplate,i) => {
            const slide = slideTemplate.cloneNode(true);
            slide.id = "ld-slide-no-" + i;
            /*  let's hide all elements that should be shown incrementally */
            resetSlideProgress(slide);
            main_pane.appendChild(slide);
        })

        document.getElementsByTagName("BODY")[0].prepend(main_pane);
    }

    function setupContinuousView() {
        const continuous_view_pane = document.createElement("DIV")
        continuous_view_pane.id = "ld-continuous-view-pane"

        document.querySelectorAll("body > .ld-slide").forEach((slideTemplate, i) => {
            const slide = slideTemplate.cloneNode(true);
            slide.removeAttribute("id"); // not needed anymore (in case it was set)
    
            const slide_scaler = document.createElement("DIV");
            slide_scaler.className = "ld-continuous-view-scaler";
            slide_scaler.appendChild(slide);
    
            const slide_pane = document.createElement("DIV");
            slide_pane.className = "ld-continuous-view-slide-pane"
            slide_pane.appendChild(slide_scaler);
    
            continuous_view_pane.appendChild(slide_pane);
        });

        document.getElementsByTagName("BODY")[0].prepend(continuous_view_pane);
    }

 
/*  ---------------------------------------------------------------------------
    Setup everything for rendering the slides and jumping to the slides.

    Incremental animation is simply realized by making correspondingly 
    marked-up elements hidden and as long as an element is hidden progress
    is made by making the respective element visible. I.e., the whole
    progress is implicitly covered by the visible and hidden elements.
*/


    /**
     * @returns The element ("DIV") with the ID of the current slide.
     */
    function getCurrentSlide() {
        return document.getElementById("ld-slide-no-" + state.currentSlideNo);
    }


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



/**
 * Core method to show the next slide. Hiding and showing slides has to be done
 * using this and the `hideSlide` method. This ensures that the internal
 * state is correctly updated!
 */
function showSlide(slideNo) {
    const slide_id = "ld-slide-no-" + slideNo;
    console.info("trying to show: " + slide_id + " / " + lastSlideNo());
    document.getElementById(slide_id).style.display = "block";
    state.currentSlideNo = slideNo;
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
            clearJumpTarget(); 
            return;
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
        state.currentSlideNo = slideNo > lastSlideNo() ? lastSlideNo() : slideNo;
        showSlide(state.currentSlideNo);
    }
}


    function updateLightTableZoomLevel(value) {
        // The following will not trigger an event but is necessary when 
        // the state is restored.
        document.querySelector("#ld-light-table-zoom-slider").value = value

        const root = document.querySelector(":root");
        root.style.setProperty("--ld-light-table-zoom-level",value);

        state.lightTableZoomLevel = value
    }


    /**
     * Toggles a modal dialog. 
     * 
     * @param {string} name The name of the dialog in css notation; e.g., "light-table". 
     *      The name is used to identify the dialog element after prepending "ld-" 
     *      and appending "-dialog".
     *      The name is also used to identify the key in the state object that is used
     *      to store the current state. 
     */
    function toggleDialog(name) {
        const elementId = "ld-"+name+"-dialog"
        const stateId = "show"+capitalize(name)

        const dialog = document.getElementById(elementId)
        if (dialog.open) {
            dialog.style.opacity = 0;
            /* the 500ms is also hard coded in the css */
            setTimeout(function () { dialog.close()}, 500);
            state[stateId] = false
        } else {
            dialog.showModal();
            dialog.style.opacity = 1;
            state[stateId] = true
        }
    }

    /**
     * Shows/hides the continuous view. 
     * 
     * This view shows all slides in its final rendering.
     */
    function toggleContinuousView() {
        const ld_continuous_view_pane = document.getElementById("ld-continuous-view-pane");
        const ld_main_pane = document.getElementById("ld-main-pane")
        // If we currently show the slides, we update the state for `showContinuousView`
        // and then actually perform the change.
        state.showContinuousView = getComputedStyle(ld_main_pane).display == "flex"
        if (state.showContinuousView) {
            ld_main_pane.style.display = "none"
            ld_continuous_view_pane.style.display = "block"
        } else {
            ld_continuous_view_pane.style.display = "none"
            ld_main_pane.style.display = "flex"
        }
    }

    /** 
     * Central keyboard event handler.
     */
    function registerKeyboardEventListener() {
        document.addEventListener("keydown", (event) => {
            // we don't want to stop the user from interacting with the browser/OS
            if (event.altKey || event.ctrlKey || event.shiftKey || event.metaKey) {
                return;
            }

            switch (event.key) {
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
                case "r":           resetSlideProgress(getCurrentSlide()); break;

                case "l":           toggleDialog("light-table"); break; 

                case "h":           toggleDialog("help"); break; 

                case "c":           toggleContinuousView(); break;

                // for development purposes:
                default:
                    console.log("unhandled: " + event.key);
            }
        });
    }

    function registerViewportResizeListener() { 
        document.defaultView.addEventListener("resize", () => setPaneScale());
    }

    function registerSlideClickedListener() {
        document.getElementById("ld-main-pane").addEventListener("click", (event) => {
            // Let's check if the user is currently selecting text - we don't want
            // to interfere with that!
            if (window.getSelection().anchorNode != null) {
                return;
            }
    
            /* Let's determine if we have clicked on the left or right part. */
            if (event.pageX < (window.innerWidth / 2)) {
                moveToPreviousSlide();
            } else {
                advancePresentation();
            }
        });
    }

    function registerLightTableZoomListener() {
        document.
            getElementById("ld-light-table-zoom-slider").
            addEventListener("input", (event) => {
                updateLightTableZoomLevel(event.target.value)
        });
    }

    function registerLightTableSlideSelectionListener() {
        document.querySelectorAll(".ld-light-table-slide-overlay").forEach((slideOverlay) => {
            const slideNo = slideOverlay.dataset.ldSlideNo;
            slideOverlay.addEventListener("click", () => {
                hideSlide(state.currentSlideNo);
                state.currentSlideNo = slideNo;
                showSlide(state.currentSlideNo);
                toggleDialog("light-table");            
            });   
        });
    }

    /**
     * Queries and manipulates the DOM to setup lecture doc and bring the 
     * presentation to the last state.
     */
    document.addEventListener("DOMContentLoaded", () => {
        initDocumentId();
        initSlideDimensions();
        initSlideCount();
        initCurrentSlide();
        initShowLightTable();
        initShowHelp();

        /**
         * Restores previous state if possible; this may override document settings.
         */
        restoreState();

        /*
        Setup base structure.

        Given a LectureDoc HTML document - which is basically an HTML document that
        has to follow some well-defined restrictions - we first extend the DOM with
        the elements that realize LectureDoc's core functionality.
        */
        setupLightTable();
        setupHelp();
        setupJumpTargetDialog();
        setupContinuousView();
        setupMainPane();

        /*
        Update rendering related information.
        */
        setPaneScale(); // done to improve the initial rendering behavior
    });

    /**
     * Registers the state (e.g., navigation) related listeners. I.e., we only
     * enable state changes after everything is fully loaded.
     */
    window.addEventListener("load", () => {
        // Whatever the state is/was - let's apply it before we enable 
        // further state changes. 
        applyState();

        registerKeyboardEventListener();
        registerViewportResizeListener();
        registerSlideClickedListener();
        registerLightTableZoomListener();
        registerLightTableSlideSelectionListener();

        try {
            lectureDoc2Animations();
        } catch (error) {
            console.log("advanced animations package is not found/not loaded")
        }
    });

    /**
     * We store the current state, when the page becomes invisible; i.e., the 
     * user leaves the page. 
     * This enables us to restore the state even if the user "kills" the browser 
     * and therefore other events (e.g., "onunload") are not reliably fired. 
     * (See MDN for more details.)
     */
    document.onvisibilitychange = () => {
        if (document.visibilityState === "hidden") {
            storeState();
            console.log(`Saved state of: ${presentation.id}`);
        }
    };

    return {
        'presentation': presentation,
        'getState': function () { return state; } // the state object as a whole may change
    };
}();