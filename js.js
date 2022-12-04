let comments = [];
loadComments();

document.getElementById('comment-add').onclick = function(){
    let commentName = document.getElementById('comment-name');
    let commentBody = document.getElementById('comment-body');

    let comment = {
        name : commentName.value,
        body : commentBody.value,
        time : Math.floor(Date.now() / 1000)
    }

    commentName.value = '';
    commentBody.value = '';

    comments.push(comment);
    saveComments();
    showComments();
}

function saveComments(){
    localStorage.setItem('comments', JSON.stringify(comments));
}

function loadComments(){
    if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
    showComments();
}

function showComments (){
    let commentField = document.getElementById('comment-field');
    let out = '';
    comments.forEach(function(item){
        out += `<p class="text-right small"><em>${timeConverter(item.time)}</em></p>`;
        out += `<p class="alert alert-primary" role="alert">${item.name}</p>`;
        out += `<p class="alert alert-success" role="alert">${item.body}</p>`;
		out += `<div class="button btn_message" onclick="del()">Удалить</div>`;
    });
    commentField.innerHTML = out;
}

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }
 
function showComments (){
    let commentField = document.getElementById('comment-field');
    let out = '';
    comments.forEach(function(item){
        out += `
            <div>
                <p class="text-right-small">${timeConverter(item.time)}</p>
                <p class="alert-alert-primary" role="alert">${item.name}</p>
                <p class="alert-alert-success" role="alert">${item.body}</p>
                <a href="#" class="alert-alert-danger"  role="alert" data-time=${item.time}>Удалить</a>
            </div>
        `;       
    });
    commentField.innerHTML = out;
}

document.getElementById('comment-field').addEventListener('click', function(e){
    if (e.target.matches('.alert-alert-danger')) {
        e.preventDefault();
        deleteComments(e.target);
    }
})
 
function deleteComments(deleteButton) {
    comments.splice(comments.findIndex(i => i.time == deleteButton.getAttribute('data-time')), 1);
    deleteButton.closest('div').remove();
    saveComments();
}