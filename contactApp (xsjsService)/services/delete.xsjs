function deleteRecord() {
	try {
		var body = {
			response: ''
		};
		var sData = $.request.body.asString();
		var oJson = JSON.parse(sData);
		//var squery = 'DELETE FROM \"contactApp.database::contactDB\" WHERE \"Phone\" = ?';
		
		var squery = 'DELETE FROM \"contactApp.database::contactDB\" WHERE \"Phone\" IN (';
		var jj = 1;
		for(var i in oJson.Phone){
		    if(i==0){
		    squery = squery.concat("?");
		    }else{
		        squery = squery.concat(",?");
		    } 
		}
		squery = squery.concat(")");
		
		var connection = $.db.getConnection();
		var st = connection.prepareStatement(squery);
		//st.setString(1, oJson.Phone);
		
		for(var j in oJson.Phone){
		    st.setString(jj, oJson.Phone[j]); 
		    jj++;
		}
		
		var count = st.executeUpdate();
		connection.commit();
		connection.close();
		if (count >= 1) {
			body.response = "Success";
		} else{
			body.response = count;
		}
	} catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		$.response.setBody(e.message);
		return;
	}
	$.response.setBody(JSON.stringify(body));
	$.response.status = $.net.http.OK;
	$.response.contentType = " application/json ";
}
deleteRecord();