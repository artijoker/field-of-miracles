import React from "react";
import './Game.css';

class Game extends React.Component {

    #answer;
    #question;
    #partialAnswer;
    #inputValue
    #remainingAttempts;
    #score;
    #isOneLetter;
    #isBlockInput;
    #isOnGame;
    #addNewRecord;
    #setQuestionAndAnswer;

    constructor(props) {
        super(props);

        this.#answer = props.answer;
        this.#question = props.question;
        this.#partialAnswer = props.partialAnswer;
        this.#inputValue = props.inputValue;
        this.#remainingAttempts = props.remainingAttempts;
        this.#score = props.score;

        this.#isOneLetter = props.isOneLetter;
        this.#isBlockInput = props.isBlockInput;
        this.#isOnGame = props.isOnGame;
        this.#addNewRecord = props.addNewRecord;
        this.#setQuestionAndAnswer = props.setQuestionAndAnswer;
    }

    set answer(value) {
        this.#answer().set(value);
    }
    get answer() {
        return this.#answer().get();
    }

    set question(value) {
        this.#question().set(value);
    }
    get question() {
        return this.#question().get();
    }

    set partialAnswer(value) {
        this.#partialAnswer().set(value);
    }
    get partialAnswer() {
        return this.#partialAnswer().get();
    }

    set inputValue(value) {
        this.#inputValue().set(value);
    }
    get inputValue() {
        return this.#inputValue().get();
    }

    set remainingAttempts(value) {
        this.#remainingAttempts().set(value);
    }
    get remainingAttempts() {
        return this.#remainingAttempts().get();
    }

    set score(value) {
        this.#score().set(value);
    }
    get score() {
        return this.#score().get();
    }

    set isOneLetter(value) {
        this.#isOneLetter().set(value);
    }
    get isOneLetter() {
        return this.#isOneLetter().get();
    }

    set isBlockInput(value) {
        this.#isBlockInput().set(value);
    }
    get isBlockInput() {
        return this.#isBlockInput().get();
    }
    set isOnGame(value) {
        this.#isOnGame().set(value);
    }
    get isOnGame() {
        return this.#isOnGame().get();
    }


    get isOpenWord() {
        return !this.partialAnswer.includes("-");
    }

    render() {
        if (!this.isOnGame) {
            return (
                <div className="Game">
                    <button onClick={() => {
                        this.#setQuestionAndAnswer();
                        this.isOnGame = true;
                        this.inputValue = "";
                        this.remainingAttempts = 5;
                        this.score = 0;
                        this.isOneLetter = true;
                        this.isBlockInput = false;
                    }}>
                        Новая игра
                    </button>
                    <div className="question">
                        <p>
                            Добро пожаловать в игру "Поле чудес".<br />
                            В этой игре вам предстоит угадывать слова.
                            Вводить можно одну букву или слово целиком.<br />
                            За каждую правильную букву вам будут начисляться очки.<br />
                            За каждый неправильный букву у вас будут сниматься очки и попытки,
                            всего попыток {this.remainingAttempts}.<br />
                            Когда закончатся попытки игра завершится.<br />
                            Если ввести слово целиком и оно окажется верным вы получите дополнительные очки<br />
                            иначе случае вы теряете все очки и игра завершится.
                        </p>
                    </div>
                    <div className="letters">
                        <div className="letter">П</div>
                        <div className="letter">О</div>
                        <div className="letter">Л</div>
                        <div className="letter">Е</div>
                        <div className="letter"> </div>
                        <div className="letter">Ч</div>
                        <div className="letter">У</div>
                        <div className="letter">Д</div>
                        <div className="letter">Е</div>
                        <div className="letter">С</div>
                    </div>

                </div >
            );
        }
        let letters = this.getLetters();

        return (
            <div className="Game">

                <button disabled={!this.isOpenWord}
                    onClick={
                        () => this.saveRecord()
                    }>
                    Завершить игру
                </button>
                <button disabled={!this.isOpenWord}
                    onClick={
                        () => {
                            this.isBlockInput = false;
                            this.isOneLetter = true;

                            this.#setQuestionAndAnswer();
                        }}>
                    Следуещее слово
                </button>
                <button onClick={
                    () => {
                        this.isOnGame = false;
                    }}>
                    Сброс игры
                </button>

                <div className="score">Счет: {this.score}</div>
                <div className="question">
                    {this.question}
                </div>
                <div className="letters">
                    {letters}
                </div>
                <div>
                    <button disabled={this.isOneLetter}
                        onClick={() => {
                            if(this.inputValue !== "")
                                this.inputValue = this.inputValue[0];
                            this.isOneLetter = !this.isOneLetter;
                        }}>
                        Ввод по одной букве
                    </button>
                    <button disabled={!this.isOneLetter}
                        onClick={() => {
                            this.isOneLetter = !this.isOneLetter;
                        }}>
                        Ввод слова целиком
                    </button>
                </div>
                <div>
                    <p>
                        <input disabled={this.isBlockInput}
                            type="text"
                            value={this.inputValue}
                            onChange={this.onChangeInput}
                        />
                    </p>
                    <p>
                        <button disabled={this.isBlockInput}
                            onClick={() => this.checkWin()}>
                            Проверить
                        </button>
                    </p>
                </div>
            </div>
        );
    }

