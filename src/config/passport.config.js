import passport from "passport";
import GitHubStrategy from "passport-github2";
import local from "passport-local";
import { createHash, isValidPassword } from "../utils.js";
import UserService from "../services/UserService.js";

const LocalStrategy = local.Strategy;
const userService = new UserService();

const initializePassport = () => {
    passport.use("register", new LocalStrategy({ passReqToCallback: true, usernameField: "email" },
     async (req, username, password, done) => {
        console.log("Registering user:", req.body);
        const { first_name, last_name, email, role } = req.body;
        try {
           
            console.log(`User data: ${first_name}, ${last_name}, ${email}, ${role}`);
            let user = await userService.findEmail({ email: username });
            console.log(`User en passport.use /register: ${user}`);
            if (user) {
                console.log("User already exists");
                return done(null, false, { message: "User already exists" });
            }
            const hashedPassword = await createHash(password);
            console.log("Hashed password:", hashedPassword);
            const newUser = { first_name, last_name, email, password: hashedPassword, role };
            console.log("New user:", newUser);
            let result = await userService.addUser(newUser);
            return done(null, result);
        } catch (error) {
            console.log("Error registering user:", error);
            return done("Error getting the user", error);
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id);
    })
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userService.getUserById(id);
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    })

    passport.use("login", new LocalStrategy({ usernameField: "email" }, async (username, password, done) => {
        try {
            const user = await userService.findEmail({ email: username });
            console.log("User found:", user);

            if (!user) {
                return done(null, false, { message: "User not found" });
            }
            const isValid = await isValidPassword(user, password);
            console.log("Password validation result:", isValid);

            if (!isValid) {
                return done(null, false, { message: "Wrong password" });
            }
            console.log("Login successful. Authenticated user:", user);
            return done(null, user);
        } catch (error) {
            console.error("Error in login strategy:", error);
            return done(error);
        }
    }))

    passport.use("github", new GitHubStrategy({
        clientID: "Iv1.9a829ee164297862",
        clientSecret: "a6dfc601851671f49e2ef628cd8ded8ee78bb715",
        callbackURL: "http://localhost:8080/api/users/githubcallback",
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const email = profile.emails[0].value;
            let name = profile.displayName;

            if (email && email.length > 0) {
                let user = await userService.findEmail({ email: email });
                console.log(`User en passport.use /github: ${user}`);

                if (!user) {

                    let newUser = {
                        first_name: first_name,
                        email: email,
                        password: "",
                        role: "admin"
                    }
                    let newUserJson = JSON.stringify(newUser);

                    let result = await userService.addUser(newUser);
                    return done(null, result);
                } else {
                    return done(null, user);
                }

            } else {
                return done(null, false, { message: "User not found in GitHub" });
            }
        } catch (error) {
            return done(error);
        }
    }))
}

export default initializePassport;