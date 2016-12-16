var MockRecipes = [{id:0, name:'dog', ingredients:[{name:"hi", id:3}, {name:"l", id: 5}]},{id:1, name:'dog', ingredients:[{name:"hi", id:3}, {name:"l", id: 5}]},{id:2, name:'dog', ingredients:[{name:"hi", id:3}, {name:"l", id: 5}]}];






var Controller = React.createClass({
　　getInitialState(){
	return{recipes:　this.props.recipes, view: "menu", viewedRecipe: {}}
  },
  addRecipe(r){
    var recipes = this.state.recipes.slice();
    r.id = recipes.length;
    recipes.push(r);
    this.setState({recipes:recipes, view: "menu"});
  },
  deleteRecipe(i){
    var recipes = this.state.recipes;
    var front = recipes.slice(0, i);
    var back = recipes.slice(i+1);
    recipes = front.concat(back);
    console.log(recipes);
    recipes.map(function(r, i){
	r.id = i;
        return r;
    })
    this.setState({recipes:recipes, view: "menu"});
  },
  saveRecipe(r){
    var recipes = this.state.recipes.slice();
    var n = r.id;
    recipes[n] = r;
    this.setState({recipes:recipes, view: "menu"})
  },
  changeView(view, recipe){
    if(view == "view"){this.setState({viewedRecipe:recipe, view:"view"})}
    if(view == "menu"){this.setState({viewedRecipe:{}, view:"menu"})}
　　　　if(view == "add"){this.setState({viewedRecipe:{},view:"add"})}
　　　　if(view == "edit"){this.setState({viewedRecipe:recipe, view:"edit"})}
  },
  render(){
    var current;
    if(this.state.view == "edit"){current = <EditRecipe recipe={this.state.viewedRecipe} deleteRecipe={this.deleteRecipe} changeView={this.changeView} saveRecipe={this.saveRecipe}/>}
    if(this.state.view == "menu"){current = <Menu recipes={this.state.recipes} changeView={this.changeView} />}
    if(this.state.view == "add"){current = <AddRecipe addRecipe={this.addRecipe}　changeView={this.changeView} />}
    if(this.state.view == "view"){current = <Viewer recipe={this.state.viewedRecipe} changeView={this.changeView} />}
    return(<div className="row"><div className="col-md-6 col-md-offset-3"><div className="well well-lg">{current}</div></div></div>)
  }
})



var EditRecipe = React.createClass({
　　getInitialState(){
	return{recipe: this.props.recipe}
  },
  handleNameChange(e){
    var recipe = this.state.recipe;
    recipe.name = e.target.value;
    this.setState({recipe:  recipe})
  },
  addIngredient(){
    var recipe = this.state.recipe;
    var n = recipe.ingredients.length;
    recipe.ingredients.push({id:n, name:""})
    this.setState({recipe: recipe})
  },
  saveRecipe(){
    var recipe = this.state.recipe;
　　　　this.props.saveRecipe(recipe)
  },
  returnToMenu(){
    this.props.changeView("menu", null);
  },
  deleteRecipe(){
    var recipe = this.state.recipe;
    var i = recipe.id;
    this.props.deleteRecipe(i);
  },
  render() {

    var that = this;
    var ingredients = this.state.recipe.ingredients
    console.log(ingredients)
    ingredients = ingredients.map(function(item, i){
      
       var handleChange = function(e){
         var recipe = that.state.recipe;
         recipe.ingredients[i].name = e.target.value;
         that.setState({recipe: recipe});
       };
      
       return <Ingredient key={item.id} id={item.id} value={item.name} handleChange={handleChange} />
     })


    return(
          <form className="form-horizontal">
	      
　　　　　　　　　　　　　　<div className="panel panel-primary">
                  <div className="panel-heading">
                    <h3 className="panel-title text-center">Edit Recipe</h3>
                  </div>
                  <div className="panel-body">
		    <div className="form-group">
		      <label className="col-md-3">Name</label>
	              <div className="col-md-9">
	                <input id="recipe-name" value={this.state.recipe.name} onChange={this.handleNameChange} className="form-control" placeholder="Name" type="text"/>
	              </div>
	            </div>
                    {ingredients}
		    <div className="form-group">
		      <div className="col-md-3 text-center">
	                <div className="btn btn-primary" onClick={this.saveRecipe}>Save</div>
		      </div>
		      <div className="col-md-3 text-center">
                        <div className="btn btn-default" onClick={this.addIngredient}>Add Ingredient</div>
		      </div>
		      <div className="col-md-3 text-center">
                        <div className="btn btn-warning" onClick={this.returnToMenu}>Go Back</div>
		      </div>
		      <div className="col-md-3 text-center">
                        <div className="btn btn-warning" onClick={this.deleteRecipe}>Delete</div>
		      </div>
	            </div>
                  </div>
               　</div>
	      
	    </form>
    )
  }
})





