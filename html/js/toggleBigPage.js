function bigPageOn(){
    $("#menuoptions").children().removeClass("active");

    $("#separator").fadeOut(150)
    $("#menudiv").fadeTo(150, 0.15);
    $("#submenudiv").slideUp(150,function(){
        $("#submenudiv").css('position','absolute');
        $("#submenudiv").hide();
        $("#menudiv").css('position','absolute');
    });
    $("#realheader").slideUp(150, function() {

    });
    $("#smallPage").fadeOut(150, function(){
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        $("#root").fadeIn(150,function(){
            $("#chapterTable_wrapper").slideDown(250)
            $("#localsearch")[0].value = ""
        });
    });
    hoverMenu()
}

function bigPageOff(){
    $("#menudiv").fadeTo(150, 1);
    $("#realheader").slideDown(150, function(){
        $("#menudiv").css('position','')
        $("#submenudiv").css('position','');
        $("#menudiv").stop().fadeTo(150, 1);
        $("#submenudiv").slideDown(150);
    });
    $("#separator").fadeIn(150)
    $("#root").fadeOut(150, function(){
        $("#smallPage").fadeIn(150);
    });
    $("#loadingicon").remove();
    $(".posteroverlay").fadeTo(0, 0)
    $("#chapterTable_wrapper").hide()

    if (!($( "#menuoptions" ).children().hasClass("active"))) {
        $( "#menuoptions" ).children().first().addClass("active");
    }

}

function randomKey() {
    var randomNumber = Math.floor(new Date().valueOf() / Math.random() + Math.random());
    return randomNumber
}

class BookmarkIcon extends React.Component {
    render() {
        var allchapters = this.props.chapters
        var chaptercount = allchapters.length
        var monitoredcount = (allchapters.filter(word => word['monitored'] == true)).length
        if (monitoredcount == chaptercount) {
            var bookicon = "fas"
        } else {
            var bookicon = "far"
        }
        return (
            <i className={bookicon + " fa-bookmark"} id="titleBookmark"></i>
        );
    }
}

class ExternalLink extends React.Component {
    render() {
        return (
            <a href={this.props.externallink} className="badge indexer-badge">{this.props.externalsite}</a>
        );
    }
}

class ChapterCount extends React.Component {
    render() {
        var allchapters = this.props.chapters
        var gotcount = ((allchapters.filter(word => word['monitored'] == true)).filter(word => word['exists_on_disk'] == true)).length
        var monitoredcount = (allchapters.filter(word => word['monitored'] == true)).length

        if (monitoredcount == gotcount) {
            var countbadge = "badge-success"
        } else {
            var countbadge = "badge-danger"
        }
        return (
            <span className={"badge " + countbadge + " toptag d-none d-sm-inline"} id="chapters-badge">{gotcount}/{monitoredcount}</span>
        );
    }
}

class Chapter extends React.Component {
    render() {
        if (this.props.status == false) {
            var statusicon = <i className="fas fa-exclamation-triangle missingIcon"></i>
        } else {
            var statusicon = <span className="badge badge-secondary downloadedIcon">Large</span>
        }
        if (this.props.monitored == true) {
            var monitoredicon = <i className="fas fa-bookmark"></i>
        } else {
            var monitoredicon = <i className="far fa-bookmark"></i>
        }
        return (
            <tr>
                <td className="td-col1">
                    {monitoredicon}
                </td>
                <th className="td-col2" scope="row">{this.props.row}</th>
                <td className="td-col3">{this.props.value}</td>
                <td className="td-col4">
                    {statusicon}
                </td>
                <td className="td-col5">
                    <i className="fas fa-search"></i>
                </td>
                <td className="td-col6">
                    <i className="fas fa-binoculars"></i>
                </td>
            </tr>
        );
    }
}

class Chapters extends React.Component {
    render() {
        var allchapters = this.props.chapters
        var chaptercount = allchapters.length
        var gotcount = ((allchapters.filter(word => word['monitored'] == true)).filter(word => word['exists_on_disk'] == true)).length
        var monitoredcount = (allchapters.filter(word => word['monitored'] == true)).length
        if (monitoredcount == gotcount) {
            var countbadge = "badge-success"
        } else {
            var countbadge = "badge-danger"
        }
        var rowcount = 1
        allchapters.reverse();
        const listChapters = allchapters.map((chapter) =>
            <Chapter key={randomKey().toString()} value={chapter['name']} status={chapter['exists_on_disk']} monitored={chapter['monitored']} row={chapter['number']} />
        );
        return (
            <tbody>{listChapters}</tbody>
        );
    }
}

class Badges extends React.Component {
    render() {
        var badge = this.props.value
        if (badge == 1) {
            badge = "Ended"
        } if (badge == 0) {
            badge = "Ongoing"
        }
        return (
            <span className="badge big-badge">{badge}</span>
        );
    }
}

class Banner extends React.Component {
    render() {
        return (
            <div id="bigHeaderBg" style={{backgroundImage: "url(" + this.props.value + ")"}}></div>
        );
    }
}

