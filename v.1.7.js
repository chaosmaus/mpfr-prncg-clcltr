$(document).ready(function () {
    let plansArray = [];
    let toggle = false;
    let isDarkModeOn = false;
    let currentSegmentIndex = 0;

    $('.pricing-calculator_cms-item').each((index, element) => {
        plansArray.push(
            {
                units: Number($(element).find(`.pricing-scope_units`).text()),
                price: Number($(element).find(`.pricing-scope_price`).text()),
                scope_1: $(element).find(`.pricing-scope`).eq(0).text(),
                scope_2: $(element).find(`.pricing-scope`).eq(1).text(),
                scope_3: $(element).find(`.pricing-scope`).eq(2).text(),
                scope_4: $(element).find(`.pricing-scope`).eq(3).text(),
            }
        )
    })

    plansArray = plansArray.reverse();
    console.log(plansArray)

    var el = document.querySelector('.odometer');
    var odometer = new Odometer({
        el: el,
        value: plansArray[0].price,
        format: '(,ddd).dd'
    });


    const scopeTextUpdater = (segmentIndex) => {
        let targetWrapper = $(`.pricing-column_right`).find(`.pricing-results_features-wrapper`);
        targetWrapper.find(`.pricing-results_feature-text`).eq(0).text(plansArray[segmentIndex].scope_1);
        targetWrapper.find(`.pricing-results_feature-text`).eq(1).text(plansArray[segmentIndex].scope_2);
        targetWrapper.find(`.pricing-results_feature-text`).eq(2).text(plansArray[segmentIndex].scope_3);
        targetWrapper.find(`.pricing-results_feature-text`).eq(3).text(plansArray[segmentIndex].scope_4);
        targetWrapper.find(`.pricing-results_feature-text_dark`).eq(0).text(plansArray[segmentIndex].scope_1);
        targetWrapper.find(`.pricing-results_feature-text_dark`).eq(1).text(plansArray[segmentIndex].scope_2);
        targetWrapper.find(`.pricing-results_feature-text_dark`).eq(2).text(plansArray[segmentIndex].scope_3);
        targetWrapper.find(`.pricing-results_feature-text_dark`).eq(3).text(plansArray[segmentIndex].scope_4);
    }
    scopeTextUpdater(0);

    const addonToggler = () => {
        var toggles = new Map();



        $('body').on('click', '.pricing_addon-toggle', function (e) {
            let clickedButton = $(e.target).closest('.pricing_addon-toggle');
            let circle = clickedButton.find('.pricing_addon-circle');
            var toggle = toggles.get(clickedButton[0]) || false;

            if (toggle) {

                // card styling
                clickedButton.parent().removeClass(`dark-mode`)

                clickedButton.parent().find(`.pricing-results_feature-text`).removeClass(`dark-mode`)
                clickedButton.parent().find(`.pricing_addon-wrapper`).removeClass(`active-mode`)


                console.log(`toggle off`)
                //toggle off
                circle.animate({ 'left': '-=20px' }, 'fast', 'swing')
                clickedButton.parent().find(`.pricing-results_feature-icon`).removeClass(`dark-mode`)
                clickedButton.parent().find(`.pricing-results_feature-icon`).removeClass(`active-mode`)
                clickedButton.removeClass(`toggle-active`)
                clickedButton.parent().removeClass(`active-mode`)
                clickedButton.parent().removeClass(`dark-mode`)
                clickedButton.removeClass(`dark-mode`)
                clickedButton.removeClass(`active-mode`)
                circle.removeClass(`dark-mode`);


                if (isDarkModeOn) darkModeToggleOff();
                if (isDarkModeOn) clickedButton.parent().find(`.pricing_addon-wrapper`).addClass(`dark-mode`)
                if (isDarkModeOn) clickedButton.parent().addClass(`dark-mode`)
                if (isDarkModeOn) circle.addClass(`dark-mode`)
                if (isDarkModeOn) clickedButton.addClass(`dark-mode`)
                if (isDarkModeOn) clickedButton.parent().find(`.pricing-results_feature-icon`).addClass(`dark-mode`)
                if (!isDarkModeOn) $(`.pricing-addons_wrapper`).find(`.pricing-results_feature-icon`).removeClass(`dark-mode`)






            } else {
                // card styling

                clickedButton.parent().find(`.pricing-results_feature-icon`).addClass(`active-mode`)
                clickedButton.parent().find(`.pricing-results_feature-text`).addClass(`dark-mode`)

                clickedButton.parent().addClass(`active-mode`)

                console.log(`toggle on`)
                //toggle on
                circle.animate({ 'left': '+=20px' }, 'fast', 'swing');
                clickedButton.addClass(`active-mode`)
                if (!(clickedButton.hasClass(`toggle-active`))) clickedButton.addClass(`toggle-active`)

                if (!isDarkModeOn) darkModeToggleOn();

                clickedButton.removeClass(`dark-mode`)
                clickedButton.parent().removeClass(`dark-mode`)
                clickedButton.parent().addClass(`dark-mode`)
                clickedButton.parent().find(`.pricing_addon-wrapper`).addClass(`active-mode`)
                clickedButton.parent().find(`.pricing_addon-wrapper`).removeClass(`dark-mode`)
                clickedButton.parent().find(`.pricing-results_feature-icon`).removeClass(`dark-mode`)




            }

            toggles.set(clickedButton[0], !toggle);
        });
    }

    const darkModeToggleOff = () => {

        if (toggle && $(`.toggle-active`).length === 0 && currentSegmentIndex <= 9) {
            console.log(`Undo order 66...`)
            $(`.pricing_no-price_mask`).css(`background-color`, `rgba(239,250,243,.82)`)
            //reset price line
            if ( currentSegmentIndex <= 2) {
                $(`.no-price_line`).css(`opacity`, `100%`)
            }else{
                $(`.no-price_line`).css(`opacity`, `0%`)
            }

            if ($(window).width() > 1439) {
                $(`.pricing-result_content-wrapper`).animate({ 'right': '-=290px' }, '500', 'easeInOutQuad');
            } else {
                $(`.pricing-result_content-wrapper`).animate({ 'right': '-=140%' }, '500', 'easeInOutQuad');
            }

            $(`.pricing-result_content-wrapper`).parent().css('background-color', '#F0FAF3');

            toggle = false;
            isDarkModeOn = false;

            //changing left column styling
            $(`.pricing_addon-wrapper`).removeClass(`dark-mode`)
            $(`.pricing-column`).removeClass(`dark-mode`);
            $(`.pricing-calculator_heading`).removeClass(`dark-mode`);
            $(`.pricing-calculator_description`).removeClass(`dark-mode`);
            $(`.slider-segment`).removeClass(`dark-mode`);
            $(`.pricing_addon-toggle`).removeClass(`dark-mode`)
            $(`.pricing_addon-circle`).removeClass(`dark-mode`)
            $(`.pricing_addon-card`).removeClass(`dark-mode`)

        }
    }


    const darkModeToggleOn = () => {
        if (!toggle) {
            console.log(`Execute order 66...`)
            $(`.pricing_no-price_mask`).css(`background-color`, `rgba(0,0,0,0)`)
            $(`.no-price_line`).css(`opacity`, `0%`)
            if ($(window).width() > 1439) {
                $(`.pricing-result_content-wrapper`).animate({ 'right': '+=290px' }, '500', 'easeInOutQuad');
            }else{
                $(`.pricing-result_content-wrapper`).animate({ 'right': '+=140%' }, '500', 'easeInOutQuad');
            }
            
            $(`.pricing-result_content-wrapper`).parent().css('background-color', '#262626');

            toggle = true;
            isDarkModeOn = true;


            //changing left column styling

            for (let i = 0; i < 3; i++) {
                $(`.pricing_addon-card`).eq(i).addClass(`dark-mode`)
                if (!($(`.pricing_addon-wrapper`).eq(i).hasClass(`dark-mode`)) && !($(`.pricing_addon-wrapper`).eq(i).hasClass(`active-mode`))) $(`.pricing_addon-wrapper`).eq(i).addClass(`dark-mode`)
                if (!($(`.pricing_addon-toggle`).eq(i).hasClass(`dark-mode`)) && !($(`.pricing_addon-toggle`).eq(i).hasClass(`active-mode`))) $(`.pricing_addon-toggle`).eq(i).addClass(`dark-mode`)
                if (!($(`.pricing_addon-circle`).eq(i).hasClass(`dark-mode`)) && !($(`.pricing_addon-circle`).eq(i).hasClass(`active-mode`))) $(`.pricing_addon-circle`).eq(i).addClass(`dark-mode`)


            }
            $(`.pricing-column`).addClass(`dark-mode`);
            $(`.pricing-calculator_heading`).addClass(`dark-mode`);
            $(`.pricing-calculator_description`).addClass(`dark-mode`);
            $(`.pricing-addons_wrapper`).find(`.pricing-results_feature-icon`).addClass(`dark-mode`)

            $(`.slider-segment`).each((index, element) => {
                if ($(element).hasClass(`last-segment`)) return;
                else $(element).addClass(`dark-mode`);
            })

        }
    }


    $("#slider").slider({
        min: 0,
        max: plansArray.length - 1,
        step: 1,
        create: function () {
            $(this).slider('value', 0);
            $('.tracker').append('<div class="tracker-index"></div>'); // append tracker index to tracker
            $('.tracker-index').text(plansArray[$(this).slider('value')].units); // initialize the tracker index
        },

        slide: function (event, ui) {
            //update position for darkMode controller
            currentSegmentIndex = ui.value;

            odometer.update(plansArray[ui.value].price);
            $(`.pricing-calculator_fiex-index`).removeClass(`hidden`);

            scopeTextUpdater(ui.value);

            if (!($(`.pricing_no-price_mask`).hasClass(`invisible`))) $(`.pricing_no-price_mask`).addClass(`invisible`);
            $(`.no-price_line`).css(`opacity`, `0%`)
            if (ui.value === 0) {
                $(`.pricing_no-price_mask`).removeClass(`invisible`);
                $(`.pricing-calculator_fiex-index`).eq(0).addClass(`hidden`);
                $(`.no-price_line`).css(`opacity`, `100%`)                
            } else if (ui.value === 1) {
                $(`.pricing_no-price_mask`).removeClass(`invisible`);
                $(`.no-price_line`).css(`opacity`, `100%`)
            } else if (ui.value === 2) {
                $(`.pricing_no-price_mask`).removeClass(`invisible`);
                $(`.no-price_line`).css(`opacity`, `100%`)
            } else if (ui.value === 3) {
                //undo Order 66
                darkModeToggleOff();
            } else if (ui.value === 4) {
                //undo Order 66
                darkModeToggleOff();
            } else if (ui.value === 5) {
                $(`.pricing-calculator_fiex-index`).eq(1).addClass(`hidden`);
                //undo Order 66
                darkModeToggleOff();
            }
            else if (ui.value === 6) {
                //undo Order 66
                darkModeToggleOff();
            }
            else if (ui.value === 7) {
                //undo Order 66
                darkModeToggleOff();
            }
            else if (ui.value === 8) {
                //undo Order 66
                darkModeToggleOff();
            } else if (ui.value === 9) {
                //undo Order 66
                darkModeToggleOff();

            } else if (ui.value === 10) {
                $(`.pricing-calculator_fiex-index`).eq(2).addClass(`hidden`);
                //Execute Order 66
                darkModeToggleOn();

            } else if (ui.value === 11) {
                //Execute Order 66
                darkModeToggleOn();

            } else if (ui.value === 12) {
                //Execute Order 66
                darkModeToggleOn();

            } else if (ui.value === 13) {


                //Execute Order 66
                darkModeToggleOn();

            } else if (ui.value === 14) {
                $(`.pricing-calculator_fiex-index`).eq(3).addClass(`hidden`);
            }



            //tracker and progress bar position
            var handlePosition = $(`.slider-segment`).eq(0).css(`width`).replace('px', '') * ui.value - 10;
            $('.tracker').css('left', handlePosition + 'px');

            var totalPassedSegmentsWidth = 0;
            for (let i = 0; i < ui.value; i++) {
                totalPassedSegmentsWidth += $(`.slider-segment`).eq(i).width();
            }

            $('.tracker .tracker-progress').css('width', totalPassedSegmentsWidth + 'px');

            $('.tracker-index').text(plansArray[ui.value].units);

        }
    });

    addonToggler();
});



