const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const customerSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		address: String,
		phone: String,
		email: String,
		description: String,
		age: Number,
		image: String,
		secretCustomer: Boolean,
	},
	{
		timestamps: true,
		statics: {
			findByHoiDanIT(name) {
				return this.find({ name: new RegExp(name, 'i') });
			},
		},
	}
);

// Override all methods
customerSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

//Middleware check secretCustomer and skip it if secretCustomer is true first when return result for client
customerSchema.pre(/^find/, function (next) {
	this.find({ secretCustomer: { $ne: true } });
	next();
});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
