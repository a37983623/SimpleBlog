class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}


class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
			date: new Date(),
			userName: "Rex",
			content: dfasofdjsacxvcxcvx
		};
  }

  render() {
    return (
		<div>
			<h1>Hello, world!</h1>
			<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
		</div>
	  
		<div className="post rounded" data-toggle="modal" data-target="#myModal">
			<div className="user-and-date">{this.state.date.toLocaleTimeString()} - {this.state.userName}</div>
			<div className="post-content">
				<p>{this.state.content}</p>
			</div>
		</div>
    );
  }
}

function Post() {
  return (
			<div className="post rounded" data-toggle="modal" data-target="#myModal">
				<div className="user-and-date">May 2017 - Rex</div>
				<div className="post-content">
					<p>d;lsajfodiasfjdsl;afjdsoiafjd;slafjdsaoifd</p>
				</div>
			</div>
			<div className="post rounded" data-toggle="modal" data-target="#exampleModal">
				<div class="user-and-date">May 2017 - Rex</div>
				<div class="post-content">
					d;lsajfodiasfjdsl;afjdsoiafjd;slafjdsaoifd
				</div>
			</div>
			<div class="post rounded" data-toggle="modal" data-target="#exampleModal">
				<div class="user-and-date">May 2017 - Rex</div>
				<div class="post-content">
					d;lsajfodiasfjdsl;afjdsoiafjd;slafjdsaoifd
				</div>
			</div>
			<div class="post rounded" data-toggle="modal" data-target="#exampleModal">
				<div class="user-and-date">May 2017 - Rex</div>
				<div class="post-content">
					d;lsajfodiasfjdsl;afjdsoiafjd;slafjdsaoifd
				</div>
			</div>
			<div class="post rounded" data-toggle="modal" data-target="#exampleModal">
				<div class="user-and-date">May 2017 - Rex</div>
				<div class="post-content">
					d;lsajfodiasfjdsl;afjdsoiafjd;slafjdsaoifd
				</div>
			</div>
  );
}

ReactDOM.render(
  <Posts />,
  document.getElementById('content')
);