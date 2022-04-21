
let Cart = [];

//Gets stored cart info
function Initialise(){
    Cart = JSON.parse(localStorage.getItem("Cart"));
    console.log(Cart);
}
//Checks if input is only numbers
function IsNumbers(Value)
{
    var regex=/^[0-9]+$/;
    if (Value.match(regex))
    {
        return true;
    }
    return false;
}
//Checks if email is valid
function CheckEmail(Email){
    var At = Email.indexOf("@");
    var Dot = Email.lastIndexOf(".");
    if(At < 1 || ( Dot - At < 2 ))
        return false;
    return true;
}


let Form = {}
function GetValue(ID){
    console.log("Getting: "+ID);
  /*  try{
        return document.getElementById(ID).value;
    }
    catch (NullReferenceException){
        return "";
    }*/
    let Value = document.getElementById(ID).value;
    console.log(Value);

    return Value;
   /* if (typeof Value !== "undefined" && Value.value === '')
        return Value;
    return "";*/
}
function SubmitForm(){



//    console.log(document.getElementById("iEmail").value);

  //  return;
    console.log(GetValue("iEmail"));

    Form = {Name: GetValue("iName"),
        Email:GetValue("iEmail"),
        Phone:GetValue("iPhone"),
        Line1:GetValue("iLine1"),
        Line2:GetValue("iLine2"),
        City:GetValue("iCity"),
        Postcode:GetValue("iPostcode")};
    console.log(Form);

    if(Form.Name.length < 2){
        alert("Name too short");
        return;
    }
    if(Form.Email.length === 0)
        alert("Must enter email");
    else if(!CheckEmail(Form.Email))
    {
        alert("Invalid Email");
        return;
    }

    if(IsNumbers(Form.Phone) === false){
        alert("Invalid Phone Number")
        return;
    }
    else if(Form.Phone.length < 7){
        alert("Invalid Phone Number")
        return;
    }

    if(Form.Line1.length === 0)
    {
        alert("Must enter line 1 address")
        return;
    }

    if(Form.City.length === 0)
    {
        alert("Must enter city")
        return;
    }

    if(Form.Postcode.length === 0)
    {
        alert("Must enter postcode")
        return;
    }

    if(!document.getElementById("iTOS").checked){
        alert("Must agree to terms")
        return;
    }
    window.localStorage.setItem("Form",JSON.stringify(Form));
    document.getElementById("DetailsForm").hidden = true;
    ShowInvoice();

}


function SetInvoiceValue(ID, Text){
    document.getElementById(ID).innerText = Text;

}
//Create random number for order number
function RanNum(length) {
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return  result;
}
function ShowInvoice(){
    document.getElementById("Invoice").hidden = false;
    SetInvoiceValue("dOrderNum","Order Placed #"+RanNum(4));
    SetInvoiceValue("dName",Form.Name);
    SetInvoiceValue("dEmail",Form.Email);
    SetInvoiceValue("dPhone",Form.Phone);
    SetInvoiceValue("dLine1",Form.Line1);
    SetInvoiceValue("dLine2",Form.Line2);
    SetInvoiceValue("dCity",Form.City);
    SetInvoiceValue("dPostcode",Form.Postcode);

    let List = document.getElementById("OrderList");
    List.innerText = "";

    let Var = 0;
    let SubTotal =0;
    let Total = 0;
    Cart.forEach((i)=>{
        let div = document.createElement("div");
        div.style = "float:left; margin:10px; width:100%";

        let Image = document.createElement("img");
        Image.src = i.Image;
        Image.className = "ItemImg";
        Image.style = " width: 70px; height: 40px; float:left; margin-right: 10px";

        let Name = document.createElement("p");
        //addOnclick(li, RemoveFromCart, i.ID);
        Name.innerText = ` ${i.Name} £${i.Price} - ${i.Qty}`;
        Name.style = "float:left;";

        div.appendChild(Image)
        div.appendChild(Name);
        List.appendChild(div);
        Total += (i.Qty * i.Price);
    });

    //Updates Price
    SubTotal = (Total / 120) * 100;
    Vat = Total - SubTotal;
    document.getElementById("dVat").innerText = "£"+Vat.toFixed(2);
    document.getElementById("dSubTotal").innerText = "£"+SubTotal.toFixed(2);
    document.getElementById("dTotal").innerText = "£" + Total.toFixed(2);;
}



function PrintInvoice() {
    var Head = "<html><head><title></title></head><body>";
    var Foot = "</body>";
    var New = document.getElementById("InvoiceContent").innerHTML;
    var Old = document.body.innerHTML;
    document.body.innerHTML = Head + New + Foot;//Gets rid of top nav bar and everthing else so only the invoice gets printed
    window.print(); //Opens print dialog
    document.body.innerHTML = Old;//reverts to old page
    return false;
}
