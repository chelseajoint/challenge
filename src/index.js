//establecemos la fecha de loan-date
let dateControl = new Date();
let dd = dateControl.getDate();
let mm = dateControl.getMonth() + 1; //January is 0!
let yyyy = dateControl.getFullYear();

if (dd < 10) {
    dd = '0' + dd;
}

if (mm < 10) {
    mm = '0' + mm;
} 
    
dateControl = yyyy + '-' + mm + '-' + dd;
document.querySelector('.loan-date__input').setAttribute("min", dateControl);

//llamada para obtener los datos
let id = '';

window.addEventListener('load', () => {
    id = 2;

    const options = {
        method: 'GET',
        headers: {
            'X-WEB-KEY': 'Development',
           'Content-Type': 'application/json'
        }
    }

    fetch(`https://api7.cloudframework.io/recruitment/fullstack/users?id=${id}`, options)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            resultContent(data);
        })
        .catch(() => {
            info.innerHTML = 'error';
        });
});

// funccion de auto-completado de formulario
function resultContent(data){
    let name = document.querySelector('.name__input');
    let contentName ='';
    let dataName = data.data.name;
    contentName = contentName + dataName;
    name.setAttribute('value', contentName);

    let surname = document.querySelector('.surname__input');
    let contentSurname ='';
    let dataSurname = data.data.surname;
    contentSurname = contentSurname + dataSurname;
    surname.setAttribute('value', contentSurname);

    let email = document.querySelector('.email__input');
    let contentEmail ='';
    let dataEmail = data.data.email;
    contentEmail = contentEmail + dataEmail;
    email.setAttribute('value', contentEmail);

    let phone = document.querySelector('.phone__input');
    let contentPhone ='';
    let dataPhone = data.data.phone;
    contentPhone = contentPhone + dataPhone;
    phone.setAttribute('value', contentPhone);

    let age = document.querySelector('.age__input');
    let contentAge ='';
    let dataAge = data.data.age;
    contentAge = contentAge + dataAge;
    age.setAttribute('value', contentAge);
};

//enviamos los datos del formulario
const cta = document.querySelector('.cta');
let info = document.querySelector('.info');

cta.addEventListener('click', () => {
    let name = document.querySelector('.name__input');
    let surname = document.querySelector('.surname__input');
    let email = document.querySelector('.email__input');
    let phone = document.querySelector('.phone__input');
    let age = document.querySelector('.age__input');
    let loanAmount = document.querySelector('.loan-amount__input');
    let coin = document.querySelector('.coin-select');
    let loanWeeks = document.querySelector('.loan-weeks-select');
    const check = document.querySelector('.check__input');

    let inputName = name.value;
    let inputSurame = surname.value;
    let inputEmail = email.value;
    let inputPhone = phone.value;
    let inputAge = age.value;
    let inputLoanAmount = loanAmount.value;
    let inputCoin = coin.value;
    let inputLoanWeeks = loanWeeks.value;

    const form = document.querySelector('.form'); 

    const phoneIf = inputPhone.length < 6 || inputPhone.length > 14;
    const ageIf = inputAge > 100 || inputAge < 18;
    const loanAmountIf = inputLoanAmount > 1000 || inputLoanAmount < 10;
    const coinIf = inputCoin === 'seleccionar';
    const loanWeeksIf = inputLoanWeeks === 'seleccionar';

    check.onchange
    const checkIf = check.checked == false;

    const condition = phoneIf || ageIf || loanAmountIf || coinIf || loanWeeksIf || checkIf;
    
    //funccion de la visualisacion de los errores
    function invalid(){
        function phoneInvalid(){
            if(phoneIf){
                phone.setAttribute("required", "");  
            }
        };

        function ageInvalid(){
            if (ageIf){
                age.setAttribute('required', '');
            }
        };

        function loanAmountInvalid(){
            if (loanAmountIf){
                loanAmount.setAttribute('required', '');
            }
        };

        function coinInvalid(){
            if (coinIf){
                coin.setAttribute('required', '');
            }
        };

        function loanWeeksInvalid(){
            if (loanWeeksIf){
                loanWeeks.setAttribute('required', '');
            }
        };

        function checkInvalid(){
            if (checkIf){
                check.setAttribute('required', '');
            }
        };

        phoneInvalid();
        ageInvalid();
        loanAmountInvalid();
        coinInvalid();
        loanWeeksInvalid();
        checkInvalid();
        
    };

    if(condition){
        info.innerHTML = 'Completa el formulario';

        invalid();
    }else{
        //enviamos los datos del formulario
        const options = {
            method: 'POST',
            headers: {
                'X-WEB-KEY': 'Development',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: inputName,
                surname: inputSurame,
                email: inputEmail,
                phone: inputPhone,
                age: inputAge,
                loan_amount: inputLoanAmount + inputCoin,
                loan_weeks: inputLoanWeeks
            })
    };
    
        // fetch(`https://api7.cloudframework.io/recruitment/fullstack/users/${id}`, options)
        fetch('https://jsonplaceholder.typicode.com/posts', options)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                response();
            })
            .catch(() => {
                error();
            });
    };

    function response(){
        const response = `
        <div class="response">
        <div class="thanks">Gracias</div>
        <div class="data">Datos enviados&#58</div>
            <ul>
                <li>Nombre&#58; ${inputName} ${inputSurame}</li>
                <li>Email&#58; ${inputEmail}</li>
                <li>Tel&eacute;fono&#58; ${inputPhone}</li>
                <li>Edad&#58; ${inputAge}</li>
                <li>Importe pr&eacute;stamo &#58; ${inputLoanAmount + inputCoin}</li>
                <li>Tiempo a devoler&#58; ${inputLoanWeeks} a&ntilde;os</li>
            </ul>
        <div class="contacto">En breve nos pondremos en contacto</div>
        </div>`;

        form.innerHTML = response;
    };

    function error(){
        const response = `
        <div class="response">
        <div class="thanks">Error</div>
        <button class="cta" onClick="window.location.reload()">Volver al formulario</button>
        </div>`;
        form.innerHTML = response;

    };

});




