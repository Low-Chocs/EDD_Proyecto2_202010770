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
        return this.session_user;
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
                this.session_user = aux;
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
                var parent_div = document.getElementById("in_order_actor");
                var children_div = document.createElement("div");
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
                var parent_div = document.getElementById("pre_order_actor");
                var children_div = document.createElement("div");
                var h2_name = document.createElement("h2");
                var _name = document.createTextNode(actual_root.name);
                var p_description = document.createElement("p");
                var _description = document.createTextNode("Description: "+actual_root.description);
                h2_name.appendChild(_name);
                p_description.appendChild(_description);
                children_div.appendChild(h2_name);
                children_div.appendChild(p_description);
                parent_div.appendChild(children_div);
                
                this.pre_order(actual_root.left);
                this.pre_order(actual_root.right);
            }
        }
    
        post_order(actual_root){
            //Case base
            if(actual_root != null){
                this.post_order(actual_root.left);
                this.post_order(actual_root.right);
                var parent_div = document.getElementById("post_order_actor");
                var children_div = document.createElement("div");
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

        find_actor(_dni){
            if(this.root == null){
                return "There is no element in movie tree"
            }

            let current_node = this.root;
            while(current_node != null){
                if(current_node.dni > _dni){
                    current_node = current_node.left;
                    continue;
                }
                if(current_node.dni < _dni){
                    current_node = current_node.right;
                    continue;
                }
                return current_node;
            }
        }
    
        create_dot(){
            let text ="digraph BinarySearchTree{label=\"Clients\";\nnode [shape=box];\n";
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

//BEGIN COMMENT SECTION
//This classes will help us to get the comments of each movie
//Every user will be able to check the comments of the movie
class comentary_node{
    constructor(_author, _comentary){
        this.author = _author;
        this.comentary = _comentary;
        this.next = null; 
    }
}
class comentary_list{

    contructor(){
        this.head = null;
        this.buttom = null;
        this.quantity = 0;
    }

    insert(_author, _comentary){
        var new_comment = new user_Node(_author,_comentary)

        if(this.quantity == 0){
            this.head = new_comment;
            this.buttom = new_comment;
            this.quantity++;
        }else{
            this.buttom.next = new_comment;
            this.buttom = new_comment;
            this.quantity++;
        }
    }

    show(position){
        if(this.head == null){
            return "Be the first one in comment!"
        }

        movie = this.head;
        for(var i = 0; i < this.quantity; i++){
            if(i == position){
                return movie;
            }
            movie = movie.next;
        }
    }

}
//END COMMENT SECTION

//BEGIN MOVIE AVL TREE
class movie_node{
    constructor(_id, _name, _description, _punctuation, _price, _pages, _category){
        this.id = _id;
        this.name = _name;
        this.description = _description;
        this.punctuation = _punctuation;
        this.price = _price;
        this.pages = _pages;
        this.category = _category;
        this.coments = new comentary_list();
        this.left = null;
        this.right = null;
        this.height = 0;
    }
}

class movie_avl_tree{
    constructor(){
        this.root = null;
    }

    insert(_id, _name, _description, _punctuation, _price, _pages, _category){
        let new_movie = new movie_node(_id, _name, _description, _punctuation, _price, _pages, _category);
        
        if(this.root == null){
            this.root = new_movie;
            return;
        }
        //Calling the recursion function for insertion
        this.root = this.insert_node(this.root, new_movie);
    }
    //Recursive function that inserts a node
    insert_node(actual_root, new_movie){
        //Base Case:
        if(actual_root == null){
            actual_root = new_movie;
            return actual_root;
        }
        //Traveling between childs:
        if(new_movie.id < actual_root.id){
            //Inserting the node recursively
            actual_root.left = this.insert_node(actual_root.left, new_movie); 
            if(this.height(actual_root.right) - this.height(actual_root.left) == -2){
                //We are in a left situation, now we have to determinate if it is a simple or double rotation
                if(new_movie.id < actual_root.left.id){
                    //We have concluded that it is a simple rotation
                    actual_root = this.left_left_rotation(actual_root);
                }else{
                    //We have concluded that it is a double rotation
                    actual_root = this.left_right_rotation(actual_root);
                }
            } 
            
        }
        
        if(new_movie.id > actual_root.id){
            //Inserting the node recursively
            actual_root.right = this.insert_node(actual_root.right, new_movie); 
            if(this.height(actual_root.right) - this.height(actual_root.left) == 2){
                //We are in a right situation, now we have to determinate if it is a simple or double rotation
                if(new_movie.id > actual_root.right.id){
                    //We have concluded that it is a simple rotation
                    actual_root = this.right_right_rotation(actual_root);
                }else{
                    //We have concluded that it is a double rotation
                    actual_root = this.right_left_rotation(actual_root);
                }
            }            
        }
        actual_root.height = this.max_height(this.height(actual_root.right), this.height(actual_root.left)) +1;
        return actual_root;
    }

    //Getting the height of a simple node;
    //Cleaner looking code purposses
    height(node){
        if(node == null){
            return -1;
        }
        return node.height;
    }

    //Next we will make the comparison of the heights
    //Just for swapping purposses during rotations
    max_height(h1, h2){
        if(h2 >= h1){
            return h2;
        }
        return h1;
    }

    //Rotations:
    //Covering all the situations required to make an efficient rotation
    left_left_rotation(current_node){
        let left_node = current_node.left;
        current_node.left = left_node.right;
        left_node.right = current_node;
        current_node.height = this.max_height(this.height(current_node.left), this.height(current_node.right)) + 1;
        left_node.height = this.max_height(current_node.height, this.height(current_node.left)) + 1;
        return left_node;

    }

    right_right_rotation(current_node){
        let right_node = current_node.right;
        current_node.right = right_node.left;
        right_node.left = current_node;
        current_node.height = this.max_height(this.height(current_node.left), this.height(current_node.right)) + 1;
        right_node.height = this.max_height(current_node.height, this.height(current_node.right)) + 1;
        return right_node;
    }

    left_right_rotation(node){
        node.left = this.right_right_rotation(node.left);
        let aux = this.left_left_rotation(node);
        return aux;
    }

    right_left_rotation(node){
        node.right = this.left_left_rotation(node.right);;
        let aux = this.right_right_rotation(node);
        return aux;
    }

    pre_order(actual_root){
        //Case base
        if(actual_root != null){
            console.log(actual_root.id, actual_root.name);
            this.pre_order(actual_root.left);
            this.pre_order(actual_root.right);
        }
    }

    in_order(actual_root){
        //Case base
        if(actual_root != null){
            this.in_order(actual_root.left);
            console.log(actual_root.id, actual_root.name);
            this.in_order(actual_root.right);
        }
    }

    post_order(actual_root){
        //Case base
        if(actual_root != null){
            this.post_order(actual_root.left);
            this.post_order(actual_root.right);
            console.log(actual_root.id, actual_root.name);
        }
    }

    reverse_order(actual_root){
        //Case base
        if(actual_root != null){
            this.reverse_order(actual_root.right);
            console.log(actual_root.id, actual_root.name);
            this.reverse_order(actual_root.left);
        } 
    }

    find_movie(_id){
        if(this.root == null){
            return "There is no element in movie tree"
        }

        let current_node = this.root;
        while(current_node != null){
            if(current_node.id > _id){
                current_node = current_node.left;
                continue;
            }
            if(current_node.id < _id){
                current_node = current_node.right;
                continue;
            }
            
            return current_node;
        }
        return "NOT FOUND";
    }

    create_dot(){
        let text ="digraph AVL{label=\"Clients\";\nnode [shape=box];\n";
        text += this.nodes_dot(this.root);
        text += "\n";
        text += this.linking_nodes_dot(this.root);
        text += "\n}";
        console.log(text)
        d3.select("#movies_graph").graphviz()
        .renderDot(text)
    }
    //Creating nodes inorder way
    nodes_dot(actual_root){
        let nodes = "\n";
        if(actual_root != null){
            nodes += this.nodes_dot(actual_root.left);
            nodes += "n"+actual_root.id+"[label =\"ID: "+actual_root.id+ " \n Movie Name: " + actual_root.name +" \n Description: " + actual_root.description +" \n Punctuation: " + actual_root.punctuation +" \n Pages: " + actual_root.pages +"\"]\n";
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
                link += "n"+actual_root.id + "-> n"+actual_root.left.id+"\n";
            }
            if(actual_root.right != null){
                link += "n"+actual_root.id + "-> n"+actual_root.right.id+"\n";
            }
        }
        return link;

    }
}
//END MOVIE AVL TREE

//BEGIN: Movie ordered by name
//It´s only function is to get the information in alphabetical order
class ordered_movie_node{
    constructor(_id, _name){
        this.id = _id;
        this.name = _name;
        this.left = null;
        this.right = null;
        this.height = 0;
    }
}

class ordered_movie_avl_tree{
    constructor(){
        this.root = null;
    }

    insert(_id, _name){
        let new_movie = new ordered_movie_node(_id, _name);
        
        if(this.root == null){
            this.root = new_movie;
            return;
        }
        //Calling the recursion function for insertion
        this.root = this.insert_node(this.root, new_movie);
    }
    //Recursive function that inserts a node
    insert_node(actual_root, new_movie){
        //Base Case:
        if(actual_root == null){
            actual_root = new_movie;
            return actual_root;
        }
        //Traveling between childs:
        console.log(new_movie.name,"thius is the name", actual_root.name);
        console.log(new_movie.name < actual_root.name)
        if(new_movie.name < actual_root.name){
            //Inserting the node recursively
            actual_root.left = this.insert_node(actual_root.left, new_movie); 
            if(this.height(actual_root.right) - this.height(actual_root.left) == -2){
                //We are in a left situation, now we have to determinate if it is a simple or double rotation
                if(new_movie.name < actual_root.left.name){
                    //We have concluded that it is a simple rotation
                    actual_root = this.left_left_rotation(actual_root);
                }else{
                    //We have concluded that it is a double rotation
                    actual_root = this.left_right_rotation(actual_root);
                }
            } 
            
        }
        
        if(new_movie.name > actual_root.name){
            //Inserting the node recursively
            actual_root.right = this.insert_node(actual_root.right, new_movie); 
            if(this.height(actual_root.right) - this.height(actual_root.left) == 2){
                //We are in a right situation, now we have to determinate if it is a simple or double rotation
                if(new_movie.name > actual_root.right.name){
                    //We have concluded that it is a simple rotation
                    actual_root = this.right_right_rotation(actual_root);
                }else{
                    //We have concluded that it is a double rotation
                    actual_root = this.right_left_rotation(actual_root);
                }
            }            
        }
        actual_root.height = this.max_height(this.height(actual_root.right), this.height(actual_root.left)) +1;
        return actual_root;
    }

    //Getting the height of a simple node;
    //Cleaner looking code purposses
    height(node){
        if(node == null){
            return -1;
        }
        return node.height;
    }

    //Next we will make the comparison of the heights
    //Just for swapping purposses during rotations
    max_height(h1, h2){
        if(h2 >= h1){
            return h2;
        }
        return h1;
    }

    //Rotations:
    //Covering all the situations required to make an efficient rotation
    left_left_rotation(current_node){
        let left_node = current_node.left;
        current_node.left = left_node.right;
        left_node.right = current_node;
        current_node.height = this.max_height(this.height(current_node.left), this.height(current_node.right)) + 1;
        left_node.height = this.max_height(current_node.height, this.height(current_node.left)) + 1;
        return left_node;

    }

    right_right_rotation(current_node){
        let right_node = current_node.right;
        current_node.right = right_node.left;
        right_node.left = current_node;
        current_node.height = this.max_height(this.height(current_node.left), this.height(current_node.right)) + 1;
        right_node.height = this.max_height(current_node.height, this.height(current_node.right)) + 1;
        return right_node;
    }

    left_right_rotation(node){
        node.left = this.right_right_rotation(node.left);
        let aux = this.left_left_rotation(node);
        return aux;
    }

    right_left_rotation(node){
        node.right = this.left_left_rotation(node.right);;
        let aux = this.right_right_rotation(node);
        return aux;
    }


    //Required to get the movie information in order
    in_order(actual_root, movie_avl_tree){
        //Case base
        if(actual_root != null){
            this.in_order(actual_root.left, movie_avl_tree);
            //Getting the movie
            var movie = this.find_movie_id_avl(actual_root.name, movie_avl_tree);
            //Information
            var parent_div = document.getElementById("alphabetical_movie");
            var children_div = document.createElement("div");
            var h2_name = document.createElement("h2");
            var _name = document.createTextNode(movie.name +": "+movie.punctuation+" Estrellas");
            var h3_price = document.createElement("h3");
            var _price = document.createTextNode("Precio: Q."+movie.price);
            var p_description = document.createElement("p");
            var _description = document.createTextNode("Description: "+movie.description);
            var p_rank = document.createElement("p");
            var _rank = document.createTextNode("Rankea!");
            var array = [1,2,3,4,5];
            var select_list = document.createElement("select");
            select_list.id = "mySelect";
            h3_price.appendChild(_price);
            h2_name.appendChild(_name);
            p_description.appendChild(_description);
            children_div.appendChild(h2_name);
            children_div.appendChild(h3_price);
            children_div.appendChild(p_description);
            parent_div.appendChild(children_div);
            p_rank.appendChild(_rank)
            parent_div.appendChild(p_rank);
            parent_div.appendChild(select_list);
            for (var i = 0; i < array.length; i++) {
                var option = document.createElement("option");
                option.value = array[i];
                option.text = array[i];
                select_list.appendChild(option);
            }
            //Information
            //Comments
            var comment_div = document.createElement("div");
            var h4_comment = document.createElement("h4");
            comment_div.id = movie.id +"_comments1";
            var _comment = document.createTextNode("Comentarios:");
            h4_comment.appendChild(_comment);
            comment_div.appendChild(h4_comment);
            parent_div.appendChild(comment_div);
            //Comments

            //Inputs
            var inputs_div = document.createElement("div");
            var input_comment = document.createElement("input");
            input_comment.setAttribute("type","text");
            input_comment.id = movie.id +"_comment1";
            input_comment.classList = "comment";
            inputs_div.appendChild(input_comment);
            var rent_button = document.createElement("button");
            rent_button.textContent = "Rentar";
            rent_button.classList = "comment";
            rent_button.onclick = function(){
                console.log(movie.id);
                
            }
            var comment_button = document.createElement("button");
            comment_button.textContent = "Comentar";
            comment_button.classList = "comment";
            comment_button.onclick = function(){
                var commentary1 = document.getElementById(movie.id +"_comments1");
                var commentary2 = document.getElementById(movie.id +"_comments2");
                var p_comment = document.createElement("p");
                var p_comment2 = document.createElement("p");
                var new_comment = document.createTextNode(user_list.session_user.username+": "+document.getElementById(movie.id +"_comment1").value);
                var new_comment2 = document.createTextNode(user_list.session_user.username+": "+document.getElementById(movie.id +"_comment1").value);
                p_comment.appendChild(new_comment);
                p_comment2.appendChild(new_comment2);
                commentary1.appendChild(p_comment);
                console.log(commentary1);
                commentary2.appendChild(p_comment2);
                
            }
            inputs_div.appendChild(rent_button);
            inputs_div.appendChild(comment_button);
            parent_div.appendChild(inputs_div);
            //Inputs

            this.in_order(actual_root.right, movie_avl_tree);
        }
    }

    //Required to get the movie information in reverse order
    reverse_order(actual_root, movie_avl_tree){
        //Case base
        if(actual_root != null){
            this.reverse_order(actual_root.right, movie_avl_tree);
            //Getting the movie
            var movie = this.find_movie_id_avl(actual_root.name, movie_avl_tree);
            //Information
            var parent_div = document.getElementById("reverse_movie");
            var children_div = document.createElement("div");
            var h2_name = document.createElement("h2");
            var _name = document.createTextNode(movie.name +": "+movie.punctuation+" Estrellas");
            var h3_price = document.createElement("h3");
            var _price = document.createTextNode("Precio: Q."+movie.price);
            var p_description = document.createElement("p");
            var _description = document.createTextNode("Description: "+movie.description);
            var p_rank = document.createElement("p");
            var _rank = document.createTextNode("Rankea!");
            var array = [1,2,3,4,5];
            var select_list = document.createElement("select");
            select_list.id = "mySelect";
            h3_price.appendChild(_price);
            h2_name.appendChild(_name);
            p_description.appendChild(_description);
            children_div.appendChild(h2_name);
            children_div.appendChild(h3_price);
            children_div.appendChild(p_description);
            parent_div.appendChild(children_div);
            p_rank.appendChild(_rank)
            parent_div.appendChild(p_rank);
            parent_div.appendChild(select_list);
            for (var i = 0; i < array.length; i++) {
                var option = document.createElement("option");
                option.value = array[i];
                option.text = array[i];
                select_list.appendChild(option);
            }
            //Information
            //Comments
            var comment_div = document.createElement("div");
            var h4_comment = document.createElement("h4");
            comment_div.id = movie.id +"_comments2";
            var _comment = document.createTextNode("Comentarios:");
            h4_comment.appendChild(_comment);
            comment_div.appendChild(h4_comment);
            parent_div.appendChild(comment_div);
            //Comments

            //Inputs
            var inputs_div = document.createElement("div");
            var input_comment = document.createElement("input");
            input_comment.setAttribute("type","text");
            input_comment.id = movie.id +"_comment2";
            input_comment.classList = "comment";
            inputs_div.appendChild(input_comment);
            var rent_button = document.createElement("button");
            rent_button.textContent = "Rentar";
            rent_button.classList = "comment";
            rent_button.onclick = function(){
                console.log(movie.id);
                
            }
            var comment_button = document.createElement("button");
            comment_button.textContent = "Comentar";
            comment_button.classList = "comment";
            comment_button.onclick = function(){
                var commentary1 = document.getElementById(movie.id +"_comments1");
                var commentary2 = document.getElementById(movie.id +"_comments2");
                var p_comment = document.createElement("p");
                var p_comment2 = document.createElement("p");
                var new_comment = document.createTextNode(user_list.session_user.username+": "+document.getElementById(movie.id +"_comment2").value);
                var new_comment2 = document.createTextNode(user_list.session_user.username+": "+document.getElementById(movie.id +"_comment2").value);
                p_comment.appendChild(new_comment);
                p_comment2.appendChild(new_comment2);
                commentary1.appendChild(p_comment);
                console.log(commentary1);
                commentary2.appendChild(p_comment2);
                
            }
            inputs_div.appendChild(rent_button);
            inputs_div.appendChild(comment_button);
            parent_div.appendChild(inputs_div);
            //Inputs
            this.reverse_order(actual_root.left, movie_avl_tree);
        } 
    }

    find_movie_by_name(_name){
        if(this.root == null){
            return "There is no element in movie tree"
        }

        let current_node = this.root;
        while(current_node != null){
            if(current_node.name > _name){
                current_node = current_node.left;
                continue;
            }
            if(current_node.name < _name){
                current_node = current_node.right;
                continue;
            }
            
            return current_node;
        }
        return "NOT FOUND";
    }

    find_movie_id_avl(name, movie_avl_tree){
        return movie_avl_tree.find_movie(this.find_movie_by_name(name).id);

    }
}
//END: Movie ordered by name

//Begin Hash table
class Nodo{
    constructor(_id, _category){
        this.id = _id;
        this.category = _category;
        this.next = null
    }
  }
  
  class Lista{
    constructor(){
        this.head = null
        this.size = 0;
    }
  
    //metodos de la lista
    //insertar
    insert(_id, _category){
      this.size++;
      var tempo = new Nodo(_id, _category)
      tempo.next = this.head
      this.head = tempo
    }
    //mostrar 
    printList(){
      var temporal = this.head
      while(temporal!=null){
          console.log(temporal.id)
          temporal = temporal.next
      }
    }
  
    getSize(){
      return this.size;
    }
  
    isEmpty(){
      return this.head === null ; 
    }

    get_element(value){
        var aux = this.head;
        for(var i = 0; i< this.size; i++){
            if(value == i ){
                return aux;
            }
            aux = aux.next;
        }
    }
  }
  
  class hash_table{
    constructor(size){
      this.amount =0;
      this.size =  size;
      this.table = [];
      for(let i = 0;i < size ; i++){
        this.table.push(new Lista())
      }
    }
  
    insert(_id, _category){
      var index = this.functionHash(_id);
      if(this.table[index].isEmpty()){
        this.amount++;
      }
      this.table[index].insert(_id, _category);
      this.rehashing()
    }
  
    functionHash(data){
      return data % this.size;
    }
  
    rehashing(){
      var porcentaje =this.amount/this.size
      if(porcentaje>0.75){
        var temp =this.table;
        var tempSize = this.size
        this.size = this.amount*5
        this.table = []
        for(let i = 0;i < this.size ; i++){
          this.table.push(new Lista())
        }
        this.amount =0;
        for(let i = 0;i < tempSize ; i++){
          if(!temp[i].isEmpty()){
            var nodo = temp[i].head;
            while(nodo!=null){
              this.insert(nodo.id, nodo.category);
              nodo = nodo.next
            }
          }
        }
  
      }
      console.log(this.table,porcentaje);
  
    }

    show(){
        for(var i = 0; i < this.size; i++){
            if(this.table[i].head != null){
                if(this.table[i].printList() != null){
                    console.log("-->"+this.table[i].printList());
                }
                
                
            }
            console.log("----------------->");

        }
    }

    graph(){
        var codigodot = "digraph G{\nlabel=\" Categorías \";\nnode [shape=box];\n ";

        for(var i=0; i<this.size;i++){
            codigodot += "U"+i+"[label = \""+i+"\" width = 1.5 style = filled, fillcolor = bisque1, group = 1 ];\n";
        }

        if(this.size > 0){
            for(var i = 0; i < this.size - 1; i++){
                codigodot += "U"+i+"->"+"U"+(i+1)+";\n";        
        }


        var counter2 = 0;
        for(var i = 0; i < this.size; i++){
            for(var j = 0; j < this.table[i].getSize(); j++){
                codigodot += "S"+counter2+"[label = \""+this.table[i].get_element(j).id+","+this.table[i].get_element(j).category+"\" width = 1.5 style = filled, fillcolor = bisque1, group = 1 ];\n";
                
                if(j == 0){
                    codigodot += "U"+(i)+"->S"+counter2+";\n";
                    codigodot += "{rank = same; U"+i+" S"+counter2+"}\n"
                }
                counter2++;
            }
        }

        }
        codigodot+="}"
        console.log(codigodot)
        d3.select("#user_graph").graphviz()
        .renderDot(codigodot)
    }

  
  }
//End Hash table

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
    var div_movies = document.getElementById("movies_user_div");
    div_login.style.display = "none";    
    div_user.style.display = "block";
    div_movies.style.display = "block";
}
//User -> log
function user_div_to_log(){
    var div_user = document.getElementById('user_div');
    var log = document.getElementById('log_div');
    var div_movies = document.getElementById("movies_user_div");
    var div_actor = document.getElementById("actor_user_div");
    div_user.style.display = "none"; 
    log.style.display = "block";
    div_actor.style.display = "none";
    div_movies.style.display = "none";
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
    var div_movies = document.getElementById("movies_user_div");
    //var div_categories = document.getElementById("categories_user_div");

    //div_user.style.display = "none";
    div_actor.style.display = "block"; 
    div_movies.style.display = "none";
    //div_categories.style.display = "block"; 
}

function movies_user_nav(){
    //var div_user = document.getElementById('user_user_div');
    var div_actor = document.getElementById("actor_user_div");
    var div_movies = document.getElementById("movies_user_div");
    //var div_categories = document.getElementById("categories_user_div");

    //div_user.style.display = "none";
    div_actor.style.display = "none"; 
    div_movies.style.display = "block";
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
      actor_tree.create_dot(actor_tree.root);
      console.log("Preorder");
      actor_tree.pre_order(actor_tree.root);
      console.log("Inorder");
      actor_tree.in_order(actor_tree.root);
      console.log("Postorder");
      actor_tree.post_order(actor_tree.root);
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
        id_movies_avl.insert(data.id_pelicula, data.nombre_pelicula, data.descripcion, data.puntuacion_star, data.precion_Q, data.paginas, data.categoria);
        alphabetical_movie_avl.insert(data.id_pelicula, data.nombre_pelicula, data.descripcion, data.puntuacion_star, data.precion_Q, data.paginas, data.categoria);
      }
      graph_movies();
      alphabetical_movie_avl.in_order(alphabetical_movie_avl.root, id_movies_avl);
      alphabetical_movie_avl.reverse_order(alphabetical_movie_avl.root, id_movies_avl);
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
    user_list.graph();
}
function graph_actor(){
    actor_tree.create_dot();
}

