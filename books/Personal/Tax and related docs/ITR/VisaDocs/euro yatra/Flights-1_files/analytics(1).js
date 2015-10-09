var dataLayer = [];


// Constructor
function Analytics(Y) {
    this.yahooInstance = Y; 
    this.currentPage = null;
    this.ibeObject = WhiteLabel.getIbeData();

    this.journeyType = this.ibeObject.fullyPopulated != null ? this.ibeObject.journeySpan : 'NotAvailable';
    this.flowType = sabre.config.global.flowType;
    this.isIbeObjectAvailable = false;

    if (this.flowType == 'REDEMPTION' || this.flowType == 'BOOKING') {
        this.isIbeObjectAvailable = true;
    }

    this.hasAddedTag = false;

    this.gtm = '<!-- Google Tag Manager for Etihad.com--><noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-4TJ9" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript><script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({"gtm.start": new Date().getTime(),event:"gtm.js"});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!="dataLayer"?"&l="+l:"";j.async=true;j.src= "//www.googletagmanager.com/gtm.js?id="+i+dl;f.parentNode.insertBefore(j,f); })(window,document,"script","dataLayer","GTM-4TJ9");</script> <!-- End Google Tag Manager -->';
}

Analytics.prototype.PopulateProperties = function () {
}

Analytics.prototype.WriteProperties = function (pageName) {
    // Set the current page
    this.currentPage = pageName;
    // Only run the statements if the tag hasn't already been added
    if (!this.hasAddedTag) {
        // Set the global settings
        this.globalSettings();
        // If the IbeObject wasn't availabile then the journey type will be set to NotAvailable.  The IbeObject is only
        // available in Booking and redemption flow
        if (this.isIbeObjectAvailable) {
            // Each page requires a different set of properties to be populated
            switch (this.currentPage) {
                case etihad.pageCodes.FlightsResultsPage:
                    this.SearchDepartReturn();
                    this.CurrentDepartDate();
                    this.SearchPax();
                    this.addOandD();
                    break;
                case etihad.pageCodes.PassengerPage:
                    this.FlightProduct();
                    this.AllProducts();
                    this.SaleAmount();
                    break;
                case etihad.pageCodes.ExtrasPage:
                    this.FlightProduct();
                    this.FfpIdField();
                    this.AllProducts();
                    this.SaleAmount();
                    break;
                case etihad.pageCodes.SeatsPage:
                    this.FlightProduct();
                    this.Extras();
                    this.AllProducts();
                    this.SaleAmount();
                    this.FfpIdField();
                    break;
                case etihad.pageCodes.PaymentPage:
                    this.FlightProduct();
                    this.FfpIdField();
                    this.AllProducts();
                    this.SaleAmount();
                    this.AddPaymentButtonEvent();
                    break;
                case etihad.pageCodes.ConfirmationPage:
                    this.FlightProduct();
                    this.FlightProductAmount();
                    this.FfpIdField();
                    this.PnrNumber();
                    this.TimeStamp();
                    this.PurchaseID();
                    this.FlightBookingDepartReturn();
                    this.BookingCurrentDepart();
                    this.AllProducts();
                    this.Extras();
                    this.BaggageAmount();
                    this.ProductFlightUnit();
                    this.SaleAmount();
                    this.FFPMilesSpent();
                    this.FormOfPayment();
                    break;
            }
        }

        this.addGTM();
        this.hasAddedTag = true;
    }
}

Analytics.prototype.instantiate = function (pageName) {
    if (this.isIbeObjectAvailable) {
        if (this.ibeObject.fullyPopulated === undefined) {
            WhiteLabel.addEventHandler(this.yahooInstance.bind(function (ibeData) {
                this.ibeObject = ibeData;
                this.journeyType = ibeData.journeySpan;
                this.WriteProperties(pageName);
            }, this));
        } else {
            this.WriteProperties(pageName);
        }
    }
    else {
        this.WriteProperties(pageName);
    }

}

