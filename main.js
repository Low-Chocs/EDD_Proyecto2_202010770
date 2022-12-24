//BEGIN: User LIST
class user_Node{
    constructor(_username, _name, _password, _dpi, _phone, _admin){
        this.username = _username;
        this.name = _name;
        this.password = _password
        this.dpi = _dpi;
        this.phone = _phone;
        this.admin = _admin;
        this.next = null; 
    }
}

class user_List{

    constructor(){
        this.head = null;
        this.buttom = null;
        this.quantity = 0;
        this.session_user = null;
    }

    insert(_username, _name, _password, _dpi, _phone, _admin){
        var new_user = new user_Node(_username, _name, _password, _dpi, _phone, _admin)

        if(this.quantity == 0){
            this.head = new_user;
            this.buttom = new_user;
            this.quantity++;
        }else{
            this.buttom.next = new_user;
            this.buttom = new_user;
            this.quantity++;
        }
    }

    session_User(){
        return this.active_user;
    }

    show(){
        var aux = this.head;
        for(var i = 0; i< this.quantity; i++){
            console.log(aux);
            aux = aux.next;
        }
    }
    
    login(user, pass){
        var aux = this.head;
        //Looking up the user 
        for(var i = 0; i< this.quantity; i++){
            if(aux.username == user && aux.password == pass){
                this.session_User = aux;
                return aux;
            }
            aux = aux.next;
        }
        //In case of not finding the user
        return null
    }
    //This function will demostrate if the username is in use
    is_repeated(username){
        var aux = this.head;
        for(var i = 0; i< this.quantity; i++){
            if(aux.username == username ){
                return false;
            }
            aux = aux.next;
        }
        return true;
    }

    graph(){
        var codigodot = "digraph G{\nlabel=\" Usuarios \";\nnode [shape=box];\n graph [rankdir = LR];";
        var temporal = this.head
        var conexiones ="";
        var nodos ="";
        var numnodo= 0;
        while (temporal != null) {
            nodos+=  "N" + numnodo + "[label=\"Usuario: " + temporal.username + " \n Nombre: " + temporal.name + " \n Contraseña: " + temporal.password + " \n DPI: " + temporal.dpi + "\nTel: " + temporal.phone + "\nAdimn: " + temporal.admin + "\"];\n"
            if(temporal.next != null){
                var auxnum = numnodo+1
                conexiones += "N" + numnodo + " -> N" + auxnum + ";\n"
            }
            temporal = temporal.next
            numnodo++;            
        }
        codigodot += "//agregando nodos\n"
        codigodot += nodos+"\n"
        codigodot += "//agregando conexiones o flechas\n"
        codigodot += "{\n"+conexiones+"\n}\n}"
        console.log(codigodot)
        d3.select("#user_graph").graphviz()
            .renderDot(codigodot)
    }
}

//END: User LIST

var user_list = new user_List();

user_list.insert("EDD", "Oscar Armi","12345678","2354168452525","12345678", true);
user_list.insert("ED", "Oscar Armi","12345678","2354168452525","12345678", false);



//BEGIN: HIDE AND SHOW DIV ELEMENTS

//log -> New user
function log_to_new_user_div(){
    var div_login = document.getElementById('login_div');
    var div_user = document.getElementById('create_user_div');
    div_login.style.display = "none";
    div_user.style.display = "block";    
}
//New user -> log
function new_user_to_log_div(){
    var div_login = document.getElementById('login_div');
    var div_user = document.getElementById('create_user_div');
    div_login.style.display = "block";
    div_user.style.display = "none";    
}
//log -> user
function log_to_user_div(){
    var div_login = document.getElementById('login_div');
    var div_user = document.getElementById('user_div');
    div_login.style.display = "none";    
    div_user.style.display = "block";
}
//User -> log
function user_div_to_log(){
    var div_user = document.getElementById('user_div');
    div_user.style.display = "none"; 
    log.style.display = "block"
}
//log -> admin
function log_to_admin_div(){
    var div_login = document.getElementById('login_div');
    var div_admin = document.getElementById('admin_div');
    var div_user = document.getElementById('user_admin_div');
    div_login.style.display = "none";    
    div_admin.style.display = "block";
    div_user.style.display = "block";
}
//Admin -> log
function admin_div_to_log(){
    var div_login = document.getElementById('login_div');
    var div_admin = document.getElementById('admin_div');
    var div_user = document.getElementById('user_admin_div');

    div_login.style.display = "block";
    div_admin.style.display = "none";  
    div_user.style.display = "none";
}
//END: HIDE AND SHOW DIV ELEMENTS

//BEGIN: Dynamic web

//Changes the password input to a text input and viceversa
function show_password(){
    password_check = document.getElementById('check_pass').checked;
    log_password = document.getElementById('pass_input');

    if(password_check){
        log_password.setAttribute('type','text');
        return null;
    }
    
    log_password.setAttribute('type','password');
}

//Login function, moves to the correspondent div
function log_in(){
    user = document.getElementById('user_input').value;
    password = document.getElementById('pass_input').value;
    //User list return the logged user
    loged_user = user_list.login(user, password)
    //In case of null the data is incorrect
    if(loged_user == null){
        alert("Check the data");
        return null;
    }
    //Checking if the user is an admin or not
    if(loged_user.admin){
        log_to_admin_div();
        return null;
    }
    log_to_user_div();

    
}
//If conditions are fullfilled an user will be registered
function register_new_user(){
    var new_user = document.getElementById('new_user_input').value;
    var new_name = document.getElementById('new_name_input').value;
    var new_pass = document.getElementById('new_pass_input').value;
    var new_dpi = document.getElementById('new_dpi_input').value;
    var new_phone = document.getElementById('new_phone_input').value;
    //is_repeated returns a boolean
    var is_used = user_list.is_repeated(new_user)

    if(new_user == "" || new_name == "" || new_pass == "" || new_dpi == "" || new_phone == ""){
        alert("Don't leave blank spaces!");
        return null;
    }

    if(!is_used){
        alert("User already exist!");
        return null;
    }

    user_list.insert(new_user, new_name, new_pass, new_dpi, new_phone, false);
    alert("User has been created succesfully");
    new_user_to_log_div();
}

function load_user() {
    var file = document.getElementById("userJson").files[0];
    if (!file) {
      return;
    }
    let reader = new FileReader();
    reader.onload = function (e) {
      let content = e.target.result;
  
      const _data = JSON.parse(content);
  
      for (const i in _data) {
        let data = _data[i];
        //Checking if the username is in use
        if(!user_list.is_repeated(data.username)){
            continue;
        }
        user_list.insert(data.username, data.name, data.password, data.dpi,  data.phone, data.admin)
      }
      graph_user();
    };
    reader.readAsText(file);
}

function graph_user(){
    user_list.graph()
}
//END: Dynamic web