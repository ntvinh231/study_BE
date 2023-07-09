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

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