Analytics.prototype.RetrieveCurrencyFromObj = function () {
    var currency = null;

    if (this.ibeObject !== null && $(this.ibeObject).length > 0 && this.ibeObject.total !== null && this.ibeObject.total !== undefined) {

        for (var key in this.ibeObject.total[0].pricesPerCurrency) {
            if (this.ibeObject.total[0].pricesPerCurrency.hasOwnProperty(key)) {
                if (this.ibeObject.total[0].pricesPerCurrency[key].currency.code != 'FFCURRENCY') {
                    currency = this.ibeObject.total[0].pricesPerCurrency[key].currency.code;
                    break;
                }
            }
        }
    }

    return currency;
}

Analytics.prototype.CurrencyCode = function () {
    var currencyCode = this.RetrieveCurrencyFromObj();

    if (currencyCode !== null) {
        dataLayer.push({
            'aCurrency': currencyCode
        });
    }
}

Analytics.prototype.globalSettings = function () {
    dataLayer.push({
        'aPageName': sabre.config.global.storefrontCode + ':' + sabre.config.pageCode,
        'aSiteEdition': sabre.config.global.language,
        'aEtihadGuestID': this.getGuestId(),
        'aServerName': sabre.config.global.buildNumber,
        'aSessionID': this.getJesessionID(),
        'aCampaignID': this.getCampaignID(),
        'aFlightFlowType': sabre.config.global.flowType,
        'aTimestamp': this.RetrieveRequestTimeStamp(),
        'aPromoCode': this.getPromoCode(),
        'aSiteSection': sabre.config.global.storefrontCode,
        'aCurrency': this.RetrieveCurrencyFromObj(),
        'aErrorMessage': this.CaptureErrorMessage()
    });
}

// Retrieves the Guest id from sabre's white label object
Analytics.prototype.getGuestId = function () {
    var guestID = null;

    if (this.ibeObject.loggedUser !== null) {
        guestID = this.ibeObject.loggedUser.ffNumber;
    }
    return guestID;
}

// Retrieves the JSESSIONID from a cookie
Analytics.prototype.getJesessionID = function () {
    var sessionCookie = null;

    if (this.yahooInstance.Cookie.exists("JSESSIONID")) {
        sessionCookie = this.yahooInstance.Cookie.get("JSESSIONID")
    }
    return sessionCookie;
}

Analytics.prototype.getCampaignID = function () {
    var campaignCookie = null,
        campaignId = null;

    if (this.yahooInstance.Cookie.exists("c_m")) {

        campaignCookie = this.yahooInstance.Cookie.get("c_m")

        if (campaignCookie !== null || campaignCookie !== 'undefined') {
            campaignId = campaignCookie;
        }
    }
    return campaignId
}

Analytics.prototype.addOandD = function () {
    // For return [CABIN-LETTER][ORG1:DEST1]-[DEST1:ORG1]
    // For one-way [CABIN-LETTER][ORG1:DEST1]
    // For multicity [CABIN-LETTER][ORG1:DEST1]-[DEST1:DEST2]-[DEST2:DEST3]

    // get the cabin letter
    var cabin = this.ibeObject.cabinClass + ':';
    var oandd = '';
    function IsVIPRoute() {
        var vipSearchCookie = readSubCookie('SSW', 'VIPRoute');
        if (vipSearchCookie && vipSearchCookie === "true") {
            return true;
        } else {
            return false;
        }
    }
    var isVIPRoute = IsVIPRoute();
    if (isVIPRoute === true) {
        cabin = 'THE RESIDENCE' + ':';
    }
    for (var i = 0; i < this.ibeObject.itineraryParts.length; i++) {

        oandd += this.ibeObject.itineraryParts[i].departureAirport + ':' + this.ibeObject.itineraryParts[i].arrivalAirport;

        if (i < (this.ibeObject.itineraryParts.length - 1)) {
            oandd += '-';
        }
    }

    dataLayer.push({
        'aFlightSearchOD': cabin + oandd
    });
}

