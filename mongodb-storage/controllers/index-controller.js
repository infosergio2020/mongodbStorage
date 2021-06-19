const Image = require('../models/image');

module.exports = {
    render_index: async function (req,res) {
        const images = await Image.find();
        res.render('index', {images:images});
    },
    render_uploads: function (req,res) {
        res.render('uploads');
    },
    post_upload: async function (req,res) {
        const image = new Image();
        //comenzamos a setear los datos del documento
        image.title = req.body.title;
        image.description = req.body.description;
        console.log(image);
        await image.save();
        res.redirect('/');    
    },
    post_upload_custom: function(req,res){
        res.json({file: req.file});
    },
    render_index_custom: function (req,res) {
        if (req.app.locals.gfs) {
            gridfs = req.app.locals.gfs
            gridfs.files.find().toArray((err,files)=>{
                //check if files
                if(!files || files.length === 0 ){
                    res.render('index',{files:false});
                }
                else{
                    files.map(file => {
                        if(file.contentType === 'image/jpeg' || file.contentType === 'image/png' ){
                            file.isImage=true;
                        }
                        else{
                            file.isImage=false;
                        }
                    });
                    console.log( files );
                    res.render('index', { files : files});
                }
            });
        }
    },
    render_details_custom: function (req,res) {
        if (req.app.locals.gfs) {
            gridfs = req.app.locals.gfs
            gridfs.files.findOne({filename: req.params.filename}, (err,file)=>{
                //check if files
                if(!file || file.length === 0 ){
                    return res.status(404).json({
                        err: 'No file exist'
                    });
                }
                // file exist
                return res.json(file);
            });
        }
    },
    // @desc Display image
    render_image_custom: function (req,res) {
        if (req.app.locals.gfs) {
            gridfs = req.app.locals.gfs
            gridfs.files.findOne({filename: req.params.filename}, (err,file)=>{
                //check if files
                if(!file || file.length === 0 ){
                    return res.status(404).json({
                        err: 'No file exist'
                    });
                }
                // check if image
                if(file.contentType === 'image/jpeg' || file.contentType === 'img/png' || file.contentType === 'image/png' ){
                    // read ooutput to browser
                    const readstream = gridfs.createReadStream(file.filename);
                    readstream.pipe(res);   
                } else {
                    res.status(404).json({
                        err: 'Not an image'
                    })
                }
            });
        }
    }
    // image_delete: async function (req,res) {
      
    // },
    // profileBy: async function (req,res) {
       
    // }
}


