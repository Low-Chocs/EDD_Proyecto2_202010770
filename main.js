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
            nodos+=  "N" + numnodo + "[label=\"Username: " + temporal.username + " \n Complete Name: " + temporal.name + " \n Password: " + temporal.password + " \n DPI: " + temporal.dpi + "\nPhone: " + temporal.phone + "\nAdmin: " + temporal.admin + "\"];\n"
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

//BEGIN: ACTOR TREE:
class actor_Node{
    constructor(_dni, _name, _mail, _description){
        this.left = null;
        this.right = null;
        this.dni = _dni;
        this.name = _name;
        this.mail = _mail;
        this.description = _description;
    }
}

class actor_binary_search_tree{
        constructor(){
            this.root = null;
            this.quantity = 0;
        }
    
        insert(_dni, _name, _mail, _description){
    
            let new_node = new actor_Node(_dni, _name, _mail, _description);
    
            if(this.root == null){
                this.root = new_node;
                this.quantity++;
                return;
            }
            //Calling the recursion function for insertion
            this.root = this.insert_node(this.root, new_node);
        }
    
        //Recursive function that inserts a node
        insert_node(actual_root, new_node){
            //Base Case:
            if(actual_root == null){
                actual_root = new_node;
                return actual_root;
            }
            //Traveling between childs:
            if(new_node.dni < actual_root.dni){
                actual_root.left = this.insert_node(actual_root.left, new_node); 
            }
            if(new_node.dni > actual_root.dni){
                actual_root.right = this.insert_node(actual_root.right, new_node); 
            }
            return actual_root;
        }
    
        in_order(actual_root){
            //Case base
            if(actual_root != null){
                this.in_order(actual_root.left);
                console.log(actual_root.dni);
                var parent_div = document.getElementById("actor_user_div");
                var children_div = document.createElement("div");
                children_div.id = actual_root.dni;
                var h2_name = document.createElement("h2");
                var _name = document.createTextNode(actual_root.name);
                var p_description = document.createElement("p");
                var _description = document.createTextNode("Description: "+actual_root.description);
                h2_name.appendChild(_name);
                p_description.appendChild(_description);
                children_div.appendChild(h2_name);
                children_div.appendChild(p_description);
                parent_div.appendChild(children_div);
                this.in_order(actual_root.right);
            }
        }
    
        pre_order(actual_root){
            //Case base
            if(actual_root != null){
                var parent_div = document.getElementById("actor_user_div");
                var children_div = document.createElement("div");
                children_div.id = actual_root.dni;
                var h2_name = document.createElement("h2");
                var _name = document.createTextNode(actual_root.name);
                var p_description = document.createElement("p");
                var _description = document.createTextNode("Description: "+actual_root.description);
                h2_name.appendChild(_name);
                p_description.appendChild(_description);
                children_div.appendChild(h2_name);
                children_div.appendChild(p_description);
                parent_div.appendChild(children_div);
                
                console.log(actual_root.dni);
                this.pre_order(actual_root.left);
                this.pre_order(actual_root.right);
            }
        }
    
        post_order(actual_root){
            //Case base
            if(actual_root != null){
                this.pre_order(actual_root.left);
                this.pre_order(actual_root.right);
                var parent_div = document.getElementById("actor_user_div");
                var children_div = document.createElement("div");
                children_div.id = actual_root.dni;
                var h2_name = document.createElement("h2");
                var _name = document.createTextNode(actual_root.name);
                var p_description = document.createElement("p");
                var _description = document.createTextNode("Description: "+actual_root.description);
                h2_name.appendChild(_name);
                p_description.appendChild(_description);
                children_div.appendChild(h2_name);
                children_div.appendChild(p_description);
                parent_div.appendChild(children_div);
                console.log(actual_root.dni);
            }
        }
        eliminate_div(actual_root){
            this.in_order(actual_root.left);
            console.log(actual_root.dni);
            var div_to_erase = document.getElementById(actual_root.dni);
            div_to_erase.remove()
            this.in_order(actual_root.right);


            
        }
    
        create_dot(){
            let text ="digraph BinarySearchTree{label=\"Clients\";";
            text += this.nodes_dot(this.root);
            text += "\n";
            text += this.linking_nodes_dot(this.root);
            text += "\n}";
            console.log(text)
            d3.select("#actor_graph").graphviz()
            .renderDot(text)
        }
        //Creating nodes inorder way
        nodes_dot(actual_root){
            let nodes = "\n";
            if(actual_root != null){
                nodes += this.nodes_dot(actual_root.left);
                nodes += "n"+actual_root.dni+"[label =\"Dni: "+actual_root.dni+ " \n Actor Name: " + actual_root.name +" \n Mail: " + actual_root.mail +" \n Description: " + actual_root.description +"\"]\n";
                nodes += this.nodes_dot(actual_root.right);
            }
            return nodes;
        }
    
