var express = require('express')
var router = express.Router();
const middleware = require('../middlewares/index.js');

const categoryController = require('../controllers/category.controller'),
    peopleController = require('../controllers/people.controller'),
    countryController = require('../controllers/country.controller'),
    cityController = require('../controllers/city.controller'),
    planController = require('../controllers/plan.controller'),
    typeController = require('../controllers/type.controller'),
    rolesController = require('../controllers/roles.controller'),
    streamingCategoryController = require('../controllers/streaming.category.controller'),
    planCategoryController = require('../controllers/plan.category.controller'),
    moviesController = require('../controllers/movies.controller'),
    channelsController = require('../controllers/channels.controller'),
    seriesController = require('../controllers/series.controller'),
    billingController = require('../controllers/billing.controller'),
    codesController = require('../controllers/codes.controller'),
    revenuesController = require('../controllers/revenues.controller'),
    recoverPasswordController = require('../controllers/recover.password.controller'),
    linkController = require('../controllers/link.controller'),
    loginController = require('../controllers/login.controller'),
    streamingController = require('../controllers/streaming.controller'),
    permissionController = require('../controllers/permission.controller'),
    chaptersController = require('../controllers/chapter.controller'),
    emailController = require('../controllers/email.controller'),
    collaboratorController = require('../controllers/collaborator.controller'),
    loggerController = require('../controllers/logger.controller'),
    notificationController = require('../controllers/notification.controller');

//Post Login
router.post('/login', loginController.postLogin);
router.get('/login', loginController.postLogin);
//Delete Session .route('/login').post(middleware.validatedIP
router.delete('/deleteSession', loginController.deleteSession);
//Get permission
router.route('/permission').post(middleware.validatedIP, permissionController.getPermission);
router.route('/permission').get(middleware.validatedIP, permissionController.getPermission);
//router.post('/permission', permissionController.getPermission);
//Get session
router.post('/session', permissionController.getSession);
router.get('/session', permissionController.getSession);
//Get Influencers collaborator
router.get('/getInfluencers', collaboratorController.getInfluencers);
//Get Plans Influencers collaborator
router.post('/getPlansInfluencers', collaboratorController.getPlansInfluencers);
//Get Plans Influencers collaborator
router.post('/createService', collaboratorController.createService);

router.post('/createServicePlan',collaboratorController.createServicePlan);

