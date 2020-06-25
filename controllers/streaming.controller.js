const db = require('../database/db')
const dotenv = require('dotenv').config();

var epayco = require("epayco-node")({
  apiKey: process.env.EPAYCO_API_KEY,
  privateKey: process.env.EPAYCO_PRIVATE_KEY,
  lang: "ES",
  test: false
});

module.exports = {
  getSlider: getSlider,
  getSliderTop: getSliderTop,
  getCategories: getCategories,
  getStreaming: getStreaming,
  getByStreaming: getByStreaming,
  getStreamingCategory: getStreamingCategory,
  getSeason: getSeason,
  getChapters: getChapters,
  getSearch: getSearch,
  getBilling: getBilling,
  blockServices: blockServices,
  createVisit: createVisit,
  getFavoriteList: getFavoriteList,
  createFavoriteList: createFavoriteList,
  deleteFavoriteList: deleteFavoriteList,
  getLink: getLink,
  createRecentlyList: createRecentlyList,
  getRecentlyList: getRecentlyList,
  deleteRecentlyList: deleteRecentlyList,
  updateRecentlyList: updateRecentlyList,
  parentalControl: parentalControl,
  getParentalControl: getParentalControl,
  validateUser: validateUser,
  getPin: getPin,
  postNotWatchingMovie: postNotWatchingMovie,
  postWatchingMovie: postWatchingMovie,
  getProfiles: getProfiles,
  getPremieres: getPremieres,
  PostProfiles: PostProfiles,
  changePassword: changePassword,
  deleteSession: deleteSession,
  getStreamingTV: getStreamingTV,
  getSeasonTV: getSeasonTV,
  getChaptersTV: getChaptersTV,
  getSearchTV: getSearchTV,
  getSeriesTV: getSeriesTV,
  getCategoryTV: getCategoryTV,
  getTokenTV: getTokenTV,
  manageTokenTV: manageTokenTV,
  getCategorieAdult:getCategorieAdult

}

