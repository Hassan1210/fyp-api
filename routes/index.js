var express = require("express");
var router = express.Router();
const DNA = require("../models/dna");
const T = require("tesseract.js");
const fs = require("fs");
const mangooes = require("mongoose");
const User = require("../models/user");
const ph = require("password-hash");
const randomstring = require("randomstring");
var nodemailer = require("nodemailer");
const Blogs = require("../models/blogs");
const Symptoms = require("../models/symptoms") 
const Precautions = require("../models/precautions"); 
const Doctors = require("../models/doctors"); 






router.get("/", function (req, res, next) {
  res.send("WELCOME");
});

router.get("/dna", (req, res, next) => {
  DNA.find({})
    .then((result) => {
      res.status(200).json({
        data: result,
      }).toArry;
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        result: err,
      });
    });
});

router.post("/image", (req, res, next) => {
  var realFile = Buffer.from(req.body.image, "base64");
  // fs.writeFileSync('stack-abuse-logo-out.png', realFile);
  T.recognize(realFile)
    .then((result) => {
      var str = result.data.text.replace(/[^ACGT\.]+/g, "");
      res.status(200).json({
        data: str,
      }).toArry;
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        result: err,
      });
    });
});

router.post("/insertDna", (req, res, next) => {
  const user = new DNA({
    _id: new mangooes.Types.ObjectId(),
    name: req.body.name,
    dna: req.body.dna
      .replace(/\s+/g, "")
      .replace(/[0-9]/g, "")
      .replace(/(\r\n|\n|\r)/gm, "")
      .toUpperCase(),
    nickName: req.body.nickName,
    affactedGene: req.body.affect,
  });
  user.save().then((result) => {
    res.status(200).json({
      result: "success",
      msg: "created",
      user: user,
    });
  });
});

router.get("/findDna", async function (req, res, next) {
  const dna =  await DNA.find({});
  const symptoms =  await Symptoms.find({});
  const doctors =  await Doctors.find({isGenetic:true});
  const precautions =  await Precautions.find({});


     res.send({
      data:dna,
      symptoms : symptoms,
      doctors: doctors,
      precautions : precautions,
     })
    });

router.get("/blogs", (req, res, next) => {
  Blogs.find({})
    .then((result) => {
     res.send({
      data:result
     })
    });
});

router.get("/doctors", (req, res, next) => {
  Doctors.find({})
    .then((result) => {
     res.send({
      data:result
     })
    });
});

router.post("/login", async function (req, res, next) {
  var body = req.body;
  var a = await User.findOne({ email: body.email });
  if (a) {
    console.log("Hello");
    if (ph.verify(body.password, a.password)) {
      User.findById(a._id).then((d) => {
        res.json({
          result: true,
          message: "Success",
          user: d,
        });
      });
    } else {
      res.json({
        result: false,
        message: "invalid credentials",
      });
    }
  } else {
    res.json({
      result: false,
      message: "user not found",
    });
  }
});

router.post("/register", async function (req, res, next) {
  const user = new User({
    _id: new mangooes.Types.ObjectId(),
    username: req.body.username,
    email: req.body.email,
    password: ph.generate(req.body.password),
  });
  var a = await User.findOne({ email: req.body.email });
  if (a) {
    res.json({
      result: false,
      message: "user already exsists",
    });
  } else {
    user.save().then((ress) => {
      res.json({
        result: true,
        message: "register",
        user: user,
      });
    });
  }
});


router.post("/login", async function (req, res, next) {
  var body = req.body;
  var a = await User.findOne({ email: body.email });
  if (a) {
    console.log("Hello");
    if (ph.verify(body.password, a.password)) {
      User.findById(a._id).then((d) => {
        res.json({
          result: true,
          message: "Success",
          user: d,
        });
      });
    } else {
      res.json({
        result: false,
        message: "invalid credentials",
      });
    }
  } else {
    res.json({
      result: false,
      message: "user not found",
    });
  }
});

router.post("/changePassword", async function (req, res, next) {
  var a = await User.findOne({ email: req.body.email });
  if (a) {
   if(ph.verify(req.body.password,a.password)){
      User.updateOne({email:req.body.email,$set:{password:ph.generate(req.body.newPassword)}}).then((d)=>{
        res.send({
          result: true,
          message: "Your password is changed Successfully",
        })
      })
   }else{
    res.json({
      result: false,
      message: "Your current password is incorrect",
    }); 
   }
  } else {
      res.json({
        result: false,
        message: "User Not Found",
      }); 
     }
});


router.post("/forgetPassword", async function (req, res, next) {
  var a = await User.findOne({ email: req.body.email });
  if (a) {
    const randToken = randomstring.generate();
    await User.updateOne(
      { email: req.body.email },
      { $set: { token: randToken } }
    );
    await sendEmail(a.email, a.username, randToken).then((ress) => {
      res.json({
        result: true,
        message: "check your gmail for reset password",
      });
    });
  } else {
    res.json({
      result: false,
      message: "email not found",
    });
  }
});

router.get("/resetPassword/:token", async function (req, res, next) {
  res.render("forgetpasswordview");
});

router.post("/resetPassword/:token", async function (req, res, next) {
  if (req.body["password"] == req.body["password2"]) {
    if (req.body.password.length < 6) {
      res.send("Password is should be 5 chracter");
    } else {
      const a = await User.findOne({ token: req.params.token });
      if (a) {
        await User.updateOne(
          { email: a.email },
          { $set: { token: "", password: ph.generate(req.body.password) } }
        );
        res.send("Password is rest");
      } else {
        res.send("Invalid token");
      }
    }
  } else {
    res.send("Passwords should be same");
  }
});

async function sendEmail(email, name, token) {
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "chhassan1210@gmail.com",
      pass: "clvnsxxlnpgzqzsx",
    },
  });

  var mailOptions = {
    from: "hch33129@gmail.com",
    to: "hch33129@gmail.com",
    subject: "Reset Password",
    html:
      "<h1>Welcome</h1><p>Hi! " +
      name +
      ' Please reset your password using this link <a href ="https://enchanting-gray-threads.cyclic.app/resetPassword/' +
      token +
      '">reset password</a></p>',
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = router;
