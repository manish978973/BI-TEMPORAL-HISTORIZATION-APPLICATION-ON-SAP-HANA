sap.ui.controller("content.Welcome2", {
// controller logic goes here
onInit: function() {
    
    // first, we have to define the odata model
var dataModel = new sap.ui.model.odata.ODataModel(
"models/GBI.xsodata"
);
// after that, we can bind the odata model the
// SalesOrders view, so controls within the view can use them
this.getView().setModel(dataModel);
// this function is called when the view is instantiated.
// Used to modify the view before displaying
},
onExit: function() {
// this function is called when the view is destroyed.
// Used for clean-up activities
},
onAfterRendering: function() {
// this function is called when the view has been rendered.
// Used for post-rendering manipulation of the HTML code
},
onBeforeRendering: function() {
// this function is called before the view is re-rendered // (not before first rendering)
},

onFilterInvoices : function (oEvent) {

			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new sap.ui.model.Filter("PERSON_NAME", sap.ui.model.FilterOperator.Contains, sQuery));
			//	aFilter.push(new sap.ui.model.Filter("CITY", sap.ui.model.FilterOperator.Contains, sQuery));
			}

			// filter binding
			var oList = this.getView().byId("historyTable10");
			var oBinding = oList.getBinding("rows");
			oBinding.filter(aFilter);
		},
// this function updates the details panel
	clearAllFilters : function() {
			var oTable = this.byId("historyTable10");


			var aColumns = oTable.getColumns();
			for (var i = 0; i < aColumns.length; i++) {
				oTable.filter(aColumns[i], null);
			}
		}

});