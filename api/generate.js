const { freemem } = require("os");

module.exports = function(){
    var faker = require("faker");
    var _ = require("lodash");
    return {
         vendors: _.times(10, function (n)
         {
            return{
                id: n,
                name: faker.name.findName(),
                avatar: faker.image.food(),
                city: faker.address.city(),
                location: faker.address.streetName(),
                address: faker.address.streetAddress(),
                delivery_time: '20-35 min',
                favouite: false,
                category: faker.random.objectElement(),
                delivery: 'free Delivery',
                open: true,
                comments: faker.random.number(),
                rating: '3.1'
            }
         }) 
    }
}