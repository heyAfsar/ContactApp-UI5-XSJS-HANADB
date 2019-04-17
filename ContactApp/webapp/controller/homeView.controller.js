sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/sap/ContactApp/ContactApp/model/models",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageToast",
	"sap/m/Dialog"
], function (Controller, models, Filter, FilterOperator, MessageToast, Dialog) {
	"use strict";

	return Controller.extend("com.sap.ContactApp.ContactApp.controller.homeView", {
		onInit: function () {

			this.mockModel = models.getMockData();
			this.getView().setModel(this.mockModel, "mockModel");
			this.refreshTable();

			var oView = this.getView();
			oView.setModel(new sap.ui.model.json.JSONModel({
				globalFilter: "",
				availabilityFilterOn: false,
				cellFilterOn: false
			}), "ui");

			this._oGlobalFilter = null;
			this._oPriceFilter = null;
		},
		count: function (oValue) {
			//return this.getView().getModel("mockModel").oData.length;
			return oValue.length;
		},
		////////////////refresh Table/////////////
		refreshTable: function (oEvent) {
			var that = this;
			var user = "SYSTEM";
			var pw = "Qwertyuiop!234567890";
			//updating the model
			$.ajax({
				url: "/backendService/contactApp/services/read.xsjs",
				method: "GET",
				async: false,
				dateType: "json",
				headers: {
					'Accept': 'application/json',
					'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
				},
				success: function (res) {
					that.getView().getModel("mockModel").setData(res);
				},
				error: function (err) {

				}
			});

		},
		////////////////Add popup & functionality////////////////
		onAdd: function (oEvent) {
			if (this.pressAdd) {
				this._OhandleAdd();
			}
			//var oObject = oEvent.getSource().getParent().getBindingContext("regionList").getObject();
			if (!this.pressAdd) {
				this.pressAdd = sap.ui.xmlfragment("com.sap.ContactApp.ContactApp..view.add", this);
				this.getView().addDependent(this.pressAdd);
				//sap.ui.getCore().byId("popup").setProperty("title", "Add");
			}
			sap.ui.getCore().byId("nameAdd").setValue("");
			sap.ui.getCore().byId("contactAdd").setValue("");
			this.pressAdd.open();
		},

		/*Triggered on click of cancel in edit window*/
		onCancelAdd: function (oEvent) {
			this._OhandleAdd();
		},

		/*Saves the updated UserTPP through put ajax call*/
		onSaveAdd: function (oEvent) {
			//sap.ui.getCore().byId("stcode").setValue(oObject.stCode);
			//sap.ui.getCore().byId("usertpp").setValue(oObject);
			var that = this;
			var user = "SYSTEM";
			var pw = "Qwertyuiop!234567890";
			var d = {};
			this.name = sap.ui.getCore().byId("nameAdd").getValue();
			this.phone = sap.ui.getCore().byId("contactAdd").getValue();
			d.Name = this.name;
			d.Phone = this.phone;
			d = JSON.stringify(d);
			$.ajax({
				//	url: "/destinations/xsjsbackendService"+"/insert.xsjs?param1="+student_id+"&param2='"+student_Name+"'&param3="+semester+"&param4='"+CGPA,
				//	url: "/xsjsbackendService/students_info/services/insert.xsjs?param1="+student_id+"&param2='"+student_Name+"'&param3="+semester+"&param4='"+CGPA,
				url: "/backendService/contactApp/services/insert.xsjs",

				/*	beforeSend: function (xhr) {
						xhr.setRequestHeader("Authorization", "Basic " + btoa("SYSTEM" + ":" + "2012Meghana,,,,"));
					},*/
				data: d,
				method: "POST",
				async: false,
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",

				headers: {
					'Accept': 'application/json',
					'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
					
				},
				dateType: "json",
				success: function (data) {
					MessageToast.show("Record Inserted");
					//updating the model
					that.refreshTable();

				},
				error: function (err) {
					MessageToast.show("Error");
				}
			});
			this._OhandleAdd();

		},

		_OhandleAdd: function () {
			//sap.ui.getCore().byId("usertpp").setValue("");
			//sap.ui.getCore().byId("CB1").setSelectedKey("");
			this.pressAdd.close();
		},

		////////////////edit popup & functionality////////////////
		onEdit: function (oEvent) {

			if (this.pressEdit) {
				this._OhandleEdit();
			}
			//var oObject = oEvent.getSource().getParent().getBindingContext("regionList").getObject();
			if (!this.pressEdit) {
				this.pressEdit = sap.ui.xmlfragment("com.sap.ContactApp.ContactApp..view.edit", this);
				this.getView().addDependent(this.pressEdit);
				//sap.ui.getCore().byId("popup").setProperty("title", "Edit");
			}
			this.pressEdit.open();

			this.name = oEvent.getSource().getParent().getCells()[0].getText();
			this.phone = oEvent.getSource().getParent().getCells()[1].getText();
			sap.ui.getCore().byId("name").setValue(this.name);
			sap.ui.getCore().byId("contact").setValue(this.phone);
		},

		/*Triggered on click of cancel in edit window*/
		onCancelEdit: function (oEvent) {
			this._OhandleEdit();
		},

		/*Saves the updated UserTPP through put ajax call*/
		onSaveEdit: function (oEvent) {
			//sap.ui.getCore().byId("stcode").setValue(oObject.stCode);
			//sap.ui.getCore().byId("usertpp").setValue(oObject);
			var that = this;
			var user = "SYSTEM";
			var pw = "Qwertyuiop!234567890";
			var d = {};
			this.name = sap.ui.getCore().byId("name").getValue();
			this.oldPhone = this.phone;
			this.phone = sap.ui.getCore().byId("contact").getValue();
			d.Name = this.name;
			d.Phone = this.phone;
			d.oldPhone = this.oldPhone;
			d = JSON.stringify(d);
			$.ajax({
				url: "/backendService/contactApp/services/update.xsjs",
				data: d,
				method: "POST",
				async: false,
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",

				headers: {
					'Accept': 'application/json',
					'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
					
				},
				dateType: "json",
				success: function (data) {
					MessageToast.show("Record Updated");
					//updating the model
					that.refreshTable();

				},
				error: function (err) {
					MessageToast.show("Error");
				}
			});
			this._OhandleEdit();

		},
		_OhandleEdit: function () {
			//sap.ui.getCore().byId("usertpp").setValue("");
			//sap.ui.getCore().byId("CB1").setSelectedKey("");
			this.pressEdit.close();
		},

		///////////////////delete//////////////////////////
		onApproveDialog: function (oEvent, obj) {
			var that = this;
			var data = {
				"Phone": []
			};
			if (oEvent == null) {
				this.phone = data = obj;
			} else {
				this.phone = oEvent.getSource().getParent().getCells()[1].getText();
				data.Phone.push(this.phone);
			}
			var dialog = new Dialog({
				title: 'Confirm',
				type: 'Message',
				content: new sap.m.Text({
					text: 'Are you sure you want to Delete This Contact'
				}),
				beginButton: new sap.m.Button({
					text: 'Damn Sure',
					press: function () {
						that.onDelete(data);
						dialog.close();
					}
				}),
				endButton: new sap.m.Button({
					text: 'Nope',
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function () {
					dialog.destroy();
				}
			});

			dialog.open();
		},
		onDelete: function (data) {
			//sap.ui.getCore().byId("stcode").setValue(oObject.stCode);
			//sap.ui.getCore().byId("usertpp").setValue(oObject);
			var that = this;
			var user = "SYSTEM";
			var pw = "Qwertyuiop!234567890";
			//var d = {"Phone":[]};
			//this.phone = oEvent.getSource().getParent().getCells()[1].getText();
			//d.Name = this.name;
			//d.Phone.push(this.phone);
			//d.oldPhone = this.phone;
			var d = JSON.stringify(data);
			$.ajax({
				url: "/backendService/contactApp/services/delete.xsjs",
				data: d,
				method: "POST",
				async: false,
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",

				headers: {
					'Accept': 'application/json',
					'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
					
				},
				dateType: "json",
				success: function (data) {
					MessageToast.show("Record Deleted");
					//updating the model
					that.refreshTable();
					that.getView().byId("contactTable").clearSelection();
				},
				error: function (err) {
					MessageToast.show("Error");
				}
			});

		},

		//global search
		filterGlobally: function (oEvent) {
			var z = oEvent.getSource().sId;
			this.curTable = sap.ui.getCore().byId(z).getParent().getParent().sId;
			var sQuery = oEvent.getParameter("query");
			this._oGlobalFilter = null;

			if (sQuery) {
				this._oGlobalFilter = new Filter([
					new Filter("name", FilterOperator.Contains, sQuery),
					new Filter("phoneNumber", FilterOperator.Contains, sQuery),
				], false);
			}

			this._filter();
			//this.resetItems();
		},
		multiDelete: function (oEvent) {
			var selectedIndex = oEvent.getSource().getParent().getParent().getSelectedIndices();
			var data = {
				"Phone": []
			};
			for (var i in selectedIndex) {
				var obj = {};
				var row = oEvent.getSource().getParent().getParent().getRows()[selectedIndex[i]];
				// obj.Name = row.getCells()[0].getText();
				// obj.Phone = row.getCells()[1].getText();
				data.Phone.push(row.getCells()[1].getText());
				//data.push(obj);
			}
			this.onApproveDialog(null, data);

		},

		//clear all filters
		clearAllFilters: function (oEvent) {
			var z = oEvent.getSource().sId;
			this.curTable = sap.ui.getCore().byId(z).getParent().getParent().sId;
			var oTable = sap.ui.getCore().byId(this.curTable); //this.byId(this.curTable);

			var oUiModel = this.getView().getModel("ui");
			oUiModel.setProperty("/globalFilter", "");
			oUiModel.setProperty("/availabilityFilterOn", false);

			this._oGlobalFilter = null;
			this._oPriceFilter = null;
			this._filter();

			var aColumns = oTable.getColumns();
			for (var i = 0; i < aColumns.length; i++) {
				oTable.filter(aColumns[i], null);
			}
			this.getView().byId("search").setValue("");
			//this.resetItems();
		},

		//actual filtering of content in the table
		_filter: function () {
			var oFilter = null;
			var oTable = this.curTable;
			if (this._oGlobalFilter && this._oPriceFilter) {
				oFilter = new sap.ui.model.Filter([this._oGlobalFilter, this._oPriceFilter], true);
			} else if (this._oGlobalFilter) {
				oFilter = this._oGlobalFilter;
			} else if (this._oPriceFilter) {
				oFilter = this._oPriceFilter;
			}

			sap.ui.getCore().byId(oTable).getBinding("rows").filter(oFilter, "Application");
			//this.resetItems();
		},
	});
});