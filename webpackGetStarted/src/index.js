import join from 'lodash/join';
import './style.css';
//import Icon from './icon.png';

console.log(Icon)

const hiElement = document.querySelector('.hi');

function component () {
    const element = document.createElement("div");

    // Lodash now imported
    element.innerHTML = join(['Hello', 'webpack'], ' ');
    element.classList.add("hello");

    // creating img element and adding url
    // const img = document.createElement("img");
    // img.src = Icon;
    // element.appendChild(img)

    //element.innerHTML = `<h2>That's just a test<p>An other test</p></h2>`

    return element;
}

hiElement.appendChild(component());