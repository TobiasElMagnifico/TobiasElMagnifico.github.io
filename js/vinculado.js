

const btnSwitch = document.querySelector('#switch');

btnSwitch.addEventListener('click', () => {
    document.body.classList.toggle('light');
    btnSwitch.classList.toggle('active');


    if(document.body.classList.contains('light')){
        localStorage.setItem('light-mode', 'true');

    } else {
        localStorage.setItem('light-mode', 'false');
    }
});

if (localStorage.getItem('light-mode') === 'true'){
    document.body.classList.add('light');
    btnSwitch.classList.add('active');
} else {
    document.body.classList.remove('light');
    btnSwitch.classList.remove('active');
}

//---------------form--------------------------------//

document.getElementById('boton_contactar').addEventListener('click', function () {
    document.getElementById('div_form').style.display='block';
})

function btnForm() {
    var element = document.getElementById("myFooter");
    element.classList.toggle("footer_xl");
}
