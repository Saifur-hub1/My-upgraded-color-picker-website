document.addEventListener("DOMContentLoaded", function(){
  const randmBtn = document.querySelector('.random-button');
  const copyBtn = document.querySelector('.copy-button');
  const hexInput = document.getElementById('input-hex');
  const rgbInput = document.getElementById('input-rgb');
  const redSlider = document.getElementById('red-slider');
  const greenSlider = document.getElementById('green-slider');
  const blueSlider = document.getElementById('blue-slider');

  randmBtn.addEventListener('click', randmChangeColor);
  copyBtn.addEventListener('click', copyText);
  redSlider.addEventListener('change', handleSlider(redSlider,greenSlider,blueSlider));
  greenSlider.addEventListener('change', handleSlider(redSlider,greenSlider,blueSlider));
  blueSlider.addEventListener('change', handleSlider(redSlider,greenSlider,blueSlider));

});

function handleSlider(redSlider,greenSlider,blueSlider){
  return function(){
    const color = {
      R: parseInt(redSlider.value),
      G: parseInt(greenSlider.value),
      B: parseInt(blueSlider.value)
    }
    updateColor(color);
  }
}

function copyText(){
  const radioBtns = document.getElementsByName('copy-option');
  let mode = checkCheckedBtn(radioBtns);
  if(mode=='hex'){
    const text = `#${document.getElementById('input-hexid').placeholder}`;
    navigator.clipboard.writeText(text).then(showCopyMessage(text));
  }
  else {
    const text = document.getElementById('input-rgbid').placeholder;
    navigator.clipboard.writeText(text).then(showCopyMessage(text));
  }
  
}

function showCopyMessage(text){
  const messageElement = document.createElement("div");
  messageElement.innerText = `${text} Copied to clipboard`;
  messageElement.classList.add('copy-message');

  document.body.appendChild(messageElement);

  setTimeout(() => {
    document.body.removeChild(messageElement);
  }, 500);
}


function checkCheckedBtn(node){
  let checkValue = null;
  for(let i=0; i<node.length; i++){
    if(node[i].checked){
      checkValue = node[i].value;
      break;
    }
  }
  return checkValue;
}

function randmChangeColor(){
  const color = generateRandomDecimal();
  console.log('clicked random guys');
  updateColor(color);
}
function generateRandomDecimal(){
  const R = Math.floor(Math.random()*255);
  const G = Math.floor(Math.random()*255);
  const B = Math.floor(Math.random()*255);
  return {R,G,B};
}

function updateColor(color){
  const RGB = generateRGB(color);
  const Hex = generateHex(color);
  console.log(RGB);
  document.getElementById('color-preview').style.background = RGB;
  document.getElementById('input-hexid').placeholder = Hex;
  document.getElementById('input-rgbid').placeholder = RGB;
}

function generateRGB({R,G,B}){
  return `RGB(${R},${G},${B})`;
}
function generateHex({R,G,B}){
  return `${ValidHex(R)}${ValidHex(G)}${ValidHex(B)}`.toUpperCase();
}
function ValidHex(number){
  let HexValue = number.toString(16);
  return HexValue.length===1? HexValue = '0'+HexValue: HexValue;
}