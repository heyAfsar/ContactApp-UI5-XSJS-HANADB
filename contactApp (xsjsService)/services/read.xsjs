function getDataFromTable() {
	var connection = $.db.getConnection();
	var rs;
	var query;
	try {
		query = 'SELECT * FROM \"contactApp.database::contactDB\"';
		var oStatement = connection.prepareStatement(query);
		rs = oStatement.executeQuery();
		var resultArray = [];
		while (rs.next()) {
			var record = {};
			record.name = rs.getString(1);
			record.phone = rs.getString(2);
			resultArray.push(record);
		}

		var body = JSON.stringify(resultArray);
		$.response.contentType = 'application/json';
		$.response.setBody(body);
		$.response.status = $.net.http.OK;
		rs.close();
		connection.close();
	} catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		$.response.setBody(e.message);
		return;
	}
}
getDataFromTable();