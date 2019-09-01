const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
module.exports = mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-gbcth.mongodb.net/omnistack8?retryWrites=true&w=majority', { useNewUrlParser: true });
