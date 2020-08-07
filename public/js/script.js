const form = document.querySelector('form')
const inputs = document.querySelectorAll("input")
const birth = document.querySelector("select")
const msgErro = document.querySelector('.msg-erro p')

console.log(inputs)
form.addEventListener('submit',(e)=>{
    e.preventDefault()

    if(inputs[0].value == '' || inputs[1].value =='' || inputs[2].value == '' || inputs[3].value =='' || inputs[4].value == '' ){
        alert('Preencha todos os campos')
    }else if(inputs[1].value != inputs[2].value){
        msgErro.innerHTML=" <p> As senhas estão diferentes </p>"
    }else{
        form.submit()
    }


})
