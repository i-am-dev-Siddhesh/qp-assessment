import rateLimit from 'express-rate-limit';

// Define a rate limiter for 1 request per 2 minutes
const perTwoMinutesLimiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes
  max: 1, // Allow 1 request per 2 minutes per IP
  handler: (req, res) => {
    return res
      .status(429)
      .json({ message: 'Too many requests, please try again later.' });
  },
});

// Define a rate limiter for 10 requests per 24 hours
const perTwentyFourHoursLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 10, // Allow 10 requests per 24 hours per IP
  handler: (req, res) => {
    return res
      .status(429)
      .json({ message: 'Too many requests, please try again later.' });
  },
});

export { perTwentyFourHoursLimiter, perTwoMinutesLimiter };