Analytics.prototype.SearchDepartReturn = function () {
    if (this.ibeObject !== null && this.ibeObject !== undefined && this.ibeObject.itineraryParts !== null && this.ibeObject.itineraryParts !== undefined) {
        var searchedDates = FormatDateTime(this.ibeObject.itineraryParts[0].date);

        if (this.journeyType === 'ROUND_TRIP' || this.journeyType === 'MULTI_CITY') {
            searchedDates += ':' + FormatDateTime(this.ibeObject.itineraryParts[this.ibeObject.itineraryParts.length - 1].date)
        }

        dataLayer.push({
            'aFlightSearchDepartReturn': searchedDates
        });
    }
}

Analytics.prototype.CurrentDepartDate = function () {
    var currentDateTime = new Date();

    var currentDepartDate = OneDigitNumberConverter(currentDateTime.getDate().toString()) + '/' + OneDigitNumberConverter((currentDateTime.getMonth() + 1).toString()) + '/' + currentDateTime.getFullYear().toString() + ':' + FormatDateTime(this.ibeObject.itineraryParts[0].date);

    dataLayer.push({
        'aFlightSearchCurrentDepart': currentDepartDate
    });
}

Analytics.prototype.SearchPax = function () {
    var adults = 0,
        children = 0,
        infants = 0;

    adults = this.ibeObject.passengers['ADT'];

    if (this.ibeObject.passengers['CHD'] !== undefined && this.ibeObject.passengers['CHD'] !== null) {
        children = this.ibeObject.passengers['CHD'];
    }

    if (this.ibeObject.passengers['INF'] !== undefined && this.ibeObject.passengers['INF'] !== null) {
        infants = this.ibeObject.passengers['INF'];
    }

    dataLayer.push({
        'aFlightSearchPax': adults + 'ADT' + ':' + children + 'CHD' + ':' + infants + 'INF'
    });
}

Analytics.prototype.PnrNumber = function () {
    if (this.ibeObject.pnrNumber) {
        dataLayer.push({
            'aPNR': this.ibeObject.pnrNumber
        });
    }
    else {
        var objIti = $(".view-itinerary-code");
        if (objIti.length > 0) {
            if (objIti.children("span").length > 0) {
                var pnr = objIti.children("span").text();
                dataLayer.push({
                    'aPNR': pnr
                });
            }
        }
    }
}

Analytics.prototype.RetrieveRequestTimeStamp = function () {
    var requestDateTime = new Date(sabre.config.global.currentTimeInMillis),
        formattedTimeStamp = requestDateTime.getUTCFullYear().toString() + OneDigitNumberConverter((requestDateTime.getUTCMonth() + 1).toString()) + OneDigitNumberConverter(requestDateTime.getUTCDate()) + OneDigitNumberConverter(requestDateTime.getUTCHours());

    return formattedTimeStamp;
}

Analytics.prototype.TimeStamp = function () {
    var requestDateTime = new Date(sabre.config.global.currentTimeInMillis);

    dataLayer.push({
        'aTimestamp': this.RetrieveRequestTimeStamp()
    });
}

Analytics.prototype.FormOfPayment = function () {
    
    var cookieManager = new EtihadCookie();

    var paymentType = cookieManager.RetrieveValue("aFormOfPayment");

    dataLayer.push({
        'aFormOfPayment': paymentType
    });
}

Analytics.prototype.FlightProduct = function() {
    dataLayer.push({
        'aProductFlight': this.Flights()
    });
    dataLayer.push({
        'aProductFlightSimple': this.FlightsSimple()
    });
};

Analytics.prototype.FlightProductAmount = function() {
    dataLayer.push({
        'aProductFlightAmount': this.TotalFlightAmount()
    });
};


