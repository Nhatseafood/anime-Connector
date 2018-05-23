const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//load validation
const validateProfileInput = require("../../validations/profile");
const validateCraftInput = require("../../validations/craft");
const validateHighlightInput = require("../../validations/highlight");

// load profile model
const Profile = require("../../models/Profile");
// load user model
const user = require("../../models/User");

// @route GET api/profile/test
// @description test profile route
// @access Public
router.get("/test", (request, response) =>
  response.json({ msg: " Profile Works" })
);

// @route GET api/profile
// @description get current users profile
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    const errors = {};

    Profile.findOne({ user: request.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return response.status(404).json(errors);
        }
        response.json(profile);
      })
      .catch(err => response.status(404).json(err));
  }
);
// @route GET api/profile/all
// @description get pall profile
// @access Public
router.get("/all", (request, response) => {
  const errors = {};

  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles || profiles.length === 0) {
        errors.noprofile = "There are no profiles";
        return response.status(404).json(errors);
      }
      response.json(profiles);
    })
    .catch(err =>
      response.status(404).json({ profile: "There are no profiles" })
    );
});

// @route GET api/profile/handle/:handle
// @description get profile by handle
// @access Public
router.get("/handle/:handle", (request, response) => {
  const errors = {};

  Profile.findOne({ handle: request.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        response.status(404).json(errors);
      }
      response.json(profile);
    })
    .catch(err => response.status(404).json(err));
});

// @route GET api/profile/user/:user_id
// @description get profile by user id
// @access Public
router.get("/user/:user_id", (request, response) => {
  const errors = {};

  Profile.findOne({ user: request.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        response.status(404).json(errors);
      }
      response.json(profile);
    })
    .catch(err =>
      response
        .status(404)
        .json({ profile: "There is no profile for this user" })
    );
});

// @route POST api/profile
// @description Create or Edit user profile
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    const { errors, isValid } = validateProfileInput(request.body);

    // CHeck validation
    if (!isValid) {
      //Return any errors with 400 status
      return response.status(400).json(errors);
    }

    // Get Fields
    const profileFields = {};
    profileFields.user = request.user.id;
    if (request.body.handle) profileFields.handle = request.body.handle;
    if (request.body.company) profileFields.company = request.body.company;
    if (request.body.website) profileFields.website = request.body.website;
    if (request.body.location) profileFields.location = request.body.location;
    if (request.body.bio) profileFields.bio = request.body.bio;
    if (request.body.status) profileFields.status = request.body.status;
    if (request.body.githubusername)
      profileFields.githubusername = request.body.githubusername;
    //SKills split into array
    if (typeof request.body.skills !== "undefined") {
      profileFields.skills = request.body.skills.split(",");
    }

    // Social
    profileFields.social = {};
    if (request.body.youtube)
      profileFields.social.youtube = request.body.youtube;
    if (request.body.twitter)
      profileFields.social.twitter = request.body.twitter;
    if (request.body.facebook)
      profileFields.social.facebook = request.body.facebook;
    if (request.body.linkedin)
      profileFields.social.linkedin = request.body.linkedin;
    if (request.body.instagram)
      profileFields.social.instagram = request.body.instagram;

    Profile.findOne({ user: request.user.id }).then(profile => {
      if (profile) {
        //update
        Profile.findOneAndUpdate(
          { user: request.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => response.json(profile));
      } else {
        // Create

        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists";
            response.status(400).json(errors);
          }
          // Save profile
          new Profile(profileFields)
            .save()
            .then(profile => response.json(profile));
        });
      }
    });
  }
);

// @route POST api/profile/craft
// @description add craft to profile
// @access Private
router.post(
  "/craft",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    const { errors, isValid } = validateCraftInput(request.body);

    // CHeck validation
    if (!isValid) {
      //Return any errors with 400 status
      return response.status(400).json(errors);
    }

    Profile.findOne({ user: request.user.id }).then(profile => {
      const newCra = {
        title: request.body.title,
        company: request.body.company,
        location: request.body.location,
        from: request.body.from,
        to: request.body.to,
        current: request.body.current,
        description: request.body.description
      };

      // Add to craft array
      profile.craft.unshift(newCra);

      profile.save().then(profile => response.json(profile));
    });
  }
);

// @route POST api/profile/highlight
// @description add highlight to profile
// @access Private
router.post(
  "/highlight",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    const { errors, isValid } = validateHighlightInput(request.body);

    // CHeck validation
    if (!isValid) {
      //Return any errors with 400 status
      return response.status(400).json(errors);
    }

    Profile.findOne({ user: request.user.id }).then(profile => {
      const newHigh = {
        school: request.body.school,
        degree: request.body.degree,
        fieldofstudy: request.body.fieldofstudy,
        from: request.body.from,
        to: request.body.to,
        current: request.body.current,
        description: request.body.description
      };

      // Add to craft array
      profile.highlight.unshift(newHigh);

      profile.save().then(profile => response.json(profile));
    });
  }
);

// @route DELETE api/profile/craft/:cra_id
// @description Delete craft from profile
// @access Private
router.delete(
  "/craft/:cra_id",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    Profile.findOne({ user: request.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.craft
          .map(item => item.id)
          .indexOf(request.params.cra_id);

        // Slice out of array
        profile.craft.splice(removeIndex, 1);

        //save
        profile.save().then(profile => response.json(profile));
      })
      .catch(err => response.status(404).json(err));
  }
);

// @route DELETE api/profile/highlight/:high_id
// @description Delete highlight from profile
// @access Private
router.delete(
  "/highlight/:high_id",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    Profile.findOne({ user: request.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.highlight
          .map(item => item.id)
          .indexOf(request.params.high_id);

        // Slice out of array
        profile.highlight.splice(removeIndex, 1);

        //save
        profile.save().then(profile => response.json(profile));
      })
      .catch(err => response.status(404).json(err));
  }
);

// @route DELETE api/profile
// @description Delete user and profile
// @access Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    Profile.findOneAndRemove({ user: request.user.id }).then(() => {
      User.findOneAndRemove({ _id: request.user.id }).then(() =>
        response.json({ success: true })
      );
    });
  }
);

module.exports = router;