// Get Slider
function getSlider(req, res) {
  db.sequelize.query("SELECT * FROM view_slider WHERE tbl_types_type_id = :type AND tbl_plans_plan_id = :plan ORDER BY RAND() asc LIMIT 5", {
      replacements: {
        type: req.query.type,
        plan: req.query.plan
      },
      type: db.sequelize.QueryTypes.SELECT
    })
    .then(slider => {
      res.json(slider)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Get Slider TOP
function getSliderTop(req, res) {
  db.sequelize.query("SELECT * FROM view_slider WHERE tbl_plans_plan_id = :plan AND state = 1 ORDER BY popularity desc, RAND() asc LIMIT 10", {
      replacements: {
        plan: req.query.plan
      },
      type: db.sequelize.QueryTypes.SELECT
    })
    .then(sliderTop => {
      res.json(sliderTop)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Delete delete sessions
function deleteSession(req, res) {
  db.sequelize.query("call proc_delete_sessions(:user_id, 1)", {
      replacements: {
        user_id: req.session.user_id
      }
    })
    .then(session => {
      res.json(session)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}
// Get premieres
function getPremieres(req, res) {
  db.sequelize.query("SELECT * FROM view_premieres ORDER BY RAND() asc", {
      type: db.sequelize.QueryTypes.SELECT
    })
    .then(slider => {
      res.json(slider)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Get Categories
function getCategories(req, res) {
  db.sequelize.query("SELECT * FROM view_categories WHERE tbl_plans_plan_id = :id AND tbl_types_type_id = :type ORDER BY name LIMIT 30", {
      type: db.sequelize.QueryTypes.SELECT,
      replacements: {
        id: req.params.id,
        type: req.query.type
      }
    })
    .then(categories => {
      res.json(categories)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Get Streaming
function getStreaming(req, res) {
  db.sequelize.query("SELECT * FROM view_streaming WHERE category_id = :id AND tbl_types_type_id = :type ORDER BY RAND() asc LIMIT 15", {
      type: db.sequelize.QueryTypes.SELECT,
      replacements: {
        id: req.params.id,
        type: req.query.type
      }
    })
    .then(streaming => {
      res.json(streaming)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Get Streaming Category
function getStreamingCategory(req, res) {
  db.sequelize.query("SELECT * FROM view_streaming WHERE category_id = :id AND tbl_types_type_id = :type ORDER BY RAND() asc", {
      type: db.sequelize.QueryTypes.SELECT,
      replacements: {
        id: req.params.id,
        type: req.query.type
      }
    })
    .then(streaming => {
      res.json(streaming)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Get Season
function getSeason(req, res) {
  db.sequelize.query("SELECT season,tbl_streaming_streaming_id FROM view_chapters WHERE tbl_streaming_streaming_id = :serie GROUP BY season ORDER BY season asc", {
      type: db.sequelize.QueryTypes.SELECT,
      replacements: {
        serie: req.params.id
      }
    })
    .then(streaming => {
      res.json(streaming)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Get Chapters
function getChapters(req, res) {
  db.sequelize.query("SELECT * FROM view_chapters WHERE tbl_streaming_streaming_id = :serie AND season = :season", {
      type: db.sequelize.QueryTypes.SELECT,
      replacements: {
        serie: req.params.id,
        season: req.query.season
      }
    })
    .then(streaming => {
      res.json(streaming)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Get Streaming
function getByStreaming(req, res) {
  db.sequelize.query("SELECT * FROM view_streaming WHERE streaming_id = :id GROUP BY streaming_id", {
      type: db.sequelize.QueryTypes.SELECT,
      replacements: {
        id: req.params.id,
      }
    })
    .then(streaming => {
      res.json(streaming)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Get Streaming Search
function getSearch(req, res) {
  db.sequelize.query("SELECT * FROM view_search WHERE LOWER(title) LIKE LOWER(:title) OR LOWER(description) LIKE LOWER(:description) OR LOWER(category_name) LIKE LOWER(:category_name) AND tbl_users_user_id = :user_id GROUP BY streaming_id", {
      type: db.sequelize.QueryTypes.SELECT,
      replacements: {
        title: "%" + req.params.id + "%",
        description: "%" + req.query.value + "%",
        category_name: "%" + req.query.value + "%",
        user_id: req.session.user_id
      }
    })
    .then(streaming => {
      res.json(streaming)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Get Streaming Billing
function getBilling(req, res) {
  db.sequelize.query("SELECT * FROM view_billing WHERE email_footprint = :id", {
      type: db.sequelize.QueryTypes.SELECT,
      replacements: {
        id: req.params.id
      }
    })
    .then(streaming => {
      res.json(streaming)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}


// Block services
function blockServices(req, res) {
  if (req.body.x_extra5 != "" || req.body.x_extra5 != null) {
    epayco.subscriptions.cancel(req.body.x_extra5)
      .then(function (subscription) {
        console.log(subscription);
      })
      .catch(function (err) {
        console.log("err: " + err);
      })
  }
  db.sequelize.query("UPDATE tbl_services SET state = false WHERE service_id = :id", {
      replacements: {
        id: req.params.id
      },
      type: db.sequelize.QueryTypes.UPDATE
    })
    .then(() => {
      res.json("Plan cancelado")
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}


// Create visit
function createVisit(req, res) {
  db.sequelize.query("call proc_create_visit(:user_id, :streaming)", {
      type: db.sequelize.QueryTypes.SELECT,
      replacements: {
        user_id: req.session.user_id,
        streaming: req.params.id
      }
    })
    .then(streaming => {
      console.log(streaming);
      res.json(streaming)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Get Favorite List
function getFavoriteList(req, res) {
  db.sequelize.query("SELECT * FROM view_favorite_list WHERE display_id = :id AND tbl_types_type_id = :type", {
      type: db.sequelize.QueryTypes.SELECT,
      replacements: {
        id: req.params.id,
        type: req.query.type
      }
    })
    .then(streaming => {
      res.json(streaming)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Create favorite list
function createFavoriteList(req, res) {
  db.sequelize.query("call proc_favorite_list(:display, :streaming)", {
      type: db.sequelize.QueryTypes.SELECT,
      replacements: {
        display: req.body.display,
        streaming: req.body.streaming
      }
    })
    .then(streaming => {
      res.json(streaming)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Delete favorite list
function deleteFavoriteList(req, res) {
  db.sequelize.query("DELETE FROM tbl_favorite_list WHERE tbl_streamings_streaming_id = :streaming AND tbl_displays_display_id = :display", {
      type: db.sequelize.QueryTypes.SELECT,
      replacements: {
        display: req.body.display,
        streaming: req.body.streaming
      }
    })
    .then(streaming => {
      res.json(streaming)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Update recently list
function updateRecentlyList(req, res) {
  db.sequelize.query("call proc_updated_recently_list(:time, :chapter, :display, :streaming)", {
      type: db.sequelize.QueryTypes.SELECT,
      replacements: {
        time: req.body.time,
        chapter: req.body.chapter,
        display: req.body.display,
        streaming: req.body.streaming
      }
    })
    .then(streaming => {
      res.json(streaming)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Get link
function getLink(req, res) {
  db.sequelize.query("call proc_get_link(:streaming, :email, :type)", {
      type: db.sequelize.QueryTypes.SELECT,
      replacements: {
        streaming: req.params.id,
        email: req.query.email,
        type: req.query.type
      }
    })
    .then(streaming => {

      let sources = {
        "playlist": [{
          "sources": [{
            "default": true,
            "file": streaming[0][0].url,
            "label": "720"
          }, ]
        }]
      };      
      if (streaming[0][0].multiformat == true) {
        var subString = streaming[0][0].url.substring(streaming[0][0].url.lastIndexOf("/") + 1);
        sources = {
          "playlist": [{
            "sources": [{                
                "file": streaming[0][0].url,
                "label": "720"
              },
              {
                "default": true,
                "file": "https://contenidoapptamic.com/streaming/Movies/720x480/" + subString,
                "label": "480"
              }
            ]
          }]
        };
      }
      res.json(sources);
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Create recently list
function createRecentlyList(req, res) {
  db.sequelize.query("call proc_recently_list(:type, :streaming, :time, :display, :data)", {
      type: db.sequelize.QueryTypes.SELECT,
      replacements: {
        type: req.body.type,
        streaming: req.body.streaming,
        time: req.body.time,
        display: req.body.display,
        data: req.body.data
      }
    })
    .then(streaming => {
      res.json(streaming)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Get Recently List
function getRecentlyList(req, res) {
  if (req.query.type == "streaming") {
    db.sequelize.query("SELECT * FROM view_recently_movies WHERE display_id = :display", {
        type: db.sequelize.QueryTypes.SELECT,
        replacements: {
          display: req.params.id
        }
      })
      .then(streaming => {
        res.json(streaming)
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  } else {
    db.sequelize.query("SELECT * FROM view_recently_chapters  WHERE  display_id = :display", {
        type: db.sequelize.QueryTypes.SELECT,
        replacements: {
          display: req.params.id
        }
      })
      .then(streaming => {
        res.json(streaming)
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  }
}

// Delete Recently list
function deleteRecentlyList(req, res) {
  db.sequelize.query("DELETE FROM tbl_recently WHERE streaming = :streaming AND tbl_displays_display_id = :display", {
      type: db.sequelize.QueryTypes.SELECT,
      replacements: {
        display: req.body.display,
        streaming: req.body.streaming
      }
    })
    .then(streaming => {
      res.json(streaming)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Manage parental control
function parentalControl(req, res) {
  db.sequelize.query("call proc_parental_control(:email,:pin,:categories,:type)", {
      type: db.sequelize.QueryTypes.SELECT,
      replacements: {
        email: req.body.email,
        pin: req.body.pin,
        categories: req.body.categories,
        type: req.body.type
      }
    })
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}


// Get parental control
function getParentalControl(req, res) {
  db.sequelize.query("call proc_block_content(:email,:streaming)", {
      type: db.sequelize.QueryTypes.SELECT,
      replacements: {
        streaming: req.body.streaming,
        email: req.body.email
      }
    })
    .then(streaming => {
      res.json(streaming)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}


// Validate user
function validateUser(req, res) {
  db.sequelize.query("SELECT COUNT(*) 'count' FROM tbl_users WHERE email_footprint = :email_footprint AND password = SHA2(:password, 256)", {
      type: db.sequelize.QueryTypes.SELECT,
      replacements: {
        email_footprint: req.body.email_footprint,
        password: req.body.password
      }
    })
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}


// Get pin
function getPin(req, res) {
  db.sequelize.query("SELECT u.pin, pc.tbl_categories_category_id, c.name FROM tbl_users u INNER JOIN tbl_parental_control pc ON pc.tbl_users_user_id = u.user_id INNER JOIN tbl_categories c ON c.category_id = pc.tbl_categories_category_id WHERE u.email_footprint = :email", {
      type: db.sequelize.QueryTypes.SELECT,
      replacements: {
        email: req.body.email
      }
    })
    .then(streaming => {
      res.json(streaming)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Post watch streaming
function postNotWatchingMovie(req, res) {
  req.session.watch = 0;
  req.session.save();
  res.send("");
}

// Post watch streaming
function postWatchingMovie(req, res) {
  db.sequelize.query("CALL proc_number_session_online(:email_footprint);", {
      replacements: {
        email_footprint: req.session.email_footprint
      }
    })
    .then(streaming => {
      console.log('streaming', streaming);
      if (streaming[0].screen_available === 1) {
        req.session.watch = 1;
        req.session.save();
      }
      res.json(streaming);
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}
//Get Profile
function getProfiles(req, res) {
  db.sequelize.query("call proc_get_profiles(:user_id)", {
    replacements: {
      user_id: req.params.id
    }
  }).then(result => {
    res.json(result);
  }).catch(err => {
    res.send('error: ' + err)
  })

}
//Post Profile
function PostProfiles(req, res) {
  db.sequelize.query("UPDATE tbl_displays SET name = :name_update, img = :img_upadte WHERE display_id= :display_id_update", {
    type: db.sequelize.QueryTypes.SELECT,
    replacements: {
      display_id_update: req.body.display_id,
      img_upadte: req.body.img,
      name_update: req.body.name

    }
  }).then(() => {
    res.json("se actualizo el registro");
  }).catch(err => {
    res.send('error: ' + err)
  })

}

function changePassword(req, res) {
  db.sequelize.query("UPDATE tbl_users SET password = sha2(:password,256), updated_at = NOW() WHERE email_footprint = :email_footprint AND state = 1", {
      type: db.sequelize.QueryTypes.UPDATE,
      replacements: {
        email_footprint: req.body.email_footprint,
        password: req.body.password
      }
    })
    .then(response => {
      res.json('Contraseña actualizada');
    })
    .catch(err => {
      res.json('Error al actualizar la contraseña');
    });
}




// Get Streaming TV
function getStreamingTV(req, res) {
  db.sequelize.query("SELECT * FROM view_streaming_tv WHERE name LIKE :id AND tbl_types_type_id = :type LIMIT 8", {
      type: db.sequelize.QueryTypes.SELECT,
      replacements: {
        id: "%" + req.params.id + "%",
        type: req.query.type
      }
    })
    .then(streaming => {
      res.json(streaming)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}


// Get Catergory adult TV
function getCategorieAdult(req, res) {
  db.sequelize.query("SELECT fnt_adult(:user_id) adult", {
      type: db.sequelize.QueryTypes.SELECT,
      replacements: {
        user_id: req.params.id
      }
    })
    .then(streaming => {
      res.json(streaming)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Get Series TV
function getSeriesTV(req, res) {
  db.sequelize.query("SELECT * FROM view_streaming_tv WHERE name LIKE :id AND tbl_types_type_id = :type", {
      type: db.sequelize.QueryTypes.SELECT,
      replacements: {
        id: "%" + req.params.id + "%",
        type: req.query.type
      }
    })
    .then(streaming => {
      res.json(streaming)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Get Category TV
function getCategoryTV(req, res) {
  db.sequelize.query("SELECT * FROM view_streaming_tv WHERE name LIKE :id AND tbl_types_type_id = :type", {
      type: db.sequelize.QueryTypes.SELECT,
      replacements: {
        id: "%" + req.params.id + "%",
        type: req.query.type
      }
    })
    .then(streaming => {
      res.json(streaming)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Get Season TV
function getSeasonTV(req, res) {
  db.sequelize.query("SELECT * FROM view_season_tv WHERE tbl_streaming_streaming_id = :id ORDER BY season ASC", {
      type: db.sequelize.QueryTypes.SELECT,
      replacements: {
        id: req.params.id,
      }
    })
    .then(streaming => {
      res.json(streaming)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}


// Get Chapters TV
function getChaptersTV(req, res) {
  db.sequelize.query("SELECT * FROM view_chapters_tv WHERE season = :season AND tbl_streaming_streaming_id = :id AND state = TRUE ORDER BY consecutive ASC", {
      type: db.sequelize.QueryTypes.SELECT,
      replacements: {
        id: req.params.id,
        season: req.query.season,
      }
    })
    .then(streaming => {
      res.json(streaming)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}


// Get Streaming Search TV
function getSearchTV(req, res) {
  db.sequelize.query("SELECT * FROM view_search WHERE tbl_types_type_id <> '9608482c-a6c4-4694-8478-16cb9b59c45e' and LOWER(title) LIKE LOWER(:title) OR LOWER(description) LIKE LOWER(:description) OR LOWER(category_name) LIKE LOWER(:category_name) AND tbl_users_user_id = :user_id GROUP BY streaming_id LIMIT 30", {
      type: db.sequelize.QueryTypes.SELECT,
      replacements: {
        title: "%" + req.query.b + "%",
        description: "%" + req.query.b + "%",
        category_name: "%" + req.query.b + "%",
        user_id: req.query.id
      }
    })
    .then(streaming => {
      res.json(streaming)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}


// Get Token TV
function getTokenTV(req, res) {
  db.sequelize.query("SELECT fnt_get_token_session_tv(:id) token", {
      type: db.sequelize.QueryTypes.SELECT,
      replacements: {
        id: req.connection.remoteAddress.replace('::ffff:', ''),
      }
    })
    .then(streaming => {
      res.json(streaming)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}



// Manage Token TV
function manageTokenTV(req, res) {
  console.log(req.connection)
  db.sequelize.query("CALL proc_save_session_tv(:token, :user_id, :ip)", {
      type: db.sequelize.QueryTypes.SELECT,
      replacements: {
        token: req.body.token.split(" ").join("+"),
        user_id: req.body.user_id,
        ip: req.connection.remoteAddress.replace('::ffff:', '')
      }
    })
    .then(streaming => {
      res.json(streaming)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}