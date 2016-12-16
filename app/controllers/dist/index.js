
var Clock = React.createClass({
  getInitialState(){

    return {
      shortBreakTime: 3,
      longBreakTime: 15,
      workTime: 25,
      cishu: 4,
      timesLeft: 4,
      menu: false,
      endTime: 0,
      minutes: 0,
      seconds: 0,
      currentAction: "",
      currentTimeLength: 0,
      currentInterval: {},
      clock:{}
    };
  },
　　componentDidMount(){
    var clock;
			
    clock = $('#my-clock').FlipClock(0, {
	clockFace: 'MinuteCounter',
	countdown: true,
	autoStart: false,
	callbacks: {
			stop: function() {
		        	this.changeAction();
		        }
		    }
	});
    this.setState({clock:clock})
  },
  startPomodoro(){
    this.changeAction();
  },
  resetPomodoro(){
    console.log('reset');
  },
  changeAction(){
    var action = this.state.currentAction;
　　　　if(action == ""){
      this.state.clock.setTime(this.state.workTime * 60);
      this.state.clock.start();
      this.setState({currentAction: "workTime"});
    }  else if(action == "workTime" && this.state.timesLeft !== 0){
         this.state.clock.setTime(this.state.shortBreakTime * 60);
         this.state.clock.start();
	 this.setState({currentAction: "shortBreakTime"});
       } else if(action == "shortBreakTime"){
            this.state.clock.setTime(this.state.workTime * 60);
            this.state.clock.start();
	    this.setState({currentAction: "workTime"})
         } else if(action == "workTime" && this.state.timesLeft == 0){
		this.setState({currentAction: "Finished!!"});
	   }
  },
  render() {
    return (
      <div　className="row">
      <div className="box col-md-8 col-md-offset-2">
        <div className="text-center title">Pomodoro Clock</div>
	<div className="text-center sub-title">A PRODUCTIVITY TIMER</div>
	<div className="info text-center">
        <span>Currently: {this.state.currentAction}</span>
        <span>Remaining Cycles: {this.state.cishu}</span>
        </div>
        <Adjuster key={2} hideMenu={this.hideMenu}　shortBreakTime={this.state.shortBreakTime} longBreakTime={this.state.longBreakTime} workTime={this.state.workTime} cishu={ this.state.cishu} shortBreakMinus={this.shortBreakMinus} shortBreakPlus={this.shortBreakPlus} longBreakMinus={this.longBreakMinus} longBreakPlus={this.longBreakPlus} workTimeMinus={this.workTimeMinus} workTimePlus={this.workTimePlus} cishuMinus={this.cishuMinus} cishuPlus={this.cishuPlus} />
      <div className="col-md-12"><div className="clock-container"><div id="my-clock"></div></div></div>
      
      <div className="resetButtons">
	<div className="btn btn-primary col-md-1 col-md-offset-5" onClick={this.startPomodoro}>Start</div>
　　　　　　　　<div className="btn btn-warning col-md-1" onClick={this.resetPomodoro}>Reset</div>
      </div>
      </div>
      </div>
    );
  },
  shortBreakMinus(event) {
    var n = this.state.shortBreakTime;
    n = n - 1;
    this.setState({shortBreakTime:n});
  },
  shortBreakPlus(event) {
    var n = this.state.shortBreakTime;
    n = n + 1;
    this.setState({shortBreakTime:n});
  },
  longBreakMinus(event) {
    var n = this.state.longBreakTime;
    n = n - 1;
    this.setState({longBreakTime:n});
  },
  longBreakPlus(event) {
    var n = this.state.longBreakTime;
    n = n + 1;
    this.setState({longBreakTime:n});
  },
  workTimeMinus(event) {
    var n = this.state.workTime;
    n = n - 1;
    this.setState({workTime:n});
  },
  workTimePlus(event) {
    var n = this.state.workTime;
    n = n + 1;
    this.setState({workTime:n});
  },
  cishuMinus(event) {
    var n = this.state.cishu;
    n = n - 1;
    this.setState({cishu:n});
  },
  cishuPlus(event) {
    var n = this.state.cishu;
    n = n + 1;
    this.setState({cishu:n});
  }
})




var Adjuster = React.createClass({
  getInitialState() {
	return {}
  },
　　render() {
    return (
	<div className="adjuster">
	<div className="">

	  <form　className="form col-md-12">
	  <div className="form-group setting-group col-md-2 col-md-offset-2 text-center">
	　　  <label className="control-label">Short Break</label>
	    <div className="button-container">
	      <div className="left-btn adjust-btn" onClick={this.props.shortBreakMinus}><i className="glyphicon glyphicon-minus"></i></div>
              <div className="display-number">{this.props.shortBreakTime}</div>
	      <div className="right-btn adjust-btn"  onClick={this.props.shortBreakPlus}><i className="glyphicon glyphicon-plus"></i></div>
	    </div>
	  </div>

	　　<div className="form-group setting-group col-md-2 text-center">
	　　  <label className="control-label">Long Break</label>
	    <div className="button-container">
	      <div className="left-btn adjust-btn" onClick={this.props.longBreakMinus}><i className="glyphicon glyphicon-minus"></i></div>
              <div className="display-number">{this.props.longBreakTime}</div>
	      <div className="right-btn adjust-btn"  onClick={this.props.longBreakPlus}><i className="glyphicon glyphicon-plus"></i></div>
	    </div>
 	  </div>

	　　<div className="form-group setting-group col-md-2 text-center">
	　　  <label className="control-label">Work Time</label>
	    <div className="button-container">
	      <span className="left-btn adjust-btn" onClick={this.props.workTimeMinus}><i className="glyphicon glyphicon-minus"></i></span>
              <div className="display-number">{this.props.workTime}</div>
	      <span className="right-btn adjust-btn"  onClick={this.props.workTimePlus}><i className="glyphicon glyphicon-plus"></i></span>
	    </div>
	  </div>

	　　<div className="form-group setting-group col-md-2 text-center">
	　　  <label className="control-label"># of Times</label>
	    <div className="button-container">
	      <span className="left-btn adjust-btn" onClick={this.props.cishuMinus}><i className="glyphicon glyphicon-minus"></i></span>
              <div className="display-number">{this.props.cishu}</div>
	      <span className="right-btn adjust-btn"  onClick={this.props.cishuPlus}><i className="glyphicon glyphicon-plus"></i></span>
	    </div>
	  </div>
	  </form>
	</div>
	</div>
    )
  }
})


	



ReactDOM.render(
  <Clock  />,
  document.getElementById('container')
)
