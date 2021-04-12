import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { quiz } from '../reducers/quiz'
import { OptionButton } from './OptionButton'

export const CurrentQuestion = () => {
  const question = useSelector((state) => state.quiz.questions[state.quiz.currentQuestionIndex])
//  const question = useSelector((state) => console.log(state))
//  const quizOver = useSelector((state) => state.quiz.quizOver)
//  console.log(quizOver)

//  const options = useSelector((state) => state.quiz.questions[state.quiz.options])

  const dispatch = useDispatch()

  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>
  }

  return (
    <div>
      <h1>Question: {question.questionText}</h1>
      <OptionButton />
      <button
        type="button"
        onClick={() => { dispatch(quiz.actions.goToNextQuestion()) }}>
          Go to next question
      </button>
    </div>
  )
}
