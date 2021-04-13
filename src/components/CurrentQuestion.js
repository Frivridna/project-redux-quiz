import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { quiz } from '../reducers/quiz'

import { Summary } from './Summary'

export const CurrentQuestion = () => {
  // set isAllowedToAnswer to true so you can click it when the qurstion first pops up
  const [isAllowedToAnswer, setIsAllowedToAnswer] = useState(true)

  const quizOver = useSelector((state) => state.quiz.quizOver)
  const question = useSelector((state) => state.quiz.questions[state.quiz.currentQuestionIndex])
  const answer = useSelector((state) =>  {
    // filter answers that belongs to each question.id
    const answersToQuestion = state.quiz.answers.filter((answer) => answer.questionId === question.id);
      return answersToQuestion[0];
  });
  const currentQuestionIndex = useSelector((state) => state.quiz.currentQuestionIndex)

  // const quizOver = useSelector((state) => state.quiz.quizOver)

  const dispatch = useDispatch()

  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>
  }
  const onNextQuestion = () => {
    // when you click next question you are able to click option button again
    setIsAllowedToAnswer(true)
    dispatch(quiz.actions.goToNextQuestion())
  }

  if(quizOver){
    return(
      <Summary />
    )
  }

  return (
    <div>
      <h1>Question: {question.questionText}</h1>
      <div className="button-container">
        {question.options.map((option, index) => {
          const onAnswerSelcet = () => {
            // when option button is clicked all buttons is disabled
            setIsAllowedToAnswer(false)
            dispatch(quiz.actions.submitAnswer({ questionId: question.id, answerIndex: index }))
          }


        
          return (
            <button
              key={option}
              type="button"
              onClick= {onAnswerSelcet}
              disabled={isAllowedToAnswer ? false : true}
              >
              {option}
            </button>
          )
        })}
      </div>
      {answer && answer.isCorrect ?
        <p>Thats right!</p> : isAllowedToAnswer ? null : <p>Nope!</p> 
      }
      <button
        type="button"
        onClick={onNextQuestion}>
          Next
      </button>
      <p> {currentQuestionIndex+1}/5 </p>

    </div>
  )
}
