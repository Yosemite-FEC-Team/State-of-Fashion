import React from 'react';
const axios = require('axios');
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';

const MainQNA = ({ currentId }) => {

  const [questions, setQuestions] = React.useState([]);

  React.useEffect(() => {
    getQuestions();
  }, [currentId])

  let getQuestions = () => {
    axios.get('products/questions')
      .then((data) => {
        console.log(data.data, 'QUESTIONS DATA');
        if (data.data.length > 4) {
          data.data.splice(4);
        }
        setQuestions(data.data);
      })
      .catch((err) => {
        console.log(err, 'err connecting to server for questions');
      })
  }

  let questionList = questions.map(question => {
    let answers = Object.values(question.answers);
    if (answers.length > 2) {
      answers.splice(2);
    }

    let answerList = answers.map(answer => {
      let ad = new Date (answer.date);
      ad = ad.toDateString();
      return (
        <div className='mt-5'>
            <p><span className='text-xl font-bold'>A:</span> {answer.body}</p>
            <p className='text-xs'> by {answer.answerer_name}, {ad} | Helpful? {answer.helpfulness} <FontAwesomeIcon icon={faThumbsUp} />
            </p>
        </div>
      )
    })

    let qd = new Date (question.question_date);
    qd = qd.toDateString();
    return (
      <div className='ml-5 mt-5'>
        <div className='grid grid-cols-2 mt-5'>
          <div>
          <p className='text-xl font-bold'>Q: {question.question_body}</p>
          <p className='text-xs'>by {question.asker_name}, {qd}</p>
          </div>
          <p className='text-xs'> Helpful? {question.question_helpfulness} <FontAwesomeIcon icon={faThumbsUp} />  |  <span className='underline'>Add Answer</span></p>
        </div>
        {answerList}
      </div>
    )
  })
  return(
    <div className='mt-10 ml-5 mb-5'>
      <h1 className='ml-5'>QUESTIONS & ANSWERS</h1>
      <div className='mt-5 ml-5 border border-solid border-black font-bold w-3/5 h-16'>
        <input className='bg-transparent ml-5 mt-5 w-11/12 text-black' placeholder='HAVE A QUESTION? SEARCH FOR ANSWERS'></input>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </div>
      {questionList}
      <div className='ml-5 mt-5 border border-black border-solid w-72 h-16 inline-block'>
        <p className='ml-4 mt-5 font-bold'>MORE ANSWERED QUESTIONS</p>
      </div>
      <div className='ml-5 mt-5 border border-black border-solid w-48 h-16 inline-block'>
        <p className='ml-3 mt-5 font-bold'>ADD A QUESTION  <FontAwesomeIcon icon={faPlus} /></p>
      </div>
    </div>
  )
}

export default MainQNA;