    onChangeInput = (event) => {
        let value = event.target.value;

        if (this.isOneLetter) {
            if (value.length > 1)
                return;

            this.inputValue = value;
        }
        else {
            if (value.length > this.answer.length)
                return;

            this.inputValue = value;
        }
    }

    saveRecord = () => {
        let message = `Ваш результат ${this.score} баллов. Введите имя если хотите сохранить результат в таблице рекордов`;
        let name = prompt(message, '');
        if (name !== null && name !== "")
            this.#addNewRecord(name, this.score);

        this.isOnGame = false;
    }

    checkWin = () => {

        if (this.inputValue === "") {
            if (this.isOneLetter)
                alert("Введите букву!");
            else
                alert("Введите слово!");
            return;
        }

        let answer = this.answer.toLowerCase();
        let partialAnswer = this.partialAnswer.toLowerCase();
        let value = this.inputValue.toLowerCase();

        if (this.isOneLetter) {

            if (partialAnswer.includes(value)) {
                alert("Такая буква уже открыта!");
                this.inputValue = "";
                return;
            }

            if (answer.includes(value)) {
                let matchesNumber = 0;
                for (let i = 0; i < answer.length; i++) {
                    const letter = answer[i];
                    if (value === letter) {
                        partialAnswer = this.setCharAt(partialAnswer, i, value)
                        ++matchesNumber;
                    }
                }

                //console.log(partialAnswer);

                let newScore = this.score + 100 * matchesNumber;


                if (!partialAnswer.includes("-")) {
                    alert("Поздравляем, вы отгадали слово!");

                    this.score = newScore;
                    this.partialAnswer = partialAnswer;
                    this.inputValue = "";
                    this.isBlockInput = true;
                }
                else {
                    this.inputValue = "";
                    this.score = newScore;
                    this.partialAnswer = partialAnswer;
                }
            }
            else {
                let remainingAttempts = this.remainingAttempts;
                remainingAttempts -= 1;
                if (remainingAttempts === 0) {
                    alert(`К сожалению такой буквы нет. Это была ваша последняя попытка. Игра окончена.`);
                    this.saveRecord();
                    return;
                }
                else {
                    alert(`К сожалению, буква не верная! Осталось попыток ${remainingAttempts}.`);
                    this.inputValue = "";
                    this.score = this.score > 50 ? this.score - 50 : this.score;
                    this.remainingAttempts = remainingAttempts;
                }
            }
        }
        else {
            if (answer === value) {
                let flag = true;

                for (let i = 0; i < partialAnswer.length; i++) {
                    if (partialAnswer[i] !== "-") {
                        flag = false;
                        break;
                    }
                }

                let extraScores = flag ? 3000 : 1000;
                alert(`Поздравляем, вы отгадали слово! Вы получаете ${extraScores} баллов!`);
                this.inputValue = "";
                this.score = this.score + extraScores;
                this.isBlockInput = true;
                this.partialAnswer = value;
            }
            else {
                alert("К сожалению, ответ не верный! Вы теряете все баллы. Игра окончена.");
                this.isOnGame = false;
            }
        }
    }

    getLetters = () => {
        let letters = [];

        for (let i = 0; i < this.partialAnswer.length; i++) {
            const char = this.partialAnswer[i];

            if (char === "-")
                letters.push(<div key={i} className="letter"></div>)
            else
                letters.push(<div key={i} className="letter">{char.toUpperCase()}</div>)
        }
        return letters;
    }

    setCharAt = (string, index, char) => {
        if (index > string.length - 1)
            return string;

        return string.substring(0, index) + char + string.substring(index + 1);
    }
}

export default Game;