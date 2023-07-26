var websiteName= document.getElementById('siteName') ;
var url = document.getElementById('url') ;


var websites = [] ;



if ( localStorage.getItem("website") != null) {
    websites = JSON.parse(localStorage.getItem("website")) 
    displayWebsites ()


}


function submitWebsite() {

    var NameCheck =  /[a-z0-9]{3,}/ig 
    var UrlCheck = /[.]/ ;
    

    if (  !NameCheck.test(websiteName.value) || !UrlCheck.test(url.value    )) {
    errorMessage()  



    }

    else {
        



            var website = {       
                name : websiteName.value , 
                url : url.value ,
            }
        
            websites.push(website) ;
            console.log (websites) ;
            localStorage.setItem ("website" , JSON.stringify(websites)) ;
        
            clearData()
            displayWebsites ()



    }
    

    
}

function clearData () {
    websiteName.value = "" ;
    url.value = "" ;
    document.querySelector('#siteName').classList.remove('is-invalid')  
    document.querySelector('#url').classList.remove('is-invalid')  
    document.querySelector('#siteName').classList.remove('is-valid')  
    document.querySelector('#url').classList.remove('is-valid')  

}


function displayWebsites () {
    var cartona =""
    for (var i = 0 ; i < websites.length ; i++){
        cartona = cartona + `<tr>
        <td>${i}</td>
        <td>${websites[i].name}</td>              
        <td>
        <a target="_blank" href="${websites[i].url}"><button class="btn visit btn-success  " data-index="0">
        <i class="fa-solid fa-eye pe-2"></i>Visit
        </button></a>
        </td>
        <td>
    

        <button onclick="deleteElement(${i})"   class="btn delete btn-danger pe-2" data-index="0">
            <i class="fa-solid fa-trash-can"></i>
            Delete
        </button>
        </td>
    </tr>`

    }
    document.getElementById('tbody').innerHTML = cartona ;



}

function deleteElement (index ) {

        websites.splice( index , 1)
        localStorage.setItem ("website" , JSON.stringify(websites)) ;

        displayWebsites () ;




}

function clearAll(index) {
    websites.splice( index )
    localStorage.clear("website")
    displayWebsites () ;

}

function ValidateName (){
    var NameIsValid = /[a-z0-9]{3,}/ig
    var Namevalue =  websiteName.value
    if (NameIsValid.test(Namevalue) == false || nameExist()  ) {
        document.querySelector('#siteName').classList.add('is-invalid')  
        
    }
    else {

        document.querySelector('#siteName').classList.remove('is-invalid')  

        document.querySelector('#siteName').classList.add('is-valid')

    

    }
        // return ValidateName ;
}
websiteName.addEventListener('keyup' , ValidateName)


function ValidateUrl() {
    var UrlIsValid = /[.]/
    var Urlvalue = url.value 
    if (UrlIsValid.test(Urlvalue) ==false) {
        document.querySelector('#url').classList.add('is-invalid')
    }
    else {
        document.querySelector('#url').classList.remove('is-invalid')
        document.querySelector('#url').classList.add('is-valid')


    }
    // return ValidateUrl() ;
    
}

url.addEventListener('keyup' , ValidateUrl) ;

function errorMessage(){

    document.getElementById("dd").innerHTML = `
    <div class="modal fade show" id="exampleModal" style="display: block;" aria-modal="true" role="dialog">
    <div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
        <div class="circles d-flex">
            <span class="rounded-circle me-2"></span>
            <span class="rounded-circle me-2"></span>
            <span class="rounded-circle me-2"></span>
        </div>
        </div>
        <div class="modal-body">
            <p class="m-0 pb-2">
            Site Name or Url is not valid, Please follow the rules below :
            </p>       
            <ol class="rules list-unstyled m-0">
            <li>
                <i class="fa-regular fa-circle-right p-2"></i>Site name must
                contain at least 3 characters
            </li>
            <li>
                <i class="fa-regular fa-circle-right p-2"></i>The link must include (.)
            </li>
            <div class="d-flex justify-content-end">
            <button class="btn btn-outline-primary mt-2" onclick="tryAgain()" >Try Again</button>
            </div>

            </ol> 
        </div>
        
        </div>
    </div>
    </div>`

}
function tryAgain() {
    document.getElementById('exampleModal').style.display ="none" ;
    
}
// function validationNameAndUrl() {

// }
function AreYouSure() {
    document.getElementById("sure").innerHTML = `    <div class="modal fade show" id="exampleModal2" style="display: block;" aria-modal="true" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <div class="circles d-flex">
            <span class="rounded-circle me-2"></span>
            <span class="rounded-circle me-2"></span>
            <span class="rounded-circle me-2"></span>
          </div>
        </div>
        <div class="modal-body">
          <p class="m-0 pb-2">
            The list will be cleared. are you sure          
          </div>
          <div class="buttons d-flex justify-content-end mb-2 me-2">
            <button id="clear" class="btn btn-outline-danger ms-2"> Clear</button>
            <button id="cancel" class="btn btn-outline-info ms-2"> Cancel</button>
          </div>
          
        
      </div>
    </div>
</div>`

    var clear = document.getElementById("clear") ;
    var cancel =document.getElementById("cancel") ;
    clear.addEventListener("click" ,function () {
        document.getElementById('exampleModal2').style.display ="none" ;
        websites =[]
        localStorage.clear("website")
        displayWebsites () ;;
    } )


        
    
    cancel.addEventListener( "click" ,  function () {
    document.getElementById('exampleModal2').style.display ="none" ;

}
)

    
}
var ok = document.getElementById("repeat")
var x = true 
function nameExist() {
for (var i =0 ; i< websites.length ; i++) {
    if(websiteName.value == websites[i].name ){
        x = false 
        ok.innerHTML = ` <div class="modal fade show" id="exampleModal3" style="display: block;" aria-modal="true" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
            <div class="circles d-flex">
                <span class="rounded-circle me-2"></span>
                <span class="rounded-circle me-2"></span>
                <span class="rounded-circle me-2"></span>
            </div>
            </div>
            <div class="modal-body">
            <p class="m-0 pb-2">
                this name is exist
                </p>     
                </div>
                <div class="buttons d-flex justify-content-end mb-2 me-2">
                <button id="ok" class="btn btn-outline-info ms-2"> Ok</button>
                </div>

            
            </div>
        </div>
        </div>`
        break;
    }
    else{
        x=true;
    }
}
}
ok.addEventListener('click' ,  function () {
    document.getElementById('repeat').style.display= "none" ;
    
})

