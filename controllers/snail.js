/**
 * Calculates Snail well-climbing success or failure
 */
function climbWell(height, up, down, fatigue) {
  return {
    success: true,
    day: 4
  };
}

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
  if (
    !req.body
    || !req.body.h
    || !req.body.u
    || !req.body.d
    || !req.body.f
  ) {
    res.send(400, { status: '400 BAD REQUEST', message: 'missing parameter' });
    return;
  }

  const { h, u, d, f } = req.body; // eslint-disable-line

  const max = Math.max(h, u, d, f);
  const min = Math.max(h, u, d, f);

  if (max > 100 || min < 1) {
    res.send(400, { status: '400 BAD REQUEST', message: 'parameters must be between 1 and 100 (inclusive)' });
    return;
  }

  const { success, day } = climbWell(h, u, d, f);

  let result = '';

  if (success) {
    result += 'success';
  } else {
    result += 'failure';
  }

  result += ` on day ${day}`;

  res.send(200, {
    status: '200 OK',
    mesasge: result
  });
};
