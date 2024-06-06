const Words = require('../models/words');

module.exports.read = (req, res) => {

    Words.aggregate([
        {
            $match: {

            }
        },
        {
            $unwind: "$words"
        },
        {
            $project: {
                _id: 0,
                en: "$words.en",
                pl: "$words.pl",
                category: 1
            }
        }
    ])
        .then((result) => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.sendStatus(500);
        })

}

module.exports.category = (req, res) => {

    Words.aggregate([
        {
            $match: {
                category: req.params.category
            }
        },
        {
            $unwind: "$words"
        },
        {
            $project: {
                _id: 0,
                en: "$words.en",
                pl: "$words.pl",
                category: 1
            }
        }
    ])
        .then((result) => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.sendStatus(500);
        })

}

module.exports.wordsList = (req, res) => {

    Words.aggregate([
        {
            $match: {

            }
        },
        {
            $project: {
                _id: 0,
                category: 1,
                image: 1,
                words: { $size: "$words" }
            }
        }
        // {
        //     $unwind: "$words"
        // },
        // {
        //     $group: {
        //         _id: { category: "$category" },
        //         books: { $push: "$$ROOT" }
        //     }
        // }


    ])
        .then((result) => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json(err);
        })

}


module.exports.create = (req, res) => {

    Words.updateOne({ category: req.body.category },
        {
            $addToSet: { words: req.body.words },
            $setOnInsert: { image: req.body.image }
        },
        { upsert: true })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.sendStatus(500);
        })
}