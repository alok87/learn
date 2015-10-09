var eventsNamesToUpdateModel = ['ajax-finished-flc-dateChanged', 'ajax-finished-flc-sortFlights', 'ajax-finished-flc-getAdvisors', 'ajax-finished-cart-checkPrice'];

YUI.add('wl-custom_script-scc_air_select_page_flc', function(Y) {

    for ( var i = 0, size = eventsNamesToUpdateModel.length; i < size; i++) {
        EventBusAPI.registerHandler(eventsNamesToUpdateModel[i], updateModelHandler);
    }

    function updateModelHandler() {
        var components = Y.components || [];
        for ( var componentName in components) {
            var component = components[componentName];
            if (typeof component === 'function') {
                try {
                    var context = component.prototype.context || {};
                    var id = context.getId();
                    var model = context.initData;

                    if (id && model) {
                        WhiteLabel.setComponentModel(id, model);
                    }
                } catch (e) {
                    Y.log('Unsuccessful model update attempt for \'' + componentName + '\' ' + (e.message || e.description || e), 'warn');
                }
            }
        }
    }

});
var scriptAirSelectPageFlc = function() {
};