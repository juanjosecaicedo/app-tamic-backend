module.exports = {
  saveFile: saveFile
}

/**
 * Save file
 * @param {*} req 
 * @param {*} type 
 */
function saveFile(req, type) {
  let file = null;
  let name_file = [];
  let url = "";
  switch (type) {
    case "img_streaming":
      file = req.files.img_streaming;
      name_file = file.name.split('.');
      req.body.img_streaming = name_file[0] + generateRandom() + "." + name_file[1];
      url = "C:/Users/Kevin/Desktop/Web/tamic/src/assets/img/" + req.body.img_streaming;
      file.mv(url, function () {});
      break;
    case "img_banner":
      file = req.files.img_banner;
      name_file = file.name.split('.');
      req.body.img_banner = name_file[0] + generateRandom() + "." + name_file[1];
      url = "C:/Users/Kevin/Desktop/Web/tamic/src/assets/banner/" + req.body.img_banner;
      file.mv(url, function () {});
      break;
    case "img_chapter":
      file = req.files.img_chapter;
      name_file = file.name.split('.');
      req.body.img_chapter = name_file[0] + generateRandom() + "." + name_file[1];
      url = "C:/Users/Kevin/Desktop/Web/tamic/src/assets/img/" + req.body.img_chapter;
      file.mv(url, function () {});
      break;
    default:
      break;
  }
}

/**
 * Generate random
 */
function generateRandom() {
  return new Date().toJSON().slice(0, 10).replace(/-/g, '') + Math.floor(Math.random() * (10000 - 100)) + 100;
}
