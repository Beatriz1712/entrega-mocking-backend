import MongoStore from "connect-mongo";
import dotenv from "dotenv";
dotenv.config();

const sessionConfig = {
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        // mongoOptions: {
        //     useNewUrlParser: false,
        //     useUnifiedTopology: false
        // },
        ttl: 600
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}

export default sessionConfig;