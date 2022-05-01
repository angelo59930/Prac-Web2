const headRegister = `<div class="col-12 col-md-10 col-lg-7 guiRegister" >
          <form action="GET">
            <div class="form-group">
              <h3>sign in</h3>
              <label for="remail">Email address</label>
              <input
                type="email"
                name="remail"
                class="form-control"
                id="remail"
                placeholder="Enter email"
              />
            </div>
            <div class="form-group">
              <label for="ruser">User</label>
              <input
                type="text"
                name="ruser"
                class="form-control"
                id="ruser"
                placeholder="Enter user"
              />
            </div>
            <div class="form-group">
              <label for="rpassword">Password</label>
              <input
                type="password"
                class="form-control"
                name="rpassword"
                id="rpassword"
                placeholder="Enter password"
              />
              <small class="form-text text-muted">
                We'll never share your Password with anyone else.
              </small>
            </div>
          
            <!-- Select user Level -->
           `;

const adminRegister = `<div class="form-group">
            <label for="userLevel" >Level of User</label>
            <select class="form-select" id="userLevel">
              <option selected>Open this select menu</option>
              <option value="1">Standar</option>
              <option value="2">Advanced</option>
              <option value="3">Admin</option>
            </select>
            <small>Select the level of user to register</small>
          </div>`;

const footRegister = ` <div class="form-group">
              <input
                type="button"
                class="btn btn-success"
                value="Register"
                onclick="signIn()"
              />
            </div>
          </form>
        </div>`;

const headTableUser = ` <div class="col-12 col-md-10 col-lg-7">
          <table class="table table-striped table-secondary table-sm tableUser">
            <thead>
              <tr>
                <td>User Name</td>
                <td>Email</td>
                <td>User Level</td>
              </tr>
            </thead>`;

const footTableUser = `</tbody>
          </table>
        </div>`;

let list = [];

const admin = {
  name: "admin",
  email: "admin@admin.com",
  password: "admin",
  userLevel: 3,
};

let counter = 0;

if (localStorage.getItem("users") === null) {
  list.push(admin);
  localStorage.setItem("users", JSON.stringify(list));
}

function login() {
  let existUser = false;
  const userName = document.getElementById("user").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (validateData(userName, email, password)) {
    alert("Complete the form to login");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users"));

  users.forEach((user) => {
    if (
      user.email === email &&
      user.password === password &&
      user.name === userName
    ) {
      alert("Welcome " + user.name);

      if (Number(user.userLevel) === 3) {
        printGuiAdmin();
        printTable();
      }
      existUser = true;
      return;
    }
  });
  if (!existUser) {
    alert("User or password incorrect");
    counter++;
  }

  if (counter > 2) {
    alert("Your user has been not exist, please sign up 😊");
    printRegister();
    return;
  }
}

function signIn() {
  const userName = document.getElementById("ruser").value;
  const email = document.getElementById("remail").value;
  const password = document.getElementById("rpassword").value;
  const userLevel = document.getElementById("userLevel");

  if (validateData(userName, email, password)) {
    alert("Complete the form to sign in");
    return;
  }


  if(userExist(userName, email)){
    alert("User already exist");
    return;
  }

  const user = {
    name: userName,
    email: email,
    password: password,
    userLevel: userLevel ? userLevel.value : 1,
  };

  list = JSON.parse(localStorage.getItem("users"));
  list.push(user);
  localStorage.setItem("users", JSON.stringify(list));

  if (Number(user.userLevel) === 3) {
    alert("User created");
    printTable();
  }
}

function printTable() {
  let bodyTableUser = `</tbody>`;
  let table = document.getElementById("guiTable");
  let users = JSON.parse(localStorage.getItem("users"));
  users.forEach((user) => {
    bodyTableUser += `<tr><td>${user.name}</td><td>${user.email}</td><td>${user.userLevel}</td></tr>`;
  });

  table.innerHTML = headTableUser + bodyTableUser + footTableUser;
}

function printGuiAdmin() {
  document.getElementById("guiRegister").innerHTML =
    headRegister + adminRegister + footRegister;
}

function printRegister() {
  document.getElementById("guiRegister").innerHTML =
    headRegister + footRegister;
}

function validateData(name, email, password) {
  if (name === "" || email === "" || password === "") {
    return true;
  }
  return false;
}

function userExist(userName, email) {
  let users = JSON.parse(localStorage.getItem("users"));
  let exist = false;
  users.forEach((user) => {
    if (user.email === email || user.name === userName) {
      exist = true;
    }
  });
  return exist;
}
