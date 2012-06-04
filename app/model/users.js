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
	},
  'admin' : {
    login: 'admin',
    password: 'admin',
    role: 'admin'
  },
  'lewis' : {
  	login: 'lewis',
  	password : 'lewis',
  	role: 'admin'
  },
  'ben' : {
  	login: 'ben',
  	password : 'ben',
  	role: 'admin'
  },
  'steve' : {
  	login: 'steve',
  	password : 'steve',
  	role: 'admin'
  }
}

module.exports.authenticate = function(login, password, callback) {
	var user = users[login];
	if (!!user && user.password === password) {
		callback(user);
	} else {
		callback(null);
	}
	return;
}
