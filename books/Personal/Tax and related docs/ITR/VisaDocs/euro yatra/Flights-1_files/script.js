var customScript = function (node) {

YUI({
    base: '/SSW2010/javascripts/yui/3.3.0/build/'
}).use('node', 'cookie', 'wl-airport-list', function (Y) {
    Y.on('contentready', function () {

        try {
            var etihadPageObject = new EtihadPageObject(Y);
            etihadPageObject.instantiate(retrievePageCode());
        }
        catch (er) {
            errorMessagesString = '';
            if (typeof exLogger != 'undefined' && exLogger) {
                exLogger.params.add("AdditionalMsg", errorMessagesString);
                exLogger.log(er, exLogger.ErrorLevel.Error);
            }
        }
        try {
            var analyticsObject = new Analytics(Y);
            analyticsObject.instantiate(retrievePageCode());
        }
        catch (e) {

            errorMessagesString = '';
            if (typeof exLogger != 'undefined' && exLogger) {
                exLogger.params.add("AdditionalMsg", errorMessagesString);
                exLogger.log(e, exLogger.ErrorLevel.Error);
            }

        }
        try {
            var ccomponents = new CustomComponents(Y);
            ccomponents.allFunctions();
        }
        catch (err) {

            errorMessagesString = '';
            if (typeof exLogger != 'undefined' && exLogger) {
                exLogger.params.add("AdditionalMsg", errorMessagesString);
                exLogger.log(err, exLogger.ErrorLevel.Error);
            }

        }

    }, '#bigRedLollipop');
});

// IBM CODE
YUI({
    base: '/SSW2010/javascripts/yui/3.3.0/build/'
}).use('node', 'cookie', function (Y) {
    // GLOBA SCOPE STARTS
    var version = sabre.config.global.configurationVersion;
    // Declare variable page which contains the Sabre current page name
    var page = sabre.config.pageCode;
    var imgPath = sabre.config.global.contentPath;
    var errorMessagesString= '';
    //GLOBAL SCOPE ENDS
    /******** Seats page custom components ****************/
    /*** 1. Cabin Image **********************************/
    /******************************************************/
    if (page === "SEATS_PAGE") {

        try{
        // Retrieve the itenerary details
        var itenaryDetails = Y.all('#cart_itinerariesDetails .farebasis');
        // Create a array : cabinArray would contain the cabin information Economy,Business,First Class
        var cabinArray = new Array();
        // Iterate over the itenary to create the cabin array
        itenaryDetails.each(function () {
            //Retrieve the cabin node value
            var fareNode = this.get('text').split(':')[1].substr(1, 1);
            var classNode = getCabinClass(fareNode);
            //Retrieve the text value of the retrieved node
            cabinArray.push(classNode);
        });
        // Retrieve the seat map node
        var Y_segment = Y.one('#seat-map-map-container');
        // Retrieve the next button nodes : There are two previous buttons
        var prev = Y_segment.all('.prevFlight');
        // Retrieve the next button nodes : There are two next buttons
        var next = Y_segment.all('.nextFlight');
        // Initiate a counter variable to zero
        var counter = 0;
        // This block is called on page load : Retrieve the node for the cntent holder
        var div = Y.one('#flight-list-infobox');
        // The following cabin class will always return the first cabin : The counter is always 0 here
        var cabinClass = cabinArray[counter];
        //Creates a node for the image tag
        if (cabinClass === "Economy")
            var image = Y.Node.create('<img src="' + imgPath + '/images/class_thumb_economy.jpg"/>');
        else if (cabinClass === "Business")
            var image = Y.Node.create('<img src="' + imgPath + '/images/class_thumb_business.jpg"/>');
        else if (cabinClass === "First")
            var image = Y.Node.create('<img src="' + imgPath + '/images/class_thumb_first.jpg"/>');
        else
            var image = '';
        // Append the image to the content holder
        div.append(image);
        //Register a onClick handler on the previous buttons
        prev.on('click', function (e) {
            // Initially this button will be deactive so a click on this means a next button was clicked before
            counter -= 2;
            // retrieve the img that the javascript appended on page load
            var div = Y.one('#flight-list-infobox img');
            //Retrieve the cabin class form the array
            var cabinClass = cabinArray[counter];
            // create variables for various image sources based on the cabin class
            if (cabinClass === "Economy")
                var image = imgPath + '/images/class_thumb_economy.jpg';
            else if (cabinClass === "Business")
                var image = imgPath + '/images/class_thumb_business.jpg';
            else if (cabinClass === "First")
                var image = imgPath + '/images/class_thumb_first.jpg';
            else
                var image = '';
            //Sets the source of the image as the one retrieved
            div.set('src', image);
        });
        //Register a onClick handler on the next buttons
        next.on('click', function (e) {
            // This button will never cross the arraylength as on the last leg this button is rendered deactive by Sabre
            counter += 2;
            // retrieve the img that the javascript appended on page load
            var div = Y.one('#flight-list-infobox img');
            //Retrieve the cabin class form the array
            var cabinClass = cabinArray[counter];
            // create variables for various image sources based on the cabin class
            if (cabinClass === "Economy")
                var image = imgPath + '/images/class_thumb_economy.jpg';
            else if (cabinClass === "Business")
                var image = imgPath + '/images/class_thumb_business.jpg';
            else if (cabinClass === "First")
                var image = imgPath + '/images/class_thumb_first.jpg';
            else
                var image = '';
            //Sets the source of the image as the one retrieved
            div.set('src', image);
        });

    }
        catch (err) {

            errorMessagesString = 'Script.js Error SEATS_PAGE';
            if (typeof exLogger != 'undefined' && exLogger) {
                exLogger.params.add("AdditionalMsg", errorMessagesString);
                exLogger.log(err, exLogger.ErrorLevel.Error);
            }
        }
    }
    /******** Payments page custom components ************************************************************************************/
    /*** 1. Hide ATPCO fares 2. Rename the Others tab with Bank Transfer tab 3. Time limitng text 4. Add Terms and Conditions */
    /*** 5. Add cookies for retrieval at confirmation page************************************************************************/
    /*****************************************************************************************************************************/
    if (page === "PURCHASE_PAGE") {

            try{
        // Hide the ATPCO fares
        Y.on("contentready", hideFares, "#fare-restrictions", Y, "");
        // Add Bank transfer time limiting text
        Y.on("contentready", addBankText, "#fop-item-otherCardTypes-0-bpc-0", Y, "");
        //fop-tab-otherCardTypes-0
        Y.on("click", addNextBankText, "li#fop-tab-otherCardTypes-0 a", Y, "");
        // Add terms and conditions link
        // Y.on("contentready", addTermsConditions, "#tcc_1", Y, "");
        // Add cookie
        Y.on("contentready", submitEvent, "#btn-search", Y, "");
        // Hide PayPal tab if currency not supported
        Y.on("contentready", hidePayPal, "#fop-tab-paypal-0", Y, "");
        // Hide PayPal tab if currency not supported
        Y.on("contentready", hidePOLi, "#fop-tab-poli-0", Y, "");
        // Hide BankTransfer tab if paid seat
        Y.on("contentready", handleBankTransfer, "#fop-tab-otherCardTypes-0", Y, "");
        
             }
            catch (err) {
                errorMessagesString = 'Script.js Error PURCHASE_PAGE';
                if (typeof exLogger != 'undefined' && exLogger) {
                    exLogger.params.add("AdditionalMsg", errorMessagesString);
                    exLogger.log(err, exLogger.ErrorLevel.Error);
                }
            }

    }
    /******** Passengers page custom components ****************/
    /*** 1. Miles Teaser Component */
    /*************************************************************/
    if (page === "PASSENGERS_PAGE") {
        try{
        Y.on("contentready", milesTeaser, "#customhtmlMilesTeaser", Y, "");
    }
          catch (err) {
              errorMessagesString = 'Script.js Error PASSENGERS_PAGE';
              if (typeof exLogger != 'undefined' && exLogger) {
                  exLogger.params.add("AdditionalMsg", errorMessagesString);
                  exLogger.log(err, exLogger.ErrorLevel.Error);
              }
          }
    }
    /******** Confirmation page custom components ****************/
    /*** 1. Limo Link 2. Bank Transfer Link 3. FFPRegistration */
    /*************************************************************/
    if (page === "CONFIRMATION_PAGE" || page === "EXCHANGE_CONFIRMATION_PAGE") {
           try{
        // Chauffeur Link
        Y.on("contentready", chaufferLink, "#customhtmlLimoDeepLink", Y, "The DOMContentLoaded event fired. The DOM is now safe to modify via script.");
        // Bank Transfer
        //Y.on("contentready", bankTransfer, "#customhtmlremotepayment_BankTransferRedemption", Y, "The DOMContentLoaded event fired. The DOM is now safe to modify via script.");
        // FFP Registration
        Y.on("available", ffpRegister, "#next-steps", Y, "The DOMContentLoaded event fired. The DOM is now safe to modify via script.");
        Y.on("available", hideBankText, "#payment-summary", Y, "The DOMContentLoaded event fired. The DOM is now safe to modify via script.");
        Y.on("click", processBankTransfer, "#payment-summary dd.paynow a", Y, "");
        Y.on("click", processBankTransfer, "#customhtmlremotepayment_BankTransfer a", Y, "");
        // FFP Click Event
        Y.on("click", ffpForm, "a#FFPRegister", Y, "The DOMContentLoaded event fired. The DOM is now safe to modify via script.");
    }
           catch (err) {
               errorMessagesString = 'Script.js Error CONFIRMATION_PAGE';
               if (typeof exLogger != 'undefined' && exLogger) {
                   exLogger.params.add("AdditionalMsg", errorMessagesString);
                   exLogger.log(err, exLogger.ErrorLevel.Error);
               }
           }
    }
    /******** Air Select page custom components ****************/
    /*** 1. Best Price 2. Modify Search ***********************/
    /***********************************************************/
    if (page === "AIR_SELECT_PAGE") {
          try{
        // For single and return type journeys
        Y.on("contentready", bestPrice, "#outbounds-header-container", Y, "The DOMContentLoaded event fired. The DOM is now safe to modify via script.");
        // For multicity journeys
        Y.on("contentready", bestPrice, "#multicity-header-container", Y, "The DOMContentLoaded event fired. The DOM is now safe to modify via script.");
        // Retrieve the modify seaqrch dom component
    }
           catch (err) {
               errorMessagesString = 'Script.js Error AIR_SELECT_PAGE';
               if (typeof exLogger != 'undefined' && exLogger) {
                   exLogger.params.add("AdditionalMsg", errorMessagesString);
                   exLogger.log(err, exLogger.ErrorLevel.Error);
               }
           }
    }
    /*********************************************************************************/
    /* Function to compute the origin codes and decides to show the best price image */
    /*********************************************************************************/
    function bestPrice(e) {

           try {
        // Calls the utilty function to get the journey type
        var typeOfJourney = getjourneyType();
        // This will return null for multicity search
        var miles = Y.all('#outbounds-header-container dd');
        // Checks to see if the image is already displayed
        var imagedisplay = "false";
        // check to see the type of journey
        switch (typeOfJourney) {
            // For one way journey    
            case "oneWay":
                //Sends the text to utility function for extracting the content
                var bestPrice = determineBestPrice(miles.item(0));
                // If the origin airport code lies within the list of origin airport codes ,display the best price image
                if (bestPrice === "true")
                    displayBestPrice();
                break;
            // For a return trip    
            case "return":
                //Sends the text to utility function for extracting the content
                var bestPrice = determineBestPrice(miles.item(0));
                // If the origin airport code lies within the list of origin airport codes ,display the best price image
                if (bestPrice === "true") {
                    displayBestPrice();
                }
                break;
            // For a multicity search    
            case "multicity":
                // Extract all of the airport codes
                var miles = Y.all('#multicity-header-container h3');
                // Calls the utility function to retrieve the result if it requires to have the best price image
                var bestPrice = determineBestPrice(miles.item(0));
                // If the result is true and if the image has never been displayed then display the image
                if (bestPrice === "true") {//&& imagedisplay == "false") {
                    displayBestPrice();
                    //imagedisplay = "true";
                }
                break;
        }
    }
        catch (err) {
            if (typeof exLogger != 'undefined' && exLogger) {
               exLogger.log(err, exLogger.ErrorLevel.Error);
           }

       }
    }
    /******************* Miles Teaser ******/
    /** - It is an iframe implementation ** -/
    /****************************************/
    function milesTeaser(e) {
        ifrm = document.createElement("IFRAME");
        ifrm.setAttribute("src", "https://www.etihadairways.com/sites/etihad/_layouts/etihad/obe/oj/milesteaser.aspx");
        ifrm.setAttribute("frameBorder", "0");
        ifrm.setAttribute("scrolling", "no");
        ifrm.setAttribute("height", "165");
        ifrm.setAttribute("width", "100%");
        ifrm.setAttribute("marginwidth", "0");
        var to = Y.one('#customhtmlMilesTeaser');
        to.append(ifrm);
        to.setStyle('background', 'none');
    }
    // Display the best price
    function displayBestPrice() {
        // Create a node with the anchor and image tags :CHANGE to actual
        var item = Y.Node.create('<br><a id="BestPrice" href="http://www.etihad.com/en/messages/general-bpp/" target="_blank"><img src="' + imgPath + '/images/130_LHN_bpp_may11.gif" alt="Etihad Best Price Promise" style="border-style:none"/></a>');
        // Extract the content holder of the best price image
        var nodetoAppend = Y.one('#customhtmlrailsegmentlegendRedemption');
        // Append the image to the content holder
        nodetoAppend.append(item);
    }
    // Function to determine best price based on a airport : It utilizes a regular expression to extract values for eg: (AUH) --> AUH
    function determineBestPrice(miles) {
        if (miles !== null || miles !== 'undefined') {
            //Get the text value of the node element
            var fromTxt = miles.get('text');
            // Create a array for a list of Airport codes to show best price
            var bestOrigins = new Array("BAH", "YYZ", "PEK", "CTU", "PVG", "LCA", "ATH", "BOM", "CCJ", "COK", "DEL", "HYD", "MAA", "TRV", "BLR", "AMD", "MXP", "ALA", "TSE", "ICN", "KWI", "MCT", "ISB", "KHI", "LHE", "PEW", "DOH", "DME", "DMM", "JED", "RUH", "DMS", "JNB", "GVA", "AAN", "AUH", "SHJ", "XNB", "XMB", "RKT", "LHR", "MAN", "JFK", "NYC", "ORD");
            //Utilizes the regular expression to extract the values
            fromTxt = fromTxt.replace(/.*\(|\)/gi, '');
            //Iterate over the array to find out if the passed in airport code lies within the array
            for (var i = 0; i < bestOrigins.length; i++) {
                if (bestOrigins[i] === fromTxt) {
                    return "true";
                }
            }
            return "false";
        }
    }
    //utility methods to know the journey type
    function getjourneyType() {
        // // If an id exist named multicity then the trip is multicity
        if (Y.one('#multicity-header-container') != null)
            typeOfJourney = "multicity";
        // If an id exist named outbounds then the trip is outbounds
        else if (Y.one('#outbounds') !== null || Y.one('#outbounds') !== 'undefined')
            typeOfJourney = "return";
        // else it is a one way trip
        else
            typeOfJourney = "oneWay";
        return typeOfJourney;
    }
    /*****************************************/
    /* Hide the fare rules in the fares page */
    /*****************************************/
    function hideFares(e) {
        Y.one('#farerules').setStyle('display', 'none');
    }


    /*****************************************/
    /* Hide PayPal id currency not supported
    /*****************************************/
    function hidePayPal(e) {
        try{
        if (Y.Array.indexOf(WhiteLabel.getComponentModel("payc_1").restrictedFOPs, "PP") != -1) {
            Y.one("#fop-tab-paypal-0").addClass("hidden")
        }
    }
        catch (err) {
        errorMessagesString = '';
        if (typeof exLogger != 'undefined' && exLogger) {
            exLogger.log(err, exLogger.ErrorLevel.Error);
        }
      }
    }

    function hidePOLi(e) {
        try {
            if (Y.Array.indexOf(WhiteLabel.getComponentModel("payc_1").restrictedFOPs, "po") != -1) {
                Y.one("#fop-tab-poli-0").addClass("hidden")
            }
        }
        catch (err) {
            errorMessagesString = '';
            if (typeof exLogger != 'undefined' && exLogger) {
                exLogger.log(err, exLogger.ErrorLevel.Error);
            }
        }
    }
    /*****************************************/
    /* Hide Bank transfer tab in P4S
    /*****************************************/
    function hideBankTransfer(e) {
        if (WhiteLabel.getComponentModel("cart_1").seatPrices.length >= 1) {
            Y.one("#fop-tab-otherCardTypes-0").addClass("hidden")
        }
    }
    function handleBankTransfer(e) {
        hideBankTransfer(e);
        VerifyVIPClass();
    }
    function VerifyVIPClass() {
        if (getVIPCookie('a380') == "a380") {
            Y.one("#fop-tab-otherCardTypes-0").addClass("hidden");
        }
    }

    function getVIPCookie(cname) {
        try {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            if (ca)
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i].trim();
                    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
                }
            return "";
        } catch (e) {
            if (typeof exLogger != 'undefined') {
                exLogger.log(e, exLogger.ErrorLevel.Error);
            }
            return "";
        }

    };

    /**********************************************************/
    /* Replace the content of the others tab to Bank Transfer */
    /**********************************************************/
    function addBankTab(e) {
        // Extract the content holder for the Others tab text
        var div = Y.all('#fop-tab-otherCardTypes-0 a');
        if (div !== null || div !== 'undefined') {
            // Sets the text of the tab as Bank Transfer
            div.item(0).set('text', 'Bank Transfer');
        }
    }
    /***************************************************/
    /* Function to add text to the others tab contents */
    /***************************************************/
    function addBankText(e) {
        try{
        // Extract the content holder of the others tab
        var div = Y.one('#fop-item-otherCardTypes-0-bpc-0');
        //Creates a text for appending to the content of the others tab : CHANGE
        var bankTransferText = Resources('custom.js.all.content.bankTransfer');
        var bankText = Y.Node.create('<br></br><div id="BankTransferText">' + bankTransferText + '</div>');
        // Check to see if the content holder is available : It will not be available for certain routes
        if (div !== null || div !== 'undefined') {
            var bpcText = Y.one('#BankTransferText');
            if (bpcText === null) {
                div.setStyle('width', '100%');
                div.append(bankText);
            }
            }
        }
        catch (err) {
            errorMessagesString = '';
            if (typeof exLogger != 'undefined' && exLogger) {
                exLogger.log(err, exLogger.ErrorLevel.Error);
            }

        }
    }
    function addNextBankText(e) {
        Y.on("contentready", addBankText, "#fop-item-otherCardTypes-0-bpc-0", Y, "");
    }
    /******************************************************/
    /* Adds Terms and Conditions link to the payments page*/
    /******************************************************/
    function addTermsConditions(e) {
        // Declares a variable for the the conten holder of the terms and conditions link
        var div = Y.one('#tcc_1');
        // Extract the current page language
        var language = sabre.config.defaultLang;
        // Extracts the language prefix from the variable
        var languageprefix = language.toString().substr(0, 2);
        //Creates the url for the terms and conditions link
        //var url = 'https://www.etihadairways.com/' + languageprefix + '/terms-and-conditions/';
        var url = 'http://www.etihad.com/legal/terms-and-conditions/'
        var nodeBody = '<a href="' + url + '"target="_blank">Terms and Conditions</a>';
        // Creates the anchor node
        var anchorNode = Y.Node.create(nodeBody);
        // Appends the node to the content holder
        div.append(nodeBody);
    }
    /*****************************************************************************/
    /* Creates a form to post data for ffpregistration from the confirmation page*/
    /*****************************************************************************/
    function ffpForm(e) {
        try{
        // Stop the defualt behavior of the event
        e.preventDefault();
        // Creates a variable to store passenger information from the json object
        var passengerInfo = WhiteLabel.getIbeData().passengersInfo;
        // Creates a variable to store pnr number of the booking
        var pnrNumber = WhiteLabel.getIbeData().pnrNumber;
        // Creates a variable to store language
        var language = WhiteLabel.getIbeData().language;
        //Creates the form element
        my_form = document.createElement('FORM');
        my_form.name = 'myForm';
        //The data is to be posted because of the large volume of the passenger information
        my_form.method = 'POST';
        //The form is to be submitted to a new window as the confirmation page needs to be available
        my_form.target = "_blank";
        // my_form.action = 'http://10.72.52.34:9080/FFP_RegistrationModule/pages/customerinfo.xhtml';
        // PROD
        my_form.action = 'https://www.etihadairways.com/sites/Etihad/global/en/guestrecognition/visitor/join/Pages/guestReg.aspx';
        // A hidden text field for carrying the passenger information in a json format
        my_passenger = document.createElement('INPUT');
        my_passenger.type = 'HIDDEN';
        my_passenger.name = 'passengers';
        my_passenger.value = JSON.stringify(passengerInfo);
        // A hidden text field for carrying the pnr information as a string
        my_pnr = document.createElement('INPUT');
        my_pnr.type = 'HIDDEN';
        my_pnr.name = 'pnr';
        my_pnr.value = pnrNumber;
        // A hidden text field for carrying the language in a string format
        my_language = document.createElement('INPUT');
        my_language.type = 'HIDDEN';
        my_language.name = 'language';
        my_language.value = language;
        // Adding the passenger info,pnr,language to the form
        my_form.appendChild(my_passenger);
        my_form.appendChild(my_pnr);
        my_form.appendChild(my_language);
        document.body.appendChild(my_form);
        // Submit the form as a post request to the action specified
        my_form.submit();
    }
        catch (err) {
            errorMessagesString = '';
            if (typeof exLogger != 'undefined' && exLogger) {
                exLogger.log(err, exLogger.ErrorLevel.Error);
            }
        }
    }
    /*******************************************************************************/
    /*Show a Limo link in the confirmation page if the fare class is either F or J */
    /*******************************************************************************/
    function chaufferLink(e) {
        //Declares a variable which will contain the limo value
        var limo = null;
        //Get a sub cookie value to decide if a limo link is to be displayed in the confirmation page
        try {
            limo = Y.Cookie.getSub("custom", "limo");
        } catch (e) {
            //Place value of limo as F . It is F which signifies False
            limo = "F";
        }
        //Checks to find if the value of cookie is to render the link
        if (limo === "T") {
        }
        else {
            Y.one('#customhtmlLimoDeepLink').setStyle('display', 'none');
        }
    }
    /***************************************************************************************************/
    /*Show a Bank Transfer link in the confirmation page if the bank transfer radio button was checked */
    /***************************************************************************************************/
    function bankTransfer(e) {
        //Decalares a variable which contains the value of the subcookie
        var remotePayment = null;
        //Get a sub cookie value to decide if a bank transfer link is to be displayed in the confirmation page
        try {
            remotePayment = Y.Cookie.getSub("custom", "bank");
        } catch (e) {
            // F signifies false
            remotePayment = "F";
        }
        //If the cookie value is true render the link
        if (remotePayment === "T") {
            // Extract the content holder for the link component
            var div = Y.one('#customhtmlremotepayment_BankTransferRedemption');
            // Extract the dom object to get the PNR : Other option would have been to extract it from JSON but JSON is not available from MYB
            var pnr = Y.one('#pnr-info').all('.view-itinerary-code span').item(0).get('text');
            // Extract the amount span
            var amountDD = Y.all('#payment-summary dd.total');
            var amountSpan = amountDD.item(2);
            // Extract the dom object to get the amount : Other option would have been to extract it from JSON but JSON is not available from MYB
            var amount = amountSpan.one('.prices-amount').get('text');
            // Extract the dom objet to get the currency :
            var currency = amountSpan.one('.currency').get('text');
            // Creates the URL : CHANGE for environmentss
            //var url = 'http://10.72.52.34:9080/SSWBankTransfer/BankSelection.html?refNo=' + pnr + '&amount=' + amount + '&currency=' +currency;
            //PROD
            var url = 'https://modules.etihad.com/SSWBankTransfer/BankSelection.html?refNo=' + pnr + '&amount=' + amount + '&currency=' + currency;
            // Ensures to open the window in a new window to keep the confirmation page
            var target = "_blank";
            var urlPath = '<a href="' + url + '"target="' + target + '">Bank Transfer</a>';
            //Create the anchor tag html element and the node for it
            var link = Y.Node.create(urlPath);
            //Append the link to the div
            div.append(link);
        }
    }
    /***************************************************************************************************/
    /*Show a Bank Transfer link in the confirmation page if the bank transfer radio button was checked */
    /***************************************************************************************************/
    function processBankTransfer(e) {
        e.preventDefault();
        // Extract the dom object to get the PNR : Other option would have been to extract it from JSON but JSON is not available from MYB
        var pnr = Y.one('#pnr-info').all('.view-itinerary-code span').item(0).get('text');
        // Extract the amount span
        var amountDD = Y.all('#payment-summary dd.total');
        var amountSpan = amountDD.item(2);
        // Extract the dom object to get the amount : Other option would have been to extract it from JSON but JSON is not available from MYB
        var amount = amountSpan.one('.prices-amount').get('text');
        // Extract the dom objet to get the currency :
        var currency = amountSpan.one('.currency').get('text');
        // Creates the URL : CHANGE for environmentss
        //var bankurl = 'http://10.72.52.34:9080/SSWBankTransfer/BankSelection.html?refNo=' + pnr + '&amount=' + amount + '&currency=' +currency;
        //PROD
        var bankurl = 'https://modules.etihad.com/SSWBankTransfer/BankSelection.html?refNo=' + pnr + '&amount=' + amount + '&currency=' + currency;
        window.open(bankurl, "_blank");
    }
    function hideBankText(e) {
        var payNowLink = Y.one("#payment-summary dd.paynow a");
        if (payNowLink === null || payNowLink === 'undefined') {
            Y.one('#customhtmlremotepayment_BankTransfer').setStyle('display', 'none');
        }
    }
    /*********************************************************************************************************************************/
    /*Show a ffp register link in the confirmation page if any of the adult passengers in the booking list doesn't have a ffp number */
    /*********************************************************************************************************************************/
    function ffpRegister(e) {
        //Decalares a variable which shows if the ffp registration link needs to be displayed
        var isFFAvailable = null;
        var target = "_blank";
        //Get a sub cookie value to decide if a ffp link is to be displayed in the confirmation page
        try {
            isFFAvailable = Y.Cookie.getSub("custom", "ffp");
        } catch (e) {
            // F signifies false
            isFFAvailable = "F";
        }
        //If the cookie value is true render the link
        if (isFFAvailable === "T") {
            // Extract the value of the content holder for ffp registration link
            var div = Y.one('#cnt_1_1_2_3');
            //Construct the URL: CHANGED url for different environments
            var url = 'Join <I><a id = "FFPRegister" href="#" target="_blank">Etihad Guest</a></I>';
            //Create the anchor tag html element and the node for it
            var node = Y.Node.create(url);
            // Appends it to the content holder
            div.append(node);
        }
    }
    function submitEvent() {
        var submit = Y.one('#btn-search');
        submit.on('click', function (e) {
            // For fare class
            var itenaryDetails = Y.all('#cart_itinerariesDetails ol');
            // Initialize the limo variable
            var limo = 'F';
            // Iterate over the itenary
            itenaryDetails.each(function () {
                // Get the fare node
                var fareNode = this.all('.farebasis');
                // Get the text for the fare
                var fareClass = fareNode.item(0).get('text').split(':')[1].substr(1, 1);
                //detrmine if fare class is either F or J
                if (fareClass == 'F' || fareClass == 'J') {
                    limo = 'T';
                }
            });
            // Sets the cookie value with the appropriate value , This is read in the confirmation page and the limo link is shown.
            Y.Cookie.setSub("custom", "limo", limo);
            //Bank Transfer link
            // Retrieved the checked node of a radio button, will return the node if checked and null if not checked
            var isBankTransfer = Y.one('#fop-item-input-otherCardTypes-0-bpc-0:checked');
            // Sets the appropriate values in the variable
            if (isBankTransfer === null) {
                Y.Cookie.setSub("custom", "bank", "F");
            }
            else {
                Y.Cookie.setSub("custom", "bank", "T");
            }
            // ffp link
            // Get the JSON object : The implementation assumes that ffp registration is not required in manage your booking where the json variable is not abailable
            var ibeData = WhiteLabel.getIbeData();
            // Declares a variable to store the number of adult passengers
            var num_ADT = null;
            var isFFAvailable = 'F';
            // Get the no of adult passengers
            try {
                var num_ADT = ibeData.passengers.ADT;
                // The following block will iterate atleast once and maximum for the number of adult passengers
                if (num_ADT !== null || num_ADT !== 'undefined') {
                    for (var i = 0; i < num_ADT; i++) {
                        // Retrieves the ffnumber of the current passenger
                        var ffAvailable = ibeData.passengersInfo[i].ffNumber;
                        if (ffAvailable == null || ffAvailable == 'undefined' || ffAvailable === '') {
                            // If the passenger doesn't have a ffp number , it sets the variable as true and subsequently the ffp registration link appears
                            isFFAvailable = "T";
                        }
                    }
                }
            } catch (e) {
                // Sets the variable to be F if there are any problems accessing the json variable
                isFFAvailable = 'F';
            }
            Y.Cookie.setSub("custom", "ffp", isFFAvailable);
        });
    }
    /*******************************************************************/
    /* Declare a function to get the cabin class from the fare basis ***/
    /*******************************************************************/
    function getCabinClass(fareBasis) {
        // Declare an enum for the cabin class
        var cabin = { 'N': 'Economy', 'E': 'Economy', 'U': 'Economy', 'V': 'Economy', 'L': 'Economy', 'Q': 'Economy', 'M': 'Economy', 'K': 'Economy', 'H': 'Economy', 'B': 'Economy', 'Y': 'Economy', 'I': 'Business', 'W': 'Business', 'D': 'Business', 'C': 'Business', 'J': 'Business', 'O': 'First', 'R': 'First', 'A': 'First', 'F': 'First' };
        // Extracts the cabin class from the function parameter fare basis
        var cabinClass = cabin[fareBasis];
        return cabinClass;
    }
});
// END IBM CODE

};