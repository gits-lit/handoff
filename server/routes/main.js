const router = require('express')();
const f = require('../util/system');

router.post('/saveFile/', async (req, res) => {
    let fileName = req.body.name;
    let content = req.body.content;

    if (fileName && fileName.length > 0)
        if (content && content.length > 0)
            res.json(await f.saveFile(fileName, content));
        else
            res.json(f.createError('Please provide the contents of the file.'));
    else
        res.json(f.createError('Please provide a valid file name.'));
});

router.get('/loadFile/', async (req, res) => {
    let fileName = req.query.name;

    if (fileName && fileName.length > 0)
        res.json(await f.loadFile(fileName));
    else
        res.json(f.createError('Please provide a valid file name.'));
});

router.get('/loadFiles/', async (req, res) => res.json(await f.loadFiles()));

module.exports = router;