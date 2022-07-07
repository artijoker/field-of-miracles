import logo from './logo.svg';
import { Component } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import './App.css';
import Game from './components/Game/Game'
import RecordsTable from './components/RecordsTable/RecordsTable';
import Data from './data/data.json';



class App extends Component {
    #currentIndex;

    constructor(props) {
        super(props);
        this.#currentIndex = undefined;

        this.state = {
            records: [],
            answer: "",
            question: "",
            partialAnswer: "",
            inputValue: "",
            remainingAttempts: 5,
            score: 0,
            isOneLetter: true,
            isBlockInput: false,
            isOnGame: false
        }
    }
    answer = () => {
        return {
            get: () => this.state.answer,
            set: (value) => {
                this.setState({
                    answer: value
                });
            }
        }
    };
    question = () => {
        return {
            get: () => this.state.question,
            set: (value) => {
                this.setState({
                    question: value
                });
            }
        }
    };
    inputValue = () => {
        return {
            get: () => this.state.inputValue,
            set: (value) => {
                this.setState({
                    inputValue: value
                });
            }
        }
    };
    partialAnswer = () => {
        return {
            get: () => this.state.partialAnswer,
            set: (value) => {
                this.setState({
                    partialAnswer: value
                });
            }
        }
    }
    remainingAttempts = () => {
        return {
            get: () => this.state.remainingAttempts,
            set: (value) => {
                this.setState({
                    remainingAttempts: value
                });
            }
        }
    };
    score = () => {
        return {
            get: () => this.state.score,
            set: (value) => {
                this.setState({
                    score: value
                });
            }
        }
    };
    isOneLetter = () => {
        return {
            get: () => this.state.isOneLetter,
            set: (value) => {
                this.setState({
                    isOneLetter: value
                });
            }
        }
    };
    isBlockInput = () => {
        return {
            get: () => this.state.isBlockInput,
            set: (value) => {
                this.setState({
                    isBlockInput: value
                });
            }
        }
    };
    isOnGame = () => {
        return {
            get: () => this.state.isOnGame,
            set: (value) => {
                this.setState({
                    isOnGame: value
                });
            }
        }
    };

    addNewRecord = (name, score) => {
        let record = {
            name: name,
            score: score
        };
        let records = [...this.state.records, record];
        records.sort((a, b) => {
            if (a.score < b.score) {
                return 1;
            }
            if (a.score > b.score) {
                return -1;
            }
            return 0;
        })
        this.setState({
            records: records
        });
    }
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <div className="dashboard">
                        <NavLink className="Link" to="/">Игра</NavLink>
                        <NavLink className="Link" to="/records_table">Рекорды</NavLink>
                    </div>

                    <Routes>
                        <Route path="/"
                            element={<Game answer={this.answer}
                                question={this.question}
                                partialAnswer={this.partialAnswer}
                                inputValue={this.inputValue}
                                remainingAttempts={this.remainingAttempts}
                                score={this.score}
                                isOneLetter={this.isOneLetter}
                                isBlockInput={this.isBlockInput}
                                isOnGame={this.isOnGame}
                                addNewRecord={this.addNewRecord}
                                setQuestionAndAnswer={this.setQuestionAndAnswer}
                            />}
                        />
                        <Route path="/records_table" element={<RecordsTable getRecords={() => this.state.records} />} />
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }

    setQuestionAndAnswer = () => {
        if (this.#currentIndex === undefined)
            this.#currentIndex = Math.floor((Math.random() * Data.length) + 0);
        else
            this.#currentIndex = this.#currentIndex === Data.length - 1 ? 0 : this.#currentIndex + 1

        this.setState({
            question: Data[this.#currentIndex].question,
            answer: Data[this.#currentIndex].answer,
            partialAnswer: '-'.repeat(Data[this.#currentIndex].answer.length)
        });
    }
}

export default App;
