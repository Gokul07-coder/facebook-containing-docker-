const db = require("../../Util/database");
const cloudinary = require("cloudinary").v2;
const express = require("express");
const route = express.Router();
const fs = require("fs");
const env = require("dotenv").config({ path: "../../util/.env" });



async function uploadToCloud(localFilePath) {
  return cloudinary.uploader
    .upload(localFilePath, {
      resource_type: "image",
      folder: "Home/story",
    })
    .then((result) => {
      fs.unlinkSync(localFilePath);
      // console.log("ok .......");
      return result.url;
    })
    .catch((err) => {
      fs.unlinkSync(localFilePath);
      return { message: "fail" };
    });
}

let upload_story = async (req, res) => {
  console.log("upload your story here");
  let { user_id } = req.user;
  var localFilePath = req.file.path;
  try {
    var resultant = await uploadToCloud(localFilePath, (err) => {
      if (err) console.log(err);
    });
  } catch {
    console.log("error at uploading");
  } 
  try {
    const story = resultant;
    db.query(
      "insert into story (id,story) values (?,?)",
      [user_id, story],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(401).json({ message: "Story not updated" });
        } else res.status(201).json({ message: "Story updated" });
      }
    );
  } catch {
    console.log("Error at catch");
  }
};

let get_story = (req, res) => {  
  // console.log(req.user);
  let { user_id } = req.user;
  try {
    db.query("select * from story where story.time > DATE_SUB(CURDATE(), INTERVAL 1 DAY) and id = ? ", [user_id], (err, result) => {
      if (err) {
        console.log("Error at fetching");
        console.log(err);
        res.status(401).json({ message: "error at fetching" });
      } 
      else {
        console.log("Succesfully retreived");
        res.status(201).json({ result });
      }
    });
  } catch {
    console.log("Error at catch");
    res.status(401).json({ message: "Something went wrong" });
  }
};

module.exports = { upload_story, get_story };