Analytics.prototype.FlightsSimple = function() {
    // Obtain the first level segment as a majority of data is obtained from that

    //    Return [CLASS-CODE]:[OPERATING-AIRLINE-CODE][FLIGHT-NUMBER]:ORG:DEST-DEST:ORG
    //    One-way [CLASS-CODE]:[OPERATING-AIRLINE-CODE][FLIGHT-NUMBER]:ORG:DEST
    //    Multicity [CLASS-CODE]:[OPERATING-AIRLINE-CODE][FLIGHT-NUMBER]:ORG1:DEST1-DEST1:DEST2-DEST2:DEST3

    if (this.ibeObject.selectedOffers !== null && this.ibeObject.selectedOffers !== undefined) {
        var upliftSegment = this.ibeObject.selectedOffers[0].parts[0].segments[0];
        var flightProduct = upliftSegment.bookingClass + ':' + upliftSegment.operatingAirlineCode + upliftSegment.flightNumber + ':';

        if (this.ibeObject.journeySpan === 'MULTI_CITY') {
            // Sabre don't array elements in selectedOffers for multi city instead they use parts
            for (var k = 0; k < this.ibeObject.selectedOffers[0].parts.length; k++) {
                var segments = this.ibeObject.selectedOffers[0].parts[k].segments;

                // If it has multiple bounds then split by the hypen
                if (k > 0) {
                    flightProduct += '-';
                }

                for (var t = 0; t < segments.length; t++) {
                    var segment = this.ibeObject.selectedOffers[0].parts[k].segments[t];

                    if (segment !== undefined && segment !== null) {
                        // If its the 1st segment then get the departure and arrival points
                        if (t === 0) {
                            flightProduct += segment.departureAirport;
                        }

                        flightProduct += ':' + segment.arrivalAirport;
                    }
                }
            }
        }
        else {

            for (var j = 0; j < this.ibeObject.selectedOffers.length; j++) {

                var segments = this.ibeObject.selectedOffers[j].parts[0].segments;

                // If it has multiple bounds then split by the hypen
                if (j > 0) {
                    flightProduct += '-';
                }

                for (var i = 0; i < segments.length; i++) {
                    var segment = this.ibeObject.selectedOffers[j].parts[0].segments[i];

                    if (segment !== undefined && segment !== null) {
                        // If its the 1st segment then get the departure and arrival points
                        if (i === 0) {
                            flightProduct += segment.departureAirport;
                        }

                        flightProduct += ':' + segment.arrivalAirport;
                    }
                }
            }
        }
    }

    return flightProduct;
};

Analytics.prototype.Flights = function() {
    var simple = this.FlightsSimple();
    
    if (!simple) {
         return undefined;
    }

    return 'FLIGHTS;' + simple;
};

Analytics.prototype.PurchaseID = function () {
    var pnr = "";
    var timeStamp = "";

    if (this.ibeObject.pnrNumber) {
        pnr = this.ibeObject.pnrNumber;
    }
    else {
        var objIti = $(".view-itinerary-code");
        if (objIti.length > 0) {
            if (objIti.children("span").length > 0) {
                pnr = objIti.children("span").text();
            }
        }
    }

    timeStamp = this.RetrieveRequestTimeStamp();

    dataLayer.push({
        'aPurchaseID': pnr + timeStamp
    });
}

Analytics.prototype.ProductFlightUnit = function () {
    dataLayer.push({
        'aProductFlightUnit': this.CalculateFlightUnit()
    });

}

Analytics.prototype.CalculateFlightUnit = function () {
    var adults = 0,
        children = 0;

    adults = this.ibeObject.passengers['ADT'];

    if (this.ibeObject.passengers['CHD'] !== undefined && this.ibeObject.passengers['CHD'] !== null) {
        children = this.ibeObject.passengers['CHD'];
    }

    return adults + children;
}

