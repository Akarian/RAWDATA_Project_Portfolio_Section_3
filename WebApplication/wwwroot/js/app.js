define(["knockout", "services/dataService"], function (ko, ds) {
    // Global variables
    var username = "";
    var password_global = "";
    
    var currentContent = ko.observable("loginTemplate");

    //
    var changeFavorite = (id_post) => {
        var elem = document.getElementById("favorite_"+id_post);
        
        if(elem.value === 1){
            ds.deleteItem('api/auth/'+id_post, (response) => {
                elem.value = 2;
                img.setAttribute("src", "css/img/notfavorite.png");
            });
        }else{
            ds.post('api/mark', { Username: username, PostId: id_post, Annotation: "" }, (response) => {
                elem.value = 1;
                img.setAttribute("src", "css/img/favorite.png");
            });
        }
    }
    
    var updateAnnotation = (id_mark) => {
        ds.put('api/mark',{ Id: id_mark }, (response) => {});
    }
    
    // Routes
    var clearActive = () => {
        document.getElementById("searchActive").className = "";
        document.getElementById("historyActive").className = "";
        document.getElementById("marksActive").className = "";
        document.getElementById("profileActive").className = "";
        document.getElementById("menuActive").hidden = true;
    };
    var changeDetailPost = (id_post) => {
        clearActive();
        currentContent("postTemplate");
        document.getElementById("menuActive").hidden = false;

        ds.post('api/posts', { Id: id_post }, (response) => {
            var b = document.getElementById("body-post-table");
            var newTr = document.createElement('tr');

            var newTitle = document.createElement('td');
            newText.textContent = response.title;
            var newBody = document.createElement('td');
            newBody.textContent = response.post.body;
            var newDate = document.createElement('td');
            newDate.textContent = response.closeddate;
            
            newTr.append(newTitle);
            newTr.append(newBody);
            newTr.append(newDate);
            b.append(newTr);
            
            if(response.acceptanswerpost !== 'undefined')
            {
                var b = document.getElementById("body-accepted-answer-table");
                var newTr = document.createElement('tr');

                var newBody = document.createElement('td');
                newText.textContent = response.acceptanswerpost.body;
                var newDate = document.createElement('td');
                newDate.textContent = response.acceptanswerpost.creationdate;
                
                newTr.append(newBody);
                newTr.append(newDate);
                b.append(newTr);
            }
            
            for(var i = 0 ; i < response.post.comments.length ; i++)
            {
                var b = document.getElementById("body-comments-table");
                var newTr = document.createElement('tr');

                var newText = document.createElement('td');
                newText.textContent = response.post.comments[i].textcontain;
                var newScore = document.createElement('td');
                newScore.textContent = response.post.comments[i].score;
                var newDate = document.createElement('td');
                newDate.textContent = response.post.comments[i].creationdate;

                newTr.append(newText);
                newTr.append(newScore);
                newTr.append(newDate);
                b.append(newTr);
            }
            
            for(var j = 0 ; j < response.answers.length ; j++){
                var b = document.getElementById("body-answers-table");
                var newTr = document.createElement('tr');

                var newBody = document.createElement('td');
                newBody.textContent = response.post.answers[j].body;
                var newScore = document.createElement('td');
                newScore.textContent = response.post.answers[j].score;
                var newDate = document.createElement('td');
                newDate.textContent = response.post.answers[j].creationdate;

                newTr.append(newText);
                newTr.append(newScore);
                newTr.append(newDate);
                b.append(newTr);
                
                for(var k = 0 ; k < response.answers[j].comments.length ; k++)
                {
                    var co = document.createElement("table");
                    var newTr = document.createElement('tr');

                    var newText = document.createElement('td');
                    newText.textContent = response.post.comments[i].textcontain;
                    var newScore = document.createElement('td');
                    newScore.textContent = response.post.comments[i].score;
                    var newDate = document.createElement('td');
                    newDate.textContent = response.post.comments[i].creationdate;

                    newTr.append(newText);
                    newTr.append(newScore);
                    newTr.append(newDate);
                    b.append(newTr);
                }
                b.append(co);
            }
        });
    };
    var changeSearch = () => {
        clearActive();
        currentContent("searchTemplate");
        document.getElementById("searchActive").className = "active";
        document.getElementById("menuActive").hidden = false;
    };
    var changeHistory = () => {
        clearActive();
        currentContent("historyTemplate");
        document.getElementById("historyActive").className = "active";
        document.getElementById("menuActive").hidden = false;

        var url = 'api/search';
        ds.post(url, { UserName: username }, (response) => {
            for(var i = 0;i<response.length;i++){
                if(response[i] !== 'undefined') {
                    var b = document.getElementById("history-tbody");
                    var newTr = document.createElement('tr');
                    newTr.classList.add("clickable-row");
                    newTr.setAttribute("data-bind", "click: changeSearchWithText("+response[i].text+")");

                    var newText = document.createElement('td');
                    newText.textContent = response[i].text;
                    var newDate = document.createElement('td');
                    newDate.textContent = response[i].date;

                    newTr.append(newText);
                    newTr.append(newDate);

                    b.append(newTr);
                }
            }
        });
    };
    var changeLogin = () => {
        clearActive();
        currentContent("loginTemplate");
    };
    var changeMarks = () => {
        clearActive();
        currentContent("marksTemplate");
        document.getElementById("marksActive").className = "active";
        document.getElementById("menuActive").hidden = false;
        
        var url = 'api/mark/markings';
        ds.post(url, { UserName: username }, (response) => {
            for(var i = 0;i<response.length;i++){
                if(response[i] !== 'undefined') {
                    var b = document.getElementById("marksTable");
                    var newTr = document.createElement('tr');
                    newTr.classList.add("clickable-row");
                    newTr.setAttribute("data-bind", "click: changeDetailPost("+response[i].post.id+")");

                    var newText = document.createElement('td');
                    newText.textContent = response[i].post.body;
                    var newDate = document.createElement('td');
                    newDate.textContent = response[i].date;
                    var newFavorite = document.createElement('td');
                    var newAnnotation = document.createElement('td');

                    var favorite = document.createElement('button');
                    newFavorite.append(favorite);

                    var img = document.createElement('img');
                    img.setAttribute("Id","favorite_"+response[i].id);
                    
                    img.setAttribute("src", "css/img/favorite.png");
                    favorite.value = 1;
                        
                    favorite.append(img);
                    favorite.setAttribute("data-bind", "click: changeFavorite("+response[i].id+")");
                    
                    var annotationInput = document.createElement('input');
                    var annotationbutton = document.createElement('button');
                    annotationbutton.setAttribute("data-bind", "click: updateAnnotation("+response[i].id+")");
                    var annotationimg = document.createElement('img');
                    favorite.setAttribute("src","css/img/search-icon.ico");
                    
                    annotationbutton.append(annotationimg);

                    newAnnotation.append(annotationInput);
                    newAnnotation.append(annotationbutton);
                    
                    newTr.append(newText);
                    newTr.append(newDate);
                    newTr.append(newFavorite);
                    newTr.append(newAnnotation);
    
                    b.append(newTr);
                }
            }
        });
    };
    var changeProfile = () => {
        clearActive();
        currentContent("profileTemplate");  
        document.getElementById("profileActive").className = "active";
        document.getElementById("menuActive").hidden = false;
        document.getElementById("username_modify").textContent = username;
        document.getElementById("password_modify").value = password_global;
        
        var url = 'api/auth/tokens';
        ds.post(url, { UserName: username, Password: password_global }, (response) => {
            document.getElementById("email_modify").value = response.email;
        });
    };

    var changeContent = () => {
        if (document.getElementById("login-form").style.display !== "block") {
            document.getElementById("login-form").style.display = "block";
            document.getElementById("register-form").style.display = "none";
        } else {
            document.getElementById("login-form").style.display = "none";
            document.getElementById("register-form").style.display = "block";
        }
    };

    // Register Page
    var registerUser = () => {
        var name = document.getElementById("name_register").value;
        var password = document.getElementById("password_register").value;
        var email = document.getElementById("email_register").value;
        
        if(name !== "" && password !== "" && email !== ""){
            var url = 'api/auth/users';
            ds.post(url, { UserName: name, Password: password, Email: email}, (response) => {
                if(document.getElementsByClassName("error-message").length !== 0){
                    removeElementsByClass("error-message");
                }
    
                if(typeof(response.status) === 'undefined'){
                    changeContent();
                }else{
                    if(response.status === 400){
                        var b = document.getElementById("register-form");
                        var newP = document.createElement('p');
                        newP.classList.add("error-message");
    
                        newP.textContent = "User already exist";
    
                        b.prepend(newP);
                    }else{
                        var b = document.getElementById("register-form");
                        var newP = document.createElement('p');
                        newP.classList.add("error-message");
    
                        newP.textContent = "Internal Error : Call the web-master";
    
                        b.prepend(newP);
                    }
                }
            }); 
        }
    }

    // Login
    var loginUser = () => {
        var name = document.getElementById("name_login").value;
        var password = document.getElementById("password_login").value;

        var url = 'api/auth/tokens';
        ds.post(url, { UserName: name, Password: password }, (response) => {
            if(document.getElementsByClassName("error-message").length !== 0){
                removeElementsByClass("error-message");
            }
            
            if(typeof(response.token) !== 'undefined'){
                username = response.userName;
                password_global = password;
                
                changeSearch();
            }else{
                var b = document.getElementById("login-form");
                var newP = document.createElement('p');
                newP.classList.add("error-message");
    
                newP.textContent = "Bad UserName/Password";
    
                b.prepend(newP);
            }
        });
    }
    
    // Profil
    var deleteUser = () => {
        ds.deleteItem('api/auth/'+username, (response) => {
            changeLogin();
        });
    }

    var modifyUser = () => {
        var password = document.getElementById("password_modify").value;
        var email = document.getElementById("email_modify").value;
        
        if(password !== "" && email !== ""){
            if(document.getElementsByClassName("work-message").length !== 0){
                removeElementsByClass("work-message");
            }

            if(document.getElementsByClassName("error-message").length !== 0){
                removeElementsByClass("error-message");
            }

            var url = 'api/auth';
            ds.put(url,{ UserName: username, Password: password, Email: email }, (response) => {
                if(typeof(response.token) === 'undefined')
                {
                    var b = document.getElementById("modify-form");
                    var newP = document.createElement('p');
                    newP.classList.add("work-message");
    
                    newP.textContent = "Modification succeed";
    
                    b.prepend(newP);
    
                    password_global = password;
                }else{
                    var b = document.getElementById("modify-form");
                    var newP = document.createElement('p');
                    newP.classList.add("error-message");
    
                    newP.textContent = "Internal Error : Call the web-master";
    
                    b.prepend(newP);
                }
            });
        }
    }
    
    // Search
    var searchText = () =>
    {
        var searchTextVar = document.getElementById("searchTextInput").value;
        
        if(searchTextVar !== ""){
            var url = 'api/posts/search';
            ds.post(url, { SearchText: searchTextVar, UserName: username }, (response) => {
                if(document.getElementsByClassName("clickable-row").length !== 0){
                    removeElementsByClass("clickable-row");
                }
                
                if(typeof(response.token) === 'undefined')
                {
                    document.getElementById("questionTable").hidden = false;
                    document.getElementById("answerTable").hidden = false;

                    var urlbis = 'api/mark/markings';
                    ds.post(urlbis, { UserName: username }, (responsebis) => {
                        for(var i = 0;i < response.length;i++)
                        {
                            if (response[i].title === null) {
                                var b = document.getElementById("answerTable");
                                var newTr = document.createElement('tr');
                                newTr.classList.add("clickable-row");
    
                                var newBody = document.createElement('td');
                                newBody.textContent = response[i].body;
                                var newDate = document.createElement('td');
                                newDate.textContent = response[i].creationDate;
    
                                newTr.append(newBody);
                                newTr.append(newDate);
    
                                b.append(newTr);
                            } else {
                                var b = document.getElementById("questionTable");
                                var newTr = document.createElement('tr');
                                newTr.classList.add("clickable-row");
                                newTr.setAttribute("data-bind", "click: changeDetailPost("+response[i].id+")");
    
                                var newText = document.createElement('td');
                                newText.textContent = response[i].title;
                                var newBody = document.createElement('td');
                                newBody.textContent = response[i].body;
                                var newDate = document.createElement('td');
                                newDate.textContent = response[i].creationDate;
                                var newFavorite = document.createElement('td');
    
                                var favorite = document.createElement('button');
                                newFavorite.append(favorite);

                                var img = document.createElement('img');
                                img.setAttribute("Id","favorite_"+response[i].id);

                                var find = false;
                                for(var j=0 ; j<responsebis.length; j++){
                                    if(responsebis[j].post.id === response[i].id){
                                        find = true;
                                    }
                                }
                                
                                if(find === true){
                                    img.setAttribute("src", "css/img/favorite.png");
                                    favorite.value = 1;
                                }else{
                                    img.setAttribute("src", "css/img/notfavorite.png");
                                    favorite.value = 2;
                                }
                                favorite.append(img);
                                favorite.setAttribute("data-bind", "click: changeFavorite("+response[i].id+")");

                                newTr.append(newText);
                                newTr.append(newBody);
                                newTr.append(newDate);
                                newTr.append(newFavorite);
    
                                b.append(newTr);
                            }
                        }
                    });
                }
            });
        }
    }
    
    // History
    var changeSearchWithText = (searchText) =>
    {
        changeSearch();

        var url = 'api/posts/search';
        ds.post(url, { SearchText: searchText, UserName: username }, (response) => {
            if(typeof(response.token) === 'undefined')
            {
                document.getElementById("questionTable").hidden = false;
                document.getElementById("answerTable").hidden = false;

                var urlbis = 'api/mark/markings';
                ds.post(urlbis, { UserName: username }, (responsebis) => {
                    for(var i = 0;i < response.length;i++)
                    {
                        if (response[i].title === null) {
                            var b = document.getElementById("answerTable");
                            var newTr = document.createElement('tr');
                            newTr.classList.add("clickable-row");
    
                            var newBody = document.createElement('td');
                            newBody.textContent = response[i].body;
                            var newDate = document.createElement('td');
                            newDate.textContent = response[i].creationDate;
    
                            newTr.append(newBody);
                            newTr.append(newDate);
    
                            b.append(newTr);
                        } else {
                            var b = document.getElementById("questionTable");
                            var newTr = document.createElement('tr');
                            newTr.classList.add("clickable-row");
                            newTr.setAttribute("data-bind", "click: changeDetailPost("+response[i].id+")");
    
                            var newText = document.createElement('td');
                            newText.textContent = response[i].title;
                            var newBody = document.createElement('td');
                            newBody.textContent = response[i].body;
                            var newDate = document.createElement('td');
                            newDate.textContent = response[i].creationDate;
                            var newFavorite = document.createElement('td');
    
                            var favorite = document.createElement('button');
                            newFavorite.append(favorite);
    
                            var img = document.createElement('img');
                            img.setAttribute("Id","favorite_"+response[i].id);
    
                            var find = false;
                            for(var j=0 ; j<responsebis.length; j++){
                                if(responsebis[j].post.id === response[i].id){
                                    find = true;
                                }
                            }
    
                            if(find === true){
                                img.setAttribute("src", "css/img/favorite.png");
                                favorite.value = 1;
                            }else{
                                img.setAttribute("src", "css/img/notfavorite.png");
                                favorite.value = 2;
                            }
                            favorite.append(img);
                            favorite.setAttribute("data-bind", "click: changeFavorite("+response[i].id+")");
    
                            newTr.append(newText);
                            newTr.append(newBody);
                            newTr.append(newDate);
                            newTr.append(newFavorite);
    
                            b.append(newTr);
                        }
                    }
                });
            }
        });
    }
    
    // Return functions
    return {
        currentContent,
        changeContent,
        changeLogin,
        changeHistory,
        changeSearch,
        changeMarks,
        changeProfile,
        registerUser,
        loginUser,
        deleteUser,
        modifyUser,
        searchText,
        changeSearchWithText,
        changeFavorite,
        changeDetailPost,
        updateAnnotation
    };
    
    // Helpers
    function removeElementsByClass(className){
        var elements = document.getElementsByClassName(className);
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
    }
});