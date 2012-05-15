/**
 *
 * @namespace controller
 *
 * @description controllers base definition is here or something
 *
 */
/**
 * @module home
 * @description welcome page controller
 */
exports.index = function (req, res) {
  res.render('home/index', {
        value: req.session.value,
        title: 'Welcome'
    });
};