        linking_nodes_dot(actual_root){
            let link = "";
            if(actual_root != null){
                link += this.linking_nodes_dot(actual_root.left)
                link += this.linking_nodes_dot(actual_root.right)
                if(actual_root.left != null){
                    link += "n"+actual_root.dni + "-> n"+actual_root.left.dni+"\n";
                }
                if(actual_root.right != null){
                    link += "n"+actual_root.dni + "-> n"+actual_root.right.dni+"\n";
                }
            }
            return link;
    
        }
}
//END: ACTOR TREE

//Sha256 code Code by: geraintluff Link: https://geraintluff.github.io/sha256/
function sha256(ascii) {
	function rightRotate(value, amount) {
		return (value>>>amount) | (value<<(32 - amount));
	};
	
	var mathPow = Math.pow;
	var maxWord = mathPow(2, 32);
	var lengthProperty = 'length'
	var i, j; // Used as a counter across the whole file
	var result = ''

	var words = [];
	var asciiBitLength = ascii[lengthProperty]*8;
	
	//* caching results is optional - remove/add slash from front of this line to toggle
	// Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
	// (we actually calculate the first 64, but extra values are just ignored)
	var hash = sha256.h = sha256.h || [];
	// Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
	var k = sha256.k = sha256.k || [];
	var primeCounter = k[lengthProperty];
	/*/
	var hash = [], k = [];
	var primeCounter = 0;
	//*/

	var isComposite = {};
	for (var candidate = 2; primeCounter < 64; candidate++) {
		if (!isComposite[candidate]) {
			for (i = 0; i < 313; i += candidate) {
				isComposite[i] = candidate;
			}
			hash[primeCounter] = (mathPow(candidate, .5)*maxWord)|0;
			k[primeCounter++] = (mathPow(candidate, 1/3)*maxWord)|0;
		}
	}
	
	ascii += '\x80' // Append Ƈ' bit (plus zero padding)
	while (ascii[lengthProperty]%64 - 56) ascii += '\x00' // More zero padding
	for (i = 0; i < ascii[lengthProperty]; i++) {
		j = ascii.charCodeAt(i);
		if (j>>8) return; // ASCII check: only accept characters in range 0-255
		words[i>>2] |= j << ((3 - i)%4)*8;
	}
	words[words[lengthProperty]] = ((asciiBitLength/maxWord)|0);
	words[words[lengthProperty]] = (asciiBitLength)
	
	// process each chunk
	for (j = 0; j < words[lengthProperty];) {
		var w = words.slice(j, j += 16); // The message is expanded into 64 words as part of the iteration
		var oldHash = hash;
		// This is now the undefinedworking hash", often labelled as variables a...g
		// (we have to truncate as well, otherwise extra entries at the end accumulate
		hash = hash.slice(0, 8);
		
		for (i = 0; i < 64; i++) {
			var i2 = i + j;
			// Expand the message into 64 words
			// Used below if 
			var w15 = w[i - 15], w2 = w[i - 2];

			// Iterate
			var a = hash[0], e = hash[4];
			var temp1 = hash[7]
				+ (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
				+ ((e&hash[5])^((~e)&hash[6])) // ch
				+ k[i]
				// Expand the message schedule if needed
				+ (w[i] = (i < 16) ? w[i] : (
						w[i - 16]
						+ (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15>>>3)) // s0
						+ w[i - 7]
						+ (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2>>>10)) // s1
					)|0
				);
			// This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
			var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
				+ ((a&hash[1])^(a&hash[2])^(hash[1]&hash[2])); // maj
			
			hash = [(temp1 + temp2)|0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
			hash[4] = (hash[4] + temp1)|0;
		}
		
		for (i = 0; i < 8; i++) {
			hash[i] = (hash[i] + oldHash[i])|0;
		}
	}
	
	for (i = 0; i < 8; i++) {
		for (j = 3; j + 1; j--) {
			var b = (hash[i]>>(j*8))&255;
			result += ((b < 16) ? 0 : '') + b.toString(16);
		}
	}
	return result;
};

//Sha256 code Code by: geraintluff Link: https://geraintluff.github.io/sha256/

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
    actor_tree.pre_order(actor_tree.root);
}
//User -> log
function user_div_to_log(){
    var div_user = document.getElementById('user_div');
    div_user.style.display = "none"; 
    log.style.display = "block"
    div_actor.style.display = "none";
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
    var div_actor = document.getElementById("actor_admin_div");
    var div_movies = document.getElementById("movies_admin_div");
    var div_categories = document.getElementById("categories_admin_div");

    div_login.style.display = "block";
    div_admin.style.display = "none";  
    div_user.style.display = "none";
    div_actor.style.display = "none"; 
    div_movies.style.display = "none";
    div_categories.style.display = "none"; 
    
}
//END: HIDE AND SHOW DIV ELEMENTS

//BEGIN NAVS ADMIN
function user_admin_nav(){
    var div_user = document.getElementById('user_admin_div');
    var div_actor = document.getElementById("actor_admin_div");
    var div_movies = document.getElementById("movies_admin_div");
    var div_categories = document.getElementById("categories_admin_div");

    div_user.style.display = "block";
    div_actor.style.display = "none"; 
    div_movies.style.display = "none";
    div_categories.style.display = "none";
}

