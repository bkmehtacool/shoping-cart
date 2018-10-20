var Product = require('../models/product');

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/shoping", { useNewUrlParser: true });


var products = [
     new Product({
          imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
          title: 'Gothic Video Game',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          price: 30
     }),
     new Product({
          imagePath: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5807/5807901_sd.jpg;maxHeight=640;maxWidth=550',
          title: 'Destiny 2',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          price: 234
     }),
     new Product({
          imagePath: 'https://upload.wikimedia.org/wikipedia/en/2/20/StarCraft_II_-_Box_Art.jpg',
          title: 'StarCraft II: Wings of Liberty',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          price: 200
     }),
     new Product({
          imagePath: 'https://vignette.wikia.nocookie.net/bioshock/images/8/8e/BioShock_box.png/revision/latest?cb=20100425082949',
          title: 'BioShock',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          price: 125
     }),
     new Product({
          imagePath: 'https://www.kichukkhon.com/content/images/thumbs/0000881_counter-strike-global-offensive_450.jpeg',
          title: 'Counter-Strike: Global Offensive',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          price: 110
     }),
     new Product({
          imagePath: 'https://redir-img20.allegroimg.com/photos/oryginal/70/60/59/42/7060594279',
          title: 'World of Warcraft',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          price: 60
     }),
];







var done = 0;
for (var i = 0; i < products.length; i++) {
     products[i].save(function(err,result){
          done++;
          if(done === products.length){
               exit();
          }
     });
}

function exit(){
     mongoose.disconnect();
}
