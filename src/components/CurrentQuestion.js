import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { quiz } from '../reducers/quiz'

export const CurrentQuestion = () => {
  // set isAllowedToAnswer to true so you can click it when the qurstion first pops up
  const [isAllowedToAnswer, setIsAllowedToAnswer] = useState(true)
  const question = useSelector((state) => state.quiz.questions[state.quiz.currentQuestionIndex])
  const answer = useSelector((state) =>  {
    // filter answers that belongs to each question.id
    const answersToQuestion = state.quiz.answers.filter((answer) => answer.questionId === question.id);
    // const lastIndexOfAnswer = answersToQuestion.length - 1;
    // return answersToQuestion[lastIndexOfAnswer];
    return answersToQuestion[0];
  });
  // const question = useSelector((state) => console.log(state))
  // const quizOver = useSelector((state) => state.quiz.quizOver)
  // console.log(quizOver)

  const dispatch = useDispatch()

  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>
  }
  const onNextQuestion = () => {
    // when you click next question you are able to click option button again
    setIsAllowedToAnswer(true)
    dispatch(quiz.actions.goToNextQuestion())
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
              // disable option buttons if clicked
              disabled={isAllowedToAnswer ? false : true}
              >
              {option}
            </button>
          )
        })}
      </div>
      {/* if answer is deifned (true) and if its correct (true) render right*/}
      {/* if isAllowedToAnswer is null (you havent answerd anything yet) dont render, if fals, render nope */}
      {answer && answer.isCorrect ?
        <p>Thats right!</p> : isAllowedToAnswer ? null : <p>Nope!</p> 
      }
      <button
        type="button"
        onClick={onNextQuestion}>
          Go to next question
      </button>
    </div>
  )
}
