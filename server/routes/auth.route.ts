import express, { Request, Response, Router } from 'express';
import passport from 'passport';

const router: Router = express.Router();

router.get("/login/success", (req: Request, res: Response) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successful",
      user: req.user,
      // cookies: req.cookies
    });
  } else {
    res.status(401).json({
      success: false,
      message: "User not authenticated",
    });
  }
});

router.get("/login/failed", (req: Request, res: Response) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req: Request, res: Response) => {
  req.logout(err => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Logout failed",
      });
    }  
    res.redirect(process.env.CLIENT_URL as string);
  });
});

router.get("/google", passport.authenticate("google", { scope: ["profile","email"] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/profile');
});

export default router;
