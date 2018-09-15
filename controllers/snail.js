/**
 * GET /snail/
 * Snail form.
 */
exports.getSnail = (req, res) => {
  res.render('snail.ejs', {
    title: 'Snail'
  });
};

/**
 * POST /snail/
 * Snail form.
 */
exports.postSnail = (req, res) => {
  res.render('snail.ejs', {
    title: 'Snail'
  });
};
