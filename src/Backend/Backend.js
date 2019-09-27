// free easy backend.
//https://www.jsonstore.io/
var backEnd =
  "https://www.jsonstore.io/bffc05cbef904d68a7b65554ef56f7742f4432cd3497d37053f6849a060d0a04";

export const userService = {
  loginUser,
  //  logout,
  CreateUser
  // PostNote,
  ///  FetchNotes,
  // hello
};

function loginUser(username, password) {
  const url = backEnd + "/users/" + username;
  alert(url);
  fetch(url)
    .then(resp => resp.json())
    .then(function(data) {
      console.log(data.result);
      if (password === data.result.password) {
        console.log("logged in");
        alert("logged in");
        localStorage.setItem("username", data.result.username);
        //localStorage.setItem("notes", data.result.notes);
      }
      return null;
    })
    .catch(function(error) {
      console.log(error);
    });
}

function CreateUser(usernameVal, passwordVal, emailVal) {
  var payload = {
    username: usernameVal,
    password: passwordVal,
    email: emailVal
  };
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  };

  return fetch(backEnd + `/users/` + usernameVal, requestOptions)
    .then(handleResponse)
    .then(user => {
      // login successful if there's a user in the response
      if (user) {
        // store user details and basic auth credentials in local storage
        // to keep user logged in between page refreshes
        user.authdata = window.btoa(usernameVal + ":" + passwordVal);
        // localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("username", usernameVal);
      }
      console.log(localStorage.getItem("username"));
      return user;
    });
}

//here we are going to post a note.
function PostNote(user, idVal, titleval, bodyval) {
  var payload = {
    title: titleval,
    body: bodyval,
    id: idVal
  };

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  };

  return fetch(backEnd + `/users/` + user + "/notes/" + idVal, requestOptions)
    .then(handleResponse)
    .then(user => {
      if (user) {
      }
      return user;
    });
}
/*
function DeleteNote(user, title) {
  alert("got delete");
  console.log(backEnd + "/users/" + user + "/notes/" + title);
  fetch(backEnd + "/users/" + user + "/notes/" + title, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
  })
    .then(() => {
      console.log("removed");
    })
    .catch(err => {
      console.error(err);
    });
   return fetch(backEnd + "/users/" + user + "/notes/" + title, {
    method: "DELETE"
  })
    .then(res => res.json())
    .then(res => {
      console.log("Deleted:", res.message);
      return res;
    })
    .catch(err => console.error(err));
}*/

function FetchNotes(user) {
  const url =
    "http://www.jsonstore.io/bffc05cbef904d68a7b65554ef56f7742f4432cd3497d37053f6849a060d0a04/users/" +
    user +
    "/notes/";
  console.log(url);
  //alert(url);
  var noteObj = { notes: [] };
  fetch(url)
    .then(resp => resp.json())
    .then(function(data) {
      var myNotes = data.result;
      console.log(data.result);
      var noteArr = [];
      var count = 0;
      for (var mem in myNotes) {
        if (myNotes.hasOwnProperty(mem)) {
          var member = myNotes[mem];
          var addObj = {
            id: count,
            title: member.title,
            body: member.body
          };
          noteArr.push(addObj);
          count++;
        }
        console.log(addObj);
        // return {
        //  notes: noteArr
        // };
      }
    })
    .catch(function(error) {
      console.log(error);
    });
  return noteObj;
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("username");
  localStorage.removeItem("notes");
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        //logout();
        // location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
