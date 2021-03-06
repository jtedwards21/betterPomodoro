
var Clock = React.createClass({
  getInitialState(){

    return {
      shortBreakTime: 3,
      longBreakTime: 15,
      workTime: 25,
      cishu: 4,
      timesLeft: 4,
      currentAction: "Off",
      clock:{},
      active: false
    };
  },
　　componentDidMount(){
    var clock;
    var that = this;
    clock = $('#my-clock').FlipClock(0, {
	clockFace: 'MinuteCounter',
	countdown: true,
	autoStart: false,
	callbacks: {
			stop: function() {
		        	if(that.state.active == true){that.changeAction();}
		        }
		    }
	});
    this.setState({clock:clock})
  },
  startPomodoro(){
    if(this.state.currentAction == "Off"){
    this.setState({timesLeft: this.state.cishu});
    this.changeAction();}
  },
  resetPomodoro(){
　　　　console.log('check');
    this.setState({
      currentAction: "Off",
      active: false,
      timesLeft: 0})
    
    this.state.clock.setTime(0);
    this.state.clock.stop();
  },
  changeAction(){
    var action = this.state.currentAction;
    var next;
　　　　if(action == "Off"){
      next = "Start Working";
    }  else if(action == "Working" && this.state.timesLeft !== 0){
         next = "Start a Short Break";
       } else if(action == "Taking a Short Break"){
            next = "Start Working";
         } else if(action == "Working" && this.state.timesLeft == 0){
	    next = "Turn Off";
	   }
     switch(next){
	case "Start Working":
	  this.state.clock.setTime(this.state.workTime * 60);
          this.state.clock.start();
          this.setState({currentAction: "Working", active: true});
	  break;
	case "Start Short Break":
	  var t = this.state.timesLeft;
          this.state.clock.setTime(this.state.shortBreakTime * 60);
          this.state.clock.start();
	  this.setState({currentAction: "Taking a Short Break", timesLeft: t-1});
	  break;
        case "Turn Off":
	  this.setState({currentAction: "Off"});
	  break;
     }
  },
  render() {
    var on = {cursor: "pointer"}
    var off = {cursor: "default"}
    var startCursor;
    var stopCursor;
    var adjustCursor;
    if(this.state.currentAction == "Off"){
	startCursor = on;
        stopCursor = off;
        adjustCursor = on;
    } else {
	stopCursor = on;
        startCursor = off;
	adjustCursor = off;
    }

    return (
      <div　className="row">
      <div className="box col-md-8 col-md-offset-2">
        <div className="text-center title">Pomodoro Clock</div>
	<div className="text-center sub-title">A PRODUCTIVITY TIMER</div>
	<div className="info text-center">
        <span>Currently: {this.state.currentAction}</span>
        <span>Remaining Cycles: {this.state.timesLeft}</span>
        </div>
        <Adjuster adjustCursor={adjustCursor} key={2} hideMenu={this.hideMenu}　shortBreakTime={this.state.shortBreakTime} longBreakTime={this.state.longBreakTime} workTime={this.state.workTime} cishu={ this.state.cishu} shortBreakMinus={this.shortBreakMinus} shortBreakPlus={this.shortBreakPlus} longBreakMinus={this.longBreakMinus} longBreakPlus={this.longBreakPlus} workTimeMinus={this.workTimeMinus} workTimePlus={this.workTimePlus} cishuMinus={this.cishuMinus} cishuPlus={this.cishuPlus} />
      <div className="col-md-12"><div className="clock-container"><div id="my-clock"></div></div></div>
      
      <div className="bottom-button-container">
        <div className="my-buttons">
	  <div className="start-button" style={startCursor} onClick={this.startPomodoro}>Start</div>
　　　　　　　　  <div className="stop-button" style={stopCursor} onClick={this.resetPomodoro}>Stop</div>
	</div>
      </div>
　　　　　　
      </div>
      </div>
    );
  },
  shortBreakMinus(event) {
    var n = this.state.shortBreakTime;
    if(n !== 1 && this.state.currentAction == "Off"){
    n = n - 1;
    this.setState({shortBreakTime:n});}
  },
  shortBreakPlus(event) {
    var n = this.state.shortBreakTime;
    if(this.state.currentAction == "Off"){
    n = n + 1;
    this.setState({shortBreakTime:n});}
  },
  longBreakMinus(event) {
    var n = this.state.longBreakTime;
    if(n !== 1 && this.state.currentAction == "Off"){
    n = n - 1;
    this.setState({longBreakTime:n});}
  },
  longBreakPlus(event) {
    var n = this.state.longBreakTime;
    if(this.state.currentAction == "Off"){
    n = n + 1;
    this.setState({longBreakTime:n});}
  },
  workTimeMinus(event) {
    var n = this.state.workTime;
    if(n !== 1 && this.state.currentAction == "Off"){
    n = n - 1;
    this.setState({workTime:n});}
  },
  workTimePlus(event) {
    var n = this.state.workTime;
    if(this.state.currentAction == "Off"){
    n = n + 1;
    this.setState({workTime:n});}
  },
  cishuMinus(event) {
    var n = this.state.cishu;
    if(n !== 1 && this.state.currentAction == "Off"){
    n = n - 1;
    this.setState({cishu:n});}
  },
  cishuPlus(event) {
    var n = this.state.cishu;
    if(this.state.currentAction == "Off"){
    n = n + 1;
    this.setState({cishu:n});}
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
	      <div style={this.props.adjustCursor} className="left-btn adjust-btn" onClick={this.props.shortBreakMinus}><i className="glyphicon glyphicon-minus"></i></div>
              <div className="display-number">{this.props.shortBreakTime}</div>
	      <div style={this.props.adjustCursor} className="right-btn adjust-btn"  onClick={this.props.shortBreakPlus}><i className="glyphicon glyphicon-plus"></i></div>
	    </div>
	  </div>

	　　<div className="form-group setting-group col-md-2 text-center">
	　　  <label className="control-label">Long Break</label>
	    <div className="button-container">
	      <div style={this.props.adjustCursor} className="left-btn adjust-btn" onClick={this.props.longBreakMinus}><i className="glyphicon glyphicon-minus"></i></div>
              <div className="display-number">{this.props.longBreakTime}</div>
	      <div style={this.props.adjustCursor} className="right-btn adjust-btn"  onClick={this.props.longBreakPlus}><i className="glyphicon glyphicon-plus"></i></div>
	    </div>
 	  </div>

	　　<div className="form-group setting-group col-md-2 text-center">
	　　  <label className="control-label">Work Time</label>
	    <div className="button-container">
	      <span style={this.props.adjustCursor} className="left-btn adjust-btn" onClick={this.props.workTimeMinus}><i className="glyphicon glyphicon-minus"></i></span>
              <div className="display-number">{this.props.workTime}</div>
	      <span style={this.props.adjustCursor} className="right-btn adjust-btn"  onClick={this.props.workTimePlus}><i className="glyphicon glyphicon-plus"></i></span>
	    </div>
	  </div>

	　　<div className="form-group setting-group col-md-2 text-center">
	　　  <label className="control-label"># of Times</label>
	    <div className="button-container">
	      <span style={this.props.adjustCursor} className="left-btn adjust-btn" onClick={this.props.cishuMinus}><i className="glyphicon glyphicon-minus"></i></span>
              <div className="display-number">{this.props.cishu}</div>
	      <span style={this.props.adjustCursor} className="right-btn adjust-btn"  onClick={this.props.cishuPlus}><i className="glyphicon glyphicon-plus"></i></span>
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
