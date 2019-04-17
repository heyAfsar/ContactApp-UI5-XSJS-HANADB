function addDataToTable() {
	try {
		var body = {
			response: ''
		};
		var sData = $.request.body.asString();
		var oJson = JSON.parse(sData);
		var squery = 'INSERT INTO \"contactApp.database::contactDB\" VALUES (?,?)';
		var connection = $.db.getConnection();
		//  connection.execute(squery,oJson.SenderId,oJson.Name,oJson.TotalAmount);
		var st = connection.prepareStatement(squery);
		st.setString(1, oJson.Name);
		st.setString(2, oJson.Phone);
		st.execute();
		connection.commit();
		connection.close();
		body.response = "Success";
	} catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		$.response.setBody(e.message);
		return;
	}
	$.response.setBody(JSON.stringify(body));
	$.response.status = $.net.http.OK;
	$.response.contentType = " application/json ";
}
addDataToTable();


