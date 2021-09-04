import join from 'lodash/join';

function component () {
    const element = document.createElement("div");

    // Lodash now imported
    element.innerHTML = join(['Hello', 'webpack'], ' ');

    //element.innerHTML = `<h2>That's just a test<p>An other test</p></h2>`

    return element;
}

document.body.appendChild(component());