function graph_movies(){
    id_movies_avl.create_dot();
}

function pre_order(){
    console.log("Pre order");

    var pre_order_actor = document.getElementById("pre_order_actor");
    var in_d = document.getElementById("in_order_actor");
    var post = document.getElementById("post_order_actor");

    pre_order_actor.style.display = "block";
    in_d.style.display = "none";
    post.style.display = "none";

}

function in_order(){
    console.log("in order");
    var pre = document.getElementById("pre_order_actor");
    var in_d = document.getElementById("in_order_actor");
    var post = document.getElementById("post_order_actor");
    console.log(pre,"jhafjkadfskjhj");

    in_d.style.display = "block";
    pre.style.display = "none";
    post.style.display = "none";

}

function post_order(){
    console.log("Post order");
    var pre = document.getElementById("pre_order_actor");
    var in_d = document.getElementById("in_order_actor");
    var post = document.getElementById("post_order_actor");
    post.style.display = "block";
    pre.style.display = "none";
    in_d.style.display = "none";

}

function alphabetical_order(){
    var alpha = document.getElementById("alphabetical_movie");
    var reverse = document.getElementById("reverse_movie");

    alpha.style.display = "block";
    reverse.style.display = "none";
}

function reverse_order(){
    var alpha = document.getElementById("alphabetical_movie");
    var reverse = document.getElementById("reverse_movie");

    alpha.style.display = "none";
    reverse.style.display = "block";
}
//END: Dynamic web