Analytics.prototype.FlightBookingDepartReturn = function () {
    //booked PNR's departure date with format of DD/MM/YYYY:DD/MM/YYYY for return and 
    //multicity flight searches and format of DD/MM/YYYY for one way.

    var dateString = '';

    // Compile the first part which isn't specific to any journey type
    dateString = FormatDateTime(this.ibeObject.itineraryParts[0].date);

    if (this.journeyType === 'MULTI_CITY' || this.journeyType === 'ROUND_TRIP') {
        // get the last element from the itinerary parts array and append the date to the
        // existing datestring value
        dateString += ':' + FormatDateTime(this.ibeObject.itineraryParts[this.ibeObject.itineraryParts.length - 1].date);
    }

    dataLayer.push({
        'aFlightBookingDepartReturn': dateString
    });
}

Analytics.prototype.BookingCurrentDepart = function () {
    var currentDateTime = new Date(),
        currentDateTimeFormatted = OneDigitNumberConverter(currentDateTime.getDate()) + '/' + OneDigitNumberConverter(currentDateTime.getMonth() + 1) + '/' + currentDateTime.getFullYear(),
        departDateFormatted = FormatDateTime(this.ibeObject.itineraryParts[0].date);

    dataLayer.push({
        'aFlightBookingCurrentDepart': currentDateTimeFormatted + ':' + departDateFormatted
    });
}

Analytics.prototype.FfpIdField = function () {
    var ffpField = '';

    for (var i = 0; i < this.ibeObject.passengersInfo.length; i++) {
        if (i > 0) {
            ffpField += '|';
        }

        ffpField += this.ibeObject.passengersInfo[i].ffNumber;
    }

    dataLayer.push({
        'aFFPIDField': ffpField
    });
}

Analytics.prototype.Extras = function () {
    var baggageAmount = this.CalculateExtrasAmount();
    
    var hotelsAmount = this.CarsAndHotelsValue(this.CalculateHotelsAmount("C98"), this.CalculateHotelsAmount("980"));

    if (baggageAmount) {
        dataLayer.push({
            'aProductExtraBaggage': 'ANCILLARY;Extra-Baggage',
            'aProductExtraBaggageAmount': baggageAmount
        });
    }

    if (hotelsAmount) {
        dataLayer.push({
            'aProductHotelCar': 'ANCILLARY;HotelCar',
            'aProductHotelCarAmount': hotelsAmount
        });
    }
}

Analytics.prototype.BaggageAmount = function () {

    dataLayer.push({
        'aProductExtraBaggageAmount': this.CalculateExtrasAmount()
    });
}

Analytics.prototype.CalculateExtrasAmount = function () {
    var hotelCode = '980';
    var carCode = 'C98';

    var selectedAncillaries = this.ibeObject.selectedAncillariesPerPaxIndex;
    var amount = null;
    var counter = this.ibeObject.passengers.ADT;

    if (this.ibeObject.passengers.CHD !== undefined) {
        counter += this.ibeObject.passengers.CHD;
    }

    if (this.ibeObject.passengers.INF !== undefined) {
        counter += this.ibeObject.passengers.INF;
    }

    if (selectedAncillaries) {
        for (var i = 1; i <= counter; i++) {

            if (selectedAncillaries[i] == undefined)
                break;

            for (var j = 0; j < selectedAncillaries[i].length; j++) {
                if (selectedAncillaries[i][j].code.indexOf(hotelCode) == -1 && selectedAncillaries[i][j].code.indexOf(carCode) == -1) {
                    for (var k = 0; k < selectedAncillaries[i][j].prices.length; k++) {
                        amount += parseFloat(selectedAncillaries[i][j].prices[k].amount);
                    }
                }
            }
        }
    }
    return amount
}

