
let Cart = [];

const lb_CartCount = function ()
{
    return document.getElementById("CartCount");
}
const  d_Cart = function (){
    return document.getElementById("Cart");
}
const Btn_Cart = function (){
    return document.getElementById("btn_Cart")
}

function Initialise(){
    UpdateCart();
}
let CurrentID = 1;


/*
function CheckOut(){
    console.log("Checking Out..");
    window.location.href="../Checkout.html";
}*/

function ClearCart(){
    Cart = [];
    UpdateCart();
}

//Adds items to cart
function AddToCart(Name, Price, Qty, Image){

    var Found = false;
    Cart.forEach((i)=>{
        if(i.Name === Name){
            i.Qty +=Qty;
            UpdateCart();
            Found = true;
            return 0;
        }
    });
    if(Found) return;
    console.log('Added '+Name +' To Cart');
    console.log(Cart.length);

    Cart.push({ID: CurrentID ,Name: Name, Price: Price , Qty: Qty, Image: Image});
    CurrentID++;
    UpdateCart();
}
function Qty(Name, Number)
{
    console.log("Removing 1 from " + Name.toString());

    Cart.forEach((i)=>{
        if(i.Name === Name){
            i.Qty += Number;
            UpdateCart();
            return 0;
        }
    });
}
function AddQty(Name)
{
    console.log("Adding 1 to " + Name.toString());

    Cart.forEach((i)=>{
        if(i.Name === Name){
            i.Qty +=1;
            UpdateCart();
            return 0;
        }
    });
}
//Removes Item From Cart
function RemoveFromCart(Name){
    console.log("Removing " + Name.toString());
    var idx = 0;
    Cart.forEach((i)=>{
        if(i.Name === Name){
            Cart = Cart.slice(i.index,1);
            console.log("Removed " + Name.toString() +" idx:"+idx.toString());
            return;
        }
        idx++;
    });
    //UpdateCart();
}
function ToggleCart(){
    d_Cart().hidden = d_Cart().hidden !== true;
}
let LoadedCart = false;
//Updates cart to reflect changes
function UpdateCart(){
    console.log("Updating Cart");
    console.log(Cart);
 /*   if(!LoadedCart){ //Checks if cart was loaded from storage on first page load and trys to load if it fails then its set to empty
        try{
            Cart = JSON.parse(localStorage.getItem("Cart"));
        }
        catch (error){
            Cart=[];
        }
        Btn_Cart().hidden = true;
        LoadedCart= true;
    }*/
    if(Cart.length !== 0) {
        Btn_Cart().hidden = false;
       //d_Cart().hidden = false;
        lb_CartCount().innerText = Cart.length.toString()
        let List = document.getElementById("OrderList");
        List.innerText = "";
        let Count = 1;

        let Vat = 0;
        let SubTotal = 0;
        let Total = 0;

        Cart.forEach((i) => {
            if (i.Qty <= 0) {
                RemoveFromCart(i.Name);
            }
            else {
                let div = document.createElement("div");
                div.style = "float:left; margin:10px; width:100%";


                let Image = document.createElement("img");
                Image.src = i.Image;
                Image.className = "ItemImg";
                Image.style = " width: 100px; height: 70px; float:left; margin-right: 10px";


                let Name = document.createElement("h3");
                //addOnclick(li, RemoveFromCart, i.ID);
                Name.innerText = ` ${i.Name}  £${i.Price}`;
                Name.style = "float:left;";

                //Add qty button
                let AddBtn = document.createElement("span");
                AddBtn.className = "fas fa-plus-circle QtyButton";
                AddBtn.style = "color: Green; float:left;";
                AddBtn.onclick = function () {
                    Qty(i.Name, 1);
                };

                //Remove QTY button
                let MinusBtn = document.createElement("span");
                MinusBtn.className = "fas fa-minus-circle QtyButton";
                MinusBtn.style = "color: Red; float: left;";
                MinusBtn.onclick = function () {
                    Qty(i.Name, -1);
                };
                // div.innerHTML = li.outerHTML + AddBtn.outerHTML;
                var lb_Qty = document.createElement("h5");
                lb_Qty.innerText = i.Qty;
                lb_Qty.style = "float:left; margin-left:5px; margin-right:-5px";

                div.appendChild(Image)
                div.appendChild(Name);
                div.appendChild(document.createElement("br"))
                div.appendChild(AddBtn);
                div.appendChild(lb_Qty);
                div.appendChild(MinusBtn);
                List.appendChild(div);
                Count++;

                Total += (i.Qty * i.Price);





            }
        });
        //Updates Price
        SubTotal = (Total / 120) * 100 ;
        Vat = Total - SubTotal;
        document.getElementById("Vat").innerText = "£"+Vat.toFixed(2);
        document.getElementById("SubTotal").innerText = "£"+SubTotal.toFixed(2);
        document.getElementById("Total").innerText = "£" + Total.toFixed(2);;

        //Saves cart to storage
        window.localStorage.setItem("Cart", JSON.stringify(Cart));
    }
    else{
        Btn_Cart().hidden = true;
        d_Cart().hidden = true;
    }





}