//BEGIN: Creating user list
var user_list = new user_List();
var actor_tree = new actor_binary_search_tree();
var id_movies_avl = new movie_avl_tree();
var alphabetical_movie_avl = new ordered_movie_avl_tree();
user_list.insert("EDD", "Oscar Armi",sha256("12345678"),"2354168452525","12345678", true);
user_list.insert("ED", "Oscar Armi", sha256("12345678"),"2354168452525","12345678", false);
//END: Creating user list

//BEGIN: Download graphs:
function download_user_graph(){
    const screenshot_target = document.getElementById("user_graph");
    html2canvas(screenshot_target).then((canvas) => {
        const base64image = canvas.toDataURL("image/png");
        var anchor = document.createElement('a');
        anchor.setAttribute("href", base64image);
        anchor.setAttribute("download", "user_graph.png");
        anchor.click();
        anchor.remove();
    })
}

function download_actors_graph(){
    const screenshot_target = document.getElementById("actor_graph");
    html2canvas(screenshot_target).then((canvas) => {
        const base64image = canvas.toDataURL("image/png");
        var anchor = document.createElement('a');
        anchor.setAttribute("href", base64image);
        anchor.setAttribute("download", "actor_graph.png");
        anchor.click();
        anchor.remove();
    })
}

function download_movies_graph(){
    const screenshot_target = document.getElementById("movies_graph");
    html2canvas(screenshot_target).then((canvas) => {
        const base64image = canvas.toDataURL("image/png");
        var anchor = document.createElement('a');
        anchor.setAttribute("href", base64image);
        anchor.setAttribute("download", "movies_graph.png");
        anchor.click();
        anchor.remove();
    })
}
function download_categories_graph(){
    const screenshot_target = document.getElementById("categories_graph");
    html2canvas(screenshot_target).then((canvas) => {
        const base64image = canvas.toDataURL("image/png");
        var anchor = document.createElement('a');
        anchor.setAttribute("href", base64image);
        anchor.setAttribute("download", "categories_graph.png");
        anchor.click();
        anchor.remove();
    })
}
//END: Download graphs








var tabla = new hash_table(20);
tabla.insert(20,25);
tabla.insert(21,25);
tabla.insert(22,25);
tabla.insert(23,25);
tabla.insert(24,25);
tabla.insert(25,25);
tabla.insert(26,25);
tabla.insert(27,25);
tabla.insert(28,25);
tabla.insert(29,25);
tabla.insert(30,25);
tabla.insert(31,25);
tabla.insert(32,25);
tabla.insert(33,25);
tabla.insert(34,25);
tabla.insert(35,25);
tabla.insert(36,25);
tabla.insert(37,25);

tabla.show();
tabla.graph()