var AddRecipe = React.createClass({
　　getInitialState(){
	return {recipeName: "", ingredients: [{id:0, name:""}]}
  },
  handleNameChange(e){
    this.setState({recipeName:  e.target.value})
  },
  addRecipe(){
    var recipe = {}
    recipe.name = this.state.recipeName;
    recipe.ingredients = this.state.ingredients;
    this.props.addRecipe(recipe);
  },
  addIngredient(){
    var ingredients = this.state.ingredients.slice();
    var n = ingredients.length;
    ingredients.push({id:n, name:""})
    this.setState({ingredients: ingredients})
  },
  returnToMenu(){
    this.props.changeView("menu", null);
  },
  render() {

    var that = this;

    var ingredients = this.state.ingredients.map(function(item, i){
      
       var handleChange = function(e){
	console.log(that.state.ingredients[i]);
　　　　　　　　　var ingredients = that.state.ingredients;
         ingredients[i].name = e.target.value;
         that.setState({ingredients: ingredients});
       };
      
       return <Ingredient key={item.id} id={item.id} value={item.name} handleChange={handleChange} />
     })


    return(
          <form className="form-horizontal">
	      
　　　　　　　　　　　　　　<div className="panel panel-primary">
                  <div className="panel-heading">
                    <h3 className="panel-title text-center">Add Recipe</h3>
                  </div>
                  <div className="panel-body">
		    <div className="form-group">
		      <label className="col-md-3">Name</label>
	              <div className="col-md-9">
	                <input id="recipe-name" value={this.state.recipeName} onChange={this.handleNameChange} className="form-control" placeholder="Name" type="text"/>
	              </div>
	            </div>
                    {ingredients}
		    <div className="form-group">
		      <div className="col-md-4 text-center">
	                <div className="btn btn-primary" onClick={this.addRecipe}>Add</div>
		      </div>
		      <div className="col-md-4 text-center">
                        <div className="btn btn-default" onClick={this.addIngredient}>Add Ingredient</div>
		     </div>
		     <div className="col-md-4 text-center">
                        <div className="btn btn-warning" onClick={this.returnToMenu}>Go Back</div>
		     </div>
	            </div>
                  </div>
               　</div>
	      
	    </form>
    )
  }
})





var Ingredient = React.createClass({
  render() {
    return (
	<div className="form-group">
	  <label　className="col-md-3">Ingredient {this.props.id + 1}</label>
	  <div className="col-md-9">
	    <input id="recipe-name" value={this.props.value} onChange={this.props.handleChange} className="form-control" placeholder="Ingredient" type="text" />
	  </div>
	</div>
    );
  }
})





var Menu = React.createClass({
　　getInitialState(){
	return{recipes: this.props.recipes}
  },
  deleteRecipe(i){
    this.props.deleteRecipe(i);
  },
  viewRecipe(i){
    var recipes = this.state.recipes;
    this.props.changeView("view", recipes[i]);
  },
  addRecipe(){
    var recipes = this.state.recipes;
    this.props.changeView("add", null);
  },
  render() {
    var recipes = this.state.recipes.slice();
    var that = this;

    recipes = recipes.map(function(r,i){
       var handleView = function(){
	 that.viewRecipe(i);
       }

      return <Recipe handleView={handleView} id={r.id} name={r.name} ingredients={'Hi'}/>
    })  

    return(
      
      　　    <div　className="menu">
	        <div className="panel panel-primary">
                  <div className="panel-heading">
                    <h3 className="panel-title text-center">Recipe Box</h3>
                  </div>
                  <div className="panel-body">
                    <table className="table table-hover">
	        <thead>
		　　<tr>
		    <th>#</th>
		    <th>Name</th>
		    <th>View</th>
		  </tr>
		</thead>
	        <tbody>
                  {recipes}
	        </tbody>
	      </table>
                  </div>
                 </div>
	      
	      <div className="text-center">
	        <div className="btn btn-large btn-default" onClick={this.addRecipe}>
	        Add a Recipe</div>
	      </div>
	    </div>
    )
  }
})

var Recipe = React.createClass({
  getInitialState(){
    return {}
  },
  render(){
    return (
      <tr>
	<th>{this.props.id + 1}</th>
	<td>{this.props.name}</td>
        <td><div className="btn btn-primary" onClick={this.props.handleView} >View</div></td>
      </tr>
    );
  }
})





var Viewer = React.createClass({
　　getInitialState(){
	return{recipe: this.props.recipe}
  },
  editRecipe(){
    var recipe = this.state.recipe;
    this.props.changeView("edit", recipe)
  },
  returnToMenu(){
    var recipe = this.state.recipe;
    this.props.changeView("menu", recipe)
  },
  render() {
    console.log('l');
    console.log(this.state.recipe);
    var ingredients = this.state.recipe.ingredients.slice();
    ingredients = ingredients.map(function(item){
	return <ShowIngredient key={item.id} id={item.id} value={item.name} />
    })
    
    return(
	　　　　<div className="viewer text-center">
              <div className="dis-cont">
	      <div className="display-header">
	      </div>
	      </div>
              <div className="panel panel-primary">
                <div className="panel-heading">
                  <h3 className="panel-title">{this.state.recipe.name}</h3>
                </div>
                <div className="panel-body">
                  {ingredients}
		  <div className="col-md-6 text-center">
	            <div onClick={this.editRecipe} className="btn btn-primary">Edit</div>
		  </div>
		  <div className="col-md-6 text-center">
		    <div onClick={this.returnToMenu} className="btn btn-default">Return</div>
		  </div>
                </div>
              </div>
	    </div>
    )
  }
})



var ShowIngredient = React.createClass({
  render() {
    return (
	<div　className="show-ingredient">
	  <label　className="title col-md-6">Ingredient {this.props.id + 1}</label>
	  <div className="col-md-6">
	    {this.props.value}
	  </div>
	</div>
    );
  }
})





ReactDOM.render(
  <Controller recipes={MockRecipes} />,
  document.getElementById('container')
)
