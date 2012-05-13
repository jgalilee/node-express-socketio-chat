var users = {
	'jgalilee' : {
		login: 'jgalilee',
		password: 'password',
		role: 'admin'
	},
	'dgalilee' : {
		login: 'dgalilee',
		password: 'password',
		role: 'admin'
	}
}

module.exports.authenticate = function(login, password, callback) {
	var user = users[login];
	if(!!user && user.password == password) {
		callback(user);
	} else {
		callback(null);
	}
	return;
}