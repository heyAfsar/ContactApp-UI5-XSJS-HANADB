sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function (JSONModel, Device) {
	"use strict";

	return {

		createDeviceModel: function () {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},

		getMockData: function () {
			return new sap.ui.model.json.JSONModel([{
				"name": "Afsar",
				"phoneNumber": "+918969167978"
			}, {
				"name": "JD",
				"phoneNumber": "+918292613515"
			}, {
				"name": "Arjun",
				"phoneNumber": "1234509876"
			}, {
				"name": "Sumeet",
				"phoneNumber": "6789054321"
			}, {
				"name": "Teja",
				"phoneNumber": "0987654321"
			}, {
				"name": "Kiddo",
				"phoneNumber": "1234567890"
			}]);
		}

	};
});