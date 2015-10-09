// VDED11389 at 18/03/2015 05:22:48
if (typeof veTagData === 'undefined') {
    var veTagData = (function () {
        var b,
            tag = document.getElementById('veConnect'),
            d = {
                journeycode: 'D9D2B911-A3A0-4FA4-8F93-08084164B50A',
                captureConfigUrl: 'drs2.veinteractive.com/CaptureConfigService.asmx/CaptureConfig',
                chatServicesUrl: 'rcs.veinteractive.com/ConversationService.asmx/',
                assistServicesUrl: 'appsapi.veinteractive.com',
                veHostDomain: '//config1.veinteractive.com',

                captureConfig: {
  CaptureUrl: "drs2.veinteractive.com/CaptureConfigService.asmx/CaptureConfig",
  customerid: 3614,
  datareceiverurl: "drs2.veinteractive.com/DataReceiverService.asmx/DataReceiver",
  Forms: [
    {
      ChatAgentId: 1628,
      EmailOptOut: false,
      FormFields: [
        {
          ClientFieldName: "first_name-0",
          DomEvent: "OnloadOnChange",
          FieldTypeName: "Id",
          FormMappingId: 27979,
          HtmlAttributeTag: "Value",
          HtmlType: ":text",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: "contactInfo-email-1",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Id",
          FormMappingId: 27980,
          HtmlAttributeTag: "Value",
          HtmlType: ":text",
          IdentifyAbandonment: false,
          isEmail: true
        },
        {
          ClientFieldName: "cart_leg_0_fare-family-name",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Id",
          FormMappingId: 27982,
          HtmlAttributeTag: "Value",
          HtmlType: "span",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: "cart_leg_0_number",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Id",
          FormMappingId: 27983,
          HtmlAttributeTag: "Value",
          HtmlType: "li",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: "cart_leg_0_city_1",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Id",
          FormMappingId: 27985,
          HtmlAttributeTag: "Value",
          HtmlType: "li",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: "cart_leg_0_departure_date_1",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Id",
          FormMappingId: 27989,
          HtmlAttributeTag: "Value",
          HtmlType: "li",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: "li[id^='cart_leg_0_city']:last",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Raw",
          FormMappingId: 27992,
          HtmlAttributeTag: "Value",
          HtmlType: "li",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: "[id^='cart_leg_0_arrival_date']:last",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Raw",
          FormMappingId: 27993,
          HtmlAttributeTag: "Value",
          HtmlType: "li",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: "cart_leg_1_fare-family-name",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Id",
          FormMappingId: 27995,
          HtmlAttributeTag: "Value",
          HtmlType: "span",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: "cart_leg_1_city_1",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Id",
          FormMappingId: 27997,
          HtmlAttributeTag: "Value",
          HtmlType: "li",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: "cart_leg_1_departure_date_1",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Id",
          FormMappingId: 27999,
          HtmlAttributeTag: "Value",
          HtmlType: "li",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: "li[id^='cart_leg_1_city']:last",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Raw",
          FormMappingId: 28000,
          HtmlAttributeTag: "Value",
          HtmlType: "li",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: "[id^='cart_leg_1_arrival_date']:last",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Raw",
          FormMappingId: 28001,
          HtmlAttributeTag: "Value",
          HtmlType: "li",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: ".prices-alternative:last",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Raw",
          FormMappingId: 28628,
          HtmlAttributeTag: "Value",
          HtmlType: "span",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: "select-language",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Id",
          FormMappingId: 29709,
          HtmlAttributeTag: "Value",
          HtmlType: "select",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: ".number:last",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Raw",
          FormMappingId: 29908,
          HtmlAttributeTag: "Value",
          HtmlType: "li",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: "[name$='lastName']:first",
          DomEvent: "OnChange",
          FieldTypeName: "Raw",
          FormMappingId: 29909,
          HtmlAttributeTag: "Value",
          HtmlType: ":text",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: "#cart-price-details #price-value-fare",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Raw",
          FormMappingId: 29910,
          HtmlAttributeTag: "Value",
          HtmlType: "span",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: "#cart-price-details #price-value-taxes",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Raw",
          FormMappingId: 29911,
          HtmlAttributeTag: "Value",
          HtmlType: "span",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: "cac-country",
          DomEvent: "OnLoad",
          FieldTypeName: "Id",
          FormMappingId: 29921,
          HtmlAttributeTag: "Value",
          HtmlType: "select",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: "[id^='first_name-']",
          DomEvent: "DynamicActivity",
          FieldTypeName: "RawSeries",
          FormMappingId: 37073,
          HtmlAttributeTag: "Value",
          HtmlType: ":text",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: "[id^='last_name-']",
          DomEvent: "DynamicActivity",
          FieldTypeName: "RawSeries",
          FormMappingId: 37396,
          HtmlAttributeTag: "Value",
          HtmlType: ":text",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: ".component-top h4 span:last",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Raw",
          FormMappingId: 41833,
          HtmlAttributeTag: "Value",
          HtmlType: "span",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: "cart_leg_0",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Id",
          FormMappingId: 45365,
          HtmlAttributeTag: "Id",
          HtmlType: "div",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: "#step-3.stepCurrent",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Raw",
          FormMappingId: 54992,
          HtmlAttributeTag: "Id",
          HtmlType: "li",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: "#customhtmlHajjAdvisory span",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Raw",
          FormMappingId: 82875,
          HtmlAttributeTag: "Value",
          HtmlType: "span",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: "veProactiveTextInput",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Id",
          FormMappingId: 83033,
          HtmlAttributeTag: "Value",
          HtmlType: ":text",
          IdentifyAbandonment: false,
          isEmail: true
        },
        {
          ClientFieldName: "contact-proactive",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Class",
          FormMappingId: 83034,
          HtmlAttributeTag: "Class",
          HtmlType: "div",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: ".total-price-container .prices-amount",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Raw",
          FormMappingId: 83072,
          HtmlAttributeTag: "Value",
          HtmlType: "span",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: ".total-price-container .prices-currency:first",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Raw",
          FormMappingId: 83081,
          HtmlAttributeTag: "Value",
          HtmlType: "span",
          IdentifyAbandonment: false,
          isEmail: false
        }
      ],
      FormId: 15308,
      FormTypeId: 1,
      FormURLs: [
        "booking.etihad.com/SSW2010/EYEY/webqtrip.html"
      ],
      IdentifyAbandonmentOr: true,
      NumberIdentifiedFields: 0,
      Name: null,
      OptOuts: [],
      Paremeter: []
    },
    {
      ChatAgentId: null,
      EmailOptOut: false,
      FormFields: [
        {
          ClientFieldName: "label.paymentsummary.paymenttype.ending",
          DomEvent: "OnLoad",
          FieldTypeName: "Class",
          FormMappingId: 28477,
          HtmlAttributeTag: "Value",
          HtmlType: "div",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: ".view-itinerary-code span[id^='yui_']",
          DomEvent: "OnLoad",
          FieldTypeName: "Raw",
          FormMappingId: 28703,
          HtmlAttributeTag: "Value",
          HtmlType: "span",
          IdentifyAbandonment: false,
          isEmail: false
        }
      ],
      FormId: 16129,
      FormTypeId: 2,
      FormURLs: [
        "booking.etihad.com/SSW2010/EYEY/webqtrip.html"
      ],
      IdentifyAbandonmentOr: true,
      NumberIdentifiedFields: 0,
      Name: null,
      OptOuts: [],
      Paremeter: [
        {
          ParameterValue: "submitPaRes",
          Paremeter: "_eventId"
        }
      ]
    },
    {
      ChatAgentId: 1213,
      EmailOptOut: false,
      FormFields: [
        {
          ClientFieldName: "veConnect",
          DomEvent: "OnLoad",
          FieldTypeName: "Id",
          FormMappingId: 69430,
          HtmlAttributeTag: "Id",
          HtmlType: "div",
          IdentifyAbandonment: false,
          isEmail: false
        },
        {
          ClientFieldName: "frm_PromotionCode",
          DomEvent: "OnChange",
          FieldTypeName: "Id",
          FormMappingId: 92239,
          HtmlAttributeTag: "Value",
          HtmlType: ":text",
          IdentifyAbandonment: false,
          isEmail: false
        }
      ],
      FormId: 32356,
      FormTypeId: 1,
      FormURLs: [
        "www.etihad.com/en-gb/",
        "etihad.com/en-gb/plan-and-book/book-flights/"
      ],
      IdentifyAbandonmentOr: true,
      NumberIdentifiedFields: 0,
      Name: null,
      OptOuts: [],
      Paremeter: []
    }
  ],
  IdentifyAbandonmentOr: true,
  JourneyCode: "D9D2B911-A3A0-4FA4-8F93-08084164B50A",
  JourneyId: 4687,
  JourneyTimeOut: 1800,
  NumberIdentifiedFields: 0,
  OptOutField: 0
},
                /*
                 * The custom settings are based on the standard defined on Settings.js.
                 */
                settings: { domainsToIgnore: ['booking.etihad.com','etihad.com' ], unsupportedBrowsersVersionPlatform: { 'ie' : ['8'] }, unsupportedBrowsers: {
    'IE': null, // disable IE
    'Safari': null, // disable Safari
  }, 
  consoleMessagesEnabled: true,
 elementsStoppingAppsOnClick: [ ],
 autocompleteInputsHandler: [ ],
 keywordsRegExp: [ { source: 'Example', regexp: / /, notSearchEngine: false, replaceCharactersBySpace: '-', storeSearchTerm: false, showNoProducts: false, ignoreCloses: false } ],
 cookies: { enabled: false , timeToLive: 60},
animations: {"entry":{"main":"ve-fadein","cta":"ve-fadein","proactivecta":""},"hover":{"main":"","cta":"","close":"ve-zoomonhover","submit":""},"loop":{"main":"","cta":"","proactivecta":"","close":"","submit":""}}
}
,

                /*
                 * Custom events that allow custom behavior per journey. The standard is defined on CustomEvents.js.
                 */
                customEvents: {

  onFormIdentified: function(formId) {if(window.addEventListener) {(function(formId) {var ii, forms, checkChat;forms = [];veTagData.captureConfig.Forms.forEach(function(form) {if(form.ChatAgentId != null) {forms.push(form.FormId);}});for(ii = 0; ii < forms.length; ii++) {if(formId == forms[ii]) {console.info('Form identified');setupListeners();return formId;}}function setupAnimations(target, observer) {if(observer != null) observer.disconnect();if(!veTagData.settings.animations) return;var $ = VEjQuery;var $main = $('#ChatMainDiv'),$cta = $('#VeChatCTA'),$proactivecta = $('#veProactiveButton'),$close = $('#WindowCloseBtn'),$submit = $('#ChatButtonsDiv'),animation = veTagData.settings.animations;$main.addClass(animation.entry.main);$cta.addClass(animation.entry.cta);$proactivecta.addClass(animation.entry.proactivecta);$close.addClass(animation.entry.close);$submit.addClass(animation.entry.submit);setTimeout(function() {$main.removeClass(animation.entry.main);$cta.removeClass(animation.entry.cta);$proactivecta.removeClass(animation.entry.proactivecta);$close.removeClass(animation.entry.close);$submit.removeClass(animation.entry.submit);setTimeout(function() {$main.addClass(animation.hover.main);$cta.addClass(animation.hover.cta);$proactivecta.addClass(animation.hover.proactivecta);$close.addClass(animation.hover.close);$submit.addClass(animation.hover.submit);$main.addClass(animation.loop.main);$cta.addClass(animation.loop.cta);$proactivecta.addClass(animation.loop.proactivecta);$close.addClass(animation.loop.close);$submit.addClass(animation.loop.submit);}, 1);}, 100);}function setupListeners() {checkChat = setInterval(function() {var target = document.getElementById('ChatMainDiv');if(target) {if(VeAPI.browser.browser() !== 'Chrome') {clearInterval(checkChat);window.addEventListener('beforeunload', setupAnimations, true);return;} else {setUpMutationObserver(target);return;}} else {return;}}, 100);}function setUpMutationObserver(target) {console.info('Setting up observer');clearInterval(checkChat);setTimeout(function() {var updateTarget = document.querySelector('#ChatMainDiv');var observer = new window.MutationObserver(function(mutations) {mutations.forEach(function(mutation) {if(mutation.target.style.visibility === 'visible') {setupAnimations(updateTarget, observer);}});});var config = {attributes: true,attributeOldValue: true};observer.observe(updateTarget, config);observerLive = true;}, 1);}})(formId);}return formId;},

  onGetCaptureValue: function(formMappingId, value, controls) {
    if(formMappingId == 54992) {
      return rebuildBooking();
    }
    // function getFromDataLayer(element) {
    //   var elementValue = '';
    //   for (var ii = 0; ii < dataLayer.length; ii++) {
    //     if (dataLayer[ii][element]) {
    //       elementValue = dataLayer[ii][element];
    //       break;
    //     }
    //   }
    //   return elementValue;
    // }

    function getFromDataLayer(element) {
      var reverseDataLayer = dataLayer.reverse()
      var elementValue = '';
      for(var ii = 0; ii < reverseDataLayer.length; ii++) {
        if(reverseDataLayer[ii][element]) {
          elementValue = reverseDataLayer[ii][element];
          break;
        }
      }
      return elementValue;
    }

    function rebuildBooking() {
      var dataLayer = window.dataLayer;
      generateURL('https://booking.etihad.com/SSW2010/EYEY/webqtrip.html?', parameters)
      var datesArray = getDatesFromDataLayer(),
        flightsArray = getFlights(),
        passengerMap = getPassengers(),
        journeySpan = checkJourneySpan(flightsArray),
        parameters = {},
        months = {
          jan: 1,
          feb: 2,
          mar: 3,
          apr: 4,
          may: 5,
          jun: 6,
          jul: 7,
          aug: 8,
          sep: 9,
          oct: 10,
          nov: 11,
          dec: 12
        },
        baseURL = 'https://booking.etihad.com/SSW2010/EYEY/webqtrip.html?';
      // Generating each attribute.
      parameters = {
        searchType: 'NORMAL', // We only use normal
        departureDate: getFormattedDepartureDate(datesArray),
        returnDate: getFormattedReturnDate(datesArray),
        journeySpan: journeySpan,
        origin: flightsArray[0].split(':')[0], // 3-letter airport code Y   The airport of departure
        destination: flightsArray[0].split(':')[1], //  3-letter airport code Y   The airport of arrival
        origin2: getMulticityAirport(flightsArray, 2, 'origin'), // 3-letter airport code Y   Used for Multicity search
        destination2: getMulticityAirport(flightsArray, 2, 'destination'), // 3-letter airport code Y   Used for Multicity search
        departureDate2: getFormattedMulticityDate(flightsArray, 2), //  YYYY-MM-DD  Y   Used for Multicity search
        origin3: getMulticityAirport(flightsArray, 3, 'origin'), // 3-letter airport code N Used for Multicity search
        destination3: getMulticityAirport(flightsArray, 3, 'destination'), // 3-letter airport code N Used for Multicity search
        departureDate3: getFormattedMulticityDate(flightsArray, 3), //  YYYY-MM-DD  N Used for Multicity search
        origin4: getMulticityAirport(flightsArray, 4, 'origin'), // 3-letter airport code N Used for Multicity search
        destination4: getMulticityAirport(flightsArray, 4, 'destination'), // 3-letter airport code N Used for Multicity search
        departureDate4: getFormattedMulticityDate(flightsArray, 4), //  YYYY-MM-DD  N Used for Multicity search
        origin5: getMulticityAirport(flightsArray, 5, 'origin'), // 3-letter airport code N Used for Multicity search
        destination5: getMulticityAirport(flightsArray, 5, 'destination'), // 3-letter airport code N Used for Multicity search
        departureDate5: getFormattedMulticityDate(flightsArray, 5), //  YYYY-MM-DD  N Used for Multicity search
        origin6: getMulticityAirport(flightsArray, 6, 'origin'), // 3-letter airport code N Used for Multicity search
        destination6: getMulticityAirport(flightsArray, 6, 'destination'), // 3-letter airport code N Used for Multicity search
        departureDate6: getFormattedMulticityDate(flightsArray, 6), //  YYYY-MM-DD  N Used for Multicity search
        alternativeLandingPage: getLandingPage(), //  true  Y Pass alternativeLandingPage=true for IBE to bring traveler to SELECT FLIGHTS PAGE.
        numAdults: passengerMap['ADT'], //  Integer     Y Number of Adult passengers being booked
        numChildren: passengerMap['CHD'], //  Integer     N Number of Child passengers being booked.
        numInfants: passengerMap['INF'], // Integer     N Number of Infant passengers (without seat) being booked.
        lang: getLang(), // Arabic - ar, Language of user (EN is default)
        referrerCode: 'affveinter', //  10-character code Y A code given by the Etihad digital marketing team to the partner.
        //CID: 'affveinter',
        //promoCode: 'affveinter', // 20-character code N A code representing a promotion configured in IBE Deals Manager
        //cabinClass: getCabinClass(),
        //utm_campaign: 'veinteractive',
        //utm_medium: 'veinteractive',
        //utm_source: 'veinteractive',
      }
      //console.info(parameters);
      var valueURL = generateURL(baseURL, parameters);
      //console.info(decodeURI(valueURL));
      return valueURL;

      function getCabinClass() {
        var acceptedClasses = ['ECONOMY', 'BUSINESS', 'FIRST'],
          dataLayerClass = getFromDataLayer('aFlightSearchOD').split(':')[0];
        return(acceptedClasses.indexOf(dataLayerClass) !== -1) ? dataLayerClass : null;
      }

      function getPassengers() {
        var passengers = getFromDataLayer('aFlightSearchPax').split(':'),
          passengerMap = {};
        for(var ii = 0; ii < passengers.length; ii++) {
          passengerMap[passengers[ii].slice(1)] = parseInt(passengers[ii].slice(0, 1));
        }
        return passengerMap;
      }

      function getFlights() {
        return getFromDataLayer('aFlightSearchOD').split(':').slice(1).join(':').split('-');
      }

      function checkJourneySpan(flights) {
        // please note that multicity journeys are not supported and will redirect
        // to a search page.
        if(VEjQuery('.flights-multi').length) {
          return 'MC';
        } // Multicity
        if(flights.length == 2) {
          return 'RT';
        }
        // default to one-way journey.
        return 'OW';
      }

      function dataLayerExists() {
        return !!dataLayer.length
      }

      function generateFromFlightTripDates() {
        var dates, yearArray = [];
        dates = getFromDataLayer('FlightTripDates').split(':');
        VEjQuery.each(dates, function(index, date) {
          var year, month, day;
          year = date.slice(0, 4);
          month = date.slice(4, 6);
          day = date.slice(6);
          yearArray.push(day + '/' + month + '/' + year);
        });
        return yearArray;
      }

      function getDatesFromDataLayer() {
        var dates;
        if(!dataLayerExists()) {
          return;
        }
        return dates = generateFromFlightTripDates() || getFromDataLayer('aFlightSearchDepartReturn').split(':');
      }
      // This formatDate is very specific to Etihad and would need major refactoring
      // for other use cases.

      function formatDate(date, splitBy) {
        if(!splitBy) {
          splitBy = '/';
        }
        return date.split('/').reverse().join('-');
      }

      function getFormattedDepartureDate(dates) {
        return formatDate(dates[0]);
      }

      function getFormattedReturnDate(dates) {
        if(journeySpan !== 'RT') {
          return null;
        } // will filter out by null when creating the URL
        return formatDate(dates[1]);
      }
      // journeyPart is used to specify whether it is an origin or a destination.

      function getMulticityAirport(flights, step, journeyPart) {
        if(journeySpan !== 'MC' || step > flights.length) {
          return null;
        }
        // to make the api easier just specify the journey step and
        step -= 1;
        journeyPart = journeyPart == 'origin' ? 0 : 1;
        return flights[step].split(':')[journeyPart];
      }

      function getFormattedMulticityDate(flights, step) {
        if(journeySpan !== 'MC' || step > flights.length) {
          return null;
        }
        step -= 1;
        var unformattedDate = VEjQuery('[id=date' + step + ']').attr('value');
        var date = unformattedDate.split(' ');
        date[1] = months[date[1].toLowerCase()].toString();
        date[1] = date[1].length == 1 ? '0' + date[1] : date[1];
        return date.reverse().join('-')
      }

      function getLandingPage() {
        // if (journeySpan === 'MC') { return null }
        return true
      }

      function getLang() {
        return getFromDataLayer('aSiteEdition').slice(0, 2) || null;
      }

      function generateURL(url, parameters) {
        for(key in parameters) {
          if(parameters[key] == null) {
            continue;
          }
          url = url + '&' + key + '=' + parameters[key];
        }
        //console.info('The code fires here:', url);
        return encodeURIComponent(url);
      }
    }
    
    
    // Previous Code
    if(formMappingId == 45365) {
      value = '';
      if(checkFlightSelected() === true) {
        var classValues = [];
        var flightValues = [];
        initValueArrays(classValues, flightValues, checkReturn());
        if(checkFlightValues(flightValues)) {
          value = 'https://imagesuk.veinteractive.com/CE7A71B2-5A3C-4270-A7FF-1E5D72314713/uk2014/CustomJSBanners/';
          switch(getClass(classValues)) {
            case 'Economy':
              var img = 'Economy1.jpg';
              break;
            case 'First':
              var img = 'First1.jpg';
              break;
            case 'Business':
              var img = 'Business1.jpg';
              break;
            case 'Residence':
              var img = 'Residence1.jpg';
              break;
            default:
              var img = 'Economy1.jpg';
              break;
          }
          value = value.concat(img);
        }
      }
    }
    
    
    /** Proactive Criteria Filter FormMapping
     *
     * Look at ticket #65294 - returns the language identifier for use
     * Possible values are:
     * ar_AE, zh_CN, nl_NL, fr_FR, de_DE, el_GR, it_IT, ja_JP,
     * ko_KR, pt_BR, ru_RU, es_ES, th_TH, tr_TR,
     * en_GB,
     * en_BG_LHR,
     * en_BG_AUH,
     * Passenger_en_BG,
     * Passenger_en_BG_LHR,
     * Passenger_en_BG_AUH,
     * en_BG_AU  *for australian sale
     *
     */

    if(formMappingId == 83081) {
      
      // Return this line.
      var pageCheck = VEjQuery('#customhtmlHajjAdvisory span').text();
      var langCheck = VEjQuery('#select-language option:selected').val();

      var agentCheckDestination = getFromDataLayer('aProductFlight').split(':').slice(2).join(':').split('-')[0].split(':').slice(-1)[0] || getFromDataLayer('aFlightSearchOD').split(':').slice(1).join(':').split('-')[0].split(':')[1];
      var agentCheckOrigin = getFromDataLayer('aProductFlight').split(':').slice(2).join(':').split('-')[0].split(':')[0] || getFromDataLayer('aFlightSearchOD').split(':').slice(1).join(':').split('-')[0].split(':')[0];

      var agentCheckClass = VEjQuery('.cart_itinerariesDetails_itinerary:first > ol > li > span:first span').text().toLowerCase().trim();
      if(agentCheckClass.indexOf('the residence') >= 0){agentCheckClass='ClassTR';}
      else if(agentCheckClass.indexOf('first') >= 0){agentCheckClass='ClassF';}
      else if(agentCheckClass.indexOf('business') >= 0){agentCheckClass='ClassB';}
      else if(agentCheckClass.indexOf('economy') >= 0){agentCheckClass='ClassE';}
      else{agentCheckClass='ClassNOT';}

      // Check if origin is from Australia

      if( agentCheckOrigin==='BNE' || agentCheckOrigin==='MEL' || agentCheckOrigin==='PER' || agentCheckOrigin==='SYD' ){
        agentCheckOrigin = 'AU';
      }

      // Passenger page
      if(VEjQuery('.stepCurrent#step-4').length) {

        if( agentCheckOrigin === 'AU' && ( agentCheckClass === 'ClassE' || agentCheckClass === 'ClassB' ) ){
          
          value = langCheck + '_AU';

        }
        else if( agentCheckOrigin != 'AU' && agentCheckDestination === 'LHR' && ( agentCheckClass === 'ClassF' || agentCheckClass === 'ClassB' ) ){
          
          value = 'Passenger_' + langCheck + '_LHR';

        }
        else if( agentCheckOrigin != 'AU' && agentCheckDestination === 'AUH' && ( agentCheckClass === 'ClassF' || agentCheckClass === 'ClassB' ) ){

          value = 'Passenger_' + langCheck + '_AUH';

        }
        else {

          value = 'Passenger_' + langCheck; // set the value to be

        }
      }

      // Flight search page
      if(pageCheck && pageCheck.length && langCheck) {

        if( agentCheckOrigin === 'AU' && ( agentCheckClass === 'ClassE' || agentCheckClass === 'ClassB' ) ){
          
          value = langCheck + '_AU';

        }
        else if( agentCheckOrigin !== 'AU' && agentCheckDestination === 'LHR' && ( agentCheckClass === 'ClassF' || agentCheckClass === 'ClassB' ) ){
          
          value = langCheck + '_LHR';

        }
        else if( agentCheckOrigin !== 'AU' && agentCheckDestination === 'AUH' && ( agentCheckClass === 'ClassF' || agentCheckClass === 'ClassB' ) ){

          value = langCheck + '_AUH';

        }
        else {

          value = langCheck; // set the value to be

        } 

      }
    }
    
    
    return value;

    
    
    
    function checkFlightValues(flightValues) {
      //returns true if flight is found
      for(i = 0; i < flightValues.length; i++) {
        var arrVal = flightValues[i];
        if(arrVal.indexOf("EY11") > -1 || arrVal.indexOf("EY12") > -1) {
          return true;
        }
      }
      return true;
    }

    function initValueArrays(classValues, flightValues, isReturn) {
      classValues.push(document.getElementById('cart_leg_0_fare-family-name').innerHTML);
      flightValues.push(document.getElementById('cart_leg_0_number').innerHTML);
      if(isReturn) {
        classValues.push(document.getElementById('cart_leg_1_fare-family-name').innerHTML);
        flightValues.push(document.getElementById('cart_leg_1_number').innerHTML);
      }
    }

    function checkFlightSelected() {
      //returns true if an Outbound flight is selected
      var result = false;
      result = (document.getElementById('cart_leg_0_no-flight') == null && document.getElementById('cart_leg_1_no-flight') == null);
      return result;
    }

    function checkReturn() {
      //returns true if Return flight is selected
      var result = false;
      result = document.getElementById('cart_leg_1') !== null;
      return result;
    }

    function getClass(classValues) {
      //returns a string of class
      var CResult = '';
      var CVal = 0;
      for(i = 0; i < classValues.length; i++) {
        var ArrVal = classValues[i];
        if(ArrVal.indexOf('Residence') > -1) {
          CResult = 'Residence';
          CVal = 4;
        } else if(ArrVal.indexOf('Business') > -1) {
          if(CVal < 3) {
            CResult = 'Business';
            CVal = 3;
          }
        } else if(ArrVal.indexOf('First') > -1) {
          if(CVal < 2) {
            CResult = 'First';
            CVal = 2;
          }
        } else if(ArrVal.indexOf('Economy') > -1) {
          if(CVal < 1) {
            CResult = 'Economy';
            CVal = 1;
          }
        }
      }
      return CResult;
    }
  }
},

                /*
                 * Criteria filters that are setup by tech team. The types of Criteria filters possible are:
                 *       * Personality - The matching of this criteria filters will defined the personality that the chat will have
                 *       * Variation
                 */
                criteriaFilters: {},

                /*
                 * All the apps that Ve Interactive has with the events
                 */
                apps: [
  {
    name: "Chat",
    exit: true,
    inactivity: false,
    backButton: true,
    load: false,
    enabled: true
  }
]
            };
        if (!tag) {

            // Send the request in order to create the cookie session
            if (d.settings.cookie && d.settings.cookie.enabled) {
                var xdr = null;
                if (window.XMLHttpRequest) {
                    xdr = new XMLHttpRequest();
                }

                if (xdr !== null) {
                    var url = d.chatServicesUrl.split('/')[0] + // Getting the rcs URL
                                '/DataReceiverService.asmx/SessionInit?journeyCode=a4744012-dfdd-4cec-8fa0-3840fd30a461&timeToLive=' +
                                (d.settings.cookie.timeToLive ? d.settings.cookie.timeToLive : 60); // either the time exist either we use the default time (minutes)

                    xdr.open("GET", location.protocol + "//" + url);
                    xdr.withCredentials = true;
                    xdr.send();
                }
            }


            // Adding the Capture-apps file to the DOM
            tag = document.createElement('script');
            tag.type = 'text/javascript';
            tag.id = 'veConnect';
            tag.async = true;
            tag.src = window.location.protocol + d.veHostDomain +'/scripts/3.0/capture-apps-3.0.3.js';
            b = document.getElementsByTagName('script')[0];
            b.parentNode.insertBefore(tag, b);
        }
        return d;
    })();
};
