const passport = require("passport");

class Jwt {
    auth = (req, res, next) => {
        const data = passport.authenticate("jwt", { session: false })(
            req,
            res,
            next
        );
        return data;
    };
}

module.exports = new Jwt();