function actor_admin_nav(){
    var div_user = document.getElementById('user_admin_div');
    var div_actor = document.getElementById("actor_admin_div");
    var div_movies = document.getElementById("movies_admin_div");
    var div_categories = document.getElementById("categories_admin_div");

    div_user.style.display = "none";
    div_actor.style.display = "block"; 
    div_movies.style.display = "none";
    div_categories.style.display = "none"; 
}

function movie_admin_nav(){
    var div_user = document.getElementById('user_admin_div');
    var div_actor = document.getElementById("actor_admin_div");
    var div_movies = document.getElementById("movies_admin_div");
    var div_categories = document.getElementById("categories_admin_div");

    div_user.style.display = "none";
    div_actor.style.display = "none"; 
    div_movies.style.display = "block";
    div_categories.style.display = "none"; 
}

function categories_admin_nav(){
    var div_user = document.getElementById('user_admin_div');
    var div_actor = document.getElementById("actor_admin_div");
    var div_movies = document.getElementById("movies_admin_div");
    var div_categories = document.getElementById("categories_admin_div");

    div_user.style.display = "none";
    div_actor.style.display = "none"; 
    div_movies.style.display = "none";
    div_categories.style.display = "block"; 
}

function actors_user_nav(){
    //var div_user = document.getElementById('user_user_div');
    var div_actor = document.getElementById("actor_user_div");
    //var div_movies = document.getElementById("movies_user_div");
    //var div_categories = document.getElementById("categories_user_div");

    //div_user.style.display = "none";
    div_actor.style.display = "block"; 
    //div_movies.style.display = "none";
    //div_categories.style.display = "block"; 
}
//END NAVS ADMIN
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
    loged_user = user_list.login(user, sha256(password))
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

    user_list.insert(new_user, new_name, sha256(new_pass), new_dpi, new_phone, false);
    alert("User has been created succesfully");
    new_user_to_log_div();
}

//BEGIN: Json load for users
function load_user() {
    var file = document.getElementById("user_json").files[0];
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
        console.log(data.password);
        user_list.insert(data.nombre_usuario, data.nombre, sha256(data.contrasenia), data.dpi,  data.telefono, data.admin)
      }
      graph_user();
    };
    reader.readAsText(file);
}
//END: Json load for users

//BEIGN: JSON load for iconic actors
function load_actors() {
    var file = document.getElementById("actor_json").files[0];
    if (!file) {
      return;
    }
    let reader = new FileReader();
    reader.onload = function (e) {
      let content = e.target.result;
  
      const _data = JSON.parse(content);
  
      for (const i in _data) {
        let data = _data[i];
        actor_tree.insert(data.dni, data.nombre_actor, data.correo, data.descripcion)
      }
      actor_tree.create_dot();
    };
    reader.readAsText(file);
}
//END: JSON load for iconic actors

//BEIGN: JSON load for movies
function load_movies(){
    var file = document.getElementById("movies_json").files[0];
    if (!file) {
      return;
    }
    let reader = new FileReader();
    reader.onload = function (e) {
      let content = e.target.result;
  
      const _data = JSON.parse(content);
  
      for (const i in _data) {
        let data = _data[i];
        console.log(data.id_pelicula, data.nombre_pelicula, data.descripcion, data.puntuacion_star, data.precion_Q, data.paginas, data.categoria)
      }
    };
    reader.readAsText(file);
}
//END: JSON load for movies

//BEIGN: JSON load for Categories
function load_categories(){
    var file = document.getElementById("categories_json").files[0];
    if (!file) {
      return;
    }
    let reader = new FileReader();
    reader.onload = function (e) {
      let content = e.target.result;
  
      const _data = JSON.parse(content);
  
      for (const i in _data) {
        let data = _data[i];
        console.log(data.id_categoria, data.company)
      }
    };
    reader.readAsText(file);
}
//END: JSON load for Categories
function graph_user(){
    console.log(user_list)
    user_list.graph()
}
function graph_actor(){
    actor_tree.create_dot()
}

function pre_order(){
    console.log("Pre order");
    actor_tree.eliminate_div(actor_tree.root);
    actor_tree.pre_order(actor_tree.root);
}

function in_order(){
    console.log("In order");
    actor_tree.eliminate_div(actor_tree.root);
    actor_tree.in_order(actor_tree.root);
}

function post_order(){
    console.log("Post order");
    actor_tree.eliminate_div(actor_tree.root);
    actor_tree.post_order(actor_tree.root);
}
//END: Dynamic web

//BEGIN: Creating user list
var user_list = new user_List();
var actor_tree = new actor_binary_search_tree();
user_list.insert("EDD", "Oscar Armi",sha256("12345678"),"2354168452525","12345678", true);
user_list.insert("ED", "Oscar Armi", sha256("12345678"),"2354168452525","12345678", false);
//END: Creating user list



