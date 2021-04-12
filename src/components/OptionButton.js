import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { quiz } from '../reducers/quiz'

export const OptionButton = () => {
  const question = useSelector((state) => state.quiz.questions[state.quiz.currentQuestionIndex])

  const dispatch = useDispatch()

  return (
    <div className="button-container">
      {questions.options.map((option, index) => {
        return (
          <button
            type="button"
            onClick={() => { dispatch(quiz.actions.submitAnswer()) }}>
            {question.option}
          </button>
        )
      })}
    </div>
  )
}