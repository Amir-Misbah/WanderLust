const Listing = require("./models/listing");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema ,reviewSchema} = require("./schema.js");
const Review = require("./models/review.js");



module.exports.isLoggedIn = (req,res,next) =>{
  console.log(req.user);
     if(!req.isAuthenticated()){ 
      req.session.redirectUrl  = req.originalUrl;
        req.flash("error" ,"you must be logged in to create new listing");
        return res.redirect("/login");
      }
      next();
}


// so what happnes is when we successfully login passport resets the value fo the req.session.redirectUrl so how to get it back
// is done by putting it in locals so passport doesnt have authorization to delete it 
// its implementd as 


module.exports.saveRedirectUrl = (req,res,next) =>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};
module.exports.isOwner = async (req,res,next ) =>{
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if(!listing.owner._id.equals(res.locals.currUser._id)){
    req.flash("error","You dont have permission to edit");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports.validateListing =async (req,res,next) =>{
  let {error} = listingSchema.validate(req.body);
  if(error){
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400,errMsg);
  }else{
    next();
  }
};
module.exports.validateReview = (req,res,next) =>{
  let {error} = reviewSchema.validate(req.body);
  if(error){
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400,errMsg);
  }else{
    next();
  }
};
module.exports.isReviewAuthor = async (req,res,next ) =>{
  let {id , reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if(!review.author._id.equals(res.locals.currUser._id)){
    req.flash("error","You dont have permission to edit");
    return res.redirect(`/listings/${id}`);
  }
  next();
};
