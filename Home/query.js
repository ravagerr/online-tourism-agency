function queryView()
{
    
    var firstName=document.queryform.firstName.value;
    var eMail=document.queryform.email.value;
    var Subject=document.queryform.subject.value;
    var Message=document.queryform.message.value;

    var toggle=1;
    var rightForm = document.getElementById("form-Output");
    rightForm.style.display="none";

    if(firstName=="")
    {
        alert("Name is empty.");
        toggle=0;
    }
    else if(eMail=="")
    {
        alert("Email is empty.");
        toggle=0;
    }
    else if(Subject==-1)
    {
        alert("Subject is empty.");
        toggle=0;
    }
    else if(Message=="")
    {
        alert("Message is empty.");
        toggle=0;
    }
    var atsign = eMail.indexOf("@");
    var dotsign = eMail.lastIndexOf(".");
    if(atsign < 1 || ( dotsign - atsign < 2 ))
    {
            alert("Email is invalid.");
            toggle=0;
    }
    if(toggle==1)
    {   
        console.log(rightForm.style.display);
        
        if (rightForm.style.display =="none")
        {
            rightForm.style.display = "block";
        }
        else
        {
            rightForm.style.display = "none";
        }
        document.getElementById("output-name").innerHTML = firstName;
        document.getElementById("omail").innerHTML = eMail;
        document.getElementById("output-subject").innerHTML = Subject;
        document.getElementById("output-message").innerHTML = Message;
        document.queryform.firstName.value="";
        document.queryform.email.value="";
        document.queryform.subject.value="";
        document.queryform.message.value="";
    }
}

function queryEdit()
{
    var rightForm = document.getElementById("form-Output");
    if (rightForm.style.display =="none")
    {
        rightForm.style.display = "block";
    }
    else
    {
        rightForm.style.display = "none";
    }
    var firstName=document.getElementById("output-name").innerHTML;
    var email=document.getElementById("omail").innerHTML;
    var sub=document.getElementById("output-subject").innerHTML;
    var detail=document.getElementById("output-message").innerHTML;

    document.queryform.firstName.value=firstName;
    document.queryform.email.value=email;
    document.queryform.subject.value=sub;
    document.queryform.message.value=detail;

    document.getElementById("output-name").innerHTML = "";
    document.getElementById("omail").innerHTML = "";
    document.getElementById("output-subject").innerHTML = "";
    document.getElementById("output-message").innerHTML = "";
}

function querySend()
{
   let subjectEmail = document.getElementById("output-subject").innerHTML;
   let MessageBody = document.getElementById("output-message").innerHTML;
    window.open("mailto:"+"contact@tourism.prestige"+"?subject="+subjectEmail+"&body="+MessageBody);

    alert("Sucess!");
}


/*References
https://www.tutorialspoint.com/javascript/javascript_form_validations.htm
https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp




*/

