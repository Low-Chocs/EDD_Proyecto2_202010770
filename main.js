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
        var validation = false;
        
        for(var i = 0; i< this.quantity; i++){
            if(aux.username == user && aux.password == pass){
                validation = true;
                this.session_User = aux;
                console.log("USUARIO",this.session_User)
                break;
            }
            aux = aux.next;
        }
        if(validation && aux.admin){
            log_to_admin_div();
        }else if(validation && !aux.admin){
            log_to_user_div();
        }else{
            console.log(validation);
            console.log("No response");
        }
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

//BEGIN: Dynamic web
function show_password(){
    cb = document.getElementById('check_pass').checked;
    log_password = document.getElementById('pass_input');

    if(cb){
        log_password.setAttribute('type','text');
    }else{
        log_password.setAttribute('type','password');
    }
}

function log_in(){
    user = document.getElementById('user_input').value;
    password = document.getElementById('pass_input').value;
    user_list.login(user, password)
    console.log(linked_list.session_User)
    
}
//END: Dynamic web

//BEGIN: HIDE AND SHOW DIV ELEMENTS
function log_to_new_user_div(){
    var div_login = document.getElementById('login_div');
    var div_user = document.getElementById('create_user_div');
    div_login.style.display = "none";
    div_user.style.display = "block";    
}

function new_user_to_log_div(){
    var div_login = document.getElementById('login_div');
    var div_user = document.getElementById('create_user_div');
    div_login.style.display = "block";
    div_user.style.display = "none";    
}

function log_to_user_div(){
    var div_login = document.getElementById('login_div');
    var div_user = document.getElementById('user_div');
    div_login.style.display = "none";    
    div_user.style.display = "block";
}

function user_div_to_log(){
    var div_user = document.getElementById('user_div');
    div_user.style.display = "none"; 
    log.style.display = "block"
}

function log_to_admin_div(){
    var div_login = document.getElementById('login_div');
    var div_admin = document.getElementById('admin_div');
    var div_user = document.getElementById('user_admin_div');
    div_login.style.display = "none";    
    div_admin.style.display = "block";
    div_user.style.display = "block";
}

function admin_div_to_log(){
    var div_login = document.getElementById('login_div');
    var div_admin = document.getElementById('admin_div');
    var div_user = document.getElementById('user_admin_div');

    div_login.style.display = "block";
    div_admin.style.display = "none";  
    div_user.style.display = "none";
}
//END: HIDE AND SHOW DIV ELEMENTS