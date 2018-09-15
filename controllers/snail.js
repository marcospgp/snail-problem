const ClimbLog = require('../models/ClimbLog');

/**
 * Calculates Snail well-climbing success or failure
 */
function climbWell(height, up, down, fatigue) {
  const dailyClimbLoss = up * (fatigue / 100); // How much less height the snail climbs each day
  let y = 0; // The current height of the snail'
  let climbingRate = up; // The current climbing rate of the snail, which decreases each day

  // Success and day will represent the snail status at the end of the loop
  let success = false;
  let day = 1;

  console.log(`height: ${height}, up: ${up}, down: ${down}, fatigue: ${fatigue}`);

  while (y >= 0) {
    // Snail climbs
    y += climbingRate;

    // Check success
    if (y > height) {
      success = true;
      break;
    }

    // Snail falls
    y -= down;

    // Check failure
    if (y < 0) {
      break;
    }

    // Update climbing rate
    climbingRate = Math.max(0, climbingRate - dailyClimbLoss);

    // Update day
    day++;
  }

  return { success, day };
}

/**
 * Logs a climb on the database
 */
async function logClimb(h, u, d, f, result) {
  await ClimbLog.create({
    h, u, d, f, result
  });
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
exports.postSnail = async (req, res) => {
  if (
    !req.body
    || !req.body.h
    || !req.body.u
    || !req.body.d
    || !req.body.f
  ) {
    res.status(400).send({ status: '400 BAD REQUEST', message: 'missing parameter' });
    return;
  }

  const { h, u, d, f } = req.body; // eslint-disable-line

  const max = Math.max(h, u, d, f);
  const min = Math.max(h, u, d, f);

  if (max > 100 || min < 1) {
    res.status(400).send({ status: '400 BAD REQUEST', message: 'parameters must be between 1 and 100 (inclusive)' });
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

  // Add climb log to the database
  try {
    await logClimb(h, u, d, f, result);
  } catch (e) {
    console.error(e);
    res.status(500).send({
      status: '500 ERROR',
      message: 'Failed to log climb on the database.'
    });
    return;
  }

  res.status(200).send({
    status: '200 OK',
    message: result
  });
};
