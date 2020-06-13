console.log(prime(97));
console.log(prime(89));
console.log(prime(83));
console.log(prime(79));
console.log(prime(73));
function prime(n){
  for (let i = 2; i < 10; i++) {
    if(n % i === 0) return false;
  }
  return true;
}  

function ddd(){
  return 3;
}