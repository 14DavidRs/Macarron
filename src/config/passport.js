// src/config/passport.js
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import prisma from "../prismaClient.js";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
      // jwtPayload contiene: { sub: userId, iat, exp }
      const user = await prisma.users.findUnique({
        where: { id: jwtPayload.sub },
      });

      if (!user) {
        return done(null, false);
      }

      // OK → usuario encontrado
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport;
