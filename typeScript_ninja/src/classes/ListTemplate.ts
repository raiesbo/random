import { HasFormatter } from "../interfaces/HasFormatter";

export class ListTemplate {
    constructor (private container: HTMLUListElement) {}

    render(item: HasFormatter, heading: string, position: 'start' | 'end') {
        const li = document.createElement('li');

        const h4 = document.createElement('h4');
        h4.innerText = heading;
        li.append(h4);

        const p = document.createElement('p');
        p.innerText = item.format();
        li.append(p);

        if (position === 'start') {
            this.container.prepend(li);
        } else {
            this.container.append(li);
        }
    }
}

/*
1. regirter a list ocntainer (ul) in the constructor
2. create a render mehtor to render a new ÄliÄ to the container 
    --- accepts arguments: invoice or payment, a geading, a position
    --- create the html template (li, h4, p)
    --- add the 'li' template to the star/ end fo the list
*/