//Get users bussiness
router.route('/usersBussiness').get(middleware.validatedIP, linkController.getUsersBussiness);
//Get Notifications
router.route('/listNotifications').get(middleware.validatedIP, notificationController.listNotifications);
// Get Categories
router.route('/category').get(middleware.validatedIP, categoryController.getCategory);
// Update Category
router.route('/category/:id').put(middleware.validatedIP, categoryController.putCategory);
// Delete Category
router.route('/category/:id').delete(middleware.validatedIP, categoryController.deleteCategory);
// Add Category
router.route('/category').post(middleware.validatedIP, categoryController.postCategory);
// Add People
router.post('/people', peopleController.postPeople);
// Get People
router.get('/people', peopleController.getPeople);
// Get By People
router.route('/people/:id').get(middleware.validatedIP, peopleController.getByPeople);
// Delete People
router.route('/people/block/:id').put(middleware.validatedIP, peopleController.blockPeople);
// Update People
router.route('/people/active/:id').put(middleware.validatedIP, peopleController.activePeople);
// Update People
router.route('/people/:id').put(middleware.validatedIP, peopleController.putPeople);
// Get User Id
router.get('/user/:id', peopleController.getUserId);
// Validate Email
router.get('/validate/email/:id', peopleController.validateEmail);
// Get Countries
router.get('/country', countryController.getCountry);
// Get Cities
router.get('/city', cityController.getCity);
// Get By Cities
router.get('/city/:id', cityController.getByCity);
// Get Types
router.get('/types', typeController.getType);
// Get Types
router.get('/types/:id', typeController.getByType);
// Get Roles
router.route('/roles').get(middleware.validatedIP, rolesController.getRoles);
// Update Roles
router.route('/roles/:id').put(middleware.validatedIP, rolesController.putRoles);
// Delete Roles
router.route('/roles/:id').delete(middleware.validatedIP, rolesController.deleteRoles);
// Add Roles
router.route('/roles').post(middleware.validatedIP, rolesController.postRoles);
// Get Plans
router.get('/plan', planController.getPlan);
// Get Active Plans
router.get('/plan/active', planController.getActivePlan);
// Update Plan
router.put('/plan/:id', planController.putPlan);
// Delete Plan
router.route('/plan/:id').delete(middleware.validatedIP, planController.deletePlan);
// Add Plan
router.route('/plan').post(middleware.validatedIP, planController.postPlan);
// Get Movies
router.route('/movies').get(middleware.validatedIP, moviesController.getMovies);
// Update Movies
router.route('/movies/:id').put(middleware.validatedIP, moviesController.putMovies);
// Delete Movies
router.route('/movies/:id').delete(middleware.validatedIP, moviesController.deleteMovies);
// Add Movies
router.route('/movies').post(middleware.validatedIP, moviesController.postMovies);
// Add Streaming Category
router.route('/streaming/category').post(middleware.validatedIP, streamingCategoryController.postStreamingCategory);
// Get Streaming Category
router.route('/streaming/category/:id').get(middleware.validatedIP, streamingCategoryController.getStreamingCategory);
// Delete Streaming Category
router.route('/streaming/category/:id').delete(middleware.validatedIP, streamingCategoryController.deleteStreamingCategory);
// Add Plan Category
router.route('/plan/category').post(middleware.validatedIP, planCategoryController.postPlanCategory);
// Get Plan Category
router.route('/plan/category/:id').get(middleware.validatedIP, planCategoryController.getPlanCategory);
// Delete Plan Category
router.route('/plan/category/:id').delete(middleware.validatedIP, planCategoryController.deletePlanCategory);
// Get Channels
router.get('/channels', channelsController.getChannels);
// Update Channels
router.put('/channels/:id', channelsController.putChannels);
// Delete Channels
router.delete('/channels/:id', channelsController.deleteChannels);
// Add Channels
router.post('/channels', channelsController.postChannels);
// Get Series
router.route('/series').get(middleware.validatedIP, seriesController.getSeries);
// Get Series
router.get('/series/:id', seriesController.getBySerie);
// Update Series
router.route('/series/:id').put(middleware.validatedIP, seriesController.putSeries);
// Delete Series
router.route('/series/:id').delete(middleware.validatedIP, seriesController.deleteSeries);
// Add Series
router.route('/series').post(middleware.validatedIP, seriesController.postSeries);
// Get Chapters
router.get('/chapters', chaptersController.getChapters);
// Get Episodes
router.get('/episodes', chaptersController.getEpisodes);
// Get Episodes
router.get('/episodes/:id', chaptersController.getByEpisodes);
// Get Chapters
router.get('/chapters/:id', chaptersController.getByChapter);
// Update Chapters
router.route('/chapters/:id').put(middleware.validatedIP, chaptersController.putChapters);
// Delete Chapters
router.route('/chapters/:id').delete(middleware.validatedIP, chaptersController.deleteChapters);
// Add Chapters
router.route('/chapters').post(middleware.validatedIP, chaptersController.postChapters);
// Generate Billing
router.get('/billing', billingController.getDataGet);
// Generate Billing
router.post('/billing', billingController.getDataPost);
//Genrate Invoice
router.get('/invoice', billingController.getInvoice);
// Add Payment
router.post('/payment', billingController.postPayment);
// Recurring payment
router.post('/recurring', billingController.createToken);
// Get By Code
router.get('/code/:id/:email', codesController.getByCode);
// Get By Code
router.get('/validate/code/:id', codesController.getValidateCode);
// Get By Code
router.get('/code/:id', codesController.getByCode);
// Get Revenues
router.route('/revenues/:id').get(middleware.validatedIP, revenuesController.getRevenues);
// Get Earnings
router.route('/earnings/:id').get(middleware.validatedIP, revenuesController.getEarnings);
// Get Count Users
router.route('/count/users/:id').get(middleware.validatedIP, revenuesController.getCountUsers);
// Get Active Users
router.route('/active/users/:id').get(middleware.validatedIP, revenuesController.getActiveUsers);
// Get Inactive Users
router.route('/inactive/users/:id').get(middleware.validatedIP, revenuesController.getInactiveUsers);
// Get New Users
router.route('/new/users/:id').get(middleware.validatedIP, revenuesController.getNewUsers);
// Get Recurrent Users
router.route('/recurrent/users/:id').get(middleware.validatedIP, revenuesController.getRecurrentUsers);
// Get Gender Users
router.route('/gender/users/:id').get(middleware.validatedIP, revenuesController.getGenderUsers);
// Get Count Categories
router.route('/count/categories/:id').get(middleware.validatedIP, revenuesController.getCountCategories);
// Get Traffic
router.route('/traffic/:id').get(middleware.validatedIP, revenuesController.getTraffic);
// Get Codes
router.get('/codes/:id', revenuesController.getCodes);
// Get Codes
router.get('/codes', linkController.getCodes);
// Get Codes Business
router.route('/codesBusiness').get(middleware.validatedIP, linkController.getCodesBusiness);
// Get Codes Influencers
router.route('/codesInfluencers').get(middleware.validatedIP, linkController.getCodesInfluencers);
// Get Codes
router.route('/codes/:id/:type').get(middleware.validatedIP, linkController.getByCodes);
// Get Codes
router.route('/generatedLink').get(middleware.validatedIP, linkController.generatedLink);
// Add Codes
router.route('/codes').post(middleware.validatedIP, linkController.postCodes);
// Get Recover Password
router.post('/recoverPassword', recoverPasswordController.postEmailFootprint);
//Get plans actives
router.route('/getPlansActives').get(middleware.validatedIP, planController.getPlansActivesUser);
// Get By Recover Password
router.get('/recoverPassword/:id', recoverPasswordController.getEmailFootprint);
// Post update Password
router.post('/updatePassword', recoverPasswordController.updatePassword);
// Get Slider
router.route('/slider').get(middleware.validatedIP, streamingController.getSlider);
// Get Slider Top
router.route('/sliderTop').get(middleware.validatedIP, streamingController.getSliderTop);
// Get Categories
router.route('/categories/:id').get(middleware.validatedIP, streamingController.getCategories);
// Get Streaming
router.route('/streaming/:id').get(middleware.validatedIP, streamingController.getStreaming);
// Get By Streaming
router.get('/streaming/detail/:id', streamingController.getByStreaming);
// Get Streaming Category
router.route('/streaming/categories/:id').get(middleware.validatedIP, streamingController.getStreamingCategory);
// Get Streaming Search
router.route('/streaming/search/:id').get(middleware.validatedIP, streamingController.getSearch);
// Get Streaming Billing
router.get('/streaming/billing/:id', streamingController.getBilling);
// Get Season
router.get('/season/:id', streamingController.getSeason);
// Get Chapters
router.get('/season/chapters/:id', streamingController.getChapters);
// Block services
router.put('/block/services/:id', streamingController.blockServices);
// Create visit
router.get('/create/visit/:id', streamingController.createVisit);
// Favorite List
router.get('/favorite/list/:id', streamingController.getFavoriteList);
// Recently List
router.get('/recently/list/:id', streamingController.getRecentlyList);
// Create favorite list
router.post('/create/favorite/list', streamingController.createFavoriteList);
// Create recently list
router.post('/create/recently/list', streamingController.createRecentlyList);
// Delete recently list
router.post('/delete/recently/list', streamingController.deleteRecentlyList);
// Delete favorite list
router.post('/delete/favorite/list', streamingController.deleteFavoriteList);
// Update recently list
router.post('/update/recently/list', streamingController.updateRecentlyList);
// Get link
router.get('/get/link/:id', streamingController.getLink); // Not validate
// Manage Parental Control
router.post('/parental/control', streamingController.parentalControl);
// Get Parental Control
router.post('/get/parental/control', streamingController.getParentalControl);
// Validate user
router.post('/validate/user', streamingController.validateUser);
// Get pin
router.post('/get/pin', streamingController.getPin);
//Post NotWatchingMovie
router.post('/NotWatchMovie', streamingController.postNotWatchingMovie);
//Post WatchingMovie
router.post('/WatchMovie', streamingController.postWatchingMovie);
//Get perfiles
router.get('/profile/:id', streamingController.getProfiles);
//Post Perfiles
router.post('/profile_change', streamingController.PostProfiles);
//Get premieres
router.get('/premieres', streamingController.getPremieres);
//Send email
router.post('/send/email', emailController.sendEmail);
// Update key code
router.post('/update/key/:id', peopleController.updateKeyCode);
// Update key code
router.post('/key/:id', peopleController.keyCode);
// Update password
router.post('/change/password', streamingController.changePassword);
// Create session
router.post('/create/session', loginController.createSession);
router.get('/payments', revenuesController.getPayments);
//Delete session con Watch
router.post('/delete_sessions', streamingController.deleteSession);

//Get category adult TV
router.post('/tv/adult/:id', streamingController.getCategorieAdult);

//Get streaming TV
router.get('/tv/streaming/:id', streamingController.getStreamingTV);

//Get series TV
router.get('/tv/series/:id', streamingController.getSeriesTV);

//Get Category TV
router.get('/tv/category/:id', streamingController.getCategoryTV);

//Get Season TV
router.get('/tv/season/:id', streamingController.getSeasonTV);

//Get Token TV
router.get('/tv/token', streamingController.getTokenTV);

//Get Chapters TV
router.get('/tv/chapters/:id', streamingController.getChaptersTV);

// Get Streaming Search
router.get('/tv/search', streamingController.getSearchTV);

// Manage Session TV
router.post('/tv/manage/session', streamingController.manageTokenTV);

// Manage Session TV
router.post('/logger', loggerController.setLogger); 

//Update codes in influencers
router.put('/codesInfluencers/:id', linkController.updateCodesInfluencers);



module.exports = router