 let foo = () => {
   alert('foo')
}
// let loader = document.querySelector('.loader')

// let myBtn = document.querySelector('.foo')
//     myBtn.addEventListener('click',() => {
//         loader.setAttribute("style", "display:block");
//     })



$(function () {
  $('[data-toggle="popover"]').popover({
    html:true
  })
  $('[id="popover533845"]').css({
    "background":"red"
  })
})


// form error animations
let myError = document.querySelector('.my-error')
if (!myError === null) {
    myError.addEventListener('onload',() => {
    myError.classList.add('animate__animated', 'animate__bounceOutLeft');
  })
}

//  let filterFlag = document.querySelector('.filter-flag')
//   window.addEventListener('load',(e) => {
//   filterFlag.textContent = 'Query'
//   })

//  document.querySelectorAll('.filters').forEach(item => {
//   item.addEventListener('click', event => {
//     //handle click
//      filterFlag.textContent = event.target.textContent
//     //alert(filterFlag)
//   })
// })
 

 

 

