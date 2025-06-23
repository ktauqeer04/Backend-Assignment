const { StatusCodes } = require("http-status-codes");
const { Video } = require('../db/index');



const getVideos = async (req, res) => {


    try {    

        const page = Number(req.query.page) <= 0 || !Number(req.query.page) ? 1 : Number(req.query.page);
        const limit = 5;
        const skip = (page - 1) * limit;

        const totalCount = await Video.countDocuments();

        const videos = await Video.find()
            .sort({ uploadDate: -1 })
            .skip(skip)
            .limit(limit)
            .populate('uploader', 'name');

        const response = videos.map(v => ({
            id:         v._id,
            title:      v.title,
            videoUrl:   v.url,
            uploader: {
                id:   v.uploader._id,
                name: v.uploader.name
            },
            uploadDate: v.uploadDate
        }));


        const totalPages = Math.ceil(totalCount / limit);

        return res.status(StatusCodes.OK).json({
            page,
            limit,
            totalCount,
            totalPages,
            videos: response
        });

    } catch (err) {

        console.error('Error fetching videos:', err);
        return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'Failed to load videos' });

    }
}


const postVideo = async (req, res) => {

    try {
        
        const title = req.body.title;
        const description = req.body.description;
        const videoFile = req.file;


        const videoUpload = new Video({
            title,
            description,
            url: videoFile.path,
            uploader: req.user
        });

        await videoUpload.save();


        return res.status(StatusCodes.OK).json({
            title, 
            description
        });

    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "something went wrong"
        });
    }

}

module.exports = {
    getVideos,
    postVideo
}