Analytics.prototype.CalculateHotelsAmount = function (code) {

    var selectedAncillaries = this.ibeObject.selectedAncillariesPerPaxIndex;
    var amount = null;
    var counter = this.ibeObject.passengers.ADT;

    if (this.ibeObject.passengers.CHD !== undefined) {
        counter += this.ibeObject.CHD;
    }

    if (this.ibeObject.passengers.INF !== undefined) {
        counter += this.ibeObject.INF;
    }

    counter = parseInt('-' + counter.toString(), 10);

    if (selectedAncillaries) {
        for (var i = -1; i >= counter; i--) {
            
            if (selectedAncillaries[i] == undefined)
                break;

            for (var j = 0; j < selectedAncillaries[i].length; j++) {
                if (selectedAncillaries[i][j].code == code) {
                    amount += parseInt(selectedAncillaries[i][j].prices[0].amount, 10);
                }
            }
        }
    }
    return amount
}


Analytics.prototype.addGTM = function () {
    $('body').after(this.gtm);
}

Analytics.prototype.AllProducts = function () {
    var products = '';
    var flightProduct = this.Flights();

    var baggage = this.CalculateExtrasAmount();

    var hotelsCars = this.CarsAndHotelsValue(this.CalculateHotelsAmount("C98"), this.CalculateHotelsAmount("980"));
    
    var baggageSelected = 'ANCILLARY;Extra-Baggage';
    var hotelsCarsSelected = 'ANCILLARY;HotelCar';
    
    switch (this.currentPage) {
        case etihad.pageCodes.PassengerPage:
            products += flightProduct;
            break;
        case etihad.pageCodes.ExtrasPage:
            products += flightProduct;
            break;
        case etihad.pageCodes.SeatsPage:
            products += flightProduct;
            if (baggage) {
                products += ',' + baggageSelected;
            }
            if (hotelsCars)
                products += ',' + hotelsCarsSelected;
            break;
        case etihad.pageCodes.PaymentPage:
            products += flightProduct;
            if (baggage) {
                products += ',' + baggageSelected;
            }
            if (hotelsCars)
                products += ',' + hotelsCarsSelected;
            break;
        case etihad.pageCodes.ConfirmationPage:
            products += flightProduct;
            products += ';' + this.CalculateFlightUnit();
            products += ';' + this.TotalFlightAmount();

            if (sabre.config.global.flowType == 'REDEMPTION') {
                products += ';;event17=' + this.RetrieveMilesSpent();
            }

            if (baggage) {
                products += ',' + baggageSelected;
                products += ';;' + baggage;
            }
            if (hotelsCars) {
                products += ',' + hotelsCarsSelected;
                products += ';;' + hotelsCars;
            }
            break;
    }

    dataLayer.push({
        'aProducts': products
    });
}


Analytics.prototype.Total = function () {
    var amount = '';

    for (var key in this.ibeObject.total[0].pricesPerCurrency) {
        if (this.ibeObject.total[0].pricesPerCurrency.hasOwnProperty(key)) {
            if (key != 'FFCURRENCY') {
                amount = this.ibeObject.total[0].pricesPerCurrency[key].amount;
                break;
            }
        }
    }

    return parseFloat(amount);
}

Analytics.prototype.FFPMilesSpent = function () {
    if (sabre.config.global.flowType == 'REDEMPTION') {
        dataLayer.push({
            'aGuestMilesSpent': this.RetrieveMilesSpent()
        });
    }
}

Analytics.prototype.MilesAmount = function () {
    var amount = null;

    for (var key in this.ibeObject.total[0].pricesPerCurrency) {
        if (this.ibeObject.total[0].pricesPerCurrency.hasOwnProperty(key)) {
            if (key == 'FFCURRENCY') {
                amount = this.ibeObject.total[0].pricesPerCurrency[key].amount;
                break;
            }
        }
    }
    if (amount === null) {
        return amount;
    }
    else {
        return parseInt(amount, 10);
    }
}

Analytics.prototype.SaleAmount = function () {
    dataLayer.push({
        'aTotalSaleAmount': this.Total()
    });
}

