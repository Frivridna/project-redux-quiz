import React from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { quiz } from '../reducers/quiz'




export const Summary = () => {
    const dispatch = useDispatch()
    const numberOfAnswersCorrect = useSelector((state) => state.quiz.answers.filter((answer) => answer.isCorrect === true).length)
    const restart = () => {
        dispatch(quiz.actions.restart()) }
        return(
            <>
            <p>{numberOfAnswersCorrect}/5</p>
            <button
                onClick={restart}
            >
                Restart
            </button>
            </>

        )
}




