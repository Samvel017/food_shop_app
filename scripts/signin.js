let signInBtn = document.querySelector('#signInBtn');

export default function singIn() {
  signInBtn.onclick = function myFunc(){
    window.location.href = './signin.html';
  }
}
