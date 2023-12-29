// Get all stores
const Store = require("../models/Store")
exports.getStores = async (req, res, next) => {
    try {
        const stores = await Store.find();
        return res.status(200).json({
            success: true,
            count: stores.length,
            data: stores
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: "Server error"
        })
    }
}

exports.addStore = async (req, res, next) => {
    const url = `${process.env.URL_BODY} ${req.body.address}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.API_KEY,
            'X-RapidAPI-Host': process.env.HOST
        }
    };
    let newObj;
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        newObj = {
            storeId: req.body.storeId,
            address: req.body.address,
            longitude: result.Results[0].longitude,
            latitude: result.Results[0].latitude
        }
    } catch (error) {
        console.error(error);
    }

    try {
        const store = await Store.create(newObj)
        return res.status(200).json({
            "success": true
        })
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({ error: "This store already exists" })
        }
        console.log(err);
        return res.status(500).json({
            error: "Server error"
        })
    }
}
