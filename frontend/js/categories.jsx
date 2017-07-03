const React = require('react');
const request = require('superagent');
const baseUrl = 'http://localhost:' + process.env.PORT;

const Categories = React.createClass({
  loadCategoryData: function() {
    this.serverRequest = request.get(baseUrl + '/api/categories')
    .end(function(err, res) {
      // console.log(res);
      var categories = JSON.parse(res.body.data);
      console.log(categories);
      this.setState({ categories: categories, });
    }.bind(this))
  },

  getInitialState: function() {
    return {
      categories: []
    };
  },

  componentDidMount: function() {
    this.loadCategoryData();
  },

  render: function() {
    return (
      <div className="categories-added">
        <h1>Categories</h1>
        <NewCategory data={this.state.categories}/>
      </div>
    )
  }
});

const CategoryList = React.createClass({
  handleDelete: function(e) {
    var categorys = this;
    var tv = e.target.value;
    var category = this.props.data[tv];
    var categoryId = cateogy.id_str;
    return this.serverRequest = request.del(baseUrl + '/api/categories/' + categoryId)
    .end(function(err, res) {
      if (err) return console.log(err);
      categorys.props.data.splice(tv, 1);
      categorys.setState(categorys.props.data);
    }.bind(this));
  },
  render: function() {
    return (
      <ul className="categories">
        {this.props.data.map(function(category, categoryIndex) {
          return <li key={categoryIndex}>
            {category.text}<button className="btn btn-default" category={category} onClick={this.handleDelete} value={categoryIndex}>Delete</button>
          </li>
        }.bind(this))}
      </ul>
    )
  }
});

const NewCategory = React.createClass({
  addCat: function(e) {
    var categories = this;
    e.preventDefault();
    var categoryValue = e.target.categoryinput.value;
    e.target.categoryinput.value = '';
    this.serverRequest = request.post(baseUrl + '/api/categories')
    .send({ keyword: categoryValue })
    .end(function(err, res) {
      categories.props.data.unshift(res.body.data);
      categories.setState(categories.props.data);
    }.bind(this));
  },
  render: function() {
    return (
    <div>
    <form onSubmit={this.addCat}>
      <input type="text" name="categoryinput" />
      <button>add Category</button>
    </form>
    <CategoryList data={this.props.data}/>
    </div>

  )
  }
});

module.exports = exports = Categories;
