import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { quiz } from "../reducers/quiz";

export const Summary = () => {
    const dispatch = useDispatch();
    
    const numberOfAnswersCorrect = useSelector(
    (state) =>
    state.quiz.answers.filter((answer) => answer.isCorrect === true).length
    );

    const restart = () => {
        dispatch(quiz.actions.restart());
};

return (
    <div className="summary-container">
    <p>Well done! you got {numberOfAnswersCorrect} answers right!</p>
    <button 
        className="restart-button"
        onClick={restart}>
        Restart
    </button>
    </div>
    );
};
