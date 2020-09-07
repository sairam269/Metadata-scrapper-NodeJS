(function(_win, $){ 

    'use strict'; 

    /*global window: false */ 
    var utils = {}; 

    //initialize the applcation 
    utils.init = function(){ 
        $(document).ready(function () { 
            utils.start(); 
        }); 
    }; 

    utils.start = function(){ 
        utils.bindScrapeButton(); 
    }; 

    utils.setupHandlers = function () { 
        utils.bindScrapeButton(); 
    }; 

    //check existence of DOM element 
    utils.isExist=(element)=>{ 
        return $(element).val() || $(element).val() === ''; 
    } 
 
    utils.showError=(element)=>{ 
 
        $(element).text('Please enter a URL!'); $(element).addClass('error'); 

        //re-set the button 
        setTimeout(function () { 
            $(element).text('Scrape Page'); 
            $(element).removeClass('error'); 
        }, 2000); 
    } 
 
    //Trigger Scrape API call on button click
    utils.bindScrapeButton = function () { 
        $('#submit').on('click', function () { 
             
            if(!utils.isExist('#urlText')){ 
                utils.showError('#submit'); 
                return; 
            } 

            $('#data-container').html(''); 
            $('#ajax-loader-container').show(); 

            $.ajax({ 
                url: '/scrape', 
                type: 'POST', 
                data: {
                    url: $('#urlText').val() 
                }, 
                success (jsonData) { 
                    $('#ajax-loader-container').hide(); 
                    console.warn('SUCCESS: '); 
                    console.dir(jsonData); 
                    $('#data-container').JSONView(jsonData); 
                }, 
                error (err) { 
                    console.error('Error: ' + err); 
                } 

            }); 
        }); 
    }; 

    //initialize the applcation 
    utils.init(); 

})(window, window.jQuery);