class Poster extends React.Component {
    render() {
        return (
            <img src={this.props.value} id="bigPosterImg" />
        );
    }
}

class MiniPoster extends React.Component {
    render() {
        return (
            <img src={this.props.value} id="editPageImg" />
        );
    }
}

class Title extends React.Component {
    render() {
        return (
            <span>{this.props.title} ({this.props.year})</span>
        );
    }
}

class Synopsis extends React.Component {
    render() {
        return (
            <p id="bigSyno">{this.props.value}</p>
        );
    }
}

class Tag extends React.Component {
    render() {
        return (
            <span className="cattags">{this.props.value}</span>
        );
    }
}

class Tags extends React.Component {
    render() {
        const listItems = this.props.localtags.map((tag) =>
            <Tag key={randomKey().toString()} value={tag['tag']} />
        );
        return (
            <div className="card-body" id="bigTagCard">{listItems}</div>
        );
    }
}

class App extends React.Component {
    componentDidUpdate() {
        console.log("Laddad!")
        $('#chapterTable').DataTable().destroy();
        $('#chapterTable').DataTable( {
            "order": [ 1, 'desc' ],
            "columnDefs": [
                { "orderable": false, "targets": [0, 4, 5] }
            ]
        } );
        var timeoutcount = ($("tbody").children().length * 3)
        setTimeout(function(){
            bigPageOn();
        }, timeoutcount);
    }
    deleteClick(id) {
        removeComic(id);
    }
    render() {
        return (

    <div id="bigPage">
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" style={{display: "none"}}
            aria-hidden="true">

            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{this.props.title} ({this.props.year})</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-4">
                                    <div className="card-body">
                                        <MiniPoster key={randomKey().toString()} value={this.props.metadata[0]['posterpath']} />
                                    </div>
                                </div>
                                <div className="col" style={{marginTop: "auto", marginBottom: "auto"}}>
                                    <div className="form-group" style={{display: "flex", margin: "10px 0 10px 0"}}>
                                        <label className="col-sm-3 control-label" style={{textAlign: "right", marginTop: "auto", marginBottom: "auto", fontWeight: "bold"}}>Monitored</label>
                                        <div className="col-sm-9">
                                            <select className="form-control x-profile" id="inputProfile" name="profileId">
                                                <option value="1">Any</option>
                                                <option value="2">SD</option>
                                                <option value="3">HD-720p</option>
                                                <option value="4">HD-1080p</option>
                                                <option value="5">Ultra-HD</option>
                                                <option value="6">HD - 720p/1080p</option>
                                            </select>

                                        </div>
                                    </div>
                                    <div className="form-group" style={{ display: "flex", margin: "10px 0 10px 0"}}>
                                        <label className="col-sm-3 control-label" style={{ textAlign: "right", marginTop: "auto", marginBottom: "auto", fontWeight: "bold"}}>Profile</label>

                                        <div className="col-sm-9">
                                            <select className="form-control x-profile" id="inputProfile" name="profileId">
                                                <option value="1">Any</option>
                                                <option value="2">SD</option>
                                                <option value="3">HD-720p</option>
                                                <option value="4">HD-1080p</option>
                                                <option value="5">Ultra-HD</option>
                                                <option value="6">HD - 720p/1080p</option>
                                            </select>

                                        </div>
                                    </div>
                                    <div className="form-group" style={{ display: "flex", margin: "10px 0 10px 0"}}>
                                        <label className="col-sm-3 control-label" style={{ textAlign: "right", marginTop: "auto", marginBottom: "auto", fontWeight: "bold"}}>Series Type</label>

                                        <div className="col-sm-9">
                                            <select className="form-control x-profile" id="inputProfile" name="profileId">
                                                <option value="1">Any</option>
                                                <option value="2">SD</option>
                                                <option value="3">HD-720p</option>
                                                <option value="4">HD-1080p</option>
                                                <option value="5">Ultra-HD</option>
                                                <option value="6">HD - 720p/1080p</option>
                                            </select>

                                        </div>
                                    </div>
                                    <div className="form-group" style={{display: "flex", margin: "10px 0 10px 0"}}>
                                        <label className="col-sm-3 control-label" style={{textAlign: "right", marginTop: "auto", marginBottom: "auto", fontWeight: "bold"}}>Path</label>

                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" id="formGroupExampleInput2" placeholder={this.props.path} />

                                        </div>
                                    </div>
                                    <div className="form-group" style={{display: "flex", margin: "10px 0 10px 0"}}>
                                        <label className="col-sm-3 control-label" style={{textAlign: "right", marginTop: "auto", marginBottom: "auto", fontWeight: "bold"}}>Tags</label>

                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" id="formGroupExampleInput" />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" data-toggle="modal" className="btn btn-danger" id="deletebtn" href="#deleteConfirm">Delete</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>



        </div>

        <div className="modal fade" id="deleteConfirm">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Confirm delete</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>

                    </div>
                    <div className="container"></div>
                    <div className="modal-body">
                        <div className="card-body">
                            <h5 className="text-center">Are you sure you want to delete?</h5>
                            <h3 className="text-center">{this.props.path}</h3>
                        </div>
                    </div>
                    <div className="modal-footer">	<a href="#" data-dismiss="modal" className="btn btn-secondary">Cancel</a>
                    <button className="btn btn-danger" id="deleteConfirmBtn" onClick={this.deleteClick.bind(this, this.props.id)}>Delete</button>
                    </div>
                </div>
            </div>
        </div>

        <div className="jumbotron jumbotron-fluid" id="bigHeader">
            <Banner key={randomKey().toString()} value={this.props.metadata[0]['bannerpath']} />
        </div>
        <div className="row">
            <div className="col-2"></div>
            <div className="col-2" id="bigPosterDiv">
                <div className="card-body">
                    <Poster key={randomKey().toString()} value={this.props.metadata[0]['posterpath']} />
                </div>
            </div>
            <div className="col">
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <div className="col">
                                <div className="card-body">
                                    <h2 id="bigTitle">
                                        <BookmarkIcon key={randomKey().toString()} chapters={this.props.chapters} />
                                        <Title key={randomKey().toString()} title={this.props.title} year={this.props.year} />
                                    </h2>
                                </div>
                            </div>
                            <div className="col-4" id="toolboxCol">
                                <div className="card-body" id="toolboxCard">
                                    <h5 id="toolboxH5">
                                        <button type="button" className="toolboxIcons">
                                            <i className="fas fa-sitemap"></i>
                                        </button>
                                        <button type="button" className="toolboxIcons">
                                            <i className="fas fa-sync-alt"></i>
                                        </button>
                                        <button type="button" className="toolboxIcons">
                                            <i className="fas fa-search"></i>
                                        </button>
                                        <button type="button" data-toggle="modal" data-target="#exampleModal" className="toolboxIcons">
                                            <i className="fas fa-wrench"></i>
                                        </button>
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="card-body">
                                    {/*<p id="bigSyno">{synopsis}</p>*/}
                                    <Synopsis key={randomKey().toString()} value={this.props.synopsis} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Tags key={randomKey().toString()} localtags={this.props.tags} />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="card-body">
                            <Badges key={randomKey().toString()} value={this.props.profile} />
                            <Badges key={randomKey().toString()} value={this.props.publisher} />
                            <Badges key={randomKey().toString()} value={this.props.path} />
                            <Badges key={randomKey().toString()} value={this.props.rating} />
                            <Badges key={randomKey().toString()} value={this.props.size} />
                            <Badges key={randomKey().toString()} value={this.props.files} />
                            <Badges key={randomKey().toString()} value={this.props.status} />
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="card-body" id="indexerCard">
                            <ExternalLink key={randomKey().toString()} externalsite={this.props.externalsite} externallink={this.props.externallink} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-2"></div>
        </div>
        <div className="row">
            <div className="col-2"></div>
            <div className="col">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col">
                                <h5>
                                    <BookmarkIcon key={randomKey().toString()} chapters={this.props.chapters} />
                                    Chapters
                                    <ChapterCount key={randomKey().toString()} chapters={this.props.chapters} />
                                </h5>
                            </div>
                            <div className="col-2" id="chaptersDiv">
                                <i className="fas fa-sitemap chaptersIcons"></i>
                                <i className="fas fa-search chaptersIcons"></i>
                            </div>
                        </div>
                        <div className="row">
                            <table className="table" id="chapterTable">
                                <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">#</th>
                                        <th scope="col">Chapter</th>
                                        <th scope="col" className="td-col4">Status</th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <Chapters key={randomKey().toString()} chapters={this.props.chapters} />
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-2"></div>
        </div>
        <div className="row" style={{padding: "40px"}}></div>
    </div>
        );
    }
}

ReactDOM.render(<App metadata={["/static/images/postermissing.png",""]} banner={""} tags={[]} chapters={[[]]} />, document.getElementById('root'));

function entrySelect(a, id) {

    if (id == null) {
        var id = $(a).find(".comic-id")[0].innerText
    }

    //var div = document.createElement('i');
    //div.setAttribute('class', 'fas fa-sync-alt rotating');
    //div.setAttribute('id', 'loadingicon');

    //$( a ).find(".posteroverlay-text").append( div );
    //$( a ).find(".posteroverlay").fadeTo(150, 1)

    $.getJSON("/get/" + id, function(data){

        ReactDOM.render(<App

            id={data['id']}
            title={data['title']}
            year={data['startdate'].slice(0,4)}
            metadata={data['metadata']}
            tags={data['tags']}
            profile={data['fileprofile']}
            publisher={data['publisher']}
            path={data['filepath']}
            rating={data['rating']}
            size={data['size']}
            files={data['files']}
            status={data['activestatus']}
            synopsis={data['synopsis']}
            chapters={data['chapters']}
            externalsite={data['externalsite']}
            externallink={data['externallink']}
            
            />,document.getElementById('root'));
    });
}

