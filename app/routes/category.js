// Dependencies
var Category = require('../models/category');

/**
 * Category routes
 * @param app
 **/
module.exports = function(app){

  // Private

  /**
   * Form to insert a new category inside the system
   * @param   req
   * @param   res
   * @private
   **/
  _insertNewCategoryForm = function(req, res){
    res.render('./category/insert.twig', {});
  };

  /**
   * Request to insert a new category
   * @param   req
   * @param   res
   * @private
   **/
  _insertNewCategory = function(req, res){
  };

  /**
   * Obtain all categories
   * @param   req
   * @param   res
   * @private
   **/
  _seeAllCategories = function(req, res){
    var query = Category.find().lean();

    query.exec(function(err, conj){
      if(err){
        res.send(err);
      }

      res.send(conj);
    });
  };

  // Calls

  // Obtain all categories
  app.get('/category/all/', _seeAllCategories);

  // Form to insert a new category
  app.get('/category/insert/', _insertNewCategoryForm);

  // Call to insert a new category
  app.post('category/insert/', _insertNewCategory);
}
