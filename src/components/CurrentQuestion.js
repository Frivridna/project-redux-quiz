import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { quiz } from '../reducers/quiz'

export const CurrentQuestion = () => {
  const [newAnswerIndex, setNewAnswerIndex] = useState(null)
  const question = useSelector((state) => state.quiz.questions[state.quiz.currentQuestionIndex])
  const answer = useSelector((state) =>  state.quiz.answers.find((a) => a.questionId === question.id));
  console.log(answer)
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
      <div className="button-container">
        {question.options.map((option, index) => {
          const onClickHandler = () => {
            dispatch(quiz.actions.submitAnswer({ questionId: question.id, answerIndex: index }))
            setNewAnswerIndex (index)
          }
          return (
            <button
              key={option}
              type="button"
              onClick= {onClickHandler}>
              {option}
            </button>
          )
        })}
      </div>
      {newAnswerIndex === question.correctAnswerIndex && 
        <p>rätt</p>
      }
      <button
        type="button"
        onClick={() => { dispatch(quiz.actions.goToNextQuestion()) }}>
          Go to next question
      </button>
    </div>
  )
}
