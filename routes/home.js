var index = function(req, res) {
    res.render('index', {
        title: 'Hello World!', watchlist: req.trademe.watchlist.List
    })
};

exports.index = index;