Analytics.prototype.TotalFlightAmount = function () {
    var totalSaleAmount = null;
    var baggageAmount = this.CalculateExtrasAmount();
    var hotelsCarsAmount = this.CarsAndHotelsValue(this.CalculateHotelsAmount("C98"), this.CalculateHotelsAmount("980"));
    var flightAmount = this.Total();

    totalSaleAmount = flightAmount;

    if (baggageAmount !== null) {
        totalSaleAmount -= baggageAmount;
    }

    if (hotelsCarsAmount !== null) {
        totalSaleAmount -= hotelsCarsAmount;
    }

    return totalSaleAmount;
}

Analytics.prototype.AddPaymentButtonEvent = function() {
    var paymentButton = $('#btn-search');
    try {
        // Make sure we have a handle of the button
        if (paymentButton !== undefined && paymentButton !== null) {
            $(paymentButton).bind('click', function(e) {
                // Get the omniture object
                var omnitureObject = window["s"];

                if (omnitureObject !== undefined && omnitureObject !== null) {
                    omnitureObject.linkTrackVars = 'events';
                    omnitureObject.linkTrackEvents = 'event16';
                    omnitureObject.events = 'event16'
                    omnitureObject.tl(this, 'o', 'Payment Button Click');
                }
            });
        }
    } catch(er) {
        if (typeof exLogger != 'undefined' && exLogger)
            exLogger.log(er, exLogger.ErrorLevel.Error);
    }
};

Analytics.prototype.CaptureErrorMessage = function() {
    var errorMessagesString = null;
    // Get a handle of any error messages on the page
    var errorArrays = $('.flomes');
    // Wrap it in a try catch so it doesn't break any trackng
    try {
        // If the array is populated then there is an error on the page
        if (errorArrays !== undefined && errorArrays !== null && errorArrays.length > 0) {
            errorMessagesString = '';

            $.each(errorArrays, function(index) {
                // Seperate each error by a pipe
                if (index > 0) errorMessagesString += '|';

                errorMessagesString += $('.flow-message-title', this).text().trim() + '-' +
                    $('.flow-message-text', this).text().trim();

                if (errorMessagesString !== null && errorMessagesString.trim() == "-") {
                    errorMessagesString = "";
                }
            });
        }
    } catch(er) {
        errorMessagesString = 'Error has been detected, but there was an error scrapping it';
        if (typeof exLogger != 'undefined' && exLogger) {
            exLogger.params.add("AdditionalMsg", errorMessagesString);
            exLogger.log(er, exLogger.ErrorLevel.Error);
        }
    }
    return errorMessagesString;
};

// Retrieves the Promotion code/Corporate Id from sabre's white label object
Analytics.prototype.getPromoCode = function() {
    var promoCode = null;

    if (this.ibeObject != null && this.ibeObject !== 'undefined' && $(this.ibeObject).length > 0 && this.ibeObject.corporateId != null && this.ibeObject.corporateId !== undefined)
        promoCode = this.ibeObject.corporateId;
    else if (this.ibeObject != null && this.ibeObject !== 'undefined' && $(this.ibeObject).length > 0 && this.ibeObject.promoCode != null && this.ibeObject.promoCode !== undefined)
        promoCode = this.ibeObject.promoCode;
    return promoCode;
};

Analytics.prototype.RetrieveMilesSpent = function() {
    var milesSpent = null;
    var $scope = $('.payment-breakdown.payment-breakdown-total');

    if ($($scope).length > 0) {
        milesSpent = $('.prices-amount:eq(0)', $scope).text();
    }

    return milesSpent;
};

Analytics.prototype.CarsAndHotelsValue = function(cars, hotels) {
    var carsAmount = null,
        hotelsAmount = null,
        carsHotels = null;

    if (cars !== null) {
        carsAmount = parseFloat(cars);
        carsHotels += carsAmount;
    }

    if (hotels !== null) {
        hotelsAmount = parseFloat(hotels);
        carsHotels += hotelsAmount;
    }

    return carsHotels;
};
