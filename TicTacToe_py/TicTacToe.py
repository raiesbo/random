class Player:
    def __init__ (self, name, symbol):
        """ define the characteristics of the player """
        self.name = name
        self.symbol = symbol
        self.score = 0
        self.winner = False

    def move(self):
        """ movement of the next coin """
        mv = int(input(f'{self.name} moves: '))
        table[mv - 1] = self.symbol
        print(stylish_table(table))

    def win(self):
        """ checks if we won """
        if table[0] == self.symbol and table[1] == self.symbol and table[2] == self.symbol:
            print(f"{self.name} is the winner!!!")
            self.winner = True
        elif table[3] == self.symbol and table[4] == self.symbol and table[5] == self.symbol:
            print(f"{self.name} is the winner!!!")
            self.winner = True
        elif table[6] == self.symbol and table[7] == self.symbol and table[8] == self.symbol:
            print(f"{self.name} is the winner!!!")
            self.winner = True
        elif table[0] == self.symbol and table[4] == self.symbol and table[8] == self.symbol:
            print(f"{self.name} is the winner!!!")
            self.winner = True
        elif table[2] == self.symbol and table[4] == self.symbol and table[6] == self.symbol:
            print(f"{self.name} is the winner!!!")
            self.winner = True
        elif table[1] == self.symbol and table[4] == self.symbol and table[7] == self.symbol:
            print(f"{self.name} is the winner!!!")
            self.winner = True
        elif table[0] == self.symbol and table[3] == self.symbol and table[6] == self.symbol:
            print(f"{self.name} is the winner!!!")
            self.winner = True
        elif table[2] == self.symbol and table[5] == self.symbol and table[8] == self.symbol:
            print(f"{self.name} is the winner!!!")
            self.winner = True


""" TicTacToe board: """

table = [1, 2, 3, 4, 5, 6, 7, 8, 9]


def stylish_table(table):
    tb = (f"{table[0]}|{table[1]}|{table[2]}"
          f"\n-+-+-\n"
          f"{table[3]}|{table[4]}|{table[5]}"
          f"\n-+-+-\n"
          f"{table[6]}|{table[7]}|{table[8]}")
    return tb


# print(stylish_table)


""" Instance Players: """

p1 = Player("Player1", "x")
p2 = Player("Player2", "o")


""" GAME MECHANICS: """

print("Welcome to TicTacTow by raiesbo.\n Player1 starts moving: ")

print(stylish_table(table))


def score(sc1, sc2):
    return sc1, sc2


game_on = True

while game_on:

    # movement player1
    p1.move()
    p1.win()
    if p1.winner:
        p1.score += 1
        print("Scores: ", score(p1.score, p1.score))
        answer = input("Do you wanna play again(y,n)?")
        if answer == "n":
            game_on = False
            break
        else:
            p1.winner = False
            table = [1, 2, 3, 4, 5, 6, 7, 8, 9]
            print(stylish_table(table))

    # movement player2
    p2.move()
    p2.win()
    if p2.winner:
        p2.score += 1
        print("Scores: ", score(p1.score, p1.score))
        answer = input("Do you wanna play again(y,n)?")
        if answer == "n":
            game_on = False
            break
        else:
            p2.winner = False
            table = [1, 2, 3, 4, 5, 6, 7, 8, 9]
            print(stylish_table(table))





