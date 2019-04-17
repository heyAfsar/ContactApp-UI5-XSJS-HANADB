function updateRecord() {
	try{
	var body = {
		response : ''
	};
	var sData = $.request.body.asString();
    var oJson = JSON.parse(sData);
	var squery = 'UPDATE \"contactApp.database::contactDB\" set "Name" = ?, "Phone" = ? where "Phone" = ?';
	var connection = $.db.getConnection();
	var st = connection.prepareStatement(squery);
	st.setString(1, oJson.Name);
	st.setString(2, oJson.Phone);
	st.setString(3, oJson.oldPhone);
	
	st.execute();
	connection.commit();
	connection.close();
    body.response = "Data Modified";
    }catch(e){
        $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		$.response.setBody(e.message);
		return; 
    }
    $.response.setBody(JSON.stringify(body));
    $.response.status = $.net.http.OK;
    $.response.contentType = " application/json ";
}
updateRecord();