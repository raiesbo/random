use rand::{rng, seq::SliceRandom};

#[derive(Debug)]
struct Deck {
    cards: Vec<String>,
}

impl Deck {
    fn new() -> Self {
        let suits = ["Hearts", "Spades", "Diamonds", "Clubs"];
        let values = ["Ace", "Two", "Three"];

        let mut cards: Vec<String> = vec![];

        for suit in suits {
            for value in values {
                let card = format!("{} of {}", value, suit);
                cards.push(card)
            }
        }

        Deck { cards }
    }

    fn shuffle(&mut self) {
        let mut r = rng();
        self.cards.shuffle(&mut r);
    }

    fn deal(&mut self, num_cards: usize) -> Vec<String> {
        self.cards.split_off(self.cards.len() - num_cards)
    }
}

fn main() {
    let mut deck = Deck::new();

    deck.shuffle();
    // TODO: Probably need to add error handling to avoid asking for more cards than the deck contains.
    let cards = deck.deal(3);

    print!("Here is your hand: {:#?}", cards);
    println!("Here is your deck: {:#?}", deck);
}
