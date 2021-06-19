const { Router } = require('express');
const { upload } = require('../config-multer-Gridfs');
const indexController = require('../controllers/index-controller');
const router = Router();

// router.get('/', indexController.render_index);
router.get('/',indexController.render_index_custom)
router.get('/upload',indexController.render_uploads);
// router.post('/upload',indexController.post_upload);
router.post('/upload', upload.single('file'),indexController.post_upload_custom);
router.get('/details/:filename', indexController.render_details_custom);
router.get('/image/:filename', indexController.render_image_custom);
// router.get('/image/:id',indexController.profileBy)
// router.get('/image/:id/delete',indexController.image_delete);

module.exports = router;