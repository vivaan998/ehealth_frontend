var path = require('path');

var root = path.join(__dirname);

var config = {
    rootDir:                root,
    // Targets ========================================================
    // serveDir:               path.join(root, '.serve'),
    // distDir:                path.join(root, 'dist'),
    // clientManifestFile:     'manifest.webpack.json',
    // clientStatsFile:        'stats.webpack.json',

    // Source Directory ===============================================
    srcDir:                 path.join(root, 'src'),
    srcServerDir:           path.join(root, 'server'),

    // HTML Layout ====================================================
    srcHtmlLayout:          path.join(root, 'public', 'index.html'),

    // Site Config ====================================================
    siteTitle:              'eHealth.my',
    siteDescription:        'description goes here (to edit go to config.js)',
    siteCannonicalUrl:      'http://localhost:3000',
    siteKeywords:           'site keyword goes here (to edit go to config.js)',
    scssIncludes:           []
}

module.exports = config;