const passport = require("passport");
const passportJwt = require("passport-jwt");
const UserService = require("../src/services/UserService");
const crypto = require("crypto");

const PassportLocal = require("passport-local");
const { JWT_SECRET } = require("./hiddenConfig");
const JWTStrategy = passportJwt.Strategy;
const ExtractJWT = passportJwt.ExtractJwt;

class Passport {
    verifyCallback = (payload, done) => {
        return UserService.getUser(payload.id)
            .then((user) => {
                return done(null, user);
            })
            .catch((error) => {
                return done(error);
            });
    };
    passport = () => {
        passport.use(
            new PassportLocal.Strategy(
                {
                    usernameField: "email",
                },
                async (email, password, done) => {
                    try {
                        const user = await UserService.getUserByEmail(email);

                        const cryptoPass = crypto
                            .pbkdf2Sync(password, "", 1000, 64, "sha512")
                            .toString("hex");

                        if (user.length && cryptoPass === user[0].password) {
                            done(null, user[0]);
                        } else {
                            done(null, false);
                        }
                    } catch (error) {
                        done(error);
                    }
                }
            )
        );
        const config = {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: JWT_SECRET,
        };
        passport.use(new JWTStrategy(config, this.verifyCallback));
    };
}

module.exports = new Passport();
