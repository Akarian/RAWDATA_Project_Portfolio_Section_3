define(["knockout", "dataService"], function (ko, ds) {

  //  var currentContent = ko.observable("searchTemplate");

  var currentContent = ko.observable("loginTemplate");

  var clearActive = () => {
    document.getElementById("searchActive").className = "";
    document.getElementById("marksActive").className = "";
    document.getElementById("profileActive").className = "";
  };

  var changeLogin = () => {
    clearActive();
    currentContent("loginTemplate")
  };
  var changeSearch = () => {
    clearActive();
    currentContent("searchTemplate")
    document.getElementById("searchActive").className = "active";
  };
  var changeMarks = () => {
    clearActive();
    currentContent("marksTemplate")
    document.getElementById("marksActive").className = "active";
  };
  var changeProfile = () => {
    clearActive();
    currentContent("profileTemplate")
    document.getElementById("profileActive").className = "active";
  };

  var changeContent = () => {
    if (document.getElementById("login-form").style.display === "block") {
      document.getElementById("login-form").style.display = "none";
      document.getElementById("register-form").style.display = "block";
    } else {
      document.getElementById("login-form").style.display = "block";
      document.getElementById("register-form").style.display = "none";
    }
  };

  $(document).ready(function(){
    $(".menu-toggle").click(function(){
      $(".menu-toggle").toggleClass("active")
      $("nav").toggleClass("active")
    })
  });

  return {
    currentContent,
    changeContent,
    changeLogin,
    changeSearch,
    changeMarks,
    changeProfile
  };
});
