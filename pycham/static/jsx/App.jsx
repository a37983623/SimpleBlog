class Posts extends React.Component {
	constructor(props) {
		super(props);

			this.state = {
				data: [],
				postData:{}
			};
        this.reload = this.reload.bind(this);
        this.post = this.post.bind(this);
        this.loadPost = this.loadPost.bind(this);
        this.deletePost = this.deletePost.bind(this);
		this.reload();
	}

	reload() {
	    var self = this;
	    $.ajax({
            type: "GET",
            url: "/posts",
            success: function(data){
                self.setState({
                    data: jQuery.parseJSON(data)
                });
            },
            fail:function(error){
                console.log("Error"+error);
            }
        });
    }

    post(){
	    var self = this;
	    $.ajax({
            type: "POST",
            url: "/posts",
            data: {
                "content": $('#post-input').val(),
                "userName": "Rex"
            },
            success: function(data){
                self.reload();
				$('#post-input').val(``);
            },
            fail:function(error){
				$('#post-input').val(``);
                console.log("Error"+error);
            }
        });
    }
    loadPost(postData){
    	this.setState({
			postData: postData
		});
	}

	deletePost(postDate) {
        var self = this;
        $.ajax({
            type: "DELETE",
            url: "/deletePost"+ '?' + $.param({"postDate": postDate}),
            data: {},
            success: function (data) {
                self.reload();
            },
            fail: function (error) {
                console.log("Error" + error);
            }
        });
    }
	render() {
		return (
		<div>
            <Btns handler={this.reload}/>
			{this.state.data.map((post, i) => <Post loadPost={this.loadPost} date={post.date} userName={post.userName} content={post.content} />)}
            <ViewModal data={this.state.postData} deleteHandler={this.deletePost}/>
            <PostModal PostHandler={this.post}/>
		</div>
		);
	}
}

class Post extends React.Component {
	render() {
		return (
			<div className="post rounded" data-toggle="modal" data-target="#viewModal" onClick={() => this.props.loadPost(this.props)}>
				<div className="user-and-date">{this.props.date} - {this.props.userName}</div>
				<div className="post-content">
					<p>{this.props.content}</p>
				</div>
			</div>
		);
	}
}

class Pagination extends React.Component {
	render() {
		return (
			<nav id="pagination-container" aria-label="Page navigation example">
				<ul className="pagination">
					<li className="page-item"><a className="page-link" href="#">Previous</a></li>
					<li className="page-item"><a className="page-link" href="#">1</a></li>
					<li className="page-item"><a className="page-link" href="#">2</a></li>
					<li className="page-item"><a className="page-link" href="#">3</a></li>
					<li className="page-item"><a className="page-link" href="#">Next</a></li>
				</ul>
			</nav>
		);
	}
}

class ViewModal extends React.Component {
	render() {
		return (
		<div className="modal fade" id="viewModal" role="dialog">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<button type="button" className="close" data-dismiss="modal">&times;</button>
						<h4 className="modal-title">Post</h4>
					</div>
					<div className="modal-body">
						<p>{this.props.data.content}</p>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-default" data-dismiss="modal" onClick={() => this.props.deleteHandler(this.props.data.date)}>Delete Post</button>
					</div>
				</div>
		  
			</div>
		</div>
		);
	}
}

class PostModal extends React.Component {
	render() {
		return (
		<div className="modal fade" id="postModal" role="dialog">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<button type="button" className="close" data-dismiss="modal">&times;</button>
						<h4 className="modal-title">Post</h4>
					</div>
					<div className="modal-body">
						<textarea id="post-input" type="text" className="post-input" rows="4" cols="70" placeholder="What is in your mind..." aria-describedby="basic-addon1"/>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.props.PostHandler}>Post</button>
						<button type="button" className="btn btn-default " data-dismiss="modal">Close</button>
					</div>
				</div>
		  
			</div>
		</div>
		);
	}
}

class Btns extends React.Component {
    constructor(props) {
    super(props);
    }

  render() {
    return (
        <div>
            <button type="button" className="btn btn-default" data-toggle="modal" data-target="#postModal">Post</button>
            <button onClick={this.props.handler} className="btn btn-default">Refresh</button>
        </div>
    );
  }
}
		
ReactDOM.render(
	<Posts />,
	document.getElementById('content')
);
