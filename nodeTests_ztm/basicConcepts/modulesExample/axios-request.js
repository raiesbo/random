import axios from 'axios';

axios.get('https://www.google.com')
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log(error)
    })
    .then(() => {
        console.log('this happens when is all done, regardless of what is happening above.')
    });