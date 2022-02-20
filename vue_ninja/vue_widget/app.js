// We create a new app that will be injecting elementos to the
// selection pointed by the `.mount()` method.
const app = Vue.createApp({
    // data, functions
    // template: '<h2>I am the template</h2>'
    data() {
        return {
            showBooks: true,
            title: "The Final Empire",
            author: "Brandon Sanderson",
            age: 45,
            x: 0,
            y: 0,
            books: [
                {title: 'name of the wind', author: 'patrick rothfuss', img: 'assets/1.jpeg', isFav: true},
                {title: 'the way of kings', author: 'brandon sanderson', img: 'assets/2.jpeg', isFav: false},
                {title: 'the final empire', author: 'brandon sanderson', img: 'assets/3.jpeg', isFav: true}
            ],
            url: "https://raiesbo.github.io/"
        }
    },
    methods: {
        changeTitle(title) {
            // this.title = 'Words of Radiance'
            this.title = title
        },
        toggleShowBooks() {
            this.showBooks = !this.showBooks;
        },
        handleEvent(event, data) {
            console.log(event)
            console.log(event.type);

            if (data) console.log(data);
        },
        handleMousemove(event) {
            this.x = event.offsetX
            this.y = event.offsetY
        },
        clickHandler(title) {
            this.books.map((book, i) =>{
                if (book.title === title) {
                    this.books[i].isFav = !this.books[i].isFav
                }}
            );
        },
    },
    computed: {
        filteredBooks() {
            return this.books.filter(book => book.isFav)
        }
    }
});

app.mount('#app')


console.log('hi VUE')