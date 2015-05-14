module.exports = exports = function (res, type) {
  switch (type) {
  case 'DB':
    res.status(500).send('Database error');
    break;
  case 'USER':
    res.status(400).send('Invalid request');
    break;
  default:
    res.status(400).send(type);
  };
};
