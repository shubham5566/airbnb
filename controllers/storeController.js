const Favourite = require("../models/Favoutire");
const Home = require("./../models/Home");

exports.getIndex = (req, res, next) => {
  Home.fetchAll().then(([registeredHomes]) => {
    res.render("store/index", { homes: registeredHomes, pageTitle: "airbnb" });
  });
};
exports.getHomes = (req, res, next) => {
  Home.fetchAll().then(([registeredHomes]) => {
    res.render("store/homes", { homes: registeredHomes, pageTitle: "airbnb" });
  });
};


exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId ).then(([homes]) => {
    const home = homes[0]
    if(!home){
      console.log('home not Found')
      res.redirect('/homes')
    }
    console.log("this is the home datails page" ,homeId,home);
    res.render("store/home-details",{ home:home,pageTitle: "airbnb"});
  })
};

// exports.getFavourites = (req, res, next) => {
//   Home.fetchAll(registeredHomes => {
//     res.render("store/favourites", { homes: registeredHomes, pageTitle: "favourites" });
//   });
// };
exports.getFavourites = (req, res, next) => {
  Favourite.fetchAll(favouriteIds => {
    Home.fetchAll().then(([registeredHomes]) => {
      const favouriteHomes = registeredHomes.filter(home => favouriteIds.includes(home.id));
      res.render("store/favourites", { homes: favouriteHomes, pageTitle: "Favourites" });
    });
  })

};
// exports.postFavourites = (req, res, next) => {
//  console.log("came to add fav",req.body);
//  const homeId =req.body
//  res.redirect("/favourites")
// };

exports.postAddFavourites = (req, res, next) => {
  const homeId = req.body.id;
  Favourite.addToFavourites(homeId, error => {
    if (error) {
      console.log("Error while adding to favourites", error);
    }
    res.redirect("/favourites");
  })
};
exports.postRemoveFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId, error => {
    if (error) {
      console.log('Error while remove from favourites ', error);
    }
    res.redirect("/favourites");
  })
}