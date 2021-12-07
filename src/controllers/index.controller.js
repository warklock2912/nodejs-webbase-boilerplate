const indexPage = async (req, res) => {
    if (request.session.loggedin) {
        res.render('index', {title: 'Welcome'})
    } else {
        res.send('Please login to view this page!');
        res.redirect('/login') 
    }
}

export {
    indexPage
}
