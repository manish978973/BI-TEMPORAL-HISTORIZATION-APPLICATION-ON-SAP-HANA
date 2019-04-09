sap.ui.controller("content.FileUpload", {

    onUpload : function(a) {
	
	var fU = this.getView().byId("idfileUploader");
	var domRef = fU.getFocusDomRef();
	var file = domRef.files[0];
	
	
	// Create a File Reader object
	var reader = new FileReader();
	var t = this;
	
	reader.onload = function(e) {
	    var strCSV = e.target.result;
	    var arrCSV = strCSV.match(/[\w .]+(?=,?)/g);
	    var noOfCols = 5;

	    // To ignore the first row which is header
	    var hdrRow = arrCSV.splice(0, noOfCols);

	    var data = [];
	    while (arrCSV.length > 0) {
		var obj = {};
		// extract remaining rows one by one
		var row = arrCSV.splice(0, noOfCols);
		for (var i = 0; i < row.length; i++) {
		    obj[hdrRow[i]] = row[i].trim();
		}
		// push row to an array
		data.push(obj);
	    }
	    
	    // Bind the data to the Table
	    var oModel = new sap.ui.model.json.JSONModel();
	    oModel.setData(data);
	    var oTable = t.byId("idTable");
	    oTable.setModel(oModel);
	};
	reader.readAsBinaryString(file);
    }
});